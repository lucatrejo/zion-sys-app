import jsPDF from "jspdf";
import "jspdf-autotable";


const generatePDFCustomers = items => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Nombre", "Apellido", "Dni", "Dirección"];
  const tableRows = [];

  items.forEach(item => {
    const reportData = [
      item.id,
      item.name,
      item.last_name,
      item.identification,
      item.address
    ];
    tableRows.push(reportData);
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Listado de Clientes", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFCustomers;