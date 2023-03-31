/* 
Ejercicios de Script Programado

Realiza el siguiente ejercicio en un MAP/reduce y en un Scheduled Script

La empresa ABC tiene una lista de clientes en NetSuite, y desea realizar una actualización masiva en los registros de estos clientes. La 
actualización consiste en agregar el prefijo "ABC_" con el map/reduce y "DEF_" con el scheduled a los nombres de los clientes.

Para realizar esta actualización, se necesita crear un script en SuiteScript que haga lo siguiente:

Obtener la lista de cli entes de clientes.
Iterar sobre cada cliente de la lista y agregar el prefijo indicado al cliente.
Guardar la información actualizada de cada cliente en NetSuite.
Requerimientos adicionales:

El script debe ser programado en SuiteScript 2.1
Se deben incluir comentarios explicativos en el código para facilitar su comprensión y mantenimiento.
El script debe ser ejecutado manualmente por el usuario, no es necesario que se programe una ejecución automatizada.

*/
/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 *@author Walt Barros
 *@description código Schudelet
 */
define(['N/search', 'N/record'],
    function (search, record) {

        function execute(context) {  //Es el punto de entrada para la ejecucion, en este caso se encarga de realizar la búsqueda de clientes y actualizar el nombre de cada uno de ellos, agregando el prefijo "DEF_"
            try {                   //esto es para manejar errores que pueden ocurrir durante la ejecución de este codigo
                const customerSearchObj = search.create({ //creacion de busqueda
                    type: 'customer',
                    filters: [],
                    columns: [
                        search.createColumn({ name: "internalid", label: "ID interno" }),
                        search.createColumn({ name: "companyname", label: "Nombre de la empresa" })
                    ]

                });
                const searchResultCount = customerSearchObj.runPaged().count; //se asigna a searchResultCount la cantidad de resultados que se han encontrado en la búsqueda de clientes
                log.debug("customerSearchObj result count", searchResultCount);
                customerSearchObj.run().each(function (result) {             //se recorre cada resultado de la búsqueda utilizando el método each()
                    internalId.push({
                        internalId: result.id,
                        name: result.getValue('companyname')
                    });
                    return true;
                });
                for (let i = 0; i < internalId.length; i++) { //recorremos los resultados de la busqueda 
                    let name = internalId[i].name;
                    const pref1 = 'DEF_'
                    const pref2 = 'ABC_'
                    if (name.includes(pref1)) {
                        continue
                    } if (name.includes(pref2)) {
                        name = name.replace(pref2, pref1)  //reemplazamos el prefijo 2 por el prefijo 1 en caso de que se cumpla la condicion
                        record.submitFields({
                            type: record.Type.CUSTOMER,
                            id: internalId[i].internalId,
                            values: {
                                companyname: name
                            },
                            options: {
                                ignoreMandatoryFields: true
                            }
                        });
                    } else {                                //si no, le suma el prefijo 1 al nombre 
                        record.submitFields({
                            type: record.Type.CUSTOMER,
                            id: internalId[i].internalId,
                            values: {
                                companyname: pref1 + name
                            },
                            options: {
                                ignoreMandatoryFields: true
                            }
                        });
                    }
                }
                log.audit('internalId:', internalId);


            } catch (e) {               //este maneja las excepciones que pueden ser generadas por el código dentro del try
                log.audit('Error:', e);
            }
        }

        return {
            execute: execute
        }
    });
