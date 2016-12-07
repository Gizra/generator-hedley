module Tests exposing (..)

import Legacy.ElmTest as ElmTest exposing (Test, suite, runSuite)
import Test.Base64
import Test.BitList


all : Test
all =
    suite "Main"
        [ Test.Base64.tests
        , Test.BitList.tests
        ]


main : Program Never () msg
main =
    runSuite all
