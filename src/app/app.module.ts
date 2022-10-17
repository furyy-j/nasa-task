import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { MissionFormComponent } from './mission/mission-form/mission-form.component';
import { MissionImagesComponent } from './mission/mission-images/mission-images.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionComponent,
    MissionFormComponent,
    MissionImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
