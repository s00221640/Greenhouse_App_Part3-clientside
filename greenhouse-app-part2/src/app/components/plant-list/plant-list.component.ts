import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantService, Plant } from '../../services/plant.service';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Plant List</h2>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <ul>
      <li *ngFor="let plant of plants">
        {{ plant.name }} - {{ plant.species }} ({{ plant.plantingDate }})
      </li>
    </ul>
  `,
  styles: [
    `
      .error {
        color: red;
        font-weight: bold;
      }
    `,
  ],
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];
  errorMessage: string | null = null;

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants() {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        console.log('Plants fetched successfully:', data); // Debug log
        this.plants = data;
      },
      error: (err) => {
        console.error('Error fetching plants:', err); // Debug log
        this.errorMessage = 'Failed to load plants. Please try again later.';
      },
    });
  }
}
