# Home Office Forms Demo Application

Currently a work in progress. The Home Office Forms (HOF) Example app will be used by developers to learn and understand more about the HOF framework. Developers will be able to learn and test out different components in the framework and build their own app using the framework. There will be forms built using the framework available for demoing.

#### How to run the app locally

Install [Homebrew](https://brew.sh/), if it is not installed

Once Homebrew is installed run

```bash
brew install nvm
```
```bash
source ~/.bash_profile
```

Install the correct version of node

```bash
nvm install 14.15.0
```

Set the node version

```bash
nvm use 14.15.0
```

Clone the service locally

```bash
git clone ...
```

Install yarn

```bash
npm i yarn -g
```

Install the dependencies

```bash
yarn
```

Run in development mode

```bash
yarn start:dev
```

go to http://localhost:8080/

### Try out the Save and Return Feature 

In the example app, you can try out a simplified version of the save and return feature present in the NRM service, which allows users to save a form and return back to it later. To try out this feature locally, you will need to set up a local database and have a local version of the hof-example-app-save-and-return-api running. 

#### Set up you local database.

Clone the hof-example-app-schema and follow the instructions on how to set up an database locally. 
Clone the hof-example-app-save-and-return-api and have this running locally, by running

```bash
yarn start
```
then run this app locally, following the instructions above and go to http://localhost:8080/feature
