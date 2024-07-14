import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateToDoComponent } from '../create-to-do/create-to-do.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss',
})
export class ToDoListComponent {
  readonly dialog = inject(MatDialog);
  constructor(public _storage: StorageService) {}
  public ngOnInit() {
    this.dataSource = this._storage.getData() ? this._storage.getData() : [];
  }
  displayedColumns: string[] = [
    'position',
    'task',
    'description',
    'dueDate',
    'status',
    'action',
  ];
  dataSource = [];
  openDialog() {
    const dialogRef = this.dialog.open(CreateToDoComponent);
    dialogRef.afterClosed().subscribe((result) => {
      const getToDoData = this._storage.getData()
        ? this._storage.getData()
        : [];
      this.dataSource = getToDoData;
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteItem(id: number) {
    let getToDoData = this._storage.getData();
    let itemIndex = getToDoData.findIndex((res) => res.id === id);
    if (itemIndex > -1) {
      getToDoData.splice(itemIndex, 1);
    }
    this._storage.deleteData(getToDoData);
    const getData = this._storage.getData();
    this.dataSource = getData;
  }
  editItem(id: number, data) {
    const dialogRef = this.dialog.open(CreateToDoComponent, { data: data });
    dialogRef.afterClosed().subscribe((result) => {
      const getToDoData = this._storage.getData()
        ? this._storage.getData()
        : [];
      this.dataSource = getToDoData;
      console.log(`Dialog result: ${result}`);
    });
  }
  changeStatus(status, data) {
    const toDoData = this._storage.getData();
    let itemIndex = toDoData.findIndex((res) => res.id === data.id);
    const request = {
      id: data.id,
      task: data.task,
      description: data.description,
      dueDate: data.dueDate,
      status: !status,
    };
    if (itemIndex > -1) {
      toDoData.splice(itemIndex, 1, request);
    }
    this._storage.deleteData(toDoData);
    this.dataSource = this._storage.getData() ? this._storage.getData() : [];
  }
}
