/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Jefferson Castañeda
 *@module Public
 *@Empresa Grupo SOl4it
 *@Description Codigo de clase ClientScript
 */

 define(['N/ui/dialog','N/search'],
    function(dialog, search) {

        const handlers = {};
        const fields = {
            capital: 'custentity_s4_cns_capital',
            zip:'custentity_s4_cns_postal_code'
        }

        handlers.pageInit = (context) =>{
            const obj = context.currentRecord;
            const mode = context.mode
            log.audit('contextCurrentRecord', obj)
            const recordType = obj.type;
            if(mode == 'create'){
                dialog.alert({
                    title: 'Bienvenido',
                    message: 'gracias por ingresar al registro: ' + recordType
                })
            }else{
                alert('Bienvenido al modo edicion del registro: ' + recordType)
            }
        }

        handlers.fieldChanged = (context) =>{
            const obj = context.currentRecord;
            const fieldId = context.fieldId;
            const sublistId = context.fieldId;
            if(sublistId == 'item'){
                if(fieldId == 'item'){
                    const item = obj.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'item'
                    })
                    const searchField = search.lookupFields({
                        type: 'inventoryitem',
                        id: item,
                        columns: 'costcategory'
                    })
                    log.debug('searchField',searchField)
                   
                    obj.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'description',
                        value: searchField['costcategory'],
                    });
                }
            }
        }

        handlers.saveRecord = (context)=>{
            const obj = context.currentRecord;
            const line = obj.getLineCount({
                sublistId: 'item'
            })
            if(line < 3){
                alert('El registro debe tener 3 o mas lineas') 
                return false
            }
            return true
        } 

        handlers.validateField = (context)=>{
            const obj = context.currentRecord;
            const fieldId = context.fieldId;
            if(fieldId == fields.zip){
                const fieldValue = obj.getValue(fieldId)
                if(fieldValue.length > 5){
                    alert('el codigo postal no puede ser mayor a 5 caracteres')
                    return false
                }
            }
            return true
        }

        handlers.validateLine = (context)=>{
            const obj = context.currentRecord
            const quantity = obj.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            })
            log.audit('Cantidad ', quantity)
            if(quantity > 5){
                alert('la cantidad no pyuede ser mayor a 5')
                return false
            }
            return true
        }

        handlers.lineInit = (context)=>{
            const obj = context.currentRecord;
            const sublistId = context.sublistId;
            if(sublistId == 'item'){
                obj.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 2
                })
            }
        }
        return handlers

    }
);
