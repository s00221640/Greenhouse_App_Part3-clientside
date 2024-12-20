import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Plant {
  _id?: string;
  name: string;
  species: string;
  plantingDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiUrl = 'http://localhost:3000/plants';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAllPlants(): Observable<Plant[]> {
    return this.http
      .get<Plant[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(
        tap((data) => console.log('Fetched all plants:', data)),
        catchError((error) => {
          console.error('Error fetching all plants:', error);
          return throwError(() => error);
        })
      );
  }

  getPlantById(id: string): Observable<Plant> {
    console.log('Fetching plant by ID:', id); // Debugging log
    return this.http
      .get<Plant>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap((data) => console.log('Received plant data:', data)), // Debugging log
        catchError((error) => {
          console.error('Error fetching plant by ID:', error);
          return throwError(() => error);
        })
      );
  }

  createPlant(plant: Plant): Observable<Plant> {
    return this.http
      .post<Plant>(this.apiUrl, plant, { headers: this.getAuthHeaders() })
      .pipe(
        tap((data) => console.log('Plant created:', data)),
        catchError((error) => {
          console.error('Error creating plant:', error);
          return throwError(() => error);
        })
      );
  }

  updatePlant(id: string, plant: Plant): Observable<Plant> {
    console.log('Updating plant ID:', id, 'with data:', plant);
    return this.http
      .put<Plant>(`${this.apiUrl}/${id}`, plant, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => console.log('Plant updated successfully')),
        catchError((error) => {
          console.error('Error updating plant:', error);
          return throwError(() => error);
        })
      );
  }

  deletePlant(id: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => console.log('Plant deleted successfully')),
        catchError((error) => {
          console.error('Error deleting plant:', error);
          return throwError(() => error);
        })
      );
  }
}
