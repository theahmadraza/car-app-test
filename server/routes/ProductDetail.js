const express = require('express')
const router = express.Router()
const ProductController = require("../controllers/ProductController")
// const imageUploader = require('../middlewares/imageUploader')

router.post('/add-product', ProductController.createProduct)

module.exports = router;