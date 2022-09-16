import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public addQuestionForm !: FormGroup;
  constructor(private formBuilder:FormBuilder, private http :HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.addQuestionForm = this.formBuilder.group({
      quesName:[''],
      ansOne:[''],
      ansTwo:[''],
      ansThree:[''],
      ansFour:[''],
      ansCorrect:['']
    }) 
  }

  addQues(){
    this.http.post<any>("http://localhost:3000/assets/q",this.addQuestionForm.value)
    .subscribe((res: any)=>{
      alert("question added");
      this.addQuestionForm.reset();
      
    },err=>{
      alert("something is wrong")
    })

    


    
  }

}
