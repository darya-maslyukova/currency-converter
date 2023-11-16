import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterItemComponent } from './converter-item.component';

describe('ConverterItemComponent', () => {
  let component: ConverterItemComponent;
  let fixture: ComponentFixture<ConverterItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConverterItemComponent]
    });
    fixture = TestBed.createComponent(ConverterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
