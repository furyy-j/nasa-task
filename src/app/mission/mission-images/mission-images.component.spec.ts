import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionImagesComponent } from './mission-images.component';

describe('MissionImagesComponent', () => {
  let component: MissionImagesComponent;
  let fixture: ComponentFixture<MissionImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
