const Publisher = require('../models/publishersModel')

exports.findAll = async (req,res) => {
    try {
        let publishers = await Publisher.find({})
        res.setHeader('Content-Range', `${publishers.length}`)
        res.json(publishers)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOnePublisher = async function (req, res) {
    try {
        let publisher = await Publisher.findById(req.params.id)
        if(publisher === null) {
            return res.status(404).json({ message: "publisher does not exist!" })
        } else {
            return res.json(publisher)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addPublisher = async function (req, res) {
    console.log(req.body)
    console.log(req.file)
    try {
    
        let PublisherData = {
            id: "null",
            Name: req.body.name,
            PublicationCity: req.body.publicationCity,
            PublicationCountry: req.body.publicationCountry
        }

        console.log(PublisherData)

        try {
            let newPublisher = await Publisher.create(PublisherData)
            newPublisher.id = newPublisher._id
            let updatedPublisher = await newPublisher.save()
            return res.status(201).json(updatedPublisher)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updatePublisher = async function (req, res) {
    console.log(req.body)
    try {
        let publisher = await Publisher.findById(req.params.id)
        if(publisher === null) {
            return res.status(404).json({ message: "publisher does not exist!" })
        } else {
            if(req.body.Name) {
                publisher.Name = req.body.Name
            }
            if(req.body.PublicationCity) {
                publisher.PublicationCity = req.body.PublicationCity
            }
            if(req.body.PublicationCountry) {
                publisher.PublicationCountry = req.body.PublicationCountry
            }
            try {
                let updatedPublisher = await publisher.save()
                return res.json(updatedPublisher)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deletePublisher = async function (req, res) {
    try {
        let publisher = await Publisher.findById(req.params.id)
        if(publisher === null) {
            return res.status(404).json({ message: "publisher does not exist!" })
        } else {
            let publisherToDel = publisher
            try {
                await publisherToDel.remove()  
                return res.json({ message: "Deleted Publisher" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};