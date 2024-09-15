import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ExperimentComponent} from "./pages/experiment/experiment.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'experiment',
    component: ExperimentComponent
  }
];
