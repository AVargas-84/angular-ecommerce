import { Component, Input, SimpleChanges, signal } from '@angular/core';


@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';

  counter = signal(0);
  counterRef: number | undefined;

  constructor(){
    //No Async, runs before render 1 time
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges){
    //runs before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) { //El if valida si el duration cambió, y si nuevo valor es diferente al anterior.
      this.doSomethingOnChange();
    }
  }

  ngOnInit() {
    // Runs after render 1 time, async
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration = ',this.duration);
    console.log('message = ',this.message);

    this.counterRef = window.setInterval(() => { //This process runs even after the component has been destroyed
      console.log('run interval');
      this.counter.update(prevState => prevState + 1);
    }, 1000);
  }

  ngAfterViewInit (){
    // Runs after render, if children were rendered
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(){
    // Runs after a component is destroyed
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef); //Destroys task when the component is destroyed.
  }

  doSomethingOnChange(){
    //Async
    console.log('change duration');
  }
}
