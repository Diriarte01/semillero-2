/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 *@author Jesús Sillé
 */
define(['N/https', 'N/file', 'N/task','N/xml'], function (https, file, task,xml) {
    const handlers = {};

            function execute(context){
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

            log.debug('response', response)
            log.debug('response', response.body)
            fileObj.appendLine({
                value: '4/11/2023,4564'
            })
            const fileSave = fileObj.save();
            task.create({
                taskType: task.TaskType.CSV_IMPORT,
                importFile:fileObj,
                mappingId: 'custimport_s4_exchange_rate2',
            }).submit()

        }
    
        
     catch (e) {
        log.audit('Error',e);
        
    }
    
       
}
    return {
        execute: execute
    }
});
