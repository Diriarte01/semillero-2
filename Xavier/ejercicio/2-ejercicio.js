/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/search','N/ui/dialog'], function(search,dialog) {

    function pageInit(context) {
        const obj = context.currentRecord;
        if (context.mode === 'create'){
            obj.setValue({
                fieldId: "entity",
                value: '1718'
            })

        }
    }

    function saveRecord(context) {
        const obj = context.currentRecord;
        const countLine = obj.getLineCount({
            sublistId: 'item'
        });
        if (countLine < 3){
            dialog.alert("la transacción debe tener como minimo 3 Lineas para guardarse");
            return false;
        }
        return true;
    }
    function validateField(context) {
        
    }
    
    function fieldChanged(context) {
        const obj = context.currentRecord;
        const fieldId = context.fieldId;
        const sublistId = context.fieldId;

        if (sublistId =='item'){
            if(fieldId == 'item'){
                const item = obj.CurrentRecordgetSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                })
                /*const searchField = search.lookupFields({
                    type: enum,
                    id: string,
                    columns: string | string[]
                })*/

        }    
    }
    }

    function postSourcing(context) {
        
    }

    function lineInit(context) {
        const obj = context.currentRecord;
        const sublistId = context.fieldId;
        if (sublistId =='item'){
            obj.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                value: 2
            })
        }

    }

    function validateDelete(context) {
        
    }

    function validateInsert(context) {
        
    }
    
    function validateLine(context) {
        const obj = context.currentRecord;
        const  countQuantity = objRecord.getCurrentSublistValue({
            sublistId: "item",
            fieldId: "quantity",
        })
            log.audit('numero de columnas', countColumn);
            
        if (countQuantity > 5){
         alert("la cantidad debe ser menor a 5");
              return false;
        }
        return true;
    }
        

       
    
    function sublistChanged(context) {
        
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord,
        validateField: validateField,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        lineInit: lineInit,
        validateDelete: validateDelete,
        validateInsert: validateInsert,
        validateLine: validateLine,
        sublistChanged: sublistChanged
    }
});
