/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Daniel Iriarte
 *@module Public
 *@Empresa Grupo SOl4it
 *@Description Codigo de clase ClientScript
 */
define(['N/ui/dialog'],
    function(dialog) {

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
            if(fieldId == fields.capital){
                const fieldValue = obj.getValue(fieldId)
                alert('Se ha cambiado el valor del campo: capital y su nuevo valor es ' + fieldValue)
            }
        }

        handlers.saveRecord = (context)=>{
            window.open('www.google.com','_blank')
            return false
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

        return handlers

    }
);
