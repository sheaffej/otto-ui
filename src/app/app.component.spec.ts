import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GrowlModule, MessageModule, MessagesModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { OttoRestService } from './services/otto-rest.service';
import { GrowlService } from './services/growl.service';
import { StateFlagsService } from './services/state-flags.service';

class OttoRestServiceMock {}
class GrowlServiceMock {}
class StateFlagsServiceMock {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: '', redirectTo: 'home', pathMatch: 'full' },]
        ),
        GrowlModule,
        MessageModule,
        MessagesModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        { provide: OttoRestService, useClass: OttoRestServiceMock },
        { provide: GrowlService, useClass: GrowlServiceMock},
        { provide: StateFlagsService, useClass: StateFlagsServiceMock},
      ],
    }).compileComponents();
  }));

  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title 'Otto UI'`, async(() => {
    const title = 'Otto UI';
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(title);
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  // }));
});
