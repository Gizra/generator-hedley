module RemoteData
    exposing
        ( RemoteData(..)
        , WebData
        , fromResult
        , toMaybe
        , andThen
        , withDefault
        , asCmd
        , append
        , map
        , andMap
        , succeed
        , isSuccess
        , isFailure
        , isLoading
        , isNotAsked
        , mapError
        , mapBoth
        , update
        , prism
        )

{-| A datatype representing fetched data.

If you find yourself continually using `Maybe (Result Error a)` to
represent loaded data, or you have a habit of shuffling errors away to
where they can be quietly ignored, consider using this. It makes it
easier to represent the real state of a remote data fetch and handle
it properly.


For more on the motivation, take a look at the blog post [How Elm Slays A UI Antipattern](http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html).


To use the datatype, let's look at an example that loads `News` from a feed.

First you add to your model, wrapping the data you want in `WebData`:


``` elm
type alias Model =
    { news : WebData News }
```

Then add in a message that will deliver the response:

``` elm
type alias Msg
    = NewsResponse (WebData News)
```

Now we can create an HTTP get:

``` elm
getNews : Cmd Msg
getNews =
    Http.send (NewsResponse << RemoteData.fromResult) <|
        Http.get "/news" decodeNews
```

We trigger it in our `init` function:

``` elm
init : ( Model, Cmd Msg)
init =
    ( { news = Loading }
    , getNews
    )
```

We handle it in our `update` function:

``` elm
update msg model =
    case msg of
        NewsResponse response ->
            ( { model | news = response }
            , Cmd.none
            )
```


Most of this you'd already have in your app, and the changes are just
wrapping the datatype in `Webdata`, and updating the `Http.send` call
to add in `RemoteData.fromResult`.

Now we get to where we really want to be, rendering the data and
handling the different states in the UI gracefully:


``` elm
view : Model -> Html msg
view model =
  case model.news of
    NotAsked -> text "Initialising."

    Loading -> text "Loading."

    Failure err -> text ("Error: " ++ toString err)

    Success news -> viewNews news


viewNews : News -> Html msg
viewNews news =
    div []
        [h1 [] [text "Here is the news."]
        , ...]
```

And that's it. A more accurate model of what's happening leads to a better UI.

@docs RemoteData
@docs WebData
@docs map
@docs andMap
@docs succeed
@docs mapError
@docs mapBoth
@docs andThen
@docs withDefault
@docs fromResult
@docs toMaybe
@docs asCmd
@docs append
@docs isSuccess
@docs isFailure
@docs isLoading
@docs isNotAsked
@docs update
@docs prism

-}

import Http
import Task exposing (Task)


{-| Frequently when you're fetching data from an API, you want to represent four different states:
  * `NotAsked` - We haven't asked for the data yet.
  * `Loading` - We've asked, but haven't got an answer yet.
  * `Failure` - We asked, but something went wrong. Here's the error.
  * `Success` - Everything worked, and here's the data.
-}
type RemoteData e a
    = NotAsked
    | Loading
    | Failure e
    | Success a


{-| While `RemoteData` can model any type of error, the most common
one you'll actually encounter is when you fetch data from a REST
interface, and get back `RemoteData Http.Error a`. Because that case
is so common, `WebData` is provided as a useful alias.
-}
type alias WebData a =
    RemoteData Http.Error a


{-| Map a function into the `Success` value.
-}
map : (a -> b) -> RemoteData e a -> RemoteData e b
map f data =
    case data of
        Success value ->
            Success (f value)

        Loading ->
            Loading

        NotAsked ->
            NotAsked

        Failure error ->
            Failure error


{-| Map a function into the `Failure` value.
-}
mapError : (e -> f) -> RemoteData e a -> RemoteData f a
mapError f data =
    case data of
        Success x ->
            Success x

        Failure e ->
            Failure (f e)

        Loading ->
            Loading

        NotAsked ->
            NotAsked


{-| Map function into both the `Success` and `Failure` value.
-}
mapBoth : (a -> b) -> (e -> f) -> RemoteData e a -> RemoteData f b
mapBoth successFn errorFn data =
    case data of
        Success x ->
            Success (successFn x)

        Failure e ->
            Failure (errorFn e)

        Loading ->
            Loading

        NotAsked ->
            NotAsked


{-| Chain together RemoteData function calls.
-}
andThen : (a -> RemoteData e b) -> RemoteData e a -> RemoteData e b
andThen f data =
    case data of
        Success a ->
            f a

        Failure e ->
            Failure e

        NotAsked ->
            NotAsked

        Loading ->
            Loading


{-| Return the `Success` value, or the default.
-}
withDefault : a -> RemoteData e a -> a
withDefault default data =
    case data of
        Success x ->
            x

        _ ->
            default


{-| Convert a web `Task`, probably produced from elm-http, to a `Cmd (RemoteData e a)`.
-}
asCmd : Task e a -> Cmd (RemoteData e a)
asCmd =
    Task.attempt fromResult


{-| Convert a `Result Error`, probably produced from elm-http, to a RemoteData value.
-}
fromResult : Result e a -> RemoteData e a
fromResult result =
    case result of
        Err e ->
            Failure e

        Ok x ->
            Success x


{-| Convert a `RemoteData e a` to a `Maybe a`
-}
toMaybe : RemoteData e a -> Maybe a
toMaybe =
    map Just >> withDefault Nothing


{-| Append - join two `RemoteData` values together as though
they were one.

If either value is `NotAsked`, the result is `NotAsked`.
If either value is `Loading`, the result is `Loading`.
If both values are `Failure`, the left one wins.
-}
append : RemoteData e a -> RemoteData e b -> RemoteData e ( a, b )
append a b =
    map (,) a
        |> andMap b


{-| Put the results of two RemoteData calls together.

For example, if you were fetching three datasets, `a`, `b` and `c`,
and wanted to end up with a tuple of all three, you could say:

``` elm
merge3 :
    RemoteData e a
    -> RemoteData e b
    -> RemoteData e c
    -> RemoteData e ( a, b, c )
merge3 a b c =
    map (,,) a
        |> andMap b
        |> andMap c
```

The final tuple succeeds only if all its children succeeded.  It is
still `Loading` if _any_ of its children are still `Loading`. And if
any child fails, the error is the leftmost `Failure` value.

Note that this provides a general pattern for `map2`, `map3`, ..,
`mapN`. If you find yourself wanting `map5`, just use:

``` elm
foo f a b c d e =
    map f a
        |> andMap b
        |> andMap c
        |> andMap d
        |> andMap e
```

It's a general recipe that doesn't require us to ever have the
discussion, "Could you just add `map7`? Could you just add `map8`?
Could you just...".

Category theory points: This is `apply` with the arguments flipped.
-}
andMap : RemoteData e a -> RemoteData e (a -> b) -> RemoteData e b
andMap wrappedValue wrappedFunction =
    case ( wrappedFunction, wrappedValue ) of
        ( Success f, Success value ) ->
            Success (f value)

        ( Failure error, _ ) ->
            Failure error

        ( _, Failure error ) ->
            Failure error

        ( Loading, _ ) ->
            Loading

        ( _, Loading ) ->
            Loading

        ( NotAsked, _ ) ->
            NotAsked

        ( _, NotAsked ) ->
            NotAsked


{-| Lift an ordinary value into the realm of RemoteData.

Category theory points: This is `pure`.
-}
succeed : a -> RemoteData e a
succeed =
    Success


{-| State-checking predicate. Returns true if we've successfully loaded some data.
-}
isSuccess : RemoteData e a -> Bool
isSuccess data =
    case data of
        Success x ->
            True

        _ ->
            False


{-| State-checking predicate. Returns true if we've failed to load some data.
-}
isFailure : RemoteData e a -> Bool
isFailure data =
    case data of
        Failure x ->
            True

        _ ->
            False


{-| State-checking predicate. Returns true if we're loading.
-}
isLoading : RemoteData e a -> Bool
isLoading data =
    case data of
        Loading ->
            True

        _ ->
            False


{-| State-checking predicate. Returns true if we haven't asked for data yet.
-}
isNotAsked : RemoteData e a -> Bool
isNotAsked data =
    case data of
        NotAsked ->
            True

        _ ->
            False


{-| Apply an Elm update function - `Model -> (Model, Cmd Msg)` - to any `Successful`-ly loaded data.

It's quite common in Elm to want to run a model-update function, over
some remote data, but only once it's actually been loaded.

For example, we might want to handle UI messages changing the users
settings, but that only makes sense once those settings have been
returned from the server.

This function makes it more convenient to reach inside a
`RemoteData.Success` value and apply an update. If the data is not
`Success a`, it is returned unchanged with a `Cmd.none`.

-}
update : (a -> ( b, Cmd c )) -> RemoteData e a -> ( RemoteData e b, Cmd c )
update f remoteData =
    case remoteData of
        Success data ->
            let
                ( first, second ) =
                    f data
            in
                ( Success first, second )

        NotAsked ->
            ( NotAsked, Cmd.none )

        Loading ->
            ( Loading, Cmd.none )

        Failure error ->
            ( Failure error, Cmd.none )


{-| A monocle-compatible Prism.

If you use Monocle, you'll want this, otherwise you can ignore it.

The type signature is actually:

``` elm
prism : Prism (RemoteData e a) a
```

...but we use the more verbose type here to avoid introducing a dependency on Monocle.
-}
prism :
    { getOption : RemoteData e a -> Maybe a
    , reverseGet : a -> RemoteData e a
    }
prism =
    { reverseGet = Success
    , getOption =
        \data ->
            case data of
                Success value ->
                    Just value

                _ ->
                    Nothing
    }
