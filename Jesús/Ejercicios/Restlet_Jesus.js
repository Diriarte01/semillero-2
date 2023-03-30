/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 *@author Jesús Sillé
 */
define(['N/record'], function (record) {

    const handlers = {};
    const response = { code: 500, success: false, error: [], data: [] };
    const validator = {
        purchaseorder: {
            entity: { type: 'number', isMandatory: true },

        },
        salesorder: {
            entity: { type: 'number', isMandatory: true },

        }
    }

    const validators = (type, payload) => {
        const response = [];
        if (!validator.hasOwnProperty(type)) {
            response.push({
                name: 'Falta de registro',
                message: 'el registro al que quieres acceder no se tiene acceso en esta api solo recibe: ' + Object.keys(validator).join()
            })
        } else {
            const validatorType = validator[type]
            for (let i in validatorType) {
                if (i == "line") {
                    continue
                }
                if (!payload.hasOwnProperty(i) && validatorType[i].isMandatory) {
                    response.push({
                        name: 'llave Obligatoria',
                        message: 'el argumento ' + i + ' es obligatorio en el JSON'
                    })
                } else if (payload.hasOwnProperty(i)) {
                    if (validatorType[i].type != typeof payload[i]) {
                        response.push({
                            name: 'tipo de dato incorrecto',
                            message: 'el tipo de dato de ' + i + ' es incorrecto, debe ser ' + validatorType[i].type
                        })
                    }
                }

            }
        }
        return response
    }

    handlers.post = (context) => {
        log.audit('context: ', context)
        try {
            const obj = record.create({
                type: context.type,
                isDynamic: true,
            })

            for (let i = 0; i < context.line.length; i++) {

                obj.setValue('entity', context.entity)
                obj.selectNewLine({ sublistId: 'item' })
                obj.setCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: context.line[i].item })
                obj.setCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: context.line[i].quantity })
                obj.setCurrentSublistValue({ sublistId: 'item', fieldId: 'rate', value: context.line[i].rate })
                obj.commitLine({ sublistId: 'item' })

            }
            const recordSave = obj.save();
            response.data.push({
                record: context.type,
                recordId: recordSave,
            })
            response.code = 200;
            response.success = true;

        } catch (e) {
            response.error.push({
                record: context.type,
                message: e.message
            })
        } finally {
            return response

        }
    }
    return handlers;
});