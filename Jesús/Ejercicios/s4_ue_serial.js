/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
define(["N/record"], function (record) {
    function beforeLoad(context) { }

    function beforeSubmit(context) {
        try {
            if (
                context.type == context.UserEventType.EDIT ||
                context.type == context.UserEventType.CREATE ||
                context.type == context.UserEventType.VIEW
            ) {
                let thisRecord = context.newRecord;
                const data = [];
                log.debug("beforeLoad", thisRecord);

                var sublistName = thisRecord.getSublists();
                log.debug("sublistName: ", sublistName);

                let numLines = thisRecord.getLineCount({
                    sublistId: "item",
                });
                log.debug("numLines", numLines);

                for (let i = 0; i < numLines; i++) {
                    let objSubRecord = thisRecord.getSublistValue({
                        sublistId: "item",
                        fieldId: "inventorydetail",
                        line: i,
                    });
                    log.debug("objSubRecord: ", objSubRecord);

                    let recLoad = record.load({
                        type: "inventorydetail",
                        id: objSubRecord,
                    });
                    log.debug("recLoad: ", recLoad);

                    let subRecLoad = recLoad.getLineCount("inventoryassignment");
                    log.debug("recLoad: ", subRecLoad);
                    for (let j = 0; j < subRecLoad; j++) {
                        let objSubRecord2 = recLoad.getSublistText({
                            sublistId: "inventoryassignment",
                            fieldId: "issueinventorynumber",
                            line: j,
                        });
                        log.debug("objSubRecord2", objSubRecord2);
                        data.push(objSubRecord2);
                    }
                    log.debug("data: ", data);
                    thisRecord.setSublistValue({
                        sublistId: "item",
                        fieldId: "custcol_s4_inf_serie",
                        line: i,
                        value: data.toString(),
                    });
                    data = [];
                }
            }
        } catch (error) {
            log.error("error", error);
        }
    }

    function afterSubmit(context) { }

    return {
        beforeSubmit: beforeSubmit,
    };
});