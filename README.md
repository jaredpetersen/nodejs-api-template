# Node.js REST API Template
[![Build Status](https://travis-ci.org/jaredpetersen/nodejs-api-template.svg?branch=master)](https://travis-ci.org/jaredpetersen/nodejs-api-template)

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
