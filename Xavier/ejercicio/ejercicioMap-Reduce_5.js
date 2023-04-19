/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 *@author   Xavier Gonzalez
 */
define(["N/search", "N/record"], function (search, record) {

    function getInputData() {
        try {
            
            let response = [];                                  // variable para guardar los resultados de la busqueda
            var customerSearchObj = search.create({             //busqueda creada usand el metodo search.create del modulo N/search
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
                response.push({
                    internalId: result.id,
                    name: result.getValue('companyname')
                });
                return true;
            });
            return response;
        } catch (e) {
            log.audit('Error:', e);
        }
    }

    function map(context) {
        try {

            const value = JSON.parse(context.value)
            let name = value.name;           //guardamos el nombre del cliente en una variable
            const pref1 = 'DEF_'
            const pref2 = 'ABC_'
            if (name.includes(pref1)) {          // if para saber si tiene el prefijo "DEF_"
                name = name.replace(pref1, pref2)       // usamos el metodo replace para remplazar el prefijo "ABC_" por el prefijo "DEF_"
                record.submitFields({                   //usamos  el metodo record.submitFields para guardar el nuevno nombre del cliente
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

            } else {                                     //en caso que el nombre del cliente no tenga ninguno de los 2 prefijos se le agrega el prefijo 1 y se guarda
                record.submitFields({                       //usamos  el metodo record.submitFields para guardar el nuevno nombre del cliente
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
