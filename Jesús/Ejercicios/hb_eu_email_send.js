/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
define(['N/runtime'],
    function(runtime) {
    const handlers = {};
    handlers.beforeLoad = (context)=> {
        try{
            const role = ['administrator', 'HABI - COMPRADOR CL', 'HABI - COMPRADOR MX']
            const {form, newRecord, type } = context;
            form.clientScriptModulePath = './hb_cs_email_send.js';
            const internalId = newRecord.id
            const userObj = runtime.getCurrentUser().roleId
            const approvalStatus = newRecord.getValue('approvalstatus')
            log.debug('roleId: ', userObj)
            if(type == 'view' && role.includes(userObj) && approvalStatus == '2'){
                const bottum = form.addButton({
                    id: 'custpage_hb_email',
                    label: 'Enviar Email',
                    functionName: "emailOcHabi("+ internalId +")"
                })
            }
        }catch(e){
            log.error('error', e)
        }
    }
    return handlers   
});
