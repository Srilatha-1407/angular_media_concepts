import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { FontSizeService } from './services/font-size.service';
import {NgxExtendedPdfViewerService,pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';
  currentLocation: any;

  //Theme
  get dark() {
    return this.themeService.theme === 'dark';
  }

  set dark(enabled: boolean) {
    this.themeService.theme = enabled ? 'dark' : null;
  }
  constructor(private location: Location, public router: Router,private themeService: ThemeService,private fontSizeService: FontSizeService,private pdfService:NgxExtendedPdfViewerService){
    this.currentLocation = this.location.path();

    if (this.currentLocation == '') {
      this.router.navigate(['/pdf']);
    } else {
      this.router.navigate([this.currentLocation]);
    }
  }
  //Font size services
  ngOnInit() {
    this.updateFontSize();
  }

  increaseFontSize() {
    this.fontSizeService.increaseFontSize();
    this.updateFontSize();
  }

  decreaseFontSize() {
    this.fontSizeService.decreaseFontSize();
    this.updateFontSize();
  }

  private updateFontSize() {
    const fontSize = this.fontSizeService.getFontSize();
    document.documentElement.style.fontSize = `${fontSize}px`; 
  }
 
}
