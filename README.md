# what is this?

This is a demo of idea2code node js structure

# Installation

`npm i idea2codedemo --save -dev`

# API collections

```
 For get value http://127.0.0.1:8080/demo
 For post value http://127.0.0.1:8080/demo
 For edit value http://127.0.0.1:8080/demo/:id
 For delete value http://127.0.0.1:8080/demo/:id
 For login http://127.0.0.1:8080/demo/login
 For Protected URl http://127.0.0.1:8080/protected

```

# Decripation

```
In idea2code demo for NodeJS user, you can perform CRUD opration and also login and register with jwt token
and make you URL protected with token

make sure have too pass every data in row json

and in this demo you can also learn upload image or images

Make sure you have to create public/images folder

```

# Make .env

```
In .env file you have to add
PORT = value,
URI = Your mongodb cluter connection string,
TOKEN_SECRET = you token secret

```
