/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Walt Barros
 *@description Codigo prueba de ClientScript
 */
define(['N/search'], function (search) {

    function pageInit(context) {
        const obj = context.currentRecord;

        if (context.mode === "create") {
            obj.setValue({
                fieldId: "entity",
                value: 1717
            });

        }


    }
    function saveRecord(context) {
        const obj = context.currentRecord;
        const linecount = obj.getLineCount({
            sublistId: "item"
        })
        if (linecount < 3) {
            alert('la transacción debe tener como minimo 3 Lineas para guardarse')
            return false;
        }
        return true;
    }
    

       /* const obj = context.currentRecord;
        window.open('la transacción debe tener como minimo 3 Lineas para guardarse')*/

   /* function validateLine(context) {
        const obj = context.currentRecord;
        const sublist = context.sublist;
        const type = context.type;

        if(sublist === "item" && type === "save"){
            const linecount = obj.getLineCount({
                sublistId: "item"
            })
            if(linecount < 3){
                alert('la transacción debe tener como minimo 3 Lineas para guardarse')
                return false;
            }
        }
        return true;
    }*/


    return {
    pageInit: pageInit,
    saveRecord: saveRecord,
    }
});

