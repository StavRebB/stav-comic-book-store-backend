const Status = require('../models/statusModel')

exports.findAllStatus = async (req,res) => {
    try {
        let status = await Status.find({})
        res.setHeader('Content-Range', `${status.length}`)
        res.json(status)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneStatus = async function (req, res) {
    try {
        let status = await Status.findById(req.params.id)
        if(status === null) {
            return res.status(404).json({ message: "status does not exist!" })
        } else {
            return res.json(status)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addStatus = async function (req, res) {
    try {
    
        let StatusData = {
            id: "null",
            Name: req.body.name,
        }

        try {
            let newStatus = await Status.create(StatusData)
            newStatus.id = newStatus._id
            let updatedStatus = await newStatus.save()
            return res.status(201).json(updatedStatus)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateStatus = async function (req, res) {
    try {
        let status = await Status.findById(req.params.id)
        if(status === null) {
            return res.status(404).json({ message: "status does not exist!" })
        } else {
            if(req.body.Name !== null) {
                status.Name = req.body.Name
            }
            try {
                let updatedStatus = await status.save()
                return res.json(updatedStatus)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteStatus = async function (req, res) {
    try {
        let status = await Status.findById(req.params.id)
        if(status === null) {
            return res.status(404).json({ message: "status does not exist!" })
        } else {
            let statusToDel = status
            try {
                await statusToDel.remove()  
                return res.json({ message: "Deleted Status" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};