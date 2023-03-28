/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Xavier Gonzalez
 *
 */
define(['N/search','N/ui/dialog'], function(search,dialog) {

    
    
    function saveRecord(context) {
        const obj = context.currentRecord;
        /*
        let transactionSearchObj = search.create({
            type: "invoice",
            filters:
            [
               ["type","anyof","CustInvc"]
            ],
            columns:
            [
               search.createColumn({name: "type", label: "Tipo"}),
               search.createColumn({name: "entity", label: "Nombre"})
            ]
         });
         let entity=transactionSearchObj[entity]
        
         log.audit("transactionSearchObj result count",transactionSearchObj);
        
         
         transactionSearchObj.id="customsearch1679434517501";
         transactionSearchObj.title="Transaccion prueba xavier (copy)";
         var newSearchId = transactionSearchObj.save();
         */
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
    function validateDelete(context) {
        if (confirm('Estas seguro que quieres eliminiar esta linea?')) {
            
          } else {
            
            return false;
            
          }
        return true;
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
