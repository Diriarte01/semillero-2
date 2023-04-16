/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(["./popUp.js","N/search","N/record"], function (popUp,search,record) {
  const handlers = {};

  handlers.pageInit = (context) => {};

   // creo una funcion para la busquedda y su retorno

   const searchD = () => {
    const response = [];
    const type = "invoice", filters = [], columns =[];
    filters.push(["type", "anyof", "CustInvc"]);
    filters.push("AND",["mainline", "is", "T"]);
    columns.push(search.createColumn({ name: "entity", label: "Nombre" }))
    const invoiceSearchObj = search.create({ type: type ,filters:filters, columns:columns });

    invoiceSearchObj.run().each(function (rs) {response.push(rs.getValue('entity'));
      return true;
    });

    return response
  }

  handlers.popUp = (id) => {

    // sustraemos los campos que necesitamos

      const obj = record.load({ type: 'customer', id: id })
      const name = obj.getValue('companyname');
      const email = obj.getValue('email');
      const phone = obj.getValue('phone');
      const balance = obj.getValue('balance');
      const creditLimit = obj.getValue('creditlimit');

      const data = searchD();
      const countinvoice = data.length;
      const countInvoiceCustomer = data.filter((rs)=> rs == id).length
    
    // generamos el pop up con la info

    popUp.fire({
      title: '<strong>Información del Cliente</strong>',
      icon: 'info',
      html:`
          <h1>Nombre: <strong>${name}</strong></h1>
          <h2>Corre Electronico: <strong>${email}</strong></h2>
          <h2>Phone: <strong>${phone}</strong></h2>
          <h2>Credito: <strong>${creditLimit}</strong></h2>
          <h2>Credito disponible: <strong>${balance}</strong></h2>
          <h2>Numero de Facturas: <strong>${countInvoiceCustomer}</strong></h2>
          <h2>% de facturas: <strong>${(countInvoiceCustomer/countinvoice)*100}%</strong></h2>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
    
  }

  return handlers;
}
);