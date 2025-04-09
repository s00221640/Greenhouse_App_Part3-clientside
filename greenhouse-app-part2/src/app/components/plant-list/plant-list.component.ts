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

  newPlant: Partial<Plant> = {
    name: '',
    species: '',
    plantingDate: '',
    wateringFrequency: 1,
    lightRequirement: 'Full Sun',
  };

  imageFile: File | null = null;

  constructor(private plantService: PlantService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.plantService.getAllPlants().subscribe({
      next: (data) => {
        this.plants = data;
        console.log('Loaded plants:', this.plants);
      },
      error: (err) => {
        console.error('Error fetching plants:', err);
      },
    });
  }

  onFileChange(event: any): void {
    this.imageFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.newPlant.name || '');
    formData.append('species', this.newPlant.species || '');
    formData.append('plantingDate', this.newPlant.plantingDate || '');
    formData.append('wateringFrequency', String(this.newPlant.wateringFrequency ?? 1)); // safer with ?? instead of ||
    formData.append('lightRequirement', this.newPlant.lightRequirement || 'Full Sun');
  
    const user = this.authService.getUser();
    if (user?.email) {
      formData.append('userEmail', user.email);
    }
  
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }
  
    // ✅ Log FormData for debugging
    for (const [key, value] of (formData as any).entries()) {
      console.log(`${key}:`, value);
    }
  
    this.plantService.createPlant(formData).subscribe({
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
    this.imageFile = null;
  }
}
