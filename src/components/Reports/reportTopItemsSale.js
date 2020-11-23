import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDFTopItemsSale = topItems => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Nombre", "Cantidad", "Stock"];
  const tableRows = [];

  topItems.forEach(item => {
    const reportData = [
      item.item_id,
      item.name,
      item.count,
      item.stock
    ];
    tableRows.push(reportData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Top de Artículos Vendidos", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFTopItemsSale;