// media-recorder.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-media-recorder',
  templateUrl: './media-recorder.component.html',
  styleUrls: ['./media-recorder.component.scss']
})
export class MediaRecorderComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;

  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];
  recording = false;
  videoPlaying = false;

  startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.mediaRecorder = new MediaRecorder(stream);
        this.setupMediaRecorder();
        this.mediaRecorder!.start();
        this.recording = true;
      })
      .catch((error) => console.error('Error accessing media devices:', error));
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.recording = false;
    }
  }

  setupMediaRecorder() {
    this.recordedChunks = [];

    this.mediaRecorder!.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder!.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    };
  }

  toggleRecording() {
    if (!this.recording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  toggleVideoPlayback() {
    const video = this.videoElement.nativeElement;

    if (this.videoPlaying) {
      video.pause();
    } else {
      video.play();
    }

    this.videoPlaying = !this.videoPlaying;
  }
}
