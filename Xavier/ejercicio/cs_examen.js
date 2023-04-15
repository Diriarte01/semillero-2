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
                                    if (tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_dateaplication'
                                        || tmp[0] === 'custpage_s4_typepay' || tmp[0] === 'custpage_s4_typetrans' || tmp[0] === 'custpage_s4_description'
                                        || tmp[0] === 'custpage_s4_dateacreation') {
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
                        case 'custpage_s4_account': {
                            location.search
                                .substr(1)
                                .split("&")
                                .forEach((item) => {
                                    const tmp = item.split("=");
                                    if (tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_dateaplication'
                                        || tmp[0] === 'custpage_s4_typepay' || tmp[0] === 'custpage_s4_typetrans' || tmp[0] === 'custpage_s4_description'
                                        || tmp[0] === 'custpage_s4_dateacreation') {
                                        if (tmp[1] != null && tmp[1] != "")
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                                    }
                                });
                            actualParams['custpage_s4_account'] = fieldValue;
                            const urlRedirect = url.resolveScript({
                                deploymentId: 'customdeploy_s4_examen_xg',
                                scriptId: "customscript_s4_examen_xg",
                                params: actualParams,
                            });
                            window.onbeforeunload = null;
                            window.location.replace(urlRedirect);
                            break;
                        }
                        case 'custpage_s4_dateaplication': {
                            location.search
                                .substr(1)
                                .split("&")
                                .forEach((item) => {
                                    const tmp = item.split("=");
                                    if (tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_dateaplication'
                                        || tmp[0] === 'custpage_s4_typepay' || tmp[0] === 'custpage_s4_typetrans' || tmp[0] === 'custpage_s4_description'
                                        || tmp[0] === 'custpage_s4_dateacreation') {
                                        if (tmp[1] != null && tmp[1] != "")
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                                    }
                                });
                            actualParams['custpage_s4_dateaplication'] = record.getText(fieldId);
                            const urlRedirect = url.resolveScript({
                                deploymentId: 'customdeploy_s4_examen_xg',
                                scriptId: "customscript_s4_examen_xg",
                                params: actualParams,
                            });
                            window.onbeforeunload = null;
                            window.location.replace(urlRedirect);
                            break;
                        }
                        case 'custpage_s4_typepay': {
                            location.search
                                .substr(1)
                                .split("&")
                                .forEach((item) => {
                                    const tmp = item.split("=");
                                    if (tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_dateaplication'
                                        || tmp[0] === 'custpage_s4_typepay' || tmp[0] === 'custpage_s4_typetrans' || tmp[0] === 'custpage_s4_description'
                                        || tmp[0] === 'custpage_s4_dateacreation') {
                                        if (tmp[1] != null && tmp[1] != "")
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                                    }
                                });
                            actualParams['custpage_s4_typepay'] = fieldValue;
                            const urlRedirect = url.resolveScript({
                                deploymentId: 'customdeploy_s4_examen_xg',
                                scriptId: "customscript_s4_examen_xg",
                                params: actualParams,
                            });
                            window.onbeforeunload = null;
                            window.location.replace(urlRedirect);
                            break;
                        }
                        case 'custpage_s4_typetrans': {
                            location.search
                                .substr(1)
                                .split("&")
                                .forEach((item) => {
                                    const tmp = item.split("=");
                                    if (tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_dateaplication'
                                        || tmp[0] === 'custpage_s4_typepay' || tmp[0] === 'custpage_s4_typetrans' || tmp[0] === 'custpage_s4_description'
                                        || tmp[0] === 'custpage_s4_dateacreation') {
                                        if (tmp[1] != null && tmp[1] != "")
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                                    }
                                });
                            actualParams['custpage_s4_typetrans'] = fieldValue;
                            const urlRedirect = url.resolveScript({
                                deploymentId: 'customdeploy_s4_examen_xg',
                                scriptId: "customscript_s4_examen_xg",
                                params: actualParams,
                            });
                            window.onbeforeunload = null;
                            window.location.replace(urlRedirect);
                            break;
                        }
                        case 'custpage_s4_description': {
                            location.search
                                .substr(1)
                                .split("&")
                                .forEach((item) => {
                                    const tmp = item.split("=");
                                    if (tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_dateaplication'
                                        || tmp[0] === 'custpage_s4_typepay' || tmp[0] === 'custpage_s4_typetrans' || tmp[0] === 'custpage_s4_description'
                                        || tmp[0] === 'custpage_s4_dateacreation') {
                                        if (tmp[1] != null && tmp[1] != "")
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                                    }
                                });
                            actualParams['custpage_s4_description'] = fieldValue;
                            const urlRedirect = url.resolveScript({
                                deploymentId: 'customdeploy_s4_examen_xg',
                                scriptId: "customscript_s4_examen_xg",
                                params: actualParams,
                            });
                            window.onbeforeunload = null;
                            window.location.replace(urlRedirect);
                            break;
                        }
                        case 'custpage_s4_dateacreation': {
                            location.search
                                .substr(1)
                                .split("&")
                                .forEach((item) => {
                                    const tmp = item.split("=");
                                    if (tmp[0] === 'custpage_s4_company' || tmp[0] === 'custpage_s4_account' || tmp[0] === 'custpage_s4_dateaplication'
                                        || tmp[0] === 'custpage_s4_typepay' || tmp[0] === 'custpage_s4_typetrans' || tmp[0] === 'custpage_s4_description'
                                        || tmp[0] === 'custpage_s4_dateacreation') {
                                        if (tmp[1] != null && tmp[1] != "")
                                            actualParams[tmp[0]] = decodeURIComponent(tmp[1]);
                                    }
                                });
                            actualParams['custpage_s4_dateacreation'] = record.getText(fieldId);
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
