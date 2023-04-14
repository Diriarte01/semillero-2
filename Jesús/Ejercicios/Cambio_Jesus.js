/*Ejercicio tipo Scheduled Script:

Raealiza el cambio de tasa periodicamente de manera automatica consumiendo un api publica para realizar el cambio de la tasa de Dolares 
a pesos Colombiano.
*/
/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 *@author Jesús Sillé
 *@description código Schudelet
 */
 define(['N/https', 'N/file', 'N/task','N/xml'], function (https, file, task,xml) {

    function execute(context) {
        try {
            
            const date = new Date()
            const fullDateCvs = (date.getMonth() + 1) + '/' + date.getDate()+ '/' + date.getFullYear();
            const host = "https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl"
            const body = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:act="http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/">
                <soapenv:Header/>
                <soapenv:Body>
                    <act:queryTCRM>
                        <tcrmQueryAssociatedDate>${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}/tcrmQueryAssociatedDate>
                    </act:queryTCRM>
                </soapenv:Body>
            </soapenv:Envelope>
            `
            log.debug('body:', body)
            const headerUrl = {
                'Content-Type': 'text/xml'
            }
            const response = https.post({
                body: body,
                url: host,
                headers: headerUrl,
            })
            let xmlobj = xml.Parser.fromString({text : response.body});
            let tasa = xml.XPath.select({
                node: xmlobj,
                xpath: '/soap:Envelope/soap:Body/ns2:queryTCRMResponse/return/value'
            });
            log.audit('response1', tasa[0].textContent)
            log.debug('response', typeof response.body)
            let fileObj = file.create({           
                name: 'Tasa de cambio.csv',
                fileType: file.Type.CSV,
                contents: 'fecha,importe' + '\n',
                folder: -15,
            })
            const values = fullDateCvs +','+ tasa[0].textContent;
            fileCvs.appendLine({
                value: values,
            })

            const fileCsv = fileObj.save();         

            task.create({                                
                taskType: task.TaskType.CSV_IMPORT,
                importFile: fileObj,
                mappingId: 'custimport_s4_exchangued_currency_walt',    
            }).submit()

        } catch (e) {
            log.audit('Error:', e);

        }
    }
    return {
        execute: execute
    }
});