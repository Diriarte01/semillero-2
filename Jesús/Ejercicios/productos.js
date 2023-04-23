/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 *@author Jesús Sillé
 */
define(['N/ui/serverWidget', 'N/https', 'N/search'], function (serverWidget, https, search) {
    const handlers = {};
    let responseApi;
    handlers.onRequest = (context) => {
        const request = context.request
        const response = context.response
        const params = request.parameters
        log.audit('params', params)
        const form = serverWidget.createForm({ title: ' ', hideNavBar: true })
        try {
            responseApi = JSON.parse(https.get({ url: 'https://api.escuelajs.co/api/v1/products' }).body)
            if (params['products']) {
                responseApi = responseApi.filter((rs) => rs.category.id == params['products'])
            } if (params['price']) {
                responseApi = responseApi.filter((rs) => rs.price >= parseFloat(params['price']))
            } if (params['title']) {
                responseApi = responseApi.filter((rs) => rs.title.includes(params['title']))
            }
            log.audit('responseApi', responseApi)
            const fieldHtml = form.addField({
                id: 'custpage_fiel1',
                label: ' ',
                type: 'INLINEHTML'
            })
            let html = ` 
                            <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Categories</title>
                    
                    <style>
                    .category {
                        display: inline-block;
                        margin: 20px;
                        cursor: pointer;
                    }
                    
                    .category img {
                        width: 300px;
                        height: 300px;
                        display: inline-block
                    }
                    </style>
                </head>
                <body>
                    <h1>Categories</h1>
                    <div>
                    <div class="category" data-category="1">
                        <img src="111-640x640.jpg" alt="Categoría 1">
                        <h2>Clothes</h2>
                    </div>
                    <div class="category" data-category="2">
                        <img src="electronics.jpg" alt="Categoría 2">
                        <h2>Electronics</h2>
                    </div>
                    <div class="category" data-category="3">
                        <img src="furniture.jpg" alt="Categoría 3">
                        <h2>Furniture</h2>
                    </div>
                    <div>
                        <div class="category" data-category="1">
                        <img src="shoes.jpg" alt="Categoría 4">
                        <h2>Shoes</h2>
                        </div>
                        <div>
                            <div class="category" data-category="1">
                            <img src="other.jpg" alt="Categoría 5">
                            <h2>Others</h2>
                            </div>
                    </div>
                    <div>
                    </div>
                    <script>     
                    </script>
                </body>
                </html>
                `
            fieldHtml.defaultValue = html


        } catch (e) {
            log.audit('Error : ', e);
        } finally {
            response.writePage(form)
        }
    }

    return handlers

});