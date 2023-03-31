/**
 * Ejercicios de Script Programado

Realiza el siguiente ejercicio en un MAP/reduce y en un Scheduled Script 
La empresa ABC tiene una lista de clientes en NetSuite, y desea realizar una actualización masiva en los registros de estos clientes.
La actualización consiste en agregar el prefijo "ABC_" con el map/reduce
 * 
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 *@author Jesús Sillé
 */
 define(["N/search", "N/record"], function(search, record) {
    function getInputData() {
      // Obtener la lista de clientes de NetSuite
      const customerSearch = search.create({
        type: search.Type.CUSTOMER,
        columns: [ search.createColumn({ name: "internalid", label: "ID interno" }),
                   search.createColumn({ name: "companyname", label: "Nombre de la empresa" })]
      });
      return customerSearch;
    }
    
    function map(context) {
        try {

            const value = JSON.parse(context.value) /* Agregamos los prefijos para los clientes a traves de la definicion de constantes*/ 
            let name = value.name;           
            const pref1 = 'DEF_'
            const pref2 = 'ABC_'
            if (name.includes(pref1)) {          /*Creación de condiciones para asignar prefios*/
                name = name.replace(pref1, pref2)      
                record.submitFields({                   
                    type: record.Type.CUSTOMER,
                    id: value.internalId,
                    values: {
                        companyname: name
                    },
                    options: {
                        ignoreMandatoryFields: true
                    }
                });
            } if (name.includes(pref2)) {

            } else {                                     
                record.submitFields({                       
                    type: record.Type.CUSTOMER,
                    id: value.internalId,
                    values: {
                        companyname: pref2 + name
                    },
                    options: {
                        ignoreMandatoryFields: true
                    }
                });
            }

        } catch (e) {
            log.audit('Error:', e);
        }
    }

    function reduce(context) {

    }

    function summarize(summary) {

    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    }
});