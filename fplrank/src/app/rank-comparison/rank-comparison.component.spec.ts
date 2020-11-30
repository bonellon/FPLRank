import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankComparisonComponent } from './rank-comparison.component';

describe('RankComparisonComponent', () => {
  let component: RankComparisonComponent;
  let fixture: ComponentFixture<RankComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
