import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// components
import { NotesComponent } from './notes.component';
import { ListingComponent } from './listing/listing.component';
import { AddNotesComponent } from './add-notes/add-notes.component';


const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: 'new',
        component: AddNotesComponent,
      },
      {
        path: 'listing',
        component: ListingComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'notes/listing'
  }
];
@NgModule({
  declarations: [NotesComponent, ListingComponent, AddNotesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class NotesModule {}
