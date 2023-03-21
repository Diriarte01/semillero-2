/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Jefferson Castañeda
 *@module Public
 *@Empresa Grupo SOl4it
 *@Description Codigo de clase ClientScript
 */

define(["N/ui/dialog","N/search"], function (dialog,search) {
  const handlers = {};


  /*******ejer1 && ejer3 **/
  let totalquantity;
  handlers.saveRecord = (context) => {
    const obj = context.currentRecord;
    const line = obj.getLineCount({
      sublistId: "item",
    });

    totalquantity = obj.setValue({
      fieldId: "custbody_s4_saleinfor_numtrans",
      value: line,
    });

    let counst = 0;
    for (let i = 0; i < line; i++) {
      const quantity = obj.getSublistValue({
        sublistId: "item",
        fieldId: "quantity",
        line: i,
      });

      counst += quantity;

      totalquantity = obj.setValue({
        fieldId: "custbody_s4_saleinfor_numtrans",
        value: i + 1,
      });

      if (counst > 25) {
        dialog.alert({
          title: "Alerta",
          message: "Se pasa de la cantidad permitida en cantidad de articulos",
        });
        return false;
      }

      return true;
    }
  };

  /*******ejer2 */

  handlers.validateDelete = (context) => {
    const obj = context.currentRecord;
    const line = obj.getLineCount({
      sublistId: "item",
    });

    for (let i = 0; i < line; i++) {
      const itemLineDelete = obj.getSublistValue({
        sublistId: "item",
        fieldId: "quantity",
        line: i,
      });
      
      log.debug('valor', itemLineDelete)
      if (itemLineDelete) {
  
        dialog.alert({
          title: "Eliminar?",
          message: "desea eliminar el articulo",
          
        });
        return true;
      }

      return false;
    }
  };


  return handlers;
});
