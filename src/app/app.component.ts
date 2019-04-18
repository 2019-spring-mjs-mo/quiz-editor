import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';


interface QuizDisplay {
  name: string
  questions: QuestionDisplay[]
  testDate: string
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
      , testDate: ""
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
  }

  deleteQuestion(questionToDelete: QuestionDisplay) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== questionToDelete);
  }

  deleteQuiz(quizToDelete: QuizDisplay) {
    this.quizzes = this.quizzes.filter(x => x !== quizToDelete);
    this.selectedQuiz = undefined;
  }

  serviceDown = false;

  ngOnInit() {

    this.qSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);

        this.quizzes = (<any[]> data).map(x => ({ 
          name: x.name
          , numberOfQuestions: x.numberQuestions
          , questions: x.questions.map( x => ({...x, rating:0}))
          , testDate: ""
          , quizDesc: ""
        }));
      }
      , (error) => {
        console.log(error);
        this.serviceDown = true;
      }
    );
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
