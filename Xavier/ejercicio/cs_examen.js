/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/url'], 
    function(url) {
        const handlers = {};
        handlers.fieldChanged = (context)=>{
            const record = context.currentRecord;
            const fieldId = context.fieldId;
            if(fieldId){
                const fieldValue = record.getValue(fieldId)
                const actualParams = new Object();
                let urlRedirect
                switch(fieldId){
                    case 'custpage_s4_company':
                        location
                        .search
                        .substr(1)
                        .split('&')
                        .forEach((rs)=>{
                            const tmp = rs.split('=');
                            if(tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_account'){
                                actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                            }
                        })
                        actualParams['custpage_s4_company'] = fieldValue
                        urlRedirect = url.resolveScript({
                            deploymentId: '',
                            scriptId: '',
                            params: actualParams
                        })
                        window.onbeforeunload = false;
                        window.location.replace(url)
                    break;
                    case 'custpage_s4_account':
                        location
                        .search
                        .substr(1)
                        .split('&')
                        .forEach((rs)=>{
                            const tmp = rs.split('=');
                            if(tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_company' ){
                                actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                            }
                        })
                        actualParams['custpage_s4_account'] = fieldValue
                        urlRedirect = url.resolveScript({
                            deploymentId: '',
                            scriptId: '',
                            params: actualParams
                        })
                        window.onbeforeunload = false;
                        window.location.replace(url)
                    break;
                }
            }
        }
        return handlers;
    }
);
