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
    // could use the quiz service here but if it fails,
    // the creation of the component fails
  }

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay;

  selectQuiz = (q: QuizDisplay) => {
    this.selectedQuiz = q;
  }

  deselectQuiz = () => {
    this.selectedQuiz = undefined;
  }

  addNewQuiz = () => {

    // create new quiz
    const newQuiz: QuizDisplay = {
      name: "Untitled Quiz",
      questions: []
    };
    
    // create new list of quizzes with the new quiz
    this.quizzes = [
      ...this.quizzes,
      newQuiz
    ];

    // update the selected quiz to the new quiz
    this.selectedQuiz = newQuiz;
  }

  addNewQuestion = () => {
    // create new question
    const question: QuestionDisplay = {
      name: "New untitled question"
    }
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions,
      question
    ];
  }

  removeQuestion = (question: QuestionDisplay) => {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter((q: QuestionDisplay) => q != question);
  }

  deleteQuiz = (quiz: QuizDisplay) => {
    this.selectedQuiz = undefined;
    this.quizzes = this.quizzes.filter(q => q != quiz);
  }

  serviceDown = false;

  // so use ngOnInit instead
  ngOnInit() {
    // rename numberQuestions property to numberOfQuestions 
    this.qSvc.getQuizzes().subscribe(
      (data) => {
        this.quizzes = (<any[]> data).map(x => ({
          name: x.name,
          questions: x.questions
        }));
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        this.serviceDown = true;
      }
    );
  }

  promisesOne = () => {
    const n = this.qSvc.getNumberPromise(true);
    console.log(n);
    n.then(
      number => {
        console.log(".then");
        console.log(number);

        const anotherNumberPromise = this.qSvc.getNumberPromise(false);
        console.log(anotherNumberPromise);
        anotherNumberPromise.then(
          number => console.log(number)
        ).catch(
          error => console.log(error)
        );
      }
    ).catch(
      error => {
        console.log(".catch");
        console.log(error);
      }
    );
  }

  // using more modern async await with promise instead of .then & .catch
  async promisesTwo() {
    try {
      const n1 = await this.qSvc.getNumberPromise(true);
      console.log(n1);
      const n2 = await this.qSvc.getNumberPromise(false);
      console.log(n2); // won't reach this line
    } 
    catch(error) {
      console.log("catch block");
      console.log(error);
    }
  }

  async promisesThree() {
    // parlor trick for concurrent promise execution
    try {
      const np1 = this.qSvc.getNumberPromise(true);
      console.log(np1);

      const np2 = this.qSvc.getNumberPromise(true);
      console.log(np2); // won't reach this line
      
      // make concurrent calls and wait for response from both
      const results = await Promise.all([np1, np2]);
      
      // make calls and wait for the first response; set it to results
      // const results = await Promise.race([np1, np2]);
      
      // won't reach this line if either call responds with error
      console.log(results); 
    }
    catch(error) {
      console.log(error);
    }
  }
}
