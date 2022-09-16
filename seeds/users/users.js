const usersJson = require("./users.json");
const userModel = require("../../models/user");

const createUsers = async () => {
    await userModel.create(usersJson);
    console.log(`Created users`);
};

const addCreatedByField = async () => {
    await userModel.updateMany(
        {}, 
        { $set: { image: " " , about_me : " "} },
        { new: true }
    )

console.log("addCreatedByField")
};

//module.exports = addCreatedByField ();
