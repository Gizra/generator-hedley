module Test.Base64 exposing (tests)

import Base64
import Legacy.ElmTest as ElmTest exposing (Test, assertEqual, defaultTest, suite)
import String


encodeTest : ( String, String ) -> Test
encodeTest ( string, base64 ) =
    defaultTest (assertEqual (Result.Ok base64) (Base64.encode string))


decodeTest : ( String, String ) -> Test
decodeTest ( string, base64 ) =
    defaultTest (assertEqual (Result.Ok string) (Base64.decode base64))


longDecoded =
    String.repeat 9000 "@"


longEncoded =
    String.repeat 3000 "QEBA"


examples =
    [ ( "aaa", "YWFh" )
    , ( "my updated file contents", "bXkgdXBkYXRlZCBmaWxlIGNvbnRlbnRz" )
    , ( "a", "YQ==" )
    , ( "aa", "YWE=" )
    , ( "Elm is Cool", "RWxtIGlzIENvb2w=" )
    , ( longDecoded, longEncoded )
    ]


tests : Test
tests =
    suite "Base64"
        [ suite "encode" <| List.map encodeTest examples
        , suite "decode" <| List.map decodeTest examples
        ]
