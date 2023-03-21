/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Jesús Sillé  
 *@description Ejercicio2 de ClientScript
 */
 define(['N/ui/dialog', 'N/search'], function (dialog,search) {

    function pageInit(context) {

    }
    let searchtransaction = search.transaction({

    })

    function saveRecord(context) {
        const obj = context.currentRecord;
        const linecount = obj.getLineCount({
            sublistId: "item",

        });
        obj.setValue({
            fieldId: "custbody_s4_quantity_transactions_csw1",
            value: linecount,
        })
        let totalquantity = 0;
        for (let i = 0; i < linecount; i++) {
            const quantity = obj.getSublistValue({
                sublistId: "item",
                fieldId: "quantity",
                line: i
            });

            totalquantity += quantity;
        }
        log.audit('Cantidad', totalquantity)
        if (totalquantity > 25) {
            dialog.alert({
                title: "Error",
                message: "La suma de las lineas de transaccion no puede ser mayor a 25",
                okButtonText: "OK"
            });
            return false;
        }
        return true;
    }

    function validateDelete(context) {
        const obj = context.currentRecord;
        if (confirm('¿Estás seguro que quieres eliminar esto de la base de datos?')) {
            
        }else{
            return false;
        }
        return true;
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord,
        validateDelete: validateDelete,
    }
});