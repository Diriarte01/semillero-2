/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/https'],
    function (https) {
        const handlers = {};
        handlers.pageInit = (context) => { }

        handlers.pdfOcHabi = (internalId) => {
           
            const headerObj = {
                "name": 'Accept-Language',
                "value": 'en-us',
                "Content-Type": 'application/json'
            }; 
            var preloader = document.getElementById('preloader');
            var body = document.getElementsByTagName('body')[0];
            https.post.promise({
                url: '/app/site/hosting/restlet.nl?script=1853&deploy=1',
                body: JSON.stringify({ internalId:internalId }),
                headers: headerObj
            })
            .then(function (response) {
                console.log('response, ',response )            
            })
            .catch(function onRejected(reason) {
                console.log({
                    title: 'Invalid Request: ',
                    details: reason
                });
            }).finally(function () {
                loading.hide();
            });
            window.location.reload()
        }
        return handlers
    }
);
