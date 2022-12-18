# WC-2022-reservation-site
An online automated ticket reservation system for football matches in FIFA World Cup Qatar 2022 with multi-user authorities

# setting-up-the-BE-env-for-the-first-time
- rename .env.example to .env
- uncomment the commented line in docker-compose.yml file
- run: " docker-compose up " in the BE folder
- wait till the env is done and print the admin user_name and password
- ctrl + c
- comment the line in the docker-compose.yml file again :)
- run: " docker-compose up " in the BE folder

    - and voalaaaaaaaaa u now can access the BE on your localhost using postman :)
    - for later times u will just run the " docker-compose up " command 