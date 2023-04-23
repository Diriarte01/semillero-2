/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Jesús Sillé
 */
 define(['N/ui/serverWidget', 'N/https'], function (serverWidget, https) {
    const handlers = {};
    let responseApi;
    handlers.onRequest = (context) => {
        const request = context.request
        const response = context.response
        const params = request.parameters
        log.audit('params', params)
        const form = serverWidget.createForm({ title: ' ', hideNavBar:true })
        try {
            const users = JSON.parse(https.get({url: 'https://api.escuelajs.co/api/v1/users',}).body)
            responseApi = JSON.parse(https.get({ url: 'https://api.escuelajs.co/api/v1/categories', }).body)
            if (params['categorie']) {
                responseApi = responseApi.filter((rs) => rs.category.id == params['categorie'])
            } if (params['price']) {
                responseApi = responseApi.filter((rs) => rs.price >= parseFloat(params['price']))
            } if (params['title']) {
                responseApi = responseApi.filter((rs) => rs.title.includes(params['title']))
            }if (params['users']){ responseApi = responseApi.filter((rs) => rs.price >= parseFloat(params['users'])) }
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
                font-style: italic;
            }
                    
              
            body{
                background-color: papayawhip;
              
            }
            .container{
                display: grid;
                background-image: url("https://tstdrv2736577.app.netsuite.com/core/media/media.nl?id=8979&c=TSTDRV2736577&h=cpaXW6oVnp3gWhcLJz5gpR12Bw2RkmTBEwW98VFiZzqKgDCS&fcts=20230413081336");
            }
            .item{
                justify-self: center;
                margin-top: 30px;
                margin-bottom: 30px;

                
            }
            
            img{
                width: 500px;
                height: 500px;
                padding: 30px;
                border: 2px solid black;
                box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
                transition: transform 0.2s ease-in-out;              
                
            }
            img:hover {
                transform: scale(1.05);
              }

            #bottom{
                border-color: #ccc;
                background-color: green;
                border-radius: 10px; 
                font-style: italic;
                padding: 10px 10px;
                font-size: 10px;
                font-weight: bold;
                text-transform: uppercase;
                box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                box-shadow: 2px 2px 2px #888;
                transition: transform 0.2s ease-in-out;
            }

        #bottom:hover{
            transform: scale(3.1);
                }       
            }

            #select{
                font-style: italic;
                font-family: "Helvetica Neue", sans-serif;
                font-size: 24px;
                font-weight: bold;
                text-transform: uppercase;
                color: #333;
                text-shadow: 1px 1px #ccc;
            }            
            </style>
            </head>
            <body>
             <h1>👋<spam class ="saludo">​Bienvenidos a la tienda virtual de platzi</spam>​🏡​</h1>;           
            <div class="container">
            <div class="item"><a href= "#" id="bottom">Cerrar sesión</a></div>
            <div class="img"></div>
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