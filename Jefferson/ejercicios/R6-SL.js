/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/file','N/ui/serverWidget'], function(file,ui) {

    const handlers = {};

    handlers.onRequest = (context) => {

        const request = context.request;
        const response = context.response;
        const form = ui.createForm({ title: 'My Suitelet Page' });
        try {
		
		// Cargar archivo HTML
		const htmlFile0 = file.load({ id: '9587' });
		form.addField({ id: 'custpage_html0', type: ui.FieldType.INLINEHTML, label: 'HTML' }).defaultValue = htmlFile0.getContents();

        const cssFile0 = file.load({ id: '9288' });
		form.addField({ id: 'custpage_css0', type: ui.FieldType.INLINEHTML, label: 'CSS' }).defaultValue = '<style>' + cssFile0.getContents() + '</style>';

        
        // Obtener el valor del parámetro de consulta
		const param = request.parameters.myParam;

		if (param === '9286') {
			// Cargar la segunda página
		const htmlFile1 = file.load({ id: '9286' });
		form.addField({ id: 'custpage_html1', type: ui.FieldType.INLINEHTML, label: 'HTML' }).defaultValue = htmlFile1.getContents();

        const cssFile1 = file.load({ id: '9287' });
		form.addField({ id: 'custpage_css1', type: ui.FieldType.INLINEHTML, label: 'CSS' }).defaultValue = '<style>' + cssFile1.getContents() + '</style>';
		
		}


		
        } catch (e) {
            log.debug(" error en la ejecucion del codigo", e.message );
            
        }finally{

            response.writePage(form)
        }
        
    

    return handlers;
});


