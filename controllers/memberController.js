const Member = require('../models/memberModel')

const fs = require('fs')
const path = require('path')

const addPictures = (mainImage, pictures) => {

    for (let picture of pictures) {

        mainImage = picture.title

        const image = picture.src
        const match = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const buffer = Buffer.from(match[2], 'base64')

        fs.writeFile(path.join('tmp', 'uploads', 'photoSrc', 'members', picture.title), buffer , { flag: 'wx' }, (err) => {
            if(err)
                console.log(err)
        })
    }

    return mainImage
}


exports.findAllMembers = async (req,res) => {
    try {
        let members = await Member.find({})
        res.setHeader('Content-Range', `${members.length}`)
        res.json(members)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneMember = async function (req, res) {
    try {
        let member = await Member.findById(req.params.id)
        if(member === null) {
            return res.status(404).json({ message: "member does not exist!" })
        } else {
            res.json(member)
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findMemberByEmail = async function (req, res) {
    try {
        let member = await Member.find({Email: req.params.email})
        if(!member.length) {
            return res.status(404).json({ message: "member does not exist!" })
        } else {
            member=member[0]
            res.json(member)
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.addMemberByUser = async function (req, res) {
    try {

        let photo = req.file ? req.file.filename.split('/')[1] : null
    
        let MemberData = {
            id: "null",
            FirstName: req.body.FirstName,
            LastName: req.body.LastName || null,
            Email: req.body.Email,
            Active: req.body.Active || true,
            Role: req.body.Role || "606b3a27b75b923d58cee841",
            DateOfBirth: req.body.DateOfBirth || null,
            Gender: req.body.Gender || "Other",
            PhoneNumber: req.body.PhoneNumber || null,
            ZipCode: req.body.ZipCode || null,
            Address: req.body.Address || null,
            City: req.body.City || null,
            Country: req.body.Country || null,
            Image: photo || null,
        }

        try {
            let newMember = await Member.create(MemberData)
            newMember.id = newMember._id
            let updatedMember = await newMember.save()
            res.status(201).json(updatedMember)
        } catch(error) {
            res.status(500).json({message: "problem here" + error.message })
        }
        
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateMemberByUser = async function (req, res) {
    console.log(req.file)
    try {
        let member = await Member.findById(req.params.id)
        if(member === null) {
            return res.status(404).json({ message: "member does not exist!" })
        } else {
            if(req.body.FirstName) {
                member.FirstName = req.body.FirstName
            }
            if(req.body.LastName) {
                member.LastName = req.body.LastName
            }
            if(req.body.Email) {
                member.Email = req.body.Email
            }
            if(req.body.Active) {
                member.Active = req.body.Active
            }
            if(req.body.Role) {
                member.Role = req.body.Role
            }
            if(req.body.Password) {
                member.Password = req.body.Password
            }
            if(req.body.DateOfBirth) {
                member.DateOfBirth = req.body.DateOfBirth
            }
            if(req.body.Gender) {
                member.Gender = req.body.Gender
            }
            if(req.body.PhoneNumber) {
                member.PhoneNumber = req.body.PhoneNumber
            }
            if(req.body.ZipCode) {
                member.ZipCode = req.body.ZipCode
            }
            if(req.body.Address) {
                member.Address = req.body.Address
            }
            if(req.body.City) {
                member.City = req.body.City
            }
            if(req.body.Country) {
                member.Country = req.body.Country
            }
            if (req.file) {
                let photo = req.file ? req.file.filename.split('/')[1] : null
                member.Image = photo
            }

            try {
                let updatedMember = await member.save()
                res.json(updatedMember)
            } catch(error) {
                res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};

exports.addMember = async function (req, res) {
    console.log(req.body)
    try {

        let mainImage;
    
        let MemberData = {
            id: "null",
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Active: req.body.active || true,
            Role: req.body.role || "606b3a27b75b923d58cee841",
            Password: req.body.password,
            DateOfBirth: req.body.dateOfBirth || null,
            Gender: req.body.gender || "Other",
            PhoneNumber: req.body.phoneNumber || null,
            ZipCode: req.body.zipCode || null,
            Address: req.body.address || null,
            City: req.body.city || null,
            Country: req.body.country || null,
        }

        if(req.body.pictures) {
            MemberData.Image = addPictures(mainImage, req.body.pictures)
        }

        try {
            let newMember = await Member.create(MemberData)
            newMember.id = newMember._id
            let updatedMember = await newMember.save()
            res.status(201).json(updatedMember)
        } catch(error) {
            res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateMember = async function (req, res) {
    console.log(req.body)
    try {
        
        const mainImage = req.body.image

        let member = await Member.findById(req.params.id)
        if(member === null) {
            return res.status(404).json({ message: "member does not exist!" })
        } else {
            if(req.body.FirstName) {
                member.FirstName = req.body.FirstName
            }
            if(req.body.LastName) {
                member.LastName = req.body.LastName
            }
            if(req.body.Email) {
                member.Email = req.body.Email
            }
            if(req.body.Active) {
                member.Active = req.body.Active
            }
            if(req.body.Role) {
                member.Role = req.body.Role
            }
            if(req.body.DateOfBirth) {
                member.DateOfBirth = req.body.DateOfBirth
            }
            if(req.body.Gender) {
                member.Gender = req.body.Gender
            }
            if(req.body.PhoneNumber) {
                member.PhoneNumber = req.body.PhoneNumber
            }
            if(req.body.ZipCode) {
                member.ZipCode = req.body.ZipCode
            }
            if(req.body.Address) {
                member.Address = req.body.Address
            }
            if(req.body.City) {
                member.City = req.body.City
            }
            if(req.body.Country) {
                member.Country = req.body.Country
            }

            if (req.body.pictures) {
                console.log(req.body)
                member.Image = addPictures(mainImage, req.body.pictures)
            }

            try {
                let updatedMember = await member.save()
                res.json(updatedMember)
            } catch(error) {
                res.status(400).json({ message: error.message })
            }
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};

exports.deleteMember = async function (req, res) {
    try {
        let member = await Member.findById(req.params.id).exec()
        if(member === null) {
            return res.status(404).json({ message: "member does not exist!" })
        } else {
            try {
                await member.remove()  
                res.json({ message: "Deleted Member" })
            } catch(error) {
                res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};