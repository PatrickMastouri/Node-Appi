import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Model/Project';
import { ProjectService } from 'src/app/Domain/Services/project.service';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {


  constructor(private http: HttpClient, private projectService: ProjectService) { }

  path = "http://localhost:3000/upload";
  project_id: string;
  port = "4000";
  app_name = "prototype"
  projectPath = 'http://localhost:3000/api/projects/';
  tables: any;
  name: string;
  setId(project_id) {
    this.project_id = project_id;
  }
  getId() {
    return this.project_id;
  }
  setPort(port) {
    this.port = port;
  }
  getPort() {
    return this.port;
  }

  setTables(tabs) {
    this.tables = tabs;
  }

  getTables() {
    return this.tables
  }
  setName(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
  post(project: Project): any {
    return this.http.post(this.projectPath, JSON.stringify(project));

  }




  test() {
    console.log("our port is " + this.port)
  }


  upload_file(content, name, type) {
    let data = new Blob([content], { type: 'text/plain' });
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let file = new File(arrayOfBlob, "test.txt", { type: 'text/plain' });

    const formData = new FormData();
    formData.append('project', this.getId());
    formData.append('type', type);
    formData.append('name', name);
    formData.append('file', file);

    //formData.append('file', new Blob(["fileContents"], { type: 'text/plain' })); 


    this.http.post<any>(this.path, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }



  main(tables) {

    let content = "";
    let upper = "";
    let vars = "";
    tables.forEach(element => {

      upper = element.name.charAt(0).toUpperCase() + element.name.slice(1)

      vars = vars + " require('./routes/" + upper + "Routes')(app); \n"

      //    require('./routes/EcoleRoutes')(app);
    });

    content =
      `
    require('rootpath')();
    const express = require('express');
    const app = express();
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    
    mongoose.connect('mongodb://mongodb:27017/`+ this.app_name + `', function(err, res) {
        if (err) {
            console.log('ERROR: connecting to Database. ' + err);
        } else {
            console.log('Connected to Database');
        }
    });
`+ vars + `
    // start server
    //const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : `+ this.port + `;
    const server = app.listen(`+ this.port + `, function () {
        console.log('Server listening on port ' + `+ this.port + `);
    });


    //SWAGGER
var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
`
    this.upload_file(content, "app", "js")

  }


  routes(tables) {

    let content = "";
    let upper = "";
    let lower = "";

    tables.forEach(element => {
      let vars = "";

      upper = element.name.charAt(0).toUpperCase() + element.name.slice(1)
      lower = element.name.charAt(0).toLowerCase() + element.name.slice(1)

      content =
        `
module.exports = function(app) {
    var controller = require('../controllers/`+ upper + `Controller');

    //Link routes and functions
    app.get('/`+ lower + `', controller.findAll);
    app.get('/`+ lower + `/:id', controller.findById);
    app.post('/`+ lower + `', controller.add);
    app.put('/`+ lower + `/:id', controller.update);
    app.delete('/`+ lower + `/:id', controller.delete);

};
`
      this.upload_file(content, upper + "Routes", "js")

    });


  }

  controller(tables) {

    let content = "";
    let upper = "";
    let lower = "";
    tables.forEach(element => {
      let vars = "";
      let vars2 = "";

      element.columns.forEach(col => {
        if (!col.primaryKey) {

          vars = vars + col.name + ": req.body." + col.name + ",\n"
          vars2 = vars2 + element.name + "." + col.name + "= req.body." + col.name + ",\n"
        }
      });
      vars = vars.slice(0, -2);
      vars2 = vars2.slice(0, -2);

      lower = element.name.charAt(0).toLowerCase() + element.name.slice(1)

      upper = element.name.charAt(0).toUpperCase() + element.name.slice(1)

      content = `var ` + upper + ` = require('../models/` + upper + `Schema');
      var GenericController = require('./GenericController');
      var ` + upper + `Controller = new GenericController(` + upper + `);

      
      //POST - Insert a new ` + lower + ` in the DB

      ` + upper + `Controller.add = function(req, res) {
        var ` + lower + ` = new ` + upper + `({
`+ vars + `
            
        });
    
        ` + lower + `.save(function(req,res,err) {
            if (!err) {
                console.log('Created');
            } else {
                console.log('ERROR: ' + err);
            }
        });
    
        res.send(` + lower + `);
    };

      //PUT - Update a register already exists
      ` + upper + `Controller.update = function(req, res) {
        ` + upper + `.findById(req.params.id, function(err, ` + lower + `) {

        `+ vars2 + `

              ` + lower + `.save(function(err) {
                  if (!err) {
                      console.log('Updated');
                  } else {
                      console.log('ERROR: ' + err);
                  }
                  res.send(` + lower + `);
              });
          });
      };


    module.exports = ` + upper + `Controller;`
      this.upload_file(content, upper + "Controller", "js")
    });

  }


  schema(tables, connections) {

    let schema = "";
    let upper = "";
    let lower = "";


    var targetConIds = []
    var sourceConParentId = []

    connections.forEach((conn, i) => {
      targetConIds.push(conn.target)
      sourceConParentId.push(conn.sparent)
    });

    tables.forEach(element => {
      let vars = "";

      element.columns.forEach(col => {


        if ((targetConIds.includes(col.id))) {
          targetConIds.forEach((tar, i) => {
            if ((targetConIds[i] == col.id)) {
              vars = "\n" + col.name + `: {type: mongoose.Schema.Types.ObjectId, ref: '` + sourceConParentId[i].charAt(0).toUpperCase() + sourceConParentId[i].slice(1) + `',required: [true, "` + col.name + ` need it!"]},` + vars
            }

          });

        } else {
          // if ((conn.t != col.name)) 
          switch (col.datatype) {
            case "VARCHAR":
              vars = "\n" + col.name + `: {type: String,required: [true, "` + col.name + ` need it!"]},` + vars
              break;
            case "DATE":
              vars = "\n" + col.name + `: {type: Date,required: [true, "` + col.name + ` need it!"]},` + vars
              break;
            case "DATETIME":
              vars = "\n" + col.name + `: {type: Date,required: [true, "` + col.name + ` need it!"]},` + vars
              break;
            case "BOOLEAN":
              vars = "\n" + col.name + `: {type: Boolean,required: [true, "` + col.name + ` need it!"]},` + vars
              break;
            case "INT":
              //console.log(col.name)
              if (!col.primaryKey)
                vars = "\n" + col.name + `: {type: Number,required: [true, "` + col.name + ` need it!"]},` + vars
              break;
            default:
              console.log("No such type exists!");
              break;
          }

        }




      });
      vars = vars.slice(0, -1);
      upper = element.name.charAt(0).toUpperCase() + element.name.slice(1)
      lower = element.name.charAt(0).toLowerCase() + element.name.slice(1)

      schema =
        `const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
  
  const `+ lower + `Schema = new Schema({`
        + vars +
        `});
  module.exports = mongoose.model('`+ lower + `', ` + lower + `Schema);`
      this.upload_file(schema, upper + "Schema", "js")

    });

  }

  package() {

    const c = `{
      "name": "test",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "author": "",
      "license": "ISC",
      "dependencies": {
        "body-parser": "^1.19.0",
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "mongoose": "^5.12.3",
        "rootpath": "^0.1.2",
        "swagger-jsdoc": "^7.0.0-rc.6",
        "swagger-ui-express": "^4.1.6"
      }
    }
    `
    this.upload_file(c, "package", "json");


  }


  GenericController() {

    let GenericController =
      `
function GenericController(schema) {

var _schema = schema;

//GET - Return all _schema in the DB
GenericController.`+ this.app_name + `.findAll = function(req, res) {
    _schema.find(function(err, oBean) {
        if (!err) {
            res.send(oBean);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};

//GET - Return a _schema with specified ID
GenericController.`+ this.app_name + `.findById = function(req, res) {
    _schema.findById(req.params.id, function(err, oBean) {
        if (!err) {
            res.send(oBean);
        } else {
            console.log('ERROR: ' + err);
        }
    });
};

//DELETE - Delete a _schema with specified ID
GenericController.`+ this.app_name + `.delete = function(req, res) {
    _schema.findById(req.params.id, function(err, oBean) {
        if (!err && oBean) {
            oBean.remove(function(err) {
                if (!err) {
                    res.send({
                        'operation': 'succes'
                    });
                } else {
                    console.log('ERROR: ' + err);
                    res.send({
                        'operation': err
                    });
                }
            });
        } else {
            console.log('ERROR: ' + err);
            res.send({
                'operation': err
            });
        }
    });
};
}

module.exports = GenericController;
`

    this.upload_file(GenericController, "GenericController", "js");
  }




  Swagger(tables) {
    let content = "";
    let tags = "";
    let paths = "";
    let definitions = "";
    let pkey ="";
    tables.forEach(element => {

      let upper = element.name.charAt(0).toUpperCase() + element.name.slice(1)
      let lower = element.name.charAt(0).toLowerCase() + element.name.slice(1)


      let properties = "";




      element.columns.forEach(col => {

        if(col.primaryKey){
          pkey=col.name;
        }
        
        switch (col.datatype) {
          case "VARCHAR":
            properties = `\n"` + col.name + `": {"type": "string"},` + properties
            break;
          case "DATE":
            properties = `\n"` + col.name + `": {"type": "string"},` + properties
            break;
          case "DATETIME":
            properties = `\n"` + col.name + `": {"type": "string"},` + properties
            break;
          case "BOOLEAN":
            properties = `\n"` + col.name + `": {"type": "boolean"},` + properties
            break;
          case "INT":
            //console.log(col.name)
            if (!col.primaryKey)
              properties = `\n"` + col.name + `": {"type": "integer"},` + properties
            break;
          default:
            console.log("No such type exists!");
            break;
        }


      });
      properties = properties.slice(0, -1);







      tags =
        `\n
{
  "name": "`+ upper + `",
  "description": "API for `+ lower + ` in the system"
},
`+ tags

      paths =
        `
\n
"/`+ lower + `/{`+ pkey + `}": {
  "get": {
    "operationId": "get",
    "tags": ["`+ upper + `"],
    "summary": "Get a `+ lower + ` in system",
    "parameters": [
      {
        "name": "`+ pkey + `",
        "in": "path",
        "description": "`+ upper + ` id",
        "schema": {
          "$ref": "#/definitions/One`+ upper + `"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "OK",
        "schema": {"$ref": "#/definitions/One`+ upper + `"}
      }
    }
  },
  "delete": {
    "summary": "Delete `+ lower + ` with given ID",
    "tags": ["`+ upper + `"],
    "parameters": [
      {
        "name": "`+ pkey + `",
        "in": "path",
        "description": "`+ upper + ` id",
        "schema": {
          "$ref": "#/definitions/One`+ upper + `"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "`+ lower + ` is deleted",
        "schema": {
          "$ref": "#/definitions/One`+ upper + `"
        }
      }
    }
  },
  "put": {
    "summary": "Update `+ lower + ` with given ID",
    "tags": ["`+ upper + `"],

    "parameters": [      {
      "name": "`+ pkey + `",
      "in": "path",
      "schema": {
        "type": "string"
      }
    },{"name": "`+ lower + `","in": "body","description": "` + upper + ` that we want to create","schema": {"$ref": "#/definitions/One` + upper + `"}}],
    "responses": {
      "200": {
        "description": "`+ upper + ` is updated",
        "schema": {
          "$ref": "#/definitions/One`+ upper + `"
        }
      }
    }
  }
},
\n

"/`+ lower + `": {
  "get": {
    "operationId": "get",
    "tags": ["`+ upper + `"],
    "summary": "Get all `+ lower + ` in system",
    "responses": {
      "200": {
        "description": "OK",
        "schema": {"$ref": "#/definitions/All`+ upper + `"}
      }
    }
  },
  "post": {
    "operationId": "post",
    "tags": ["`+ upper + `"],
    "summary": "Post a `+ lower + ` in system",
    "responses": {
      "200": {
        "description": "OK",
        "schema": {"$ref": "#/definitions/All`+ upper + `"}
      }
    },
    "parameters": [{"name": "`+ lower + `","in": "body","description": "` + upper + ` that we want to create","schema": {"$ref": "#/definitions/One` + upper + `"}}]
  }
},
`+ paths



      definitions =
        `
\n
"One`+ upper + `": {
  "properties": {
`+ properties + `
  }
},
"All`+ upper + `": {"type": "array","$ref": "#/definitions/One` + upper + `"},
`+ definitions



    });

    tags = tags.slice(0, -2);
    paths = paths.slice(0, -2);
    definitions = definitions.slice(0, -2);



    content =
      `
{
	"swagger": "2.0",
	"info": {
		"version": "1.0.0",
		"title": "Crud Project",
		"description": "My Project Application API",
		"license": {
			"name": "MIT",
			"url": "https://opensource.org/licenses/MIT"
		}
	},
	"host": "localhost:`+ this.port + `",
	"basePath": "/",
	"tags": [
`+ tags + `
	],
	"paths": {
`+ paths + `
	},
 	"definitions": {
`+ definitions + `
 	},
	"schemes": ["http"],
	"consumes": ["application/json"],
	"produces": ["application/json"]
}
`
    this.upload_file(content, "swagger", "json")

  }




  sql_content(tables, connections) {


    let tables2 = "";
    let attributes = "";

    tables.forEach(element => {

      attributes = "";
      element.columns.forEach(col => {

        switch (col.datatype) {
          case "VARCHAR":
            attributes = attributes + col.name + " varchar(255),";
            break;
          case "DATE":
            attributes = attributes + col.name + " date,";
            break;
          case "DATETIME":
            attributes = attributes + col.name + " datetime,";
            break;
          case "BOOLEAN":
            attributes = attributes + col.name + " tinyint(1),";
            break;
          case "INT":
            console.log(col.name)
            if (col.primaryKey)
              attributes = attributes + col.name + " int(11) PRIMARY KEY AUTO_INCREMENT,";
            else
              attributes = attributes + col.name + " int(11),";
            break;
          default:
            console.log("No such type exists!");
            break;
        }

      });
      attributes = attributes.slice(0, -1);

      tables2 = tables2 + `CREATE TABLE ` + element.name + ` (` + attributes + `);` + "\n";
    });

    let cns = "";

    connections.forEach(con => {

      cns = cns + "ALTER TABLE `" + con.tparent + "`\n ADD CONSTRAINT FK_" + con.tparent + "_" + con.t + "\n FOREIGN KEY (" + con.t + ") REFERENCES " + con.sparent + "(" + con.s + "); " + "\n"

    });
    tables2 = tables2 + cns + "\n";
    this.upload_file(tables2, this.app_name, "sql")

  }


  dockerFile() {
    const content =
      `
FROM node:12
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .
EXPOSE `+ this.port + `
CMD [ "node", "app.js" ]
`
    this.upload_file(content, "node", "dockerfile")

  }


  generate_mongo(form) {

    //upload schema mongo js
    this.schema(form.tables, form.connections);
    //upload controller mongo js
    this.controller(form.tables);
    //upload routes mongo js
    this.routes(form.tables);
    //upload main mongo js
    this.main(form.tables);
    //upload package js
    this.package();
    //upload Generic Controller js
    this.GenericController();
    //upload Swagger js
    this.Swagger(form.tables);
    //upload dockerfile js
    this.dockerFile();
  }







}
