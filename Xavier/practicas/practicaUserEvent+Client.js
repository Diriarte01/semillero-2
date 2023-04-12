/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Xavier Gonzalez
 */
define(['./pop_up.js','N/search', 'N/record'], function (popUp, search, record) {
    const handlers = {};
    handlers.pageInit = (context) => { }

    handlers.popup = (id) => {

        const obj = record.load({
            type: 'customer',
            id: id})
        const id = obj.id;
        const name = obj.getValue('companyname')
        const email = obj.getValue('email')
        const phone = obj.getValue('phone')
        const limitCredit = obj.getValue('creditlimit');
        const credit1 = obj.getValue('balance');
        let creditDisp = 0;
        if(credit1 < limitCredit){
            creditDisp =limitCredit-credit1;
        }else{
            creditDisp = 0
        }
        var invoiceSearchObj = search.create({
            type: "invoice",
            filters:
            [
               ["mainname","anyof", id], 
               "AND", 
               ["type","anyof","CustInvc"]
            ],
            columns:
            [
               search.createColumn({name: "internalid", label: "ID interno"})
            ]
         });
         const searchResultCount = invoiceSearchObj.runPaged().count;
         log.debug("invoiceSearchObj result count",searchResultCount);
         invoiceSearchObj.run().each(function(result){
            // .run().each has a limit of 4,000 results
            return true;
        });
        
        let text = name+'\n'+email+'\n'+phone+'\n'+limitCredit+'\n'+creditDisp+'\n'+searchResultCount
        

        popUp.fire({
            title: 'Informacion del Cliente',
            text: text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then(() => { })

    }
    return handlers;

});
