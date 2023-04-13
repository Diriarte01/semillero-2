/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Xavier Gonzalez
 */
define(['N/ui/serverWidget', 'N/file', 'N/search'], function (serverWidget, file, search) {
    const handlers = {};
    handlers.onRequest = (context) => {
        const request = context.request
        const response = context.response
        const params = request.parameters;
        const form = serverWidget.createForm({ title: 'Archivo de Disperción Tipo SAP Bancolombia' })
        try {
            /*const fieldGroupBanco = form.addFieldGroup({ id: 'custpage_s4_groupbanco', label: 'Imformacion de Empresa' })*/
            const fieldGroup = form.addFieldGroup({
                id: 'custpage_s4_field_group',
                label: 'Informacion de la empresa',
            })
            let empresa = form.addField({ id: 'custpage_s4_company', label: 'Empresa', type: 'select' })
            const subsidiaryResul = [];
            let subsidiarySearchObj = search.create({
                type: "subsidiary",
                filters:
                    [
                        ["custrecord_nit_subsidiaria", "greaterthanorequalto", "0"]
                    ],
                columns:
                    [
                        search.createColumn({
                            name: "name",
                            sort: search.Sort.ASC,
                            label: "Nombre"
                        }),
                        search.createColumn({ name: "custrecord_nit_subsidiaria", label: "NIT De Subsidiaria" }),
                        search.createColumn({ name: "legalname", label: "Nombre legal" })
                    ]
            });
            let searchResultCount = subsidiarySearchObj.runPaged().count;
            log.debug("subsidiarySearchObj result count", searchResultCount);
            subsidiarySearchObj.run().each(function (result) {
                subsidiaryResul.push({ internalId: result.id, name: result.getValue('name') })
                return true;
            });
            for (let i = 0; i < subsidiaryResul.length; i++) {
                empresa.addSelectOption({ value: subsidiaryResul[i].internalId, text: subsidiaryResul[i].name })
            }
            empresa.isMandatory = true;
            const value = empresa.getValue('value');
            log.audit('value', value)
            let nitEmpresa = form.addField({
                id: 'string*',
                label: 'string*',
                type: 'currency'})



        } catch (e) {
            log.audit('Error: ', e.message);
        } finally {
            response.writePage(form)
        }

    }

    return handlers
});
