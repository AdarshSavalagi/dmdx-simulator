import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private _router:Router) {
  }

  startImageStimulusTextResponse() {
    this._router.navigate(['customize/image-text']);
  }

  startImageStimulusVocalResponse() {
    this._router.navigate(['customize/image-vocal']);
  }

  startTextStimulusVocalResponse() {
    this._router.navigate(['customize/text-vocal']);
  }

  startTextStimulusTextResponse() {
    this._router.navigate(['customize/text-text']);
  }
}
