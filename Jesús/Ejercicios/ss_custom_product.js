/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
define(['N/http', 'N/https'],
    function (http, https) {

        function onRequest(context) {
            const request = context.request;
            const response = context.response;
            const headers = request.headers;
            const params = request.parameters;
            const responseProd = JSON.parse(https.get({ url: 'https://api.escuelajs.co/api/v1/products/?categoryId=' + params['categorieId'] }).body);
            try {
                log.debug('responseProd: ', responseProd)
                var cookiesObj = getCookies({ cookies: headers.cookie });
                const userData = JSON.parse(cookiesObj['userData'])
                let html = '';

                html += `
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Productos</title>
                <style>
                h1 {
                    text-align: center;
                    font-family: 'Montserrat', sans-serif;
                }
                
                    body {
                        background-color: #61868E;
                        background-size: cover;
                        background-position: center;
                        text-align: center;
                    }
                    
                    #category-container {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        grid-gap: 2px;
                    }
                    
                    .category {
                        display: inline-block;
                        cursor: pointer;
                        font-family: 'Montserrat', sans-serif;
                        text-align: center;
                    }
                    
                    
                    .category img {
                        width: 300px;
                        height: 300px;
                        display: inline-block;
                        margin: 0 auto;
                        border-radius: 10%;
                        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
                        border: 1px solid black;
                    }
                    
                    img:hover {
                        transform: scale(1.05);
                    }
                    
                    </style>
                    </head>
                    <body>
                    <h1>Hola bienvenido a la categoria ${params['categorieName']} </h1>`
                if (responseProd.length > 0) {
                    html += '<div id="category-container">';
                    for (let i in responseProd) {
                        html += `
                            <div class="category" data-category="${i}">
                            <img src=${responseProd[i].images[0]} alt="">
                            <h2>${responseProd[i].title}</h2>
                            <p>Precio: ${responseProd[i].price}</p>
                            </div>`
                    }
                    html += `
                        </div>
                        </body>
                        </html>`
                } else {
                    html += `
                        <h2>No hay Productos dentro de la categoria</h2>
                        </body>
                        </html>`
                }
                response.write(html)
            } catch (e) {
                log.error('error', e)
            }
        }

        function getCookies(params) {
            var cookies = {};
            params.cookies.split(';').forEach(function (cookie) {
                var cookieParsed = cookie.trim().split('=');
                cookies[cookieParsed[0]] = cookieParsed[1];
                if (cookieParsed.length > 2) {
                    for (var i = 2; i < cookieParsed.length; i++) {
                        cookies[cookieParsed[0]] += '=' + cookieParsed[i];
                    }
                }
            });
            return cookies;
        }

        return {
            onRequest: onRequest
        }
    }
);
