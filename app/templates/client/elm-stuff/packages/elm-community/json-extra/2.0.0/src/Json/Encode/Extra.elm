module Json.Encode.Extra exposing (maybe)

{-| Convenience functions for turning Elm values into Json values.

# Maybe
@docs maybe

-}

import Json.Encode exposing (..)


{-| Encode a Maybe value. If the value is `Nothing` it will be encoded as `null`

    maybe int Nothing == Value null
    maybe int (Just 50) == Value 50

-}
maybe : (a -> Value) -> Maybe a -> Value
maybe encoder value =
    case value of
        Nothing ->
            null

        Just val ->
            encoder val
