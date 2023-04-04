/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/url'], 
    function(url) {
        const handlers = Object.keys();
        
        handlers.fieldChanged =  (context)=>{
            const record = context.currentRecord;
            const fieldId = context.fieldId;
            try{
                if(fieldId != null){
                    const fieldValue = record.getValue(fieldId);
                    const actualParams = new Object();
                    console.log('fieldValue', fieldValue)
                    switch(fieldId){
                        case 'custpage_s4_filters':
                            location.search
                                .substr(1)
                                .split('&')
                                .forEach((item)=>{
                                    const tmp = item.split('=');
                                    if(tmp[0]== 'custpage_s4_filters'){
                                        if(tmp[1] != null && tmp[1] != ''){
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1])
                                        }
                                    }
                                })
                            actualParams['custpage_s4_filters'] = fieldValue
                            const urlRedirect = url.resolveScript({
                                deploymentId: 'customdeploy_s4_exerci_sl',
                                scriptId: 'customscript_s4_exerci_sl',
                                params: actualParams,
                            })
                            window.onbeforeunload = null
                            window.location.replace(urlRedirect)
                        break
                    }
                }
            }catch(e){
                console.log('error:', e)
            }
        }

        return handlers
    }
);
