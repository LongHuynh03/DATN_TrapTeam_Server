const adminService = require('./AdminService');

const getAccount = async (name, password) => {
    try {
        return await adminService.getAccount(name, password);
    } catch (error) {
        console.log("Get all admin controller ", error);
        throw error;
    }
}

module.exports = {
    getAccount,
}