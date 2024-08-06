import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { SimpleChanges } from '@angular/core';

describe('LoadingComponent', () => {
  let fixture: ComponentFixture<LoadingComponent>;
  let component: LoadingComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hideControl to false if show is true', () => {
    component.show = true;
    const changes: SimpleChanges = { show: false } as unknown as SimpleChanges;

    component.ngOnChanges(changes);
    expect(component.hideControl).toBe(false);
  });
});
