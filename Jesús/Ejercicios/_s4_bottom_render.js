/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
 define(['N/runtime'],
 function(runtime) {
 const handlers = {};
 handlers.beforeLoad = (context)=> {
     try{
         const {form, newRecord, type } = context;
         form.clientScriptModulePath = './test2.js';
         const internalId = newRecord.id
         const userObj = runtime.getCurrentUser().roleId
         const approvalStatus = newRecord.getValue('approvalstatus')
         log.debug('roleId: ', userObj)
         if(type == 'view' && role.includes(userObj) && approvalStatus == '2'){
             const bottum = form.addButton({
                 id: 'custpage_hb_email',
                 label: 'Remision',
                 functionName: "Remision("+ internalId +")"
             })
         }
     }catch(e){
         log.error('error', e)
     }
 }
 return handlers   
});
