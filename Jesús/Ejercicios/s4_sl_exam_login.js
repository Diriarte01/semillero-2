/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
 define(['N/runtime', 'N/https', 'N/url', 'N/http'],
 function (runtime, https, url, http) {

     function onRequest(context) {
         const request = context.request
         const response = context.response
         const params = request.parameters

         try {
             const currentScript = runtime.getCurrentScript();
             if (request.method == 'GET') {
                 const action = url.resolveScript({
                     deploymentId: currentScript.deploymentId,
                     scriptId: currentScript.id,
                     returnExternalUrl: true
                 });
                 var html = '';
                 html += `
             <html lang="en">
                 <head>
                 <meta charset="UTF-8">
                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <link rel="stylesheet" href="https://tstdrv2736577.app.netsuite.com/core/media/media.nl?id=8982&c=TSTDRV2736577&h=nwR4znUU4YJsqxyz0NXitJq1FKyNAVpx3VruXa0t1PXF5rpW&_xt=.css">
                 <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
                 <title>Iniciar Sesión</title>
                 
                 </head>
                 <body>
                 
                 <form form action='${action}' method="post">
                     <img src="https://tstdrv2736577.app.netsuite.com/core/media/media.nl?id=8981&c=TSTDRV2736577&h=voa8RDL2IT1e1905Bl8xak2Crv1ZLj0pwydIPhYbH1qfaDrV" alt="User-img">
                     <label for="username">Usuario</label>
                     <input type="text" id="username" name="username" placeholder="Ingresa tu usuario" required><br>
                     <label for="password">Contraseña</label>
                     <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required><br>
                     <div class="box-visible">
                     <input type="checkbox" id="visible">
                     <label for="visible">Mostrar Contraseña</label>
                     </div>
                     <button type="submit" id="submit">Iniciar Sesión</button>`
                 if(params['error'] == 'Y'){
                     html += '<br></br>'
                     html += '<p><a href ="#">Credenciales inválidas</a></p>'
                 }
                 
        html += `</form>
                 </body>
             </html>`
                 response.write(html)
             } else {
                 let success = false;
                 log.debug('onRequest Post', params)
                 log.debug('onRequest Post', params['username'])
                 let user;
                 const users = JSON.parse(https.get({ url: 'https://api.escuelajs.co/api/v1/users', }).body)
                 for (let i = 0; i < users.length; i++) {
                     if (users[i].email == params['username']) {
                         if (users[i].password == params['password']) {
                             user = users[i];
                             success = true;
                         }
                         break;
                     }
                 }
                 if (success) {
                     const cookieUser = {
                         key: 'userData',
                         value: JSON.stringify(user),
                         exDays: 1
                     };

                     const nextUrl = url.resolveScript({
                         deploymentId: 'customdeploy_s4_sl_exam_categorie',
                         scriptId: 'customscript_s4_sl_exam_categorie',
                         returnExternalUrl: true
                     });

                     response.write(
                         redirectWithCookies({
                             cookies:[
                                 cookieUser
                             ],
                             url: nextUrl
                         })
                     )
                 } else {
                     response.sendRedirect({
                         identifier: currentScript.id,
                         id: currentScript.deploymentId,
                         type: http.RedirectType.SUITELET,
                         parameters: {
                             h: params['h'],
                             error: 'Y'
                         } 
                     })
                 }
             }
         } catch (e) {
             log.error('error in rendering', e)
         }
     }

     function setCookie(params) {
         let expires = '';
         if (params.hasOwnProperty('exDays') || params.value == '') {
             const d = new Date();
             if (params.value == '') {
                 d.setTime(0);
             }
             else {
                 d.setTime(d.getTime() + (params.exDays * 24 * 60 * 60 * 1000));
             }
             expires = 'expires=' + d.toUTCString() + ';';
         }
         return params.key + '=' + params.value + ';' + expires + 'path=/';
     }

     function functionSetCookies(params) {
         if (!params.hasOwnProperty('cookies')) throw new Error('No se proporciono el elemento cookies');
 
         let html =  'function ' + params.function + '() {';
         params.cookies.forEach(function (cookie) {
             if (!cookie.hasOwnProperty('key')) throw new Error('No se proporciono el elemento key en la cookie: ' +cookie);
             if (!cookie.hasOwnProperty('value')) throw new Error('No se proporciono el elemento value en la cookie: ' +cookie);
             html +=     'document.cookie = \'' + setCookie(cookie) + '\';';
         });
         if (params.hasOwnProperty('url') && params.url != '') {
             html +=     'window.location.replace("' + params.url + '");';
         }
         html +=     '}';
 
         return html;
     }

     function redirectWithCookies(params) {
         if (!params.hasOwnProperty('cookies')) throw new Error('No se proporciono el elemento cookies');
         if (!params.hasOwnProperty('url')) throw new Error('No se proporciono el elemento url');
         params.function = 'setCookies';
 
         let html =  '<html>';
         html +=         '<head>';
         html +=             '<title>S4 Login</title>';
         html +=             '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
         html +=             '<script type="text/javascript">';
         html += functionSetCookies(params);
         html +=                 'window.onload = ' + params.function + ';';
         html +=             '</script>';
         html +=         '</head>';
         html +=         '<body>';
         html +=         '</body>';
         html +=     '</html>';
 
         return html;
     }

     return {
         onRequest: onRequest
     }
 });
