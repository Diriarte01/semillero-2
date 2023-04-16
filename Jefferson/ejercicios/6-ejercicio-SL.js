/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(["N/ui/serverWidget","N/search"], function(serverWidget,search) {
    
    const handlers = {};

   

    handlers.onRequest = (context) => {
        const data =[];
        const response = context.response;
        const request = context.request;
        const params = request.parameters;
        
        // busqueda con los parametros requeridos
        const type = "vendorbill", filters = [], columns =[];
        filters.push(["type","anyof","VendBill"]);
        filters.push("AND", ["approvalstatus","anyof","2"]) 
        filters.push("AND",["trandate","notbefore","1/1/2023"])    
        filters.push("AND",["amount","greaterthanorequalto","1000.00"])   
        columns.push(search.createColumn({name: "invoicenum", label: "Número de factura de venta"}))
        columns.push(search.createColumn({name: "datecreated", label: "Fecha de creación"}))
        columns.push(search.createColumn({name: "amount", label: "Importe"}))
        columns.push(search.createColumn({name: "entity", label: "Nombre"}))
        
        const searchData = search.create({type: type ,filters:filters, columns:columns });
         
        // recorremos la busqueda y añadimos al arreglo previamente creado el objeto
        searchData.run().each(function(result){
            
            const objdata = {};
            objdata.custpage_entity = result.getValue("entityid")
            objdata.custpage_numbersinvoice = result.getValue("invoicenum")
            objdata.custpage_datacreated = result.getValue("datecreated")
            objdata.custpage_amount = result.getValue("amount")
    
            data.push(objdata);

            return true;
         });
    

        //  creo una lista con las columnas respectivas

        const listData = serverWidget.createForm({title: "DATA DE FACTURAS"})

        try {

            let form = listData.addSublist({ id: 'custpage_s4_sublist',label: 'DATA DE FACTURAS',type: serverWidget.SublistType.LIST })     
            let company = form.addField({id: 'custpage_entity',label: 'Cliente',type: serverWidget.FieldType.TEXT, })
            let numInvoice  = form.addField({id: 'custpage_numbersinvoice',label: 'Numero de Factura',type: serverWidget.FieldType.TEXT})
            let date =  form.addField({id: 'custpage_datacreated',label: 'Fecha',type: serverWidget.FieldType.DATE})
            let amount = form.addField({id: 'custpage_amount',label: 'Importe',type: serverWidget.FieldType.INTEGER})
              

            for (let i = 0; i <data.length; i++) {
                form.setSublistValue({ id: 'custpage_entity',line: i,value: data[i].custpage_entity});
                form.setSublistValue({ id: 'custpage_numbersinvoice',line: i,value: data[i].custpage_numbersinvoice});
                form.setSublistValue({ id: 'custpage_datacreated',line: i,value: data[i].custpage_datacreated});
                form.setSublistValue({ id: 'custpage_amount',line: i,value: data[i].custpage_amount});
            } 
            

    /* INTENTE AGREGAR UNA PAGINACION Y NO ME DIO IGUAL LA TENIA MEDIO CLARA POR NO DEL TODO CON CIERTOS METODOS 
            let pagedData = searchData.runPaged({
                pageSize: 40 
            });
            
            pagedData.pageRanges.forEach(function(pageRange) {
            let currentPage = pagedData.fetch({index: pageRange.index});
                currentPage.data.forEach(function(data) {
                    sublist.setSublistValue({
                        id: 'custpage_entity',
                        line: sublist.getLineCount(),
                        value: data.getValue('custpage_entity')
                    });
                    sublist.setSublistValue({
                        id: 'custpage_numbersinvoice',
                        line: sublist.getLineCount() - 1,
                        value: data.getValue('custpage_numbersinvoice')
                    });
                    sublist.setSublistValue({
                        id: 'custpage_datacreated',
                        line: sublist.getLineCount() - 1,
                        value: result.getValue('custpage_datacreated')
                    });

                    sublist.setSublistValue({
                        id: 'custpage_amount',
                        line: sublist.getLineCount() - 1,
                        value: result.getValue('custpage_amount')
                    });


                });
            });

             */
        
        } catch (e) {
            log.error("hay un error en la ejecución", e.message)
        }finally{

            response.writePage(listData)
        }
        

    }

    return handlers;

}

);
