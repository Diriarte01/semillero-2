/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Xavier Gonzalez 
 */
define(['N/ui/serverWidget', 'N/https'], function (serverWidget, https) {
    const handlers = {};
    let responseApi;
    handlers.onRequest = (context) => {
        const request = context.request
        const response = context.response
        const params = request.parameters
        log.audit('params', params)
        const form = serverWidget.createForm({ title: ' ' })
        try {
            responseApi = JSON.parse(https.get({ url: 'https://api.escuelajs.co/api/v1/products' }).body);
            if (params['categorie']) {
                responseApi = responseApi.filter((rs) => rs.category.id == params['categorie'])
            } if (params['price']) {
                responseApi = responseApi.filter((rs) => rs.price >= parseFloat(params['price']))
            } if (params['title']) {
                responseApi = responseApi.filter((rs) => rs.title.includes(params['title']))
            }
            log.audit('responseApi', responseApi)
            const fieldHtml = form.addField({
                id: 'custpage_fiel1',
                label: ' ',
                type: 'INLINEHTML'
            })
            let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
            h1{
                text-align: center;
            }
            body{
                background-color: papayawhip;
            }
            .container{
                display: grid;
            }
            .item{
                justify-self: center;
                margin-top: 20px;
            }
            
            img{
                width: 700px;
                height: 400px;
            }
            
            </style>
            </head>
            <body>
            <h1>Review Api Fake</h1>
            <div class="container">
            <select name="mySelect" id="select">
            <option value="categorie">Categoria</option>
            <option value="price">Precio</option>
            <option value="title">Nombre</option>
            </select>
            <input type="text" name="tipo_de_dato" id="value" />
            <input type="button" name="filter" value="Filtrar" onclick="filtrar();"/>
            `
            for (let i in responseApi) {

                html += `
                <div class="item">
                    <h3>${responseApi[i].title}</h3>
                    <h3>${responseApi[i].price}</h3>
                    <img src=${responseApi[i].images[0]} alt="">
                 </div>
                `
            }

            html += `
            </div>
            </body>
            <script type="text/javascript">
            function filtrar(){
                var selectElement = document.getElementById("select");
                var selectValue = selectElement.value;
                var inputValue = document.getElementById("value").value;
                console.log('inputValue', inputValue)
                let urlRedirect = 'https://tstdrv2720031.app.netsuite.com/app/site/hosting/scriptlet.nl?script=145&deploy=1'
                location.search
                    .substr(1)
                    .split("&")
                    .forEach((item) => {
                        const tmp = item.split("=");
                        if (tmp[0] == selectValue && !urlRedirect.includes(selectValue)) {
                            if (tmp[1] != null && tmp[1] != ""){
                                urlRedirect += '&'+selectValue+'='+decodeURIComponent(tmp[1]);
                            }else if(urlRedirect.includes(selectValue)){
                            }
                        }
                    });
                urlRedirect += '&'+selectValue+'='+inputValue;
                
                window.onbeforeunload = null;
                window.location.replace(urlRedirect);
               
            }
            </script> 
                    
            </html>
            `
            fieldHtml.defaultValue = html


        } catch (e) {
            log.audit('Error : ', e);
        } finally {
            response.writePage(form)
        }
    }

    return handlers

});
