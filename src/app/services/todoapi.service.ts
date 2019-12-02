import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoapiService {
  toDoList: AngularFireList<any>;
  constructor(private firebaseDB:AngularFireDatabase) { }

  getTodoList(){
    this.toDoList = this.firebaseDB.list('title');
    return this.toDoList;
  }

  addTodo(title:string){
    this.toDoList.push({
      title: title,
      isChecked: false,
      //date: Date
    });
  }

  checkorUncheckTitle($key: string, flag: boolean){
    this.toDoList.update($key, {isChecked: flag});
  }

  removeTitle($key: string){
    this.toDoList.remove($key);
  }

}
