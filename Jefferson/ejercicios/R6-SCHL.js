/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 */
define(["N/file","N/task","N/https"], function(file,task,https) {
    
    const handlers = {};

    handlers.execute =(context)=> {

            try {
            // creamos el archivo csv
            
            const filePath = -15;
            const header = 'fecha,importe'+'\n';
            let fileObj = file.create({ name:'Cambio de moneda USD-COP.csv',fileType: file.Type.CSV,contents: header,folder: filePath})
        
            task.create({taskType: task.TaskType.CSV_IMPORT, importFile:fileObj,mappingId:'_s4_exchanged_currencycop'}).submit()

            // se guarda el archivo

            const fileSave = fileObj.save();
            
            // creamos la fecha que vamos a manejar

            const date = new Date();
            const fullDateCsv = (date.getMonth() + 1) + '/' + date.getDate()+'/' +date.getFullYear();

          

            const host = "https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl"
            const body = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:act="http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/">
                <soapenv:Header/>
                <soapenv:Body>
                    <act:queryTCRM>
                        <tcrmQueryAssociatedDate>${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}</tcrmQueryAssociatedDate>
                    </act:queryTCRM>
                </soapenv:Body>
            </soapenv:Envelope>
            `
    
            const headerUrl = {'Content-Type': 'text/xml'}

            // realizamos la peticion al api
           
            const response = https.post({body: body,url: host, headers: headerUrl})
            
            // parseamos  la respuesta para poder manejarla
            
            let xmlobj = xml.Parser.fromString({ text : response.body});

            // entramos al nodo que necesitamos
            let tasa = xml.Xpath.select({ node: xmlobj, xpath :'/soap:Envelope/soap:Body/ns2:queryTCRMResponse/return/value' })

            // sacamos el dato requerido y creamos una nueva linea en el archivo concon el valor 

            const values = fullDateCsv + ',' + tasa[0].textContent;
            fileObj.appendLine({value: values})
            
            

            log.debug('cambio', fileObj);
                
            } catch (e) {

                log.debug("error al ejecutar", e)
                
            }

        
    }

    return handlers;

});
