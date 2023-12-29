import { Component, ViewChild, ElementRef } from '@angular/core';
import SimplePeer from 'simple-peer';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  localStream: MediaStream | undefined;
  remoteStream: MediaStream | undefined;
  peer: SimplePeer.Instance | undefined;
  signaling$: WebSocketSubject<any>;

  constructor() {
    this.signaling$ = webSocket('ws://localhost:8080/receiver'); // Replace with your signaling server URL
    this.startReceiver()
    console.log("sriiiii")
  }

  async startReceiver() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.localVideo.nativeElement.srcObject = this.localStream;

      this.peer = new SimplePeer();

      this.peer.on('signal', (data) => {
        this.signaling$.next(data); // Send signaling data to the initiator
      });

      this.peer.on('stream', (stream: MediaStream) => {
        this.remoteStream = stream;
        this.remoteVideo.nativeElement.srcObject = this.remoteStream;
        
      });
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }

    this.signaling$.subscribe((data) => {
      console.log(typeof data,data)
      // Handle received signaling data from the initiator
      if(this.peer){

        this.peer.signal(data);
      }
    });
  }

  // Other methods for recording, stopping, playing recorded video, etc.
}
