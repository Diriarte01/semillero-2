/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
 define(['N/render', 'N/file','N/record'], function (render, file, record) {


    ""
    function onRequest(context) {
        try {
            const response = context.response;
            const renderRemision = (context) =>{
            const loadedRecord = record.load({type: 'workOrderClose', id: context.internalId, isDynamic: true});
            const wayToPay = loadedRecord.getValue('Forma de pago');      
            const paymentMethod = loadedRecord.getValue('Método de pago');
            const currency = loadedRecord.getValue('Moneda');
            const invoice = loadedRecord.getValue('Folio');
            const date = loadedRecord.getValue('Fecha');
            const seller = loadedRecord.getValue('Vendedor');
            const paymentConditions = loadedRecord.getValue('Condiciones de pago');
            const purchaseOrder = loadedRecord.getValue('Orden de compra No.');
            const reference = loadedRecord.getValue('Referencia');
            const customer = loadedRecord.getValue('Cliente');
            const rfc = loadedRecord.getValue('RFC');
            const home = loadedRecord.getValue('Domicilio');
            const amount = loadedRecord.getValue('Cantidad');
            const code = loadedRecord.getValue('Código');
            const unit = loadedRecord.getValue('Unidad');
            const unitSat = loadedRecord.getValue('Unidad SAT');
            const codeSat = loadedRecord.getValue('Código SAT');
            const description = loadedRecord.getValue('Descripción');
            const unitValue = loadedRecord.getValue('Valor unitario');
            const  tax = loadedRecord.getValue('Impuestos');
            const amountValue = loadedRecord.getValue('Importe');
            const totalParcial = loadedRecord.getValue('Subtotal');
            const iva = loadedRecord.getValue('I.V.A');
            const total = loadedRecord.getValue('Total');    
            }

            let imageFile = file.load({ id: 4235 });
            let imageUrl = imageFile.url;
            var image_url_split = imageUrl.split("&")
            var image = "https://5845631-sb1.app.netsuite.com" + image_url_split[0] + "&amp;" + image_url_split[1] + "&amp;" + image_url_split[2];
            const xml = createPdf(image)
            response.renderPdf({
                xmlString: xml
            });
        } catch (error) {
            log.error("Error onRe", error.message);
        }

    }
    const createPdf = (url,data) => {
        try {
            const xml = `<?xml version="1.0"?>
        <!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">
        <pdf>
            <head>
                <meta charset="UTF-8"></meta>
                <title>Ejecución de orden de articulo</title>
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
            <body padding="0.5in 0.5in 0.5in 0.5in" size="A4">            
                <table >
                    <tr>
                    <td border="none"  align="center">   
                                <p><img src='${url}'
                                    alt="Logo de la empresa" style="width:30%;height:30%;"/></p> 
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
                                <td background-color="rgb(211, 211, 211)" margin-right="2px" border="none" width="21.6%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>Forma de pago</strong></p>
                                    <p><strong>Método de pago</strong></p>
                                    <p><strong>Moneda</strong></p>
                                </td>
                                <td colspan="2" margin-right="10px" border="none" width="15%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>{cheque}</strong></p>
                                    <p><strong>{payment method}</strong></p>
                                    <p><strong>{Dolar}</strong></p>
                                    
                                </td>
                                <td colspan="2" background-color="rgb(211, 211, 211)" margin-right="2px" border="none" width="16.5%" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>Folio</strong></p>
                                    <p><strong>Fecha</strong></p>                        
                                </td>
                                <td margin-right="10px" border="none" width="25%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>{number folio}</strong></p>
                                    <p><strong>{date}</strong></p>
                                </td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                            <td colspan="2" background-color="rgb(211, 211, 211)" margin-right="2px" border="none" width="14%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                <p><strong>Vendedor</strong></p>
                                <p><strong>Condiciones de pago</strong></p>
                                <p><strong>Orden de compra No.</strong></p>
                                <p><strong>Referencia</strong></p>
                            </td>
                            <td colspan="2" background-color="rgb(245, 239, 239)" border="none" width="72.8%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                <p><strong>{vendorName}</strong></p>
                                <p><strong>{payment_terms}</strong></p>
                                <p><strong>{purchase_order}</strong></p>
                                <p><strong>Referencia</strong></p>
                            </td>
                            </tr>
                        </table>
                        <table>
                            <tr border-bottom="none">
                            <td background-color="rgb(211, 211, 211)" border-bottom="none" border-top="5px" border-color="white">
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
                                    <p><strong>{Rfc}</strong></p>
                                    <p><strong>{home} </strong></p>
                                </td>
                                </tr>
                        </table>                  
                    <table>
                            <tr> 
                                <th border="0.5px" width="1%"  font-size="9px" align="center"><strong>Cantidad</strong></th>
                                <th border="0.5px" width="8%"  font-size="9px" align="center"><strong>Código</strong></th>
                                <th border="0.5px" width="8%"  font-size="9px" align="center"><strong>Unidad</strong></th>
                                <th border="0.5px" width="8%"  font-size="8px" align="center"><strong>Unidad SAT</strong></th>
                                <th border="0.5px" width="45%" font-size="9px" align="center"><strong>Código SAT</strong></th>
                                <th border="0.5px" width="45%" font-size="9px" align="center"><strong>Descripción</strong></th>
                                <th border="0.5px" width="35%" font-size="9px" align="center"><strong>Valor unitario</strong></th>
                                <th border="0.5px" width="15%" font-size="9px" align="center"><strong>Impuestos</strong></th>
                                <th border="0.5px" width="10%" font-size="9px" align="center"><strong>Importe</strong></th>
                            </tr>
                            <tr>
                                <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Cantidad}</strong></th>
                                <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Código}</strong></th>
                                <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Unidad}</strong></th>
                                <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Unidad SAT}</strong></th>
                                <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Código SAT}</strong></th>
                                <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center"><strong>{Descripción}</strong></th>
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
