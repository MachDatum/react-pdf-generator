declare module 'react-pdf-generator' {
    export class PDFGenerator extends React.Component {

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