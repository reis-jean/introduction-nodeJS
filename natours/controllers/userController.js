
// Crud users
const User = require('../models/User');

const getAllUsers = async (req, res) => {

    try {

        const dataUsers = await User.findAll();
        console.log(dataUsers);
        
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            dataUsers: dataUsers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch users'
        });
    }
}

const getUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    })
}

const createUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    }) 
}

const updateUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    })
}

const deleteUser = (req, res)=>{

    res.status(500).json({
        status : 'error',
       message: 'This route is not yet defined'
    })
}

module.exports = {
    getAllUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser
}