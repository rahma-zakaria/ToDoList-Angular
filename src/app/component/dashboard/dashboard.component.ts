import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudServise: CrudService) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = []
    this.getTasks();
  }

  addTask() {
    this.taskObj.taskName = this.addTaskValue;
    this.crudServise.addTask(this.taskObj).subscribe(
      res => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      err => { alert("on add")}
    );
  }

  getTasks() {
    this.crudServise.getAllTask().subscribe(
      res => {
        this.taskArr = res
      },
      err => { alert("Error in get tasks") }
    );
  }

  // editTask(editTask: Task) {
  //   this.crudServise.editTask(editTask).subscribe(
  //     res => { this.ngOnInit() },
  //     err => { alert("on edit") }
  //   );
  // }
  editTask() {
    this.taskObj.taskName = this.editTaskValue
    this.crudServise.editTask(this.taskObj).subscribe(
      res => { this.ngOnInit() },
      err => { alert("on edit") }
    );
  }
  call(editTask: Task) {
    this.taskObj = editTask;
    this.editTaskValue = editTask.taskName;
  }
  deleteTask(newTask: Task) {
    this.crudServise.deleteTask(newTask).subscribe(
      res => { this.ngOnInit() },
      err => { alert("on delete") }
    );
  }

}
