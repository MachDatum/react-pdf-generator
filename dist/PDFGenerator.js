var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function exportPDF(elementId, fileName, dpi, pageSize) {
  var html = document.getElementById(elementId);

  console.log(html);

  var pdf = new jsPDF('p', 'mm', 'a4');
  var pixelHeight = Math.ceil(dpi * pageSize.height);
  var totalPages = Math.ceil(html.clientHeight / pixelHeight);

  var _loop = function _loop() {
    var pageCount = i;

    html2canvas(html, {
      logging: false,
      y: pageCount * pixelHeight,
      height: pixelHeight
    }).then(function (canvas) {
      addPage(canvas, pdf, pageCount, totalPages);
      if (pageCount === totalPages - 1) pdf.save(fileName);
    });
  };

  for (var i = 0; i < totalPages; i++) {
    _loop();
  }
}

function addPage(canvas, pdf, pageCount, totalPages) {
  var image = canvas.toDataURL('image/jpeg', 1);
  pdf.addImage(image, 'JPEG', 0, 0);

  if (pageCount < totalPages - 1) {
    pdf.addPage();
  }
}

var PDFGenerator = function (_React$Component) {
  _inherits(PDFGenerator, _React$Component);

  function PDFGenerator() {
    _classCallCheck(this, PDFGenerator);

    return _possibleConstructorReturn(this, (PDFGenerator.__proto__ || Object.getPrototypeOf(PDFGenerator)).apply(this, arguments));
  }

  _createClass(PDFGenerator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.generatePDF();
            } },
          'Print'
        ),
        React.createElement(
          'div',
          {
            style: {
              width: '0px',
              height: '0px',
              overflow: 'hidden',
              position: 'fixed',
              top: '0px',
              left: '0px'
            } },
          React.createElement(
            'div',
            {
              id: 'print-content',
              style: {
                width: 'fit-content',
                height: 'fit-content'
              } },
            this.props.children
          )
        )
      );
    }
  }, {
    key: 'generatePDF',
    value: function generatePDF() {
      exportPDF("print-content", "Report.pdf", this.props.dpi, this.props.pageSize);
    }
  }]);

  return PDFGenerator;
}(React.Component);

export default PDFGenerator;