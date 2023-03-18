/*
Ejercicios de SuiteScript: ClientScript

1- Para la práctica presente se requiere implementar un Script de tipo Cliente Script en el formulario de Orden de Venta y el cual se debe seleccionar el entrypoints adecuado para hacer las siguientes ejecuciones:

Nota: Para esta actividad se requiere Crear un Cliente con anterioridad, este sera usado a lo largo de la actividad.

A) Cuando el Formulario inicie en modo creación se debe establecer por defecto el cliente creado con anterioridad.

B) Cuando se guarden los cambios del registro, se debe validar que el pedido contenga mínimo 3 línea de transacción, si no las contiene mostrar en pantalla con un mensaje nativo de NetSuite que diga "la transacción debe tener como minimo 3 Lineas para guardarse" y arrojar este mensaje cada vez que guarde hasta que cumpla la condición antes mencionada.

C) Al editar o introducir la cantidad de un artículo se debe garantizar que el número no pueda superar 5 unidades

D) cada vez que cambies o selecciones un artículo rellena el campo Descripción con el texto encontrado en la categoría de costo

E) Cada vez que se inicie una linea de articulo el número 2 debe estar por default en el campo Cantidad
*/

/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Walt Barros
 *@description Codigo prueba de ClientScript
 */
define(['N/search', 'N/ui/dialog'], function (search, dialog) {

    function pageInit(context) {
        const obj = context.currentRecord;

        if (context.mode === "create") {
            obj.setValue({
                fieldId: "entity",
                value: 1717
            });

        }

    }

    function fieldChanged(context) {
        const obj = context.currentRecord;
        const sublistId = context.sublistId;
        const fieldId = context.fieldId;
        if (sublistId == "item" && fieldId == "item") {
            const item = obj.getCurrentSublistValue({
                sublistId: "item",
                fieldId: "item",
            });
            const searchField = search.lookupFields({
                type: "inventoryitem",
                id: item,
                columns: "costcategory",
            })
            log.debut("searchField", searchField)
            obj.setCurrentSublistValue({
                sublistId: "item",
                fieldId: "description",
                value: searchField["costcategory"],
            })

        }
    }
        function saveRecord(context) {
            const obj = context.currentRecord;
            const linecount = obj.getLineCount({
                sublistId: "item"
            })
            if (linecount < 3) {
                dialog.alert('Error, la transacción debe tener como minimo 3 Lineas para guardarse')
                return false;
            }
            return true;
        } 
    
    

    function lineInit(context) {
        const obj = context.currentRecord;
        const sublistId = context.sublistId;
        if (sublistId == "item") {
            obj.setCurrentSublistValue({
                sublistId: "item",
                fieldId: "quantity",
                value: 2
            });
        }
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord,
        validateLine: validateLine,
        lineInit: lineInit,
        fieldChanged: fieldChanged,
    }
});

