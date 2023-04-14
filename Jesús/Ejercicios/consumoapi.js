/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function(serverWidget) {

  function onRequest(context) {
    const response = context.response;
    const request = context.request;
    const params = request.parameters;
    try{
      const form = serverWidget.createform({title:"Loguin-Pantalla Principal"})
      


    }catch(e) {}
    

  }

  return {
    onRequest: onRequest
  }
});
