/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 *@author Walt Barros
 *@description código MapReduceScript
 */
define(['N/record', 'N/search'],
    function (record, search) {

        function getInputData() {
            try {                   //esto es para manejar errores que pueden ocurrir durante la ejecución de este codigo
                let response = [];
                const customerSearchObj = search.create({
                    type: "customer",
                    filters: [],
                    columns:
                        [
                            search.createColumn({ name: "internalid", label: "ID interno" }),
                            search.createColumn({ name: "companyname", label: "Nombre de la empresa" })
                        ]
                });
                const searchResultCount = customerSearchObj.runPaged().count;  //se asigna a searchResultCount la cantidad de resultados que se han encontrado en la búsqueda de clientes
                log.debug("customerSearchObj result count", searchResultCount);
                customerSearchObj.run().each(function (result) {        //se recorre cada resultado de la búsqueda utilizando el método each()
                    response.push({
                        internalId: result.id,
                        name: result.getValue('companyname')
                    });
                    return true;
                });
                return response;

            } catch (e) {           //este maneja las excepciones que pueden ser generadas por el código dentro del try
                log.audit('Error:', e);
            }

        }

        function map(context) {
            try {               //esto es para manejar errores que pueden ocurrir durante la ejecución de este codigo

                const value = JSON.parse(context.value)
                let name = value.name;
                const pref1 = 'DEF_'
                const pref2 = 'ABC_'
                if (name.includes(pref1)) {
                    name = name.replace(pref1, pref2)   ////reemplazamos el prefijo 1 por el prefijo 2 en caso de que se cumpla la condicion
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

            } catch (e) {               //este maneja las excepciones que pueden ser generadas por el código dentro del try
                log.audit('Error:', e);
            }
        }

        return {
            getInputData: getInputData,
            map: map,
        }

    });
