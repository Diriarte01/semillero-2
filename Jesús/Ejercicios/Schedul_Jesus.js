/**
 *Ejercicios de Script Programado

Realiza el siguiente ejercicio en un Scheduled Script

La empresa ABC tiene una lista de clientes en NetSuite, y desea realizar una actualización masiva en los registros de estos clientes.
La actualización consiste en agregar el prefijo "DEF_" con el scheduled a los nombres de los clientes.

Para realizar esta actualización, se necesita crear un script en SuiteScript que haga lo siguiente:

Obtener la lista de clientes de clientes.
Iterar sobre cada cliente de la lista y agregar el prefijo indicado al cliente.
Guardar la información actualizada de cada cliente en NetSuite. 
 *
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 *@author Jesús Sillé
 */
 define(["N/search", "N/record"], function(search, record) {
    function execute(context) {
        try {                                           // Agregamos los prefijos para los clientes a traves de la definicion de constantes
            let internalId = [];                                
            var customerSearchObj = search.create({             
                type: "customer",
                filters:
                    [
                    ],
                columns:
                    [
                        search.createColumn({ name: "internalid", label: "ID interno" }),
                        search.createColumn({ name: "companyname", label: "Nombre de la empresa" })
                    ]
            });
            var searchResultCount = customerSearchObj.runPaged().count;
            log.debug("customerSearchObj result count", searchResultCount);
            customerSearchObj.run().each(function (result) {
                internalId.push({
                    internalId: result.id,
                    name: result.getValue('companyname')
                });
                return true;
            });  
             /*Creación de condiciones para asignar prefios*/
            for (let i = 0; i < internalId.length; i++) {                  
                let name = internalId[i].name;                       
                const pref1 = 'DEF_'
                const pref2 = 'ABC_'
                if (name.includes(pref1)) {                            
                    continue
                } if (name.includes(pref2)) {                            
                    name = name.replace(pref2, pref1)                
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
                } else {                    
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

        } catch (e) {
            log.audit('Error:', e);
        }
    }

    return {
        execute: execute
    }
});