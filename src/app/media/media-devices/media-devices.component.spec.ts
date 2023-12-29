import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDevicesComponent } from './media-devices.component';

describe('MediaDevicesComponent', () => {
  let component: MediaDevicesComponent;
  let fixture: ComponentFixture<MediaDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
