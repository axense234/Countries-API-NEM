const express = require("express");

const router = express.Router();

const {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  authorizeSwaggerUI,
} = require("../controllers/countries");

const AuthenticationMiddleware = require("../middleware/Authentication");

router.post("/authentication", authorizeSwaggerUI);
/**
 * @swagger
 * /countries/authentication:
 *  post:
 *   description: Route created for authentication purposes(JWT).
 *   tags:
 *    - AUTHORIZE Countries
 *   consumes:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: Authorization Body
 *      description: Please provide the right username and password in order to get the JWT in the request.
 *      schema:
 *       $ref: "#components/schemas/Authorization"
 *   responses:
 *    "400":
 *     description: The username and/or password was not provided.
 *    "401":
 *     description: The username and/or password was not right.
 *    "200":
 *     description: Everything went smoothly.Take the JWT and put it as value in Authorize section
 */

router.get("/", getAllCountries);
/**
 * @swagger
 * /countries?name&numericFilters&fields&limit&page&sort:
 *  get:
 *   description: Route for getting all the countries in CountriesAPI!
 *   tags:
 *    - GET Countries
 *   parameters:
 *    - in: query
 *      name: name
 *      description: Query Param in order to filter countries by name.
 *      schema:
 *        type: string
 *    - in: query
 *      name: numericFilters
 *      description: Numeric Filters for sorting countries.Ex:"landAreaNumber>=300".
 *      schema:
 *        type: string
 *    - in: query
 *      name: fields
 *      description: Fields in order to only get certain properties of countries.Ex:"name,flag".
 *      schema:
 *        type: string
 *    - in: query
 *      name: limit
 *      description: Query Param in order to limit the number of countries in the request.
 *      schema:
 *        type: number
 *    - in: query
 *      name: page
 *      description: Query Param in order to view certain pages of the API.The countries in the request are skipped by the formula (page || 1 - 1) x limit.
 *      schema:
 *        type: number
 *    - in: query
 *      name: sort
 *      description: Query Param in order to sort countries in the request.Ex:"name,densityNumber"
 *      schema:
 *        type: string
 *   responses:
 *    "200":
 *     description: Successfully managed to get all countries from CountriesAPI!
 *    "404":
 *     description: Could not find any countries in CountriesAPI!
 *
 */
router.get("/:countryId", getCountryById);
/**
 * @swagger
 * /countries/{countryId}:
 *  get:
 *   description: Route for getting a country by id in CountriesAPI!
 *   tags:
 *    - GET Countries
 *   parameters:
 *    - in: path
 *      name: countryId
 *      required: true
 *      description: The ID of the country you want to find out morea about!
 *      schema:
 *       type: integer
 *   responses:
 *    "200":
 *     description: Successfully managed to get a country by ID from CountriesAPI!
 *    "404":
 *     description: Could not find any countries matching the id provided in CountriesAPI!
 *
 */

router.post("/create", AuthenticationMiddleware, createCountry);

/**
 * @swagger
 * /countries/create:
 *  post:
 *   security:
 *    - bearerAuth: []
 *   description: Route to create countries in CountriesAPI!
 *   tags:
 *    - CREATE Countries
 *   consumes:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: Country Body
 *      description: Scheme of a new country you want to create!
 *      required: true
 *      schema:
 *       $ref: "#/components/schemas/Country"
 *   responses:
 *    "201":
 *     description: Successfully created a country in CountriesAPI!
 *    "400":
 *     description: Could not create a country with the body requested.
 *
 */

router.patch("/update/:countryId", AuthenticationMiddleware, updateCountry);
/**
 * @swagger
 * /countries/update/{countryId}:
 *  patch:
 *   security:
 *    - bearerAuth: []
 *   description: Route to update country by id in CountriesAPI!
 *   tags:
 *    - UPDATE Countries
 *   consumes:
 *    - application/json
 *   parameters:
 *    - in: body
 *      name: Country Body
 *      description: Scheme of a new country you want to update!
 *      required: true
 *      schema:
 *       $ref: "#/components/schemas/Country"
 *    - in: path
 *      name: countryId
 *      description: The ID needed in order to find and update the respective country!
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    "200":
 *     description: Successfully updated a country by id in CountriesAPI!
 *    "404":
 *     description: Could not find country by id in order to update it in CountriesAPI.
 *
 */

router.delete("/delete/:countryId", AuthenticationMiddleware, deleteCountry);
/**
 * @swagger
 * /countries/delete/{countryId}:
 *  delete:
 *   security:
 *    - bearerAuth: []
 *   description: Route to delete country by ID in CountriesAPI!
 *   tags:
 *    - DELETE Countries
 *   parameters:
 *    - in: path
 *      name: countryId
 *      description: The ID needed in order to delete a country in CountriesAPI
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    "200":
 *     description: Successfully deleted a country by id in CountriesAPI!
 *    "404":
 *     description: Could not find country by id in order to delete it!
 */

module.exports = router;
