/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/https'],
    function (serverWidget, https) {

        const handlers = {};

        handlers.onRequest = (context) => {
            const request = context.request;
            const response = context.response;
            const params = request.parameters;
            const form = serverWidget.createForm({ title: ' ' })
            const responseApi = JSON.parse(https.get({ url: 'https://api.escuelajs.co/api/v1/products' }).body);
            log.debug('responseApi', typeof responseApi)
            try {
                const fieldHtml = form.addField({
                    id: 'custpage_field',
                    label: ' ',
                    type: 'INLINEHTML',
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
                `
                
                for(let i in responseApi){
                    log.debug('i',i);
                    log.debug('responseApi',responseApi[i]);
                    html += `
                    <div class="item">
                        <h1>${responseApi[i].title[0]}</h1>
                        <h2>${responseApi[i].price[0]}</h2>
                        <img src=${responseApi[i].images[0]} alt="">
                     </div>
                    `
                }

                html +=`
                        </div>
                        </body>
                        <script>
                            alert('Review Api Fake');
                        </script>
                </html>
                `        
                fieldHtml.defaultValue = html
            } catch (e) {
                log.error('Error creating', e)
            } finally {
                response.writePage(form)
                
            }
        }
        return handlers;
    });
