/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/ui/dialog'],

    function (dialog) {

        function helloworld() {

            var options = {
                title: 'Hello!',
                message: 'Hello, World!'

            };

            try {
                dialog.alert(options);

                log.debug({
                    title: 'sucess',
                    details: 'Alert displayed successfully'

                });

            } catch (e) {

                log.error({
                    title: e.name,
                    details: e.message
                });
            }
        }
        return {
            pageInit: helloworld
        };

    });
