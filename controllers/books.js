
const Book = require("../models/Book");
const path = require("path");
const { get } = require("http");


// Get all Book
exports.getBooks = async (req, res, next) => {
    try {
      const books = await Book.find();
      res.status(200).json({ data: books });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// Get single Book
exports.getBook = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ data: book });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


// Create a Book
exports.createBook = async (req, res, next) => {
    try {
      const books = await Book.create(req.body);
      res.status(200).json({ data: books });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


// Update Book
exports.updateBook = async (req, res, next) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ data: book });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// Delete Book
exports.deleteBook = async (req, res, next) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      console.log(book);
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ data: {} });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// Upload Book Profile
exports.uploadImage = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: "Resource not found" });
      }
      const image = req.files.image;
 
    // Validate Image
    const fileSize = image.size / 1000;
    const fileExt = image.name.split(".")[1];
    if (fileSize > 500) {
      return res
        .status(400)
        .json({ message: "file size must be lower than 500kb" });
    }

    if (!["jpg", "png"].includes(fileExt)) {
      return res
        .status(400)
        .json({ message: "file extension must be jpg or png" });
    }

    const fileName = `${req.params.id}${path.extname(image.name)}`;
    image.mv(`uploads/${fileName}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

// update Book profile field
      await Book.findByIdAndUpdate(req.params.id, { image: fileName });
      res.status(200).json({
        data: {
          file: `${req.protocol}://${req.get("host")}/${fileName}`,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Pagination
exports.Pagination = async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
  
    try {
      // execute query with page and limit values
      const book = await Book.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Book.countDocuments();
  

      // return response with posts, total pages, and current page
      res.json({
        book,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
  };

