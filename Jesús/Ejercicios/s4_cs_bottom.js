/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Jesús Sillé
 */
define(['./pop_up.js'], 
    function(pop_up) {
        const handlers = {};

        handlers.pageInit = (context)=>{}

        handlers.popUp = ()=>{
            pop_up.fire({
                tittle: 'información del cliente',
                text:  'Información del cliente\n' + 'Correo:\n' + 'Nombre:',
                showCancelButton: true,
                confirmButton: '#4933FF',
                cancelButtonColor:'#F60D09 ',
                confirmButtonText: 'Confirm'
                
            }).then(()=>{
                
            });


        }

        return handlers;

    

    
}
);
