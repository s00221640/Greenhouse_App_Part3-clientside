import { Component, OnInit } from '@angular/core';
import { PlantService, Plant } from '../../services/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];
  selectedPlant: Plant | null = null; // Ensure selectedPlant is initialized as null

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

  editPlant(id: string): void {
    // Navigate to the Edit Plant page
    console.log('Edit plant with ID:', id);
    // Redirect logic can go here
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
    this.selectedPlant = plant; // Assign the selected plant
  }
}
