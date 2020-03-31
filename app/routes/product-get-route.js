module.exports = function(app, db) {

  // Load products by ID: http://localhost:5000/v1/product/id/$id
  // example: http://localhost:5000/v1/product/id/15
  app.get('/v1/product/:id', (req, res) => {
    processData(res, "SELECT * FROM products WHERE product_id == " + req.params.id);
  });

  // Load all products: http://localhost:5000/v1/product/
  app.get('/v1/products', (req, res) => {
    processData(res, "SELECT * FROM products");
  });

  function processData(res, sql){
    db.serialize(function() {
      db.all(sql, 
        function(err, rows) {
          if(err){
            console.error(err);
            res.status(500).send(err);
          }
          else
            sendData(res, rows, err);
      });
    });
  }

  function sendData(res, data, err){
    res.setHeader("Access-Control-Allow-Origin","*");

    if(data[0])
      res.status(200).send(data);
    else{
      res.status(404).send("Product not found");
    }
  }
};