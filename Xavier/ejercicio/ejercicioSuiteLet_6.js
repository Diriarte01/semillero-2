/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author   Xavier Gonzalez 
 */
define(['N/ui/serverWidget', 'N/search'], function (serverWidget, search) {

    function onRequest(context) {
        const response = context.response;
        const request = context.request;
        const params = request.parameters;
        const form = serverWidget.createForm({ title: 'Lista de Venta XG' })
        try {
            let dataSearch = [];
            const sublist = form.addSublist({
                id: 'custpage_s4_sublist',
                type: serverWidget.SublistType.STATICLIST,
                label: 'LIST_INVOICES'
            });
            sublist.addField({
                id: 'custpage_s4_internalid',
                label: 'Numero de Factura',
                type: serverWidget.FieldType.TEXT
            })
            sublist.addField({
                id: 'custpage_s4_datacreate',
                label: 'Fecha de Creación',
                type: serverWidget.FieldType.TEXT
            })
            sublist.addField({
                id: 'custpage_s4_total',
                label: 'Total',
                type: serverWidget.FieldType.TEXT
            })
            sublist.addField({
                id: 'custpage_s4_entity',
                label: 'Cliente',
                type: serverWidget.FieldType.TEXT
            })
            let invoiceSearchObj = search.create({
                type: "invoice",
                filters:
                [
                   ["type","anyof","CustInvc"], 
                   "AND", 
                   ["status","anyof","CustInvc:A"], 
                   "AND", 
                   ["amount","greaterthanorequalto","1000.00"], 
                   "AND", 
                   ["mainline","is","T"]
                ],
                columns:
                [
                   search.createColumn({name: "entity", label: "Nombre"}),
                   search.createColumn({name: "datecreated", label: "Fecha de creación"}),
                   search.createColumn({name: "internalid", label: "ID interno"}),
                   search.createColumn({name: "amount", label: "Importe"})
                ]
             });
            let searchResultCount = invoiceSearchObj.runPaged().count;
            log.debug("invoiceSearchObj result count", searchResultCount);
            invoiceSearchObj.run().each(function (result) {
                dataSearch.push({
                    internalId: result.id,
                    dateCreate: result.getValue('datecreated'),
                    amount: result.getValue('amount'),
                    entity: result.getText('entity')

                });
                return true;
            });
            for (let i = 0; i < dataSearch.length; i++) {

                sublist.setSublistValue({
                    id: 'custpage_s4_internalid',
                    line: i,
                    value: dataSearch[i].internalId
                });
                sublist.setSublistValue({
                    id: 'custpage_s4_datacreate',
                    line: i,
                    value: dataSearch[i].dateCreate
                });
                sublist.setSublistValue({
                    id: 'custpage_s4_total',
                    line: i,
                    value: dataSearch[i].amount
                });
                sublist.setSublistValue({
                    id: 'custpage_s4_entity',
                    line: i,
                    value: dataSearch[i].entity
                });

            }
        } catch (e) {
            log.audit('El error es el siguiente: ' + e.message)
        } finally {
            response.writePage(form);
        }


    }

    return {
        onRequest: onRequest
    }
});
