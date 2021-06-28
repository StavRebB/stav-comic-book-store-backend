const Delivery = require('../models/deliveryModel')

exports.findAllDelivery = async (req,res) => {
    try {
        let deliveries = await Delivery.find({})
        res.setHeader('Content-Range', `${deliveries.length}`)
        res.json(deliveries)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneDelivery = async function (req, res) {
    try {
        let delivery = await Delivery.findById(req.params.id)
        if(delivery === null) {
            return res.status(404).json({ message: "delivery does not exist!" })
        } else {
            return res.json(delivery)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addDelivery = async function (req, res) {
    try {
    
        let DeliveryData = {
            id: "null",
            Name: req.body.name,
            Price: req.body.price,
            Duration: req.body.duration
        }

        try {
            let newDelivery = await Delivery.create(DeliveryData)
            newDelivery.id = newDelivery._id
            let updatedDelivery = await newDelivery.save()
            return res.status(201).json(updatedDelivery)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateDelivery = async function (req, res) {
    try {
        let delivery = await Delivery.findById(req.params.id)
        if(delivery === null) {
            return res.status(404).json({ message: "delivery does not exist!" })
        } else {
            if(req.body.Name !== null) {
                delivery.Name = req.body.Name
            }
            if(req.body.Price !== null) {
                delivery.Price = req.body.Price
            }
            if(req.body.Duration !== null) {
                delivery.Duration = req.body.Duration
            }
            try {
                let updatedDelivery = await delivery.save()
                return res.json(updatedDelivery)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteDelivery = async function (req, res) {
    try {
        let delivery = await Delivery.findById(req.params.id)
        if(delivery === null) {
            return res.status(404).json({ message: "delivery does not exist!" })
        } else {
            let deliveryToDel = delivery
            try {
                await deliveryToDel.remove()  
                return res.json({ message: "Deleted Delivery" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};