const axios = require("axios");
const Dev = require("../models/Dev");
const StringHelper = require("../helpers/StringHelper");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = apiResponse.data;
      const techsArray = StringHelper.parseStringAsArray(techs);
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const _id = request.params.id;
    const { name } = request.body;
    let dev = await Dev.findOneAndUpdate({ _id }, { name: name });

    return response.json(dev);
  }
};
