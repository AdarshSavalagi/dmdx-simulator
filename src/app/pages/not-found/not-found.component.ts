import { Component } from '@angular/core';
import {AnimationOptions, LottieComponent, provideLottieOptions} from "ngx-lottie";
import {Router} from "@angular/router";
import player from 'lottie-web';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    LottieComponent,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  providers:[
    provideLottieOptions({
      player:()=>player
    })
  ]
})
export class NotFoundComponent {
  lottieConfig: AnimationOptions = {
    path: 'https://assets4.lottiefiles.com/packages/lf20_tfb3estd.json' // Example Lottie JSON URL for 404 animation
  };

  constructor(private router: Router) {}

  animationCreated(animationItem: any): void {
    console.log(animationItem);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
