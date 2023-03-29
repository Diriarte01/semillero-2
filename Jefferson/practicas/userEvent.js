/**
 *@NApiVersion 2.1
 *@Name Class UserEvent
 *@NScriptType UserEventScript
 */
define(['N/log', 'N/search'],
    function (log, search) {
        const handlers = {};

        const balance = (internalId, amount) => {
            const type = 'customer', columns = [], filters = [];
            filters.push(["formulanumeric: {creditlimit} - {balance}", "greaterthanorequalto", amount]);
            filters.push("AND", ["internalid", "anyof", internalId])
            columns.push(
                search.createColumn({
                    name: "entityid",
                    sort: search.Sort.ASC,
                    label: "Nombre"
                }),
                search.createColumn({
                    name: "formulanumeric",
                    formula: "{creditlimit} - {balance}",
                    label: "Fórmula (numérica)"
                })
            )
            const searchBalance = search.create({ type: type, filters: filters, columns: columns })
            let response = searchBalance.runPaged().count > 0 ? true : false;
            return response
        }

        // antes de la carga 
        handlers.beforeLoad = (context) => {
            const record = context.newRecord;
            const Form = context.form;

            Form.clientScriptModulePath = './ss_cl.js';

            const example = Form.addButton({
                id: 'custpage_bottom',
                label: 'Boton Eejemplo',
                functionName: 'saludar()'
            })
        }

        handlers.beforeSubmit = (context) => {
            const record = context.newRecord;
            const customerId = record.getValue('entity');
            const amount = record.getValue('amountpaid');
            const balanceCustomer = balance(customerId,amount)
            if(!balanceCustomer){
                return false
            }
        }

        handlers.afterSubmit = (context) => {
            const record = context.newRecord;
        }


        return handlers;
    }
);
