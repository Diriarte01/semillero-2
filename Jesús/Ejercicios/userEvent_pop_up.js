/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@author Jesús Sillé
 */
 define([], 
    function() {
        const handlers = {};

        handlers.beforeLoad = (context)=>{
            const record = context.newRecord;
            const form = context.form;
            form.clientScriptModulePath = './s4_cs_bottom.js';
            if(context.type == context.UserEventType.VIEW){
                const internalId = record.id;
                form.addButton({
                    id: 'custpage_bottom',
                    label: 'Main Data',
                    functionName: "popUp("+internalId+")"
                })
            }
        }

        return handlers;
    
    }
);