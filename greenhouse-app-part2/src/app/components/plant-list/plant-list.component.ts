import { Component, OnInit } from '@angular/core';
import { PlantService, Plant } from '../../services/plant.service';
import { AuthService } from '../tempAuthService'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];
  selectedPlant: Plant | null = null;

  newPlant: Plant = {
    name: '',
    species: '',
    plantingDate: '',
    wateringFrequency: 1,
    lightRequirement: 'Full Sun',
  };

  constructor(private plantService: PlantService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        this.plants = data; // Now this will only contain the current user's plants
        console.log('Loaded plants:', this.plants);
      },
      error: (err) => {
        console.error('Error fetching plants:', err);
      },
    });
  }

  onSubmit(): void {
    this.plantService.createPlant(this.newPlant).subscribe({
      next: (data) => {
        console.log('Plant created:', data);
        this.loadPlants();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating plant:', err);
      },
    });
  }

  editPlant(id: string): void {
    console.log('Edit plant with ID:', id);
    // Redirect to edit plant page or perform inline editing
  }

  deletePlant(id: string): void {
    this.plantService.deletePlant(id).subscribe({
      next: () => {
        console.log('Plant deleted:', id);
        this.loadPlants();
      },
      error: (err) => {
        console.error('Error deleting plant:', err);
      },
    });
  }

  selectPlant(plant: Plant): void {
    this.selectedPlant = plant;
    console.log('Selected plant:', this.selectedPlant);
  }

  resetForm(): void {
    this.newPlant = {
      name: '',
      species: '',
      plantingDate: '',
      wateringFrequency: 1,
      lightRequirement: 'Full Sun',
    };
  }
}
