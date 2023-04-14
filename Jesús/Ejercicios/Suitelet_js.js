/**
 * Crea un Suitelet que muestre una lista de ventas (invoices) de NetSuite que cumplan con las siguientes condiciones:

Están en estado "Aprobado".
Tienen una fecha de creación posterior al 1 de enero del año actual.
Su total de ventas es mayor o igual a $1000 USD.
La lista debe incluir la siguiente información para cada venta:

Número de la factura (invoice number).
Fecha de creación.
Total de ventas.
Cliente relacionado (customer).
Asegúrate de que la lista sea paginada, es decir, que se muestren solo un número limitado de ventas por página y 
se permita al usuario navegar a través de las páginas de resultados. 
También asegúrate de que la lista sea ordenable por fecha de creación y por total de ventas.
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Jesús Sillé
 */
define(['N/ui/serverWidget', 'N/search'],
    function (serverWidget, search) {

        function onRequest(context) {
            const response = context.response;
            const request = context.request;
            const params = request.parameters;
            const form = serverWidget.createForm({ title: 'Suilet Exercise' })
            try {

                var invoiceSearchObj = search.create({
                    type: "invoice",
                    filters:
                    [
                       ["type","anyof","CustInvc"], 
                       "AND", 
                       ["trandate","after","01.01.2023"], 
                       "AND", 
                       ["approvalstatus","anyof","2"], 
                       "AND", 
                       ["estimatedtotal","greaterthanorequalto","1000.00"]
                    ],
                    columns:
                    [
                       search.createColumn({name: "datecreated", label: "Fecha de creación"}),
                       search.createColumn({name: "quantity", label: "Cantidad"}),
                       search.createColumn({name: "entity", label: "Nombre"}),
                       search.createColumn({name: "internalid", label: "ID interno"})
                    ]
                 });
                 var searchResultCount = invoiceSearchObj.runPaged().count;
                 log.debug("invoiceSearchObj result count",searchResultCount);
                 invoiceSearchObj.run().each(function(result){
                    // .run().each has a limit of 4,000 results
                    return true;
                 });

                 
                 /*
                 invoiceSearchObj.id="customsearch1680623889090";
                 invoiceSearchObj.title="Transacciones_js_suitelet (copy)";
                 var newSearchId = invoiceSearchObj.save();
                 */
                

                /* Creación de sublistas*/

                const fielGroup = form.addFieldGroup({
                    id: 'custpage_s4_company',
                    label: 'informacion de la empresa',

                })
                const company = form.addField({
                    id: 'custpage_s4_company',
                    label: 'compañia',
                    type: 'select',
                    source: '-2',
                    container: 'custpage_s4_fiel_group',
                })
                company.isMandatory = true;

                sblTransactions.addField({
                    id: 'custpage_s4_date',
                    label: 'Fecha de creación',
                    type: 'text'
                })
                sblTransactions.addField({
                    id: 'custpage_s4_invoiceNumber',
                    label: 'Numero de factura',
                    type: 'text'
                })
                sblTransactions.addField({
                    id: 'custpage_s4_totalSales',
                    label: 'Ventas Totales',
                    type: 'text'
                })
                sblTransactions.addField({
                    id: 'custpage_s4_customer',
                    label: 'Cliente Relacionado',
                    type: 'text'
                })
                date.defaultValue = new Date();
                



            } catch (e) {
                log.error('Hubo un error en la ejecución', e.message);
            } finally {
                response.writePage(form)
            }

        }




        return {
            onRequest: onRequest
        }
    });
