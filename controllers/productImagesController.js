const ProductImage = require('../models/productImagesModel')
const fs = require('fs')
const path = require('path')

const addPictures = (mainImage, pictures) => {

    for (let picture of pictures) {

        mainImage = picture.title

        const image = picture.src
        const match = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const buffer = Buffer.from(match[2], 'base64')

        fs.writeFile(path.join('tmp', 'uploads', 'photoSrc', 'products', picture.title), buffer , { flag: 'wx' }, (err) => {
            if(err)
                console.log(err)
        })
    }

    return mainImage
}

exports.findAllProductImage = async (req,res) => {
    try {
        let productImages = await ProductImage.find({})
        res.setHeader('Content-Range', `${productImages.length}`)
        res.json(productImages)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneProductImage = async function (req, res) {
    try {
        let productImage = await ProductImage.findById(req.params.id)
        if(productImage === null) {
            return res.status(404).json({ message: "product image does not exist!" })
        } else {
            return res.json(productImage)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.findProductImagesByProduct = async function (req, res) {
    try {
        let productImages = await ProductImage.find({ ProductId: req.params.prodid }).exec()
        res.json(productImages)
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addProductImage = async function (req, res) {
    try {
        let mainImage;
    
        let ProductImageData = {
            id: "null",
            ProductId: req.body.productId,
            Caption: req.body.caption
        }

        ProductImageData.Name = addPictures(mainImage, req.body.pictures)

        try {
            let newProductImage = await ProductImage.create(ProductImageData)
            newProductImage.id = newProductImage._id
            let updatedProductImage = await newProductImage.save()
            return res.status(201).json(updatedProductImage)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateProductImage = async function (req, res) {
    console.log(req.body)
    try {
        let productImage = await ProductImage.findById(req.params.id)
        if(productImage === null) {
            return res.status(404).json({ message: "product image does not exist!" })
        } else {
            if(req.body.ProductId) {
                productImage.ProductId = req.body.ProductId
            }
            if(req.body.Caption) {
                productImage.Caption = req.body.Caption
            }
            try {
                let updatedProductImage = await productImage.save()
                return res.json(updatedProductImage)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteProductImage = async function (req, res) {
    try {
        let productImage = await ProductImage.findById(req.params.id)
        if(productImage === null) {
            return res.status(404).json({ message: "product image does not exist!" })
        } else {
            let prodImageToDel = productImage
            try {
                await prodImageToDel.remove()  
                return res.json({ message: "Deleted Product Image" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};