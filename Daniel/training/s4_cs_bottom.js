/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['./pop_up.js'], 
    function(pop_up) {
        const handlers = {};

        handlers.pageInit = (context)=>{}

        handlers.popUp = (id)=>{
            console.log(id);
            pop_up.fire({
                title: 'Submit your Github username',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Look up',
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                  return fetch(`//api.github.com/users/${id}`)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(response.statusText)
                      }
                      return response.json()
                    })
                    .catch(error => {
                        pop_up.showValidationMessage(
                        `Request failed: ${error}`
                      )
                    })
                },
                allowOutsideClick: () => !pop_up.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                    pop_up.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                  })
                }
              })
        }
        return handlers;
    }
);
