import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "assets/img/logo_zion.jpeg";

const generatePDFPurchases = items => {
  const doc = new jsPDF();

  const tableColumn = ["Artículo", "Cantidad", "Precio de Compra", "Proveedor", "Fecha"];
  const tableRows = [];

  items.forEach(item => {
      const reportData = [
          item.name,
          item.quantity + " u.",
          "$ " + item.unit_price,
          item.provider,
          item.date
      ];

    tableRows.push(reportData);
  });

  doc.addImage(logo, "JPEG", 5, 10, 50, 25);

  doc.autoTable(tableColumn, tableRows, { startY: 55 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Reporte de Compras del mes", 50, 23);

    doc.setFontSize(10);
    doc.text("Av. Provincial de Vialidad 1320, Santiago del Estero", 18, 35);
    doc.text("Tel: 3856300234 - 3854601341", 18, 40);
    doc.text("Email: zion@gmail.com", 18, 45);

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFPurchases;