import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
@Component({
  selector: 'app-media-devices',
  templateUrl: './media-devices.component.html',
  styleUrls: ['./media-devices.component.scss']
})
export class MediaDevicesComponent implements OnInit{

    @ViewChild('liveVideo') liveVideoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('recordedVideo') recordedVideoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('audioPlayer') audioPlayerElement!: ElementRef<HTMLAudioElement>;
   
    recordedV:boolean = true;
    constructor(public mediaService: MediaService) {}
    ngOnInit(): void {
      
    }
    startRecording(liveVideoElement:any,recordedVideoElement:any) {
      this.mediaService.startRecording(liveVideoElement,recordedVideoElement);
    }
  
    stopRecording() {
      this.mediaService.stopRecording();
      this.recordedV = false;
    }
  
    downloadRecordedVideo() {
      this.mediaService.downloadRecordedVideo();
    }
  
    startAudioRecording(audioPlayerElement:any) {
      this.mediaService.startAudioRecording(audioPlayerElement);
    }
  
    stopAudioRecording() {
      this.mediaService.stopAudioRecording();
    }
  
    downloadRecordedAudio() {
      this.mediaService.downloadRecordedAudio();
    }
  
    captureImage() {
      this.mediaService.captureImage();
    }
  
    downloadCapturedImage() {
      this.mediaService.downloadCapturedImage();
    }
    // async startRecording() {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({ 
    //       video: true, 
    //       audio: true 
    //     });
  
    //     const liveVideo = this.liveVideoElement.nativeElement;
    //     if (liveVideo) {
    //       liveVideo.srcObject = stream;
  
    //       this.mediaRecorder = new MediaRecorder(stream);
    //       this.recordedChunks = [];
  
    //       this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
    //         if (event.data.size > 0) {
    //           this.recordedChunks.push(event.data);
    //         }
    //       };
  
    //       this.mediaRecorder.onstop = () => {
    //         const recordedBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
    //         const recordedVideoURL = URL.createObjectURL(recordedBlob);
    //         const recordedVideo = this.recordedVideoElement.nativeElement;
    //         if (recordedVideo) {
    //           recordedVideo.src = recordedVideoURL;
    //         }
    //       };
  
    //       this.mediaRecorder.start();
    //     }
    //   } catch (err) {
    //     console.error('Error accessing user media:', err);
    //   }
    // }
  
    // stopRecording() {
    //   if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
    //     alert('Recording has not started yet.');
    //     return;
    //   }
    //   this.mediaRecorder.stop();
    // }
  
    // downloadRecordedVideo() {
    //   if (this.recordedChunks.length === 0) {
    //     alert('No recorded video available.');
    //     return;
    //   }
  
    //   const recordedBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
    //   const url = URL.createObjectURL(recordedBlob);
    //   const a = document.createElement('a');
    //   document.body.appendChild(a);
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = 'recorded-video.webm';
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // }
  
    // async startAudioRecording() {
    //   try {
    //     const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
    //     this.audioRecorder = new MediaRecorder(audioStream);
    //     this.audioChunks = [];
    //     this.isAudioRecording = true; 

    //     this.audioRecorder.ondataavailable = (event: BlobEvent) => {
    //       if (event.data.size > 0) {
    //         this.audioChunks.push(event.data);
    //       }
    //     };
  
    //     this.audioRecorder.onstop = () => {
    //       this.isAudioRecording = false; 

    //       const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
    //       const audioURL = URL.createObjectURL(audioBlob);
  
    //       const audioPlayer = this.audioPlayerElement.nativeElement;
    //       if (audioPlayer) {
    //         audioPlayer.src = audioURL;
    //       }
    //     };
  
    //     this.audioRecorder.start();
    //   } catch (err) {
    //     console.error('Error accessing user media:', err);
    //   }
    // }
  
    // stopAudioRecording() {
    //   if (!this.audioRecorder || this.audioRecorder.state === 'inactive') {
    //     alert('Audio recording has not started yet.');
    //     return;
    //   }
    //   this.isAudioRecording = false;
    //   this.audioRecorder.stop();
    // }
  
    // downloadRecordedAudio() {
    //   if (this.audioChunks.length === 0) {
    //     alert('No recorded audio available.');
    //     return;
    //   }
  
    //   const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
    //   const url = URL.createObjectURL(audioBlob);
    //   const a = document.createElement('a');
    //   document.body.appendChild(a);
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = 'recorded-audio.wav';
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // }
  
    // async captureImage() {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //     const videoElement = document.createElement('video');
    //     const captureCanvas = document.createElement('canvas');
    //     const ctx = captureCanvas.getContext('2d');
  
    //     if (ctx) {
    //       videoElement.srcObject = stream;
    //       videoElement.play();
  
    //       videoElement.addEventListener('loadedmetadata', () => {
    //         captureCanvas.width = videoElement.videoWidth;
    //         captureCanvas.height = videoElement.videoHeight;
    //         ctx.drawImage(videoElement, 0, 0, captureCanvas.width, captureCanvas.height);
    //         this.imageDataURL = captureCanvas.toDataURL('image/png');
    //       });
    //     }
    //   } catch (err) {
    //     console.error('Error capturing image:', err);
    //   }
    // }
  
    // downloadCapturedImage() {
    //   if (!this.imageDataURL) {
    //     alert('No captured image available.');
    //     return;
    //   }
  
    //   const a = document.createElement('a');
    //   document.body.appendChild(a);
    //   a.style.display = 'none';
    //   a.href = this.imageDataURL;
    //   a.download = 'captured-image.png';
    //   a.click();
    //   document.body.removeChild(a);
    // }
  }
  