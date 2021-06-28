const StoreDetails = require('../models/storeDetailsModel')

exports.findAllDetails = async (req,res) => {
    try {
        let storeDetails = await StoreDetails.find({})
        res.setHeader('Content-Range', `${storeDetails.length}`)
        res.json(storeDetails)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneStoreDetails = async function (req, res) {
    try {
        let storeDetails = await StoreDetails.findById(req.params.id)
        if(storeDetails === null) {
            return res.status(404).json({ message: "store does not exist!" })
        } else {
            return res.json(storeDetails)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addStoreDetails = async function (req, res) {
    try {
    
        let StoreDetailsData = {
            id: "null",
            Name: req.body.name,
            Address: req.body.address,
            ZipCode: req.body.zipCode,
            City: req.body.city,
            Country: req.body.country,
            PhoneNumber: req.body.phoneNumber,
            Email: req.body.email,
        }

        try {
            let newStoreDetails = await StoreDetails.create(StoreDetailsData)
            newStoreDetails.id = newStoreDetails._id
            let updatedStoreDetails = await newStoreDetails.save()
            return res.status(201).json(updatedStoreDetails)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateStoreDetails = async function (req, res) {
    try {
        let storeDetails = await StoreDetails.findById(req.params.id)
        if(storeDetails === null) {
            return res.status(404).json({ message: "store does not exist!" })
        } else {
            if(req.body.Name !== null) {
                storeDetails.Name = req.body.name
            }
            if(req.body.Address !== null) {
                storeDetails.Address = req.body.Address
            }
            if(req.body.ZipCode !== null) {
                storeDetails.ZipCode = req.body.ZipCode
            }
            if(req.body.City !== null) {
                storeDetails.City = req.body.City
            }
            if(req.body.Country !== null) {
                storeDetails.Country = req.body.Country
            }
            if(req.body.PhoneNumber !== null) {
                storeDetails.PhoneNumber = req.body.PhoneNumber
            }
            if(req.body.Email !== null) {
                storeDetails.Email = req.body.Email
            }
            
            try {
                let updatedStoreDetails = await storeDetails.save()
                return res.json(updatedStoreDetails)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteStoreDetails = async function (req, res) {
    try {
        let storeDetails = await StoreDetails.findById(req.params.id)
        if(storeDetails === null) {
            return res.status(404).json({ message: "store does not exist!" })
        } else {
            let storeDetailsToDel = storeDetails
            try {
                await storeDetailsToDel.remove()  
                return res.json({ message: "Deleted Store Details" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};