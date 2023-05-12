/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
 define(['N/https', 'N/url'], 
 function(https, url ) {

     function onRequest(context) {
         const request = context.request;
         const response = context.response;
         const headers = request.headers;
         const responseCategories = JSON.parse(https.get({ url: 'https://api.escuelajs.co/api/v1/categories' }).body);
         try{
             log.debug('headers: ', headers)
             const cookiesObj = getCookies({cookies: headers.cookie});
             const userData = JSON.parse(cookiesObj['userData'])
             log.debug('userData', userData)
             let html = '';
             html += `
             <html lang="en">
             <head>
                 <meta charset="UTF-8">
                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>Categoria</title>
                 <style>
                     h1 {
                         text-align: center;
                         font-family: 'Montserrat', sans-serif;
                         color: rgba(255, 255, 255, 0.9);
                     }
                 
                     body {
                         background-image: url('https://tstdrv2720031.app.netsuite.com/core/media/media.nl?id=11594&c=TSTDRV2720031&h=aPr1gabHq-m9-GNWjpBzSeNgK8WSXn7JfZb6VrSR_2FYV8xw');
                         background-size: cover;
                         background-position: center;
                         text-align: center;
                         color: rgba(255, 255, 255, 0.9);
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
                         color: rgba(255, 255, 255, 0.9);
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
             <h1>Hola ${userData.name} Bienvenido al Consumo Api fake de platzi</h1>
             <div id="category-container">`
             for(let i in responseCategories){
                 const action = url.resolveScript({
                     deploymentId: 'customdeploy_s4_sl_exam_products',
                     scriptId: 'customscript_s4_sl_exam_products',
                     params:{
                         categorieId: responseCategories[i].id,
                         categorieName: responseCategories[i].name
                     },
                     returnExternalUrl: true
                 });
                 log.debug('action: ', action)
                 html += `
                 <div class="category" data-category="${i}">
                     <a href="${action}">
                         <img src=${responseCategories[i].image} alt="">
                     </a>
                     <h2>${responseCategories[i].name}</h2>
                 </div>`
             }
             html +=`
             </div>
             </body>
             </html>`
             response.write(html)
         }catch(e){
             log.error('error', e)
         }
     }

     function getCookies(params) {
         const cookies = {};
         params.cookies.split(';').forEach(function(cookie) {
             const cookieParsed = cookie.trim().split('=');
             cookies[cookieParsed[0]] = cookieParsed[1];
             if (cookieParsed.length > 2) {
                 for (var i = 2; i < cookieParsed.length; i++) {
                     cookies[cookieParsed[0]] += '=' +cookieParsed[i];
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
