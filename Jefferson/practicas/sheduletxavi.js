/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 *@author   Xavier Gonzalez
 */
define(["N/search", "N/record"], function (search, record) {
  function execute(context) {
    try {
      let internalId = []; // variable para guardar los resultados de la busqueda
      var customerSearchObj = search.create({
        //busqueda creada usand el metodo search.create del modulo N/search
        type: "customer",
        filters: [],
        columns: [
          search.createColumn({ name: "internalid", label: "ID interno" }),
          search.createColumn({
            name: "companyname",
            label: "Nombre de la empresa",
          }),
        ],
      });
      var searchResultCount = customerSearchObj.runPaged().count;
      log.debug("customerSearchObj result count", searchResultCount);
      customerSearchObj.run().each(function (result) {
        internalId.push({
          internalId: result.id,
          name: result.getValue("companyname"),
        });
        return true;
      });
      for (let i = 0; i < internalId.length; i++) {
        //for para iterar sobre los resultados de la busqyeda
        let name = internalId[i].name; //guardamos el nombre del cliente en una variable
        const pref1 = "DEF_";
        const pref2 = "ABC_";
        if (name.includes(pref1)) {
          // if para asegurarnos que si ya tiene el prefijo "DEF_"pase a la siguiente iteracion
          continue;
        }
        if (name.includes(pref2)) {
          // if para saber si tiene el prefijo "ABC_"
          name = name.replace(pref2, pref1); // usamos el metodo replace para remplazar el prefijo "ABC_" por el prefijo "DEF_"
          record.submitFields({
            //usamos  el metodo record.submitFields para guardar el nuevno nombre del cliente
            type: record.Type.CUSTOMER,
            id: internalId[i].internalId,
            values: {
              companyname: name,
            },
            options: {
              ignoreMandatoryFields: true,
            },
          });
        } else {
          //en caso que el nombre del cliente no tenga ninguno de los 2 prefijos se le agrega el prefijo 1 y se guarda
          record.submitFields({
            type: record.Type.CUSTOMER,
            id: internalId[i].internalId,
            values: {
              companyname: pref1 + name,
            },
            options: {
              ignoreMandatoryFields: true,
            },
          });
        }
      }
      log.audit("internalId:", internalId);
    } catch (e) {
      log.audit("Error:", e);
    }
  }

  return {
    execute: execute,
  };
});
