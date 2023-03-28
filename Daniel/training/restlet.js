/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define(['N/record'], 
    function(record) {

        const handlers = {};

        const response = { code:500, success: false, error: [], data: [] };
        const validator = {
            customer:{
                name: { type:'string', isMandatory: true },
                subsidiary: { type:'number', isMandatory: true }
            },
            vendor:{
                name: { type:'string', isMandatory: true },
                subsidiary: { type:'number', isMandatory: true }
            }
        }

        const validators = (type , payload) =>{
            const response = [];

            if(!validator.hasOwnProperty(type)){
                response.push({
                    name: 'Falta de registro',
                    message: 'el registro al que quieres acceder no se tiene acceso en esta api solo recibe: ' + Object.keys(validator).join()
                })
            }else{
                const validatorType = validator[type]
                for(let i in validatorType){
                    
                    if(!payload.hasOwnProperty(i) && validatorType[i].isMandatory ){
                        response.push({
                            name:'llave Obligatoria',
                            message: 'el argumento '+ i + ' es obligatorio en el JSON'
                        })
                    }else if(payload.hasOwnProperty(i)){
                        if(validatorType[i].type != typeof payload[i] ){
                            response.push({
                                name:'tipo de dato incorrecto',
                                message: 'el tipo de dato de '+ i + ' es incorrecto, debe ser ' + validatorType[i].type
                            })
                        }
                    }
                    
                }
            }
            return response
        }

        handlers.post = (context)=>{
            log.debug('context: ', context)
            let validateData; 
            try{
                validateData = validators(context.type, context.payload);
                const payload = context.payload;
                if(validateData.length > 0 ){
                    throw new Error("llaves", { details: validateData})
                }
                log.debug('paso la vlidacion', validateData)
                const obj = record.create({ type: context.type })
                obj.setValue('companyname', payload.name )
                obj.setValue('subsidiary', payload.subsidiary)
                const recordSave = obj.save();
                log.debug('recordSave: ', recordSave)
                response.data.push({
                    record: context.type,
                    recordId: recordSave,
                })
                response.code = 200;
                response.success = true;
            }catch(e){
                log.debug('error al crear', e)
                if(e.message == 'llaves'){
                    response.error = validateData
                    response.code = 404;
                }else{
                    response.error.push({
                        record: context.type,
                        message: e.message
                    })
                }
            }finally{
                return response
            }
        }

        return handlers;
    }
);
