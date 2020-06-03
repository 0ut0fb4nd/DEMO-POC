const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const User = require('./models/User')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
    rootPath: '/admin',
    resources: [{
        resource: User,
    }],
    branding: {
        companyName: 'RealEstate',
        softwareBrothers: false
    }
})

module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro)