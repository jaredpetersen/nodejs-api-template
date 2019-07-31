# Node.js REST API Template
[![Build Status](https://travis-ci.com/ezhai24/nodejs-api-template)](https://travis-ci.com/ezhai24/nodejs-api-template)

Simple template for creating a Node.js REST API

## Endpoints
* `GET /health`: Gets API health status
* `GET /tasks`: Lists all tasks
* `POST /tasks`: Intentionally buggy route, returns an error
* `null`: Default route, returns 404 as the endpoint requested does not exist

## Usage
```
npm install
npm test
npm run test-coverage
npm start
```

## Deployments
This project uses Travis CI and Heroku as its CI/CD infrastructures. Deployments work as follows:
* Commits on all branches will trigger a Travis build
* Merges to master will deploy to a staging environment
* NPM version bumps will deploy to a production environment

To set up Travis CI and Heroku for a new project based on this template:
* Create two Heroku apps (staging & production) and connect them to your repository
* (Optional) Add both apps to a Heroku pipeline
* Sign into Travis CI with your Github account. Then, under profile > Settings > Manage repositories on Github > Repository access, "Approve and install" Travis CI for your repository or all repositiories.
* Set the `app` parameters in the `.travis.yml` file according to the Heroku app names corresponding to each environment
* Set the `api_key` parameters in the `.travis.yml` file. If you have both the Heroku and Travis CI command line clients installed you can get your key, encrypt it and add it to your `.travis.yml` by running the following command from your project directory:
```
// Dev token
travis encrypt $(heroku auth:token)

// Prod token
travis encrypt $(heroku authorizations:create)
```
`travis` command defaults to using [travis-ci.org] as the API endpoint. If your build runs on [travis-ci.com] (even if your repository is public), add the `--pro` flag to override this:
```
// Dev
travis encrypt $(heroku auth:token) --pro

// Prod
travis encrypt $(heroku authorizations:create) --pro
```