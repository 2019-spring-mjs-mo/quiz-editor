import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  getQuizzes() {
    return [
      {name: 'Quiz 1', numberOfQuestion: 3}
      , {name: 'Quiz 2', numberOfQuestion: 0}
    ];
  }
}
