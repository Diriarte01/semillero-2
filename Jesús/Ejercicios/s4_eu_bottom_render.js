/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
 define(['N/ui/serverWidget'],
 function (serverWidget) {
     const handlers = {};
     handlers.beforeLoad = (context) => {
         const { form, newRecord, type } = context;
         try {
            log.debug("entra try")
             form.clientScriptFileId = 4379;
             if (type === 'view') {
                 const internalId = newRecord.id
                 const bottum = form.addButton({
                     id: 'custpage_s4_button_render',
                     label: 'Remision',
                     functionName: "pdfRemision()"
                 })
             }
         } catch (e) {
             log.error('error', e)
         }
     }
     return handlers
 });