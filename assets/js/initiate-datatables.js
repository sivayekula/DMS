// Initiate datatables in roles, tables, users page
$(document).ready(function() {
    'use strict';
    
    $('#dataTables-example').DataTable({
        responsive: true,
        pageLength: 10,
        paging: true,
        destroy: true,
        searching: true
    });
});