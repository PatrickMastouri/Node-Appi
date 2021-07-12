# NodeAppi
`Nodeappi`  is a user friendly web application allowing users to easily generate and run nodejs backend and test it in real time.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.
## Main features
`NodeAppi` provides several features to its users and these are our main features that will allow any user to:

- Sign in / Sign up with taking necessary security mesurements.
- Create Multiple projects.
- Generate databases schemas using a powerful database visualizer [Drag/Drop].
- Generate database schema using a powerful database visualizer.
- Chose one or multiple CRUD methods.
- Generate Nodejs Backend appplication [MongoDB/MYSQL] with your customized database schema.
- Pay using different payment methods.
- Get your application running in one click and test it in real time (Swagger).
- Get in touch with other users through a posting and commenting in forums.
## Getting Started

No matter what operating system or envirenment you're working on,You can run this application and get it working on your local machin on different platforms whether it's:
1. Mac.
1. Linux.
1. Windows.
1. Other...

In order to do that  first you have make sure that docker is successfuly installed on your machine, click [here](https://docker-curriculum.com/) to learn more.

## Docker

Now that you have docker installed on your local machine you can run `Nodeappi` following these simple steps:

### Build Required Images

Open your favorite Terminal and run these commands.

Build node image :

```sh
$ cd CURRENT_DIR/NODE_DIR
$ docker build -t nodeapp .
```

Build angular image :

```sh
$ cd CURRENT_DIR/ANGULAR_DIR
$ docker build -t nodeapp .
```

#### Docker Compose (final-step)

In order to finally build the project you can do as following:
Run with output (`CTRL+C` to stop it) :

```sh
$ docker-compose up
```

Run without output:

```sh
$ docker-compose up -d
```
and to stop execution:
```sh
$ docker-compose down
```
## Developement

`Nodeappi` uses a number of open source projects to work properly is currently extended with the following tools and Instructions on how to use them are stated below :


| Tools | Links | Usage |
| ------ | ------ | ------ |
| Angular | [Official website](https://angular.io/) | HTML enhanced for web apps!
| GitLab | [Official website](https://gitlab.com/) | Platform for unparalleled collaboration, visibility, and development velocity
| NodeJs | [Official website](https://nodejs.org/en/) | evented I/O for the backend
| MongoDb | [Official website](https://www.mongodb.com/) | distributed database built for modern application 
| MySQL | [Official website](https://www.mysql.com/) | MySQL Database Service is a fully managed database service
| Docker | [Official website](https://www.docker.com/) | Build and deploy your distributed applications 
| Swagger | [Official website](https://swagger.io/) | Simplify API development for users, teams, and enterprises


## Further information

This project was made possible by [ESPRIT UNIVERSITY](https://esprit.tn/) and thanks to our tutors who assisted us throught the whole working process.

## Further help

To get more help contact us on our [email](nodeappigroup@gmail.com)   .