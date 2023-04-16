/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget','N/file','N/https'], function(serverWidget,file,https) {
    const handlers = {};

    handlers.onRequest = (context) =>{       
      const request = context.request;
        
      try {
 
       // Carga la biblioteca de google sheets
      
       const file = nlapiLoadFile('/jefferson/ejercicios/google-sheets-client.js');
       eval(file.getValue());
     
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
      
       // credenciales 
       const credentials = {
        client_id: "357039879849-bc6cqauufta387gqffrg1sc6s5gff2gv.apps.googleusercontent.com",
        client_secret: "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",
        redirect_uri: "https://tstdrv2720031.app.netsuite.com/app/site/hosting/scriptlet.nl?script=148&deploy=1&whence=",
        grant_type: "authorization_code",
        code: "TU_CODIGO_DE_AUTORIZACION"
      };

      /**********************************************************************************************************/ 
      
      // obtener token de acceso

      
      const oauth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uri
      );
      
      oauth2Client.getToken(credentials.code, function(token) {
        if (e) {
          log.debug("Error al obtener token: ", e.message)
          return;
        }
        console.log("Token de acceso: ", token.access_token);
      })
     
      /*********************************************************************************************************** */

      /*

      function getGoogleAccessToken(credentials) {
        const url = 'https://oauth2.googleapis.com/token';
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      
        const data = {grant_type: 'refresh_token',client_id: credentials.client_id,client_secret: credentials.client_secret,refresh_token: credentials.refresh_token
        };
      
        var response = https.post({
          url: url,
          headers: headers,
          body: data
        });
      
        var token = JSON.parse(response.body).access_token;
      
        return token;
      }
          */


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




      if (context.request.method === https.Method.GET) {
     
        // accedo la hoja de google sheets y especifico el rango de celdas para utilizar
      const spreadsheetId = '1LRNUPv-yO0SjvmOh02zO2QHMvkm90w0zEgQw1eoAjh4';
      const range = 'Sheet1!A1:G';

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
