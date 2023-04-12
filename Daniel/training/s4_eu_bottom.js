/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
define(['N/https', 'N/xml'], 
    function(https, xml) {
        const handlers = {};

        handlers.beforeLoad = (context)=>{
            const record = context.newRecord;
            const form = context.form;
            form.clientScriptModulePath = './s4_cs_bottom.js';
            if(context.type == context.UserEventType.VIEW){
                const internalId = record.id;
                form.addButton({
                    id: 'custpage_bottom',
                    label: 'popUp',
                    functionName: "popUp("+internalId+")"
                })
            }
            const date = new Date()
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
            log.debug('body:', body)
            const headerUrl = {
                'Content-Type': 'text/xml'
            }
            const response = https.post({
                body: body,
                url: host,
                headers: headerUrl
            })
            log.debug('response', response)
            log.debug('response', xml.Parser.fromString({ text : response.body }))
        }

        return handlers;
    
    }
);
