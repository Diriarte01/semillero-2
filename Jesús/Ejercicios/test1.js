/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define([], function () {

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
    <body>            
        <table >
            <tr>
            <td border="none"  align="center">   
                        <img src="./shoes.jpg.jpeg"
                          alt="Logo de la empresa" style="width:700%;height:500%;"></img> 
            </td>
                <td colspan="2" margin-top="20px" margin-left="-20px" align="center" background-color="rgb(65, 133, 244)" color="white" border="none" font-family="Calibri, sans-serif" font-size="15px">
                    <p font-family= "Calibri, sans-serif" text-align="center">INFINIA TECNOLOGIA Y SERVICIOS</p>
                    <p align="center">RFC: ITS130222JK8</p>
                    <p align="center">Egreso</p>
                    <p align="center">Italia Providencia Guadalajara Jalisco</p>
                    <p align="center">México, CP 44648</p>                    
                    <p align="center">Régimen Fiscal: 601 General de Ley Personas Morales</p>
                </td>
            </tr>
        </table>                  
                <table>
                    <tr>
                        <td background-color="rgb(211, 211, 211)" margin-right="10px" border="none" width="10%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                            <p><strong>Forma de pago</strong></p>
                            <p><strong>Método de pago</strong></p>
                            <p><strong>Moneda</strong></p>
                        </td>
                        <td colspan="2" margin-right="10px" border="none" width="10%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                            <p><strong>vendorName</strong></p>
                            <p><strong>payment method</strong></p>
                            <p><strong>Dolar</strong></p>
                            
                        </td>
                        <td colspan="2" background-color="rgb(211, 211, 211)" margin-right="10px" border="none" width="10%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                            <p><strong>Folio</strong></p>
                            <p><strong>Fecha</strong></p>                          
                        </td>
                        <td margin-right="10px" border="none" width="10%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                            <p><strong>number folio</strong></p>
                            <p><strong>date</strong></p>
                        </td>
                    </tr>
                </table>
                <table>
                    <tr>
                      <td colspan="2" background-color="rgb(211, 211, 211)" margin-right="10px" border="none" width="5%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                        <p><strong>Vendedor vendorName</strong></p>
                        <p><strong>Condiciones de pago payment_terms</strong></p>
                        <p><strong>Orden de compra No. purchase_order</strong></p>
                        <p><strong>Referencia</strong></p>
                      </td>
                      <td colspan="2" background-color="rgb(245, 239, 239)" margin-right="10px" border="none" width="10%" border-bottom="none" font-family="Calibri, sans-serif" vertical-align="top">
                        <p><strong>Vendedor vendorName</strong></p>
                        <p><strong>Condiciones de pago payment_terms</strong></p>
                        <p><strong>Orden de compra No. purchase_order</strong></p>
                        <p><strong>Referencia</strong></p>
                      </td>
                    </tr>
                </table>
                <table>
                    <tr>
                      <td background-color="rgb(211, 211, 211)">
                        <p><strong>Datos del cliente</strong></p>
                        </td>
                        </tr>
                </table>
                <table>
                        <tr>
                        <td>
                            <p><strong>Cliente: customer</strong></p>
                            <p><strong>R.F.C: Rfc</strong></p>
                            <p><strong>Domicilio: home </strong></p>
                        </td>
                        </tr>
                </table>                  
               <table>
                    <tr>
                        <th><strong>Cantidad</strong></th>
                        <th><strong>Codigo</strong></th>
                        <th><strong>Unidad</strong></th>
                        <th><strong>Unidad SAT</strong></th>
                        <th><strong>Codigo SAT</strong></th>
                        <th><strong>Descripción</strong></th>
                        <th><strong>Valor unitario</strong></th>
                        <th><strong>Impuestos</strong></th>
                        <th><strong>Importe</strong></th>
                    </tr>
                    <tr>
                        <th><strong>Cantidad</strong></th>
                        <th><strong>Codigo</strong></th>
                        <th><strong>Unidad</strong></th>
                        <th><strong>Unidad SAT</strong></th>
                        <th><strong>Codigo SAT</strong></th>
                        <th><strong>Descripción</strong></th>
                        <th><strong>Valor unitario</strong></th>
                        <th><strong>Impuestos</strong></th>
                        <th><strong>Importe</strong></th>
                    </tr>
              </table>  
        <div>
          <div>
            <table>
                    <tr>
                        <td>
                            <p><strong>Importe con letra:</strong></p>
                        </td>
                        <td>
                            <p><strong>Subtotal:</strong></p>
                            <p><strong>I.V.A:</strong></p> 
                            <p><strong>Total:</strong></p>
                        </td>
                        <td>
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
        function onRequest(context) {
            const { request, response } = context;
            response.renderPdf(xml)
        }

    return {
        onRequest: onRequest
    }
});
