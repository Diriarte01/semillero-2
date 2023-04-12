/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 */
define(['N/task', 'N/file', 'N/https'], 
    function(task, file, https) {
        const handlers = {};

        handlers.execute = (context) =>{
            const filePath = -15;
            const header = 'fecha,importe'+'\n';
            let fileObj = file.create({
                name: 'dispersion.csv',
                fileType: file.Type.CSV,
                contents: header,
                folder: filePath
            })

            const host = "https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl"
            const body = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:act="http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/">
                <soapenv:Header/>
                <soapenv:Body>
                    <act:queryTCRM>
                        <tcrmQueryAssociatedDate>2023-04-10</tcrmQueryAssociatedDate>
                    </act:queryTCRM>
                </soapenv:Body>
            </soapenv:Envelope>
            `
            const headerUrl = {
                'Content-Type': 'text/xml'
            }
            const response = https.post({
                body: body,
                url: host,
                headers: headerUrl
            })
            log.debug('response', response)
            fileObj.appendLine({
                value: '4/10/2023,4590'
            })
            const fileSave = fileObj.save();
            task.create({
                taskType: task.TaskType.CSV_IMPORT,
                importFile:fileObj,
                mappingId: 'custimport_s4_exchanged_currency',
            }).submit()

        }

        return handlers;
    }
);
