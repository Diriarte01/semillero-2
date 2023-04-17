/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/https'], function(https) {
    const handlers = {};

    handlers.pageInit =(context) => {
        
    }

    handlers.callApi =(sheetId, range) => {
        // Realizar la llamada a la API aquí
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + range;
       const response = https.get({url: url});
      
        // Manipular la respuesta aquí
        const responseCode = response.code;
        const responseBody = response.body;
      
        // Mostrar un mensaje de éxito o error según corresponda
        if (responseCode === 200) {
            return JSON.parse(responseBody.body)
        } else {
            throw Error('Error al obtener los datos de la hoja de cálculo. Código de respuesta: ' + responseCode);
        }
    
    }

   
    return handlers;
});
