/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@author Jefferson Castañeda
 *@module Public
 *@Empresa Grupo SOl4it
 *@Description Codigo de clase Userevents
 */

define(["N/https", "N/record"], function (https, record) {
  const handlers = {};

  handlers.beforeLoad = (context) => {};

  handlers.beforeSubmit = (context) => {
    let response = {code:"200", data:[]}
    let obj = context.newRecord;
    obj =objrecord.load({
      type: ,
      id: 126,
     
    })
    obj.getValue({
      fieldId: 'custrecord_s4_id_product_exercisesue'
    })
    let request = obj.body;
    let requestpost = https.post({
      body: request,
      url :'//tstdrv2720031.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=126'
    }) 
    log.debug("request", requestpost);
    
  
  };





  handlers.afterSubmit = (context) => {};

  return handlers;
});
