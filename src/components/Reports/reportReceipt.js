import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "assets/img/logo_zion.jpeg";


const generateReceipt = (items, id, employee, client, dateSale) => {
  const doc = new jsPDF();

  const tableColumn = ["Artículo", "Precio Unitario", "Cantidad", "Monto Parcial"];
  const tableRows = [];

  console.log(items);
  var total = 0;

  items.forEach(item => {
      total = total + (Math.round(item.unit_price * item.quantity * 100) / 100);
    const reportData = [
      item.name,
      "$ " + item.unit_price,
      item.quantity + " u",
      Math.round(item.unit_price * item.quantity * 100) / 100,
    ];
    tableRows.push(reportData);
  });

  tableRows.push(["Monto Total", "", "", total]);

  doc.autoTable(tableColumn, tableRows, { startY: 60 });

  const date = Date().split(" ");
  const dateStr = date[2] + date[3];

  doc.addImage(logo, "JPEG", 5, 10, 50, 25);

        doc.setFontSize(12);
  doc.text("Empleado: " + employee, 14, 55);
  doc.text("Cliente: " + client, 195, 55, null, null, "right");

    doc.text("Nro: " + id, 195, 25, null, null, "right");
    doc.text("Fecha: " + dateSale, 195, 20, null, null, "right");

    doc.setFontSize(10);
    doc.text("Av. Provincial de Vialidad 1320, Santiago del Estero", 18, 35);
    doc.text("Tel: 3856300234 - 3854601341", 18, 40);
    doc.text("Email: zion@gmail.com", 18, 45);

  doc.save(`report_${dateStr}.pdf`);
};

export default generateReceipt;