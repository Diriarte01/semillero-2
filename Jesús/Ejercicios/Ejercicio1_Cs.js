/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Jesús Sillé
 *@module Public
 *@Empresa Grupo SOl4it
 *@Description Codigo de clase ClientScript
 */
define(['N/search', 'N/ui/dialog'], function (search, dialog) {

    function pageInit(context) {
        const obj = context.currentRecord;

        if (context.mode === "create") {
            obj.setValue({
                fieldId: "entity",
                value: 1719
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