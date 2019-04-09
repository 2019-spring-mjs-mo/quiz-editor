import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private qSvc: QuizService) {
    //use the quiz service here but if it fails, the
    //creation of the component fails.
  }
  ngOnInit() {
    console.log(this.qSvc.getQuizes());
  };
  title = 'quiz-editor';
  myWidth = 250;

  makeImageLarger(){
    this.myWidth *=1.3;
  }
  //Read only #get Property
  get titleColor() {
    return this.myWidth > 400 ? "red" : "blue";
  }

}
