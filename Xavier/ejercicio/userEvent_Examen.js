/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@author Xavier Gonzalez
 */
 define([], function () {
    const handlers = {};
    handlers.beforeLoad = (context) => {
        try {

            const obj = context.newRecord;
            const id = obj.id;
            const form = context.form;
            form.clientScriptModulePath = './practicaUserEvent+Client.js';
            if (context.type == context.UserEventType.VIEW) {
                form.addButton({
                    id: 'custpage_bottom',
                    label: 'Generar archivo',
                    functionName: 'popup('+id+')'
                })

            }

        } catch (e) {
            log.audit('Error: ' + e.message)
        }
    }

    return handlers;
});
