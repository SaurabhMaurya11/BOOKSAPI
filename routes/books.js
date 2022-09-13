const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadImage,
  Pagination
} = require("../controllers/books");

router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);
router.route("/:id").post(uploadImage);
router.route("/book").get(Pagination);
//router.route("/posts").get(Pagination);


module.exports = router;
