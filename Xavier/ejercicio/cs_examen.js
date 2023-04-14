/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/url'],
    function (url) {
        const handlers = {};
        handlers.fieldChanged = (context) => {
            let record = context.currentRecord;
            let fieldId = context.fieldId;

            try {
                if (fieldId != null) {
                    const fieldValue = record.getValue(fieldId);
                    const actualParams = new Object();
                    switch (fieldId) {
                        case 'custpage_s4_company': {
                            location.search
                                .substr(1)
                                .split("&")
                                .forEach((item) => {
                                    const tmp = item.split("=");
                                    if (tmp[0] === 'custpage_s4_company') {
                                        if (tmp[1] != null && tmp[1] != "")
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                                    }
                                });
                            actualParams['custpage_s4_company'] = fieldValue;
                            const urlRedirect = url.resolveScript({
                                deploymentId: 'customdeploy_s4_examen_xg',
                                scriptId: "customscript_s4_examen_xg",
                                params: actualParams,
                            });
                            window.onbeforeunload = null;
                            window.location.replace(urlRedirect);
                            break;
                        }
                       
                    }
                }
            } catch (e) {
                console.log(e);
            }

        }
        return handlers;
    }
);
