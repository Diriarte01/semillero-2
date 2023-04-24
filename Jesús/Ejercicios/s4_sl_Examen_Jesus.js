/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Jesús Sillé
 */
 define(['N/ui/serverWidget', 'N/https'],
 function (serverWidget, https) {

     const handlers = {};
     handlers.onRequest = (context) => {
         const request = context.request;
         const response = context.response;
         const params = request.parameters;
         log.audit('params', params)

         const form = serverWidget.createForm({ title: ' ', hideNavBar:true  })
         try {
             const fldHtml = form.addField({
                 id: 'custpage_fld_html',
                 label: ' ',
                 type: 'inlinehtml',
             })
             const users = JSON.parse(https.get({url: 'https://api.escuelajs.co/api/v1/users',}).body)
             
             

             let html = `
             <html>
               <head>
               <meta charset="UTF-8" />
               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               <title>Iniciar sesión</title>
               <style>                                 
                    *{
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    
                    body{
                        width: 100%;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-image: url('https://tstdrv2720031.app.netsuite.com/core/media/media.nl?id=11492&c=TSTDRV2720031&h=3GH5SVd9Z3BFB7Gde0XszIhyvDAEoa8kdhJQzzmVatqoEH4S');
                        background-size: cover;
                    }
                    form{
                        width: 300px;
                        height: 370px;
                        display: flex;
                        justify-items: center;
                        flex-direction: column;
                        box-shadow: 10px 4px 10px 10px #ccc;
                        border-radius: 20px;
                        box-shadow: none;
                        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
                    }
                    
                    form img{
                        width: 75px;
                        height: 75px;
                        margin: 0 auto;
                        
                        
                    
                    }
                    
                    form input[type="text"], input[type="password"]{
                        outline: 0;
                        border: 1px solid #ccc;
                        width: 80%;
                        padding: 10px;
                        display: block;
                        margin: 0 auto;
                        text-align: center;
                        
                    }
                    form label{
                        font-weight: 500;
                        padding: 10px;
                        text-align: center;
                        
                    }
                    .box-visible{
                        width: 100%;
                        height: auto;
                        justify-items: center;
                        align-items: center;
                        text-align: center;
                    }
                    
                    form button{
                        outline: 0;
                        border: 0;
                        background-color: royalblue;
                        border-radius: 20px;
                        cursor: pointer;
                        width: 250px;
                        padding: 5px;
                        transition: all .3s ease-in-out;
                        text-align: center;
                        color: #fff;
                        font-weight: 500;
                        text-align: center;
                        display: block;
                        margin: 0 auto;
                    
                    }
                    form button:hover{
                        opacity: .75;
                        text-align: center;
                    }
                    
                    p{
                        text-align: center;
                    }
                 </style>
               </head>
             <body>
                <form>
       
                        <img src="login-modified.jpg" alt="User-img">
                        <label for="username">Usuario</label>
                        <input type="text" id="username" placeholder="Ingresa tu usuario" required><br>
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" placeholder="Ingresa tu contraseña" required><br>
                        <div class="box-visible">
                        <input type="checkbox" id="visible">
                        <label for="visible">Mostrar Contraseña</label>                 
                        </div>

                     <button type="submit" id="submit">Iniciar Sesión</button>
                    <p><a href ="#">¿Olvidaste tu Contraseña?</a></p>
     
                    </form>
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
                                 window.location.href = 'https://tstdrv2720031.app.netsuite.com/app/site/hosting/scriptlet.nl?script=156&deploy=1';
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
             response.write(html)
         }
     }

     return handlers
 }
);