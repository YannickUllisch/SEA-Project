# SeaProject
For this project we use the NextJS framework with react, wrapped by Electron. This is combined with TypeScript/Electron for the backend. For styling we use either TailwindCSS or MaterialUIs theming options. 

## Installation Guide
- Download and install `nodeJS`. https://nodejs.org/en/download  <br />
- Download and install `yarn` (our package manager) - https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable  <br />
- Check if yarn has been installed correctly by checking `yarn version`.
- Add VSCode Extensions listed below AND setup biome as code formatter

### Add VSCode Extensions
Add the following extensions:
  * AMaterial-UI Snippets
  * React
  * Biome
  * Prisma
  * Tailwind CSS IntelliSense

### Code Formatter setup
Before doing this make sure to have the Biome extension added in VSCode. This is quite important since it will ensure that the code upholds a specific standard. 
This makes it easier for everyone in the group to read and work with the code, therefore please make sure to set this up! :) <br />
On Windows press (Ctrl+Shift+P) on Mac press (Cmd+Shift+P) to open command palette. Then search for `Open User Settings (JSON)`. Inside this JSON File make sure to add:

 "editor.formatOnSave": true, <br />
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"  
  },<br />
  "files.autoSave": "onFocusChange", <br />
  "editor.defaultFormatter": "biomejs.biome", <br />


## Yarn Introduction
Yarn works as our base package manager. To add packages to our project we use `yarn add {package_name}` and to remove them `yarn remove {package_name}`. Just writing `yarn` into the terminal will load all packages based on the package.json file in the project. You will probably have to do that pretty often, especially after pulling new updates from git. E.g. When others add a package you will have to initialize them for yourself. Package errors can often be fixed by executing yarn. Otherwise you can worst case also try to delete the `node_modules` folder, which will be created a new when the project i built again. Online you will most likely find a lot of package install using 'npm', that is the nodejs package manager, if you use that instead of yarn make sure to remvoe the package.locked.json file it generates and execute `yarn` for the actual package.json to update. Usually everything that can be installed through `npm install {package_name}` can also be installed with `yarn add {package_name}`.

## Development 
Firstly make sure you are either working on the develop branch or any feature branch. You will not be able to push directly to master, since we would like that branch to be our base for a final product. Hence every merge to master can be seen as a new `final product update`. When working on any bigger features which could result in unforseen issues please setup a new branch e.g. `feature/...` branch. Examples for this could be trying to implement Authentication, or a new large page. 
You can quickly check what branch you are on using `git branch` and switch between branches using `git checkout {branch_name}` in your local terminal. 
You create a new branch with `git branch {new_branch_name}`.

To start a development server you type `yarn dev`. This will simply pop up a development app, including active web tools. 

### Building the Project 
Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Especially before pushing any changes to git, try to build the application first and see if it compiles successfully. While developing you won't always be able to catch all issues the compiler might be mad about.

You can also package the entire project using `yarn build:mac` or `yarn build:win64`. This will create a new folder including the final executable for mac or windows and all dependent file. 

## Routing with NextJS
Routing is made very simple with NextJS. When you create a new file inside the `./renderer/pages` folder e.g. `test.tsx`, this will automatically become a new page with URL `example.com/test`. When you call a file `index.tsx`, the route will depend on the current folder. Meaning the index.tsx just inside the pages folder will just be the landing page `example.com/`. While if you create a new folder called `survey` and place a index.tsx file in there the route will be `example.com/survey`. Putting a named file other than index.tsx in the survey folder will make it become `example.com/survey/namedfile`.

## General File Setup Explanation
Starting in the main Folder of the project:
* tsconfig.---.json: are typescript configuration files, you won't need these that much. tsconig.spec.json is a typescript config file specifically for testing. In general all .spec. files are for tests.
* tailwind.config.js: is the TailWindCSS config file. This is mainly for theming, but you most likely won't have to worry about it.
* package.json: Is very important, under 'dependencies' it shows all currently installed packages (the ones you add with `yarn add` or `npm install`) and their versions. Here you check if you have correctly installed packages. Under 'scripts' it will show whats behind the different `yarn ...` commands explained throughout this README. You can add new ones if needed.
* biome.json: This is the config file for the biome formatter, you don't need to change anything here.
* main/background.ts: This is the main electron file which wraps the entire app. It includes code for creating a desktop window and closing it etc. This is also the only specific Electron file currently, everything else comes from the Angular Project setup. 
* /Prisma: This folder includes the Prisma schema, further details about Prisma below.
* /main: is our backend, has basic electron files setup. Using ElectronJS IPC we communicate to the frontend part located in the /renderer directory
* /renderer: This is essentially a plain NextJS react website project. There are a bunch of basic config files you dont need to worry much about.
* /renderer/src/*: This is were all components and helper functions for the frontend should be put.
* /renderer/pages/*: this is were all pages or routes are located for the frontend. Index.tsx and survey.tsx are example routes. `_app.tsx` is the general layout for the entire project. Everything wrapped around the <Component /> will be visible on all pages. This is e.g. were you put a project wide Header or footer. It is currently wrapped with some basic setup from MUI. This includes AppCacheProvider, ThemeProvider and CSSBaseline. You dont have to change these. `_document`, is useful sometimes since it lets you find different elements in the project based on its classname or ID fx. You will probably never have to edit this file itself. The `api` folder is where nextJS Apis can be created. Yet these require internet access to work. 


## Prisma and Databases
Prisma is a library that makes it easy to setup database tables, perform querys and updates. The general documentation can be found at `https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma`. After updating the database with Prisma, it is important to execute `yarn prisma generate`, to update your local Prisma client so that you can make use of the changes inside the code. Furthermore when connected to a database you can `yarn prisma db push`, to push your database changes from the prisma schema to the database. And you can open `yarn prisma studio`, to see all database tables and data. 

Watch this for a very quick overview: `https://www.youtube.com/watch?v=rLRIB6AF2Dg`.

## UI Libraries
For UI library we use MaterialUI. This has a bunch of components that can easily be a copied into the frontend. You dont have to install the @mui/material package, it is already added. To change the looks of MUI components you apply CSS inline through the `sx={{}}` props. Inside you can e.g. change background color by `sx={{backgroundColor='red'}}`. 

## Useful Links for Web-Dev onboarding
* For ICONS use Lucide-React. The package is already installed, individual Icons can just be imported. You can find the Icon overview here `https://lucide.dev/icons/` and a guide over how to use it here `https://lucide.dev/guide/packages/lucide-react`. 
* Communication from backend to frontend via ElectronJS is done through ipc: https://www.electronjs.org/docs/latest/tutorial/ipc
* The most important react hooks to learn: `https://www.youtube.com/watch?v=-4XpG5_Lj_o` `https://www.youtube.com/watch?v=vpE9I_eqHdM` and `https://www.youtube.com/watch?v=V9i3cGD-mts&list=PLApy4UwQM3UrZsBTY111R6P4frt6WK-G2`.

## Running unit tests
Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

