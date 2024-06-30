import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-create-to-do',
  templateUrl: './create-to-do.component.html',
  styleUrl: './create-to-do.component.scss',
})
export class CreateToDoComponent {
  public toDoForm: FormGroup;
  public dataId: number;
  constructor(
    public dialogRef: MatDialogRef<CreateToDoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _storage: StorageService
  ) {
    this.data = data;
    this.dataId = data?.id;
    console.log(data);
  }
  public ngOnInit() {
    this.buildForm();
    this.updateValue();
  }

  public updateValue() {
    if (this.data) {
      this.toDoForm.patchValue({
        task: this.data.task,
        description: this.data.description,
        dueDate: this.data.dueDate,
        status: this.data.status,
      });
    }
  }

  public buildForm() {
    this.toDoForm = new FormGroup({
      task: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      status: new FormControl(true, Validators.required),
    });
  }

  public update() {
    const toDoData = this._storage.getData();
    let itemIndex = toDoData.findIndex((res) => res.id === this.dataId);
    const request = {
      id: this.dataId,
      task: this.toDoForm.value.task,
      description: this.toDoForm.value.description,
      dueDate: this.toDoForm.value.dueDate,
      status: this.toDoForm.value.status,
    };
    if (itemIndex > -1) {
      toDoData.splice(itemIndex, 1, request);
    }
    this._storage.deleteData(toDoData);
    this.close();
  }

  public submit() {
    const request = {
      id: Math.trunc(Math.random() * 1000),
      task: this.toDoForm.value.task,
      description: this.toDoForm.value.description,
      dueDate: this.toDoForm.value.dueDate,
      status: this.toDoForm.value.status,
    };
    this._storage.setData(request);
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }
}
