import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import { ObsAndoprComponent } from './obs-andopr/obs-andopr.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'pdf',
    component: PdfViewerComponent,
  },
  {
    path: 'operators',
    component: ObsAndoprComponent,
  },
  {
    path: 'media',
    loadChildren: () =>
      import('./media/media.module').then((m) => m.MediaModule),
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
