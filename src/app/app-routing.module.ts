import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionComponent } from './question/question.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:"",redirectTo:"welcome",pathMatch:"full"},
  {path:"welcome", component:WelcomeComponent},
  {path:"question", component:QuestionComponent},
  {path:"addQuestion", component:AddQuestionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
