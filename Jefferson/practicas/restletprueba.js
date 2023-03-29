/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define(["N/record"], function (record) {
  const handlers = {};
  const response = {
    code: 500,
    success: false,
    error: [],
    data: [],
    correct: "transaccion creada con exito ",
  }; // declaracion de respuesta del restlet

  handlers.post = (context) => {
    try {
      // peticion exitosa
      const objTypeData = record.create({ type: context.type });
      const data = context.data;

      if (objTypeData == "salesorder") {
        let obj = record.create({ type: "salesorder" });
        obj.setValue({ fieldId: "entity", value: context.entity });

        for (const i in data.line) {
          let objLine = data.line[i];
          obj.setSublistValue({
            sublistId: "item",
            fieldId: "item",
            line: i,
            value: objLine.itemId,
          });
          obj.setSublistValue({
            sublistId: "item",
            fieldId: "quantity",
            line: i,
            value: objLine.quantity,
          });
        }

        const recordSave = obj.save();

        log.debug("recordsave", recordSave);
        // respuesta personalizada transacción exitosa
        response.correct;
        response.data.push({
          recordId: recordSave,
          recordTransaction: context.type,
        });
        response.code = 200;
        response.success = true;
      } else {
        let obj = record.create({ type: "purchaseorder" });
        obj.setValue({ fieldId: "entity", value: context.entity });
        for (const i in data.line) {
          let objLine = data.line[i];
          obj.setSublistValue({
            sublistId: "item",
            fieldId: "item",
            line: i,
            value: objLine.itemId,
          });
          obj.setSublistValue({
            sublistId: "item",
            fieldId: "amount",
            line: i,
            value: objLine.amount,
          });
        }
        log.debug("objeto", obj);
        let recordSave = obj.save();
        log.debug("recordsave", recordSave);
        // respuesta personalizada transacción exitosa
        response.correct;
        response.data.push({
          recordId: recordSave,
          recordTransaction: context.type,
        });
        response.code = 200;
        response.success = true;
      }
    } catch (e) {
      // errores relacionados a la crecion del registro
      log.debug("error al crear el registro", e);
      response.error.push({ record: record.type, message: e.message });
    } finally {
      return response;
    }
  };

  return handlers;
});
