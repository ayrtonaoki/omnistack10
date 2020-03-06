const Dev = require("../models/Dev");
const StringHelper = require("../helpers/StringHelper");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    const techsArray = StringHelper.parseStringAsArray(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 1000,
        },
      },
    });
    console.log(request.query);
    return response.json({ devs });
  }
};
