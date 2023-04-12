function execute() {
    try {
        var scriptRuntime = runtime.getCurrentScript();
        var mappingFileId = scriptRuntime.getParameter({ name: 'custscript_co_mappingFieldId' });
        var url = scriptRuntime.getParameter({ name: 'custscript_co_trm_url' });
        var usd = searchCurrency('USD');
        var cop = searchCurrency('COP');
        var date = new Date();
        var month = parseFloat(date.getMonth()) + 1;
        month = month < 10 ? '0' + month.toString() : month;
        var day = parseFloat(date.getDate()) < 10 ? '0' + date.getDate().toString() : date.getDate();
        date = date.getFullYear() + '-' + month + '-' + day;
        var body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:act="http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/"> ' +
            '<soapenv:Header/> ' +
            '<soapenv:Body> ' +
            '<act:queryTCRM> ' +
            '<tcrmQueryAssociatedDate>' + date + '</tcrmQueryAssociatedDate> ' +
            '</act:queryTCRM> ' +
            '</soapenv:Body> ' +
            '</soapenv:Envelope>';
        var url = url;
        var response = https.request({
            method: https.Method.POST,
            url: url,
            body: body,
            headers: null
        });

        var xmlobj = xml.Parser.fromString({ text: response.body });
        var tasa = xml.XPath.select({
            node: xmlobj,
            xpath: '/soap:Envelope/soap:Body/ns2:queryTCRMResponse/return/value'
        });
        tasa = parseFloat(tasa[0].textContent);
        log.audit('tasa', 'la recuperada tasa: ' + tasa);

        var fecha = darFechaActual();
        var csvLine = usd + ", " + cop + "," + (1 / tasa) + "," + fecha;
        csvLine += "\n" + cop + ", " + usd + "," + tasa + "," + fecha;

        var primaryFileAsString = "Base Currency,Currency,Exchange Rate,Effective Date\n" + csvLine;

        log.audit('scheduleCSVCurrencyUpdate', csvLine);
        // create the CSV import job with a description that leverages the date
        var job = task.create({
            taskType: task.TaskType.CSV_IMPORT,
            importFile: primaryFileAsString,
            mappingId: mappingFileId,
            name: "MY_CURRENCY_UPDATE: " + new Date()
        });
        var idCVS = job.submit();
        log.audit('scheduleCSVCurrencyUpdate', 'Job submited! with id: ' + idCVS);
    } catch (ex) {
        var recipients = searchAutors();
        if (recipients.length > 0) {
            log.audit('email', 'enviando mail');
            email.send({
                author: recipients[0],
                recipients: recipients,
                subject: 'TRM update',
                body: 'It was not possible to update the TRM automatically, please update it manually'
            });
        }
        log.error('error', 'error en execute: ' + JSON.stringify(ex));
    }
}