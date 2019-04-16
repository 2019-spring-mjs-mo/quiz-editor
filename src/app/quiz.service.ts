import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // have to manually update from str

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private angularHttpClient: HttpClient) { }

  getQuizzes() {
    return this.angularHttpClient.get('https://modern-js.azurewebsites.net/api/HttpTriggerJS1?code=8XD3vN3ehHLdZacBQJQhgUnNst9202gdd5VM3kWCytDkz2nXhia6kA==&name=Mystery%20Quiz');
  }

  getNumberPromise(doYouWantMeToSucceed: boolean): Promise<number> {
    // init promise of a number type
    // and if doYouWantMeToSucceed is true, resolve promise with num
    // else reject with string
    let p = new Promise<number>(
      (resolve, reject) => doYouWantMeToSucceed ? resolve(42) : reject("You got problems!")
    );
    
    return p;
  }
}
