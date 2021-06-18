# Project Description

This project was made to simulate on how vending machine works. We have two application frontend and backend. Frontend is made with React & Redux saga. Meanwhile backend is made using Nodejs typescript framework Nestjs.
See Live demo [here](https://vending-app.vercel.app/).

### Run application with docker
To run application with docker we have docker-compose.yml file in root of this project. This configuration is only for development purpose.
 Before running application be sure to checkout docker-compose.yml and review volumes attached in services.

**In Mongodb service named db_mongo_service we have attached /data/db of host machine make sure its is accessible to docker otherwise feel free to attach your own custom directory.**
 
**In backend config I've added default configuration from docker-compose.yml for development so you don't need to change anything but if you made any changes on docker-compose.yml be sure to update backend configuration too.**

1) Make sure docker and docker-compose is configured in your machine.
2) Run following command
    ```bash
    docker-compose build
    docker-compose up -d
    ```

## Prerequisite without docker
To run it without using docker you need to have following installed:

1. Backend 
    * You need to install npx command globally for seeders.
       ```bash
       npm install -g npx
    
        ```
    * You have to have mongodb up and running for database follow [this](https://docs.mongodb.com/manual/installation/) link if you haven't.
    
### Run backend project
1. Change directory to backend and install required packages:
    ```bash
    cd backend
    yarn i
    ```
2. Install dependencies
    ```bash
    yarn i
    ```
3) In backend there is config folder there are configuration related to application database and others. Be sure to change them according to your running environment.

4) Seed data for vending machine and its product:
    ```bash
    npx nestjs-command seed:vend
    npx nestjs-command seed:product
    ```
5) Now you can run you application. To run it in dev mode:
    ```bash
    yarn start:dev
    ```
6) To run your backend test in development mode:
    ```bash
    yarn test:watch
    ```
7) If everything goes well and you have set your backend default running port as 7777, you can visit your application through [http://localhost:7777](http://localhost:7777)

8) To view swagger documentation visit [http://localhost:7777/api](http://localhost:7777/api)

   
### Run Frontend App
1) Change directory to frontend application:
    ```bash
    cd frontend
    ```
2. Install dependencies
    ```bash
    yarn i
    ```
3) Set up environment. Copy .env.example to create new .env file and add backend base url to env key. For Example: 
    ```bash
    cp .env.example .env
    ```
    In .env file add:
    ```env
        REACT_APP_API_BASE_URI=http://localhost:7777
    ```
4) Run your application:
    ```bash
    yarn start
    ```
 7) If everything goes well, you can visit your application through [http://localhost:3000](http://localhost:3000) 
