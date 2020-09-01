import jsPDF from "jspdf";
import "jspdf-autotable";


const generatePDFProviders = items => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Nombre", "Razón Social", "Descripción", "Dirección"];
  const tableRows = [];

  items.forEach(item => {
    const reportData = [
      item.id,
      item.name,
      item.business_name,
      item.description,
      item.address
    ];
    tableRows.push(reportData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Listado de Proveedores", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFProviders;