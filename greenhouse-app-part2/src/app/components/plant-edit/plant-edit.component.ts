import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Plant, PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-plant-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h2>Plant Edit</h2>
    <div *ngIf="loading" class="loading">Loading plant data...</div>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>

    <form *ngIf="!loading && plant" (ngSubmit)="onSubmit()">
      <label>
        Name:
        <input [(ngModel)]="plant.name" name="name" required />
      </label>
      <br />
      <label>
        Species:
        <input [(ngModel)]="plant.species" name="species" required />
      </label>
      <br />
      <label>
        Planting Date:
        <input [(ngModel)]="plant.plantingDate" name="plantingDate" type="date" required />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  `,
})
export class PlantEditComponent implements OnInit {
  plant: Plant = { name: '', species: '', plantingDate: '' };
  loading: boolean = true;
  errorMessage: string | null = null;

  private plantService: PlantService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector
  ) {
    this.plantService = this.injector.get(PlantService);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPlantData(id);
    } else {
      this.errorMessage = 'Invalid plant ID!';
      this.loading = false;
    }
  }

  fetchPlantData(id: string): void {
    this.plantService.getPlantById(id).subscribe({
        next: (data) => {
            this.plant = data;
            this.loading = false;
        },
        error: (err) => {
            if (err.status === 400) {
                this.errorMessage = 'Invalid Plant ID. Redirecting to plant list...';
            } else if (err.status === 404) {
                this.errorMessage = 'Plant not found. Redirecting to plant list...';
            } else {
                this.errorMessage = 'Failed to load plant data. Redirecting to plant list...';
            }
            this.loading = false;
            setTimeout(() => this.router.navigate(['/']), 3000); // Redirect after 3 seconds
        },
    });
}


  onSubmit(): void {
    if (this.plant._id) {
      this.plantService.updatePlant(this.plant._id, this.plant).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.errorMessage = 'Failed to update plant.'),
      });
    }
  }
}
