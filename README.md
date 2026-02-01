# Naruto-Store
Dattebayo

![b9397d70-0232-4a8b-8b3e-edd4c15eb9bb_800x939](https://github.com/user-attachments/assets/ff13b920-8cfe-4605-bc83-80c2dfaf5ac5)

# 🍥 Ramen Ichiraku Store - Loja Temática Naruto

![Banner Konoha](https://img.shields.io/badge/Vila_da_Folha-Konoha-orange?style=for-the-badge&logo=leaflet&logoColor=white)
![Versão](https://img.shields.io/badge/Versão-1.0_chuunin-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

**Uma loja virtual temática do universo Naruto, desenvolvida como projeto escolar pelos genins da programação!**

> *"Dattebayo! Encontre os melhores itens ninja aqui!"* - Naruto Uzumaki

## 🎌 Sobre o Projeto

A **Ramen Ichiraku Store** é uma aplicação web completa de e-commerce inspirada no anime Naruto. Desenvolvida como trabalho acadêmico, oferece uma experiência imersiva no mundo ninja com produtos temáticos, carrinho de compras e interface intuitiva.

### ✨ Funcionalidades Principais

- 🛍️ **Catálogo de Produtos Ninja** - Kunais, shurikens, headbands e muito mais!
- 🛒 **Carrinho de Compras** - Sistema completo de adição/remoção de itens
- 🔐 **Sistema de Login** - Acesso seguro para shinobis
- 📱 **Design Responsivo** - Perfeito para missões em qualquer dispositivo
- 🎨 **Tema Konoha** - Cores e elementos visuais da Vila da Folha
- 📦 **Checkout Simulado** - Processo de compra simplificado

## 🚀 Tecnologias Utilizadas

| Tecnologia | Função | 
|------------|--------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) | Estrutura da vila (páginas) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) | Estilo e aparência ninja |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | Jutsus interativos |
| ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) | Controle de versão |
| ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) | Hospedagem do repositório |

## 🏃‍♂️ Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno (Chakra recomendado)
- Git instalado (opcional)

### Passos da Missão

```bash
# 1º Jutsu: Clonar o repositório
git clone https://github.com/reylanbit/Ninja-Store.git

# 2º Jutsu: Entrar na vila (pasta do projeto)
Rodei o npm install - todas as dependências estão instaladas

# 3º Jutsu: Abrir o portal (servidor local)
O servidor dev tá rodando na porta http://localhost:5173
npm run fix - instala todas as dependências
npm run start - instala dependências E já abre o servidor dev automaticamente

```

**Acesse no navegador:** `http://localhost:8000`

## 📁 Estrutura do Projeto

```
Ninja-Store/
C:.
├───.vscode
├───node_modules
│   ├───.bin
│   ├───.vite
│   │   └───deps
│   ├───.vite-temp
│   ├───@babel
│   │   ├───code-frame
│   │   │   └───lib
│   │   ├───compat-data
│   │   │   └───data
│   │   ├───core
│   │   │   ├───lib
│   │   │   │   ├───config
│   │   │   │   │   ├───files
│   │   │   │   │   ├───helpers
│   │   │   │   │   └───validation
│   │   │   │   ├───errors
│   │   │   │   ├───gensync-utils
│   │   │   │   ├───parser
│   │   │   │   │   └───util
│   │   │   │   ├───tools
│   │   │   │   ├───transformation
│   │   │   │   │   ├───file
│   │   │   │   │   └───util
│   │   │   │   └───vendor
│   │   │   └───src
│   │   │       └───config
│   │   │           └───files
│   │   ├───generator
│   │   │   └───lib
│   │   │       ├───generators
│   │   │       └───node
│   │   ├───helper-compilation-targets
│   │   │   └───lib
│   │   ├───helper-globals
│   │   │   └───data
│   │   ├───helper-module-imports
│   │   │   └───lib
│   │   ├───helper-module-transforms
│   │   │   └───lib
│   │   ├───helper-plugin-utils
│   │   │   └───lib
│   │   ├───helper-string-parser
│   │   │   └───lib
│   │   ├───helper-validator-identifier
│   │   │   └───lib
│   │   ├───helper-validator-option
│   │   │   └───lib
│   │   ├───helpers
│   │   │   └───lib
│   │   │       └───helpers
│   │   ├───parser
│   │   │   ├───bin
│   │   │   ├───lib
│   │   │   └───typings
│   │   ├───plugin-transform-react-jsx-self
│   │   │   └───lib
│   │   ├───plugin-transform-react-jsx-source
│   │   │   └───lib
│   │   ├───template
│   │   │   └───lib
│   │   ├───traverse
│   │   │   └───lib
│   │   │       ├───path
│   │   │       │   ├───inference
│   │   │       │   └───lib
│   │   │       └───scope
│   │   │           └───lib
│   │   └───types
│   │       └───lib
│   │           ├───asserts
│   │           │   └───generated
│   │           ├───ast-types
│   │           │   └───generated
│   │           ├───builders
│   │           │   ├───flow
│   │           │   ├───generated
│   │           │   ├───react
│   │           │   └───typescript
│   │           ├───clone
│   │           ├───comments
│   │           ├───constants
│   │           │   └───generated
│   │           ├───converters
│   │           ├───definitions
│   │           ├───modifications
│   │           │   ├───flow
│   │           │   └───typescript
│   │           ├───retrievers
│   │           ├───traverse
│   │           ├───utils
│   │           │   └───react
│   │           └───validators
│   │               ├───generated
│   │               └───react
│   ├───@esbuild
│   │   └───win32-x64
│   ├───@eslint
│   │   ├───config-array
│   │   │   └───dist
│   │   │       ├───cjs
│   │   │       │   └───std__path
│   │   │       └───esm
│   │   │           └───std__path
│   │   ├───config-helpers
│   │   │   └───dist
│   │   │       ├───cjs
│   │   │       └───esm
│   │   ├───core
│   │   │   └───dist
│   │   │       ├───cjs
│   │   │       └───esm
│   │   ├───eslintrc
│   │   │   ├───conf
│   │   │   ├───dist
│   │   │   ├───lib
│   │   │   │   ├───config-array
│   │   │   │   ├───shared
│   │   │   │   └───types
│   │   │   └───node_modules
│   │   │       └───globals
│   │   ├───js
│   │   │   ├───src
│   │   │   │   └───configs
│   │   │   └───types
│   │   ├───object-schema
│   │   │   └───dist
│   │   │       ├───cjs
│   │   │       └───esm
│   │   └───plugin-kit
│   │       └───dist
│   │           ├───cjs
│   │           └───esm
│   ├───@eslint-community
│   │   ├───eslint-utils
│   │   │   └───node_modules
│   │   │       └───eslint-visitor-keys
│   │   │           ├───dist
│   │   │           └───lib
│   │   └───regexpp
│   ├───@humanfs
│   │   ├───core
│   │   │   ├───dist
│   │   │   └───src
│   │   └───node
│   │       ├───dist
│   │       └───src
│   ├───@humanwhocodes
│   │   ├───module-importer
│   │   │   ├───dist
│   │   │   └───src
│   │   └───retry
│   │       └───dist
│   ├───@jridgewell
│   │   ├───gen-mapping
│   │   │   ├───dist
│   │   │   │   └───types
│   │   │   ├───src
│   │   │   └───types
│   │   ├───remapping
│   │   │   ├───dist
│   │   │   ├───src
│   │   │   └───types
│   │   ├───resolve-uri
│   │   │   └───dist
│   │   │       └───types
│   │   ├───sourcemap-codec
│   │   │   ├───dist
│   │   │   ├───src
│   │   │   └───types
│   │   └───trace-mapping
│   │       ├───dist
│   │       ├───src
│   │       └───types
│   ├───@rolldown
│   │   └───pluginutils
│   │       └───dist
│   ├───@rollup
│   │   ├───rollup-win32-x64-gnu
│   │   └───rollup-win32-x64-msvc
│   ├───@types
│   │   ├───babel__core
│   │   ├───babel__generator
│   │   ├───babel__template
│   │   ├───babel__traverse
│   │   ├───estree
│   │   └───json-schema
│   ├───@vitejs
│   │   └───plugin-react
│   │       └───dist
│   ├───acorn
│   │   ├───bin
│   │   └───dist
│   ├───acorn-jsx
│   ├───ajv
│   │   ├───dist
│   │   ├───lib
│   │   │   ├───compile
│   │   │   ├───dot
│   │   │   ├───dotjs
│   │   │   └───refs
│   │   └───scripts
│   ├───ansi-styles
│   ├───argparse
│   │   └───lib
│   ├───array-buffer-byte-length
│   │   ├───.github
│   │   └───test
│   ├───array-includes
│   │   ├───.github
│   │   └───test
│   ├───array.prototype.findlast
│   │   ├───.github
│   │   └───test
│   ├───array.prototype.flat
│   │   ├───.github
│   │   └───test
│   ├───array.prototype.flatmap
│   │   ├───.github
│   │   └───test
│   ├───array.prototype.tosorted
│   │   ├───.github
│   │   └───test
│   ├───arraybuffer.prototype.slice
│   │   └───test
│   ├───async-function
│   │   ├───.github
│   │   └───test
│   ├───available-typed-arrays
│   │   ├───.github
│   │   └───test
│   ├───balanced-match
│   │   └───.github
│   ├───baseline-browser-mapping
│   │   └───dist
│   ├───brace-expansion
│   ├───browserslist
│   ├───call-bind
│   │   ├───.github
│   │   └───test
│   ├───call-bind-apply-helpers
│   │   ├───.github
│   │   └───test
│   ├───call-bound
│   │   ├───.github
│   │   └───test
│   ├───callsites
│   ├───caniuse-lite
│   │   ├───data
│   │   │   ├───features
│   │   │   └───regions
│   │   └───dist
│   │       ├───lib
│   │       └───unpacker
│   ├───chalk
│   │   └───source
│   ├───color-convert
│   ├───color-name
│   ├───concat-map
│   │   ├───example
│   │   └───test
│   ├───convert-source-map
│   ├───cookie
│   │   └───dist
│   ├───cross-spawn
│   │   └───lib
│   │       └───util
│   ├───data-view-buffer
│   │   ├───.github
│   │   └───test
│   ├───data-view-byte-length
│   │   ├───.github
│   │   └───test
│   ├───data-view-byte-offset
│   │   ├───.github
│   │   └───test
│   ├───debug
│   │   └───src
│   ├───deep-is
│   │   ├───example
│   │   └───test
│   ├───define-data-property
│   │   ├───.github
│   │   └───test
│   ├───define-properties
│   │   └───.github
│   ├───doctrine
│   │   └───lib
│   ├───dunder-proto
│   │   ├───.github
│   │   └───test
│   ├───electron-to-chromium
│   ├───es-abstract
│   │   ├───.claude
│   │   ├───2015
│   │   │   └───tables
│   │   ├───2016
│   │   │   └───tables
│   │   ├───2017
│   │   │   └───tables
│   │   ├───2018
│   │   │   └───tables
│   │   ├───2019
│   │   │   └───tables
│   │   ├───2020
│   │   │   ├───BigInt
│   │   │   ├───Number
│   │   │   └───tables
│   │   ├───2021
│   │   │   ├───BigInt
│   │   │   ├───Number
│   │   │   └───tables
│   │   ├───2022
│   │   │   ├───BigInt
│   │   │   ├───Number
│   │   │   └───tables
│   │   ├───2023
│   │   │   ├───BigInt
│   │   │   ├───Number
│   │   │   └───tables
│   │   ├───2024
│   │   │   ├───BigInt
│   │   │   ├───Number
│   │   │   └───tables
│   │   ├───2025
│   │   │   ├───BigInt
│   │   │   ├───Number
│   │   │   └───tables
│   │   ├───5
│   │   ├───helpers
│   │   │   └───records
│   │   └───operations
│   ├───es-define-property
│   │   ├───.github
│   │   └───test
│   ├───es-errors
│   │   ├───.github
│   │   └───test
│   ├───es-iterator-helpers
│   │   ├───.github
│   │   ├───aos
│   │   ├───Iterator
│   │   ├───Iterator.concat
│   │   ├───Iterator.from
│   │   ├───Iterator.prototype
│   │   ├───Iterator.prototype.constructor
│   │   ├───Iterator.prototype.drop
│   │   ├───Iterator.prototype.every
│   │   ├───Iterator.prototype.filter
│   │   ├───Iterator.prototype.find
│   │   ├───Iterator.prototype.flatMap
│   │   ├───Iterator.prototype.forEach
│   │   ├───Iterator.prototype.map
│   │   ├───Iterator.prototype.reduce
│   │   ├───Iterator.prototype.some
│   │   ├───Iterator.prototype.take
│   │   ├───Iterator.prototype.toArray
│   │   ├───Iterator.zip
│   │   ├───Iterator.zipKeyed
│   │   ├───IteratorHelperPrototype
│   │   ├───test
│   │   │   └───helpers
│   │   └───WrapForValidIteratorPrototype
│   ├───es-object-atoms
│   │   ├───.github
│   │   └───test
│   ├───es-set-tostringtag
│   │   └───test
│   ├───es-shim-unscopables
│   │   ├───.github
│   │   └───test
│   ├───es-to-primitive
│   │   ├───.github
│   │   ├───helpers
│   │   └───test
│   ├───esbuild
│   │   ├───bin
│   │   └───lib
│   ├───escalade
│   │   ├───dist
│   │   └───sync
│   ├───escape-string-regexp
│   ├───eslint
│   │   ├───bin
│   │   ├───conf
│   │   ├───lib
│   │   │   ├───cli-engine
│   │   │   │   └───formatters
│   │   │   ├───config
│   │   │   ├───eslint
│   │   │   ├───languages
│   │   │   │   └───js
│   │   │   │       └───source-code
│   │   │   │           └───token-store
│   │   │   ├───linter
│   │   │   │   └───code-path-analysis
│   │   │   ├───rule-tester
│   │   │   ├───rules
│   │   │   │   └───utils
│   │   │   │       └───unicode
│   │   │   ├───services
│   │   │   ├───shared
│   │   │   └───types
│   │   └───messages
│   ├───eslint-plugin-react
│   │   ├───configs
│   │   └───lib
│   │       ├───rules
│   │       └───util
│   ├───eslint-plugin-react-hooks
│   │   └───cjs
│   ├───eslint-plugin-react-refresh
│   ├───eslint-scope
│   │   ├───dist
│   │   └───lib
│   ├───eslint-visitor-keys
│   │   ├───dist
│   │   └───lib
│   ├───espree
│   │   ├───dist
│   │   └───lib
│   ├───esquery
│   │   └───dist
│   ├───esrecurse
│   ├───estraverse
│   ├───esutils
│   │   └───lib
│   ├───fast-deep-equal
│   │   └───es6
│   ├───fast-json-stable-stringify
│   │   ├───.github
│   │   ├───benchmark
│   │   ├───example
│   │   └───test
│   ├───fast-levenshtein
│   ├───fdir
│   │   └───dist
│   ├───file-entry-cache
│   ├───find-up
│   ├───flat-cache
│   │   └───src
│   ├───flatted
│   │   ├───cjs
│   │   ├───esm
│   │   ├───php
│   │   ├───python
│   │   └───types
│   ├───for-each
│   │   ├───.github
│   │   └───test
│   ├───framer-motion
│   │   ├───client
│   │   ├───dist
│   │   │   ├───cjs
│   │   │   ├───es
│   │   │   │   ├───animation
│   │   │   │   │   ├───animate
│   │   │   │   │   ├───animators
│   │   │   │   │   │   └───waapi
│   │   │   │   │   ├───hooks
│   │   │   │   │   ├───optimized-appear
│   │   │   │   │   ├───sequence
│   │   │   │   │   │   └───utils
│   │   │   │   │   └───utils
│   │   │   │   ├───components
│   │   │   │   │   ├───AnimatePresence
│   │   │   │   │   ├───LayoutGroup
│   │   │   │   │   ├───LazyMotion
│   │   │   │   │   ├───MotionConfig
│   │   │   │   │   └───Reorder
│   │   │   │   │       └───utils
│   │   │   │   ├───context
│   │   │   │   │   └───MotionContext
│   │   │   │   ├───events
│   │   │   │   ├───gestures
│   │   │   │   │   ├───drag
│   │   │   │   │   │   └───utils
│   │   │   │   │   └───pan
│   │   │   │   ├───motion
│   │   │   │   │   ├───features
│   │   │   │   │   │   ├───animation
│   │   │   │   │   │   ├───layout
│   │   │   │   │   │   └───viewport
│   │   │   │   │   └───utils
│   │   │   │   ├───projection
│   │   │   │   ├───render
│   │   │   │   │   ├───components
│   │   │   │   │   │   ├───m
│   │   │   │   │   │   └───motion
│   │   │   │   │   ├───dom
│   │   │   │   │   │   ├───scroll
│   │   │   │   │   │   │   ├───offsets
│   │   │   │   │   │   │   └───utils
│   │   │   │   │   │   ├───utils
│   │   │   │   │   │   └───viewport
│   │   │   │   │   ├───html
│   │   │   │   │   │   └───utils
│   │   │   │   │   └───svg
│   │   │   │   │       └───utils
│   │   │   │   ├───utils
│   │   │   │   │   └───reduced-motion
│   │   │   │   └───value
│   │   │   │       ├───scroll
│   │   │   │       └───use-will-change
│   │   │   └───types
│   │   ├───dom
│   │   │   └───mini
│   │   ├───m
│   │   └───mini
│   ├───function-bind
│   │   ├───.github
│   │   └───test
│   ├───function.prototype.name
│   │   ├───.github
│   │   ├───helpers
│   │   └───test
│   ├───functions-have-names
│   │   ├───.github
│   │   └───test
│   ├───generator-function
│   │   ├───.github
│   │   └───test
│   ├───gensync
│   │   └───test
│   ├───get-intrinsic
│   │   ├───.github
│   │   └───test
│   ├───get-proto
│   │   ├───.github
│   │   └───test
│   ├───get-symbol-description
│   │   ├───.github
│   │   └───test
│   ├───glob-parent
│   ├───globals
│   ├───globalthis
│   │   └───test
│   ├───gopd
│   │   ├───.github
│   │   └───test
│   ├───has-bigints
│   │   ├───.github
│   │   └───test
│   ├───has-flag
│   ├───has-property-descriptors
│   │   ├───.github
│   │   └───test
│   ├───has-proto
│   │   ├───.github
│   │   └───test
│   ├───has-symbols
│   │   ├───.github
│   │   └───test
│   │       └───shams
│   ├───has-tostringtag
│   │   ├───.github
│   │   └───test
│   │       └───shams
│   ├───hasown
│   │   └───.github
│   ├───ignore
│   ├───import-fresh
│   ├───imurmurhash
│   ├───internal-slot
│   │   ├───.github
│   │   └───test
│   ├───is-array-buffer
│   │   ├───.github
│   │   └───test
│   ├───is-async-function
│   │   └───test
│   ├───is-bigint
│   │   ├───.github
│   │   └───test
│   ├───is-boolean-object
│   │   ├───.github
│   │   └───test
│   ├───is-callable
│   │   ├───.github
│   │   └───test
│   ├───is-core-module
│   │   └───test
│   ├───is-data-view
│   │   ├───.github
│   │   └───test
│   ├───is-date-object
│   │   ├───.github
│   │   └───test
│   ├───is-extglob
│   ├───is-finalizationregistry
│   │   ├───.github
│   │   └───test
│   ├───is-generator-function
│   │   └───test
│   ├───is-glob
│   ├───is-map
│   │   ├───.github
│   │   └───test
│   ├───is-negative-zero
│   │   ├───.github
│   │   └───test
│   ├───is-number-object
│   │   ├───.github
│   │   └───test
│   ├───is-regex
│   │   └───test
│   ├───is-set
│   │   ├───.github
│   │   └───test
│   ├───is-shared-array-buffer
│   │   ├───.github
│   │   └───test
│   ├───is-string
│   │   ├───.github
│   │   └───test
│   ├───is-symbol
│   │   ├───.github
│   │   └───test
│   ├───is-typed-array
│   │   ├───.github
│   │   └───test
│   ├───is-weakmap
│   │   ├───.github
│   │   └───test
│   ├───is-weakref
│   │   ├───.github
│   │   └───test
│   ├───is-weakset
│   │   ├───.github
│   │   └───test
│   ├───isarray
│   ├───isexe
│   │   └───test
│   ├───iterator.prototype
│   │   ├───.github
│   │   └───test
│   ├───js-tokens
│   ├───js-yaml
│   │   ├───bin
│   │   ├───dist
│   │   └───lib
│   │       ├───schema
│   │       └───type
│   ├───jsesc
│   │   ├───bin
│   │   └───man
│   ├───json-buffer
│   │   └───test
│   ├───json-schema-traverse
│   │   └───spec
│   │       └───fixtures
│   ├───json-stable-stringify-without-jsonify
│   │   ├───example
│   │   └───test
│   ├───json5
│   │   ├───dist
│   │   └───lib
│   ├───jsx-ast-utils
│   │   ├───.github
│   │   ├───lib
│   │   │   └───values
│   │   │       └───expressions
│   │   ├───src
│   │   │   └───values
│   │   │       └───expressions
│   │   └───__tests__
│   │       └───src
│   ├───keyv
│   │   └───src
│   ├───levn
│   │   └───lib
│   ├───locate-path
│   ├───lodash.merge
│   ├───loose-envify
│   ├───lru-cache
│   ├───lucide-react
│   │   └───dist
│   │       ├───cjs
│   │       ├───esm
│   │       │   ├───icons
│   │       │   └───shared
│   │       │       └───src
│   │       └───umd
│   ├───math-intrinsics
│   │   ├───.github
│   │   ├───constants
│   │   └───test
│   ├───minimatch
│   ├───motion-dom
│   │   └───dist
│   │       ├───cjs
│   │       └───es
│   │           ├───animation
│   │           │   ├───animate
│   │           │   ├───drivers
│   │           │   ├───generators
│   │           │   │   ├───spring
│   │           │   │   └───utils
│   │           │   ├───interfaces
│   │           │   ├───keyframes
│   │           │   │   ├───offsets
│   │           │   │   └───utils
│   │           │   ├───optimized-appear
│   │           │   ├───utils
│   │           │   └───waapi
│   │           │       ├───easing
│   │           │       ├───supports
│   │           │       └───utils
│   │           ├───effects
│   │           │   ├───attr
│   │           │   ├───prop
│   │           │   ├───style
│   │           │   ├───svg
│   │           │   └───utils
│   │           ├───events
│   │           ├───frameloop
│   │           ├───gestures
│   │           │   ├───drag
│   │           │   │   └───state
│   │           │   ├───press
│   │           │   │   └───utils
│   │           │   └───utils
│   │           ├───layout
│   │           ├───projection
│   │           │   ├───animation
│   │           │   ├───geometry
│   │           │   ├───node
│   │           │   ├───shared
│   │           │   ├───styles
│   │           │   └───utils
│   │           ├───render
│   │           │   ├───dom
│   │           │   │   └───utils
│   │           │   ├───html
│   │           │   │   └───utils
│   │           │   ├───object
│   │           │   ├───svg
│   │           │   │   └───utils
│   │           │   └───utils
│   │           │       └───reduced-motion
│   │           ├───resize
│   │           ├───scroll
│   │           ├───stats
│   │           ├───utils
│   │           │   ├───mix
│   │           │   └───supports
│   │           ├───value
│   │           │   ├───types
│   │           │   │   ├───color
│   │           │   │   ├───complex
│   │           │   │   ├───maps
│   │           │   │   ├───numbers
│   │           │   │   └───utils
│   │           │   ├───utils
│   │           │   └───will-change
│   │           └───view
│   │               └───utils
│   ├───motion-utils
│   │   └───dist
│   │       ├───cjs
│   │       └───es
│   │           └───easing
│   │               ├───modifiers
│   │               └───utils
│   ├───ms
│   ├───nanoid
│   │   ├───async
│   │   ├───bin
│   │   ├───non-secure
│   │   └───url-alphabet
│   ├───natural-compare
│   ├───node-releases
│   │   └───data
│   │       ├───processed
│   │       └───release-schedule
│   ├───object-assign
│   ├───object-inspect
│   │   ├───.github
│   │   ├───example
│   │   └───test
│   │       └───browser
│   ├───object-keys
│   │   └───test
│   ├───object.assign
│   │   ├───.github
│   │   ├───dist
│   │   └───test
│   ├───object.entries
│   │   └───test
│   ├───object.fromentries
│   │   └───test
│   ├───object.values
│   │   └───test
│   ├───optionator
│   │   └───lib
│   ├───own-keys
│   │   ├───.github
│   │   └───test
│   ├───p-limit
│   ├───p-locate
│   ├───parent-module
│   ├───path-exists
│   ├───path-key
│   ├───path-parse
│   ├───picocolors
│   ├───picomatch
│   │   └───lib
│   ├───possible-typed-array-names
│   │   ├───.github
│   │   └───test
│   ├───postcss
│   │   └───lib
│   ├───prelude-ls
│   │   └───lib
│   ├───prop-types
│   │   └───lib
│   ├───punycode
│   ├───react
│   │   └───cjs
│   ├───react-dom
│   │   └───cjs
│   ├───react-is
│   │   ├───cjs
│   │   └───umd
│   ├───react-refresh
│   │   └───cjs
│   ├───react-router
│   │   └───dist
│   │       ├───development
│   │       │   └───lib
│   │       │       └───types
│   │       └───production
│   │           └───lib
│   │               └───types
│   ├───react-router-dom
│   │   └───dist
│   ├───reflect.getprototypeof
│   │   └───test
│   ├───regexp.prototype.flags
│   │   └───test
│   ├───resolve
│   │   ├───.github
│   │   ├───bin
│   │   ├───example
│   │   ├───lib
│   │   └───test
│   │       ├───dotdot
│   │       │   └───abc
│   │       ├───module_dir
│   │       │   ├───xmodules
│   │       │   │   └───aaa
│   │       │   ├───ymodules
│   │       │   │   └───aaa
│   │       │   └───zmodules
│   │       │       └───bbb
│   │       ├───node_path
│   │       │   ├───x
│   │       │   │   ├───aaa
│   │       │   │   └───ccc
│   │       │   └───y
│   │       │       ├───bbb
│   │       │       └───ccc
│   │       ├───pathfilter
│   │       │   └───deep_ref
│   │       ├───precedence
│   │       │   ├───aaa
│   │       │   └───bbb
│   │       ├───resolver
│   │       │   ├───baz
│   │       │   ├───browser_field
│   │       │   ├───dot_main
│   │       │   ├───dot_slash_main
│   │       │   ├───empty_main
│   │       │   ├───false_main
│   │       │   ├───incorrect_main
│   │       │   ├───invalid_main
│   │       │   ├───missing_index
│   │       │   ├───missing_main
│   │       │   ├───multirepo
│   │       │   │   └───packages
│   │       │   │       ├───package-a
│   │       │   │       └───package-b
│   │       │   ├───nested_symlinks
│   │       │   │   └───mylib
│   │       │   ├───null_main
│   │       │   ├───other_path
│   │       │   │   └───lib
│   │       │   ├───quux
│   │       │   │   └───foo
│   │       │   ├───same_names
│   │       │   │   └───foo
│   │       │   ├───symlinked
│   │       │   │   ├───package
│   │       │   │   └───_
│   │       │   │       ├───node_modules
│   │       │   │       └───symlink_target
│   │       │   └───without_basedir
│   │       └───shadowed_core
│   │           └───node_modules
│   │               └───util
│   ├───resolve-from
│   ├───rollup
│   │   └───dist
│   │       ├───bin
│   │       ├───es
│   │       │   └───shared
│   │       └───shared
│   ├───safe-array-concat
│   │   ├───.github
│   │   └───test
│   ├───safe-push-apply
│   │   ├───.github
│   │   └───test
│   ├───safe-regex-test
│   │   ├───.github
│   │   └───test
│   ├───scheduler
│   │   └───cjs
│   ├───semver
│   │   └───bin
│   ├───set-cookie-parser
│   │   └───lib
│   ├───set-function-length
│   │   └───.github
│   ├───set-function-name
│   │   └───.github
│   ├───set-proto
│   │   ├───.github
│   │   └───test
│   ├───shebang-command
│   ├───shebang-regex
│   ├───side-channel
│   │   ├───.github
│   │   └───test
│   ├───side-channel-list
│   │   ├───.github
│   │   └───test
│   ├───side-channel-map
│   │   ├───.github
│   │   └───test
│   ├───side-channel-weakmap
│   │   ├───.github
│   │   └───test
│   ├───source-map-js
│   │   └───lib
│   ├───stop-iteration-iterator
│   │   ├───.github
│   │   └───test
│   ├───string.prototype.matchall
│   │   ├───.github
│   │   └───test
│   ├───string.prototype.repeat
│   │   └───tests
│   ├───string.prototype.trim
│   │   └───test
│   ├───string.prototype.trimend
│   │   └───test
│   ├───string.prototype.trimstart
│   │   └───test
│   ├───strip-json-comments
│   ├───supports-color
│   ├───supports-preserve-symlinks-flag
│   │   ├───.github
│   │   └───test
│   ├───tinyglobby
│   │   └───dist
│   ├───tslib
│   │   └───modules
│   ├───type-check
│   │   └───lib
│   ├───typed-array-buffer
│   │   ├───.github
│   │   └───test
│   ├───typed-array-byte-length
│   │   ├───.github
│   │   └───test
│   ├───typed-array-byte-offset
│   │   ├───.github
│   │   └───test
│   ├───typed-array-length
│   │   ├───.github
│   │   └───test
│   ├───unbox-primitive
│   │   ├───.github
│   │   └───test
│   ├───update-browserslist-db
│   ├───uri-js
│   │   └───dist
│   │       ├───es5
│   │       └───esnext
│   │           └───schemes
│   ├───vite
│   │   ├───bin
│   │   ├───dist
│   │   ├───dist
│   │   │   ├───client
│   │   │   ├───node
│   │   │   │   └───chunks
│   │   │   └───node-cjs
│   │   ├───misc
│   │   └───types
│   │       └───internal
│   ├───which
│   │   └───bin
│   ├───which-boxed-primitive
│   │   ├───.github
│   │   └───test
│   ├───which-builtin-type
│   │   └───test
│   ├───which-collection
│   │   ├───.github
│   │   └───test
│   ├───which-typed-array
│   │   ├───.github
│   │   └───test
│   ├───word-wrap
│   ├───yallist
│   └───yocto-queue
├───public
│   └───assets
├───server
│   ├───config
│   ├───data
│   ├───middleware
│   └───routes
└───src
    ├───components
    ├───contexts
    ├───data
    ├───pages
    │   └───admin
    └───services
```

## 👥 Time de Desenvolvimento - **Equipe 7**

| Membro | Função | Especialidade | 
|--------|--------|---------------|
| **Darlann** | Hokage do Projeto | Lógica de negócio e JavaScript avançado |
| **Talita** | Kunoichi do Design | UI/UX, responsividade e animações |
| **Roger** | Sensei do Back-end | Integrações e funcionalidades complexas |

### 🎯 Contribuições Individuais

#### **Darlann** 🦊
- Arquitetura principal do JavaScript
- Sistema de carrinho de compras
- Lógica de cálculo de totais
- Integração entre módulos

#### **Talita** 🍥
- Design completo da interface
- Paleta de cores temática Konoha
- Animações e transições
- Layout responsivo para todos os dispositivos

#### **Roger** 🌀
- Estrutura de dados dos produtos
- Sistema de filtragem e busca
- Validação de formulários
- Otimização de performance

## 🌟 Destaques do Projeto

### 🎨 Design Temático Imersivo
- Cores oficiais de Konoha (laranja, vermelho, azul)
- Fontes que remetem ao anime
- Ícones e elementos visuais do universo Naruto
- Efeitos especiais de "jutsu" nas interações

### ⚡ Performance de Hokage
- Carregamento rápido como o Body Flicker Technique
- Imagens otimizadas para missões rápidas
- Código limpo e bem documentado

### 📱 Responsividade Completa
- Adaptação para todas as telas (desde smartphone até desktop)
- Menu hambúrguer para dispositivos móveis
- Layout flexível e intuitivo

## 🎮 Como Usar

1. **Acesse a Loja**: Entre na página inicial
2. **Explore os Produtos**: Navegue pelas categorias ninja
3. **Adicione ao Carrinho**: Selecione itens para sua missão
4. **Finalize a Compra**: Simule o processo de checkout
5. **Faça Login**: Crie sua conta de shinobi (opcional)

## 📚 Aprendizados da Missão

Este projeto permitiu o desenvolvimento de habilidades em:
- Trabalho em equipe seguindo a filosofia "Time 7"
- Versionamento de código com Git
- Design responsivo e acessível
- Lógica de programação aplicada
- Gestão de projeto escolar

## 🙏 Agradecimentos

> *"O trabalho em equipe é fundamental para o sucesso de qualquer missão."* - Kakashi Hatake

- **Professores**: Por guiarem nosso treinamento ninja
- **Colegas de classe**: Pelos feedbacks e sugestões
- **Comunidade Dev**: Pelos recursos compartilhados
- **Masashi Kishimoto**: Por criar o universo inspirador

## 📄 Licença

Este projeto é para fins **educacionais** e não possui fins comerciais. Todo o conteúdo de Naruto é propriedade de Masashi Kishimoto/Shueisha.

**Nota**: Este é um projeto escolar demonstrativo. Nenhum item real é vendido.

---

<p align="center">
  <img src="https://img.shields.io/badge/Desenvolvido%20com%20o%20cora%C3%A7%C3%A3o%20de%20Konoha-orange?style=for-the-badge" alt="Konoha">
  <br>
  <strong>Projeto desenvolvido pelos alunos DARLANN, TALITA e ROGER</strong>
  <br>
  © 2024 - Todos os direitos reservados à Vila da Folha
</p>

<p align="center">
  <a href="#-ramen-ichiraku-store---loja-temática-naruto">⬆️ Voltar ao topo</a>
</p>
