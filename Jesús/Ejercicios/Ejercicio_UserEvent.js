/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@author Jesús Sillé
 */
 define(["N/https"], function (https) {

    function beforeLoad(context) {
        let obj = context.newRecord;


    }

    function beforeSubmit(context) {
        const obj = context.newRecord;
        log.audit('context', context)
        const oldObj = context.oldRecord;
        const tipo = obj.type;

        /*Category*/
        if (tipo == "customrecord_s4_ue_exercise") {
            
            let valueId;
            const valueName = obj.getValue('custrecordname');
            const valueImage = obj.getValue('custrecordimage');
            const url = `https://api.escuelajs.co/api/v1/categories/`
            let response;
            if (context.type == context.UserEventType.CREATE) {
                const body = {
                    name: valueName,
                    image: valueImage}
                let request = https.post({
                    url: url,
                    body: body})
                response = request.body;
                log.audit('response', typeof response);
                valueId = JSON.parse(response).id;
                log.audit('valueId', valueId);
                obj.setValue('custrecordidcategori', valueId);
            }
            if (context.type == context.UserEventType.EDIT) {
                const object = {};
                const valueOldName = oldObj.getValue('custrecordname');
                const valueOldImage = oldObj.getValue('custrecordimage');
                if (valueImage != valueOldImage) {
                    object.image = valueOldImage;
                }
                if (valueOldName != valueOldName) {
                    object.name = valueOldName;
                }
                const id2 = obj.getValue('custrecordidcategori');
                if (Object.keys(object).length > 0) {

                    const request = https.put({
                        body: object,
                        url: url + id2
                    })
                    log.audit('Request response: ', request)

                }
            }
            if (context.type == context.UserEventType.DELETE) {
                const id2 = obj.getValue('custrecordidcategori');
                const request = https.delete({ url: url + id2 });
                log.audit('Request response: ', request)
            }
            
        }
        /*Products*/
        if (tipo == 'customrecord_s4_ue_prod_exercise' ){
                let valueId;
                const valueName = obj.getValue('custrecord_title_products');
                const valueImage = obj.getValue('custrecord_image_products');
                const valuePrice = obj.getValue('custrecord_price_products');
                const valueCategoriId = obj.getValue('custrecord_idcategori_products');
                const valueDescription = obj.getValue('custrecord_description_prodructs');
                const url = `https://api.escuelajs.co/api/v1/products/`
                let response;
                if (context.type == context.UserEventType.CREATE) {
                    const body = {
                        name: valueName,
                        price: valuePrice,
                        description: valueDescription,
                        categoriId: valueCategoriId,
                        image: valueImage}
                    let request = https.post({
                        url: url,
                        body: body})
                    response = request.body;
                    log.audit('response', typeof response);
                    valueId = JSON.parse(response).id;
                    log.audit('valueId', valueId);
                    obj.setValue('custrecord_id_products', valueId);
                }
                if (context.type == context.UserEventType.EDIT) {
                    const object = {};
                    const valueOldName = oldObj.getValue('custrecordname');
                    const valueOldPrice = oldObj.getValue('custrecord_price_products');
                    const valueOldCategoriId = oldObj.getValue('custrecord_idcatedori_products');
                    const valueOldDescription = oldObj.getValue('custrecord_description_prodructs');
                    const valueOldImage = oldObj.getValue('custrecordimage');
                    if (valueImage != valueOldImage) {
                        object.image = valueOldImage;
                    }
                    if (valueOldName != valueOldName) {
                        object.name = valueOldName;
                    }
                    if( valueCategoriId!= valueOldCategoriId){
                        object.categoriId = valueOldCategoriId;
                    }
                    if( valuePrice != valueOldPrice){
                        object.price = valueOldPrice;
                    }
                    if( valueOldDescription != valueOldDescription){
                        object.description = valueOldDescription;
                    }
                    const id2 = obj.getValue('custrecord_id_products');
                    if (Object.keys(object).length > 0) {

                        const request = https.put({
                            body: object,
                            url: url + id2
                        })
                        log.audit('Request response: ', request)

                    }
                }
                if (context.type == context.UserEventType.DELETE) {
                    const id2 = obj.getValue('custrecord_id_products');
                    const request = https.delete({ url: url + id2 });
                    log.audit('Request response: ', request)
                }
        }
        /*User*/
        if(tipo == 'customrecord_s4_users_exercise'){
            let valueId;
            const valueName = obj.getValue('name');
            const valueEmail = obj.getValue('custrecord_email_users');
            const valuePassword = obj.getValue('custrecord_password_users');
            const valueAvatar = obj.getValue('custrecord_avatar_users');
            const url = `https://api.escuelajs.co/api/v1/users/`
            let response;
            if (context.type == context.UserEventType.CREATE) {
                const body = {
                    name: valueName,
                    email: valueEmail,
                    password: valuePassword,
                    avatar: valueAvatar}
                let request = https.post({
                    url: url,
                    body: body})
                response = request.body;
                log.audit('response', typeof response);
                valueId = JSON.parse(response).id;
                log.audit('valueId', valueId);
                obj.setValue('custrecord_id_products', valueId);
            }
            if (context.type == context.UserEventType.EDIT) {
                const object = {};
                const valueOldName = oldObj.getValue('name');
                const valueOldEmail = oldObj.getValue('custrecord_email_users');
                const valueOldPassword = oldObj.getValue('custrecord_password_users');
                const valueOldAvatar = oldObj.getValue('custrecord_avatar_users');
                if (valueEmail != valueOldImage) {
                    object.image = valueOldImage;
                }
                if (valueName != valueOldName) {
                    object.name = valueOldName;
                }
                if( valueCategoriId!= valueOldEmail){
                    object.categoriId = valueOldEmail;
                }
                if( valuePassword != valueOldPassword){
                    object.price = valueOldPassword;
                }
                if( valueAvatar != valueOldAvatar){
                    object.description = valueOldAvatar;
                }
                const id2 = obj.getValue('custrecord_id_users');
                if (Object.keys(object).length > 0) {

                    const request = https.put({
                        body: object,
                        url: url + id2
                    })
                    log.audit('Request response: ', request)

                }
            }
            if (context.type == context.UserEventType.DELETE) {
                const id2 = obj.getValue('custrecord_id_users');
                const request = https.delete({ url: url + id2 });
                log.audit('Request response: ', request)
            }
        }
    }

    function afterSubmit(context) {

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    }
});