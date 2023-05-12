/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Walt Barros
 */
define(['./pop_up_inf.js', 'N/search', 'N/record'], function (pop_up_inf, search, record) {

    function pageInit(context) {

    }

    const searchData = () => {
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

        //Cuando se rompe el código porque tiene mas de 4000 datos se utiliza lo siguiente
        let inicio = 0;     //determinar el rango de resultados de la búsqueda. 
        let fin = 1000;
        let resultTotal = 0;    //se utilizará para verificar si aún quedan más resultados por buscar.
        do {    //se utiliza para realizar la búsqueda en el objeto invoiceSearchObj y obtener los valores de las entidades asociadas a las facturas encontradas.
            const resultSearch = invoiceSearchObj.run().getRange({ //Almacena los resultados de la búsqueda de facturas en un rango determinado con getRange
                start: inicio,
                end: fin,
            })
            resultTotal = resultSearch.length; //La longitud de "resultSearch" se almacena aquí
            for (let i in resultSearch) { // itera sobre cada uno de los resultados encontrados y utiliza el método "getValue" para obtener el nombre de la entidad 
                //asociada a cada factura. Estos nombres se agregan a un array "response".
                response.push(resultSearch[i].getValue('entity'));
            }

            inicio = inicio + 1000; //se actualizan para que la próxima búsqueda se realice en el siguiente rango de resultados, y se muestra en la consola la longitud
            //actual de "response".
            fin = fin + 1000;
            console.log(response.length);
        } while (resultTotal > 0);            //Hasta aquí

        /*  invoiceSearchObj.run().each(function (rs) {
              response.push(rs.getValue('entity'));       //Va a meter el id interno en cada posicion, de cada transacción el id interno del cliente
              return true;
          });*/

        return response;

    };
    function popUp(id) {

        const obj = record.load({ type: 'customer', id: id })
        const name = obj.getValue('companyname');
        const email = obj.getValue('email');
        const phone = obj.getValue('phone');
        const balance = obj.getValue('balance');
        const creditLimit = obj.getValue('creditlimit');

        const data = searchData();
        const countInvoice = data.length;
        const countInvoiceCustomer = data.filter((rs) => rs == id).length

        console.log(countInvoice);
        console.log(countInvoiceCustomer);
        pop_up_inf.fire({
            title: '<strong>Información del Cliente</strong>',
            icon: 'info',
            html: `
            <h1>Nombre: <strong>${name}</strong></h1>
            <h2>Corre Electronico: <strong>${email}</strong></h2>
            <h2>Phone: <strong>${phone}</strong></h2>
            <h2>Credito: <strong>${creditLimit}</strong></h2>
            <h2>Credito disponible: <strong>${balance}</strong></h2>
            <h2>Numero de Facturas: <strong>${countInvoiceCustomer}</strong></h2>
            <h2>% de facturas: <strong>${(countInvoiceCustomer / countInvoice) * 100}%</strong></h2>
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
                pop_up_inf.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        });

        /*      pop_up_Walt.fire({
                   title: 'Información del cliente',
                   text: 'Hola Walt, Nombre, Correo electrónico, Teléfono, Total crédito, Crédito disponible, Número de facturas',
                   type: 'warning',
                   showCancelButton: true,
                   confirmButtonColor: '#09F265 ',
                   cancelButtonColor: '#ED5E07',
                   confirmButtontext: 'Confirma',
               }).then(() => {
       
               });*/

    }

    return {
        pageInit: pageInit,
        popUp: popUp,
    }
});