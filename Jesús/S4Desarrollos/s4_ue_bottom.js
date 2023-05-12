/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@author Jesús Sillé
 */
define([], function () {
    const handlers = {};

    handlers.beforeLoad = (context)=>{
        const record = context.newRecord;
        const form = context.form;
        form.clientScriptModulePath = './s4_inf_suit_pdf.js';
        if (context.type == context.UserEventType.VIEW) {
            const internalId = record.id;
            form.addButton({
                id: 'custpage_bottom',
                label: 'popUp',
                functionName: "popUp("+internalId+")"
            })
        }
    }
    return handlers;
}
);

