import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import {MediaStreamComponent} from './media-stream/media-stream.component';
import {ScreenCaptureComponent} from './screen-capture/screen-capture.component';
import {MediaRecorderComponent} from './media-recorder/media-recorder.component';
import { MediaDevicesComponent } from './media-devices/media-devices.component';
import { WebRTCexampleComponent } from './web-rtcexample/web-rtcexample.component';
import { InitiatorComponent } from './initiator/initiator.component';
import { ReceiverComponent } from './receiver/receiver.component';

@NgModule({
  declarations: [ MediaStreamComponent,
    ScreenCaptureComponent,
    MediaRecorderComponent,
    MediaDevicesComponent,
    WebRTCexampleComponent,
    InitiatorComponent,
    ReceiverComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
   
  ]
})
export class MediaModule { }
