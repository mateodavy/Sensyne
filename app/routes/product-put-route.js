module.exports = function (app, db) {
    
    // Update a product
    // http://localhost:5000/v1/product
    // Sending a JSON body:
    // {
    //     "id": "12",            
    //     "name": "ExampleProductName"
    //     "price": 2.00, 
    // }

    // or an array of products:
    // [
    //     {...},{...}
    // ]
    app.put('/v1/product/:id', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        var data = req.body;

//        console.warn("PUT: data: " + data);
         
        updateProduct(req.params.id, data, res, db);
    });
};

function checkIfExist(){
    // TODO: check business
}

function updateProduct(id, data, res, db){
    checkIfExist();

    var name = data.name;
    var price = data.price;

    var sql = `UPDATE products
            SET name = ?, price = ?
            WHERE product_id = ?;`;

//    console.warn("PUT: name: " + name + " - price: " + price);

    var values = [name, price, id];

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

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/product-schema-update.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });
}