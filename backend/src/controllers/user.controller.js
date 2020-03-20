const userModel = require('../models/user.model');

const userController = {};

userController.getUsers = async (req, res) => {

    const users = await userModel.find();

    res.json(users)
    // res.json({user: 'user exists from controller'});
}

userController.getUser = async (req, res) => {

    const id = req.params.id;

    const user = await userModel.findById(id);

    res.json(user);
}


userController.postUser = async (req, res) => {

    const {user, email} = req.body;
     
    const newUser = new userModel ({
        user,
        email
    });

    await newUser.save();

    res.json({
        note: 'User created'
    });
};

userController.putUser = async (req, res) => {

    const id = req.params.id;

    const {user, email} = req.body;
    
    await userModel.findByIdAndUpdate({_id: id}, {
        user,
        email
    });

    res.json({
        user,
        email
    });
};

userController.deleteUser = async (req, res) => {

    const id = req.params.id;

    await userModel.findByIdAndDelete(id);

    res.json({
        user: 'User Deleted'
    });

};

module.exports = userController;