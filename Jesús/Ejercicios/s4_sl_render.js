/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/render', 'N/file', 'N/record', 'N/format'], function (render, file, record, format) {
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
            const internalId = params['itemFull']; 
            const salesOrderId = params.salesOrder;         
            const renderInfinia = record.load({ type: 'itemfulfillment', id:internalId, isDynamic: true, });
            const saleOrderData = record.load({ type: 'salesorder', id:salesOrderId, isDynamic: true, });
            const wayToPay = saleOrderData.getText('paymentoption') || '-'; // forma de pago
            const paymentMethod = saleOrderData.getText('terms') || '-';  // metodo de pago
            const currency = saleOrderData.getText('currency') || '-';  // moneda
            const invoice = renderInfinia.getText('custbody_mx_cfdi_folio'); // folio
            const date = renderInfinia.getText('trandate'); // fecha
            const purchaseOrder = saleOrderData.getValue('tranid') || '-'; // orden de compra no.
            const reference = saleOrderData.getValue('custbody1') || '-'; // referencia
            const customer = renderInfinia.getText('entity'); // cliente
            const rfc = saleOrderData.getValue('custbody_mx_customer_rfc') || '-'; // rfc
            const home = renderInfinia.getValue('shipaddress'); // domicilio
            const taxes = saleOrderData.getValue('taxtotal');
            const importe = saleOrderData.getValue('total');
            const sublistId = 'salesteam';
            const line = 0;
            const fieldId = 'employee';
            const seller = saleOrderData.getSublistText({sublistId: sublistId, fieldId: fieldId, line:line}); // empleado
            //const total1 = saleOrderData.getValue('total') || '-'; // total
            let lines = renderInfinia.getLineCount({sublistId: "item"});

            const formatCurrency = (number) => {
                number = Math.round(number * 100) / 100;
                const part = number.toString().split(".");
                let wholepart = part[0];
                const decimal = part.length > 1 ? part[1] : "00";
                wholepart = wholepart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                const formattedNumber = wholepart + "," + decimal;
                return formattedNumber;
            }
            const numeroALetras = (function () {
                // Código para mostrar el numero del total en letras
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
                        letrasMonedaPlural: (currency.plural === 'DÓLARES') ? 'PESOS MEXICANOS' : currency.plural || 'PESOS MEXICANOS', //'PESOS', 'Dólares', 'Bolívares', 'etcs'
                        letrasMonedaSingular: (currency.singular === 'DÓLAR') ? 'PESO MEXICANO' : currency.singular || 'PESO MEXICANO', //'PESO', 'Dólar', 'Bolivar', 'etc'
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
            const imageFile = file.load({ id: 4235 });
            const imageUrl = imageFile.url;
            const image_url_split = imageUrl.split("&")
            const image = "https://5845631-sb1.app.netsuite.com" + image_url_split[0] + "&amp;" + image_url_split[1] + "&amp;" + image_url_split[2];
            let xml = `<?xml version="1.0"?>
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
                <body padding="0.5in 0.5in 0.5in 0.5in" size="A3">            
                    <table >
                        <tr>
                        <td border="none"  align="center">   
                                    <p><img src='${image}'
                                        alt="Logo de la empresa" style="width:50%;height:30%;"/></p> 
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
                                    <td background-color="rgb(183, 183, 185 )" margin-right="2px" border="none" width="20%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                        <p><strong>Forma de pago</strong></p>
                                        <p><strong>Método de pago</strong></p>
                                        <p><strong>Moneda</strong></p>
                                    </td>
                                    <td colspan="2" margin-right="10px" border="none" width="32%" border-bottom="none" font-size="10px" align="top">
                                        <p><strong>${wayToPay}</strong></p>
                                        <p><strong>${paymentMethod}</strong></p>
                                        <p><strong>${currency}</strong></p>
                                        
                                    </td>
                                    <td colspan="3" background-color="rgb(211, 211, 211)" margin-right="2px" border="none" width="20%"  font-family="Calibri, sans-serif" vertical-align="top">
                                        <p><strong>Folio</strong></p>
                                        <p><strong>Fecha</strong></p>                                                        
                                    </td>
                                    <td margin-right="10px" border="none" width="30%" border-bottom="none"  font-size="10px" align="center">
                                        <p><strong>${invoice}</strong></p>
                                        <p><strong>${date}</strong></p>
                                        
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                <td colspan="2" background-color="rgb(183, 183, 185 )" margin-right="2px" border="none" width="15%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>Vendedor</strong></p>
                                    <p><strong>Orden de venta No.</strong></p>
                                    <p><strong>Referencia</strong></p>
                                </td>
                                <td colspan="2" background-color="rgb(245, 239, 239)" border="none" width="75.6%" border-bottom="none"  font-size="10px" font-family="Calibri, sans-serif" vertical-align="top">
                                    <p><strong>${seller}</strong></p>
                                    <p><strong>${purchaseOrder}</strong></p>
                                    <p><strong>${reference}</strong></p>
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
                                        <p><strong>${customer}</strong></p>
                                        <p><strong>${rfc}</strong></p>
                                        <p><strong>${home} </strong></p>
                                    </td>
                                    </tr>
                            </table>                  
                        <table>
                                <tr> 
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="1%"  font-size="9px" align-text="top" border-color="gray"><strong>Cantidad</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="30%" font-size="9px" align="center" border-color="gray"><strong>Código</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="20%" font-size="9px" align="center" border-color="gray"><strong>Unidad</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="20%" font-size="8px" align="center" border-color="gray"><strong>Unidad SAT</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="20%" font-size="9px" align="center" border-color="gray"><strong>Código SAT</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="40%" font-size="9px" align="center" border-color="gray"><strong>Descripción</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="30%" font-size="9px" align="center" border-color="gray"><strong>Valor unitario</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="30%" font-size="9px" align="center" border-color="gray"><strong>Impuestos</strong></th>
                                    <th border="0.5px" background-color= "rgb(183, 183, 185)" width="30%" font-size="9px" align="center" border-color="gray"><strong>Importe</strong></th>
                                </tr>                                
                                `
                                let amount = 0;
                                let subTotal = 0;
                                //let totalTaxes = 0;                               
                                Array(lines).fill().forEach((_, i) => {                                   
                                    const quantity = parseInt(renderInfinia.getSublistText({sublistId: "item",fieldId: "quantityremainingdisplay", line: i}));
                                    const code = renderInfinia.getSublistValue({sublistId: "item",fieldId: "itemname", line: i}) || '-';
                                    const units = renderInfinia.getSublistText({sublistId: "item",fieldId: "unitsdisplay", line: i}) || 0;                               
                                    const unitSat = renderInfinia.getSublistText({sublistId: "item",fieldId: "custcol3",line: i}) || '';
                                    const codeSat = saleOrderData.getSublistText({sublistId: "item",fieldId: "custcol_mx_txn_line_sat_item_code",line: i}) || '-';
                                    const description = saleOrderData.getSublistText({sublistId: "item",fieldId: "item_display",line: i}) || '-';
                                    const unitValue = (saleOrderData.getSublistValue({sublistId: "item",fieldId: "rate",line: i}));
                                    const taxArticle = saleOrderData.getSublistValue({sublistId: "item",fieldId: "tax1amt",line: i});
                                    amount =  parseInt(saleOrderData.getSublistValue({sublistId: "item",fieldId: "amount",line: i})) || 0; 
                                    subTotal += amount;
                                    //totalTaxes += taxes;                                  
                                    // linea 385 el campo corresponde a valor unitario
                                    xml += `<tr>`
                                    xml += `<th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${quantity}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${code}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${units}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${unitSat +'-'+ units}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${codeSat}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${description}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${unitValue}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${taxArticle}</strong></th>
                                    <th border="0.5px"  background-color= "rgb(255, 255, 255)" font-size="9px" align="center" border-color="gray"><strong>${(quantity * unitValue)}</strong></th>` 
                                    xml+=` </tr>` 
                                });                                 
                                                       
                                xml +=`</table>  
                                <div>
                                <div>
                                    <table border="none" border-color="white">
                                            <tr border-color="white">
                                                <td border-color="white">
                                                    <p><strong>Importe con letra:</strong></p>
                                                    <p class="valor">${numeroALetras(importe, currency)}</p>
            
                                                </td>
                                                <td width="15%" border-color="white">
                                                    <p><strong>Subtotal</strong></p>
                                                    <p><strong>I.V.A</strong></p> 
                                                    <p><strong>Total</strong></p>
                                                </td>
                                                <td width="10%" border-color="white">
                                                    <p><strong>$${subTotal}</strong></p>
                                                    <p><strong>$${taxes}</strong></p>
                                                    <p><strong>$${importe}</strong></p>
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
