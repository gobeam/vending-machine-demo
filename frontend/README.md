# Steps to run project
1) Install dependencies
    ```bash
    yarn i
    ```
2) Set up environment. Copy .env.example to create new .env file and add backend base url to env key. For Example: 
    ```bash
    cp .env.example .env
    ```
    In .env file add required env value i.e backend base uri. Example:
    ```env
        REACT_APP_API_BASE_URI=http://localhost:7777
    ```
3) Run your application:
    ```bash
    yarn start
    ```
4) If everything goes well, you can visit your application through [http://localhost:3000](http://localhost:3000) 
