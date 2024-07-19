import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SwapiService } from '../../services/swapi.service';
import { IPerson } from '../../models';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  people: IPerson[] = [];
  count = 0;
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  isLoading = true;
  isError = false;

  constructor(
    private swapiService: SwapiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = parseInt(params['page']) || 1;
      this.currentPage = page;
      this.fetchPeople(page);
    });
  }

  fetchPeople(page: number = 1): void {
    this.isLoading = true;
    this.swapiService.getPeople(page).subscribe({
      next: (response) => {
        this.people = response.results;
        this.count = response.count;
        this.totalPages = Math.ceil(this.count / this.pageSize);
        this.currentPage = page;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isError = true;
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.fetchPeople(page);
      this.updateQueryParams(page);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  updateQueryParams(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
    });
  }
}
