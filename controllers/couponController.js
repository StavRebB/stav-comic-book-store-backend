const Coupon = require('../models/couponModel')

exports.findAllCoupons = async (req,res) => {
    try {
        let coupons = await Coupon.find({})
        res.setHeader('Content-Range', `${coupons.length}`)
        res.json(coupons)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneCoupon = async function (req, res) {
    try {
        let coupon = await Coupon.findById(req.params.id)
        if(coupon === null) {
            return res.status(404).json({ message: "coupon does not exist!" })
        } else {
            return res.json(coupon)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.findCouponByCode = async function (req, res) {
    try {
        let coupon = await Coupon.find({ Code: req.params.code }).exec()
        if(coupon === null) {
            return res.status(404).json({ message: "coupon does not exist!" })
        } else {
            return res.json(coupon)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.findCouponByDiscount = async function (req, res) {
    try {
        let coupon = await Coupon.find({ Discount: req.params.discount }).exec()
        if(coupon === null) {
            return res.status(404).json({ message: "coupon does not exist!" })
        } else {
            return res.json(coupon)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}


exports.addCoupon = async function (req, res) {
    try {
    
        let CouponData = {
            id: "null",
            Code: req.body.code,
            Discount: req.body.discount,
            IsActive: true
        }

        try {
            let newCoupon = await Coupon.create(CouponData)
            newCoupon.id = newCoupon._id
            let updatedCoupon = await newCoupon.save()
            return res.status(201).json(updatedCoupon)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateCoupon = async function (req, res) {
    try {
        let coupon = await Coupon.findById(req.params.id)
        if(coupon === null) {
            return res.status(404).json({ message: "coupon does not exist!" })
        } else {
            if(req.body.Code !== null) {
                coupon.Code = req.body.Code
            }
            if(req.body.Discount !== null) {
                coupon.Discount = req.body.Discount
            }
            if(req.body.IsActive !== null) {
                coupon.IsActive = req.body.IsActive
            }
            try {
                let updatedCoupon = await coupon.save()
                return res.json(updatedCoupon)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteCoupon = async function (req, res) {
    try {
        let coupon = await Coupon.findById(req.params.id)
        if(coupon === null) {
            return res.status(404).json({ message: "coupon does not exist!" })
        } else {
            let couponToDel = coupon
            try {
                await couponToDel.remove()  
                return res.json({ message: "Deleted Coupon" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};