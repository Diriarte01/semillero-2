/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Xavier Gonzalez
 */
define(['N/ui/serverWidget', 'N/file', 'N/search'], function (serverWidget, file, search) {
    const handlers = {};

    handlers.subsidiary = () => {
        const type = 'subsidiary', columns = [], filters = [], response = [];
        filters.push(["custrecord_nit_subsidiaria", "greaterthanorequalto", "0"])
        columns.push(search.createColumn({ name: "name", sort: search.Sort.ASC, label: "Nombre" }))
        columns.push(search.createColumn({ name: "custrecord_nit_subsidiaria", label: "NIT De Subsidiaria" }))
        columns.push(search.createColumn({ name: "legalname", label: "Nombre legal" }))
        const subsidiarySearchObj = search.create({ type: type, filters: filters, columns: columns });
        response.push({value: -1, text:'', isSelected: true })
        subsidiarySearchObj.run().each(function (rs) {
            const obj = new Object();
            obj.value = rs.id;
            obj.text = rs.getValue('name');
            obj.isSelected = false;
            return true;
        })
        return response;
    }
    
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
            const empresa = form.addField({ id: 'custpage_s4_company', label: 'Empresa', type: 'select', container: 'custpage_s4_field_group' })
            const dataSubsidiary = subsidiary()
            empresa.isMandatory = true;
            dataSubsidiary.forEach(e => empresa.addSelectOption(e))
            
            const fldAccount = form.addField({
                id: 'custpage_s4_account',
                label: 'Cuenta a Debitar',
                type: 'select',
                container: 'custpage_s4_field_group'
            })

            const fldTypeAccount = form.addField({
                id: 'custpage_s4_type_account',
                label: 'Tipo de cuenta',
                type: 'text',
                container: 'custpage_s4_field_group'
            })

            const fldNumberAccount = form.addField({
                id: 'custpage_s4_number_account',
                label: 'Numero de cuenta',
                type: 'text',
                container: 'custpage_s4_field_group'
            })

            if(params['custpage_s4_company']){
                empresa.defaultValue = params['custpage_s4_company']
            }
            if(params['custpage_s4_account']){
                fldAccount.defaultValue = params['custpage_s4_account']
                const dataAccount = search.lookupFields({
                    type: 'account',
                    id: params['custpage_s4_account'],
                    columns: ['']
                })
            }

        } catch (e) {
            log.audit('Error: ', e.message);
        } finally {
            response.writePage(form)
        }

    }

    return handlers
});
