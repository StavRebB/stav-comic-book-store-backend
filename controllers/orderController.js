const Order = require('../models/orderModel')
var transporter = require('../config/mail.config')

exports.findAllOrders = async (req,res) => {
    try {
        let orders = await Order.find({})
        res.setHeader('Content-Range', `${orders.length}`)
        res.json(orders)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneOrder = async function (req, res) {
    try {
        let order = await Order.findById(req.params.id)
        if(order === null) {
            return res.status(404).json({ message: "order does not exist!" })
        } else {
            res.json(order)
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOrderByHash = async function (req, res) {
    try {
        let order = await Order.find({OrderNum: req.params.hash})
        if(!order) {
            return res.status(404).json({ message: "order does not exist!" })
        } else {
            // order=order[0]
            res.json(order)
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.addOrder = async function (req, res) {
    console.log(req.body)
    try {
    
        let OrderData = {
            id: "null",
            OrderNum: req.body.OrderNum,
            OrderDate: req.body.OrderDate,
            PayerName: req.body.PayerName,
            Email: req.body.Email,
            RecieverName: req.body.RecieverName,
            Address: req.body.Address,
            ZipCode: req.body.ZipCode,
            City: req.body.City,
            Country: req.body.Country,
            Payment: req.body.Payment,
            Products: req.body.Products,
            PhoneNumber: req.body.PhoneNumber,
            Sum: req.body.Sum,
            Status: req.body.Status || "606cdf4aca659927240592f1",
            Delivery: req.body.Delivery,
            Coupon: req.body.Coupon || null,
            Refund: false,
            Notes: req.body.Notes
        }

        console.log(OrderData)

        try {
            let newOrder = await Order.create(OrderData)
            newOrder.id = newOrder._id
            let updatedOrder = await newOrder.save()
            res.status(201).json(updatedOrder)
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateOrder = async function (req, res) {
    console.log(req.body)
    try {
        let order = await Order.findById(req.params.id)
        if(order === null) {
            return res.status(404).json({ message: "order does not exist!" })
        } else {
            if(req.body.PayerName) {
                order.PayerName = req.body.PayerName
            }
            if(req.body.Email) {
                order.Email = req.body.Email
            }
            if(req.body.RrecieverName) {
                order.RecieverName = req.body.recieverName
            }
            if(req.body.Address) {
                order.Address = req.body.Address
            }
            if(req.body.ZipCode) {
                order.ZipCode = req.body.ZipCode
            }
            if(req.body.City) {
                order.City = req.body.City
            }
            if(req.body.Country) {
                order.Country = req.body.Country
            }
            if(req.body.Payment) {
                order.Payment = req.body.Payment
            }
            if(req.body.Products) {
                order.Products = req.body.Products
            }
            if(req.body.PhoneNumber) {
                order.PhoneNumber = req.body.PhoneNumber
            }
            if(req.body.Sum) {
                order.Sum = req.body.Sum
            }
            if(req.body.Status) {
                order.Status = req.body.Status
                const mail = {
                    from: process.env.THE_MAIL,
                    to: order.Email,
                    subject: `Order ${order.id} - Status Change`,
                    text: `The Status of your order- number ${order.id} - on FunnyBooks.com has changed. You may view it in the Track Order section of the website.
                    With regards,
                    FunnyBooks.com`
                }
                transporter.sendMail(mail, (err, data) => {
                    if(err) {
                        res.json({
                            status: 'failed',
                            message: err.message
                        })
                    } else {
                        res.json({
                            status: 'success'
                        })
                    }
                })
            }
            if(req.body.Delivery) {
                order.Delivery = req.body.Delivery
            }
            if(req.body.Coupon) {
                order.Coupon = req.body.Coupon
            }
            if(req.body.MemberId) {
                order.MemberId = req.body.MemberId
            }
            if(req.body.Refund) {
                order.Refund = req.body.Refund
            }
            if(req.body.Notes) {
                order.Notes = req.body.Notes
            }

            try {
                let updatedOrder = await order.save()
                res.json(updatedOrder)
            } catch(error) {
                res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};

exports.deleteOrder = async function (req, res) {
    try {
        let order = await Order.findById(req.params.id).exec()
        if(order === null) {
            return res.status(404).json({ message: "order does not exist!" })
        } else {
            try {
                await order.remove()  
                res.json({ message: "Deleted Order" })
            } catch(error) {
                res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};