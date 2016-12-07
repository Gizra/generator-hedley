module ErlTests exposing (..)

import String
import Dict
import Erl
import Test exposing (..)
import Expect


-- PROTOCOL


testProtocol =
    let
        inputs =
            [ ( "http://example.com:3000", "http" )
            , ( "http://localhost:7000", "http" )
            ]

        run ( input, expected ) =
            test "Protocol"
                <| \() -> Expect.equal expected (Erl.parse input).protocol
    in
        describe "Protocol"
            (List.map run inputs)


testProtocolExtract =
    let
        inputs =
            [ ( "http://example.com:3000", "http" )
            , ( "https://example.com:3000", "https" )
            , ( "example.com:3000", "" )
            ]

        run ( input, expected ) =
            test "Protocol"
                <| \() -> Expect.equal expected (Erl.extractProtocol input)
    in
        describe "Extract protocol"
            (List.map run inputs)



-- USERNAME
-- PASSWORD
-- HOST
-- host must be a-z 0-9 and -


testHostExtract : Test
testHostExtract =
    let
        inputs =
            [ ( "http://foo.com", "foo.com" )
            , ( "http://12345.com", "12345.com" )
            , ( "http://api.foo.com", "api.foo.com" )
            , ( "http://api.foo.com/", "api.foo.com" )
            , ( "http://api.foo.com/users", "api.foo.com" )
            , ( "http://api.foo.com/users", "api.foo.com" )
            , ( "http://localhost/users", "localhost" )
            , ( "http://localhost", "localhost" )
            , ( "http://localhost/localhost", "localhost" )
            , ( "http://192.168.0.0", "192.168.0.0" )
            , ( "http://192.168.0.0/localhost", "192.168.0.0" )
            , ( "foo.com", "foo.com" )
            , ( "foo-.com", "foo-.com" )
            , ( "foo.com/users", "foo.com" )
            , ( "api.foo.com", "api.foo.com" )
            , ( "users/1/edit", "" )
            , ( "users/index.html", "" )
            , ( "/users/index.html", "" )
            ]

        run ( input, expected ) =
            test ("Extracts host " ++ input)
                <| \() -> Expect.equal expected (Erl.extractHost input)
    in
        describe "Extract host"
            (List.map run inputs)


testHost : Test
testHost =
    let
        inputs =
            [ ( "http://www.foo.com/users", [ "www", "foo", "com" ] )
            ]

        run ( input, expected ) =
            test ("Parses host in " ++ input)
                <| \() -> Expect.equal expected (Erl.parse input).host
    in
        describe "Parses host"
            (List.map run inputs)



-- PORT


testPortExtract : Test
testPortExtract =
    let
        inputs =
            [ ( "http://example.com:3000", 3000 )
            , ( "http://example.com:3000/", 3000 )
            , ( "http://example.com:3000/users", 3000 )
            , ( "http://example.com", 80 )
            , ( "http://example.com/users", 80 )
            , ( "https://example.com:3000", 3000 )
            , ( "https://example.com:3000/", 3000 )
            , ( "https://example.com:3000/users", 3000 )
            , ( "https://example.com", 443 )
            , ( "https://example.com/users", 443 )
            , ( "ftp://example.com:3000", 3000 )
            , ( "ftp://example.com:3000/", 3000 )
            , ( "ftp://example.com:3000/users", 3000 )
            , ( "ftp://example.com", 21 )
            , ( "ftp://example.com/users", 21 )
            , ( "sftp://example.com:3000", 3000 )
            , ( "sftp://example.com:3000/", 3000 )
            , ( "sftp://example.com:3000/users", 3000 )
            , ( "sftp://example.com", 22 )
            , ( "sftp://example.com/users", 22 )
            , ( "xyz://example.com:3000", 3000 )
            , ( "xyz://example.com:3000/", 3000 )
            , ( "xyz://example.com:3000/users", 3000 )
            , ( "xyz://example.com", 0 )
            , ( "xyz://example.com/users", 0 )
            ]

        run ( input, expected ) =
            test "Extracts the port"
                <| \() -> Expect.equal expected (Erl.extractPort input)
    in
        describe "Extract port"
            (List.map run inputs)


testPort : Test
testPort =
    let
        inputs =
            [ ( "http://example.com:3000/users", 3000 )
            , ( "http://example.com/users", 80 )
            ]

        run ( input, expected ) =
            test "Extracts the port"
                <| \() -> Expect.equal expected (Erl.parse input).port_
    in
        describe "Port"
            (List.map run inputs)



-- PATH


testPathExtract : Test
testPathExtract =
    let
        inputs =
            [ ( "http://foo.com/users/index.html", "/users/index.html" )
            , ( "//foo.com/users/index.html", "/users/index.html" )
            , ( "http://localhost/users/index.html", "/users/index.html" )
            , ( "//localhost/localhost/users/index.html", "/localhost/users/index.html" )
            , ( "/users/index.html", "/users/index.html" )
            , ( "users/index.html", "users/index.html" )
            , ( "users/index.html#xyz", "users/index.html" )
            , ( "users/index.html?a=1", "users/index.html" )
            , ( "http://example.com:2000", "" )
            ]

        run ( input, expected ) =
            test ("Extracts path " ++ input)
                <| \() -> Expect.equal expected (Erl.extractPath input)
    in
        describe "Extract path"
            (List.map run inputs)


testPath : Test
testPath =
    let
        inputs =
            [ ( "http://foo.com/users/index.html?a=1", [ "users", "index.html" ] )
            , ( "/users/1/edit", [ "users", "1", "edit" ] )
            , ( "//localhost/users/1/edit", [ "users", "1", "edit" ] )
            , -- it decodes
              ( "/us%2Fers/1/edit", [ "us/ers", "1", "edit" ] )
            ]

        run ( input, expected ) =
            test "Parses the path"
                <| \() -> Expect.equal expected (Erl.parse input).path
    in
        describe "Path"
            (List.map run inputs)


testHasLeadingSlash : Test
testHasLeadingSlash =
    let
        inputs =
            [ ( "/users/all/?a=1", True )
            , ( "http://foo.com/users/all/?a=1", True )
            , ( "http://www.foo.com:2000/users/1?k=2&q=1#a/b", True )
            , ( "users/all/?a=1", False )
            ]

        run ( input, expected ) =
            test "Identifies the absence of a leading slash"
                <| \() -> Expect.equal expected (Erl.parse input).hasLeadingSlash
    in
        describe "Path"
            (List.map run inputs)


testHasTrailingSlash : Test
testHasTrailingSlash =
    let
        inputs =
            [ ( "http://foo.com/users/all/?a=1", True )
            , ( "http://foo.com/users/all?a=1", False )
            ]

        run ( input, expected ) =
            test "Identifies the presence of a trailing slash"
                <| \() -> Expect.equal expected (Erl.parse input).hasTrailingSlash
    in
        describe "Path"
            (List.map run inputs)


testAppendPathSegments : Test
testAppendPathSegments =
    let
        inputs =
            [ ( "http://foo.com/users/index.html?a=1", [ "extra" ], [ "users", "index.html", "extra" ] )
            , ( "/", [], [] )
            , ( "/zero", [ "one", "two" ], [ "zero", "one", "two" ] )
            ]

        run ( inputUrl, inputPathSegments, expected ) =
            let
                inputUrlAsUrl =
                    Erl.parse inputUrl

                actual =
                    (Erl.appendPathSegments inputPathSegments inputUrlAsUrl).path
            in
                test "Appends segments to the path"
                    <| \() -> Expect.equal expected actual
    in
        describe "appendPathSegments"
            (List.map run inputs)



-- FRAGMENT


testHashExtract =
    let
        inputs =
            [ ( "#/users/1", "/users/1" )
            , ( "www.foo.com/hello?a=1#/users/1", "/users/1" )
            ]

        run ( input, expected ) =
            test "Extracts the hash"
                <| \() -> Expect.equal expected (Erl.extractHash input)
    in
        describe "Hash"
            (List.map run inputs)


testHash =
    let
        inputs =
            [ ( "it parses a hash by itself"
              , "#/users/1"
              , "/users/1"
              )
            , ( "it parses a hash as part of an url"
              , "www.foo.com?a=1#/users/1"
              , "/users/1"
              )
            , ( "it keeps the encoding"
              , "#/us%2Fers/1"
              , "/us%2Fers/1"
              )
            ]

        run ( testCase, input, expected ) =
            let
                actual =
                    (Erl.parse input).hash

                result =
                    Expect.equal expected actual
            in
                test testCase <| \() -> result
    in
        describe "Hash"
            (List.map run inputs)



-- QUERY


testQueryExtract =
    let
        inputs =
            [ ( "http://foo.com/users?a=1", "a=1" )
            , ( "http://foo.com/users?a=1#/users", "a=1" )
            ]

        run ( input, expected ) =
            test "Extracts the query"
                <| \() -> Expect.equal expected (Erl.extractQuery input)
    in
        describe "Query"
            (List.map run inputs)


testQuery =
    let
        inputs =
            [ ( "users?a=1&b=2", [ ( "a", "1" ), ( "b", "2" ) ] )
            , ( "users?a%3F=1%26", [ ( "a?", "1&" ) ] )
            , ( "users?a=1&a=2", [ ( "a", "1" ), ( "a", "2" ) ] )
            ]

        run ( input, expected ) =
            test "Parses the query"
                <| \() -> Expect.equal expected (Erl.parse input).query
    in
        describe "Query"
            (List.map run inputs)


testQueryToString =
    let
        inputs =
            [ ( "http://foo.com/a/?a=1&b=2#hash", "?a=1&b=2" )
            , ( "http://foo.com/a/#hash", "" )
            ]

        run ( input, expected ) =
            let
                url =
                    Erl.parse input

                actual =
                    Erl.queryToString url
            in
                test "queryToString"
                    <| \() -> Expect.equal expected actual
    in
        describe "queryToString" (List.map run inputs)



-- TO STRING


testToString =
    let
        url1 =
            { protocol = "http"
            , username = ""
            , password = ""
            , host = [ "www", "foo", "com" ]
            , path = [ "users", "1" ]
            , hasLeadingSlash = True
            , hasTrailingSlash = False
            , port_ = 2000
            , hash = "a/b"
            , query = [ ( "q", "1" ), ( "k", "2" ) ]
            }

        url2 =
            { protocol = ""
            , username = ""
            , password = ""
            , host = []
            , port_ = 0
            , path = []
            , hasLeadingSlash = False
            , hasTrailingSlash = False
            , hash = ""
            , query = []
            }

        inputs =
            [ ( "it converts to string"
              , url1
              , "http://www.foo.com:2000/users/1?q=1&k=2#a/b"
              )
            , ( "it can have a trailing slash"
              , { url1 | hasTrailingSlash = True }
              , "http://www.foo.com:2000/users/1/?q=1&k=2#a/b"
              )
            , ( "it can have an empty protocol"
              , { url1 | protocol = "" }
              , "www.foo.com:2000/users/1?q=1&k=2#a/b"
              )
            , ( "it doesn't include the port when it is 80"
              , { url1 | port_ = 80 }
              , "http://www.foo.com/users/1?q=1&k=2#a/b"
              )
            , ( "it doesn't add # when hash is empty"
              , { url1 | hash = "" }
              , "http://www.foo.com:2000/users/1?q=1&k=2"
              )
            , ( "it doesn't add query when query is empty"
              , { url1 | query = [] }
              , "http://www.foo.com:2000/users/1#a/b"
              )
            , ( "it adds duplicate values in the query"
              , { url1 | query = [ ( "a", "1" ), ( "a", "2" ) ] }
              , "http://www.foo.com:2000/users/1?a=1&a=2#a/b"
              )
            , --
              ( "it encodes values in host"
              , { url1 | host = [ "aa/bb", "com" ] }
              , "http://aa%2Fbb.com:2000/users/1?q=1&k=2#a/b"
              )
            , ( "it encodes values in path"
              , { url1 | path = [ "aa/bb", "2" ] }
              , "http://www.foo.com:2000/aa%2Fbb/2?q=1&k=2#a/b"
              )
            , ( "it encodes values in query"
              , { url1 | query = [ ( "a/b", "c/d" ) ] }
              , "http://www.foo.com:2000/users/1?a%2Fb=c%2Fd#a/b"
              )
            , ( "it handles localhost which has no ."
              , { url1 | host = [ "localhost" ] }
              , "http://localhost:2000/users/1?q=1&k=2#a/b"
              )
            , ( "it handles a url without host, port, path"
              , { url2 | hash = "a/b", query = [ ( "k", "1" ) ] }
              , "?k=1#a/b"
              )
            , ( "it handles a url with only query"
              , { url2 | query = [ ( "k", "1" ) ] }
              , "?k=1"
              )
            ]

        run ( testCase, input, expected ) =
            let
                actual =
                    Erl.toString input

                result =
                    Expect.equal expected actual
            in
                test testCase <| \() -> result
    in
        describe "toString"
            (List.map run inputs)


testRoundTrips =
    let
        inputs =
            [ ( "Just host", "http://example.com" )
            , ( "Host with port", "http://example.com:2000" )
            , ( "With path", "http://example.com/users" )
            , ( "Path with trailing slash", "http://example.com/users/" )
            , ( "Deeper path", "http://example.com/users/1" )
            , ( "With query string", "http://example.com/users/1?color=red" )
            , ( "With hash", "http://example.com/users/1#a/b" )
            , ( "With query and hash", "http://example.com/users/1?color=red#a/b" )
            , ( "Without leading slash", "users/1?color=red#a/b" )
            , ( "With leading slash", "/users/1?color=red#a/b" )
            ]

        run ( testCase, input ) =
            let
                actual =
                    (input |> Erl.parse |> Erl.toString)
            in
                test testCase
                    <| \() -> Expect.equal input actual
    in
        describe "Round trip"
            (List.map run inputs)


testNew =
    let
        expected =
            { protocol = ""
            , username = ""
            , password = ""
            , host = []
            , port_ = 0
            , path = []
            , hasLeadingSlash = False
            , hasTrailingSlash = False
            , hash = ""
            , query = []
            }

        actual =
            Erl.new
    in
        test "Generates an empty url"
            <| \() -> Expect.equal expected actual


testAddQuery =
    let
        inputs =
            [ ( Erl.new
                    |> Erl.addQuery "a" "1"
                    |> Erl.addQuery "b" "2"
                    |> .query
              , [ ( "a", "1" ), ( "b", "2" ) ]
              )
            , ( Erl.new
                    |> Erl.addQuery "a" "1"
                    |> Erl.addQuery "a" "2"
                    |> .query
              , [ ( "a", "1" ), ( "a", "2" ) ]
              )
            ]

        run ( actual, expected ) =
            test "addQuery"
                <| \() -> Expect.equal expected actual
    in
        describe "Adds to the query"
            (List.map run inputs)


testSetQuery =
    let
        inputs =
            [ ( Erl.new
                    |> Erl.addQuery "a" "1"
                    |> Erl.setQuery "a" "2"
                    |> .query
              , [ ( "a", "2" ) ]
              )
            ]

        run ( actual, expected ) =
            test "setQuery"
                <| \() -> Expect.equal expected actual
    in
        describe "Sets the query"
            (List.map run inputs)


testRemoveQuery =
    let
        expected =
            [ ( "a", "1" ) ]

        actual =
            Erl.new
                |> Erl.addQuery "a" "1"
                |> Erl.addQuery "b" "2"
                |> Erl.removeQuery "b"
                |> .query
    in
        test "Removes the query"
            <| \() -> Expect.equal expected actual


testQueryClear =
    let
        expected =
            []

        actual =
            Erl.new
                |> Erl.setQuery "a" "1"
                |> Erl.clearQuery
                |> .query
    in
        test "Cleans the query"
            <| \() -> Expect.equal expected actual


testPathEdgeCase =
    let
        expected =
            "http://some.domain/content"

        actual =
            Erl.parse "http://some.domain"
                |> Erl.appendPathSegments [ "content" ]
                |> Erl.toString
    in
        test "Single append with host"
            <| \() -> Expect.equal expected actual



-- describe : String -> List Test -> Test


all : Test
all =
    describe "Tests"
        [ testAddQuery
        , testAppendPathSegments
        , testHash
        , testHashExtract
        , testHost
        , testHostExtract
        , testNew
        , testPath
        , testPathExtract
        , testHasLeadingSlash
        , testHasTrailingSlash
        , testPort
        , testPortExtract
        , testProtocol
        , testProtocolExtract
        , testQuery
        , testQueryClear
        , testPathEdgeCase
        , testQueryExtract
        , testQueryToString
        , testRemoveQuery
        , testRoundTrips
        , testSetQuery
        , testToString
        ]
