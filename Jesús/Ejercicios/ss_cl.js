/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 *@author Jesus Sille
 *@module Public
 *@Empresa SOL4it
 *@Description codigo de clase ClientScript
 */
define(['N/ui/dialog'], 
    function(dialog) {

    function pageInit(context) {
        const obj = context.currentRecord;
        const
        dialog.alert({
            title: 'Bienvenido',
            message: string
        })
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
