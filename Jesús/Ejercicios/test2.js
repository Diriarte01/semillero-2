/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define([], function() {

  const xml = `<?xml version="1.0"?>
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
                  <td border="none"  align="center">
   
        <img src="https://tmlogosave.s3.ap-south-1.amazonaws.com/5588181.jpeg"
                      alt="Logo de la empresa" style="width:210px;height:110px;"></img>
   

    </td>
                     <td colspan="2" margin-top="20px" margin-left="-20px" border="none" align="center">
                         <p><strong>info[option].legal_name}</strong></p>
                         <p margin="0px">info[option].number_id}</p>
                         <p margin="0px">info[option].addres}</p>
                         <p margin="0px">info[option].city}</p>
                         <p margin="0px">info[option].email}</p>
                     </td>
                     <td border="none" align="center"  margin-top="20px" ><h2 font-size="20px">Orden de Compra</h2></td>
                  </tr>
                  </table>
                  <table border="none" margin-top="20px">
                     <tr border="none">
                         <td colspan="2" margin-right="10px" border="none" width="50%">
                             <p><strong>Proveedor:</strong> vendorName}</p>
      <p><strong>NIT:</strong> vendor_number}</p>
     <p><strong>RFC:</strong> vendor_number}</p>
     <p><strong>Dirección Principal:</strong>vendorAddress}</p>
                              <p><strong>Contacto:</strong></p>
                         </td>
                         <td colspan="2" border="none" margin-left="30px" width="50%">
                             <p><strong>Fecha de Emisión:</strong> dateEmission}</p>
                             <p><strong>Fecha de Vencimiento:</strong> expirationDate}</p>
                             <p><strong>Condiciones de Pago:</strong> terms}</p>
                             <p><strong>N. Orden: </strong>numerDocument}</p>
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
                         </tr>
     <tr height="20px">
                  <td align="left" font-size="10px" width="5%"> i + 1}</td>
                  <td align="left" font-size="10px" width="20%">item}</td>
                  <td align="left" font-size="10px" width="20%">descripción}</td>
                  <td align="left" font-size="10px" >nid}</td>
                  <td align="center" font-size="10px" width="5%">quantity}</td>
                  <td align="right" font-size="10px" width="25%">$ formatCurrency(rate)}</td>
                  <td align="right" font-size="10px" width="25%">$ formatCurrency(amountL)}</td>
              </tr>
     
      </table>
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
                                 <p font-size="10px">formatCurrency(amount)}</p>
                                 <p font-size="10px">formatCurrency(taxAmount)}</p> 
                                 <p font-size="10px">formatCurrency((amount + taxAmount))}</p>
                             </td>
                         </tr>
                     </table>
                     </div>
                 </div>
                      <div class="valor-en-letras">
                      <p class="valor"><strong>Valor en Letras:</strong> numeroALetras(amount + taxAmount, currency)}</p>
                      <p><strong style="margin-bottom: 5px;">Instrucciones<br></br></strong></p>
                      <p> Este documento es la aprobación interna de option} para que ejecute el servicio o elabore el bien.</p>
                      <p>Una vez entregue el bien o servicio por el cual se le contrato, su contacto interno de option} le debe hacer
                      llegar el documento de recepción para que pueda facturar. <u>Abstenerse de facturar antes</u>.</p>
                      <p>La factura electrónica o cuenta de cobro deben coincidir con valor, cantidad y datos del proveedor de la recepción del bien o servicio,
                      de lo contrario se rechazará la documento.</p>
                      <p>Por favor tenga presente la circular adjunta para radicar la factura electrónica.</p>
    
         <p>Cualquier inquietud frente a este documento o del proceso de radicación de la factura puede comunicarse
                              al telefono <strong>310 4414250</strong> o al correo electrónico <strong>info[option].email}</strong></p>
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
