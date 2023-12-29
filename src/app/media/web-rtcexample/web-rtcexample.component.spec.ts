import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRTCexampleComponent } from './web-rtcexample.component';

describe('WebRTCexampleComponent', () => {
  let component: WebRTCexampleComponent;
  let fixture: ComponentFixture<WebRTCexampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebRTCexampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRTCexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
