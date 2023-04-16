/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
define(["N/record"], function (record) {
  const handlers = {};

  handlers.beforeLoad = (context) => {
    const record = context.newRecord;
    const form = context.form;
    form.clientScriptModulePath = "./R6-CS-UE-C.js";

    if (context.type === context.UserEventType.VIEW ) {
      const internalId = record.id
      form.addButton({id: "custpage_bottom",label: "Informacion",functionName: "popUp("+internalId+")"});
  
    }
  
  };

  return handlers;
});


