import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';


import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {

  @Input({required: true}) audioUrl!: string; // ! evitar que TS detecte error de inicialización
  @ViewChild('wave') container!: ElementRef; // Seleccionar el elemento del HTML
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit(){
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement,
    });
    this.ws.on('play', () => this.isPlaying.set(true));
    this.ws.on('pause', () => this.isPlaying.set(false));
  }

  playPause(){
    this.ws.playPause();
  }
}
