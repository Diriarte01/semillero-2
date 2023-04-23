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
         try {
             const fldHtml = form.addField({
                 id: 'custpage_fld_html',
                 label: ' ',
                 type: 'inlinehtml',
             })
             const users = JSON.parse(https.get({
                 url: 'https://api.escuelajs.co/api/v1/users',
             }).body)

             let html = `
             <!DOCTYPE html>
             <html>
               <head>
               <meta charset="UTF-8" />
               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               <title>Iniciar sesión</title>
               <style>        
                 form {
                     width: 200px;
                     margin: 0 auto;
                     text-align: center;
                     padding: 20px;
                     background-color: #fff;
                     border: 1px solid #ccc;
                     border-radius: 5px;
                     box-sizing: border-box;
                     background-image: url("https://tstdrv2736577.app.netsuite.com/core/media/media.nl?id=8979&c=TSTDRV2736577&h=cpaXW6oVnp3gWhcLJz5gpR12Bw2RkmTBEwW98VFiZzqKgDCS&fcts=20230413081336");
                 }
                   
                   h2 {
                     margin-top: 0;
                   }
                   
                   label {
                     display: block;
                     text-align: left;
                     font-size: 14px;
                     margin-bottom: 5px;
                     font-weight: bold;
                   }
                   
                   input[type="text"],
                   input[type="password"] {
                     width: 100%;
                     padding: 8px;
                     margin-bottom: 10px;
                     border: 1px solid #ccc;
                     border-radius: 4px;
                     box-sizing: border-box;
                   }
                   
                   input[type="submit"] {
                     background-color: #4CAF50;
                     color: #fff;
                     padding: 10px 16px;
                     border: none;
                     border-radius: 5px;
                     cursor: pointer;
                     font-size: 16px;
                   }
                   
                   input[type="submit"]:hover {
                     background-color: #3e8e41;
                     color: #fff;
                     padding: 10px 16px;
                     border: none;
                     border-radius: 5px;
                     cursor: pointer;
                     font-size: 16px;
                   }
                 </style>
               </head>
             <body>
                 <div class="form-container">
                     <form action='#' class="login-form" method="get">
                         <h2>Bienvenido</h2>
                         <label for="username">Usuario:</label>
                         <input type="text" id="username" name="username" placeholder="ingresa tu usuario"><br>
                     
                         <label for="password">Contraseña:</label>
                         <input type="password" id="password" name="password" placeholder="ingresa tu contraseña"><br>
                     
                         <input type="submit" value="Iniciar sesión">
                     </form>
                 </div>
                 <script>
                     const form = document.querySelector('form');
                     const username = document.querySelector('#username');
                     const password = document.querySelector('#password');
                     let users = ${JSON.stringify(users)}
                     // Agregar un evento de escucha para el envío del formulario
                     form.addEventListener('submit', function (event) {
                         event.preventDefault(); // Prevenir que se envíe el formulario
                     
                         // Validar los campos del formulario
                         if (username.value.trim() === '' || password.value.trim() === '') {
                             alert('Por favor ingresa tu usuario y contraseña');
                             return;
                         }else{
                             let success = false;
                             let message = '';
                             console.log(users.length)
                             for(let i = 0; i < users.length; i++) {
                                 message = 'Correo invalido';
                                 if(users[i].email == username.value){
                                     message = 'Contraseña Incorrecta';
                                     if(users[i].password == password.value){
                                         success = true;
                                     }
                                     break;
                                 }
                             }
                             if(!success){
                                 alert(message);
                                 return;
                             }else{
                                 window.location.href = 'https://fakeapi.platzi.com/';
                             }
                         }                        
                     });
                 </script>
               </body>
             </html>
             `
             fldHtml.defaultValue = html;
         } catch (e) {
             log.debug('Error al rendering', e)
         } finally {
             response.writePage(form)
         }
     }

     return handlers
 }
);