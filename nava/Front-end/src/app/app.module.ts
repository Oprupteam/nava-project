import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ColorPickerService } from 'ngx-color-picker';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core'
import { TranslateHttpLoader} from '@ngx-translate/http-loader'
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LanguageInterceptor } from './interceptors/language.interceptor';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    ToastrModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    ColorPickerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
  },
  HttpClient,

  {provide:MAT_DATE_LOCALE , useValue:'en-GB'},


  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// export function translateLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient, '/assets2/i18n/', '.json');
// }
