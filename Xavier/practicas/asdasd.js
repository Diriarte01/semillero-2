const line = request.getLineCount({ group: fldsublist.id });
                    Form.title = 'Archivo Generado con Exito - Banco Bogota';


                    const internal_id = Form.addField({ id: fields.internal_id ,label: 'ID Interno',type: 'text',})
                    internal_id.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN });

                    const fldType = Form.addField({  id: fields.type, label: 'type', type: 'text' })
                    fldType.defaultValue  = 'bogota';
                    fldType.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN });

                    /* Encabezado del documeno */
                    const fix = params[fields.date_effective];
                    let header = '1';
                    header += (fix.slice(0, 4) + fix.slice(5, 7) + fix.slice(-2));
                    header += '00000000000000000000000';
                    header += params[fields.type_account_origin] == 'Ahorros'? '02': '01'
                    header += (params[fields.number_account_origin]).padStart(17,'0');
                    header += (params[fields.name_origin]).padEnd(40, ' ');
                    header += (params[fields.number_id]).padStart(11,'0');
                    header += (params['inpt_'+ fields.type_payment]).slice(0, 3);
                    header += (params[fields.code_city]).slice(0, 4);
                    header += commons.dateTime('YYYYMMDD', null);
                    header += '610';
                    header += 'N';
                    header += ''.padStart(128,' ');
                    header += ' ' + '\n';

                    const user = runtime.getCurrentUser().name;
                    const recordParent = record.create({ type: 'customrecord_hb_bank_documents', isDynamic: true });
                    recordParent.setValue('altname', 'pagos - ' + commons.dateTime('YYYYMMDD', '/') + ' - ' + user);
                    recordParent.setValue('custrecord_hb_bank_phase', '1');
                    recordParent.setValue('custrecord_hb_bank_entity', '1');
                    const recordId = recordParent.save();
                    internal_id.defaultValue = recordId;
                    const payload = [];

                    Form.addButton({ id: 'custpage_dowload', label: 'Descargar', functionName: 'downloadFormTxt();'});
                    Form.addButton({ id: 'custpage_dowload', label: 'Descargar PGP', functionName: 'messagePGP()'});
                    Form.addButton({ id: 'custpage_init', label: 'Inicio', functionName: 'returnInit();'});

                    const fieldhtml = Form.addField({ id: fields.fieldHtml, label: ' ',  type: 'inlinehtml' });
                    let html ='';
                    html+= `
                    <head>
                    <meta charset="UTF-8">
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;500;700;800&display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous"/>
                    <style>
                        .saludo{
                            color: #6401CD;
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        }

                        .login-data {
                            text-align: center;
                        }
                
                    </style>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Pagina de Descarga</title>
                    </head>
                    <body>
                        <main class="login-desing">
                            <div class="login">
                                <div class="login-data">
                                    <img src="https://7633216-sb1.app.netsuite.com/core/media/media.nl?id=16736&c=7633216_SB1&h=vU4CdxBOyVuWJlvF6kS5bJ0uhi7hR-Lm1NxR_RMCy1W4bPw_" width="400">
                                    <h1>👋<spam class ="saludo">!!Archivo Generado Exitosamente!!</spam>​🏡​</h1>
                                </div>
                            </div>
                        </main>
                    </body>
                    <script>
                    </script>
                    </html>
                    `
                    fieldhtml.defaultValue = html;

                    for (let i = 0; i < line; i++) {
                        const check = request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.check })
                        if (check == 'T') {
                            let line = '';
                            const amount_payment = request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.amount_payment });
                            line += '2';
                            line += request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.type_id });
                            line += (request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.number_id })).padStart(11,'0');;
                            line += (request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.name_beneficiary })).padEnd(40,' ');
                            line += (request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.account_type })).slice(0, 2);
                            line += (request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.number_account })).padEnd(17,' ');
                            line += ((parseFloat(amount_payment).toFixed(2)).padStart(19,'0').replace('.', ''));
                            line += 'A';
                            line += '000';
                            line += request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.list_bank }).slice(0, 3);
                            line += request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.code_city });
                            line += (request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.pay_message })).padEnd(79,' ');
                            line += '0'
                            line += (request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.number_invoice })).padStart(10,'0');
                            line += 'N';
                            line += '                                               ';
                            line += 'N';
                            line += '         ';
                            line += '\n';
                            header += line;
                            /Datos para el Map-Reduce y creacion de Registro/
                            const object = new Object();
                            object.type_transaction = (request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.transaction_type }));
                            object.recordId = request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.internal_id });
                            object.vendor_id = request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.benefeciary_internal_id });
                            object.vendor_name = request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.name_beneficiary });
                            object.reference = request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.number_invoice });
                            object.amount = request.getSublistValue({ group: fldsublist.id, line: i, name: fldsublist.fields.amount_payment });
                            object.parent = recordId;
                            payload.push(object);
                        }

                    }
                    record.load({
                        type: 'customrecord_hb_bank_documents',
                        id: recordId,
                    })
                    .setValue('custrecord_hb_bank_body_request', header + '!')
                    .save({ enableSourcing: true, ignoreMandatoryFields: true })
                    /* record.submitFields({
                        type: 'customrecord_hb_bank_documents',
                        id: recordId,
                        values: {
                            custrecord_hb_bank_body_request: header
                        }
                    }) */

                    const mrTask = task.create({
                        taskType: task.TaskType.MAP_REDUCE,
                        params: { 'custscript_hb_mr_payment_docs': payload },
                        scriptId: 'customscript_hb_mr_create_document'
                    });
                    const mrTaskId = mrTask.submit();
                    function documentBank(params) {

                        let header;
                        let numberIdenty = 1 + ('0000000000' + params.numberIdenty).slice(-10);
                        let nameCompany = (params.nameCompany + '                ').slice(0, 16);
                        let payCode = params.payCode;
                        let concept = (params.concept + '          ').slice(0, 10)
                        let data = new Date();
                        let data1 = (data.getFullYear().toString()).slice(-2) + (data.getMonth() + 1) + data.getDate();
                        let data2 = (data.getFullYear().toString()).slice(-2) + (data.getMonth() + 1) + (data.getDate() + 1);
                        let numberLine = ('000000' + params.numberLine).slice(-6);
                        let amount = ('000000000000000000000000' + params.amount).slice(-24);
                        let numberCount = ('00000000000' + params.numberCount).slice(-11)
                        let typeCount = 'S'
                        header = numberIdenty + nameCompany + payCode + concept + data1 + 'C' + data2 + numberLine + amount + numberCount + typeCount
            
                        let files = file.create({
                            name: 'Archivo Pila.txt',
                            fileType: file.Type.PLAINTEXT,
                            contents: header + '\n',
                            encoding: file.Encoding.WINDOWS_1252,
                            folder: -15,
                            isOnline: true
                        })
            
                        for(let i = 0; i < params.payments.length; i++){
                            log.debug('pagos', params.payments[i])
                           let body;
                           let identy = 6 + ('000000000000000' + params.payments[i].numberBank).slice(-15);
                           let name = (params.payments[i].employee + '                  ').slice(0, 18);
                           let codeBank = ('000000000' + 1507).slice(-9)
                           let numberBank = ('00000000000000000' + params.payments[i].numberBank).slice(-17)
                           let netPayment = ('0000000000' + params.payments[i].amount).slice(-10)
                           body = identy + name + codeBank + numberBank + 'S' + 37 + netPayment + 'Nomina'
                           let count = (header.length) - (body.length)
                           log.debug('Diferencia',count);
                           for (let j = 0; j < count; j++){
                               body += ' '
                           }
                           log.debug('Tamaño del Body', body.length)
                            files.appendLine({
                                value: body
                            })
                        }
            
                       
                        return files;
            
                    }