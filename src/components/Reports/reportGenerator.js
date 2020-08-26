import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = topItems => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Codigo", "Nombre", "Cantidad"];
  const tableRows = [];

  topItems.forEach(item => {
    const reportData = [
      item.item_id,
      item.code,
      item.name,
      item.count,
    ];
    tableRows.push(reportData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Top de Artículos comprados", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;