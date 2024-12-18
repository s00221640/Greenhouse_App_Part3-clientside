import { Routes } from '@angular/router';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantCreateComponent } from './components/plant-create/plant-create.component';
import { PlantEditComponent } from './components/plant-edit/plant-edit.component';

export const routes: Routes = [
  { path: '', component: PlantListComponent },
  { path: 'create', component: PlantCreateComponent },
  { path: 'edit/:id', component: PlantEditComponent }
];
