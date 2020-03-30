module.exports = function(app, db) {

  // Load products by ID: http://localhost:4300/api/product/id/$id
  // example: http://localhost:4300/api/product/id/15
  app.get('/api/product/:id', (req, res) => {
    processData(res, "SELECT * FROM products where product_id == "+req.params.id);
  });

  // Load all products: http://localhost:4300/api/product/
  app.get('/api/products', (req, res) => {
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
      res.send(data);
    else{
      res.status(404).send("Product not found");
    }
  }
};