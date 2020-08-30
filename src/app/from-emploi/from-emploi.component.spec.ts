import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromEmploiComponent } from './from-emploi.component';

describe('FromEmploiComponent', () => {
  let component: FromEmploiComponent;
  let fixture: ComponentFixture<FromEmploiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromEmploiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
