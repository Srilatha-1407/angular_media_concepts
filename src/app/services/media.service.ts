import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class MediaService {



// Media Devices component service start

private mediaRecorder: MediaRecorder | null = null;
private recordedChunks: Blob[] = [];
imageDataURL: any;
isAudioRecording:boolean = false;
private audioRecorder: MediaRecorder | null = null;
private audioChunks: Blob[] = [];

async startRecording(liveVideoElement:any,recordedVideoElement:any) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      // audio: true 
    });

    const liveVideo = liveVideoElement.nativeElement;
    if (liveVideo) {
      liveVideo.srcObject = stream;

      this.mediaRecorder = new MediaRecorder(stream);
      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const recordedVideoURL = URL.createObjectURL(recordedBlob);
        const recordedVideo = recordedVideoElement.nativeElement;
        if (recordedVideo) {
          recordedVideo.src = recordedVideoURL;
        }
      };

      this.mediaRecorder.start();
    }
  } catch (err) {
    console.error('Error accessing user media:', err);
  }
}

stopRecording() {
  if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
    alert('Recording has not started yet.');
    return;
  }
  this.mediaRecorder.stop();
}

downloadRecordedVideo() {
  if (this.recordedChunks.length === 0) {
    alert('No recorded video available.');
    return;
  }

  const recordedBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(recordedBlob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = url;
  a.download = 'recorded-video.webm';
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async startAudioRecording(audioPlayerElement:any) {
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this.audioRecorder = new MediaRecorder(audioStream);
    this.audioChunks = [];
    this.isAudioRecording = true; 

    this.audioRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.audioRecorder.onstop = () => {
      this.isAudioRecording = false; 

      const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
      const audioURL = URL.createObjectURL(audioBlob);

      const audioPlayer = audioPlayerElement.nativeElement;
      if (audioPlayer) {
        audioPlayer.src = audioURL;
      }
    };

    this.audioRecorder.start();
  } catch (err) {
    console.error('Error accessing user media:', err);
  }
}

stopAudioRecording() {
  if (!this.audioRecorder || this.audioRecorder.state === 'inactive') {
    alert('Audio recording has not started yet.');
    return;
  }
  this.isAudioRecording = false;
  this.audioRecorder.stop();
}

downloadRecordedAudio() {
  if (this.audioChunks.length === 0) {
    alert('No recorded audio available.');
    return;
  }

  const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = url;
  a.download = 'recorded-audio.wav';
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async captureImage() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.createElement('video');
    const captureCanvas = document.createElement('canvas');
    const ctx = captureCanvas.getContext('2d');

    if (ctx) {
      videoElement.srcObject = stream;
      videoElement.play();

      videoElement.addEventListener('loadedmetadata', () => {
        captureCanvas.width = videoElement.videoWidth;
        captureCanvas.height = videoElement.videoHeight;
        ctx.drawImage(videoElement, 0, 0, captureCanvas.width, captureCanvas.height);
        this.imageDataURL = captureCanvas.toDataURL('image/png');
      });
    }
  } catch (err) {
    console.error('Error capturing image:', err);
  }
}

downloadCapturedImage() {
  if (!this.imageDataURL) {
    alert('No captured image available.');
    return;
  }

  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = this.imageDataURL;
  a.download = 'captured-image.png';
  a.click();
  document.body.removeChild(a);
}

//Media devices component service end
  // getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
  //   return navigator.mediaDevices.getUserMedia(constraints);
  // }

  // startRecording(stream: MediaStream): MediaRecorder {
  //   return new MediaRecorder(stream);
  // }

  // ******* Screen Capture service start *******
  captureScreen(elementId: string): Promise<string> {
    const element = document.getElementById(elementId);
    if (!element) {
      return Promise.reject(new Error('Element not found'));
    }

    return html2canvas(element).then(canvas => canvas.toDataURL('image/png'));
  }
  // ************ Screen Capture service End **********8
}
