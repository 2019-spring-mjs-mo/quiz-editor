import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
}

interface QuestionDisplay {
  name: string;
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
      name: "Untitled Quiz"
      , questions: []
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

  removeQuestion(questionToRemove) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x !== questionToRemove);
  }

  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , {
        name: "New Blank Question"
      }
    ];
  }

  serviceDown = false;

  ngOnInit() {

    this.qSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);

        this.quizzes = (<any[]> data).map(x => ({ 
          name: x.name
          , questions: x.questions
        }));
      }
      , (error) => {
        console.log(error);
        this.serviceDown = true;
      }
    );

  };

  title = 'quiz-editor';
  myWidth = 250;

  makeImageLarger() {
    this.myWidth *= 1.3;
  }

  // Read-only/getter property..
  get titleColor() {
    return this.myWidth > 400 ? "red" : "blue";
  }

  promisesOne() {
    const n = this.qSvc.getNumberPromise(false);
    console.log(n);
    n.then(n => console.log(n)).catch(error => console.log(error));
  }

  async promiseTwo() {
    
    try {
      const n1 = await this.qSvc.getNumberPromise(true);
      console.log(n1);

      const n2 = await this.qSvc.getNumberPromise(false);
      console.log(n2);
    }

    catch(error) {
      console.log(error)
    }
  }

  promiseThree() {
    try {
      const n1 = this.qSvc.getNumberPromise(true);
      console.log(n1);
  
      const n2 = this.qSvc.getNumberPromise(false);
      console.log(n2);
    }
    catch(error) {
      console.log(error);
    }
   
  }
}
