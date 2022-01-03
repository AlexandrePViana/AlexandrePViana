import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagtoAntecipadoPage } from './pagto-antecipado.page';

describe('PagtoAntecipadoPage', () => {
  let component: PagtoAntecipadoPage;
  let fixture: ComponentFixture<PagtoAntecipadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagtoAntecipadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagtoAntecipadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
