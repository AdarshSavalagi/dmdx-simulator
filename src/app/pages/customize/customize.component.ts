import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {experimentTypes} from '../../types/experimentType';


@Component({
  selector: 'app-customize',
  standalone: true,
  imports: [],
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.css'
})
export class CustomizeComponent {

  stimulusType: string = '';
  responseType: string = '';
  type: string = '';
  protected readonly experimentTypes = experimentTypes;
  protected readonly alert = alert;
  experiment: experimentTypes | undefined;

  constructor(private router: Router,) {
    try {
      this.stimulusType = this.router.url.split('/')[2].split('-')[0];
      this.responseType = this.router.url.split('/')[2].split('-')[1];
      this.type = this.router.url.split('/')[2];
      switch (this.type) {
        case 'text-text':
          this.experiment = experimentTypes.text_text;
          break;
        case 'text-vocal':
          this.experiment = experimentTypes.text_vocal;
          break;
        case 'image-vocal':
          this.experiment = experimentTypes.image_vocal;
          break;
        case 'image-text':
          this.experiment = experimentTypes.image_text;
      }
    } catch (e: any) {
      console.error(e);
      this.router.navigate(['customize']);
    }
  }



  startExperiment() {
    this.router.navigate([`/experiment/${this.type}`]);
  }
}
