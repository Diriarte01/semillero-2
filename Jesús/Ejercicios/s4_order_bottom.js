/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Jesús Sillé
 */
define(['N/file', 'N/render', 'N/xml', 'N/record', 'N/ui/serverWidget'], function (file, render, xml, record, serverWidget) {
    function afterSubmit(context) {
        if (context.type === context.UserEventType.VIEW) {
            const executionContext = context.newRecord;

            const executionId = executionContext.id;

            const salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: executionContext.getValue('createdfrom'),
                isDynamic: true
            });

            const xmlFile = file.load({
                id: '4373'
            });
            const xmlContent = xmlFile.getContents();

            const xmlDoc = xml.Parser.fromString({
                text: xmlContent
            });

            const orderIdNode = xmlDoc.getElementsByTagName('OrderID')[0];
            orderIdNode.textContent = salesOrder.getValue('tranid');

            const pdfFile = render.xmlToPdf({
                xmlString: xmlDoc.toString()
            });

            pdfFile.name = 'Orden_' + salesOrder.getValue('tranid') + '.pdf';
            pdfFile.folder = 'ID_DE_LA_CARPETA_DESTINO';
            const pdfFileId = pdfFile.save();

            const pdfUrl = file.load({
                id: pdfFileId
            }).url;

            const form = context.form;

            // Agrega el botón solo si estás viendo la Ejecución de Artículo
            if (executionContext.type === 'customtransaction_orden_articulo') {
                const pdfButton = form.addButton({
                    id: 'custpage_generate_pdf',
                    label: 'Generar PDF',
                    functionName: "window.open('" + pdfUrl + "', '_blank');"
                });

                // Habilita el botón solo en la opción "Ver"
                pdfButton.setEnabled(false);
                pdfButton.setDisabled(!executionContext.getValue('custbody_view_permission'));

                // Crea un script para habilitar el botón solo cuando se cargue la página en la opción "Ver"
                const enableButtonScript = "var viewPermission = nlapiGetFieldValue('custbody_view_permission'); " +
                    "if (viewPermission === 'T') { " +
                    "  document.getElementById('" + pdfButton.id + "').disabled = false; " +
                    "} else { " +
                    "  document.getElementById('" + pdfButton.id + "').disabled = true; " +
                    "}";
                form.clientScriptModulePath = './customscript_pdf_button_cs.js';
                form.clientScriptFileId = createClientScript(enableButtonScript);
            }
        }
    }

    function createClientScript(enableButtonScript) {
        const scriptObj = serverWidget.createScript({
            scriptFile: enableButtonScript
        });
        return scriptObj.id;
    }

    return {
        afterSubmit: afterSubmit
    };
});