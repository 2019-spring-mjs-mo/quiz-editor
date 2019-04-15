import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[]
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
      name: "New Untitled Quiz"
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

  // Create new quiz question.
  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , { name: "New Untitled Question" }
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
          , questions: x.questions
        }));
      }
      , (error) => {
        console.log(error);
        this.serviceDown = true;
      }
    );

  };
}
