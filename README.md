#  📤 Uploading and managing documents

## Description
It's a backend application developed in Node.js with NestJS that allows users to upload, list, and delete documents. It manages files in formats such as PDF and Word.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Example: Using a Token in API Requests

Use the extension called httpYac - Rest Client for http testing

```
POST http://localhost:3000/api/v1/upload
Content-Type: application/json
Authorization: Bearer <your-valid-token-here>

{
    "nameFile": "text1",
    "Date": "01/01/2000"
}

```