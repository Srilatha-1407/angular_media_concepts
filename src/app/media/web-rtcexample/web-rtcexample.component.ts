import { Component, ViewChild, ElementRef } from '@angular/core';
import SimplePeer from 'simple-peer';

@Component({
  selector: 'app-web-rtcexample',
  templateUrl: './web-rtcexample.component.html',
  styleUrls: ['./web-rtcexample.component.scss']
})
export class WebRTCexampleComponent {

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  localStream: MediaStream | undefined;
  remoteStream: MediaStream | undefined;
  peer: SimplePeer.Instance | undefined;
  mediaRecorder: MediaRecorder | undefined;
  recordedChunks: Blob[] = [];
  isRecordingPaused: boolean = false;
  // localV:boolean = false;
  async startCall() {
    // this.localV = true;
    
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true,
        //  audio: true
         });
      this.localVideo.nativeElement.srcObject = this.localStream;
      
      this.peer = new SimplePeer({ initiator: true, stream: this.localStream });

      this.peer.on('signal', (data: any) => {
        // Handle signaling data
        // const initiatorWebSocket = new WebSocket('ws://signaling-server-url/initiator');

      });

      this.peer.on('stream', (stream: MediaStream) => {
        this.remoteStream = stream;
        this.remoteVideo.nativeElement.srcObject = this.remoteStream;
      });

      // Setup MediaRecorder for recording the stream
      const options = { mimeType: 'video/webm' };
      this.mediaRecorder = new MediaRecorder(this.localStream, options);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  }

  startRecording() {
    if (this.mediaRecorder && this.peer) {
      this.recordedChunks = [];
      this.mediaRecorder.start();
    }
  }
  async pauseRecording() {
    if (this.mediaRecorder && this.peer && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.isRecordingPaused = true;
    }
  }

  async resumeRecording() {
    if (this.mediaRecorder && this.peer && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.isRecordingPaused = false;
    }
  }
  stopRecording() {
    // this.localV = false;
    if (this.mediaRecorder && this.peer) {
      this.mediaRecorder.stop();
      // this.playRecordedVideo();
    }
  }

  async playRecordedVideo() {
    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
    const videoUrl = URL.createObjectURL(blob);
   
    const recordedVideoElement = document.createElement('video');
    recordedVideoElement.src = videoUrl;
    recordedVideoElement.controls = true;
    
    document.body.appendChild(recordedVideoElement);
  }
}
