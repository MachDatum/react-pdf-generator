import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

let dpi = 72;
let a4 = {
  width: 8.2677,
  height: 11.6929
}

function exportPDF(elementId, fileName, dpi) {
  var html = document.getElementById(elementId);
  var pdf = new jsPDF('p', 'mm', 'a4');
  const pixelHeight = Math.ceil(dpi * a4.height);
  const totalPages = Math.ceil(html.clientHeight / pixelHeight);

  for (var i = 0; i < totalPages; i++) {
    const pageCount = i;

    html2canvas(html, {
      logging: false,
      y: pageCount * pixelHeight,
      height: pixelHeight
    }).then((canvas) => {
      addPage(canvas, pdf, pageCount, totalPages);
      if (pageCount == totalPages - 1)
        pdf.save(fileName);
    });
  }
}

function addPage(canvas, pdf, pageCount, totalPages) {
  const image = canvas.toDataURL('image/jpeg', 1);
  pdf.addImage(image, 'JPEG', 0, 0, 210, 297);

  if (pageCount < totalPages - 1) {
    pdf.addPage();
  }
}

class PDFGenerator extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.generatePDF}>Print</button>
        <div
          id="print-content"
          style={{
            width: 'fit-content',
            height: 'fit-content'
          }}>
          {this.props.children}
        </div>
      </div>
    );
  };

  generatePDF() {
    exportPDF("print-content", "Report.pdf", dpi);
  }
}

export default PDFGenerator;
