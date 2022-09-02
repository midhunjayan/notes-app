import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  noteListing: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('notes');
    if (localData) {
      this.noteListing = JSON.parse(localData);
    } else {
      this.noteListing = [];
    }
  }

  editData(data: any): void {
    this.router.navigate(['/notes/new'], { queryParams: { id: data?.id } });
  }

  deleteData(item: any): void {
    this.noteListing = this.noteListing.filter((m: any) => m.id !== item.id);
    localStorage.setItem('notes', JSON.stringify(this.noteListing));
  }
}
