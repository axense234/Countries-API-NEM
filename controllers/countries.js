const superchargedString = require("@supercharge/strings");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const Country = require("../models/Country");

const getAllCountries = async (req, res) => {
  const queryObject = {};
  const { name, numericFilters, fields, limit, page, sort } = req.query;

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">=": "$gte",
      ">": "$gt",
      "==": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(>=|>|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = [
      "landAreaNumber",
      "densityNumber",
      "populationNumber",
      "lifeExpectancy",
      "mainAgeStructure",
    ];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field) && field === "populationNumber") {
        queryObject.population.number = { [operator]: Number(value) };
      } else if (options.includes(field) && field === "lifeExpectancy") {
        queryObject.population.lifeExpectancy = { [operator]: Number(value) };
      } else if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let allCountries = Country.find(queryObject);

  if (sort) {
    const sortFiltered = sort.split(",").join(" ");
    allCountries = allCountries.sort(sortFiltered);
  } else {
    allCountries = allCountries.sort("createdAt");
  }

  if (fields) {
    const fieldsFiltered = fields.split(",").join(" ");
    allCountries = allCountries.select(fieldsFiltered);
  }

  const limitNumber = limit || 25;
  const pageNumber = page || 1;
  const skipNumber = (pageNumber - 1) * limitNumber;

  allCountries = allCountries.limit(limitNumber).skip(skipNumber);

  const allCountriesResult = await allCountries;

  if (allCountriesResult.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ countries: [], errorMsg: "Could not find any countries!" });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: allCountriesResult.length,
    countries: allCountriesResult,
    msg: "Successfully fetched all countries!",
  });
};

const getCountryById = async (req, res) => {
  const { countryId } = req.params;
  const foundCountry = await Country.findById(countryId);
  if (!foundCountry) {
    return res.status(StatusCodes.NOT_FOUND).json({
      country: {},
      errorMsg: `Could not find country by id:${countryId}...`,
    });
  }
  return res.status(StatusCodes.OK).json({
    country: foundCountry,
    msg: `Successfully fetched country with id:${countryId}.`,
  });
};

const createCountry = async (req, res) => {
  const { ...country } = req.body;
  const createdCountry = await Country.create(country);
  if (!createCountry) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      country: {},
      errorMsg:
        "Please make sure you entered the appropiate stuff in order to create a country!",
    });
  }
  return res.status(StatusCodes.CREATED).json({
    country: createdCountry,
    msg: `Successfully created country with id:${createdCountry.id}`,
  });
};

const updateCountry = async (req, res) => {
  const { ...newCountry } = req.body;
  const { countryId } = req.params;
  const updatedCountry = await Country.findByIdAndUpdate(
    countryId,
    newCountry,
    { new: true, runValidators: true }
  );
  if (!updatedCountry) {
    return res.status(StatusCodes.NOT_FOUND).json({
      country: {},
      errorMsg: `Could not find country with id:${countryId} in order to update it!`,
    });
  }
  return res.status(StatusCodes.ACCEPTED).json({
    country: updatedCountry,
    msg: `Successfully updated country with id:${countryId}.`,
  });
};

const deleteCountry = async (req, res) => {
  const { countryId } = req.params;
  const deletedCountry = await Country.findByIdAndDelete(countryId, {
    new: true,
  });
  if (!deletedCountry) {
    return res.status(StatusCodes.NOT_FOUND).json({
      country: {},
      errorMsg: `Could not find country by id:${countryId} in order to delete it!`,
    });
  }
  return res.status(StatusCodes.OK).json({
    country: deletedCountry,
    msg: `Successfully deleted country with id:${countryId}.`,
  });
};

const authorizeSwaggerUI = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter an username and a password!" });
  }

  if (
    username !== process.env.SWAGGER_UI_USERNAME ||
    password !== process.env.SWAGGER_UI_PASSWORD
  ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Username/password do not match with the ones provided in the environment.",
    });
  }

  const token = jwt.sign(
    { id: superchargedString.random(70), username },
    process.env.SECRET_JWT_KEY,
    {
      expiresIn: "2d",
    }
  );

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Authorized,created token.", token });
};

module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  authorizeSwaggerUI,
};
