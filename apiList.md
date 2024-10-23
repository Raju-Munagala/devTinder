# devTinder API'S

## AuthRouter
- post /signup
- post /login
- post /logout

## ProfileRouter
- get /profile/view
- patch /profile/edit
- patch /profile/password 

## ConnectionRequestRouter
- post /connection/send/ignored/:userId
- post /connection/send/interested/:userId
- post /connection/recieved/accepted/:userId
- post /connection/recieved/rejected/:userId

## UserRouter
- get /user/connections
- get /user/requests
- get /user/feed