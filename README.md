# Matango

> Minimalistic format for expressing key-value pairs.

Matango is a simple format for expressing lists of key-value pairs. It is easy for humans to read and write. It is easy for machines to parse and generate.

Matango is text format similar to a line of [CSV][CSV], but has some more restrictions and extensions to it.

Matango is not a general purpose data exchange format like [JSON][JSON] or [YAML][YAML]. Rather it aims to only express a list of simple key-value pairs and to be embedded in other languages like HTML, YAML, JSON or any other custom DSLs.

# Example

A typical matango line looks like the below.

```
foo,bar,baz=quux,hello=Matango!
```

This parses to something like (in JSON format):

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

This is to encourage embedding Matango inside quotes or parens in other languages.

# Notes (Semantics)

- Each key-value pair is separated by `,`.
- `<whitespaces>` before and after each key and value are stripped.
  - So there is no way to express a key or value which starts or ends with whitespaces.
- There sould one or zero `=` symbol inside each key-value pair.
  - if a key-value pair has more than one `=` symbol, then it should be a parse error.
  - If there is no `=` symbol in key-value pair, that's ok and the value is `null` in that case.
  - There is no way to include `=` symbol in key or value.

# Parsers

JavaScript:

```js
const INVALID_CHARS = /[\n\t()"']/

const parseMatango = (matango) => {
  const match = matango.match(FORBIDDEN_CHARS)

  if (match) {
    throw new Error(`invalid chars are found: ${match[0]}`)
  }

  return matango.trim().split(/\s*,\s*/).map(kv => {
    const sepIndex = kv.indexOf('=')

    if (sepIndex === -1) {
      return { key: kv, value: null }
    }

    const key = kv.substr(0, sepIndex).trim()
    const value = kv.substr(sepIndex + 1).trim()

    if (value.indexOf('=') === -1) {
      throw new Error('More than one "=" found in key-value pair.'
    }

    return { key, value }
  })
}
```

# License

MIT

[CSV]: https://en.wikipedia.org/wiki/Comma-separated_values
[JSON]: http://json.org/
[YAML]: http://yaml.org/
