module Lazy exposing
    ( Lazy
    , force, lazy
    , map, map2, map3, map4, map5
    , apply, andThen
    )

{-| This library lets you delay a computation until later.

# Basics
@docs Lazy, lazy, force

# Mapping
@docs map, map2, map3, map4, map5

# Chaining
@docs apply, andThen
-}

import Native.Lazy



-- PRIMITIVES


{-| A wrapper around a value that will be lazily evaluated. -}
type Lazy a =
  Lazy (() -> a)


{-| Delay the evaluation of a value until later. For example, maybe we will
need to generate a very long list and find its sum, but we do not want to do
it unless it is absolutely necessary.

    lazySum : Lazy Int
    lazySum =
        lazy (\() -> sum [1..1000000])

Now we only pay for `lazySum` if we actually need it.
-}
lazy : (() -> a) -> Lazy a
lazy thunk =
  Lazy (Native.Lazy.memoize thunk)


{-| Force the evaluation of a lazy value. This means we only pay for the
computation when we need it. Here is a rather contrived example.

    lazySum : Lazy Int
    lazySum =
        lazy (\() -> List.sum [1..1000000])

    sums : (Int, Int, Int)
    sums =
        (force lazySum, force lazySum, force lazySum)

We are forcing this computation three times. The cool thing is that the first
time you `force` a value, the result is stored. This means you pay the cost on
the first one, but all the rest are very cheap, basically just looking up a
value in memory.
-}
force : Lazy a -> a
force (Lazy thunk) =
  thunk ()



-- COMPOSING LAZINESS


{-| Lazily apply a function to a lazy value.

    lazySum : Lazy Int
    lazySum =
        map List.sum (lazy (\() -> [1..1000000]))

The resulting lazy value will create a big list and sum it up when it is
finally forced.
-}
map : (a -> b) -> Lazy a -> Lazy b
map f a =
  lazy (\() -> f (force a))


{-| Lazily apply a function to two lazy values.

    lazySum : Lazy Int
    lazySum =
        lazy (\() -> List.sum [1..1000000])

    lazySumPair : Lazy (Int, Int)
    lazySumPair =
        map2 (,) lazySum lazySum

-}
map2 : (a -> b -> result) -> Lazy a -> Lazy b -> Lazy result
map2 f a b =
  lazy (\() -> f (force a) (force b))


{-|-}
map3 : (a -> b -> c -> result) -> Lazy a -> Lazy b -> Lazy c -> Lazy result
map3 f a b c =
  lazy (\() -> f (force a) (force b) (force c))


{-|-}
map4 : (a -> b -> c -> d -> result) -> Lazy a -> Lazy b -> Lazy c -> Lazy d -> Lazy result
map4 f a b c d =
  lazy (\() -> f (force a) (force b) (force c) (force d))


{-|-}
map5 : (a -> b -> c -> d -> e -> result) -> Lazy a -> Lazy b -> Lazy c -> Lazy d -> Lazy e -> Lazy result
map5 f a b c d e =
  lazy (\() -> f (force a) (force b) (force c) (force d) (force e))


{-| Lazily apply a lazy function to a lazy value. This is pretty rare on its
own, but it lets you map as high as you want.

    map3 f a b == f `map` a `apply` b `apply` c

It is not the most beautiful, but it is equivalent and will let you create
`map9` quite easily if you really need it.
-}
apply : Lazy (a -> b) -> Lazy a -> Lazy b
apply f x =
  lazy (\() -> (force f) (force x))


{-| Lazily chain together lazy computations, for when you have a series of
steps that all need to be performed lazily. This can be nice when you need to
pattern match on a value, for example, when appending lazy lists:

    type List a = Empty | Node a (Lazy (List a))

    cons : a -> Lazy (List a) -> Lazy (List a)
    cons first rest =
      Lazy.map (Node first) rest

    append : Lazy (List a) -> Lazy (List a) -> Lazy (List a)
    append lazyList1 lazyList2 =
      let
        appendHelp list1 =
          case list1 of
            Empty ->
              lazyList2

            Node first rest ->
              cons first (append rest list2))
      in
        lazyList1
          |> Lazy.andThen appendHelp


By using `andThen` we ensure that neither `lazyList1` or `lazyList2` are forced
before they are needed. So as written, the `append` function delays the pattern
matching until later.
-}
andThen : (a -> Lazy b) -> Lazy a -> Lazy b
andThen callback a =
  lazy (\() -> force (callback (force a)))
