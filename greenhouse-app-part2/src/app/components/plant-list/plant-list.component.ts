import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { CommonModule } from '@angular/common';
import { PlantService, Plant } from '../../services/plant.service';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [FormsModule, CommonModule], // Ensure all required modules are imported
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit {
  plants: Plant[] = [];
  filteredPlants: Plant[] = [];
  searchQuery: string = '';
  selectedPlant: Plant | null = null; // For viewing plant details
  newPlant: Plant = {
    name: '',
    species: '',
    plantingDate: '',
    wateringFrequency: 1,
    lightRequirement: 'Full Sun',
  };
  wateringFrequencyOptions = [1, 2, 3, 4, 5]; // Example frequency options
  lightRequirementOptions = ['Full Sun', 'Partial Shade', 'Full Shade'];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        this.plants = data;
        this.filteredPlants = data;
      },
      error: (err) => {
        console.error('Error fetching plants:', err);
      },
    });
  }

  filterPlants(): void {
    this.filteredPlants = this.plants.filter((plant) =>
      plant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addPlant(): void {
    this.plantService.createPlant(this.newPlant).subscribe({
      next: (plant) => {
        this.plants.push(plant);
        this.filteredPlants.push(plant);
        this.newPlant = {
          name: '',
          species: '',
          plantingDate: '',
          wateringFrequency: 1,
          lightRequirement: 'Full Sun',
        };
      },
      error: (err) => {
        console.error('Error creating plant:', err);
      },
    });
  }

  selectPlant(plant: Plant): void {
    this.selectedPlant = plant;
  }

  deletePlant(id: string | undefined): void {
    if (!id) {
      console.error('Plant ID is undefined.');
      return;
    }
  
    this.plantService.deletePlant(id).subscribe({
      next: () => {
        this.plants = this.plants.filter((plant) => plant._id !== id);
        this.filteredPlants = this.filteredPlants.filter((plant) => plant._id !== id);
        if (this.selectedPlant?._id === id) {
          this.selectedPlant = null; // Reset details if the selected plant is deleted
        }
      },
      error: (err) => {
        console.error('Error deleting plant:', err);
      },
    });
  }
  
}
