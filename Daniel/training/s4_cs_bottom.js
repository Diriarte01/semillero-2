/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['./pop_up.js','N/search','N/record'],
  function (pop_up, search, record) {
    const handlers = {};

    handlers.pageInit = (context) => { }
    const searchD = () => {
      const response = [];
      const invoiceSearchObj = search.create({
        type: "invoice",
        filters:
          [
            ["type", "anyof", "CustInvc"],
            "AND",
            ["mainline", "is", "T"]
          ],
        columns:
          [
            search.createColumn({ name: "entity", label: "Nombre" })
          ]
      });

      invoiceSearchObj.run().each(function (rs) {
        response.push(rs.getValue('entity'));
        return true;
      });

      return response
    }
    handlers.popUp = (id) => {
      const obj = record.load({ type: 'customer', id: id })
      const name = obj.getValue('companyname');
      const email = obj.getValue('email');
      const phone = obj.getValue('phone');
      const balance = obj.getValue('balance');
      const creditLimit = obj.getValue('creditlimit');

      const data = searchD();
      const countinvoice = data.length;
      const countInvoiceCustomer = data.filter((rs)=> rs == id).length
      
      pop_up.fire({
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
