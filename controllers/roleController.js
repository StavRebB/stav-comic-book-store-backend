const Role = require('../models/roleModel')

exports.findAllRoles = async (req,res) => {
    try {
        let roles = await Role.find({})
        res.setHeader('Content-Range', `${roles.length}`)
        console.log(roles)
        res.json(roles)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findOneRole = async function (req, res) {
    try {
        let role = await Role.findById(req.params.id)

        if(!role) {
            return res.status(404).json({ message: "role does not exist!" })
        } else {
            return res.json(role)
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.addRole = async function (req, res) {
    try {

        let RoleData = {
            id: "null",
            Name: req.body.name,
        }

        try {
            let newRole = await Role.create(RoleData)
            newRole.id = newRole._id
            let updatedRole = await newRole.save()
            return res.status(200).json(updatedRole)
        } catch(error) {
            return res.status(500).json({ message: error.message })
        }
        
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateRole = async function (req, res) {
    try {
        let role = await Role.findById(req.params.id)
        if(!role) {
            return res.status(404).json({ message: "role does not exist!" })
        } else {
            if(req.body.Name) {
                role.Name = req.body.Name
            }
            try {
                let updatedRole = await role.save()
                return res.json(updatedRole)
            } catch(error) {
                return res.status(400).json({ message: error.message })
            }
        }

        // let updatedRole;
    
        // if(req.body.name) {
        //     updatedRole = Role.findByIdAndUpdate(req.params.id, {Name: req.body.name})
        //     return res.json(updatedRole)
        // }

    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.deleteRole = async function (req, res) {
    try {
        let role = await Role.findById(req.params.id)
        if(!role) {
            return res.status(404).json({ message: "role does not exist!" })
        } else {
            let roleToDel = role
            try {
                await roleToDel.remove()  
                return res.json({ message: "Deleted Role" })
            } catch(error) {
                return res.status(500).json({ message: error.message })
            }
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
};