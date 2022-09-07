const User = require("../models/userModel")
const bcrypt = require('bcrypt')

const users = async () => {
    const user = await User.findOne({})
    
    if (!user) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash('dtg', salt)

        const newAdmin = new User({
            email: 'Admin@admin.com',
            fullName: 'Admin Oh Admin',
            password: hash,
            roles: { User: 1000, Admin: 2000 },
        })

        await Promise.all([newAdmin.save()])
    }
}

module.exports = users