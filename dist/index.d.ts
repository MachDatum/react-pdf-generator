declare module 'react-pdf-generator' {
    export class PDFGenerator extends React.Component<PDFGeneratorProps> {
        generatePDF():void;
    }

    interface PDFGeneratorProps {
        dpi: number;
        pageSize: PageSize;
        children: React.ReactNode;
    }

    export type PageSize = {
        height: number;
        width: number;
    }
}