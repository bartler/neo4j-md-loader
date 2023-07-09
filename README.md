# neo4j-md-loader

Simple crufty parser for issues list in markdown; nodejs typescript express api

## Pre-requisites

nodejs and yarn

## How to run

## Install deps

```
yarn install
```

### Replace hard-coded cruft

Put the markdown file containing issues in top level folder.

<<<<<<< Updated upstream
src/issuesDb.ts
line 8 replace neo4j and password with correct credentials for your database

src/routes.ts
line 20 replace issues.mdx with the name of your markdown file
line 28 replace database name ('test') with name of your database
=======
**.env**

- create a .env file with contents like:

```
dbName="tshoot"
dbUser="neo4j"
dbPass="my_secret_password"
dbUri="neo4j://localhost:7687"
appPort="4444"
issuesFilePath="../issues.mdx"
releasesFilePath="../releases.json"
```

### Start in dev mode

```
yarn start:dev
```

### Run the parser

```
curl localhost:4444/parseIssues
```

This will parse the issues file and load the issues into the specified Neo4j database.

## Todo

- [ ] Database connection details are hard coded, also database name.
- [ ] Proper organization of code and add model classes/interfaces
