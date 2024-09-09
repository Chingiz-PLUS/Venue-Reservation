const REDIS_KEYS = require("../config/redis.constants");
const Venue = require("../database/models/venue.model");
const { NotFoundError } = require("../errors");
const paginate = require("../utils/paginate.util");
const redisUtil = require("../utils/redis.util");

const venueService = {
  create: async (body) => {
    const venue = await Venue.create(body);
    await redisUtil.removeData(REDIS_KEYS.VENUES);
    return venue;
  },

  getAll: async (query) => {
    let { page, limit, location } = query;

    page = Math.max(parseInt(page, 10) || 1, 1);
    limit = Math.max(parseInt(limit, 10) || 10, 10);

    let venues = await redisUtil.getData(REDIS_KEYS.VENUES).catch(() => false);
    if (!venues) {
      try {
        venues = await Venue.find({}).lean();
        await redisUtil.setData(REDIS_KEYS.VENUES, venues);
      } catch (error) {
        console.error("Error fetching venues:", error);
        throw new Error("Error fetching venues");
      }
    }

    const filter = {};
    if (location) {
      filter.location = location.split("_").join(" ");
    }

    let { items, ...pagination } = paginate(venues, page, limit, filter);

    return {
      venues: items,
      pagination,
    };
  },

  getOne: async (params) => {
    const { id } = params;
    const venue = await Venue.findById(id).lean();

    if (!venue) throw new NotFoundError("This venue doesnt exist!");

    return venue;
  },

  update: async (_id, body) => {
    const { id } = _id;
    const venue = await Venue.findByIdAndUpdate(
      id,
      {
        ...body,
        lctname: body.location
          ? body.location.toLowerCase().replace(" ", "_")
          : this.lctname,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!venue) throw new NotFoundError("This venue doesnt exist!");
    return venue;
  },

  delete: async (_id) => {
    const { id } = _id;
    const result = await Venue.findByIdAndDelete(id);
    if (!result) throw new NotFoundError("This venue doesnt exist!");

    await redisUtil.removeData(REDIS_KEYS.VENUES);
    return result;
  },
};

module.exports = venueService;
