import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getNummberPromise(doYouWantMeToSucceed: boolean): Promise<number> {
    let p = new Promise<number>(
      (resolve, reject) => doYouWantMeToSucceed ? resolve(42) : reject("You got problems!")
    );
    
    return p;
  }
}
