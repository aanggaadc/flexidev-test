import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../services/swapi.service';
import { IPerson } from '../../models';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss',
})
export class PersonDetailComponent implements OnInit {
  person: IPerson | null = null;
  isLoading = true;
  isError = null;

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchPerson(parseInt(id || ''));
  }

  fetchPerson(id: number): void {
    this.isLoading = true;
    this.swapiService.getPerson(id).subscribe({
      next: (response) => {
        this.person = response;
      },
      error: (error) => {
        console.log(error);
        this.isError = error.status;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
