const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, "Please provide a longer name for your country!"],
      maxLength: [30, "Please provide a shorter name for your country!"],
      required: [true, "Please provide a name for your country!"],
    },
    flag: {
      type: String,
      default:
        "https://res.cloudinary.com/birthdayreminder/image/upload/v1670063380/CountriesAPI/default_country_img.webp",
    },
    population: {
      number: {
        type: Number,
        min: [20, "Please provide a larger population for your country!"],
        max: [
          3000000000,
          "Please provide a lower population for your country!",
        ],
        required: [
          true,
          "Please provide the number of people in your country!",
        ],
      },
      lifeExpectancy: {
        type: Number,
        min: [
          20,
          "Please provide a bigger life expectancy for the population of your country!",
        ],
        default: 40,
      },
      ageStructure: {
        young: {
          type: String,
        },
        middleAged: {
          type: String,
        },
        old: {
          type: String,
        },
        demographicsImage: {
          type: String,
          default:
            "https://res.cloudinary.com/birthdayreminder/image/upload/v1670064931/CountriesAPI/Demographics%20Images/Niger_single_age_population_pyramid_2020_hv1bip.png",
        },
      },
    },
    landAreaNumber: {
      type: Number,
      min: [0, "Please provide a larger area for your country!"],
      max: [100000000, "Please provide a shorter area for your country!"],
      required: [true, "Please provide the land area of your country!"],
    },
    landAreaString: {
      type: String,
    },
    densityNumber: {
      type: Number,
    },
    densityString: {
      type: String,
    },
  },
  { timestamps: true }
);

CountrySchema.pre("save", function () {
  // Land Area and Density
  const density = this.population.number / this.landAreaNumber;
  this.landAreaString = `${this.landAreaNumber} km2`;
  this.densityNumber = density.toFixed(2);
  this.densityString = `${density.toFixed(2)} p/km2`;
});

module.exports = mongoose.model("countries", CountrySchema);
