# SeaProject
For this project we use a basic Angular Setup combined with TypeScript for the backend. For styling we mainly want to use TailWindCSS, but also have options for classical CSS.

## Installation Guide
- Download and install `nodeJS`, make sure to download v20.12.2, Angular doesn't work for newer versions yet. https://nodejs.org/en/download  <br />
- Download and install `yarn` (our package manager) - https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable  <br />
- Install the Angular Client `npm install -g @angular/cli`, (npm comes with nodeJS). If it gives permission errors run `sudo npm install -g @angular/cli` (atleast on Mac). It will then prompt you a answer Yes/No to a few basic thing, I would suggest to enable the auto-complete feature. 
- Check if yarn and Angular have been installed correctly by checking `ng version` & `yarn version`.
- Add VSCode Extensions listed below AND setup biome as code formatter

### Add VSCode Extensions
Add the following extensions:
  * Angular Language Service
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

To start a development server we have two different options for this project, due to working with Electron to create a desktop app. 

The first option is the classic Web-dev way in which you run `yarn dev` for a dev server. Then navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

The second option is running the development server using electron. This will pop up a desktop app, and is more of what our application will finally look like. This can be started using `yarn electron`. Currently this will jot automatically reload if you change any source files, I would therefore recommend to start out with the first option, and then when a new visual part has been added to the app, check if everything still works out in the desktop app. 

### Building the Project 
Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Especially before pushing any changes to git, try to build the application first and see if it compiles successfully. While developing you won't always be able to catch all issues the compiler might be mad about.

You can also package the entire project using `yarn package:mac` or `yarn package:win`. This will create a new folder including the final executable for mac or windows and all dependent files called 'PackagedApp-...'

## Use Angular to create New Components
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` depending on what you currently need.

## General File Setup Explanation
Starting in the main Folder of the project:
* tsconfig.---.json: are typescript configuration files, you won't need these that much. tsconig.spec.json is a typescript config file specifically for testing. In general all .spec. files are for tests.
* tailwind.config.js: is the TailWindCSS config file. This is mainly for theming, but you most likely won't have to worry about it.
* package.json: Is very important, under 'dependencies' it shows all currently installed packages (the ones you add with `yarn add` or `npm install`) and their versions. Here you check if you have correctly installed packages. Under 'scripts' it will show whats behind the different `yarn ...` commands explained throughout this README. You can add new ones if needed.
* biome.json: This is the config file for the biome formatter, you don't need to change anything here.
* app.js: This is the main electron file which wraps the entire app. It includes code for creating a desktop window and closing it etc. This is also the only specific Electron file currently, everything else comes from the Angular Project setup. 
* angular.json: Angular config file
* /Prisma: This folder includes the Prisma schema, further details about Prisma below.
* /src: This folder includes the entire Angular app.
    * styles.css: Thes styles added here will be available and executed for EVERY component/page on the app. Only add things here if you know it should be used everywhere, otherwise use the component specific CSS file. It currently includes only Tailwind flags, which are necessary for Tailwind to work.
    * main.ts: This is the entry point of the app. (This is what starts it)
    * index.html: This is the very general html needed for the app to work in the browser. Everything in our app comes through the <app-root> tag in the body, which links to the app.component.ts in the /app folder. You shouldn't have to edit anything here!
* /src/app: This folder includes everything code related. This is where all the main logic for our project will be.
  *    app.routes.ts: this is where you defined routes. Or what on the website would be a new page, fx youtube.com/new_route.
  *    app.config.ts: Used for further app configurations.
  *    all app.component files: these act as the root of our project. (Don't confuse this with the landing/home page of the app, routing is a bit weird here. Essentially, when you add something inside the app.component.html it will be shown on ALL routes with first priority. Currently there is a <nav> as in navigation-bar inside of it just for testing. Watching tutorials and trial and error will give you more insight in how these work.
  *    /home and /survey, are two basic components I have created using `ng generate component`. These are thought to be two pages, 'home' the actual landing page, and 'survey' our survey page for all participants. A component does not have to act as a page exclusively, it will only become a page if added to the app.routes.ts. 

## Prisma and Databases
Prisma is a library that makes it easy to setup database tables, perform querys and updates. The general documentation can be found at `https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma`. After updating the database with Prisma, it is important to execute `yarn prisma generate`, to update your local Prisma client so that you can make use of the changes inside the code. Furthermore when connected to a database you can `yarn prisma db push`, to push your database changes from the prisma schema to the database. And you can open `yarn prisma studio`, to see all database tables and data. 

Watch this for a very quick overview: `https://www.youtube.com/watch?v=rLRIB6AF2Dg`.

## UI Libraries
Currently only `PrimeNG` is installed as a UI library. When you want to create new UI stuff which includes more than a basic div visit this page `https://primeng.org/` and see if you can find and import it from there. It will make our life quite easy using this, but its an additional learning curve. I would suggest reading through the 'getting started' pages on primeng.org to understand a bit about it and try to do some imports yourself and see how it works. 

Another good library we can technically use if this one is not sufficient is `Angular Material`, don't worry about it in the beginning but if you don't find what you look for on PrimeNG have a look there. 

## Useful Links for Web-Dev onboarding
* For ICONS use Lucide-Angular. The package is already installed, individual Icons can just be imported. You can find the Icon overview here `https://lucide.dev/icons/` and a guide over how to use it here `https://lucide.dev/guide/packages/lucide-angular`. 
* Angular and OOP
  * This is long but has explanations of a lot of web-dev stuff (Try to get through as much as you need here): https://www.youtube.com/watch?v=k5E2AVpwsko
  * Tutorial about Angular hooks - these are also quite important to know and will be used frequently: https://www.youtube.com/watch?v=Qts7H8P-FpI
  * OOP: https://medium.com/@greennolgaa/understanding-object-oriented-programming-concepts-in-angular-7549547c3f68
  * Atleast watch the project structure and set up part, there is also some intro to APIs: https://www.youtube.com/watch?v=f7BJFTEbc10&t=3838s
  * OOP with Angular: https://www.youtube.com/watch?v=dT-USOLoW5k&list=PLaNS0Z4LpEp0FrYiSQKhFP7kmfLarmSQK&index=9
  * OOP in general with TypeScript: https://www.youtube.com/watch?v=OsFwOzr3_sE
  * Understand basic Routing in Angular: https://www.youtube.com/watch?v=Np3ULAMqwNo&list=PLL1Qjcyc2dwa6-v7IlsgEctB-uD-B8Znd&index=7
  * Understand how we wrap a Angular Web-app with Electron (only if you're interested): https://www.youtube.com/watch?v=Ckn5rH7q4P8&list=PLL1Qjcyc2dwa6-v7IlsgEctB-uD-B8Znd&index=1

## Running unit tests
Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

