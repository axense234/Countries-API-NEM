# **Countries API**

A **NODE EXPRESS MONGOOSE MONGODB API** created in order to practice and further expand my knowledge of **backend** technologies.

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
