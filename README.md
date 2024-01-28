# Currency Converter

![Screenshot from mobile view](https://res.cloudinary.com/dbkthd6ck/image/upload/v1706092369/Screenshot_127_jvidfl.png)

## Context

This project was developed to demostrate the use of frontend technologies alongside backend technologies. It is a web application that essentially converts currencies of any kind to a desired currency using current/live rates.

## Pre-requisite

In other to successfully run this program the following should be installed:

- [NodeJs](https://nodejs.org/en/download)
- [Docker-Desktop](https://docs.docker.com/desktop/)

Create the neccessary environmental variables:

- Generate your personal Mongodb connection string [Mongodb](https://www.mongodb.com/docs/guides/atlas/account/)

- Generate a personal api key from [here](https://apilayer.com/marketplace/fixer-api)

## Technologies

This project was made by using the following technologies:

- React
- React Query
- Axios
- NodeJs
- Express
- MongoDB
- Docker

## How to run the project
This project can be ran locally and can also be ran on docker.

## Local 
The following steps should be followed after installing the prerequisite to run the project locally:

1. Create a .env file in both the frontend folder and the backend folder.
    For the backend folder, the env file would contain:
    - MONGODB_URL=<Your-Personal-MONGODB_URL>
    - JWT_SECRET=IwillNotMakeLastAttempt

    For the Frontend folder, the env file would contain:
    - VITE_API_KEY=<Personal-VITE_API_KEY>                                                      

2. run the command

   `npm install && npm run dev`

This command has to be ran in the terminal from the frontend folder and also on the backend folder to install the dependencies and run both the backend and the frontend server.
The terminal will display the URLs for both your frontend server and backend server after running the commands.

## Docker
This doesn't need you installing NodeJs or any dependencies on your machine. All dependencies would be installed on the docker container. To successfully run this project on docker the following steps should be taken:

1. Install and run docker desktop on your machine, to use docker technology

2. Update the environment variables on the docker-compose file

3. Run the following commands

    `docker-compose build`

    `docker-compose up`

    This would build the project on a Node container and the docker-compose file will simultanously run both servers and display their urls on the terminal.

## Links

The project has been deployed and can be found in the following links:

Web: [Currency-Converter](https://currency-converts.vercel.app)

    Demo Account:
        username: Spending
        password: Oporleti1?

    or
        username: jaymhorsh
        password: Ola12345.

## Developed By

[Jaji Moshood](https://github.com/jaymhorsh)  ####### Web Developer

[Azeez Razaq](https://github.com/Gbolahan-Aziz) ####### DevOps Engineer

![Contributors](https://img.shields.io/github/contributors/jaymhorsh/currency-converter?logoColor=green&style=plastic) ![GitHub repo size](https://img.shields.io/github/repo-size/jaymhorsh/currency-converter)
