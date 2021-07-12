// @ts-check
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, Routes } from '@angular/router';
import { DragDropService } from '../../Domain/Services/dragdrop.service';
import { ProjectService } from '../../Domain/Services/project.service';
import { Project } from '../../Domain/Model/Project';

import { HttpClient, JsonpClientBackend, HttpRequest } from '@angular/common/http';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { jsPlumb, jsPlumbInstance } from "jsplumb";
import { SharedService } from "src/app/Domain/Services/shared.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {



  con;
  unsibscribe = new Subject<void>();
  selectedTableId;
  selectedColumnId;
  selectedConnectionType;
  projectdb: FormGroup;
  jsPlumbInstance;
  project_id: string;
  request: HttpRequest<any>;
  promiseResult;
  remConn: any;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router, private dragDropService: DragDropService, private projectService: ProjectService) { }

  ngOnInit() {

    //this.project_id = "608923193d3e316b6ba61fae";

    this.project_id = this.dragDropService.getId()
    /*
    this.projectdb = new FormGroup({
      dbName : new FormControl("", [Validators.required]),
      dbType : new FormControl("", [Validators.required])
    });
*/
    if (this.dragDropService.getId() === undefined) {
      this.router.navigate(['/front/addproject'])

    }

    if (this.dragDropService.getTables()) {
      this.fillFromJson(this.dragDropService.getTables())
    } else {
      this.prototype()
    }
    //this.fillFromJson()
    console.log(this.dragDropService.getTables())
    console.log("id is " + this.project_id)



  }



  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.jsPlumbInstance.Defaults.Container = ("container");
    this.jsPlumbInstance.Defaults.EndpointStyle = { radius: 7, fillStyle: "#F09E30" };

    this.jsPlumbInstance.reset();
    this.jsPlumbInstance.importDefaults({
      ConnectionsDetachable: false,
      ReattachConnections: true
    });

    /*
    this part somehow saved the issue of endpoints weird connections
    */
    const conn = this.jsPlumbInstance.connect({ source: "form", target: "form" });
    this.jsPlumbInstance.deleteConnection(conn);
    /*
    this part somehow saved the issue of endpoints weird connections
    */

    this.init();

    setTimeout(() => this.jsPlumbInstance.draggable(this.projectdb.get("tables")['controls'][0].value.id, { containment: 'parent' }), 1000);

    //Binds

    setTimeout(() =>
      this.jsPlumbInstance.bind("connection", conn => {

        const control1 = <FormArray>this.projectdb.get("connections");
        const s = conn.source.children[1].firstChild.value;
        const t = conn.target.children[1].firstChild.value;
        const sparent = conn.source.parentNode.parentNode.children[0].children[0].value;
        const tparent = conn.target.parentNode.parentNode.children[0].children[0].value;
        const type = conn.connection.canvas.nextSibling.textContent + ":" + conn.connection.canvas.nextSibling.nextSibling.nextSibling.textContent;
        const spid = conn.source.offsetParent.id
        const tpid = conn.target.offsetParent.id


        const pk = conn.source.children[3].firstChild.checked;

        if (spid == tpid) {
          const buttonModal = document.getElementById("sameTableConnection")
          buttonModal.click()
          this.jsPlumbInstance.deleteConnection(conn.connection);

        }
        else if (!pk) {
          const buttonModal = document.getElementById("notPrimaryKey")
          buttonModal.click()
          this.jsPlumbInstance.deleteConnection(conn.connection);
        }
        else {
          control1.push(this.initConnections(conn.sourceId, conn.targetId, type, s, t, sparent, tparent, spid, tpid));
          this.projectdb.get("tables")['controls'].forEach((element, i) => {
            if (element.value.id == tpid) {
              element.value.columns.forEach((element, j) => {
                if (element.id == conn.targetId) {
                  this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("datatype").setValue("INT");
                  setTimeout(() => this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("datatype").disable({ onlySelf: true }), 1);
                }
              });
            }

          });

        }
      }), 0);

    this.jsPlumbInstance.bind("dblclick", conn => {
      const buttonModal = document.getElementById("changeTypeButton")
      buttonModal.click()
      this.con = conn



    });


  }

  updateType() {
    if (this.selectedConnectionType) {
      this.con.getOverlay("source").setLabel(this.selectedConnectionType.substring(0, 1));
      this.con.getOverlay("target").setLabel(this.selectedConnectionType.substring(2, 3));
      this.updateConnectionOverlays(this.con, this.selectedConnectionType)
    }

  }
  //EXTRA METHODS BEGIN
  init() {




    for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
      const s = this.projectdb.get("connections")['controls'][x].get("source").value;
      const t = this.projectdb.get("connections")['controls'][x].get("target").value;
      const tpid = this.projectdb.get("connections")['controls'][x].get("tpid").value;
      this.projectdb.get("tables")['controls'].forEach((element, i) => {
        if (element.value.id == tpid) {
          element.value.columns.forEach((element, j) => {
            if (element.id == t) {
              setTimeout(() => this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("datatype").disable({ onlySelf: true }), 1);
            }
          });
        }
      });
    }


    this.projectdb.get("tables")['controls'].forEach((element, i) => {
      //console.log(this.projectdb.get("tables")['controls'][i].value.id)
      this.jsPlumbInstance.draggable(element.value.id, { containment: 'parent' });
      element.value.columns.forEach((element, j) => {
        console.log(i + " and " + j)

        if (element.primaryKey) {

          setTimeout(() => this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("datatype").disable({ onlySelf: true }), 1);
          setTimeout(() => this.jsPlumbInstance.unmakeTarget(this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].value.id), 1)
        }

        this.setSource(element.id);
        this.setTarget(element.id);
      });

    });

    this.projectdb.get("connections")['controls'].forEach(element => {
      const conn = this.jsPlumbInstance.connect({ source: element.value.source, target: element.value.target });
      const type = element.value.type
      conn.getOverlay("source").setLabel(type.substring(0, 1));
      conn.getOverlay("target").setLabel(type.substring(2, 3));
    });

  }
  removeConn(){
      this.jsPlumbInstance.deleteConnection(this.remConn.component);
      const control = <FormArray>(
        this.projectdb.get("connections")
      );

      for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
        const s = this.projectdb.get("connections")['controls'][x].get("source").value;
        const t = this.projectdb.get("connections")['controls'][x].get("target").value;
        const tpid = this.projectdb.get("connections")['controls'][x].get("tpid").value;
        this.projectdb.get("tables")['controls'].forEach((element, i) => {
          if (element.value.id == tpid) {
            element.value.columns.forEach((element, j) => {
              if (element.id == t) {
                this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("datatype").enable();

              }

            });
          }

        });



        if ((this.remConn.component.sourceId == s) && (this.remConn.component.targetId == t)) {
          control.removeAt(x);
        }

      }
    
  }
  setSource(id) {
    this.jsPlumbInstance.makeSource(id, {
      anchor: [["Right"], ["Left"], "Continuous"],
      filter: ":not(input):not(i):not(select)",
      allowLoopback: false,
      connectorOverlays: [

        ['Label', { label: "1", location: 0.1, cssClass: 'connectingConnectorLabel', id: "source" }],
        ['Label', {
          label: "X",
          events: {
            "tap": (params: any) => {
              this.remConn =params
              const buttonModal = document.getElementById("deleteConnection")
              buttonModal.click()
              

            }
          }, location: 0.5, cssClass: 'connectingConnectorLabel'
        }],
        ['Label', { label: "*", location: 0.9, cssClass: 'connectingConnectorLabel', id: "target" }]
      ]
    });
  }
  setTarget(id) {
    this.jsPlumbInstance.makeTarget(id, {
      anchor: [["Right"], ["Left"], "Continuous"],
      filter: ":not(input):not(i):not(select)",
      maxConnections: 1,
      allowLoopback: false
    });

  }

  primatyKeyCheck(i, j) {

    if (!this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("primaryKey").value) {

      setTimeout(() => this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("datatype").disable({ onlySelf: true }), 1);
      this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].get("datatype").setValue("INT");
      const columnid = this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].value.id;
      this.jsPlumbInstance.unmakeTarget(columnid);

    }

    this.projectdb.get("tables")['controls'][i].get("columns")['controls'].forEach((element, index) => {
      if (element.value.primaryKey == true) {
        this.projectdb.get("tables")['controls'][i].get("columns")['controls'][index].get("primaryKey").setValue(false);
        this.projectdb.get("tables")['controls'][i].get("columns")['controls'][index].get("datatype").enable();
        const columnid = this.projectdb.get("tables")['controls'][i].get("columns")['controls'][index].value.id;
        this.removeForignKeys(columnid);


        this.setTarget(columnid);
        this.removeConnection(i, index);





      }
    });

  }
  removeForignKeys(columnid) {

    this.projectdb.get("connections")['controls'].forEach(element => {
      if (element.value.source == columnid) {
        console.log(element.value.target)
        //console.log(this.projectdb.get("tables")['controls'])
        //this.projectdb.get("tables")['controls'][element.value.tpid].get("columns")['controls'][element.value.target].get("primaryKey").setValue(false);
        //this.projectdb.get("tables")['controls'][element.value.tpid].get("columns")['controls'][element.value.target].get("datatype").enable();
        this.projectdb.get("tables")['controls'].forEach((tabs, k) => {
          tabs.value.columns.forEach((col, l) => {
            //console.log(element.value.target)
            if (col.id == element.value.target) {
              //console.log("name: " + col.name + " id: "+element.value.target)
              this.projectdb.get("tables")['controls'][k].get("columns")['controls'][l].get("primaryKey").setValue(false);
              this.projectdb.get("tables")['controls'][k].get("columns")['controls'][l].get("datatype").enable();

            }
          });
        });
      }
    });

  }

  setPosition(i, x, y) {
    this.projectdb.get("tables")['controls'][i].get("x").setValue(x);
    this.projectdb.get("tables")['controls'][i].get("y").setValue(y);
  }



  //EXTRA METHODS END



  //ADD + UPDATE + REMOVE ACTIONS BEGIN
  addColumn(j) {
    const control = <FormArray>(
      this.projectdb.get("tables")['controls'][j].get("columns")
    );
    control.push(this.initColumn());

    const columnid = this.projectdb.get("tables")['controls'][j].value.columns[String(control.length - 1)].id;
    setTimeout(() => this.setTarget(columnid), 1);
    setTimeout(() => this.setSource(columnid), 1);
  }

  addTable() {
    const control = <FormArray>this.projectdb.get("tables");
    control.push(this.initTable());

    const tableid = this.projectdb.get("tables")['controls'][String(control.length - 1)].value.id;
    const columnid = this.projectdb.get("tables")['controls'][String(control.length - 1)].value.columns[0].id;


    setTimeout(() =>
      this.jsPlumbInstance.draggable(tableid, { containment: 'parent' }), 100);
    setTimeout(() =>
      this.setSource(columnid), 100);
    setTimeout(() =>
      this.setTarget(columnid), 100);
  }

  updateConnectionOverlays(conn, type) {

    this.jsPlumbInstance.getConnections().forEach(element => {
      for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
        const s = this.projectdb.get("connections")['controls'][x].get("source").value;
        const t = this.projectdb.get("connections")['controls'][x].get("target").value;
        console.log(s + " and " + element.source.id)
        if ((s == conn.sourceId) && (t == conn.targetId)) {
          const s = this.projectdb.get("connections")['controls'][x].get("type").setValue(type);
        }
      }
    });
  }


  onTableNameChanges(searchValue: string, i): void {
    const tableid = this.projectdb.get("tables")['controls'][i].value.id;
    this.jsPlumbInstance.getConnections().forEach(element => {
      for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
        const s = this.projectdb.get("connections")['controls'][x].get("spid").value;
        const t = this.projectdb.get("connections")['controls'][x].get("tpid").value;
        if (tableid == s) {
          this.projectdb.get("connections")['controls'][x].get("sparent").setValue(searchValue)
        } else if (tableid == t) {
          this.projectdb.get("connections")['controls'][x].get("tparent").setValue(searchValue)
        }
      }
    });
  }


  onColumnNameChanges(searchValue: string, i, j): void {
    const columnid = this.projectdb.get("tables")['controls'][i].value.columns[j].id;
    this.jsPlumbInstance.getConnections().forEach(element => {
      for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
        const s = this.projectdb.get("connections")['controls'][x].get("source").value;
        const t = this.projectdb.get("connections")['controls'][x].get("target").value;
        if (columnid == s) {
          this.projectdb.get("connections")['controls'][x].get("s").setValue(searchValue)
        } else if (columnid == t) {
          this.projectdb.get("connections")['controls'][x].get("t").setValue(searchValue)
        }
      }
    });
  }

  removeTable(i) {
    const control = <FormArray>this.projectdb.get("tables");
    console.log(this.projectdb.get("tables")['controls'][i].value.columns.primaryKey)
    this.projectdb.get("tables")['controls'][i].get("columns")['controls'].forEach((element, x) => {
      if (element.value.primaryKey) {
        this.removeForignKeys(element.value.id)
      }
      this.removeConnection(i, x)
    });
    control.removeAt(i);
  }

  removeColumn(i, j) {
    const control = <FormArray>(
      this.projectdb.get("tables")['controls'][i].get("columns")
    );
    this.removeConnection(i, j)
    control.removeAt(j);

  }

  removeConnection(i, j) {

    const control2 = <FormArray>(
      this.projectdb.get("connections")
    );
    const columnid = this.projectdb.get("tables")['controls'][i].get("columns")['controls'][j].value.id;
    console.log("columnid")

    this.jsPlumbInstance.getConnections().forEach(element => {

      if ((columnid == element.source.id) || (columnid == element.target.id)) {

        for (let x = 0; x < this.projectdb.get("connections")['controls'].length; x++) {
          const s = this.projectdb.get("connections")['controls'][x].get("source").value;
          const t = this.projectdb.get("connections")['controls'][x].get("target").value;
          console.log(s + " and " + element.source.id)
          if ((s == element.source.id) && (t == element.target.id)) {
            control2.removeAt(x);
          }
        }
        this.jsPlumbInstance.deleteConnection(element);

      }
    });
    setTimeout(() => this.jsPlumbInstance.repaintEverything(), 1);

  }
  //ADD + UPDATE + REMOVE ACTIONS BEGIN


  //SUBMIT PMETHODS BEGIN


  onSubmit(form) {
    //get dbName
    console.log(form["dbName"] || {});
    //get dbType
    console.log(form["dbType"] || {});



    //upload SQL file
    //this.dragDropService.sql_content(form["tables"] || {}, form["connections"] || {});
    //upload JSON Tables


    this.dragDropService.upload_file(JSON.stringify({ dbName: form["dbName"] || {}, dbType: form["dbType"] || {}, tables: form["tables"] || {}, connections: form["connections"] || {} }, null, 4), this.dragDropService.getName(), "json");
    this.router.navigate(['/front/projects'])






    //this.dragDropService.generate_mongo(form["tables"] || {})




    //TEST TO CHECK TABLES
    var distincttabs = []

    this.projectdb.get("tables")['controls'].forEach((element, i) => {
      if (!distincttabs.includes(element.value.name))
        distincttabs.push(element.value.name)
      else {
        alert("Tables must not have same name")
      }
      var distinctcols = []
      this.projectdb.get("tables")['controls'][i].get("columns")['controls'].forEach((element, i) => {
        if (!distinctcols.includes(element.value.name))
          distinctcols.push(element.value.name)
        else {
          alert("Columns must not have same name")
        }
      });
    });
    //TEST TO CHECK TABLES


  }

  //SUBMIT PMETHODS BEGIN




  //GENERATING JSON BEGIN


  fillFromJson(test) {

    //let data = JSON.parse(json);
    let data = test



    this.projectdb = this.fb.group({
      dbName: [data.dbName],
      dbType: [data.dbType],
      tables: this.fb.array(data.tables.map(t => this.fb.group({
        id: [t.id],
        name: [t.name],
        add: [t.add],
        update: [t.update],
        delete: [t.delete],
        show: [t.show],
        x: [t.x],
        y: [t.y],
        columns: this.fb.array(t.columns.map(c => this.fb.group({
          id: [c.id],
          name: [c.name],
          datatype: [c.datatype],
          primaryKey: [c.primaryKey]
        })))
      }))),
      connections: this.fb.array(data.connections.map(conn => this.fb.group({
        type: [conn.type],
        s: [conn.s],
        t: [conn.t],
        sparent: [conn.sparent],
        spid: [conn.spid],
        tparent: [conn.tparent],
        tpid: [conn.tpid],
        source: [conn.source],
        target: [conn.target]
      })))
    });




  }

  prototype() {
    this.projectdb = this.fb.group({
      dbName: [""],
      dbType: [""],
      tables: this.fb.array([this.initTable()]),
      connections: this.fb.array([])
    });

  }


  //GENERATING JSON END




  //INITIALIZERS BEGIN
  initConnections(source, target, type, s, t, sparent, tparent, spid, tpid) {
    return this.fb.group({
      type: [type],
      s: [s],
      t: [t],
      sparent: [sparent],
      spid: [spid],
      tparent: [tparent],
      tpid: [tpid],
      source: [source],
      target: [target]
    });
  }

  initTable() {
    return this.fb.group({
      id: [Math.random().toString(16).slice(2, 8)],
      name: [""],
      add: [0],
      update: [0],
      delete: [0],
      show: [0],
      x: [""],
      y: [""],
      columns: this.fb.array([this.initColumn()])
    });
  }

  initColumn() {
    return this.fb.group({
      id: [Math.random().toString(16).slice(2, 8)],
      name: [""],
      datatype: [""],
      primaryKey: [""]
    });
  }
  //INITIALIZERS END




  //METHODS USED IN HTML BEGIN

  getTables(form) {
    //console.log(form.get('tables').controls);
    return form.controls.tables.controls;
  }

  getColumns(form) {
    //console.log(form.controls.columns.controls);
    return form.controls.columns.controls;
  }

  //METHODS USED IN HTML END

  ngOnDestroy() {
    this.jsPlumbInstance.reset();
    this.dragDropService.setId(null);
    this.dragDropService.setTables(null);
    this.dragDropService.setName(null);

  }

}