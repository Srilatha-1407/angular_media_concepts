import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaRecorderComponent } from './media-recorder.component';

describe('MediaRecorderComponent', () => {
  let component: MediaRecorderComponent;
  let fixture: ComponentFixture<MediaRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaRecorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
