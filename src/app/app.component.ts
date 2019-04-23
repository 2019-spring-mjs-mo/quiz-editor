import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  originalName: string
  questions: QuestionDisplay[];
  questionsCheckSum: string;
  markedForDelete: boolean;
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
      , originalName: "Untitled Quiz"
      , questions: []
      , questionsCheckSum: ""
      , markedForDelete: false
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
    this.selectedQuiz.questions = this.selectedQuiz.questions
      .filter(x => x !== questionToRemove);
  }
  
  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , {
        name: "New Untitled Question"
      }
    ];
  }

  serviceDown = false;

  ngOnInit() {
    this.loadAllQuizzess();
  };

  private loadAllQuizzess() {
    this.qSvc.getQuizzes().subscribe((data) => {
      console.log(data);
      this.quizzes = (<any[]>data).map(x => ({
        name: x.name,
        originalName: x.name,
        questions: x.questions,
        questionsCheckSum: x.questions.map(x => x.name).join('~'),
        markedForDelete: false
      }));
    }, (error) => {
      console.log(error);
      this.serviceDown = true;
    });
  }

  get numberOfDeletedQuizzes() {
    return this.quizzes.filter( x => x.markedForDelete).length;
  }

  get numberOfEditedQuizzes() {
    return this.getEditedQuizzes.length;
  }

  getEditedQuizzes() {
    return this.quizzes
    .filter(x => 
      (!x.markedForDelete && x.originalName != "Untitled Quiz")
      &&
      (x.name !== x.originalName || x.questionsCheckSum !== x.questions.map(x => x.name).join('~'))
      );
  }

  get numberOfAddedQuizzes() {
    return this.getAddedQuizzes.length;
  }

  getAddedQuizzes() {
    return this.quizzes.filter(x => !x.markedForDelete && x.originalName === "Untitled Quiz");
  }

  saveBatchEdits() {
    const editedQuizzes = this.getEditedQuizzes().map(x => ({
      name: x.name
      , originalName: x.name
      , questions: x.questions
    }));

    const addedQuizzes = this.getAddedQuizzes().map(x => ({
      quizName: x.name
      , quizQuestions: x.questions
    }));

    console.log(addedQuizzes);

    this.qSvc.saveQuizzes(editedQuizzes, addedQuizzes).subscribe(
      numberOfChangedQuizzesSuccessfullySaved => console.log(numberOfChangedQuizzesSuccessfullySaved)
      , error => console.log(error)
    );
  }

  cancelBatchEdits() {
    this.loadAllQuizzess();
    this.selectQuiz(undefined)
  }

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
    const n = this.qSvc.getNumberPromise(true);
    console.log(n); // ???

    n.then(
      number => {
        console.log(".then");
        console.log(number); // ???

        const anotherNumberPromise = this.qSvc.getNumberPromise(false);
        console.log(anotherNumberPromise); // ??? // ZoneAwarePromise

        anotherNumberPromise.then(
          number => console.log(number)
        ).catch(
          error => console.log(error)
        );

      }
    ).catch(
      error => {
        console.log(".catch")
        console.log(error) 
      }
    );
  }

  async promiseTwo() {

    try {
      const n1 = await this.qSvc.getNumberPromise(true);
      console.log(n1); // ??? // 42

      const n2 = await this.qSvc.getNumberPromise(false);
      console.log(n2);
    }

    catch(error) {
      console.log("catch block");
      console.log(error);
    }
  }

  async promiseThree() {
    // Parlor trick for concurrent promise execution...

    try {
      const n1 = this.qSvc.getNumberPromise(true);
      console.log(n1); // ???

      const n2 = this.qSvc.getNumberPromise(true);
      console.log(n2); // ???

      const results = await Promise.all([n1, n2]);
      //const results = await Promise.race([n1, n2]);
      console.log(results);
    }
    catch(error) {
      console.log(error);
    }
  }

  /*async*/ testAsyncKeyword() {

    // await is a valid variable name...
    // unless it is an async method ! ! !
    //let await = 0;

  }
}
