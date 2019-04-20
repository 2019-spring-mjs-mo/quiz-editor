import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';


interface QuizDisplay {
  name: string
  questions: QuestionDisplay[]
  quizDate: string
  quizTime: string
  quizDesc: string
}

interface QuestionDisplay {
  name: string;
  rating: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private qSvc: QuizService) {
    // Use the quiz service here, but... If it fails, the creation
    // of the component fails : - (
  }

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay = undefined;

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
  }

  addNewQuiz() {

    // Create the new quiz.
    const newQuiz: QuizDisplay = {
      name: "New Untitled Quiz"
      , questions: []
      , quizDate: ""
      , quizTime: ""
      , quizDesc: ""
    };

    // Create a new quiz list with the new quiz...
    //
    // a.k.a. "Add the new quiz to the list"
    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    // Select the newly added quiz.
    this.selectedQuiz = newQuiz; 

    this.changeSuccessMessage("A quiz has been sucessfully added!");
  }

  // Create new quiz question.
  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , { 
        name: "New Untitled Question" 
        , rating: 0 
      }
    ];
    this.changeSuccessMessage("A question has been sucessfully added!");
  }

  deleteQuestion(questionToDelete: QuestionDisplay) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== questionToDelete);
    this.changeSuccessMessage("The selected question has been deleted!");
  }

  deleteQuiz(quizToDelete: QuizDisplay) {
    this.quizzes = this.quizzes.filter(x => x !== quizToDelete);
    this.selectedQuiz = undefined;
    this.changeSuccessMessage("The selected quiz has been deleted!");

  }


  changeSuccessMessage(theMessage) {
    this._success.next(theMessage);
  }


  serviceDown = false;
  page = 1;
  pageSize = 5;
  successMessage: string;  
  staticAlertClosed = false;
  private _success = new Subject<string>();

  ngOnInit() {

    this.qSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);

        this.quizzes = (<any[]> data).map(x => ({ 
          name: x.name
          , numberOfQuestions: x.numberQuestions
          , questions: x.questions.map( x => ({...x, rating:0}))
          , quizDate: ""
          , quizTime: ""
          , quizDesc: ""
        }));
      }
      , (error) => {
        console.log(error);
        this.serviceDown = true;
      }
    );

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

  };


  promisesOne() {
    const n = this.qSvc.getNummberPromise(true);
    console.log(n);

    n.then(
      n  => {
        console.log(".then")
        console.log(n)

        const anotherNumberPromise = this.qSvc.getNummberPromise(false);
        console.log(anotherNumberPromise)

        anotherNumberPromise.then(
          number => console.log(number)
        ).catch(
          error => console.log(error)
        )
      }
    ).catch( 
      error => {
        console.log(".catch")
        console.log(error)
      }
    );
  }

  async promiseTwo(){
    try{
      const n1 = await this.qSvc.getNummberPromise(true);
      console.log(n1);

      const n2 = await this.qSvc.getNummberPromise(false);
      console.log(n1);
    }
    catch(error){
      console.log(error);
    }
  }

  async promiseThree() {
    try{
      const n1 = this.qSvc.getNummberPromise(true);
      console.log(n1);

      const n2 = this.qSvc.getNummberPromise(true);
      console.log(n2);

      const results = await Promise.all([n1, n2]);
      console.log(results)
    }
    catch(error){
      console.log(error);
    }
  }



}
