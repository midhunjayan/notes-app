import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent implements OnInit {
  submitted = false;
  addForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    id: [null],
  });
  isEditing = false;
  noteLists: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const noteId = this.route.snapshot.queryParamMap.get('id');
    const notes = localStorage.getItem('notes');
    if (notes) {
      this.noteLists = JSON.parse(notes);
    } else {
      this.noteLists = [];
    }
    // editing data
    if (noteId) {
      if (this.noteLists.length) {
        const noteItem = this.noteLists.find(
          (n: any) => n.id.toString() === noteId
        );
        if (noteItem) {
          this.addForm.patchValue({
            title: noteItem.title,
            description: noteItem.description,
            id: noteItem?.id,
          });
        }
        this.isEditing = true;
      } else {
        this.router.navigateByUrl('/notes/listing');
      }
    }
  }

  get fControls() {
    return this.addForm.controls;
  }

  createForm(): void {
    this.submitted = true;
    if (this.addForm.valid) {
      const { title, description, id } = this.addForm.value;
      if (!this.isEditing) {
        this.noteLists.push({
          title,
          description,
          createdDate: new Date(),
          id: Date.now(),
        });
        this.setLocalStorageWithNotes();
        this.navigateToListing();
      } else {
        const foundIndex = this.noteLists.findIndex((n: any) => n.id === id);
        if (foundIndex === -1) {
          console.log('Some error occured please try again');
          this.navigateToListing();
        } else {
          this.noteLists[foundIndex].title = title;
          this.noteLists[foundIndex].description = description;
          this.setLocalStorageWithNotes();
          this.navigateToListing();
        }
      }
    }
  }

  setLocalStorageWithNotes(): void {
    localStorage.setItem('notes', JSON.stringify(this.noteLists));
  }

  navigateToListing(): void {
    this.router.navigateByUrl('/notes/listing');
  }

  resetForm(): void {
    this.addForm.reset();
    this.submitted = false;
  }
}
