module.exports = function (app, db) {
    
    // Delete a product
    // http://localhost:5000/v1/product
    /*
     app.delete('/v1/product/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

         var data = req.body;
         
         if((data.constructor === Array))
            processProducts(req, res, db);
         else
            processProduct(req, res, db);
    });
    */

    app.delete('/v1/product/:id', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        var id = req.params.id;
        deleteProduct(id, res, db);
    });
};
/*
function processProducts(req, res, db){
    for (var prod of req.body) {
        deleteProduct(prod, res, db);
    }
}

function processProduct(req, res, db){
    deleteProduct(req.body, res, db);
}
*/

function deleteProduct(id, res, db){

    {
        var sql = `DELETE FROM products WHERE product_id = ?;`;
        var values = [id];

        db.serialize(function () {
            db.run(sql, values, function (err) {
                if (err){
                    console.error(err);
                    res.status(500).send(err);
                }
                else
                    res.status(200).send();
            });
        });
    }
}

