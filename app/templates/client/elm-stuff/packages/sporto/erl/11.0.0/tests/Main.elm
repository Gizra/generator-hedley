port module Main exposing (..)

import Test.Runner.Node exposing (run, TestProgram)
import Json.Encode exposing (Value)
import ErlTests


main : TestProgram
main =
    run emit ErlTests.all


port emit : ( String, Value ) -> Cmd msg
