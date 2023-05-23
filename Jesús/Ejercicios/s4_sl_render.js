/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/render', 'N/file', 'N/record'], function (render, file, record) {
    function onRequest(context) {
        try {
            const response = context.response;
            const xml = createPdf(context)
            response.renderPdf({ xmlString: xml });
        } catch (error) {
            log.error("Error onRe", error.message);
        }
    }
    function createPdf(context) {
        try {
           const { request } = context;
            const params = request.parameters;
            const internalId = params['internalId']
            const loadedRecord = record.load({ type: 'itemfulfillment', id: internalId, isDynamic: true });
            const wayToPay = loadedRecord.getText('paymentinstruments');// forma de pago
            //const paymentMethod = loadedRecord.getValue('terms');  // metodo de pago
            //const currency = loadedRecord.getValue('currency'); // moneda
            //const invoice = loadedRecord.getValue('custbody_mx_cfdi_folio'); // folio
            const date = loadedRecord.getValue('trandate'); // fecha
            //const seller = loadedRecord.getValue(''); // vendedor
            //const purchaseOrder = loadedRecord.getValue('tranid'); // orden de compra no.
            //const reference = loadedRecord.getValue('tranid'); // referencia
           // const customer = loadedRecord.getText('companyname'); // cliente
            //const rfc = loadedRecord.getValue('custentity_mx_rfc'); // rfc
            //const home = loadedRecord.getValue('defaultaddress'); // domicilio
            //const amount = loadedRecord.getValue(''); // cantidad
            //const code = loadedRecord.getValue('');  // código
            //const unit = loadedRecord.getValue(''); // unidad 
            //const unitSat = loadedRecord.getValue(''); // unidad sat
            //const codeSat = loadedRecord.getValue('custcol_mx_txn_line_sat_item_code'); // codigo sat
            //const description = loadedRecord.getValue(''); // descripción
            //const unitValue = loadedRecord.getValue(''); // valor unitario
            //const  tax = loadedRecord.getValue(''); // impuestos
            //const amountValue = loadedRecord.getValue(''); // importe
            const imageFile = file.load({ id: 4235 });
            const imageUrl = imageFile.url;
            const image_url_split = imageUrl.split("&")
            const image = "https://5845631-sb1.app.netsuite.com" + image_url_split[0] + "&amp;" + image_url_split[1] + "&amp;" + image_url_split[2];
            const xml = `<?xml version="1.0"?>
            <!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">
            <pdf>
                <head>
                    <meta charset="UTF-8"></meta>
                    <title>Ejecución de orden de articulo</title>
                    <style>
                        body {
                            font-family: Calibri, sans-serif;
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
                <body padding="0.5in 0.5in 0.5in 0.5in" size="A4">            
                    <table >
                        <tr>
                        <td border="none"  align="center">   
                                    <p><img src='${image}'
                                        alt="Logo de la empresa" style="width:37.2%;height:30%;"/></p> 
                        </td>
                            <td colspan="2" margin-top="20px" margin-left="10px" align="center" background-color="rgb(65, 133, 244)" color="white" border="none" font-size="12px">
                                <p text-align="center">INFINIA TECNOLOGIA Y SERVICIOS</p>
                                <p align="center"><strong>RFC: ITS130222JK8</strong></p>
                                <p align="center">Egreso</p>
                                <p align="center">Italia Providencia Guadalajara Jalisco</p>
                                <p align="center">México, CP 44648</p>                    
                                <p align="center"><strong>Régimen Fiscal: 601 General de Ley Personas Morales</strong></p>
                            </td>
                        </tr>
                    </table>                  
                            <table>
                                <tr>
                                    <td background-color="rgb(183, 183, 185 )" margin-right="2px" border="none" width="21.6%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                        <p><strong>Forma de pago</strong></p>
                                        <p><strong>Método de pago</strong></p>
                                        <p><strong>Moneda</strong></p>
                                    </td>
                                    <td colspan="2" margin-right="10px" border="none" width="25%" border-bottom="none" font-size="10px" align="top">
                                        <p><strong>${wayToPay}</strong></p>
                                        <p><strong>{paymentMethod}</strong></p>
                                        <p><strong>{currency}</strong></p>
                                        
                                    </td>
                                    <td colspan="2" background-color="rgb(211, 211, 211)" margin-right="2px" border="none" width="13.2%" font-family="Calibri, sans-serif" vertical-align="top">
                                        <p><strong>Folio</strong></p>
                                        <p><strong>Fecha</strong></p>                        
                                    </td>
                                    <td margin-right="10px" border="none" width="20%" border-bottom="none"  font-size="10px" vertical-align="top">
                                        <p><strong>{invoice}</strong></p>
                                        <p><strong>${date}</strong></p>
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                <td colspan="2" background-color="rgb(183, 183, 185 )" margin-right="2px" border="none" width="14%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>Vendedor</strong></p>
                                    <p><strong>Orden de compra No.</strong></p>
                                    <p><strong>Referencia</strong></p>
                                </td>
                                <td colspan="2" background-color="rgb(245, 239, 239)" border="none" width="75.6%" border-bottom="none"  font-size="10px" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>{vendorName}</strong></p>
                                    <p><strong>{purchaseOrder}</strong></p>
                                    <p><strong>{reference}</strong></p>
                                </td>
                                </tr>
                            </table>
                            <table>
                                <tr border-bottom="none">
                                <td background-color="rgb(183, 183, 185 )" border-bottom="none" border-top="5px" border-color="white">
                                    <p><strong>Datos del cliente</strong></p>
                                    </td>
                                    </tr>
                            </table>
                            <table colspan="2" border="none" border-color="white" >
                                    <tr border-color="white">
                                    <td border-color="white">
                                        <p><strong>Cliente:</strong></p>
                                        <p><strong>R.F.C:</strong></p>
                                        <p><strong>Domicilio:</strong></p>
                                    </td>
                                    <td width="80%" border-color="white">
                                        <p><strong>{customer}</strong></p>
                                        <p><strong>{rfc}</strong></p>
                                        <p><strong>{home} </strong></p>
                                    </td>
                                    </tr>
                            </table>                  
                        <table>
                                <tr> 
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="1%"  font-size="9px" align-text="top"><strong>Cantidad</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="8%"  font-size="9px" align="center"><strong>Código</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="8%"  font-size="9px" align="center"><strong>Unidad</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="8%"  font-size="8px" align="center"><strong>Unidad SAT</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="45%" font-size="9px" align="center"><strong>Código SAT</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="45%" font-size="9px" align="center"><strong>Descripción</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="35%" font-size="9px" align="center"><strong>Valor unitario</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="15%" font-size="9px" align="center"><strong>Impuestos</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="10%" font-size="9px" align="center"><strong>Importe</strong></th>
                                </tr>
                                <tr>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{cantidad}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{codigo}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{unit}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{unidad SAT}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{codeSat}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{description}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Valor unitario}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Impuestos}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Importe}</strong></th>
                                </tr>
                        </table>  
                    <div>
                    <div>
                        <table border="none" border-color="white">
                                <tr border-color="white">
                                    <td border-color="white">
                                        <p><strong>Importe con letra:</strong></p>
                                        <p class="valor"><strong>Valor en Letras:</strong></p>

                                    </td>
                                    <td width="15%" border-color="white">
                                        <p><strong>Subtotal</strong></p>
                                        <p><strong>I.V.A</strong></p> 
                                        <p><strong>Total</strong></p>
                                    </td>
                                    <td width="10%" border-color="white">
                                        <p><strong>$</strong></p>
                                        <p><strong>$</strong></p>
                                        <p><strong>$</strong></p>
                                    </td>
                                </tr>
                        </table>                
                    </div>
                    </div>
            </body>
            </pdf>`
            return xml
        } catch (error) {
            log.error("Error rendering PDF", error.message)
        }

    }
    return {
        onRequest: onRequest
    }
});
