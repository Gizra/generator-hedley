module BitList exposing (..)

import List exposing (..)


type Bit
    = On
    | Off


fromNumber : Int -> List Bit
fromNumber int =
    if int == 0 then
        []
    else if int % 2 == 1 then
        append (fromNumber (int // 2)) [ On ]
    else
        append (fromNumber (int // 2)) [ Off ]


fromNumberWithSize : Int -> Int -> List Bit
fromNumberWithSize number size =
    let
        bitList =
            fromNumber number

        paddingSize =
            size - length bitList
    in
        append (repeat paddingSize Off) bitList


fromByte : Int -> List Bit
fromByte byte =
    fromNumberWithSize byte 8


toByte : List Bit -> Int
toByte bitList =
    toByteReverse <| reverse bitList


toByteReverse : List Bit -> Int
toByteReverse bitList =
    case bitList of
        [] ->
            0

        Off :: tail ->
            2 * toByteReverse tail

        On :: tail ->
            1 + 2 * toByteReverse tail


partition : Int -> List Bit -> List (List Bit)
partition size list =
    if length list <= size then
        [ list ]
    else
        let
            partitionTail size list res =
                case list of
                    [] ->
                        res

                    _ ->
                        partitionTail size (drop size list) (take size list :: res)
        in
            partitionTail size list [] |> reverse
