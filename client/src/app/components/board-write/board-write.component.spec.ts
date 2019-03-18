import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardWriteComponent } from './board-write.component';

describe('BoardWriteComponent', () => {
  let component: BoardWriteComponent;
  let fixture: ComponentFixture<BoardWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
