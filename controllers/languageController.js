const Language = require('../models/languageModel')

exports.findAllLanguages = async (req,res) => {
    try {
        let languages = await Language.find({})
        res.setHeader('Content-Range', `${languages.length}`)
        res.json(languages)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneLanguage = async function (req, res) {
    try {
        let language = await Language.findById(req.params.id)
        if(language === null) {
            return res.status(404).json({ message: "language does not exist!" })
        } else {
            return res.json(language)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addLanguage = async function (req, res) {
    try {
    
        let LanguageData = {
            id: "null",
            Name: req.body.name,
        }

        try {
            let newLanguage = await Language.create(LanguageData)
            newLanguage.id = newLanguage._id
            let updatedLanguage = await newLanguage.save()
            return res.status(201).json(updatedLanguage)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateLanguage = async function (req, res) {
    try {
        let language = await Language.findById(req.params.id)
        if(language === null) {
            return res.status(404).json({ message: "language does not exist!" })
        } else {
            if(req.body.Name !== null) {
                language.Name = req.body.Name
            }
            try {
                let updatedLanguage = await language.save()
                return res.json(updatedLanguage)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteLanguage = async function (req, res) {
    try {
        let language = await Language.findById(req.params.id)
        if(language === null) {
            return res.status(404).json({ message: "language does not exist!" })
        } else {
            let languageToDel = language
            try {
                await languageToDel.remove()  
                return res.json({ message: "Deleted Language" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};