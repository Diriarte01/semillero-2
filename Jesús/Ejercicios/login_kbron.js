/**
 * @author Daniel Iriarte
 * @description Suitelet de la pantalla principal de login
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/file', 'N/http', 'N/redirect', 'N/runtime', 'N/url',
    'SuiteScripts/S4 Core/s4_core_security_api_v1',
    'SuiteScripts/commons/s4_portal_cookie_api_v1',
    'SuiteScripts/employees/s4_hcm_employees_api_v1'
], function (file, http, redirect, runtime, url, securityApi, cookieApi, employeesApi) {

    const configObj = {
        title: 'S4 Portal de clientes Habi',
        cssFile: "https://2528095.app.netsuite.com/core/media/media.nl?id=87&c=2528095&h=xv40jY-Jg7_YAinRIpulQ04zBQ-cTZDL0G1qsLuJK-qQvkbx&_xt=.css",
        cssNormalize:"https://2528095.app.netsuite.com/core/media/media.nl?id=11873&c=2528095&h=xXwm2KKMs9RlP83ZTAnCJlncbdCo-oNJ76WnUeG-EDjxJESr&_xt=.css",
        homeScriptId: 'customscript_home_portal_customer',
        homeDeploymentId: 'customdeploy_home_portal_customer'
    };

    function onRequest(context) {
        try {
            var params = context.request.parameters;
            var currentScript = runtime.getCurrentScript();
            if (context.request.method == http.Method.GET) {
                var userData = {};
                var cookiesObj = cookieApi.getCookies({ cookies: context.request.headers.cookie });
                if (cookiesObj.hasOwnProperty('userData')) {
                    var nextUrlTmp = url.resolveScript({
                        deploymentId: configObj.homeDeploymentId,
                        scriptId: configObj.homeScriptId,
                        returnExternalUrl: true
                    });

                    nextUrlTmp = nextUrlTmp.split('&h=');

                    context.response.sendRedirect({
                        identifier: configObj.homeScriptId,
                        id: configObj.homeDeploymentId,
                        type: http.RedirectType.SUITELET,
                        parameters: {
                            h: nextUrlTmp[1]
                        }
                    });
                }
                else {
                    log.debug('params', params)
                    context.response.write(render(params));
                }
            }
            else if (context.request.method == http.Method.POST) {
                log.debug('onRequest - parametros', context.request.parameters);

                var userAuth = securityApi.authenticate({
                    user: params.user,
                    password: params.password
                });

                log.debug('userAuth', userAuth);

                if (userAuth.isSuccessfull) {
                    var userData = employeesApi.searchEmployees({
                        empCode: params.user
                    })[0];

                    userAuth.roles.forEach(function (role) {
                        switch (role.code) {
                            case 'hcmcandid': { }
                            case 'hcmhranalyst': { }
                            case 'hcmpeoplemg': { }
                            case 'hcmadmin': { }
                            case 'hcmpeopleanalyst': {
                                userData.adminaccess = 'Y'
                                break;
                            }
                        }
                    });

                    var cookieUser = {
                        key: 'userData',
                        value: JSON.stringify(userData),
                        exDays: 1
                    };

                    var nextUrl = url.resolveScript({
                        deploymentId: configObj.homeDeploymentId,
                        scriptId: configObj.homeScriptId,
                        returnExternalUrl: true
                    });

                    context.response.write(cookieApi.redirectWithCookies({
                        cookies: [
                            cookieUser
                        ],
                        url: nextUrl
                    }));
                } else {
                    context.response.sendRedirect({
                        identifier: currentScript.id,
                        id: currentScript.deploymentId,
                        type: http.RedirectType.SUITELET,
                        parameters: {
                            h: context.request.parameters.h,
                            error: 'Y'
                        }
                    });
                }
            }
        }
        catch (e) {
            log.error('onRequest - Exception', e.toString());
        }
    }

    function render(params) {
        try {
            return '<html><head>' + renderHead() + '</head><body>' + renderBody(params) + '</body></html>';
        }
        catch (e) {
            log.error('render - Exception', 'Error generando el código HTML.');
            return '<html><body>Ha ocurrido un error, refresque la página.</body></html>';
        }
    }

    function renderHead() {
        try {
            var html = '<meta charset="UTF-8" />';
            html += '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
            html += '<link rel="preconnect" href="https://fonts.gstatic.com" />';
            html += '<link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;500;700;800&display=swap" rel="stylesheet"/>';
            html += '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous"/>';
            html += '<link rel="stylesheet" href="'+configObj.cssFile+'"/>';
            html += '<link rel="stylesheet" href="'+configObj.cssNormalize+'"/>';
            html += `<style>
                        .saludo{
                            color: #6401CD;
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        }
                    </style>`
            html += '<title>' + configObj.title + '</title>';
            log.debug('html head',html);
            return html;
        }catch (e) {
            log.error('renderHead - Exception', e.toString());
            throw e;
        }
    }

    function renderBody(params) {
        try {
            var currentScript = runtime.getCurrentScript();
            var action = url.resolveScript({
                deploymentId: currentScript.deploymentId,
                scriptId: currentScript.id,
                returnExternalUrl: true
            });
            var html = '<main class="login-design">';
            html +=         '<div class="waves">';
            html +=             '<img src="https://2528095.app.netsuite.com/core/media/media.nl?id=11871&c=2528095&h=rrud1GZ60_fUbgpDnUeXMNDw0wxMBzGBTMNwzNbRSeRa0XmH" alt="" />';
            html +=         '</div>';
            html +=         '<div class="login">';
            html +=             '<div class="login-data">';
            html +=                 '<img src="https://tstdrv2671862.app.netsuite.com/core/media/media.nl?id=1&c=TSTDRV2671862&h=b-6Nc4EVorplZvMWbKLFD8J9UWQTeRB8Sq3TQOV3zNmxbjlf" width="400" />';
            html +=                 '<h1>👋<spam class ="saludo">​Bienvenidos al portal de clientes HABI</spam>​🏡​</h1>';
            html +=                 '<form action='+ action +' class="login-form" method="post">';
            html +=                     '<div class="input-group">';
            html +=                         '<label class="input-fill">';
            html +=                             '<input type="text" id="user" name="user" required />';
            html +=                             '<span class="input-label">Usuario</span>';
            html +=                             '<i class="fas fa-envelope"></i>';
            html +=                          '</label>';
            html +=                     '</div>';
            html +=                     '<div class="input-group">';
            html +=                      '<label class="input-fill">';
            html +=                          '<input type="password" name="password" id="password" required />';
            html +=                          '<span class="input-label">Contraseña</span>';
            html +=                          '<i class="fas fa-lock"></i>';
            html +=                      '</label>';
            html +=                     '</div>';
            if (params.hasOwnProperty('error') && params.error == 'Y') {
                html +=             '<p class ="saludo">Credenciales inválidas</p>';
            }
            html +=                     '<a href="#">¿Necesitas una Cuenta?</a>';
            html +=                     '<input type="submit" value="Iniciar Sesión" class="btn-login" />';
            html +=                     '</div>';
            html +=                    '</div>';
            html +=                 '</form>';
            html +=             '</div>'
            html +=         '</div>'
            html +=    '</main>';
            // if (params.hasOwnProperty('error') && params.error == 'Y') {
            //     html +=                             '<div class="alert alert-danger fade-in" role="alert" style="font-size: 70%;">';
            //     html +=                                 '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
            //     html +=                                 '<strong>Error!</strong> No tienes acceso o diligenciaste información erronea, por favor, intenta nuevamente.<br/>';
            //     html +=                             '</div>'
            // }
           

            return html;
        }
        catch (e) {
            log.error('renderBody - Exception', e.toString());
            throw e;
        }
    }

    return {
        onRequest: onRequest
    }
});