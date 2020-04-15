# TypeScript Project References Demo

## Files in this repository

The structure of this repo is as follows:

#### Source Code Folders
```
/core                  Base library for this application
  /tsconfig.json         Config file for 'core' project
  /utilities.ts          Submodule that exposes two utility functions
/animals               Depends on 'core'
  /tsconfig.json         Config file for 'animal' project
  /animal.ts             Defines the 'animal' type
  /dog.ts                Defines the 'dog' type
  /index.ts              Entry point module that re-exposes types from animal.ts and dog.ts
/zoo                   Depends on 'animals' (directly) and 'core' (indirectly)
  /tsconfig.json         Config file for 'zoo' project
  /zoo.ts                Creates a zoo with some dogs in it (OK it's a weird zoo)
/tsconfig.json         Solution file for the application
```

#### Build and Build Configuration
```
/core                  Base library for this application
/lib                   Output folder (not checked in)
/tsconfig-base.json    Shared configuration file for common compiler options
```

#### The Usual Suspects
```
/README.md             You're reading it
/.gitignore            For excluding build outputs and node_modules
/package.json          NPM package definition file
/package-lock.json     NPM package lock file
/node_modules          NPM modules
```

# Branches You Can Try

The following branches are provided for demo/exploration purposes

### `master`
This branch shows the normal layout

```
> git checkout master
>yarn build
yarn run v1.15.2
$ tsc -b -v
[11:02:33 AM] Projects in this build:
    * core/tsconfig.json
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * tsconfig.json

[11:02:33 AM] Project 'core/tsconfig.json' is out of date because output file 'lib/core/utilities.js' does not exist

[11:02:33 AM] Building project 'c:/github/project-references-demo/core/tsconfig.json'...

[11:02:35 AM] Project 'animals/tsconfig.json' is out of date because output file 'lib/animals/animal.js' does not exist

[11:02:35 AM] Building project 'c:/github/project-references-demo/animals/tsconfig.json'...

[11:02:35 AM] Project 'zoo/tsconfig.json' is out of date because output file 'lib/zoo/zoo.js' does not exist

[11:02:35 AM] Building project 'c:/github/project-references-demo/zoo/tsconfig.json'...

Done in 2.66s.

>
```

### `circular`
This branch introduces a circular dependency by editing the `core` project's `tsconfig.json` to add a dependency to `zoo`.
Attempting to build any project will cause an error:
```
> git checkout circular
> yarn build
yarn run v1.15.2
$ tsc -b -v
[11:52:04 AM] Projects in this build:
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * core/tsconfig.json
    * tsconfig.json

error TS6202: Project references may not form a circular graph. Cycle detected: c:/github/project-references-demo/tsconfig.json
c:/github/project-references-demo/core/tsconfig.json
c:/github/project-references-demo/zoo/tsconfig.json
c:/github/project-references-demo/animals/tsconfig.json


Found 1 error.

error Command failed with exit code 4.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

>

```

### `bad-ref`
This branch introduces an illegal reference in the source code by adding an `import` targeting a file outside the project folder. Attempting to build `core` will cause an error:
```
> git checkout bad-ref
>yarn build
yarn run v1.15.2
$ tsc -b -v
[1:40:34 PM] Projects in this build:
    * core/tsconfig.json
    * animals/tsconfig.json
    * zoo/tsconfig.json
    * tsconfig.json

[1:40:34 PM] Project 'core/tsconfig.json' is out of date because output file 'lib/core/utilities.js' does not exist

[1:40:34 PM] Building project 'c:/github/project-references-demo/core/tsconfig.json'...

animals/index.ts:1:20 - error TS6059: File 'c:/github/project-references-demo/animals/animal.ts' is not under 'rootDir' 'c:/github/project-references-demo/core'. 'rootDir' is expected to contain all source files.

1 import Animal from './animal';
                     ~~~~~~~~~~

animals/index.ts:1:20 - error TS6307: File 'c:/github/project-references-demo/animals/animal.ts' is not listed within the file list of project 'c:/github/project-references-demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

1 import Animal from './animal';
                     ~~~~~~~~~~

animals/index.ts:4:32 - error TS6059: File 'c:/github/project-references-demo/animals/dog.ts' is not under 'rootDir' 'c:/github/project-references-demo/core'. 'rootDir' is expected to contain all source files.

4 import { createDog, Dog } from './dog';
                                 ~~~~~~~

animals/index.ts:4:32 - error TS6307: File 'c:/github/project-references-demo/animals/dog.ts' is not listed within the file list of project 'c:/github/project-references-demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

4 import { createDog, Dog } from './dog';
                                 ~~~~~~~

core/utilities.ts:1:1 - error TS6133: 'A' is declared but its value is never read.

1 import * as A from '../animals';
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

core/utilities.ts:1:20 - error TS6059: File 'c:/github/project-references-demo/animals/index.ts' is not under 'rootDir' 'c:/github/project-references-demo/core'. 'rootDir' is expected to contain all source files.

1 import * as A from '../animals';
                     ~~~~~~~~~~~~

core/utilities.ts:1:20 - error TS6307: File 'c:/github/project-references-demo/animals/index.ts' is not listed within the file list of project 'c:/github/project-references-demo/core/tsconfig.json'. Projects must list all files or use an 'include' pattern.

1 import * as A from '../animals';
                     ~~~~~~~~~~~~

[1:40:35 PM] Project 'animals/tsconfig.json' can't be built because its dependency 'core' has errors

[1:40:35 PM] Skipping build of project 'c:/github/project-references-demo/animals/tsconfig.json' because its dependency 'c:/github/project-references-demo/core' has errors

[1:40:35 PM] Project 'zoo/tsconfig.json' can't be built because its dependency 'animals' was not built

[1:40:35 PM] Skipping build of project 'c:/github/project-references-demo/zoo/tsconfig.json' because its dependency 'c:/github/project-references-demo/animals' was not built


Found 7 errors.

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

>
```

### `empty-sleeves`
Nothing up my sleeves 🐇🎩!
This branch *deletes* the `core` and `animals` source files.
The `zoo` project can still be built because it only consumes the output files.
```
> gulp clean
[...]
> gulp core animals
[...]
> git checkout empty-sleeves
> gulp zoo
[07:35:22] Using gulpfile C:\github\project-references-demo\gulpfile.js
[07:35:22] Starting 'zoo'...
[07:35:24] Finished 'zoo' after 2.15 s
```
