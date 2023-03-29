/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Jefferson Castañeda
 *@module Public
 *@Empresa Grupo SOl4it
 *@Description Codigo de clase ClientScript
 */

define(["N/ui/dialog", "N/search"], function (dialog, search) {
  const handlers = {};

  /*******ejer1 && ejer3 **/

  handlers.saveRecord = (context) => {
    const obj = context.currentRecord;
    const isEntity = obj.getValue({
      fieldId: "entity",
    });
    //////// ejer 3
    let arrayTrans = [];
    const type = "salesorder";
    const filters = [["type", "anyof", "SalesOrd"]];
    const columns = [
      search.createColumn({
        name: "ordertype",
        sort: search.Sort.ASC,
        label: "Tipo de orden",
      }),
    ];
    columns.push(search.createColumn({ name: "trandate", label: "Fecha" }));
    columns.push(search.createColumn({ name: "type", label: "Tipo" }));
    columns.push(search.createColumn({ name: "entity", label: "Nombre" }));
    columns.push(search.createColumn({ name: "amount", label: "Importe" }));

    let SearchSalesOrder = search.create({
      type: type,
      filters: filters,
      columns: columns,
    });

    let searchResultCount = SearchSalesOrder.runPaged().count;
    //  log.debug("salesorderSearchObj result count", searchResultCount);

    let res = SearchSalesOrder.run().each(function (result) {
      return true;
    });

    const es = res.getValue({
      name: "entity",
    });

    if (isEntity == es) 
    
    
    
    arrayTrans.push(res);
    log.debug({ title: "array", details: res });

    ////////////

    const line = obj.getLineCount({
      sublistId: "item",
    });

    let counst = 0;
    for (let i = 0; i < line; i++) {
      const quantity = obj.getSublistValue({
        sublistId: "item",
        fieldId: "quantity",
        line: i,
      });

      counst += quantity;

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

      log.debug("valor", itemLineDelete);
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
