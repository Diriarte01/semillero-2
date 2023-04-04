/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search'],
    function (serverWidget, search) {

        const handlers = {};

        const dataSbl = (sbl, customerId = null) => {
            const filters = [
                ["type", "anyof", "CustInvc"],
                "AND",
                ["mainline", "is", "T"],
                "AND",
                ["status", "anyof", "CustInvc:A"],
                "AND",
                ["amount", "greaterthanorequalto", "1000.00"],
                "AND",
                ["datecreated", "onorafter", "1/1/2024 12:00 am", "1/1/2022 12:00 am"]
            ];
            if(customerId){
                filters.push("AND",["name","anyof",customerId])
            }
            var invoiceSearchObj = search.create({
                type: "invoice",
                filters:filters,
                columns:
                    [
                        search.createColumn({ name: "entity", label: "Nombre" }),
                        search.createColumn({ name: "datecreated", label: "Fecha de creación" }),
                        search.createColumn({ name: "amount", label: "Importe" }),
                        search.createColumn({ name: "tranid", label: "Número de documento" })
                    ]
            });
        
            let count = 0;
            invoiceSearchObj.run().each(function (rs) {
                count = sbl.lineCount > 0 ? count : 0
                sbl.setSublistValue({
                    id: 'custpage_sbl_number_invoice',
                    line: count,
                    value: rs.getValue('tranid')
                })
                sbl.setSublistValue({
                    id: 'custpage_sbl_date_invoice',
                    line: count,
                    value: rs.getValue('datecreated')
                })
                sbl.setSublistValue({
                    id: 'custpage_sbl_amount_invoice',
                    line: count,
                    value: parseFloat(rs.getValue('amount'))
                })
                sbl.setSublistValue({
                    id: 'custpage_sbl_customer_invoice',
                    line: count,
                    value: rs.getText('entity')
                })
                count += 1
                return true;
            });


        }

        handlers.onRequest = (context) => {
            const response = context.response;
            const request = context.request;
            const params = request.parameters;
            const form = serverWidget.createForm({ title: 'Facturas de venta' })
            form.clientScriptModulePath = 'SuiteScripts/s4_cs_transaction.js';
            try {
                const fldFilter = form.addField({
                    id: 'custpage_s4_filters',
                    label: 'Cliente',
                    type: 'select',
                    source: '-2',
                })

                const sblTransactions = form.addSublist({
                    id: 'custpage_s4_filters',
                    label: 'Facturas de venta',
                    type: 'staticlist'
                })

                sblTransactions.addField({
                    id: 'custpage_sbl_number_invoice',
                    label: 'Numero - Factura',
                    type: 'text'
                })
                sblTransactions.addField({
                    id: 'custpage_sbl_date_invoice',
                    label: 'Fecha de Creación - Factura',
                    type: 'text'
                })
                sblTransactions.addField({
                    id: 'custpage_sbl_amount_invoice',
                    label: 'Importe - Factura',
                    type: 'currency'
                })
                sblTransactions.addField({
                    id: 'custpage_sbl_customer_invoice',
                    label: 'Nombre del cliente - Factura',
                    type: 'text'
                })
                if(params['custpage_s4_filters']){
                    log.debug('filters', params)
                    sblTransactions.defaultValue = params['custpage_s4_filters']
                    dataSbl(sblTransactions, params['custpage_s4_filters']);
                }else{
                    dataSbl(sblTransactions);
                }
            } catch (e) {
                form.title = 'Error en El GET'
                log.debug('Error', e)
            } finally {
                response.writePage(form)
            }
        }
        return handlers;
    }
);
