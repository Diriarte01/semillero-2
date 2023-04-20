/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Xavier Gonzalez
 */
define(['N/ui/serverWidget', 'N/file', 'N/search', 'N/https', 'N/task', 'N/redirect'], function (serverWidget, file, search, https, task, redirect) {
    const handlers = {};

    const subsidiary = () => {
        const type = 'subsidiary', columns = [], filters = [], response = [];
        filters.push(["custrecord_nit_subsidiaria", "isnotempty", ""])
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
                    ["subsidiary", "anyof", subsidiary],
                    "AND",
                    ["custrecord_s4_type_bank", "anyof", "1"]
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
    const response = [];
    const searchTrans = (subsidiary) => {
        const vendorbillSearchObj = search.create({
            type: "vendorbill",
            filters:
                [
                    ["type", "anyof", "VendBill"],
                    "AND",
                    ["mainline", "any", ""],
                    "AND",
                    ["vendor.custentity_s4_entity_document_number2", "isnotempty", ""],
                    "AND",
                    ["subsidiary", "anyof", subsidiary],
                    "AND",
                    ["amountremaining", "greaterthan", "0.00"]
                ],
            columns:
                [
                    search.createColumn({ name: "amount", label: "Importe" }),
                    search.createColumn({ name: "datecreated", label: "Fecha de creación" }),
                    search.createColumn({ name: "amountremaining", label: "Importe restante" }),
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
                    }),
                    search.createColumn({
                        name: "custentity_s4_cod_bank",
                        join: "vendor",
                        label: "Codigo de banco"
                    }),
                    search.createColumn({
                        name: "internalid",
                        join: "vendor",
                        label: "ID interno"
                    })
                ]
        });

        vendorbillSearchObj.run().each(function (rs) {
            response.push({
                internalId: rs.id,
                importe: rs.getValue('amountremaining'),
                datecreate: rs.getValue('datecreated'),
                companyname: rs.getValue({ name: "companyname", join: "vendor" }),
                typeDocument: rs.getText({ name: "custentity_s4_type_document", join: "vendor" }),
                documentNumber: rs.getValue({ name: "custentity_s4_entity_document_number", join: "vendor" }),
                bankNumber: rs.getValue({ name: "custentity_s4_entity_document_number2", join: "vendor" }),
                codeBank: rs.getText({ name: "custentity_s4_cod_bank", join: "vendor" }),
                vendorId: rs.getValue({ name: "internalid", join: "vendor" }),
            })
            return true;
        });
        return response;
    }

    handlers.onRequest = (context) => {
        const request = context.request
        const response = context.response
        const params = request.parameters;
        const form = serverWidget.createForm({ title: 'Archivo de Dispersión Tipo SAP Bancolombia' })
        form.clientScriptModulePath = './cs_examen.js';
        try {
            if (request.method == 'GET') {
                if (params['fileId']) {
                    const fileSap = file.load({
                        id: params['fileId']
                    })
                    response.writeFile({
                        file: fileSap,
                        isInline: false
                    });
                } else {

                    /*const fieldGroupBanco = form.addFieldGroup({ id: 'custpage_s4_groupbanco', label: 'Imformacion de Empresa' })*/
                    const fieldGroup = form.addFieldGroup({ id: 'custpage_s4_field_group', label: 'Informacion de la subsidiaria' })
                    const empresa = form.addField({ id: 'custpage_s4_company', label: 'Subsidiaria', type: 'select', container: 'custpage_s4_field_group' })
                    const dataSubsidiary = subsidiary()
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
                    // const fieldTypeTrans = form.addField({ id: 'custpage_s4_typetrans', label: 'Tipo de Transacción', type: 'select', container: 'custpage_s4_field_group_trans', source: '142' })
                    const fieldDescription = form.addField({ id: 'custpage_s4_description', label: 'Descripción', type: 'text', container: 'custpage_s4_field_group_trans' })
                    fieldDescription.maxLength = 10;

                    const fieldGroupSublist = form.addFieldGroup({ id: 'custpage_s4_field_group_sublist', label: 'Informacion de Facturas de Compra' })
                    const fieldSublist = form.addSublist({ id: 'custpage_s4_sublist', type: serverWidget.SublistType.LIST, label: 'LISTA DE FACTURA DE COMPRA' });
                    fieldSublist.addMarkAllButtons();
                    // fieldSublist.addCheckboxColumn({id: 'custpage_checkbox',label: 'Select'});
                    fieldSublist.addField({ id: 'custpage_s4_checkbox', label: 'CHECKBOX', type: serverWidget.FieldType.CHECKBOX })
                    fieldSublist.addField({ id: 'custpage_s4_id', label: 'ID', type: serverWidget.FieldType.TEXT })
                    const fieldAmount = fieldSublist.addField({ id: 'custpage_s4_importe', label: 'IMPORTE RESTANTE', type: serverWidget.FieldType.CURRENCY })
                    fieldSublist.addField({ id: 'custpage_s4_datecreate', label: 'FECHA DE CREACIÓN', type: serverWidget.FieldType.TEXT })
                    const fieldCompany = fieldSublist.addField({ id: 'custpage_s4_companyname', label: 'NOMBRE DE PROVEEDOR', type: serverWidget.FieldType.TEXT })
                    fieldSublist.addField({ id: 'custpage_s4_idvenndor', label: 'ID DE PROVEEDOR', type: serverWidget.FieldType.TEXT })
                    fieldSublist.addField({ id: 'custpage_s4_typedocument', label: 'TIPO DE DOCUMENTO', type: serverWidget.FieldType.TEXT })
                    fieldSublist.addField({ id: 'custpage_s4_numberdocument', label: 'NUMERO DE DOCUMENTO', type: serverWidget.FieldType.TEXT })
                    fieldSublist.addField({ id: 'custpage_s4_numberbank', label: 'NUMERO DE CUENTA BANCARIA', type: serverWidget.FieldType.TEXT })
                    fieldSublist.addField({ id: 'custpage_s4_codebank', label: 'CODIGO DE BANCO', type: serverWidget.FieldType.TEXT })
                    const fieldReference = fieldSublist.addField({ id: 'custpage_s4_reference', label: 'REFERENCIA', type: serverWidget.FieldType.TEXT })
                    const fieldReConcept = fieldSublist.addField({ id: 'custpage_s4_concept', label: 'CONCEPTO', type: serverWidget.FieldType.TEXT })
                    const typeTrans = fieldSublist.addField({ id: 'custpage_s4_typetrans1', label: 'TIPO DE TRANSACCIÓN', type: serverWidget.FieldType.SELECT })
                    // fieldCompany.maxLength = 10;
                    typeTrans.isMandatory = true;
                    const options = [
                        { value: '37', text: 'Abono a cuenta de ahorros' },
                        { value: '27', text: 'Abono a cuenta corriente' },
                        { value: '23', text: 'Pre-notificación cuenta corriente' },
                        { value: '25', text: 'Pago en efectivo' },
                        { value: '33', text: 'Pre-notificación cuenta ahorros' },
                        { value: '40', text: 'Efectivo seguro/Tarjeta prepago' },
                        { value: '52', text: 'Abono a depósito electrónico' },
                        { value: '53', text: 'Pre-notificación depósito electrónico' }
                    ];
                    for (let i = 0; i < options.length; i++) {
                        typeTrans.addSelectOption({ value: options[i].value, text: options[i].text });
                    }
                    form.addSubmitButton({ label: 'Guardar dispersión' })

                    log.audit('typeTrans: ', typeTrans)
                    fieldAmount.updateDisplayType({ displayType: serverWidget.FieldDisplayType.ENTRY });
                    fieldAmount.maxLength = 10;
                    fieldReference.updateDisplayType({ displayType: serverWidget.FieldDisplayType.ENTRY });
                    fieldReference.maxLength = 12;
                    fieldReConcept.updateDisplayType({ displayType: serverWidget.FieldDisplayType.ENTRY });
                    fieldReConcept.maxLength = 9;
                    fldTypeAccount.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                    fieldDateCreation.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                    fldNit.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                    fldNumberAccount.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                    // fieldDateCreation.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
                    fldNit.defaultValue = ' ';
                    fldTypeAccount.defaultValue = ' ';
                    fieldDateCreation.defaultValue = new Date();
                    fldNumberAccount.defaultValue = ' ';
                    if (params['custpage_s4_company']) {
                        empresa.defaultValue = params['custpage_s4_company']
                        const dataTransaction = searchTrans(params['custpage_s4_company'])
                        const dataAccount = searchAccount(params['custpage_s4_company'])
                        const nit = search.lookupFields({
                            type: 'subsidiary',
                            id: params['custpage_s4_company'],
                            columns: 'custrecord_nit_subsidiaria'
                        })['custrecord_nit_subsidiaria']
                        for (let i = 0; i < dataTransaction.length; i++) {
                            fieldSublist.setSublistValue({ id: 'custpage_s4_id', line: i, value: dataTransaction[i].internalId });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_importe', line: i, value: dataTransaction[i].importe });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_datecreate', line: i, value: dataTransaction[i].datecreate });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_companyname', line: i, value: (dataTransaction[i].companyname).slice(0, 16) });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_typedocument', line: i, value: dataTransaction[i].typeDocument });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_numberdocument', line: i, value: dataTransaction[i].documentNumber });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_numberbank', line: i, value: dataTransaction[i].bankNumber });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_codebank', line: i, value: dataTransaction[i].codeBank });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_idvenndor', line: i, value: dataTransaction[i].vendorId });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_reference', line: i, value: ' ' });
                            fieldSublist.setSublistValue({ id: 'custpage_s4_concept', line: i, value: ' ' });
                        }
                        dataAccount.forEach(e => fldAccount.addSelectOption(e))
                        fldNit.defaultValue = nit
                    }
                    if (params['custpage_s4_account'] && params['custpage_s4_account'] != -1) {
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
                    // if (params['custpage_s4_typetrans']) {
                    //     fieldTypeTrans.defaultValue = params['custpage_s4_typetrans']} 
                    if (params['custpage_s4_description']) {
                        fieldDescription.defaultValue = params['custpage_s4_description']
                    }
                    response.writePage(form)
                }
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
                const paramsMap = []
                const dateCreate = new Date()
                const fix = params['custpage_s4_dateaplication'];
                const fix2 = params['custpage_s4_dateacreation']
                let total = 'son10carac'
                let numTrans = 'xxxxxx'
                let header = '1';
                // log.audit('params: ', params)
                header += (params['custpage_s4_nit']).padStart(10, '0');
                header += (params['inpt_custpage_s4_company']).padEnd(16, ' ')
                header += (params['inpt_custpage_s4_typepay']).slice(0, 3)
                header += (params['custpage_s4_description']).padEnd(10, ' ')
                header += (fix2.slice(2, 4) + fix2.slice(5, 7) + fix2.slice(8, 10));
                header += 'C'
                header += (fix.slice(2, 4) + fix.slice(5, 7) + fix.slice(8, 10));
                header += numTrans;
                header += '00000000000000';
                header += total;
                header += (params['custpage_s4_number_account']).padStart(11, '0');
                header += (params['custpage_s4_type_account']).slice(0, 1)
                header += '\n';
                log.audit('header: ', header)

                let cont = 0
                let cont2 = 0
                for (let i = 0; i < line; i++) {
                    const check = request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_checkbox' })
                    if (check == 'T') {
                        let line2 = ''

                        // const typeTrans =(params['inpt_custpage_s4_typetrans']).slice(0, 2)
                        const trans = request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_typetrans1' })
                        log.audit('trans: ', trans)
                        const amount_payment = request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_importe' });
                        line2 += '6';
                        line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_numberdocument' })).padStart(15, '0');
                        line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_companyname' })).padEnd(18, ' ');
                        line2 += ((request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_codebank' })).slice(0, 4)).padStart(9, '0');
                        line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_numberbank' })).padStart(17, '0')
                        line2 += 'S'
                        line2 += trans
                        line2 += (Math.round(amount_payment).toString()).padStart(10, '0');/*((parseFloat(amount_payment).toFixed(2)).padStart(11, '0').replace('.', ''));*/
                        if (trans == '25') {
                            line2 += '  '
                            line2 += ((request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_typedocument' })).slice(0, 1)).padStart(6, '0')
                            line2 += ' '
                        } else {
                            line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_concept' })).padEnd(9, ' ')
                        }
                        line2 += (request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_reference' })).padEnd(12, ' ')
                        line2 += '\n';
                        header += line2;
                        cont += 1
                        cont2 += Math.round(amount_payment)
                        // (Math.round(amount_payment).toString()).padStart(9, '0');
                        const obj = new Object();
                        obj.id = request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_id' })
                        obj.subsidiary = params['custpage_s4_company']
                        obj.vendorId = request.getSublistValue({ group: 'custpage_s4_sublist', line: i, name: 'custpage_s4_idvenndor' })
                        obj.amount = amount_payment
                        obj.date = (fix2.slice(2, 4) + fix2.slice(5, 7) + fix2.slice(8, 10));
                        obj.account = params['custpage_s4_account']
                        paramsMap.push(obj);

                    }
                }
                const mapTask = task.create({
                    taskType: task.TaskType.MAP_REDUCE,
                    params: { 'custscript_s4_parammap_xg': paramsMap },
                    scriptId: 'customscript_s4_mr_examen_xg',

                });
                const mapTaskId = mapTask.submit();

                log.audit('params', paramsMap)
                cont2 = (cont2.toString()).padStart(10, '0');
                log.audit('cont2: ', cont2);
                cont = (cont.toString()).padStart(6, '0');
                header = header.replace(total, cont2)
                header = header.replace(numTrans, cont)

                const fileSap = file.create({
                    name: 'Archivo SAP.txt',
                    fileType: 'PLAINTEXT',
                    contents: header,
                    folder: -15,
                    encoding: file.Encoding.UTF8
                }).save()
                let taskStatus;
                let cont3 = 0;
                do {
                    taskStatus = task.checkStatus(mapTaskId).status
                    if (taskStatus === 'COMPLETE' || taskStatus === 'FAILED') {
                        cont3 = cont3 + 1;
                        log.debug('Coronamos', "Vaya tilin, eso tilin, Wao tilin, a la verga tilin");
                    }
                } while (cont3 < 1);
                redirect.toSuitelet({
                    deploymentId: 'customdeploy_s4_examen_xg',
                    scriptId: "customscript_s4_examen_xg",
                    isExternal: false,
                    parameters: {
                        fileId: fileSap
                    }
                })

                // response.writeFile({
                //     file: fileSap,
                //     isInline: false
                // }); 
            }



        } catch (e) {
            log.audit('Error: ', e.message);
        } finally {
        }

    }

    return handlers
});
