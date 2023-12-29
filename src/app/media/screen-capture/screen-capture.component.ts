import { Component, AfterViewInit } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-screen-capture',
  templateUrl: './screen-capture.component.html',
  styleUrls: ['./screen-capture.component.scss']
})
export class ScreenCaptureComponent implements AfterViewInit {

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
  }
  capturedImageSrc: string | null = null;

  ngAfterViewInit() {
  }
  
  // ************ Screen Capture starts ********* 
  screenCapture() {
    this.mediaService.captureScreen('captureElement').then(imageData => {
      this.capturedImageSrc = imageData;
      this.copyImageToClipboard(this.capturedImageSrc);

    }).catch(error => {
      console.error(error);
    });
  }

  downloadCapturedImg() {
    if (this.capturedImageSrc) {
      const link = document.createElement('a');
      link.href = this.capturedImageSrc;
      link.download = 'captured_image.png';
      link.click();
    } else {
      alert('Please Capture Image');
    }
  }
   // Copy image to clipboard using ClipboardItem API
   copyImageToClipboard(imageSrc: string) {
    fetch(imageSrc)
      .then(response => response.blob())
      .then(blob => {
        const clipboardItem = new ClipboardItem({ 'image/png': blob } as any);
        navigator.clipboard.write([clipboardItem])
          .then(() => {
            console.log('Image copied to clipboard successfully');
          })
          .catch(error => {
            console.error('Error copying image to clipboard:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }
  // ******* Screen Capture ends *****
}
