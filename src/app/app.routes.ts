import { Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

export const routes: Routes = [
  { path: '', component: PeopleListComponent },
  { path: 'person/:id', component: PersonDetailComponent },
];
