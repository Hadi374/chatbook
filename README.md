# ChatBook
project for our database concept Homework.

built using nodejs, express and mysql.

## installation:

for running this project you must have **Node JS** installed on your computer.
also mysql must be running in computer.



first clone this project in your computer:
```bash
git clone https://github.com/Hadi374/chatbook
```

then go to chatbook folder and install npm packages:
```bash
    cd chatbook
    npm install
```

and edit config.js file based on your database configuration:
```js
    module.exports = {
        host: 'localhost',
        user: <database_user>,
        password: <database_password>.
        database: 'chatbook'
    };
```

for running run this:
```bash
    npm start
```

and the server will run in [Local Host](localhost:3000) port 3000.



## Testing: 

for testing you can use REST Client (humao.rest-client) in vscode and click on top (Send Request) of any link of **api.http** file. or send those requests from another applications like postman.