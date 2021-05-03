# locpanel

Electronic magnetboard for displaying the presence status.

It was inspired by [scrumblr from aliasaria](https://github.com/aliasaria/scrumblr), but some functions have been left out for the sake of clarity.

Some other functions have been added

* sqlite or mssql as database
* UI in read only mode. All boards, labeling and cards are specified via an admin area.
* (todo) frontend separated from backend
* (todo) admin area for backend
* (todo) User authentication and authorization. Only users with card can access the board.


## Getting Started
Copy `.env` file from sample file, then edit the properties to your needs.
```shell
cp .env.sample .env
```

As database you can use `sqlite` or `mssql`.
You can use sqlite with the sample databasefile `locpanel.sqlite` from scratch.

You have to install the following node module, if you want to use mssql instead.
```shell
npm install tedious@11.0.7 --save-exact
```


Install node modules
```shell
npm install
```

Run server in development or production mode
```shell
npm run start:dev
npm run start
```