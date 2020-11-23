import jsPDF from "jspdf";
import "jspdf-autotable";


const generatePDFSalesEmployee = items => {
  const doc = new jsPDF();

  const tableColumn = ["Empleado", "Fecha", "Articulo", "Cantidad", "Precio"];
  const tableRows = [];

  items.forEach(item => {
    item.details.forEach(detail => {

      const reportData = [
          item.employee_last_name + ", " + item.employee_name,
          item.date,
          detail.name,
          detail.quantity,
          detail.unit_price
      ];

    tableRows.push(reportData);

    });
  });


  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[2] + date[3];
  doc.text("Reporte de Ventas del mes por Empleado", 14, 15);
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFSalesEmployee;