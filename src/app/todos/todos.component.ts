import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Service
import {TodoapiService} from '../services/todoapi.service';
import { from } from 'rxjs';
import { element } from 'protractor';
import { type } from 'os';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  //@ViewChild("itemtitle") itemtitleField:ElementRef;
  @ViewChild("itemtitle",{static: false}) itemtitleField:ElementRef;
  focusOnItemTitle():void{
    this.itemtitleField.nativeElement.focus();
  }

  todoListArray: any[];
  isEmpty = false;
  constructor(private _todoapiService: TodoapiService) { }

  ngOnInit() {
    this._todoapiService.getTodoList().snapshotChanges().subscribe(
      item => {
        this.todoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.todoListArray.push(x);
        })

        this.todoListArray.sort((a,b)=>{
          return a.isChecked - b.isChecked;
        });
        
      }
    );
    console.log('This is Data: ',this.todoListArray);
  }

  onAdd(itemtitle){
    if(itemtitle.value != ''){
      this.isEmpty = false;
      //this._todoapiService.addTodo(itemtitle.value, new Date);
      this._todoapiService.addTodo(itemtitle.value);
      itemtitle.value = null;
    }else{
      this.isEmpty = true;
      this.focusOnItemTitle();
    }
    
  }

  alterCheck($key,isChecked){
    this._todoapiService.checkorUncheckTitle($key,!isChecked);
  }

  onDelete($key){
    
    if(confirm("Are you sure want to DELETE todo?")){
      this._todoapiService.removeTitle($key);
    }
    /*
    if(confirm("Are you sure to delete "+name)) {
    console.log("Implement delete functionality here");
  } 
    */
  }
}
