const Product = require('../models/productModel')

const fs = require('fs')
const path = require('path')

const addPictures = (mainImage, pictures) => {

    for (let picture of pictures) {

        mainImage = picture.title

        const image = picture.src
        const match = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const buffer = Buffer.from(match[2], 'base64')

        fs.writeFile(path.join(__dirname, '..', 'uploads', 'photoSrc', 'products', picture.title), buffer , { flag: 'wx' }, (err) => {
            if(err)
                console.log(err)
        })
    }

    return mainImage
}

exports.findAll = async (req,res) => {
    try {
        let products = await Product.find({})
        res.setHeader('Content-Range', `${products.length}`)
        return res.json(products)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findRecs = async (req,res) => {
    console.log('here')
    try {
        let products = await Product.find({ id: { $ne: req.params.idOne } }).limit(3).exec()
        res.setHeader('Content-Range', `${products.length}`)
        return res.json(products)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findByLang = async (req,res) => {
    try {
        let products = await Product.find({ Language: req.params.lang }).exec()
        res.setHeader('Content-Range', `${products.length}`)
        return res.json(products)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findAllTops = async (req,res) => {
    try {
        let products = await Product.find({ Top: true }).exec()
        res.setHeader('Content-Range', `${products.length}`)
        return res.json(products)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findAllNews = async (req,res) => {
    try {
        let products = await Product.find({ IsNew: true }).exec()
        res.setHeader('Content-Range', `${products.length}`)
        return res.json(products)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findAllSpecials = async (req,res) => {
    try {
        let products = await Product.find({ Special: true }).exec()
        res.setHeader('Content-Range', `${products.length}`)
        return res.json(products)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneProduct = async function (req, res) {
    try {
        let product = await Product.findById(req.params.id)
        if(product === null) {
            return res.status(404).json({ message: "product does not exist!" })
        } else {
            res.json(product)
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneProductByIsbn = async function (req, res) {
    try {
        let product = await Product.find({ISBN10: req.params.id})
        if(!product.length) {
            return res.status(404).json({ message: "product does not exist!" })
        } else {
            product=product[0]
            res.json(product)
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.addProduct = async function (req, res) {
    console.log(req.body)
    try {

        let mainImage;

        // let photo = req.file ? req.file.filename.split('/')[1] : null
    
        let ProductData = {
            id: "null",
            ISBN10: req.body.ISBN10,
            ISBN13: req.body.ISBN13,
            Title: req.body.title,
            Author: req.body.author,
            Artist: req.body.artist,
            Pages: req.body.pages,
            Dimensions: req.body.dimensions,
            Stars: 0,
            Publisher: req.body.publisher,
            Format: req.body.format,
            Language: req.body.language,
            Weight: req.body.weight,
            OriginalPrice: req.body.originalPrice,
            CurrentPrice: 0,
            PublicationDate: req.body.publicationDate,
            Description: req.body.description,
            Special: false,
            IsNew: false,
            Top: false,
            // MainImage: photo,
            Quantity: 1
        }

        ProductData.MainImage = addPictures(mainImage, req.body.pictures)

        try {
            let newProduct = await Product.create(ProductData)
            newProduct.id = newProduct._id
            let updatedProduct = await newProduct.save()
            res.status(201).json(updatedProduct)
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.update = async function (req, res) {
    try {

        // const mainImage = req.body.img

        let product = await Product.findById(req.params.id)
        if(product === null) {
            return res.status(404).json({ message: "product does not exist!" })
        } else {
            if(req.body.ISBN10) {
                product.ISBN10 = req.body.ISBN10
            }
            if(req.body.ISBN13) {
                product.ISBN13 = req.body.ISBN13
            }
            if(req.body.Title) {
                product.Title = req.body.Title
            }
            if(req.body.Author) {
                product.Author = req.body.Author
            }
            if(req.body.Artist) {
                product.Artist = req.body.Artist
            }
            if(req.body.Pages) {
                product.Pages = req.body.Pages
            }
            if(req.body.Dimensions) {
                product.Dimensions = req.body.Dimensions
            }
            if(req.body.Stars) {
                product.Stars = req.body.Stars
            }
            if(req.body.Publisher) {
                product.Publisher = req.body.Publisher
            }
            if(req.body.Format) {
                product.Format = req.body.Format
            }
            if(req.body.Language) {
                product.Language = req.body.Language
            }
            if(req.body.Weight) {
                product.Weight = req.body.Weight
            }
            if(req.body.OriginalPrice) {
                product.OriginalPrice = req.body.OriginalPrice
            }
            if(req.body.CurrentPrice) {
                product.CurrentPrice = req.body.CurrentPrice
            }
            if(req.body.PublicationDate) {
                product.PublicationDate = req.body.PublicationDate
            }
            if(req.body.Description) {
                product.Description = req.body.Description
            }
            if(req.body.Special) {
                product.Special = req.body.Special
            }
            if(req.body.IsNew) {
                product.IsNew = req.body.IsNew
            }
            if(req.body.Top) {
                product.Top = req.body.Top
            }
            // if (req.body.pictures)
            //     product.MainImage = addPictures(mainImage, req.body.pictures)

            try {
                let updatedProd = await product.save()
                res.json(updatedProd)
            } catch(error) {
                res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};

exports.deleteProduct = async function (req, res) {
    try {
        let product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(404).json({ message: "product does not exist!" })
        } else {
            try {
                await product.remove()  
                res.json({ message: "Deleted Product" })
            } catch(error) {
                res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};