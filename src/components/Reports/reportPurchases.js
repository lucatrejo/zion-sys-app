import jsPDF from "jspdf";
import "jspdf-autotable";


const generatePDFPurchases = items => {
  const doc = new jsPDF();

  const tableColumn = ["Artículo", "Cantidad", "Precio de Compra", "Proveedor", "Fecha"];
  const tableRows = [];

  items.forEach(item => {
    item.details.forEach(detail => {

      const reportData = [
          detail.name,
          detail.quantity,
          detail.unit_price,
          item.provider,
          item.date
      ];

    tableRows.push(reportData);

    });
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Reporte de Compras del mes", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFPurchases;