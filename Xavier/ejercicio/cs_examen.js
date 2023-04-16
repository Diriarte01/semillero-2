/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/url', 'N/ui/dialog'],
    function (url, dialog) {
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
        handlers.saveRecord = (context) => {
            const record = context.currentRecord;
            const line = record.getLineCount({ sublistId: "custpage_s4_sublist" });
            let flag = false;
            for (let i = 0; i < line; i++) {
                const check = record.getSublistValue({
                    sublistId: "custpage_s4_sublist",
                    fieldId: "custpage_s4_checkbox",
                    line: i,
                });
                if (check) {
                    flag = true;
                    break;
                }
            }

            const message = {
                title: "Error",
                message: "Favor seleccionar por lo menos una linea de transacción",
            };
            if (!flag) {
                dialog.alert(message);
                return false;
            }

            // Milisegundos en tres meses
            let millisecond90 = 1000 * 60 * 60 * 24 * 90;
            let millisecond1 = 1000 * 60 * 60 * 24;
            let dateObject = new Date();
            let currentHour = dateObject.getTime();
            let maxHours = currentHour + millisecond90;
            let currentFixedHour = currentHour - millisecond1;
            let maxDate = new Date(maxHours);
            let currentDate = new Date(currentFixedHour);
            let dateEffective = record.getValue('custpage_s4_dateaplication');

            /* Validacion de fechas */
            if (dateEffective > maxDate) {
                // Si la fecha es mayor a 90 Dias
                message.title = 'Fecha Invalida';
                message.message = 'La fecha seleccionada supera los 90 dias calendario a la fecha actual';
                // record.setValue('custpage_s4_dateaplication', new Date())
                dialog.alert(message);
                return false;
            } else if (currentDate > dateEffective) {
                // Si la fecha es menor de la fecha actual
                message.title = 'Fecha Invalida';
                message.message = 'La fecha seleccionada es menor a la fecha actual';
                // record.setValue('custpage_s4_dateaplication', new Date())
                dialog.alert(message);
                return false;
            }
            return true;
        }
        return handlers;
    }
);
