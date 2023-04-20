/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 *@author Xavier Gonzalez
 */
define(['N/runtime', 'N/record'], function(runtime, record) {
    const handlers = {};
    handlers.getInputData=(context)=> {
        const values = runtime.getCurrentScript();
        const params = JSON.parse(values.getParameter({ name: 'custscript_s4_parammap_xg' }))
        return params
    }

    handlers.map=(context) => {
        const value = JSON.parse(context.value)
        log.audit('value', value)
        const vendorPayment = record.create({
            type: record.Type.VENDOR_PAYMENT,
            isDynamic: true,
            defaultValues: {
                entity:value.vendorId,
                total: value.amount,


            }
        
         })
    }

    

    return handlers;
});
