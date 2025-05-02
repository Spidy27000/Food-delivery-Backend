# User
## *User login*
/user/login - POST
args - email, password
return
  {
    "status": "Success"/"Failed",
    "userId": "",
    "username": ""
  }
## *SignUp endpoint*
/user/add - POST
args- username, password, email
return
  status,
  userId
  error if status is failed 
note:
  checks for is email in db and gives error if email already in database

## *User Details*
/user/:userId - GET
args -user id 
return 
  {
    "status": "Success"/"Failed",
    "username": "",
    "email": ""
  }
note:
  error if id not in database

## *Delete User*
/user/:userId - DELETE
args -user id
return
  {
    "status": "Success"/"Failed",
    (if error occurs) "error" : ""
  }

## *Update User Details*
/user/update - POST
args - userId, username, email, password
returns 
  status,
  error if status is failed
Note: 
  only give the field u want to update as args

# Items
## *Adding Items*
/item/add - POST
args - name, description, price, image_uri, category, is_veg
returns
  status,
  itemId

## *Getting Items*
/items - GET
returns
  status,
  items - name, description, price, image_uri, category, is_veg 

## *Getting specific items details*
/item/:itemId - GET
args- itemId
returns
  status,
  items - name, description, price, image_uri, category, is_veg 

## *Searching for items*
/item/search - GET
args - search
returns
  status,
  items - name, description, price, image_uri, category, is_veg 


# Cart
## *Adding items to Cart*
/cart/add - POST
args - userId, itemId, quantity
returns
  {
    "status": "Success"
  }

## *Viewing Cart of User*
/cart/:userId - GET
args - userId
returns
  {
    "status": "Success",
    "items": [{
      "id": "",
      "item": [{
        "name": "",
        "description": "",
        "price": number,
        "image_uri": "",
        "is_speical": bool,
        "is_veg": bool,
        "category": [string]
      }]
    }]
    "quantity": number
  }

## *Clear Cart*
/cart/clear - POST
args - userId
returns
  {
    "status": "Success"
  }

## *Update to Cart*
/cart/update - POST
args - cartItems (array of the items which is used in *view cart*) , userId
returns
  {
    "status": "Success"
  }