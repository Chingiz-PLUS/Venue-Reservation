const Venue = require("../database/models/venue.model");
const { NotFoundError } = require("../errors");

const venueService = {
  create: async (body) => {
    const venue = await Venue.create(body);
    console.log(venue);
    return venue;
  },

  getAll: async (query) => {
    const { page, limit, location } = query;

    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const pageLimit = Math.max(parseInt(limit, 10) || 10, 10);

    const skip = (currentPage - 1) * pageLimit;

    const locationFilter = location ? { lctname: location } : {};
    try {
      const [totalVenuesCount, venues] = await Promise.all([
        Venue.countDocuments(locationFilter),
        Venue.find(locationFilter).skip(skip).limit(pageLimit).lean(),
      ]);

      return {
        venues: venues,
        pagination: {
          totalPages: Math.ceil(totalVenuesCount / pageLimit),
          totalCount: totalVenuesCount,
          currentPage,
          pageSize: venues.length,
        },
      };
    } catch (error) {
      // Handle the error (e.g., log it, return an error response, etc.)
      console.error("Error fetching venues:", error);
      throw new Error("Error fetching venues");
    }
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
    ).lean();
    if (!venue) throw new NotFoundError("This venue doesnt exist!");
    return venue;
  },

  delete: async (_id) => {
    const { id } = _id;
    const result = await Venue.findByIdAndDelete(id).lean();
    if (!result) throw new NotFoundError("This venue doesnt exist!");
    return result;
  },
};

module.exports = venueService;
