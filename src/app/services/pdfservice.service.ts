import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PdfserviceService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Example API URL

  constructor(private http: HttpClient) {}

  private pdfContentSubject = new Subject<string>();

  pdfContent$ = this.pdfContentSubject.asObservable();
  // generateAndViewPdf(content:any) {
  //   const pdf = new jsPDF();
    
  //   // Create a temporary div to work with HTML content
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = content.innerHTML;
  
  //   // Select paragraphs with the class name 'sri'
  //   const paragraphs = tempDiv.querySelectorAll('.sri');
  
  //   let yPosition = 10;
  
  //   paragraphs.forEach((paragraph) => {
  //     const text = paragraph.textContent || paragraph.innerHTML;
  
  //     const lines = pdf.splitTextToSize(text, pdf.internal.pageSize.width - 20);
  
  //     lines.forEach((line:any) => {
  //       if (yPosition > pdf.internal.pageSize.height - 20) {
  //         pdf.addPage();
  //         yPosition = 10;
  //       }
  
  //       pdf.setTextColor(0, 0, 0); // Set default text color
        
  //       if (paragraph.classList.contains('sri')) {
  //         pdf.setTextColor('red'); // Set text color to red for paragraphs with class 'sri'
  //         pdf.setFillColor(0, 0, 255); // Set background color to blue
  //         pdf.rect(10, yPosition - 8, pdf.internal.pageSize.width - 20, 12, 'F'); // Draw rectangle as background
          
  //       }
  //       if(paragraph.classList.contains('latha')){
  //         pdf.setTextColor('blue'); // Set text color to red for paragraphs with class 'sri'

  //       }
  //      console.log("Hello",pdf)
  //       pdf.text(line, 10, yPosition);
  //       yPosition += 10;
  //     });
  //   });
  
  //   console.log(pdf.output('dataurlstring'));
  
  //   const pdfDataUrl = pdf.output('dataurlstring');
  //   const base64Src = pdfDataUrl.split(',')[1];
  
  //   this.pdfContentSubject.next(base64Src);
  // }
  generateAndViewPdf(content: string): void {
    const pdf = new jsPDF();
    const textLines = pdf.splitTextToSize(content, pdf.internal.pageSize.width - 20); // Split text into lines
  
    let yPosition = 10; 
    textLines.forEach((line:any) => {
      if (yPosition > pdf.internal.pageSize.height - 20) { // Check if reaching end of page
        pdf.addPage(); // Add a new page if content exceeds the current page
        yPosition = 10; // Reset Y position for the new page
      }
      pdf.text(line, 10, yPosition); // Add text line by line
      yPosition += 10; // Increment Y position for the next line
    });
  
    // Log or use the PDF output as needed
    console.log(pdf.output('dataurlstring'));
  
    // You can return the PDF data or handle it as needed
    const pdfDataUrl = pdf.output('dataurlstring');
    const base64Src = pdfDataUrl.split(',')[1];
  
    // Notify subscribers (components) about the generated PDF content
    this.pdfContentSubject.next(base64Src);
  }
  // generateAndViewPdf(content: any): void {
  //   const pdf = new jsPDF();
  //   console.log(content,"content!")
  //   const textLines = pdf.splitTextToSize(content, pdf.internal.pageSize.width - 20); // Split text into lines
  
  //   let yPosition = 10; 
  //   textLines.forEach((line:any) => {
  //     if (yPosition > pdf.internal.pageSize.height - 20) { // Check if reaching end of page
  //       pdf.addPage(); // Add a new page if content exceeds the current page
  //       yPosition = 10; // Reset Y position for the new page
  //     }
  //     pdf.text(line, 10, yPosition); // Add text line by line
  //     yPosition += 10; // Increment Y position for the next line
  //   });
  
  //   // Log or use the PDF output as needed
  //   console.log(pdf.output('dataurlstring'));
  
  //   // You can return the PDF data or handle it as needed
  //   const pdfDataUrl = pdf.output('dataurlstring');
  //   const base64Src = pdfDataUrl.split(',')[1];
  
  //   // Notify subscribers (components) about the generated PDF content
  //   this.pdfContentSubject.next(base64Src);
  // }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching data:', error);
          throw error; // Rethrow the error for further handling
        })
      );
  }
}
