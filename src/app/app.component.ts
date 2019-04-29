import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface QuizDisplay {
  name: string;

  // numberOfQuestions: number;
  questions:QuestionDisplay[];
}
interface QuestionDisplay {
  name:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calendar: any;

  constructor(private qSvc: QuizService) {
    // Use the quiz service here, but... If it fails, the creation
    // of the component fails : - (
  }

  quizzes: QuizDisplay[] = [];
  questions:QuestionDisplay[] = [];
  selectedQuiz: QuizDisplay = undefined;

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
  }

  addNewQuiz() {

    // Create the new quiz.
    const newQuiz: QuizDisplay = {
      name: "Untitled Quiz"
      ,questions:[]
    };

    // Create a new quiz list with the new quiz...
    //
    // a.k.a. "Add the new quiz to the list"
    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    // Select the newly added quiz.
    // this.selectedQuiz = newQuiz; 
  }

  serviceDown = false;

  ngOnInit() {

    this.qSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);

        this.quizzes = (<any[]> data).map(x => ({ 
          name: x.name
          // , numberOfQuestions: x.numberQuestions
          ,questions:x.questions
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
  
  addNewQuestion() {
    
    // Create the new question.
    const newQuestion: QuestionDisplay = {
      name: "New Question" 
    };
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions, newQuestion
    ]
    

    // Create a new quiz list with the new quiz...
    //
    // a.k.a. "Add the new quiz to the list"
    const questions = this.quizzes.map(x =>
      x.questions
    );
    this.questions =[newQuestion]
    console.log(this.questions)

  }
  deleteQuestion(questionToDelete) {
    this.selectedQuiz.questions = this.selectedQuiz.questions
    .filter(x => x !== questionToDelete);
  }

  promiseOne() {
    const n = this.qSvc.getNumberPromise(true);
    console.log(n);
    n.then(n=> {
      console.log("then")
      console.log(n);
      const anaotherNumberPromise = this.qSvc.getNumberPromise(false);
      console.log(anaotherNumberPromise);
      anaotherNumberPromise.then(  number =>{

      console.log(number);
        }
      ).catch(
        error=>console.log(error)
      );
    })
    .catch(error=>{
      console.log("catch")
      console.log(error)}
      );
  }
  async promiseTwo(){
    try{
      const number = await this.qSvc.getNumberPromise(true);
      console.log(number);
      const number2 = await this.qSvc.getNumberPromise(false);
      console.log(number2);

    }catch(error){
      console.log("Catch Block");
      console.log(error);
    }
    
  }
  async promiseThree(){
    try {
    const number1 = this.qSvc.getNumberPromise(true)
    console.log(number1);

    const number2 = this.qSvc.getNumberPromise(false);
    console.log(number2);
    const result = await Promise.all([number1, number2]);
    // const result = await Promise.race([number1, number2]);
    // const result = await Promise.all([number2, number1]);
    console.log(result);
    } catch(error){
      console.log(error);
    }

  }

  /* async */ testAsynch (){
    //await is a valid 
  }

  //Calendar

  today =  Date.now();

  public isCollapsed = false;

  //Ng bootStrap

  page = 3;

  getPageSymbol(current: number) {
    return ['1', '2', '3', '4', '5', '5', '6'][current - 1];
  }
}
