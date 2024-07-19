import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { SwapiService } from '../../services/swapi.service';
import { IPerson } from '../../models';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatListModule],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  people: IPerson[] = [];
  isLoading = true;
  isError = false;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.fetchPeople();
  }

  fetchPeople(): void {
    this.isLoading = true;
    this.swapiService.getPeople().subscribe({
      next: (response) => {
        this.people = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isError = true;
      },
    });
  }
}
