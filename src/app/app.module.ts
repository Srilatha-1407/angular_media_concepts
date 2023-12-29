import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeService } from './services/theme.service';
import { FontSizeService } from './services/font-size.service';
import { MediaService } from './services/media.service';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
// import { WebcamModule } from 'ngx-webcam';
import { WebsiteSearchComponent } from './website-search/website-search.component';
import { HttpClientModule } from '@angular/common/http';
import { ObsAndoprComponent } from './obs-andopr/obs-andopr.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfViewerComponent,    
    WebsiteSearchComponent, ObsAndoprComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule
  ],
  providers: [ThemeService,FontSizeService,MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
