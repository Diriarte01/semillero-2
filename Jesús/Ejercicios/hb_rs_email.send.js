/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define(['N/email', 'N/record', 'N/search', 'N/file', 'N/render'],
    function (email, record, search, file, render) {

        const info = {
            HABI: {
                legal_name: 'INVERSIONES MCN S.A.S',
                number_id: '901.303.824-1',
                addres: 'CLL 93B # 16-47 PISO 2',
                city: 'BOGOTA - COLOMBIA',
                email: 'compras@habi.co'
            },
            TUHABI: {
                legal_name: 'CORPORATIVO MCNEMEXICO S. DE R. L. DE CV',
                number_id: 'CMC210701L19',
                addres: 'Av Paseo de la Reforma 296, Piso 35, Col',
                city: 'Juarez, Del Cuauhtemoc, CDMX, 06600',
                email: 'comprasmx@tuhabi.mx'
            }
        }

        const formatCurrency = (number) => {
            number = Math.round(number * 100) / 100;
            const part = number.toString().split(".");
            let wholepart = part[0];
            const decimal = part.length > 1 ? part[1] : "00";
            wholepart = wholepart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            const formattedNumber = wholepart + "," + decimal;
            return formattedNumber;
        }

        const searchAddress = (internalId) => {
            const vendorSearchObj = search.create({
                type: "vendor",
                filters:
                    [
                        ["internalid","anyof",internalId]
                    ],
                columns:
                    [
                        search.createColumn({
                            name: "custrecord_streetname",
                            join: "Address",
                            label: "Street Name"
                        }),
                        search.createColumn({
                            name: "custrecord_streetnum",
                            join: "Address",
                            label: "Street Number"
                        })
                    ]
            });
            const rs = vendorSearchObj.run().getRange({  start: 0,  end: 1 });
            log.debug('rs', rs)
            const address = rs[0].getValue({name: "custrecord_streetname", join: "Address"}) +' '+ rs[0].getValue({name: "custrecord_streetnum", join: "Address"})
            return address || '';
        }

        const messageEmail = (subsidiary) => {
            let html = '';
            html += `<p><span style="font-size: 36px;"><img src="https://app-storage-service.pipefy.com/v1/signed/orgs/a887472d-9488-412e-aadf-e6dca0dd566d/uploads/faaabb6e-e826-439a-aacd-5193b8f5923e/Group%207912%20%281%29.png?signature=vi3Zv1FRjUOgOE%2BmqXTiS4riOy3W7%2ByCUzdbFatH6Wc%3D" data-pfy-path-url="orgs/a887472d-9488-412e-aadf-e6dca0dd566d/uploads/faaabb6e-e826-439a-aacd-5193b8f5923e/Group 7912 (1).png"  width="700px" height="100px"/></span></p>`
            html += `<p><span style="color: #293e52; font-family: -apple-system, 'system-ui', 'segoe ui', Roboto, Oxygen, Ubuntu, Cantarell, 'open sans', 'helvetica neue', sans-serif; font-size: 16px; background-color: #ffffff; float: none; display: inline;"><strong>Estimado Proveedor</strong>,</span></p>`
            html += `<p> </p>`
            html += `<p><span style="color: #293e52; font-size: 16px;"><span style="font-family: Inter, -apple-system, 'system-ui', 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; background-color: #ffffff; float: none; display: inline;"><span style="font-family: Inter, -apple-system, system-ui, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif;">Encuentre adjunto la orden de compra del bien o servicio por el cual se le contrato.</p>`
            html += `<p> </p>`
            html += `<p><span style="color: #293e52; font-size: 16px;"><span style="color: #3b5bfd;"><span style="color: #293e52;"><u>Por favor tenga presente la circular adjunta para radicar la factura electrónica</u>.</span> </span></span></p>`
            html += `<p> </p>`
            html += `<p><span style="font-size: 16px;">Atentamente,</span></p>`
            if (subsidiary == '9') {
                html += `<p><span style="font-size: 36px;"><img src="https://7633216-sb1.app.netsuite.com/core/media/media.nl?id=30024&c=7633216_SB1&h=qHS7KmxFCEuVqL4LHxDNM9zNyx6DSI2_I21_A6NFJYMBtj5e&fcts=20230509081747&whence=" /></span></p>`
            } else {
                html += `<p><span style="width:210px;height:110px; font-size: 36px;"><img src="https://7633216-sb1.app.netsuite.com/core/media/media.nl?id=30312&c=7633216_SB1&h=6zBrwgIKJFLcO88O9CSnLiFiVCxbrxkbYR8GiDlhVWrH-nrY" style="width:600px;height:150px"/></span></p>`
            }
            return html
        }

        const renderOcHabi = (context) => {
            const recordOc = record.load({ type: 'purchaseorder', id: context.internalId, isDynamic: true, });
            const line = recordOc.getLineCount({ sublistId: 'item' });
            const subsidiary = recordOc.getValue('subsidiary');
            const option = subsidiary == '9' ? 'HABI' : 'TUHABI';
            let emitter = '25419'
            let currency = {
                plural: 'PESOS COLOMBIANOS', //'PESOS', 'Dólares', 'Bolívares', 'etcs'
                singular: 'PESO COLOMBIANO', //'PESO', 'Dólar', 'Bolivar', 'etc'
                centPlural: 'CENTAVOS',
                centSingular: 'CENTAVO'
            }
            if (option != 'HABI') {
                currency.plural = 'PESOS MEXICANOS',
                currency.singular = 'PESO MEXICANOS'
                emitter = '25418'
            }
            const bodyEmail = messageEmail(subsidiary)
            const providerId = recordOc.getValue('entity');
            const dateEmission = recordOc.getText('trandate');
            const expirationDate = recordOc.getText('duedate');
            const terms = recordOc.getText('terms');
            const numerDocument = recordOc.getValue('tranid');
            const data_provider = record.load({ type: 'vendor', id: providerId })
            const vendorName = data_provider.getValue('companyname');
            const vendor_number = data_provider.getValue('custentity_co_identification_num') ? data_provider.getValue('custentity_co_identification_num') : data_provider.getValue('custentity_mx_rfc');
            const vendorAddress = searchAddress(providerId)
                let html = `<?xml version="1.0"?>
         <!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">
         <pdf>
         <head>
         <meta charset="UTF-8"></meta>
         <title>Orden de Compra</title>
         <style>
         body {
             font-family: Arial, sans-serif;
             margin: 40px 20px 20px 20px;
             padding: 0;
         }
         
         td {
             font-size: 12px;
             border-bottom: 1px solid #ddd;
         }
         
         table {
                         border-collapse: collapse;
                         width: 100%;
                         margin-bottom: 5px;
                     }
                     
                     th {
                         font-size: 14px;
                         background-color: #f2f2f2;
                         padding: 8px;
                         text-align: left;
                     }
                     
                     .invoice-total {
                         background-color: #f2f2f2;
                     }
                     
                     .valor-en-letras p {
                         font-size: 12px;
                     }
                     
                     .invoice-info p {
                         margin: 5px 0;
                     }
                                          
                     .valor {
                         margin-bottom: 20px;
                     }
                     
                     </style>
                     </head>
                     
                     <body>
                     
                     <table border="none">
                         <tr border="none">
                         <td border="none"  align="center">`
            if (option == 'HABI') {
                html += `<img src="https://bucket-images-strapi-prod.s3.us-east-2.amazonaws.com/54245203106f449cb792dd500866a183_7676092ae2.jpg"
                             alt="Logo de la empresa" style="width:210px;height:110px;"></img>`
            } else {
                html += `<img src="https://amaterasu-docs-images.s3.amazonaws.com/tuhabi.jpg"
                             alt="Logo de la empresa" style="width:140px;height:110px;"></img>`
            }

            html += `</td>
                            <td colspan="2" margin-top="20px" margin-left="-20px" border="none" align="center">
                                <p><strong>${info[option].legal_name}</strong></p>
                                <p margin="0px">${info[option].number_id}</p>
                                <p margin="0px">${info[option].addres}</p>
                                <p margin="0px">${info[option].city}</p>
                                <p margin="0px">${info[option].email}</p>
                            </td>
                            <td border="none" align="center"  margin-top="20px" ><h2 font-size="20px">Orden de Compra</h2></td>
                         </tr>
                         </table>
                         <table border="none" margin-top="20px">
                            <tr border="none">
                                <td colspan="2" margin-right="10px" border="none" width="50%">
                                    <p><strong>Proveedor:</strong> ${vendorName}</p>`
            if (option == 'HABI') {
                html += `<p><strong>NIT:</strong> ${vendor_number}</p>`;
            } else {
                html += `<p><strong>RFC:</strong> ${vendor_number}</p>`;
            }
            html += `<p><strong>Dirección Principal:</strong>${vendorAddress}</p>
                                     <p><strong>Contacto:</strong></p>
                                </td>
                                <td colspan="2" border="none" margin-left="30px" width="50%">
                                    <p><strong>Fecha de Emisión:</strong> ${dateEmission}</p>
                                    <p><strong>Fecha de Vencimiento:</strong> ${expirationDate}</p>
                                    <p><strong>Condiciones de Pago:</strong> ${terms}</p>
                                    <p><strong>N. Orden: </strong>${numerDocument}</p>
                                    <p><strong>Solicitante: </strong></p>
                                 </td>
                            </tr>
                        </table>
                             <table class="invoice-items" margin-top="20px" >
                                <tr>
                                    <th>#</th>
                                    <th align="center"  font-size="12px">Artículo</th>
                                    <th align="center" font-size="12px">Descripción</th>
                                    <th align="center" font-size="12px">NID</th>
                                    <th align="center" font-size="12px">Cant</th>
                                    <th align="center" font-size="12px">Vr. Unitario</th>
                                    <th align="center" font-size="12px">Total</th>
                                </tr>`
            let amount = 0;
            const taxAmount = parseFloat(recordOc.getValue('taxtotal')) || 0;
            for (let i = 0; i < line; i++) {
                const item = recordOc.getSublistValue({ sublistId: 'item', fieldId: 'item_display', line: i })
                const rate = parseFloat(recordOc.getSublistValue({ sublistId: 'item', fieldId: 'rate', line: i }))
                const quantity = recordOc.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: i })
                const amountL = parseFloat(recordOc.getSublistValue({ sublistId: 'item', fieldId: 'amount', line: i }))
                const nid = recordOc.getSublistValue({ sublistId: 'item', fieldId: 'cseg_so_inmueble_display', line: i });
                const descripción = recordOc.getSublistValue({ sublistId: 'item', fieldId: 'description', line: i });
                amount += parseFloat(amountL)
                html += `<tr height="20px">
                         <td align="left" font-size="10px" width="5%"> ${i + 1}</td>
                         <td align="left" font-size="10px" width="20%">${item}</td>
                         <td align="left" font-size="10px" width="20%">${descripción}</td>
                         <td align="left" font-size="10px" >${nid}</td>
                         <td align="center" font-size="10px" width="5%">${quantity}</td>
                         <td align="right" font-size="10px" width="25%">$ ${formatCurrency(rate)}</td>
                         <td align="right" font-size="10px" width="25%">$ ${formatCurrency(amountL)}</td>
                     </tr>`
            }
            html += `</table>
                        <div align="right"  width="25%" class="invoice-total">
                             <div>
                             <table border="none">
                                <tr border="none" padding="0">
                                    <td align="right" border="none">
                                        <p font-size="10px">Subtotal: $</p>
                                        <p font-size="10px">IVA: $</p> 
                                        <p font-size="10px">Total: $</p>
                                    </td>
                                    <td border="none" align="right">
                                        <p font-size="10px">${formatCurrency(amount)}</p>
                                        <p font-size="10px">${formatCurrency(taxAmount)}</p> 
                                        <p font-size="10px">${formatCurrency((amount + taxAmount))}</p>
                                    </td>
                                </tr>
                            </table>
                            </div>
                        </div>
                             <div class="valor-en-letras">
                             <p class="valor"><strong>Valor en Letras:</strong> ${numeroALetras(amount + taxAmount, currency)}</p>
                             <p><strong style="margin-bottom: 5px;">Instrucciones<br></br></strong></p>
                             <p> Este documento es la aprobación interna de ${option} para que ejecute el servicio o elabore el bien.</p>
                             <p>Una vez entregue el bien o servicio por el cual se le contrato, su contacto interno de ${option} le debe hacer
                             llegar el documento de recepción para que pueda facturar. <u>Abstenerse de facturar antes</u>.</p>
                             <p>La factura electrónica o cuenta de cobro deben coincidir con valor, cantidad y datos del proveedor de la recepción del bien o servicio,
                             de lo contrario se rechazará la documento.</p>
                             <p>Por favor tenga presente la circular adjunta para radicar la factura electrónica.</p>`
            if (option == 'HABI') {
                html += `<p>Cualquier inquietud frente a este documento o del proceso de radicación de la factura puede comunicarse
                                     al telefono <strong>310 4414250</strong> o al correo electrónico <strong>${info[option].email}</strong></p>`
            } else {
                html += `<p>Cualquier inquietud frente a este documento o del proceso de radicación de la factura puede comunicarse
                                     al correo electrónico <strong>${info[option].email}</strong></p>`
            }
            html += `</div>
                             </body>
                             </pdf>`
            let rut = '/HABI/CIRCULAR INFORMATIVA HABI 23-001 - Recepción de Facturas Electrónicas.pdf'
            if (option != 'HABI') {
                rut = '/HABI/CIRCULAR INFORMATIVA - Recepción de Facturas Electrónicas MX.pdf'
            }
            const circular = file.load({ id: rut })
            log.debug('xml', html)
            const pdfFile = render.xmlToPdf({ xmlString: html })
            pdfFile.name = numerDocument + '.pdf'
            email.send({
                author: emitter,
                body: bodyEmail,
                recipients: providerId,
                subject: 'ORDEN DE COMPRA # ' + numerDocument + ' ' + info[option].legal_name,
                attachments: [circular, pdfFile],
                bcc: [emitter],
            })
        }
        const handlers = {};

        handlers.post = (context) => {
            const response = { success: false, code: 404 }
            log.debug('context', context)
            try {
                renderOcHabi(context)
                response.success = true;
                response.code = 200;
                log.debug('response', response)
            } catch (e) {
                log.error('error al enviar mail', e)
            } finally {
                return response
            }
        }

        const numeroALetras = (function () {
            // Código basado en el comentario de @sapienman
            // Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
            function Unidades(num) {

                switch (num) {
                    case 1:
                        return 'UN';
                    case 2:
                        return 'DOS';
                    case 3:
                        return 'TRES';
                    case 4:
                        return 'CUATRO';
                    case 5:
                        return 'CINCO';
                    case 6:
                        return 'SEIS';
                    case 7:
                        return 'SIETE';
                    case 8:
                        return 'OCHO';
                    case 9:
                        return 'NUEVE';
                }

                return '';
            } //Unidades()

            function Decenas(num) {

                let decena = Math.floor(num / 10);
                let unidad = num - (decena * 10);

                switch (decena) {
                    case 1:
                        switch (unidad) {
                            case 0:
                                return 'DIEZ';
                            case 1:
                                return 'ONCE';
                            case 2:
                                return 'DOCE';
                            case 3:
                                return 'TRECE';
                            case 4:
                                return 'CATORCE';
                            case 5:
                                return 'QUINCE';
                            default:
                                return 'DIECI' + Unidades(unidad);
                        }
                    case 2:
                        switch (unidad) {
                            case 0:
                                return 'VEINTE';
                            default:
                                return 'VEINTI' + Unidades(unidad);
                        }
                    case 3:
                        return DecenasY('TREINTA', unidad);
                    case 4:
                        return DecenasY('CUARENTA', unidad);
                    case 5:
                        return DecenasY('CINCUENTA', unidad);
                    case 6:
                        return DecenasY('SESENTA', unidad);
                    case 7:
                        return DecenasY('SETENTA', unidad);
                    case 8:
                        return DecenasY('OCHENTA', unidad);
                    case 9:
                        return DecenasY('NOVENTA', unidad);
                    case 0:
                        return Unidades(unidad);
                }
            } //Unidades()

            function DecenasY(strSin, numUnidades) {
                if (numUnidades > 0)
                    return strSin + ' Y ' + Unidades(numUnidades)

                return strSin;
            } //DecenasY()

            function Centenas(num) {
                let centenas = Math.floor(num / 100);
                let decenas = num - (centenas * 100);

                switch (centenas) {
                    case 1:
                        if (decenas > 0)
                            return 'CIENTO ' + Decenas(decenas);
                        return 'CIEN';
                    case 2:
                        return 'DOSCIENTOS ' + Decenas(decenas);
                    case 3:
                        return 'TRESCIENTOS ' + Decenas(decenas);
                    case 4:
                        return 'CUATROCIENTOS ' + Decenas(decenas);
                    case 5:
                        return 'QUINIENTOS ' + Decenas(decenas);
                    case 6:
                        return 'SEISCIENTOS ' + Decenas(decenas);
                    case 7:
                        return 'SETECIENTOS ' + Decenas(decenas);
                    case 8:
                        return 'OCHOCIENTOS ' + Decenas(decenas);
                    case 9:
                        return 'NOVECIENTOS ' + Decenas(decenas);
                }

                return Decenas(decenas);
            } //Centenas()

            function Seccion(num, divisor, strSingular, strPlural) {
                let cientos = Math.floor(num / divisor)
                let resto = num - (cientos * divisor)

                let letras = '';

                if (cientos > 0)
                    if (cientos > 1)
                        letras = Centenas(cientos) + ' ' + strPlural;
                    else
                        letras = strSingular;

                if (resto > 0)
                    letras += '';

                return letras;
            } //Seccion()

            function Miles(num) {
                let divisor = 1000;
                let cientos = Math.floor(num / divisor)
                let resto = num - (cientos * divisor)

                let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
                let strCentenas = Centenas(resto);

                if (strMiles == '')
                    return strCentenas;

                return strMiles + ' ' + strCentenas;
            } //Miles()

            function Millones(num) {
                let divisor = 1000000;
                let cientos = Math.floor(num / divisor)
                let resto = num - (cientos * divisor)

                let strMillones = Seccion(num, divisor, 'UN MILLON', 'MILLONES');
                let strMiles = Miles(resto);

                if (strMillones == '')
                    return strMiles;

                return strMillones + ' ' + strMiles;
            } //Millones()

            return function NumeroALetras(num, currency) {
                currency = currency || {};
                let data = {
                    numero: num,
                    enteros: Math.floor(num),
                    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                    letrasCentavos: '',
                    letrasMonedaPlural: currency.plural || 'PESOS COLOMBIANOS', //'PESOS', 'Dólares', 'Bolívares', 'etcs'
                    letrasMonedaSingular: currency.singular || 'PESO COLOMBIANO', //'PESO', 'Dólar', 'Bolivar', 'etc'
                    letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
                    letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
                };

                if (data.centavos > 0) {
                    data.letrasCentavos = 'CON ' + (function () {
                        if (data.centavos == 1)
                            return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                        else
                            return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                    })();
                };

                if (data.enteros == 0)
                    return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
                if (data.enteros == 1)
                    return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
                else
                    return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
            };

        })();

        return handlers

    }
);
