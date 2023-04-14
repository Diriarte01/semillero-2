/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

// This script redirects a new sales order record and sets the entity.
define(['N/ui/serverWidget', 'N/url'], function (serverWidget, url) {



    function onRequest(context) {
    var response = context.response;
    const request = context.request;
    const params = request.parameters;

        if (context.request.method === 'GET') {
          const file = file.load({
            id: 'index.html' // Reemplaza "YOUR_FILE_ID" con el ID de archivo del archivo HTML que acabas de crear.
          });
          var contents = file.getContents();
          context.response.write(contents);
        }
        else if (context.request.method === 'POST') {
          var username = context.request.parameters.username;
          var password = context.request.parameters.password;
          
          // Realiza una llamada a la API de Platzi para verificar las credenciales del usuario.
          var response = nlapiRequestURL('https://api.escuelajs.co/api/v1/users', {
            'username': username,
            'password': password
          });
          
          if (response.getCode() === 200) {
            // Si las credenciales son válidas, redirige al usuario a la página principal.
            context.response.sendRedirect({
              type: http.RedirectType.INTERNAL,
              url: '/app/common/custom/custrecordentry.nl?rectype=2&id=-1'
            });
          }
          else {
            // Si las credenciales no son válidas, muestra un mensaje de error.
            context.response.write('<html><body><h1>Error</h1><p>Invalid username or password</p></body></html>');
          }
        }
      }
    return {
        onRequest: onRequest
    };
});


