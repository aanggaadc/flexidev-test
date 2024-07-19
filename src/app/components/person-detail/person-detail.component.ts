import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SwapiService } from '../../services/swapi.service';
import { IPerson, IFilm, ISpecies, IStarship, IVehicle } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss',
})
export class PersonDetailComponent implements OnInit {
  person: IPerson | null = null;
  films: IFilm[] = [];
  species: ISpecies[] = [];
  starships: IStarship[] = [];
  vehicles: IVehicle[] = [];
  isLoading = true;
  isLoadingAdditional = true;
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
        this.loadAdditionalData();
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

  loadAdditionalData(): void {
    if (!this.person) return;
    this.isLoadingAdditional = true;

    // Helper function to fetch resources
    const fetchResources = (
      urls: string[],
      fetchFunction: (url: string) => Observable<any>
    ) => {
      return Promise.all(urls.map((url) => fetchFunction(url).toPromise()));
    };

    Promise.all([
      fetchResources(this.person.films, (url) =>
        this.swapiService.getResource<IFilm>(url)
      ),
      fetchResources(this.person.species, (url) =>
        this.swapiService.getResource<ISpecies>(url)
      ),
      fetchResources(this.person.starships, (url) =>
        this.swapiService.getResource<IStarship>(url)
      ),
      fetchResources(this.person.vehicles, (url) =>
        this.swapiService.getResource<IVehicle>(url)
      ),
    ])
      .then(([films, species, starships, vehicles]) => {
        this.films = films;
        this.species = species;
        this.starships = starships;
        this.vehicles = vehicles;
        this.isLoadingAdditional = false;
      })
      .catch((error) => {
        console.error('Error loading additional data:', error);
      });
  }
}
