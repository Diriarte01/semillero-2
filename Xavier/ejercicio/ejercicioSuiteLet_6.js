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
                id: 'cutpage_s4_invoices',
                label: 'LISTA INVOICES',
                type: serverWidget.SublistType.LIST
            })
            sublist.addField({
                id: 'internalid',
                label: 'Numero de Factura',
                type: serverWidget.SublistType.EDITOR
            })
            sublist.addField({
                id: 'dateCreate',
                label: 'Fecha de Creación',
                type: serverWidget.SublistType.EDITOR
            })
            sublist.addField({
                id: 'total',
                label: 'Total',
                type: serverWidget.SublistType.EDITOR
            })
            sublist.addField({
                id: 'entity',
                label: 'Cliente',
                type: serverWidget.SublistType.EDITOR
            })
            let invoiceSearchObj = search.create({
                type: "invoice",
                filters:
                    [
                        ["type", "anyof", "CustInvc"],
                        "AND",
                        ["approvalstatus", "anyof", "2"],
                        "AND",
                        ["estimatedtotal", "greaterthanorequalto", "1000.00"],
                        "AND",
                        ["datecreated", "after", "1/1/2023 11:59 pm"]
                    ],
                columns:
                    [
                        search.createColumn({ name: "entity", label: "Nombre" }),
                        search.createColumn({ name: "quantity", label: "Cantidad" }),
                        search.createColumn({ name: "datecreated", label: "Fecha de creación" }),
                        search.createColumn({ name: "internalid", label: "ID interno" })
                    ]
            });
            let searchResultCount = invoiceSearchObj.runPaged().count;
            log.debug("invoiceSearchObj result count", searchResultCount);
            invoiceSearchObj.run().each(function (result) {
                dataSearch.push({
                    internalId: result.id,
                    dateCreate: result.getValue('datecreated'),
                    quantity: result.getValue('quantity'),
                    entity: result.getValue('entity')

                });
                return true;
            });
            let i = 0;
            const pageSize = 10;
            const pageIndex = 0;
            let pageStar = pageIndex * pageSize;
            invoiceSearchObj.getRange({
                start: pageStar,
                end: pageStar + pageSize
            }).forEach(function(result){

                sublist.setSublistValue({
                    id: 'invoiceNumber',
                    line: i,
                    value: dataSearch[i].internalId
                });
                sublist.setSublistValue({
                    id: 'dateCreate',
                    line: i,
                    value: dataSearch[i].dateCreate
                });
                sublist.setSublistValue({
                    id: 'total',
                    line: i,
                    value: dataSearch[i].quantity
                });
                sublist.setSublistValue({
                    id: 'entity',
                    line: i,
                    value: dataSearch[i].entity
                });
                i++;
                response.writePage(form);
            })
        } catch (e) {
            log.audit('El error es el siguiente: ' + e.message)
        }


    }

    return {
        onRequest: onRequest
    }
});
