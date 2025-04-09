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
    <div class="edit-container">
      <h2>Edit Plant</h2>
      <div *ngIf="loading" class="loading">Loading plant data...</div>
      <div *ngIf="errorMessage" class="error text-danger">{{ errorMessage }}</div>

      <form *ngIf="!loading && plant" (ngSubmit)="onSubmit()" class="edit-form">
        <div class="form-group">
          <label for="name">Plant Name:</label>
          <input [(ngModel)]="plant.name" name="name" class="form-control" required />
        </div>

        <div class="form-group">
          <label for="species">Species:</label>
          <input [(ngModel)]="plant.species" name="species" class="form-control" required />
        </div>

        <div class="form-group">
          <label for="plantingDate">Planting Date:</label>
          <input [(ngModel)]="plant.plantingDate" name="plantingDate" type="date" class="form-control" required />
        </div>

        <div class="form-group">
          <label for="wateringFrequency">Watering Frequency:</label>
          <select [(ngModel)]="plant.wateringFrequency" name="wateringFrequency" class="form-control" required>
            <option value="1">1 (Low – Nearly Never)</option>
            <option value="2">2 (Weekly)</option>
            <option value="3">3 (Often)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="lightRequirement">Light Requirement:</label>
          <select [(ngModel)]="plant.lightRequirement" name="lightRequirement" class="form-control" required>
            <option>Full Sun</option>
            <option>Partial Shade</option>
            <option>Shade</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  `,
  styles: [`
    .edit-container {
      max-width: 500px;
      margin: 20px auto;
      background-color: #e8f5e9;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #c8e6c9;
    }
    h2 {
      text-align: center;
      color: #388e3c;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 4px;
      border: 1px solid #c8e6c9;
    }
    .btn-primary {
      background-color: #388e3c;
      color: white;
      border: none;
      width: 100%;
      padding: 10px;
    }
    .btn-primary:hover {
      background-color: #2e7d32;
    }
    .error {
      margin-bottom: 15px;
      color: #d32f2f;
      text-align: center;
    }
  `]
})
export class PlantEditComponent implements OnInit {
  plant: Plant = { name: '', species: '', plantingDate: '', wateringFrequency: 1, lightRequirement: 'Full Sun' };
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
      this.errorMessage = 'Invalid plant ID! Redirecting to plant list...';
      this.loading = false;
      setTimeout(() => this.router.navigate(['/']), 3000);
    }
  }

  fetchPlantData(id: string): void {
    this.plantService.getPlantById(id).subscribe({
      next: (data) => {
        this.plant = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load plant data. Redirecting to plant list...';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/']), 3000);
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
