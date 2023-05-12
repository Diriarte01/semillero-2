/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @author  Jesús Sillé
 */

define(['N/ui/serverWidget'], function(serverWidget) {
  
    function onRequest(context) {
      if (context.request.method === 'GET') {
        const form = serverWidget.createForm({
          title: 'Orden de Ejecución de Artículos'
        });
        
        // Aquí puedes agregar los campos necesarios al formulario
        
        // Agrega un campo de selección para elegir el artículo
        const itemField = form.addField({
          id: 'custpage_item',
          type: serverWidget.FieldType.SELECT,
          label: 'Artículo',
          source: 'item' // Fuente de datos para los artículos
        });
        
        // Agrega un campo de texto para la cantidad
        const quantityField = form.addField({
          id: 'custpage_quantity',
          type: serverWidget.FieldType.TEXT,
          label: 'Cantidad'
        });
        
        // Agrega un botón de submit al formulario
        form.addSubmitButton({
          label: 'Crear Orden de Ejecución'
        });
        
        // Renderiza el formulario
        context.response.writePage(form);
      } else if (context.request.method === 'POST') {
        // Procesa la información del formulario cuando se envía
        var item = context.request.parameters.custpage_item;
        var quantity = context.request.parameters.custpage_quantity;
        
        // Aquí puedes realizar las acciones necesarias con la información enviada
        
        // Muestra un mensaje de éxito
        context.response.write('La Orden de Ejecución se ha creado correctamente.');
      }
    }
    
    return {
      onRequest: onRequest
    };
  });