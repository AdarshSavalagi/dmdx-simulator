import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ExperimentComponent} from "./pages/experiment/experiment.component";
import {CustomizeComponent} from "./pages/customize/customize.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'customize/:type',
    component: CustomizeComponent
  },
  {
    path:'experiment/:type',
    component: ExperimentComponent
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];
