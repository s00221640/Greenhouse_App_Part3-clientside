import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthService } from './app/components/tempAuthService';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Ensure correct modules are imported
    importProvidersFrom(RouterModule.forRoot(routes)), // Use RouterModule.forRoot
    AuthService, // Provide AuthService
  ],
}).catch((err) => console.error(err));
