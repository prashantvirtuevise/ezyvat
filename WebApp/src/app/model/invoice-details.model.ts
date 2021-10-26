export class Invoice {
    public InvoiceNumber: number;
    public Items: InvoiceItem[] = [];
  }
  
  export class InvoiceItem {
    public SerialNumber: string;
    public Description: string;
    public Price: number;
    public Quantity: number;
    public Total: number;
  }
  