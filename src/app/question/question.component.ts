import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name :string = "";
  public questionList : any = [];
  public curentQuestion : number = 0;
  public points:number = 0;
  counter = 60;
  correctAns:number = 0;
  inCorrectAns:number = 0;
  interval$:any;
  progress:string = "0";
  isQuizCompleted : boolean = false;

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name=  localStorage.getItem("name")!;
    this.getAllquestion();
    this.startCounter();  
    
  }
  
  getAllquestion(){
     this.questionService.getQuiestionJson()
     .subscribe((res: any)=>{
      this.questionList = res.questions;
     })
  }

  nextQuestion(){
    this.curentQuestion++;
    this.getProgressPercent(); 
  }
  preQuestion(){
    this.curentQuestion--;

  }
  answer(curentQno:number, option:any){

    
    // if(  0 == 0){
    //   this.isQuizCompleted=true;
    //   this.stopCounter();
    // }
    if(option.correct){
      this.points += 10;
      this.correctAns++;
      setTimeout(() => {
        this.curentQuestion++;
      this.resetCounter();
      this.getProgressPercent(); 
      }, 600);
      

    }
    else{
      
      setTimeout(() => {
      this.curentQuestion++;
      this.inCorrectAns++; 
      this.resetCounter();    
      this.getProgressPercent();
      }, 600);
      this.points -= 10;
      
    }
  }

  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.curentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);

  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllquestion();
    this.points=0;
    this.counter=60;
    this.curentQuestion=0;
    this.progress="0";
  }

  getProgressPercent(){
    this.progress= ((this.curentQuestion/this.questionList.length)*100).toString();
    if(this.curentQuestion===this.questionList.length){
      this.isQuizCompleted=true;
      this.stopCounter();
    }
   console.log(`yy ${this.curentQuestion}`);
    return this.progress; 
    
  }

}
 