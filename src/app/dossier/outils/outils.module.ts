import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutilsRoutingModule } from './outils-routing.module';
import { NavOutilsComponent } from './nav-outils/nav-outils.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { DeleteNoteComponent } from './delete-note/delete-note.component';
import { InformationsComponent } from './informations/informations.component';



@NgModule({
  declarations: [
    NavOutilsComponent,
    NotesComponent,
    NewNoteComponent,
    EditNoteComponent,
    DeleteNoteComponent,
    InformationsComponent
  ],  
  imports: [
    CommonModule,
    OutilsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OutilsModule { }
