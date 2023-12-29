import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { PdfserviceService } from '../services/pdfservice.service';
@Component({
  selector: 'app-obs-andopr',
  templateUrl: './obs-andopr.component.html',
  styleUrls: ['./obs-andopr.component.scss']
})
export class ObsAndoprComponent implements OnInit {
  results: any[] = [];
  users: any[] = [];
  errorMessage = '';
  myObservable = new Observable((observer) => {
    console.log('Observable Starts');
    setTimeout(() => {
      observer.next('1');
    }, 1000);
    setTimeout(() => {
      observer.next('2');
    }, 2000);
    setTimeout(() => {
      observer.next('3');
    }, 3000);
    setTimeout(() => {
      observer.next('4');
    }, 4000);
    setTimeout(() => {
      observer.next('5');
    }, 5000);
  });
  constructor(private service: PdfserviceService) {}
  ngOnInit(): void {
    this.runExamples();
    //Observables
    this.service.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch users. Please try again later.';
      }
    );

    // public list(data: any): Observable<any> {
    //   // Specify the response type using generics
    //   return this.http.post<any>(`${this.bws.url}bws_plant_lst`, data);
    // }
    //second Observable example
    this.myObservable.subscribe((val) =>{
      console.log(val);
    });
  }
 
  runExamples() {
    // map operator example
    const mapExample = of(11, 12, 13);
    mapExample.pipe(
      map(value => value * 10)
    ).subscribe(value => this.results.push(`map: ${value}`));

    // filter operator example
    const filterExample = of(14, 15, 16, 17, 18, 19);
    filterExample.pipe(
      filter(value => value % 2 === 0)
    ).subscribe(value => this.results.push(`filter: ${value}`));

    // mergeMap operator example
    const mergeMapExample = of('Hello');
    mergeMapExample.pipe(
      mergeMap((value:any) => of(value + ' World!'))
    ).subscribe(value => this.results.push(`mergeMap: ${value}`));


  //Asynchronous tasks
   // Async setTimeout example
   const timeoutExample = of('Delayed Execution');
   timeoutExample.pipe(
    mergeMap(() => new Promise<string>((resolve) => {
       setTimeout(() => resolve('Async Operation Completed'), 2000);
     }))
   ).subscribe(value => this.results.push(`Async setTimeout: ${value}`));

   // Async fetch example
   const fetchExample = of('https://jsonplaceholder.typicode.com/todos/1');
   fetchExample.pipe(
     mergeMap(url => fetch(url).then(response => response.json()))
   ).subscribe(data => this.results.push(`Async fetch: ${JSON.stringify(data)}`));

   // catchError operator example with async timeout
   const catchErrorAsyncExample = throwError('Error occurred!');
   catchErrorAsyncExample.pipe(
     mergeMap(() => new Promise<string>((resolve, reject) => {
       setTimeout(() => reject('Handled error'), 1500);
     })),
     catchError(error => of(`Handled error: ${error}`))
   ).subscribe(value => this.results.push(value));
}


}