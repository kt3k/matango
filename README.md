# Matango

[![CircleCI](https://circleci.com/gh/kt3k/matango.svg?style=svg)](https://circleci.com/gh/kt3k/matango)
[![codecov](https://codecov.io/gh/kt3k/matango/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/matango)

> A fragment language, expressing key-value pairs, aims to be embedded in other languages.

Matango is a simple format for expressing lists of key-value pairs. It is easy for humans to read and write. It is easy for machines to parse and serialize.

Matango is not a general purpose data exchange format like [JSON][JSON] or [YAML][YAML]. Rather it aims to serve as a DSL which is embedded in another language or DSL, such as HTML, YAML, JSON etc.

# Example

A typical matango line looks like the below.

```
foo,bar,baz=quux,hello=Matango!
```

This parses to:

```json
[
  {
    "key": "foo",
    "value": null
  },
  {
    "key": "bar",
    "value": null
  },
  {
    "key": "baz",
    "value": "quux"
  },
  {
    "key": "hello",
    "value": "Matango!"
  }
]
```

# Syntax

In BNF:

```
<line> ::= <pairs>
<pairs> ::= <pair> | <pair> "," <pairs>
<pair> ::= <key> | <key> "=" <value>
<key> ::= <chars>
<value> ::= <chars>
<chars> ::= <char> | <char> <chars>
<char> ::= <alnum> | <symbol> | <whitespace>
<alnum> ::= "a" | ... | "z" | "A" | ... | "Z" | "0" | ... | "9"
<symbol> ::= "!" | "$" | "%" | "&" | "{" | "}" | "<" | ">" | "[" | "]" | "-" | "|" | "^" | "~" | "+" | "*" | ";" | ":" | "\" | "." | "/" | "\"
<whitespace> :: " " | "\t"
```

**NOTE**: The following characters are invalid in Matango:

```
\n (line break)
\r (carriage return)
() (open and close parens)
" (double quote)
' (single quote)
```

This is to encourage the embedding of Matango into quotes or parens in other languages.

# Notes (Semantics)

- Each key-value pair is separated by `,`.
- `<whitespaces>` before and after each key and value are stripped.
  - So there is no way to express a key or value which starts or ends with whitespaces.
- There sould one or zero `=` symbol inside each key-value pair.
  - if a key-value pair has more than one `=` symbol, then it should be a parse error.
  - If there is no `=` symbol in key-value pair, that's ok and the value is `null` in that case.
  - There is no way to include `=` symbol in key or value.
- A key can be an empty string. (e.g. `=foo` parses to `[{"key": "", "value": "foo"}]`)
- A value can be an empty string. (e.g. `foo=` parses to `[{"key": "foo", "value": ""}]`)
- The same keys can appear in a single matango format. (e.g. `foo,foo,foo` is valid)
- empty key-value pair is invalid
  - For example `foo,,bar` is an invalid matango expression.

# Parsers

- JavaScript: [matango](https://npm.im/matango)

# License

MIT

[CSV]: https://en.wikipedia.org/wiki/Comma-separated_values
[JSON]: http://json.org/
[YAML]: http://yaml.org/
