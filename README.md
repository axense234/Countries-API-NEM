# **Countries API**

A **NODE EXPRESS MONGOOSE MONGODB API** created in order to practice and further expand my knowledge of **backend** technologies.

## **Getting Started**

### Dependencies

- check package.json for details
- you might want to have your own mongodb database(preferably through mongodb atlas)

### Installation

- run the following commands:

```
git clone https://github.com/axense234/Countries-API-NEM.git
cd Countries-API-NEM
npm install
```

- rename **.env.sample** to **.env** and add your own environment variables corespondly:
  - _MONGO_URI_ = your own mongodb database uri
  - _SECRET_JWT_KEY_ = your secret jwt key
  - _SWAGGER_UI_PASSWORD_ = your swagger password for the authorization route
  - _SWAGGER_UI_USERNAME_ = your swagger username for the authorization route

### Executing program

- test the server with nodemon

```
npm test
```

## **Documentation and resources used:**

1. [Docs](https://countries-api-nem-ca.onrender.com)(made with [Swagger](https://swagger.io))

1. [Wikipedia](https://www.wikipedia.org/)(in order to get the _demographics_ of a country)

1. [Google Images](https://www.google.com)(in order to get the _flag_ of a country)

1. [List of Countries in the World](https://www.worldometers.info/geography/alphabetical-list-of-countries/)(in order to get the _population_ and _landarea_ of a country)

## **Routes Available:**

1. **/countries**<br>
   Route used for getting all the countries.View Docs in order to test it out with query params.

1. **/countries/:countryId**<br>
   Route used for getting a single country by id.View Docs in order to test it out with a country id.

1. **/countries/create**<br>
   Route used for creating a country by providing a request body respecting the schema provided.View Docs in order to test it out with a request body.

1. **/countries/update/:countryId**<br>
   Route used for updating a country by providing a request body with the respective values you want to change of a country by id.View Docs in order to test it out with a request body and an id.

1. **/countries/delete/:countryId**<br>
   Route used for deleting a country by providing a country id.View Docs in order to test it out with an id.
