/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/file','N/https',], function(serverWidget,file,https) {
    const handlers = {};

    handlers.onRequest = (context) => {
       
        // parametros del suitelet && accedo la hoja de google sheets y especifico el rango de celdas para utilizar  
        const request = context.request;
        const response = context.response;     
        const spreadsheetId = '1BG0fAXkgdzu1RDI9obQeymD7sR2T7fL4pUjG8NOn_4I'; 
        const range = 'Sheet1!A1:G7'; 
        
        
  try {
      /************************************************************************************/
      // renderizo la pagina

      // Crear un formulario personalizado
      const form = serverWidget.createForm({ title: 'Clientes'});

      // Agregar los otros campos que son documento,nombre,apellidos,email,telefono,direccion
      const tipoDocumentoField = form.addField({id: 'custpage_tipo_documento',type: serverWidget.FieldType.SELECT,label: 'Tipo de Documento',source: 'customrecord_tipo_documento',isMandatory: true,});
      form.addField({id: 'custpage_numero_documento',type: serverWidget.FieldType.TEXT,label: 'Número de Documento',isMandatory: true});
      form.addField({id: 'custpage_nombres',type: serverWidget.FieldType.TEXT,label: 'Nombres',isMandatory: true});
      form.addField({id: 'custpage_apellidos',type: serverWidget.FieldType.TEXT,label: 'Apellidos',isMandatory: true});
      form.addField({id: 'custpage_email',type: serverWidget.FieldType.TEXT,label: 'Correo Electrónico',});
      form.addField({id: 'custpage_telefono',type: serverWidget.FieldType.TEXT,label: 'Número de Teléfono',});
      form.addField({id: 'custpage_direccion',type: serverWidget.FieldType.TEXT,label: 'Dirección',});

      // Agregar un botón al formulario para consumir api
      const button = form.addButton({id: 'custpage_call_api_button',label: 'Consumir API', functionName: 'callApi' ,params: {sheetId: spreadsheetId, range: range,accessToken: accessToken}})
      // agregamos la seleccion al campo tipo de documento
              
       tipoDocumentoField.addSelectOption({value: 'cc',text: 'Cc',isSelected: true});
       tipoDocumentoField.addSelectOption({value: 'ti',text: 'Ti',isSelected: true});
       tipoDocumentoField.addSelectOption({value: 'ce',text: 'Ce',isSelected: true});
       
      /**********************************************************************************************************/

      // obetener todo los valores de los campos
      const tipoDocumentoValue = context.request.parameters.custpage_tipo_documento;
      const numeroDocumentoValue = request.parameters.custpage_numero_documento;
      const nombresValue = request.parameters.custpage_nombres;
      const apellidosValue = request.parameters.custpage_apellidos;
      const emailValue = request.parameters.custpage_email;
      const telefonoValue = request.parameters.custpage_telefono;
      const direccionValue = request.parameters.custpage_direccion;

      // creo el objeto cliente con sus valores para el body de la peticion

      const objCustomer = {tipoDocumento: tipoDocumentoValue,numeroDocumento : numeroDocumentoValue,nombre : nombresValue,apellido : apellidosValue,correo : emailValue,telefono : telefonoValue,direccion : direccionValue};


    /***************************************************************************************************************** */

  // cargo el archivo que puede ser utilizado en el suitelet con otras funciones

     form.clientScriptModulePath = "./examen_semillero_cl.js";
     

      response.writePage(form); 


  } catch (e) {
    log.error("error en la ejecucion", e.message);
    
  }

}


    return handlers;
});
