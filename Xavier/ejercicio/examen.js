/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Xavier Gonzalez
 */
define(['N/ui/serverWidget', 'N/file', 'N/search', 'N/https'], function (serverWidget, file, search, https) {
    const handlers = {};

    const subsidiary = () => {
        const type = 'subsidiary', columns = [], filters = [], response = [];
        filters.push(["custrecord_nit_subsidiaria", "greaterthanorequalto", "0"])
        columns.push(search.createColumn({ name: "namenohierarchy", label: "Nombre (sin jerarquía)" }))
        columns.push(search.createColumn({ name: "custrecord_nit_subsidiaria", label: "NIT De Subsidiaria" }))
        columns.push(search.createColumn({ name: "legalname", label: "Nombre legal" }))
        const subsidiarySearchObj = search.create({ type: type, filters: filters, columns: columns });
        response.push({ value: -1, text: '', isSelected: true })
        subsidiarySearchObj.run().each(function (rs) {
            const obj = new Object();
            obj.value = rs.id;
            obj.text = rs.getValue('namenohierarchy');
            obj.isSelected = false;
            response.push(obj)
            return true;
        })
        return response;
    }
    const searchAccount = (subsidiary) => {
        const response = []
        const accountSearchObj = search.create({
            type: "account",
            filters:
                [
                    ["type", "anyof", "Bank"],
                    "AND",
                    ["custrecord_s4_number_account", "isnotempty", ""],
                    "AND",
                    ["custrecord_s4_type_account", "noneof", "@NONE@"],
                    "AND",
                    ["subsidiary", "anyof", subsidiary]
                ],
            columns:
                [
                    search.createColumn({
                        name: "name",
                        sort: search.Sort.ASC,
                        label: "Nombre"
                    })
                ]
        });
        response.push({ value: -1, text: '', isSelected: true })
        accountSearchObj.run().each(function (rs) {
            const obj = new Object();
            obj.value = rs.id;
            obj.text = rs.getValue('name');
            obj.isSelected = false;
            response.push(obj)
            return true;
        });
        return response;

    }
    const searchTrans = () => {
        const response = [];
        const vendorbillSearchObj = search.create({
            type: "vendorbill",
            filters:
                [
                    ["type", "anyof", "VendBill"],
                    "AND",
                    ["mainline", "any", ""],
                    "AND",
                    ["vendor.custentity_s4_entity_document_number2", "isnotempty", ""]
                ],
            columns:
                [
                    search.createColumn({ name: "amount", label: "Importe" }),
                    search.createColumn({ name: "datecreated", label: "Fecha de creación" }),
                    search.createColumn({
                        name: "companyname",
                        join: "vendor",
                        label: "Nombre de la empresa"
                    }),
                    search.createColumn({
                        name: "custentity_s4_type_document",
                        join: "vendor",
                        label: "Tipo de Documento"
                    }),
                    search.createColumn({
                        name: "custentity_s4_entity_document_number",
                        join: "vendor",
                        label: "Número de documento"
                    }),
                    search.createColumn({
                        name: "custentity_s4_entity_document_number2",
                        join: "vendor",
                        label: "Numero de Cuenta Bancaria"
                    })
                ]
        });

        vendorbillSearchObj.run().each(function (rs) {
            response.push({
                importe: rs.getValue('amount'),
                datecreate: rs.getValue('datecreated'),
                companyname: rs.getValue({ name: "companyname", join: "vendor" }),
                typeDocument: rs.getValue({ name: "custentity_s4_type_document", join: "vendor" }),
                documentNumber: rs.getValue({ name: "custentity_s4_entity_document_number", join: "vendor" }),
                bankNumber: rs.getValue({ name: "custentity_s4_entity_document_number2", join: "vendor" })

            })
            return true;
        });
        return response;
    }
    const createAndDownload = () => {
        let fielTxt = file.create({
            name: 'Archivo SAP.txt',
            fileType: 'PLAINTEXT',
            contents: 'string',
            folder: -15
        })
    }
    handlers.onRequest = (context) => {
        const request = context.request
        const response = context.response
        const params = request.parameters;
        const form = serverWidget.createForm({ title: 'Archivo de Dispersión Tipo SAP Bancolombia' })
        form.clientScriptModulePath = './cs_examen.js';
        try {
            if (request.method == 'GET') {

                /*const fieldGroupBanco = form.addFieldGroup({ id: 'custpage_s4_groupbanco', label: 'Imformacion de Empresa' })*/
                const fieldGroup = form.addFieldGroup({ id: 'custpage_s4_field_group', label: 'Informacion de la empresa' })
                const empresa = form.addField({ id: 'custpage_s4_company', label: 'Empresa', type: 'select', container: 'custpage_s4_field_group' })
                const dataSubsidiary = subsidiary()
                const dataTransaction = searchTrans()
                empresa.isMandatory = true;
                dataSubsidiary.forEach(e => empresa.addSelectOption(e))
                const fldAccount = form.addField({ id: 'custpage_s4_account', label: 'Cuenta a Debitar', type: 'select', container: 'custpage_s4_field_group' })
                const fldTypeAccount = form.addField({ id: 'custpage_s4_type_account', label: 'Tipo de cuenta', type: 'text', container: 'custpage_s4_field_group' })
                const fldNit = form.addField({ id: 'custpage_s4_nit', label: 'NIT de la Empresa', type: 'text', container: 'custpage_s4_field_group' })
                const fldNumberAccount = form.addField({ id: 'custpage_s4_number_account', label: 'Numero de cuenta', type: 'text', container: 'custpage_s4_field_group' })
                const fieldGroupTrans = form.addFieldGroup({ id: 'custpage_s4_field_group_trans', label: 'Informacion de la Transacción' })
                const fieldDateCreation = form.addField({ id: 'custpage_s4_dateacreation', label: 'Fecha de Creación ', type: 'date', container: 'custpage_s4_field_group_trans' })
                const fieldDateAplication = form.addField({ id: 'custpage_s4_dateaplication', label: 'Fecha de Aplicación ', type: 'date', container: 'custpage_s4_field_group_trans' })
                const fieldTypePay = form.addField({ id: 'custpage_s4_typepay', label: 'Tipo de Pago', type: 'select', container: 'custpage_s4_field_group_trans', source: '140' })
                const fieldTypeTrans = form.addField({ id: 'custpage_s4_typetrans', label: 'Tipo de Transacción', type: 'select', container: 'custpage_s4_field_group_trans', source: '142' })
                const fieldDescription = form.addField({ id: 'custpage_s4_description', label: 'Descripción', type: 'text', container: 'custpage_s4_field_group_trans' })
                fieldDescription.maxLength = 10;
                const fieldGroupSublist = form.addFieldGroup({ id: 'custpage_s4_field_group_sublist', label: 'Informacion de Facturas de Compra' })
                const fieldSublist = form.addSublist({ id: 'custpage_s4_sublist', type: serverWidget.SublistType.LIST, label: 'LISTA DE FACTURA DE COMPRA' });
                // fieldSublist.addCheckboxColumn({id: 'custpage_checkbox',label: 'Select'});
                fieldSublist.addField({ id: 'custpage_s4_checkbox', label: 'CHECKBOX', type: serverWidget.FieldType.CHECKBOX })
                fieldSublist.addField({ id: 'custpage_s4_importe', label: 'IMPORTE', type: serverWidget.FieldType.TEXT })
                fieldSublist.addField({ id: 'custpage_s4_datecreate', label: 'FECHA DE CREACION', type: serverWidget.FieldType.TEXT })
                fieldSublist.addField({ id: 'custpage_s4_companyname', label: 'NOMBRE DE PROVEEDOR', type: serverWidget.FieldType.TEXT })
                fieldSublist.addField({ id: 'custpage_s4_typedocument', label: 'TIPO DE DOCUMENTO', type: serverWidget.FieldType.TEXT })
                fieldSublist.addField({ id: 'custpage_s4_numberdocument', label: 'NUMERO DE DOCUMENTO', type: serverWidget.FieldType.TEXT })
                fieldSublist.addField({ id: 'custpage_s4_numberbank', label: 'NUMERO DE CUENTA BANCARIA', type: serverWidget.FieldType.TEXT })
                form.addSubmitButton({ label: 'Guardar dispersión' })
                for (let i = 0; i < dataTransaction.length; i++) {
                    fieldSublist.setSublistValue({ id: 'custpage_s4_importe', line: i, value: dataTransaction[i].importe });
                    fieldSublist.setSublistValue({ id: 'custpage_s4_datecreate', line: i, value: dataTransaction[i].datecreate });
                    fieldSublist.setSublistValue({ id: 'custpage_s4_companyname', line: i, value: dataTransaction[i].companyname });
                    fieldSublist.setSublistValue({ id: 'custpage_s4_typedocument', line: i, value: dataTransaction[i].typeDocument });
                    fieldSublist.setSublistValue({ id: 'custpage_s4_numberdocument', line: i, value: dataTransaction[i].documentNumber });
                    fieldSublist.setSublistValue({ id: 'custpage_s4_numberbank', line: i, value: dataTransaction[i].bankNumber });
                }
                fldTypeAccount.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                fldNit.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                fldNumberAccount.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                // fieldDateCreation.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                fldNit.defaultValue = ' ';
                fldTypeAccount.defaultValue = ' ';
                fldNumberAccount.defaultValue = ' ';
                if (params['custpage_s4_company']) {
                    empresa.defaultValue = params['custpage_s4_company']
                    const dataAccount = searchAccount(params['custpage_s4_company'])
                    const nit = search.lookupFields({
                        type: 'subsidiary',
                        id: params['custpage_s4_company'],
                        columns: 'custrecord_nit_subsidiaria'
                    })['custrecord_nit_subsidiaria']
                    dataAccount.forEach(e => fldAccount.addSelectOption(e))
                    fldNit.defaultValue = nit
                }
                if (params['custpage_s4_account']) {
                    fldAccount.defaultValue = params['custpage_s4_account']
                    const dataAccount = search.lookupFields({
                        type: 'account',
                        id: params['custpage_s4_account'],
                        columns: ['custrecord_s4_type_account', 'custrecord_s4_number_account']

                    })
                    fldTypeAccount.defaultValue = dataAccount['custrecord_s4_type_account'][0].text
                    fldNumberAccount.defaultValue = dataAccount['custrecord_s4_number_account']
                }
                if (params['custpage_s4_dateacreation']) {
                    fieldDateCreation.defaultValue = params['custpage_s4_dateacreation']
                }
                if (params['custpage_s4_dateaplication']) {
                    fieldDateAplication.defaultValue = params['custpage_s4_dateaplication']
                }
                if (params['custpage_s4_typepay']) {
                    fieldTypePay.defaultValue = params['custpage_s4_typepay']
                }
                if (params['custpage_s4_typetrans']) {
                    fieldTypeTrans.defaultValue = params['custpage_s4_typetrans']
                } if (params['custpage_s4_description']) {
                    fieldDescription.defaultValue = params['custpage_s4_description']
                }
                response.writePage(form)
            } else {
                let body = '';
                const line = request.getLineCount({ group: 'custpage_s4_sublist' });
                form.title = 'Archivo Generado con Exito';


                const internal_id = form.addField({ id: 'custpage_s4_internalid', label: 'ID Interno', type: 'text', })
                internal_id.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN });

                // const fldType = form.addField({ id: fields.type, label: 'type', type: 'text' })
                // fldType.defaultValue = 'bogota';
                // fldType.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN });

                /* Encabezado del documeno */
                const dateCreate = new Date()
                const fix = params['custpage_s4_dateaplication'];
                const fix2 = params['custpage_s4_dateacreation']
                let total = 'son10carac'
                let numTrans = 'x'
                let header = '1';
                // log.audit('params: ', params)
                header += (params['custpage_s4_nit']).padStart(10, '0');
                header += (params['inpt_custpage_s4_company']).padEnd(16, ' ')
                header += (params['inpt_custpage_s4_typepay']).slice(0, 3)
                header += (params['custpage_s4_description']).padEnd(10, ' ')
                header += (fix2.slice(2, 4) + fix2.slice(5, 7) + fix2.slice(8, 10));
                header += 'C'
                header += (fix.slice(2, 4) + fix.slice(5, 7) + fix.slice(8, 10));
                header += '00000';
                header += numTrans;
                header += '00000000000000';
                header += total;
                header += (params['custpage_s4_number_account']).padStart(11, '0');
                header += (params['custpage_s4_type_account']).slice(0, 1)
                header += '\n';
                log.audit('header: ', header)
                let cont = 0
                let cont2 = 0
                let line2 = ''
                for (let i = 0; i < line; i++) {
                    const check = request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_checkbox' })
                    if (check == 'T') {
                        const amount_payment = request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_importe' });
                        line2 += '6';
                        line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_numberdocument' })).padStart(15, '0');
                        line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_companyname' })).padEnd(18, ' ');;
                        line2 += '000001007';
                        line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_numberbank' })).padStart(17, '0')
                        line2 += 'S'
                        line2 += (params['inpt_custpage_s4_typetrans']).slice(0, 2)
                        line2 += ((parseFloat(amount_payment).toFixed(2)).padStart(11, '0').replace('.', ''));
                        line2 += '                      ';
                        line2 += '\n';
                        header += line2;
                        cont +=1
                        cont2 += ((parseFloat(amount_payment).toFixed(2)).padStart(10, '0').replace('.', ''));

                    }
                }
                header = header.replace(total, cont2)
                header = header.replace(numTrans, cont)
                
                const archivo = file.create({
                    name: 'Archivo SAP.txt',
                    fileType: 'PLAINTEXT',
                    contents: header,
                    folder: -15
                })
                response.writeFile({
                    file: archivo,
                    isInline: false
                });

                log.audit('line2: ', line2)
                log.audit('header: ', header)

            }



        } catch (e) {
            log.audit('Error: ', e.message);
        } finally {
        }

    }

    return handlers
});
