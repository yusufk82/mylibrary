import { Component, OnInit } from '@angular/core';
import { of,map,first,tap,take,concatMap,interval } from 'rxjs';

@Component({
  selector: 'app-observable-learn',
  templateUrl: './observable-learn.component.html',
  styleUrls: ['./observable-learn.component.css']
})
export class ObservableLearnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    of(1,2,3).pipe(map((x)=>x*x)).subscribe((v)=>console.log(`value:${v}`));
    of(0,1,2,3).pipe(first()).subscribe((v)=>console.log(`value:${v}`));
    of(Math.random()).pipe(tap(console.log),
        map(n=>n>0.5?'big':'small'))
        .subscribe(console.log);

    const source=of(1,2,3,4,5);
    source.pipe(tap(n=>{
      if(n>3) {
        throw new TypeError(`Value ${n} is greater than 3`);
      }
    })).subscribe({next:console.log,error:err=>console.log(err.message) } );


    of(1, 2, 3).pipe(
      concatMap(n => interval(1000).pipe(
        take(Math.round(Math.random() * 10)),
        map(() => 'X'),
        tap({ complete: () => console.log(`Done with ${ n }`) })
      ))
    )
    .subscribe(console.log);
  
  
  }



}
