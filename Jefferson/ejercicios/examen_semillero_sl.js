/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/file','N/https'], function(serverWidget,file,https) {
    const handlers = {};

    handlers.onRequest = (context) =>{       
      const request = context.request;
      const response = context.response;
  
      try {

        // accedo la hoja de google sheets y especifico el rango de celdas para utilizar  
        const spreadsheetId = '1BG0fAXkgdzu1RDI9obQeymD7sR2T7fL4pUjG8NOn_4I'; 
        const range = 'Sheet1!A1:G7'; 
       
        // Carga la biblioteca de google sheets    
         const file = file.load({id :'/jefferson/ejercicios/google-sheets-client.js'});
         eval(file.getContents());


        // obtener token de acceso
         const authInstance = gapi.auth2.getAuthInstance();

        //diálogo de inicio de sesión de Google
        authInstance.signIn().then(function() {
      
         const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
           log.debug('Token de acceso obtenido:', accessToken);
          },function(e) {
           log.debug('Error al obtener el token de acceso:', e.message);
        });
              
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
      const button  =form.addButton({id: 'custpage_call_api_button',label: 'Consumir API',functionName: 'callApi',});

      // agregamos la seleccion al campo tipo de documento
              
       tipoDocumentoField.addSelectOption({value: 'cc',text: 'Cc',isSelected: true});
       tipoDocumentoField.addSelectOption({value: 'ti',text: 'Ti',isSelected: true});
       tipoDocumentoField.addSelectOption({value: 'ce',text: 'Ce',isSelected: true});

      // creo el popup que alerta cuando el cliente ya esta creado  
      const popup = form.createPopup({title: 'Alerta', message: 'este cliente ya esta creado'});
            popup.addButton({id: 'custpage_ok',label: 'Aceptar'});
            popup.show();

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

      // funcion que me trae los datos de la hoja de sheets

      function SpreadsheetData(sheetId, range, accessToken) {
        const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + range;
        const headers = {'Authorization': 'Bearer ' + accessToken};
        const resp = https.get({url: url,headers: headers});
      
        if (resp.code === 200) {
          return JSON.parse(resp.body);
        } else {
          throw Error('Error al obtener los datos de la hoja de cálculo. Código de respuesta: ' + resp.code);
        }
      }

      const data = SpreadsheetData(spreadsheetId, range, accessToken);
      const dataObj = 'Los datos de la hoja de cálculo son: ' + JSON.stringify(data);












      if (context.request.method === https.Method.GET) {
     

        // elabaro la peticion
      const headers = {'Content-Type': 'application/json','Authorization': 'Bearer ' + getAccessToken()}
      const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + range;
      const response = http.get({ url: url,headers: headers});
       
      // realizo la peticion
       
        if (response.code === 200) {
          const responseBody = JSON.parse(response.body);
        } else {
          log.debug('Error en la respuesta', response.code);
        }


     }else if(context.request.method === https.Method.POST){
      const spreadsheetId = '1LRNUPv-yO0SjvmOh02zO2QHMvkm90w0zEgQw1eoAjh4';
      const range = 'Sheet1!A1:G';
      
      const request = {spreadsheetId: spreadsheetId,range: range,valueInputOption: 'USER_ENTERED',resource: {values: values}};

          

     }
  
      // Mostrar el formulario al usuario
      response.writePage(form);
        
      } catch (e) {
        log.debug( 'error en la ejecución', e.message )
      }
  

    }

    return handlers;
});
