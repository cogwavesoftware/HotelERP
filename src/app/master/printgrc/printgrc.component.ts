import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
    

@Component({
  selector: 'app-printgrc',
  templateUrl: './printgrc.component.html',
  styleUrls: ['./printgrc.component.scss']
})
export class PrintgrcComponent implements OnInit {
     jsPDF;
  public IsShowloader:boolean =false;
  constructor() { 
  
  }

  ngOnInit() {
  }
 
 
  
  public convetToPDF()
{
  setTimeout(() => {   
    this.IsShowloader = true;
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;      
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('grc1.pdf'); // Generated PDF
      this.IsShowloader = false;
      });
  }, 1000);

  
}

 
   
     
  

}


// Please install below dependies
// npm install jspdf --save
// npm install @types/jspdf --save
// npm install html2canvas --save
// npm install @types/html2canvas --save