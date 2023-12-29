import { Component, ElementRef, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { PdfserviceService } from '../services/pdfservice.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  selectedFile: any = "";
  selectedFilePath: string = "";
  isFileImage: boolean = false;
  isFileDocument: boolean = false;
  selectedFileB64: SafeUrl | any;
  highlightedContent: string = '';
  content:boolean = true;
 
  @ViewChild('pdfContainer') pdfContainer!: ElementRef;
  private pdfContentSubscription: Subscription | undefined;


  constructor(private pdfService:PdfserviceService) {
    
  }

  ngOnInit(): void {
    this.pdfContentSubscription = this.pdfService.pdfContent$.subscribe(
      (base64Src) => {
        // Update selectedFileB64 when new PDF content is available
        this.selectedFileB64 = base64Src;

        // Set flags or perform other actions if needed
        this.isFileImage = false;
        this.isFileDocument = true;
      }
    );
  }

  
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.pdfContentSubscription) {
      this.pdfContentSubscription.unsubscribe();
    }
  }

  generatePdf() {
    const contentElement = document.getElementById('pdfContent');

    if (contentElement) {
      // Get the text content without HTML tags
      const content = contentElement.innerText;

      // Call the PdfService method to generate and view the PDF
      this.pdfService.generateAndViewPdf(content);
    }
  
  }
  
  
//Choose File PDF VIEWER 
onFileSelected(event:any){
  this.selectedFile = event.target.files[0]??null;
  if(this.selectedFile){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload =(event)=>{
      let path = event.target == null ?'':event.target.result;
      this.selectedFilePath = path as string;
      this.selectedFileB64 = this.selectedFilePath.split(",")[1];
      console.log(this.selectedFileB64)
      if(this.selectedFilePath.includes("image")){
        this.isFileImage = true;
        this.isFileDocument = false;
      }else{
        this.isFileImage = false;
        this.isFileDocument = true;
      }
    }
  }
}

}
