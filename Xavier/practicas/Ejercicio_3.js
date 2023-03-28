/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define([], function() {

    function pageInit(context) {
        var salesorderSearchObj = search.create({
            type: "salesorder",
            filters:
            [
               ["type","anyof","SalesOrd"], 
               "AND", 
               ["name","anyof","325"]
            ],
            columns:
            [
               search.createColumn({name: "type", label: "Tipo"}),
               search.createColumn({name: "entity", label: "Nombre"})
            ]
         });
         var searchResultCount = salesorderSearchObj.runPaged().count;
         log.debug("salesorderSearchObj result count",searchResultCount);
         salesorderSearchObj.run().each(function(result){
            // .run().each has a limit of 4,000 results
            return true;
         });
         
         
    }

    function saveRecord(context) {
        
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
