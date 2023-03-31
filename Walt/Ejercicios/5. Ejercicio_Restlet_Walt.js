/*
Ejericio tipo Restlet

En este ejercicio, se le pedirá que implemente un Restlet que permita crear transacciones en una tabla determinada. El Restlet debe seguir 
las mejores prácticas de código, incluyendo la validación de la entrada de usuario, la verificación de los límites de uso, el manejo de 
excepciones y la organización del código en módulos. Para completar este ejercicio, deberá seguir las siguientes instrucciones:

- Cree un Restlet que permita a los usuarios crear transacciones en una tabla específica. El Restlet debe aceptar entradas de usuario en un 
formato JSON y validar que los campos requeridos estén presentes y sean válidos. Algunos campos pueden incluir la cantidad de la transacción,
el tipo de transacción y la fecha de la transacción.

Transacciones:

    - Orden de compra
    - Orden de Venta 

- Verifique los límites de uso para evitar que los usuarios realicen demasiadas solicitudes en un período de tiempo determinado. Si se excede
el límite, el Restlet debe devolver un mensaje de error adecuado.

- Maneje las excepciones de manera adecuada para garantizar que el Restlet siga funcionando correctamente incluso si ocurre un error. Los 
errores pueden incluir entradas de usuario incorrectas, problemas con la conexión a la base de datos, errores de red y otros errores que 
puedan surgir.

- Utilice la validación de entrada para garantizar que los datos proporcionados por el usuario sean válidos y cumplan con ciertas condiciones
de negocio. Por ejemplo, puede verificar que el usuario tenga suficientes fondos para realizar una transacción de cierto monto o que la 
fecha de la transacción sea válida.

- Utilice el módulo de respuesta de Restlet para devolver una respuesta adecuada al usuario. Si la transacción se crea con éxito, el Restlet 
debe devolver un mensaje de éxito junto con los detalles de la transacción creada. Si hay algún problema con la entrada de usuario, el 
Restlet debe devolver un mensaje de error que indique la naturaleza del problema.

- Asegúrese de seguir las mejores prácticas al trabajar con Restlets, como la implementación de un manejo adecuado de errores, la 
verificación de los límites de uso y el seguimiento de las pautas de seguridad.

- Asegúrese de documentar el código y la implementación de las pruebas de manera clara y concisa para facilitar la comprensión del código y 
la ejecución de las pruebas.

*/

/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 *@author Walt Barros   
 *@description Codigo prueba de Restlet
 */
define(['N/record'],
    function (record) {

        const handlers = {};
        const response = { code: 500, success: false, error: [], data: [] };
        const validator = {
            salesorder: { entity: { type: 'number', isMandatory: true }, },

            purchaseorder: { entity: { type: 'number', isMandatory: true } },
        }

        const validators = (type, payload) => {
            const response = [];

            if (!validator.hasOwnProperty(type)) {
                response.push({
                    name: 'Falta de registro',
                    message: 'El registro al que quieres acceder, no tiene acceso en esta api solo recibe:' + Object.keys(validator).join(),
                })
            } else {
                const validatorType = validator[type]
                for (let i in validatorType) {
                    if (i == "line") {
                        continue
                    }
                    if (!payload.hasOwnProperty(i) && validatorType[i].isMandatory) {
                        response.push({
                            name: 'Falta un argumento Obligatorio',
                            message: 'la llave ' + i + ' es obligatoria'
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
            log.debug('context: ', context);
            try {

                const obj = record.create({
                    type: context.type,
                })

                for (let w = 0; w < context.line.length; w++) {

                    Obj.setValue('entity', context.entity)
                    obj.selectNewLine({ sublistId: 'item' })
                    obj.sectCurrentSublistValue({ sublistId: 'item', fieldId: 'item', value: context.line[w].item })
                    obj.sectCurrentSublistValue({ sublistId: 'item', fieldId: 'quantity', value: context.line[w].quantity })
                    obj.sectCurrentSublistValue({ sublistId: 'item', field: 'rate', value: context.line[w].rate })
                    obj.commitLine({ sublistId: 'item' })

                    const recordSave = obj.save();
                    log.debug('recordSave: ', recordSave);

                }

                response.data.push({
                    record: context.type,
                    recordId: recordSave,
                })

                response.code = 200;
                response.success = true;

            } catch (e) {
                log.debug('error al crear', e)
                response.error.push({
                    record: context.type,
                    message: e.message,
                });

            } finally {
                return response;
            }

        }

        return handlers;
    });
