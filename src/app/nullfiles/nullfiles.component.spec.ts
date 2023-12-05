import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NullfilesComponent } from './nullfiles.component';

describe('NullfilesComponent', () => {
  let component: NullfilesComponent;
  let fixture: ComponentFixture<NullfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NullfilesComponent]
    });
    fixture = TestBed.createComponent(NullfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
