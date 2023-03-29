/*
Ejercicio UserEvent

Para el siguiente Ejercicio debes implementar tus conocimientos de consumo de API, manejo de Errores e implementación de custom Record.

1- Lee Detalladamente la API de https://fakeapi.platzi.com/en/rest/introduction
2- Genere un Custom Record que permita realizar las funciones (Post, Put y delete) para categorias, usuarios y productos
3- Tu secuencia de comandos debe generar los procesos de la siguiente manera.
    A) Al crear el Registro se debe hacer un post que cree el registro en la API(Categorias, usuarios y productos)
    B) Al editar si hay algun cambio se debe generar la actualizacion del registro en el api de(Categorias, usuarios y productos)
    C) Al eliminar el Registro en NetSuite se debe Eliminar en el API(Categorias, usuarios y productos)
    D) Se debe tener un buen manejo de Error y estos deben ser visibles solo en el Log del Script
*/

/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@author Walt Barros   
 *@description Codigo prueba de UserEvent
 */
define(["N/https"], function (https) {

    function beforeLoad(context) {
        let obj = context.newRecord;

    }

    function beforeSubmit(context) {
        const obj = context.newRecord;
        log.audit('context', context);
        const oldObj = context.oldRecord;
        const typeregister = obj.type;

        /*CATEGORIAS*/

        if (typeregister == "customrecord_s4_us_exercise_w") {
            let valueId;
            const type = context.type;
            if (type == context.UserEventType.CREATE) {
                const options = {
                    "name": obj.getValue("custrecord126"),
                    "image": obj.getValue("custrecord127"),
                }
                let request = https.post({
                    body: options,
                    url: "//api.escuelajs.co/api/v1/categories/",
                })
                response = request.body;
                log.audit('response', typeof response);
                valueId = JSON.parse(response).id;
                log.audit('valueId', valueId);
                obj.setValue('custrecord125', valueId);

            }
            if (type == context.UserEventType.EDIT) {
                const obj2 = {};
                const valueOldName = oldObj.getValue('custrecord126');
                const valueOldImage = oldObj.getValue('custrecord127');
                if (valueImage != valueOldImage) {
                    obj2.image = valueOldImage;
                }
                if (valueOldName != valueOldName) {
                    obj2.name = valueOldName;
                }

                if (obj2.keys(obj2).length > 0) {

                    const request = https.put({
                        body: obj2,
                        url: "//api.escuelajs.co/api/v1/categories/" + obj.getValue('custrecord125'),
                    })
                    log.audit('Request response: ', request)

                }
            }
            if (type == context.UserEventType.DELETE) {
                const request = https.delete({ url: "//api.escuelajs.co/api/v1/categories/" + obj.getValue('custrecord125'),});
                log.audit('Request response: ', request)
            }

        }

        /*PRODUCTOS*/

        if (typeregister == 'customrecordcustomrecord_s4_us_prod_walt' ){
            let valueId;
            const type = context.type;
            const valueName = obj.getValue('custrecord128');
            const valueImage = obj.getValue('custrecord129');
            const valuePrice = obj.getValue('custrecord130');
            const valueCategoriId = obj.getValue('custrecord131');
            const valueDescription = obj.getValue('custrecord132');
            
            let response;
            if (type == context.UserEventType.CREATE) {
                const options = {
                    name: valueName,
                    price: valuePrice,
                    description: valueDescription,
                    categoriId: valueCategoriId,
                    image: valueImage}
                let request = https.post({
                    url: 'https://api.escuelajs.co/api/v1/products',
                    body: options})
                response = request.body;
                log.audit('response', typeof response);
                valueId = JSON.parse(response).id;
                log.audit('valueId', valueId);
                obj.setValue('custrecord133', valueId);
            }
            if (type == context.UserEventType.EDIT) {
                const obj3 = {};
                const valueOldName = oldObj.getValue('custrecord126');
                const valueOldPrice = oldObj.getValue('custrecord130');
                const valueOldCategoriId = oldObj.getValue('custrecord131');
                const valueOldDescription = oldObj.getValue('custrecord132');
                const valueOldImage = oldObj.getValue('custrecord127');
                if (valueImage != valueOldImage) {
                    obj3.image = valueOldImage;
                }
                if (valueOldName != valueOldName) {
                    obj3.name = valueOldName;
                }
                if( valueCategoriId!= valueOldCategoriId){
                    obj3.categoriId = valueOldCategoriId;
                }
                if( valuePrice != valueOldPrice){
                    obj3.price = valueOldPrice;
                }
                if( valueOldDescription != valueOldDescription){
                    obj3.description = valueOldDescription;
                }
                
                if (obj3.keys(obj3).length > 0) {

                    const request = https.put({
                        body: obj3,
                        url: 'https://api.escuelajs.co/api/v1/products' + obj.getValue('custrecord133'),
                    })
                    log.audit('Request response: ', request)

                    }
             }
            if (type == context.UserEventType.DELETE) {
                const request = https.delete({ url: 'https://api.escuelajs.co/api/v1/products' + obj.getValue('custrecord133')});
                log.audit('Request response: ', request)
            }
    }

    /*USUARIO */

    if(typeregister == 'customrecord138'){
        let valueId;
        const type = context.type;
        const valueName = obj.getValue('name');
        const valueEmail = obj.getValue('custrecord134');
        const valuePassword = obj.getValue('custrecord135');
        const valueAvatar = obj.getValue('custrecord136');
        
        let response;
        if (type == context.UserEventType.CREATE) {
            const options = {
                name: valueName,
                email: valueEmail,
                password: valuePassword,
                avatar: valueAvatar,
            }
            let request = https.post({
                url: `https://api.escuelajs.co/api/v1/users/`,
                body: options,
            })
            response = request.body;
            log.audit('response', typeof response);
            valueId = JSON.parse(response).id;
            log.audit('valueId', valueId);
            obj.setValue('custrecord137', valueId);
        }
        if (type == context.UserEventType.EDIT) {
            const obj4 = {};
            const valueOldName = oldObj.getValue('name');
            const valueOldEmail = oldObj.getValue('custrecord134');
            const valueOldPassword = oldObj.getValue('custrecord135');
            const valueOldAvatar = oldObj.getValue('custrecord136');
            if (valueEmail != valueOldImage) {
                obj4.image = valueOldImage;
            }
            if (valueName != valueOldName) {
                obj4.name = valueOldName;
            }
            if( valueCategoriId!= valueOldEmail){
                obj4.categoriId = valueOldEmail;
            }
            if( valuePassword != valueOldPassword){
                obj4.price = valueOldPassword;
            }
            if( valueAvatar != valueOldAvatar){
                obj4.description = valueOldAvatar;
            }
            
            if (obj4.keys(obj4).length > 0) {

                const request = https.put({
                    body: obj4,
                    url: 'https://api.escuelajs.co/api/v1/users/' + obj.getValue('customrecord138'),
                })
                log.audit('Request response: ', request)

            }
        }
        if (type == context.UserEventType.DELETE) {
            
            const request = https.delete({ url: 'https://api.escuelajs.co/api/v1/users/' + obj.getValue('customrecord138')});
            log.audit('Request response: ', request)
        }

    }
 
    }
    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,

    }

});
