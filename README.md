# SeaProject


## Installation Guide

### Add VSCode Extensions
Add the following extensions:
  * Angular Language Service
  * Biome
  * Prisma
  * Tailwind CSS IntelliSense


## Yarn Introduction
Yarn works as our base package manager. 

## Code Formatter setup (pls do this)
Before doing this make sure to atleast have the Biome extension added in VSCode
On Windows press (Ctrl+Shift+P) on Mac press (Cmd+Shift+P) to open command palette. Then search for `Open User Settings (JSON)`. Inside this JSON File make sure to add:
 "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"  
  },
  "files.autoSave": "onFocusChange",
  "editor.defaultFormatter": "biomejs.biome",


## Development 
Firstly make sure you are either working on the develop branch or any feature branch. You will not be able to push directly to master, since we would like that branch to be our base for a final product. Hence every merge to master can be seen as a new `final product update`. When working on any bigger features which could result in unforseen issues please setup a new branch e.g. `feature/...` branch. Examples for this could be trying to implement Authentication, or a new large page. 
You can quickly check what branch you are on using `git branch` and switch between branches using `git checkout {branch_name}` in your local terminal. 
You create a new branch with `git branch {new_branch_name}`.

To start a development server we have two different options for this project, due to working with Electron to create a desktop app. 

The first option is the classic Web-dev way in which you run `yarn dev` for a dev server. Then navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

The second option is running the development server using electron. This will pop up a desktop app, and is more of what our application will finally look like. This can be started using `yarn electron`. Currently this will jot automatically reload if you change any source files, I would therefore recommend to start out with the first option, and then when a new visual part has been added to the app, check if everything still works out in the desktop app. 

### Building the Project 
Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Especially before pushing any changes to git, try to build the application first and see if it compiles successfully. While developing you won't always be able to catch all issues the compiler might be mad about.

### Compiling the Project to Executable

## Use Angular to create New Components
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## General File Setup Explanation

## Prisma and Databases
https://www.youtube.com/watch?v=rLRIB6AF2Dg


## Useful Links for Web-Dev onboarding
* For ICONS use Lucide-Angular. The package is already installed, individual Icons can just be imported. You can find the Icon overview here `https://lucide.dev/icons/` and a guide over how to use it here `https://lucide.dev/guide/packages/lucide-angular`. 
* Angular and OOP
  * https://medium.com/@greennolgaa/understanding-object-oriented-programming-concepts-in-angular-7549547c3f68 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

