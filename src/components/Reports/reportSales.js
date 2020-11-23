import jsPDF from "jspdf";
import "jspdf-autotable";


const generatePDFReportSales = items => {
  const doc = new jsPDF();

  const tableColumn = ["Artículo", "Cantidad", "Precio de Venta", "Cliente", "Fecha"];
  const tableRows = [];

  items.forEach(item => {
    item.details.forEach(detail => {

      const reportData = [
          detail.name,
          detail.quantity,
          detail.unit_price,
          item.customer,
          item.date
      ];

    tableRows.push(reportData);

    });
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Reporte de Ventas del mes", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFReportSales;