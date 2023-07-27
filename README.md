# Gigih-Midterm

## API structure
- The Express router is employed to access specific data for each document collection.
- The thumbnail router operates independently.
- The product route retrieves data from the respective thumbnail videoID using the videoID obtained from the thumbnail  route.
- Similarly, the comment route fetches data from the corresponding thumbnail videoID by utilizing the videoID obtained from the thumbnail route.

## DATABASE structure
* videos
```
{
  videoID: string
  urlImageThumb: string
}
```
* products
```
{
  productID: string
  productLink: string
  title: string
  price: number
  videoID: string
}
```
* comments
```
{
  videoID: string
  username: string
  comment: string
  timestamps: datetime(iso 8601)
}
```
**GET /videos/**
----
  Returns all thumbnails in Home Page.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  videos: [
           {<videoID>},
           {<urlImageThumb>}
         ]
}
```
**GET /products/:videoID**
----
  Returns the products from video thumbnail.
* **URL Params**  
  *Required:* `videoID=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
  ```
  {
  products: [
            {<productID>},
            {<productLink>},
            {<title>},
            {<price>},
            {<videoID>}
         ]
}

* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Thumbnail not found" }`  
  OR  
  * **Code:** 500  
  **Content:** `{ error : error : "Internal Server Error" }`
  
**GET /comment/:videoID**
----
  Returns the comments from video thumbnail.
* **URL Params**  
  *Required:* `videoID=[string]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
  ```
  {
  products: [
           {<videoID>},
           {<username>},
          {<comment>},
          {<timestamp>}
         ]
}

* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Thumbnail not found" }`  
  OR  
  * **Code:** 500  
  **Content:** `{ error : error : "Internal Server Error" }`
  
  
  **POST /videos/add**
----
  Add a new thumbnail to homepage.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    videoID: string,
    urlImageThumb: string
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**  
  ```
  {
    videoID: string,
    urlImageThumb: string
  }

* **Error Response:**  
* **Code:** 500  
**Content:** `{ error : error : "Failed to save Thumbnail" }`
  
  
**POST /products/add**
----
  Add a new product to video details.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
  productID: string
  productLink: string
  title: string
  price: number
  videoID: string
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:** 
   ```
  {
  productID: string
  productLink: string
  title: string
  price: number
  videoID: string
  }

* **Error Response:**  
* **Code:** 500  
**Content:** `{ error : error : "Failed to save Product" }`


**POST /comments/add**
----
  Add a new comments to product.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
  videoID: string
  username: string
  comment: string
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**  ```
  {
  videoID: string
  username: string
  comment: string
  timestamps: datetime(iso 8601)
  }

* **Error Response:**  
* **Code:** 500  
**Content:** `{ error : error : "Failed to save Product" }`


## How to run in local
### required module:
```
dotenv
express
mongoose
```

### start the server with:
`npm start`

### Post to video thumbnail DataBase using postman:
`POST http://localhost:3000/videos/add`
with json body:
```
{
    "videoID": "0",
    "urlImageThumb":"url"
}
```

### Get video thumbnail data
`GET http://localhost:3000/videos/`

### Post to product DataBase using postman:
`POST http://localhost:3000/products/add`
with json body:
```
{
    "productID":"0", 
    "productLink":"someurl", 
    "title":"product title", 
    "price": 10000,
    "videoID: "0"
}
```

### Get product data
`GET http://localhost:3000/products/0`

### Post to comment DataBase using postman:
`POST http://localhost:3000/comments/add`
with json body:
```
{
    "username":"Name",
    "comment":"comment fill",
    "videoID":"0"
}
```

### Get comment data
`GET http://localhost:3000/comment/0`