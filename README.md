# Introduction

Nutflow helps you create a Bolt CMS website easily and setup an automated development environment.

Everything here is built directly with Gulp, and is based on and built around multiple sources like [Boltflow](http://boltflow.work/), [Fabrica Dev Kit](https://github.com/fabrica-wp/fabrica-dev-kit) and [Automate Your Workflow](https://automateyourworkflow.com/).

## Installation

Download the zip folder (or clone the repository), extract it,then run the following commands to install all dependencies required:

```bash
$ yarn
```

## Project Structure

Nutflow's project is divided into four main folders:

- `config`
- `gulp`
- `src`
- `www`

`config` is where you keep track of Bolt configuration files, these will be automatically copied to `./www/app/config` folder. Except for the `deploy.yml` file, which will be copied and renamed to `./www/.deploy.yml`.

`src` is where you would place all your source files. This includes all your code, images, fonts and everything else.

These files will then be treated and copied over to the default Bolt themes folder `./www/public/theme/base-inuitcss_dev` or `./www/public/theme/base-inuitcss` depending on whether you're developing or creating an optimized build.

## Development

You begin the development phase with the `gulp` command:

```bash
$ gulp
```

When `gulp` is ran, Nutflow will look through all your source folders and execute the following tasks:

- `configs` - Copies configuration files to `./www/app/config`
- `clean` - to clean the `_dev` theme directory
- `lint:js` - Check for code formats
- `images` - Copies images to `_dev` theme folder
- `fonts` - Copies fonts to `_dev` theme folder
- `sass` - Compiles Sass into CSS (Also lint sass files)
- `server` - Runs Bolt included php server
- `webpack` - Compiles JavaScript with Webpack
- `browserSync` - Launches browser for live-reload
- `watch` - watch files for changes.

You can find the configurations for each of these tasks in `gulp/task/task-name.js`.

You can also duplicate and rename the 'secrets.json.dist' file as '.secrets.json', to keep off private configurations from git.

Once the command has finished executing, you can navigate to `localhost:3000` to view your website. Everything here is placed in the `www` folder.

### Writing Sass

Sass files are kept in the `src/scss` directory. They are pre-configured to import libraries from both `bower_components` and `node_modules` folders. You can use the `@import` statement to import these modules without having to refer to the `bower_components` or `node_modules` folder.

```scss
// Importing Sass MQ.
// No need to add `bower_components` or `node_modules` folder
@import "sass-mq/mq";
```

### Writing JavaScript

JavaScript files are kept in the `src/js` folder. They are compiled from ES6 syntax to ES5 syntax with Webpack. Feel free to write ES6 immediately within any file located in `src/js`.

```js
// ES5 syntax
var _ = require('lodash');

// ES6 Syntax
import _ from 'lodash';
```

### Adding Images

All images are to be placed in the `src/images` directory.

#### Templates Folder

`src/templates` contain all `.twig` template files. This is also the location where you add files (like partials and macros) that can be imported into other `.twig` files.

### Summary for Development Phase

In short, here are the files you'd want to touch:

- `src/sass` – For Sass files
- `src/js` – For JavaScript files
- `src/images` – For images
- `src/templates` – For Twig templates, partials, macros and everything else you use in Twig.
- `config` – For tracking Bolt configuration files.

### A Quick Note on Watching

Nutflow watches every file you need, and automatically regenerates all your files whenever you save a `.twig`, `.scss`, `.js` file in the folders mentioned above.

The only thing to note is that Nutflow doesn't know when you have added a new file into the `src` folder. It cannot regenerate your site in this case.

Hence, whenever you add a new file into `gulp.src`, you must re-run the `gulp` command.

## Optimization Phase

Nutflow is built to optimize your entire website in one single command: `gulp --prod`.

```bash
$ gulp --prod
```

The `--prod` flag is a custom flag introduced to tell Nutflow that you're building a optimized site for production. Nutflow will then run through the following tasks and create an optimized theme in the `./www/public/themes/` folder.

## Deployment Phase

Nutflow has two built-in methods to help you deploy your website. They are `rsync` and `simple`.

You can set the deploy method by changing the `deploy` key in `gulp/config.js`.

Make sure you edit the `deploy.yml` file located in th the `config` folder.

## Bugs & Contributing

You can list your bugs & issues under the issue tracker in Github.

Feel free to pull the repo and contribute as well.

## Final notes

Free feel to play around with the Gulp configurations in `gulp/config.js` if you want to change your settings.

Let me know if you run into problems, or if you want some additional functionality. I'll see if I'm able to incorporate them.

It'll also be awesome if you think of ways to make this generator even better! :)

Have fun!

## Changelog

#### 1.0.0

- Initial Commit
