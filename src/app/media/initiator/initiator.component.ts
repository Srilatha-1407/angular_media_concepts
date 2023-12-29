import { Component, ViewChild, ElementRef } from '@angular/core';
import SimplePeer from 'simple-peer';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-initiator',
  templateUrl: './initiator.component.html',
  styleUrls: ['./initiator.component.scss']
})
export class InitiatorComponent {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  localStream: MediaStream | undefined;
  remoteStream: MediaStream | undefined;
  peer: SimplePeer.Instance | undefined;
  signaling$: WebSocketSubject<any>;

  constructor() {
    this.signaling$ = webSocket('ws://localhost:8080/initiator'); // Replace with your signaling server URL
  }

  async startCall() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.localVideo.nativeElement.srcObject = this.localStream;

      this.peer = new SimplePeer({ initiator: true, stream: this.localStream });

      this.peer.on('signal', (data) => {
        const signalingData = JSON.stringify(data); // Serialize data as JSON string
        this.signaling$.next(signalingData); // Send signaling data to the receiver
      });

      this.peer.on('stream', (stream: MediaStream) => {
        this.remoteStream = stream;
        this.remoteVideo.nativeElement.srcObject = this.remoteStream;
        
      });
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }

    this.signaling$.subscribe((data) => {
      // Handle received signaling data from the receiver
      if(this.peer){

        this.peer.signal(data);
      }
    });
  }

  // Other methods for recording, stopping, playing recorded video, etc.
}
