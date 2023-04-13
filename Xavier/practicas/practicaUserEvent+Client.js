/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Xavier Gonzalez
 */
define(['./pop_up.js','N/search', 'N/record','N/file'], function (popUp, search, record,file) {
    const handlers = {};
    handlers.pageInit = (context) => { }

    handlers.popup = (id) => {

        const obj = record.load({
            type: 'customer',
            id: id})
        const id = obj.id;
        const name = obj.getValue('companyname')
        const email = obj.getValue('email')
        const phone = obj.getValue('phone')
        const limitCredit = obj.getValue('creditlimit');
        const credit1 = obj.getValue('balance');
        
      
        
        let text = name+'\n'+email+'\n'+phone+'\n'+limitCredit+'\n'+creditDisp+'\n'+searchResultCount
        

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
            <h2>% de facturas: <strong>${(countInvoiceCustomer/countInvoice)*100}%</strong></h2>
        `,

            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Cancel!',
            cancelButtonAriaLabel: 'Thumbs down'
        }).then((result) => {
            if (result.isConfirmed) {

                pop_up_Walt.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          });

    }
    return handlers;

});
