/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 */
 define(["N/search",'N/record'], function (search,record) {
    const handlers = {};
  
    handlers.execute = (context) => {
      
      // const record = record.context;
      // const isEntity = record.context;
      const clientes = {};
      const filters = [];
      const columns = [search.createColumn({name: "entityid",sort: search.Sort.ASC,label: "Nombre",})];
      const searchData = search.create({type: "customer",filters: filters,columns: columns,});
       
       // ejecuta la busqueda y guarda el objeto 

      searchData.run().each(function (result) {
      const objCustomer = new Object();
      objCustomer.idCustomer = result.getValue("entityid")
      objCustomer.nameCustomer = result.getText("entityid")
      clientes.push(objCustomer);  
      return true;
       
      });

      // valida que este en el registro cliente y en el modo edicion
     
      if( record.type == 'customer' && context.type == EDIT ){
        clientes.record.context;
     // recorre la lista y setea el prefijo DEF + el nombre al valor de el campo nombre de cliente
 
     for (const i in clientes) {
            const pre = 'DEF';
            let isEntity =clientes[i].record.context;
            let name = clientes[i].getText({ fieldId: 'companyname' })
             if(isEntity.getText == name ){
               clientes[i].setText({
                fieldId: 'companyname',
                text: pre + name   
               })
            }
        }

      }
      
    };
  
    return handlers;
  });
  