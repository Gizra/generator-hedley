module Base64 exposing (encode, decode)

{-| Library for base64 encoding and decoding of Ascii strings.
For the moment only works with the characters :

" !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

# Method
@docs encode, decode
-}

import List
import List exposing (append)
import BitList
import BitList exposing (Bit)
import Array
import String
import Char
import Result
import Dict exposing (Dict)


{-| base64 encodes an ascii string. If the input is not valid returns a Result.Err,
otherwise a Result.Ok String
    encode("Elm is Cool") == Result.Ok "RWxtIGlzIENvb2w="
-}
encode : String -> Result String String
encode s =
    Result.Ok (toCodeList s |> toTupleList |> toCharList |> String.fromList)


{-| base64 decodes an ascii string. If the input is not a valid base64 string returns a Result.Err,
otherwise a Result.Ok String
    decode("RWxtIGlzIENvb2w=") == Result.Ok "Elm is Cool"
-}
decode : String -> Result String String
decode s =
    if not (isValid s) then
        Result.Err "Error while decoding"
    else
        let
            bitList =
                List.map BitList.toByte (toBase64BitList s |> BitList.partition 8)

            charList =
                List.map Char.fromCode bitList
        in
            Result.Ok <| String.fromList charList


toCodeList : String -> List Int
toCodeList string =
    List.map Char.toCode (String.toList string)


toTupleList : List Int -> List ( Int, Int, Int )
toTupleList list =
    case list of
        a :: b :: c :: l ->
            ( a, b, c ) :: toTupleList (l)

        a :: b :: [] ->
            [ ( a, b, -1 ) ]

        a :: [] ->
            [ ( a, -1, -1 ) ]

        [] ->
            []


toCharList : List ( Int, Int, Int ) -> List Char
toCharList bitList =
    let
        array =
            Array.fromList base64CharsList

        toBase64Char index =
            Maybe.withDefault '!' (Array.get index array)

        toChars ( a, b, c ) =
            case ( a, b, c ) of
                ( a, -1, -1 ) ->
                    append (dropLast 2 (List.map toBase64Char (partitionBits [ a, 0, 0 ]))) [ '=', '=' ]

                ( a, b, -1 ) ->
                    append (dropLast 1 (List.map toBase64Char (partitionBits [ a, b, 0 ]))) [ '=' ]

                ( a, b, c ) ->
                    (List.map toBase64Char (partitionBits [ a, b, c ]))
    in
        List.concatMap toChars bitList


base64CharsList : List Char
base64CharsList =
    String.toList "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"


base64Map : Dict Char Int
base64Map =
    let
        insert ( value, key ) dict =
            Dict.insert key value dict
    in
        List.foldl insert Dict.empty (List.indexedMap (,) base64CharsList)


isValid : String -> Bool
isValid string =
    let
        isBase64Char char =
            Dict.member char base64Map

        string_ =
            if String.endsWith "==" string then
                String.dropRight 2 string
            else if String.endsWith "=" string then
                String.dropRight 1 string
            else
                string
    in
        String.all isBase64Char string_


partitionBits : List Int -> List Int
partitionBits list =
    let
        list_ =
            List.foldr List.append [] (List.map BitList.fromByte list)
    in
        List.map BitList.toByte (BitList.partition 6 list_)


dropLast : Int -> List a -> List a
dropLast number list =
    List.reverse list |> List.drop number |> List.reverse


toBase64BitList : String -> List Bit
toBase64BitList string =
    let
        base64ToInt char =
            case Dict.get char base64Map of
                Just value ->
                    value

                _ ->
                    -1

        endingEquals =
            if (String.endsWith "==" string) then
                2
            else if String.endsWith "=" string then
                1
            else
                0

        stripped =
            String.toList (String.dropRight endingEquals string)

        numberList =
            List.map base64ToInt stripped
    in
        dropLast (endingEquals * 2) <| List.concatMap (flip BitList.fromNumberWithSize <| 6) numberList
