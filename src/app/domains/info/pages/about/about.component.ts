import { Component, signal } from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';

import { CounterComponent } from '@shared/components/counter/counter.component';
import { WaveAudioComponent } from './../../../info/components/wave-audio/wave-audio.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { HeaderComponent } from "@shared/components/header/header.component";

@Component({
  selector: 'app-about',
  imports: [CounterComponent, WaveAudioComponent, HighlightDirective, RouterLinkWithHref],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hello');

  changeDuration(event: Event){
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  changeMessage(event: Event){
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }
}
