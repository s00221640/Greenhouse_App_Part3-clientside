import { Routes } from '@angular/router';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantCreateComponent } from './components/plant-create/plant-create.component';
import { PlantEditComponent } from './components/plant-edit/plant-edit.component';
import { AppComponent} from './app.component';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [
  { path: '', component: PlantListComponent },
  { path: 'create', component: PlantCreateComponent },
  { path: 'edit/:id', component: PlantEditComponent },
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
];

console.log(routes);

