import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private builtInAngularHttpClient: HttpClient) { }

  getQuizzes() {

    return this.builtInAngularHttpClient.get("https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz");

    // Dummy array of quiz objects...
    // return [
    //   { name: 'Quiz 1', numberQuestions: 3 }
    //   , { name: 'Quiz 2', numberQuestions: 0 }
    // ];
  }

  saveQuizzes(changedQuizzes: any[], newQuizzes: any[] = []) {

    let h = new HttpHeaders({
      'Content-Type': 'application/json'
      , 'X-Sas-Token': 'sig=K2WE6NQPtyoV6ke5hwPEaEaW52fgvyFWUeCEdPJls1s'
    });

    //console.log(h);

    return this.builtInAngularHttpClient.post(
      'https://modern-js.azurewebsites.net/save-quizzes-proxy'
      , JSON.stringify(
        {
          "changedQuizzes": changedQuizzes
          , "newQuizzes": newQuizzes
        }
      )
      , {
        headers: h
      }
    );
  }

  getNumberPromise(doYouWantMeToSucceed: boolean): Promise<number> {
    let p = new Promise<number>(
      (resolve, reject) => doYouWantMeToSucceed ? resolve(42) : reject("You got problems!")
    );

    return p;
  }

  
}
