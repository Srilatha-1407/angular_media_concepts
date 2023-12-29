import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MediaStreamComponent} from './media-stream/media-stream.component';
import {ScreenCaptureComponent} from './screen-capture/screen-capture.component';
import {MediaRecorderComponent} from './media-recorder/media-recorder.component';
import {MediaDevicesComponent} from './media-devices/media-devices.component';
import { WebRTCexampleComponent } from './web-rtcexample/web-rtcexample.component';
import { InitiatorComponent } from './initiator/initiator.component';
import { ReceiverComponent } from './receiver/receiver.component';
const routes: Routes = [
  {
    path: 'screen-capture',
    component: ScreenCaptureComponent,
  },
  {
    path: 'media-stream',
    component: MediaStreamComponent,
  },
  {
    path: 'media-recorder',
    component: MediaRecorderComponent,
  },
  {
    path: 'media-devices',
    component: MediaDevicesComponent,
  },
  {
    path: 'webRTC',
    component: WebRTCexampleComponent,
  },
  {
    path: 'initiator',
    component: InitiatorComponent,
  },  
  {
    path: 'receiver',
    component: ReceiverComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
