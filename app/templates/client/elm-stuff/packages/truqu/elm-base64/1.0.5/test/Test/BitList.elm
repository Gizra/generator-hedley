module Test.BitList exposing (tests)

import BitList exposing (..)
import Legacy.ElmTest as ElmTest exposing (Test, assertEqual, defaultTest, suite)


tests : Test
tests =
    suite "BitList"
        [ defaultTest <|
            assertEqual
                (fromByte (62))
                [ Off, Off, On, On, On, On, On, Off ]
        , defaultTest <|
            assertEqual
                (toByte ([ On, Off ]))
                2
        , defaultTest <|
            assertEqual
                (toByte ([ Off, On, On, Off ]))
                6
        , defaultTest <|
            assertEqual
                (toByte ([ Off, Off, On, On, On, On, On, Off ]))
                62
        , defaultTest <|
            assertEqual
                (partition 3 [ Off, Off, Off, On, On, Off, On, Off ])
                [ [ Off, Off, Off ], [ On, On, Off ], [ On, Off ] ]
        , defaultTest <|
            assertEqual
                (partition 6
                    [ Off
                    , On
                    , Off
                    , On
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    , Off
                    ]
                )
                [ [ Off, On, Off, On, Off, Off ]
                , [ Off, Off, Off, Off, Off, Off ]
                , [ Off, Off, Off, Off, Off, Off ]
                , [ Off, Off, Off, Off, Off, Off ]
                ]
        ]
