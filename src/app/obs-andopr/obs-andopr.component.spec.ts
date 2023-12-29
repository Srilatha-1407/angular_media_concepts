import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsAndoprComponent } from './obs-andopr.component';

describe('ObsAndoprComponent', () => {
  let component: ObsAndoprComponent;
  let fixture: ComponentFixture<ObsAndoprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObsAndoprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsAndoprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
