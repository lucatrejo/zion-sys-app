import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "assets/img/logo_zion.jpeg";

const generatePDFReportSales = items => {
  const doc = new jsPDF();

  const tableColumn = ["Artículo", "Cantidad", "Precio de Venta", "Cliente", "Fecha"];
  const tableRows = [];

  items.forEach(item => {
    item.details.forEach(detail => {

      const reportData = [
          detail.name,
          detail.quantity + " u.",
          "$ " + detail.unit_price,
          item.customer,
          item.date
      ];

    tableRows.push(reportData);

    });
  });

  doc.addImage(logo, "JPEG", 5, 10, 50, 25);

  doc.autoTable(tableColumn, tableRows, { startY: 55 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Reporte de Ventas del mes", 50, 23);

    doc.setFontSize(10);
    doc.text("Av. Provincial de Vialidad 1320, Santiago del Estero", 18, 35);
    doc.text("Tel: 3856300234 - 3854601341", 18, 40);
    doc.text("Email: zion@gmail.com", 18, 45);

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFReportSales;