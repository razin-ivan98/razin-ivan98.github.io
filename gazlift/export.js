function exportXLXS() {
    var elt = document.getElementById('data-table');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
    return XLSX.writeFile(wb, 'variants.xlsx');
}