/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/render'], function(render) {

    function generatePDF() {
        var templateId = 123; // ID de la plantilla de PDF
        var transactionId = 456; // ID de la orden
        var renderer = render.create();
        
        var pdf = renderer.renderPdf({
          templateId: templateId,
          entity: { type: 'salesorder', id: transactionId }
        });
        return pdf;
    } 
    

    return {
        generatePDF: generatePDF
    }
});
