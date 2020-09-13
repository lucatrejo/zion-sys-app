import jsPDF from "jspdf";
import "jspdf-autotable";


const generatePDFCriticalStock = items => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Nombre", "Stock", "Stock Crítico"];
  const tableRows = [];

  items.forEach(item => {
    const reportData = [
      item.id,
      item.name,
      item.stock,
      item.critical_stock
    ];
    tableRows.push(reportData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Artículos con stock por debajo del punto crítico", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFCriticalStock;