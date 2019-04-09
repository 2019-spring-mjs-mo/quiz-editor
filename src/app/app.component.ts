import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private qSvc: QuizService) {
    //use the Quiz service here, but...if it fails, then creation of the component fails
  }

  ngOnInit() {
    console.log(this.qSvc.getQuizzes());
  };

  title = 'quiz-editor';
  myWidth = 250;

  makeImageLarger() {
    this.myWidth *= 1.3;
  }

  //read only getter property
  get titleColor() {
    return this.myWidth > 400 ? "red" : "blue";
  }




}
