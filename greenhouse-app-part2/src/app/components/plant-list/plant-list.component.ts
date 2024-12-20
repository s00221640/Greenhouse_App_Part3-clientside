import { Component, OnInit } from '@angular/core';
import { PlantService, Plant } from '../../services/plant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

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

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        this.plants = data;
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
        this.loadPlants(); // Refresh the plant list
        this.newPlant = {
          name: '',
          species: '',
          plantingDate: '',
          wateringFrequency: 1,
          lightRequirement: 'Full Sun',
        }; // Reset the form
      },
      error: (err) => {
        console.error('Error creating plant:', err);
      },
    });
  }

  editPlant(id: string): void {
    console.log('Edit plant with ID:', id);
    // Navigate to the Edit Plant page
  }

  deletePlant(id: string): void {
    this.plantService.deletePlant(id).subscribe({
      next: () => {
        console.log('Plant deleted:', id);
        this.loadPlants(); // Refresh the plant list
      },
      error: (err) => {
        console.error('Error deleting plant:', err);
      },
    });
  }

  selectPlant(plant: Plant): void {
    this.selectedPlant = plant;
  }
}
