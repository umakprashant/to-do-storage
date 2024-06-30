import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  dataKey: string = 'toDoData';

  constructor() {}

  setData(data: any) {
    const getData = this.getData() ? this.getData() : [];
    getData.push(data);
    localStorage.setItem(`${this.dataKey}`, JSON.stringify(getData));
  }

  getData() {
    const data = localStorage.getItem(this.dataKey);
    return JSON.parse(data);
  }

  deleteData(data: any) {
    localStorage.setItem(`${this.dataKey}`, JSON.stringify(data));
  }
}
