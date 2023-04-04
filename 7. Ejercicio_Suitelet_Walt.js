/*
Ejercicio Suitelet

Crea un Suitelet que muestre una lista de ventas (invoices) de NetSuite que cumplan con las siguientes condiciones:

Están en estado "Aprobado".
Tienen una fecha de creación posterior al 1 de enero del año actual.
Su total de ventas es mayor o igual a $1000 USD.
La lista debe incluir la siguiente información para cada venta:

Número de la factura (invoice number).
Fecha de creación.
Total de ventas.
Cliente relacionado (customer).
Asegúrate de que la lista sea paginada, es decir, que se muestren solo un número limitado de ventas por página y se permita al usuario 
navegar a través de las páginas de resultados. También asegúrate de que la lista sea ordenable por fecha de creación y por total de ventas.

Bonus: 

- Genera un filtro dinamico que modifique los resultados de la venta, el filtro debe ser multi-selección para proveedores. Este filtro debe 
ser opcional(Si no  tiene nada lleno los resultados de venta deben traer todos los resultados)

Entrega: 03 / 04 / 2023 7 PM

¡Buena suerte! Este ejercicio te ayudará a practicar la creación de un Suitelet más avanzado que utilice la API de búsqueda de NetSuite.
*/
/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Walt Barros
 *@description código Suitelet
 */
define(['N/ui/serverWidget', 'N/search'], function (serverWidget, search) {

    const handlers = {};

    handlers.onRequest = (context) => {
        const response = context.response;
        const request = context.request;
        const params = request.parameters;
        const form = serverWidget.createForm({ title: 'Lista de ventas', })

        const field = {
            company: 'custpage_s4_company',
        }

        const sublistData = {
            id: 'custpage_s4_sbl_inf',
            fields: {
                internalId: 'custpage_s4_sbl_internal_id',
                invoices: 'custpage_s4_sbl_invoices',
                creationdate: 'custpage_s4_sbl_creationdate',
                totalsales: 'custpage_s4_sbl_totalsales',
                customer: 'custpage_s4_sbl_customer',
            }
        }

        try {
            const fieldGroup = form.addFieldGroup({
                id: 'custpage_s4_field_group',
                label: 'informacion de ventas',
            })

            const sublist = form.addSublist({
                id: sublistData.id,
                label: 'Transacciones de ventas',
                type: serverWidget.SublistType.LIST
            })
            sublist.addField({
                id: sublistData.fields.internalId,
                label: 'internal ID',
                type: serverWidget.SublistType.INTEGER,
            })
            sublist.addField({
                id: sublistData.fields.invoices,
                label: 'Numero de Factura',
                type: serverWidget.SublistType.TEXT,
            })

            sublist.addField({
                id: sublistData.fields.creationdate,
                label: 'Fecha de Creación',
                type: serverWidget.SublistType.DATE,
            })
            sublist.addField({
                id: sublistData.fields.totalsales,
                label: 'Total',
                type: serverWidget.SublistType.TEXT,
            })
            sublist.addField({
                id: sublistData.fields.customer,
                label: 'Cliente',
                type: serverWidget.SublistType.TEXT,
            })

            let invoiceSearchObj = search.create({
                type: "invoice",
                filters:
                    [
                        ["type", "anyof", "CustInvc"],
                        "AND",
                        ["datecreated", "after", "1/1/2023 12:00 am", "1/1/2023 11:59 pm"],
                        "AND",
                        ["estimatedtotal", "greaterthanorequalto", "1000.00"],
                        "AND",
                        ["approvalstatus", "anyof", "2"]
                    ],
                columns:
                    [
                        search.createColumn({ name: "entity", label: "Nombre" }),
                        search.createColumn({ name: "datecreated", label: "Fecha de creación" }),
                        search.createColumn({ name: "quantity", label: "Cantidad" }),
                        search.createColumn({ name: "invoicenum", label: "Número de factura de venta" }),
                        search.createColumn({ name: "internalid", label: "ID interno" })
                    ]
            });
            let searchResultCount = invoiceSearchObj.runPaged().count;
            log.debug("invoiceSearchObj result count", searchResultCount);
            invoiceSearchObj.run().each(function (result) {
                // .run().each has a limit of 4,000 results
                return true;
            });

            /*
            invoiceSearchObj.id="customsearch1680566695610";
            invoiceSearchObj.title="Ejercicio Suitelet Walt (copy)";
            var newSearchId = invoiceSearchObj.save();
            */


        } catch (error) {
            log.error('Hubo un error en la ejecución', e.message)
        } finally {
            response.writePage(form)
        }
        return handlers;
    }
});
