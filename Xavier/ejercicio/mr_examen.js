/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 *@author Xavier Gonzalez
 */
define(['N/runtime', 'N/record'], function (runtime, record) {
    const handlers = {};
    handlers.getInputData = (context) => {
        const values = runtime.getCurrentScript();
        const params = JSON.parse(values.getParameter({ name: 'custscript_s4_parammap_xg' }))
        return params
    }

    handlers.map = (context) => {
        try {

            const value = JSON.parse(context.value)
            log.audit('value', value)
            const vendorPayment = record.transform({
                fromType: 'vendorbill',
                fromId: value.id,
                toType: 'vendorpayment',
            })

            // vendorPayment.setValue('entity', value.vendorId)
            // vendorPayment.setValue('subsidiary', value.subsidiary.toString())
            vendorPayment.setValue('account', value.account.toString())
            vendorPayment.setValue('amount', value.amount)
            const line = vendorPayment.getLineCount({
                sublistId: 'apply'
            })
            log.audit('line= ', line)
            for (let i = 0; i < line; i++) {

                const idFacture = vendorPayment.getSublistValue({ sublistId: 'apply', fieldId: 'apply', line: i })
                log.audit('idFacture= ', idFacture)
                if (idFacture ) {
                    // vendorPayment.selectNewLine({ sublistId: 'vendorPayment' })
                    // vendorPayment.setSublistValue({ sublistId: 'apply', fieldId: 'apply',  line: i,value: true, })
                    vendorPayment.setSublistValue({ sublistId: 'apply', fieldId: 'amount',  line: i, value: parseFloat(value.amount)  })
                    break
                }

            }
            const idVendor = vendorPayment.save()
            log.audit('idVendor: ', idVendor)
            // vendorPayment.setCurrentSublistValue({ sublistId: 'apply', fieldId: 'rate', value: context.line[i].rate })
            // vendorPayment.commitLine({ sublistId: 'item' })
        } catch (e) {
            log.audit('error: ', e.message)
        }
    }



    return handlers;
});
