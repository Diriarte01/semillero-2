/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/url','N/currentRecord'],
    function (url,record) {
        const handlers = {};
        handlers.pageInit = (context) => { }
        handlers.pdfRemision = (internalId) => {
            const url = context
            try {
                const current = record.get();
                const internalId = current.id
                let urlRedirect = url.resolveScript({
                    deploymentId: 'customdeploy1',
                    scriptId: 'customscript_s4_sl_inf_render',
                    params: {
                        internalId: internalId,
                    }
    
                });
                window.open(urlRedirect,'_blank')


            } catch (e) {
                console.log('error', e)
            }
        }
        return handlers
    }
);
