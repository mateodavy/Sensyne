# Sensyne test
Sensyne platform test.
Using SQLite database.

## How to Install
```sh
$ git clone https://github.com/mateodavy/Sensyne.git
$ cd Sensyne-Plat-Test
$ npm install 
$ npm run dev
```

It will be running on port 5000

------------

## How to use

### POST
* **Add new product:**
```
http://localhost:4300/v1/product
```
Sending a JSON body:
```javascript
{
	"name": "ExampleProductName",
	"price": 2.00,
}
```
or an array of products:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### PUT
* **Update a product:**
```
http://localhost:4300/v1/product/{product_id}
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleProductName"
	"price": 2.00
}
```
or an array of products:
```javascript
[
	{...},{...}
]
```

---------------------------------------------

### DELETE
* **Delete a product:**
```
http://localhost:4300/v1/product/{product_id}
```
Sending a JSON body: **ID is the only MANDATORY**
```javascript
{
	"id": "1",
	"name": "ExampleProductName"
	"price": 2.00
}
```


---------------------------------------------

### GET
* **Load products by ID:**
```
http://localhost:4300/v1/product/{product_id}
```
example: http://localhost:4300/v1/product/2

_____

* **Load all products:**
```
http://localhost:4300/v1/products/
```
______



## SQLite database
The database is already populated with 3 values.

### Node version
The Node version used was 6.9.3