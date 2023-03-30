/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 */
define(["N/search","N/record"], function(search,record) {
     
    const handlers = {};


    handlers.getInputData = () => {
        
        // const record = record.context;
        //const isEntity = record.context;
        const response = [];
        const filters = [];
        const columns = [search.createColumn({name: "entityid",sort: search.Sort.ASC,label: "Nombre",})];
        const searchData = search.create({type: "customer",filters: filters,columns: columns,});
         
         // ejecuta la busqueda y guarda el objeto 
  
        
        searchData.run().each(function (result) {
        const objCustomer = new Object();   
        objCustomer.nameCustomer = result.getValue("entityid")  
        response.push(objCustomer);
        return true;
        
        
        });

        

        return response;
    }

    // mo supe como implementar :(


    handlers.map =(context) => {

        const value = JSON.parse(context.value)
        
    }

    handlers.reduce =(context) =>{
        
    }



    return handlers;

});
