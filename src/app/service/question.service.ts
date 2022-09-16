import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  getQuiestionJson(){
    return this.http.get<any>("assets/quiestion.json");
  }

  postQuiestionJson(){
    return this.http.get<any>("assets/quiestion.json");
  }
}
