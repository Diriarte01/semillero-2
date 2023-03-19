/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Xavier Gonzalez
 *
 */
define(['N/search','N/ui/dialog'], function(search,dialog) {

    function pageInit(context) {
        
    }
    
    function saveRecord(context) {
        
        const obj = context.currentRecord;
        const line = obj.getLineCount({
            sublistId: 'item'
        })
        let sum = 0;
        for(let i = 0; i < line; i++) {
            const quantity = obj.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: i
            })
            sum += quantity;
        }
           log.audit('cantidad', sum);
           if(sum > 25){
            dialog.alert({
                title: 'Error',
                message: 'La cantidad total de articulos no debe ser mayor a 25'
            })
            return false;
           }
        return true;
    }
    
    function validateField(context) {
        
    }
    
    function fieldChanged(context) {
        
    }

    function postSourcing(context) {
        
    }

    function lineInit(context) {
        
    }

    function validateDelete(context) {
        if (confirm('Estas seguro que quieres eliminiar esta linea?')) {
            
          } else {
            
            return false;
            
          }
        return true;
    }

    function validateInsert(context) {
        
    }

    function validateLine(context) {
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
