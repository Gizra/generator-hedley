Elm-Base64
========

A base 64 encoding and decoding library for Elm.

## Usage

Add the import to the elm module where you want to do some base64 en- or decoding.

```elm
import Base64
```

To decode a String use

```elm
decode : String -> Result String String
decode encodedString = Base64.decode encodedString
```

To encode a String use

```elm
encode : String -> Result String String
encode regularString = Base64.encode regularString
```
