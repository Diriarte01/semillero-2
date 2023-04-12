/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 *@author   Xavier Gonzalez
 */
define(['N/record', 'N/https', 'N/file','N/task', 'N/xml'], function(record, https, file, task, xml) {
    const handlers = {};
    handlers.execute =(context) => {
        try {
            const date = new Date();
            const month = date.getMonth() + 1; 
            const fullDate = date.getFullYear() + '-' + month +'-' + date.getDate();
            const fullDateCvs = month + '/' + date.getDate()+ '/' + date.getFullYear();
            log.audit('fecha api',fullDate)
            const host = "https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl"
            const body = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:act="http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/">
                <soapenv:Header/>
                <soapenv:Body>
                    <act:queryTCRM>
                        <tcrmQueryAssociatedDate>${fullDate}</tcrmQueryAssociatedDate>
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
                headers: headerUrl
            })
            let xmlobj = xml.Parser.fromString({text : response.body});
            let tasa = xml.XPath.select({
                node: xmlobj,
                xpath: '/soap:Envelope/soap:Body/ns2:queryTCRMResponse/return/value'
            });
            log.audit('response1', tasa[0].textContent)
            log.debug('response', typeof response.body)
            let fileCvs = file.create({
                name: 'cvsImporteCurrency.csv',
                fileType: file.Type.CSV,
                contents: 'fecha,importe'+'\n',
                folder: -15
            })
            const values = fullDateCvs +','+ tasa[0].textContent;
            fileCvs.appendLine({
                value: values,
            })
            const fileSave = fileCvs.save();
            task.create({
                taskType: task.TaskType.CSV_IMPORT,
                importFile:fileCvs,
                mappingId: 'custimport_s4_exchanged_currencyxg',
            }).submit()
           
            
            
        } catch (e) {
            log.audit('Error:', e);
        }
    }

    return handlers;
});
