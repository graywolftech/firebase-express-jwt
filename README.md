[![@graywolfai/firebase-express-jwt](https://badge.fury.io/js/%40graywolfai%2Ffirebase-express-jwt.svg)](https://badge.fury.io/js/%40graywolfai%2Ffirebase-express-jwt)

# firebase-express-jwt
Express middleware for Firebase to validate the JWT token.

## Usage
```
npm i @graywolfai/firebase-express-jwt
```

Requests that go to handlers that use this middleware should have an `Authorization: Bearer <TOKEN>`. If the validation fails for any reason, a response with a status `401` is returned (see `index.ts` for details). If validation succeeds, the decoded `user` (`admin.auth.DecodedIdToken`) is placed in the request object.
