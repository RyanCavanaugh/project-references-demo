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
```

#### Build and Build Configuration
```
/core                  Base library for this application
/lib                   Output folder (not checked in)
/tsproject.json        Shared configuration file for common compiler options
/gulpfile.js           Gulpfile
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

The following branches are provided for demo purposes

### `circular`
This branch introduces a circular dependency by editing the `core` project's `tsconfig.json` to add a dependency to `zoo`.
Attempting to build any project will cause an error:
```
> git checkout circular
> gulp core
[07:25:22] Using gulpfile C:\github\project-references-demo\gulpfile.js
[07:25:22] Starting 'core'...
TS6187: Project references may not form a circular graph. Cycle detected:
    C:/github/project-references-demo/core/tsconfig.json ->
    C:/github/project-references-demo/zoo/tsconfig.json ->
    C:/github/project-references-demo/animals/tsconfig.json ->
    C:/github/project-references-demo/core/tsconfig.json
[07:25:25] Finished 'core' after 2.89 s
```
### `bad-ref`
This branch introduces an illegal reference in the source code by adding an `import` targeting a file outside the project folder. Attempting to build `core` will cause an error:
```
> git checkout bad-ref
> gulp core
[07:30:24] Using gulpfile C:\github\project-references-demo\gulpfile.js
[07:30:24] Starting 'core'...
TS6059: File 'C:/github/project-references-demo/animals/animal.ts' is not under 'rootDir' 'C:/github/project-references-demo/core'. 'rootDir' is expected to contain all source files.
[07:30:26] Finished 'core' after 2.4 s
```

### `empty-sleeves`
Nothing up my sleeves 🐇🎩!
This branch *deletes* the `core` and `animals` source files.
The `zoo` project can still be built because it only consumes the output files.
```
> gulp clean
> gulp animals
> git checkout empty-sleeves
> gulp zoo

```

