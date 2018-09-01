import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function exportPDF(elementId, fileName, dpi, pageSize) {
  var html = document.getElementById(elementId);

  console.log(html);
  
  var pdf = new jsPDF('p', 'mm', 'a4');
  const pixelHeight = Math.ceil(dpi * pageSize.height);
  const totalPages = Math.ceil(html.clientHeight / pixelHeight);

  for (var i = 0; i < totalPages; i++) {
    const pageCount = i;

    html2canvas(html, {
      logging: false,
      y: pageCount * pixelHeight,
      height: pixelHeight
    }).then((canvas) => {
      addPage(canvas, pdf, pageCount, totalPages);
      if (pageCount === totalPages - 1)
        pdf.save(fileName);
    });
  }
}

function addPage(canvas, pdf, pageCount, totalPages) {
  const image = canvas.toDataURL('image/jpeg', 1);
  pdf.addImage(image, 'JPEG', 0, 0);

  if (pageCount < totalPages - 1) {
    pdf.addPage();
  }
}

class PDFGenerator extends React.Component {
  render() {
    return (
      <div>
        <div 
          style={{
            width: '0px',
            height: '0px',
            overflow: 'hidden',
            position: 'fixed',
            top: '0px',
            left: '0px'
          }}>
          <div
            id="print-content"
            style={{
              width: 'fit-content',
              height: 'fit-content'
            }}>
            {this.props.children}
          </div>
        </div>
      </div >
    );
  };

  generatePDF() {
    exportPDF("print-content", "Report.pdf", this.props.dpi, this.props.pageSize);
  }
}

export default PDFGenerator;
