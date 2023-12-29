import { Component, ElementRef, ViewChild } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Observable } from 'rxjs';


@Component({
  selector: 'app-media-stream',
  templateUrl: './media-stream.component.html',
  styleUrls: ['./media-stream.component.scss']
})
export class MediaStreamComponent {
  constructor() {}

  // private sanitizer: DomSanitizer
  // getSafeUrl(url: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
  mediaList: any[] = [
    // http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4
    
    { type: 'video', source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', format: 'video/mp4' },
    { type: 'audio', source: 'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg', format: 'audio/mpeg' }
    // Add more media items as needed
  ];
  showReplayButton: boolean = false;

  onVideoEnded(videoElement: HTMLVideoElement) {
    this.showReplayButton = true;
    videoElement.currentTime = 0;
    videoElement.pause();
  }

  replay(mediaType: string) {
    if (mediaType === 'video') {
      const videoElement: HTMLVideoElement | null = document.querySelector('video');
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
        this.showReplayButton = false;
      }
    }
  }

}









// import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-media-stream',
//   templateUrl: './media-stream.component.html',
//   styleUrls: ['./media-stream.component.scss']
// })
// export class MediaStreamComponent implements OnDestroy {
//   @ViewChild('videoPlayer') videoPlayer!: ElementRef;

//   mediaList: any[] = [
//     { type: 'video', source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', format: 'video/mp4' },
//     { type: 'audio', source: 'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg', format: 'audio/mpeg' }
//     // Add more media items as needed
//   ];
//   showReplayButton: boolean = false;

//   private videoEndedSubscription: Subscription | undefined;

//   constructor() {}

//   ngOnDestroy() {
//     // Unsubscribe to prevent memory leaks
//     this.videoEndedSubscription?.unsubscribe();
//   }

//   ngAfterViewInit() {
//     // Create an observable for video ended event
//     const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
//     this.videoEndedSubscription = new Observable((observer) => {
//       videoElement.addEventListener('ended', (event: Event) => {
//         console.log(event,"eventtttttttttttt")
//         observer.next(event); // Emit the event when the video ends
//       });

//       return () => {
//         // Clean up - remove the event listener when the component is destroyed
//         console.log("end")
//         videoElement.removeEventListener('ended', (event: Event) => {
//           observer.next(event);
//         });
//       };
//     }).subscribe(() => {
//       this.showReplayButton = true;
//       videoElement.currentTime = 0;
//       videoElement.pause();
//     });
//   }

//   replay(mediaType: string) {
//     if (mediaType === 'video') {
//       const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
//       videoElement.currentTime = 0;
//       videoElement.play();
//       this.showReplayButton = false;
//     }
//   }
// }
