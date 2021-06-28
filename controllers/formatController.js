const Format = require('../models/formatModel')

exports.findAllFormats = async (req,res) => {
    try {
        let formats = await Format.find({})
        res.setHeader('Content-Range', `${formats.length}`)
        res.json(formats)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneFormat = async function (req, res) {
    try {
        let format = await Format.findById(req.params.id)
        if(format === null) {
            return res.status(404).json({ message: "format does not exist!" })
        } else {
            return res.json(format)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addFormat = async function (req, res) {
    console.log(req.body)
    try {
    
        let FormatData = {
            id:"null",
            Name: req.body.name,
        }

        try {
            let newFormat = await Format.create(FormatData)
            newFormat.id = newFormat._id
            let updatedFormat = await newFormat.save()
            return res.status(201).json(updatedFormat)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateFormat = async function (req, res) {
    console.log(req.body)
    try {
        let format = await Format.findById(req.params.id)
        if(format === null) {
            return res.status(404).json({ message: "format does not exist!" })
        } else {
            if(req.body.Name) {
                format.Name = req.body.Name
            }
            try {
                let updatedFormat = await format.save()
                return res.json(updatedFormat)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteFormat = async function (req, res) {
    try {
        let format = await Format.findById(req.params.id)
        if(format === null) {
            return res.status(404).json({ message: "format does not exist!" })
        } else {
            let formatToDel = format
            try {
                await formatToDel.remove()  
                return res.json({ message: "Deleted Format" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};