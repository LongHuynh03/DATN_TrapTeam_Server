const tourModel = require("./TourModel");
const provincesModel = require("../province/ProvinceModel");

// Lấy danh sách tour

const getAllTours = async (page, size) => {
  try {
    return await tourModel
      .find()
      .populate("province_id", "")
      .populate("locations", "")
      .sort({ _id: -1 });
  } catch (error) {
    console.log("Get all tours servive: ", error);
    throw error;
  }
};

// lấy danh sách tuor nổi bật ở trang chủ
const getTourHighlight = async (page, size) => {
  try {
    return await tourModel
      .find({ is_popular: true })
      // "_id name price images" là các trường cần lấy ra
      .populate("province_id", "");
  } catch (error) {
    console.log("Lấy danh sách tour nổi bật service: ", error);
    throw error;
  }
};

// lấy danh sách tour có chứa địa điểm phổ biến
const getTourByLocation = async (location_id) => {
  try {
    return await tourModel
      .find({ locations: { $in: [location_id] } })
      .populate("province_id", "");
  } catch (error) {
    console.log("Lấy danh sách tour chứa địa điểm phổ biến service: ", error);
    throw error;
  }
};

// tìm kiếm tour theo tên
const getTourByName = async (name) => {
  try {
    return await tourModel
      .find({ name: { $regex: name, $options: "i" } })
      .populate("province_id", "");
  } catch (error) {
    console.log("Tìm kiếm tour theo tên service: ", error);
    throw error;
  }
};

// tìm kiếm tour theo filter
const getTourByFilter = async (
  departureLocation,
  locationProvinces,
  minPrice,
  maxPrice,
  is_popular,
  dayFind
) => {
  try {
    const parts = dayFind.split("/");
    const ngayKhoiHanhDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const ngayKhoiHanhISO = ngayKhoiHanhDate.toISOString();

    const tours = await tourModel.aggregate([
      {
        $lookup: {
          from: "provinces",
          localField: "province_id",
          foreignField: "_id",
          as: "province",
        },
      },
      {
        $match: {
          departure_location:
            departureLocation == ""
              ? { $regex: "", $options: "i" }
              : { $regex: departureLocation, $options: "i" },
          "province.name":
            locationProvinces == ""
              ? { $regex: "", $options: "i" }
              : { $regex: locationProvinces, $options: "i" },
          is_popular: is_popular === "true" ? true : false,
          price:
            maxPrice == 0
              ? { $gte: Number(minPrice), $lte: Number(1000000000000000) }
              : { $gte: Number(minPrice), $lte: Number(maxPrice) },
          departure_date: { $gte: new Date(ngayKhoiHanhISO) },
        },
      },
      {
        $project: {
          _id: 1,
          province_id: {
            $mergeObjects: [
              { _id: "$province_id" },
              { $arrayElemAt: ["$province", 0] },
            ],
          },
          name: 1,
          description: 1,
          available_seats: 1,
          image: 1,
          price: 1,
          departure_date: 1,
          departure_location: 1,
          end_date: 1,
          status: 1,
          created_at: 1,
          is_popular: 1,
          schedules: 1,
          locations: 1,
        },
      },
    ]);
    return tours;
  } catch (error) {
    console.log("Tìm kiếm tour theo filter service: ", error);
    throw error;
  }
};

// Lấy danh sách tour theo id của tỉnh
const getTourByProvinceId = async (province_id) => {
  try {
    return await tourModel.find({ province_id: province_id });
  } catch (error) {
    console.log("Lấy danh sách tour theo id của tỉnh service: ", error);
    throw error;
  }
};

// Lấy tour theo id và danh sách địa điểm của tour
const getTourByIdAndLocations = async (tour_id) => {
  try {
    return await tourModel
      .findById(tour_id)
      .populate({
        path: "locations",
        populate: {
          path: "province_id",
          select: "name image", // Thay thế otherField1, otherField2 bằng các trường khác bạn muốn lấy
        },
      })
      .populate("province_id", "");
  } catch (error) {
    console.log(
      "Lấy tour theo id và danh sách địa điểm của tour service: ",
      error
    );
    throw error;
  }
};

//Thêm tour
const createTour = async (
  province_id,
  name,
  description,
  available_seats,
  image,
  price,
  departure_date,
  departure_location,
  end_date,
  schedules,
  locations
) => {
  try {
    const newTour = {
      province_id,
      name,
      description,
      available_seats,
      image,
      price,
      departure_date,
      departure_location,
      end_date,
      schedules,
      locations,
    };
    const tour = new tourModel(newTour);
    await tour.save();
    return true;
  } catch (error) {
    console.log("Create tour service error: ", error);
    throw error;
  }
};

//Thay đổi trạng thái tour
const changeStatus = async (tour_id, status) => {
  try {
    const tour = await tourModel.findById(tour_id);
    if (tour) {
      tour.status = status ? status : tour.status;
      await tour.save();
      return tourModel.findById(blog._id);
    }
    return false;
  } catch (error) {
    console.log("Change status tour service: ", error);
    throw error;
  }
};

//Cập nhật nổi bật cho tour
const popularTour = async (tour_id, is_popular) => {
  try {
    const popular = is_popular == "true" ? false : true;
    const tour = await tourModel.findByIdAndUpdate(tour_id, {
      is_popular: popular,
    });
    if (tour) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Popular tour servive ", error);
    throw error;
  }
};

module.exports = {
  getAllTours,
  getTourHighlight,
  getTourByLocation,
  getTourByName,
  getTourByFilter,
  getTourByProvinceId,
  getTourByIdAndLocations,
  popularTour,
  changeStatus,
  createTour,
};
