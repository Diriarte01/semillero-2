/*
Ejercicios de SuiteScript: ClientScript

1- Para la práctica presente se requiere implementar un Script de tipo Cliente Script en el formulario de Orden de Venta y 
    el cual se debe seleccionar el entrypoints adecuado para hacer las siguientes ejecuciones:

A) Sumar todo las lineas de Transaccion y validar que la suma no sea superior a 25

B) Al eliminar la Linea se debe generar una aviso pidiendo confirmación para proceder con la eliminación de la  linea

C) Crear un campo llamado cantidad de transacciones del Cliente y ponerlo en el grupo de campos llamado Informacion de venta, 
    este campo debe ser llenado al guardar con la cantidad de transacciones del Cliente

Bonus Trasck:

- Crear los siguientes campos:
    - % de transacciones del total
    - Promedio de transaciones al mes
    - Importe promedio de transacciones realizadas
Estos campos deben ser llenados con la informacion de transaccional historica del cliente, al guardar;
*/

/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Walt Barros   
 *@description Codigo prueba2 de ClientScript
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
