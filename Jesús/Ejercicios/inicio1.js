/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/ui/dialog'], function(serverWidget, dialog) {

    function onRequest(context) {
  
      if (context.request.method === 'GET') {
  
        // Crea el formulario de login
        var form = serverWidget.createForm({
          title: 'Inicio de sesión'
        });
  
        // Añade los campos del formulario (usuario y contraseña)
        form.addField({
          id: 'username',
          label: 'Usuario',
          type: serverWidget.FieldType.TEXT
        });
  
        form.addField({
          id: 'password',
          label: 'Contraseña',
          type: serverWidget.FieldType.PASSWORD
        });
  
        // Agrega un botón para enviar el formulario
        form.addSubmitButton({
          label: 'Iniciar sesión'
        });
  
        // Crea y muestra el diálogo modal
        var loginDialog = dialog.create({
          title: 'Inicio de sesión',
          content: form,
          buttons: [{
            label: 'Cerrar',
            cancel: true
          }]
        });
        loginDialog.center();
  
        // Devuelve el formulario
        context.response.writePage(form);
  
      }
  
    }
  
    return {
      onRequest: onRequest
    };
  
  });