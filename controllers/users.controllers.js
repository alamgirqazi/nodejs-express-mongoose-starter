const usersController = {};
const Users = require("../models/users.model");
const path = require('path');

usersController.getAll = async (req, res) => {
    let users;
    try {
       

    let merged = {};
    

        users = await Users.paginate(merged,{      password: 0}, {
             password: 0,
            offset: parseInt(start),
            limit: parseInt(length)
        });
        res.status(200).send({
            code: 200,
            message: 'Successful',
            data: users
        });

    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
};

usersController.getSingleUser = async (req, res) => {
    let user;
    try {
        const _id = req.params._id
        user = await Users.findOne({"_id":_id });
        res.status(200).send({
            code: 200,
            message: 'Successful',
            data: user
        });

    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
};
usersController.addUser = async (req, res) => {

    Users.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            var data = {
                code: 200,
                message: 'Data inserted successfully',
                data: result
            };
            res.status(200).send(data);
        }
    });
};


usersController.getNextId = async (req, res) => {
    try {
      const max_result = await Users.aggregate([
        { $group: { _id: null, max: { $max: '$id' } } }
      ]);
  
      let nextId;
      if (max_result.length > 0) {
        nextId = max_result[0].max + 1;
      } else {
        nextId = 1;
      }
    
      var data = {
        code: 200,
        data: { id: nextId}
      };
      res.status(200).send(data);
    } catch (error) {
      console.log('error', error);
      return res.status(500).send(error);
    }
  };


usersController.deleteUser = async (req, res) => {
    if (!req.params._id) {Fu
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;

        const result = await Users.findOneAndDelete({
            _id: _id
        });
    //   const result = await Inventory.updateOne({
    //         _id: _id
    //     }, {
    //         $set: {is_deleted: 1}
    //     }, {
    //         upsert: true,
    //         runValidators: true
    //     });
        res.status(200).send({
            code: 200,
            message: "Deleted Successfully"
        });

    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
};
usersController.uploadAvatar = async (req, res) => {
    try {
const filePath = `images/avatar/avatar-${req.params.id}`;
const ext = path.extname(req.file.originalname);
const updates = {
    avatar: filePath,
    avatar_ext: ext 
}
runUpdateById(req.params.id,updates,res);
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
    
};
usersController.updateUser = async (req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: 'ID missing'
        });
    }
    try {
        const _id = req.params._id;
        let updates = req.body;
            runUpdate(_id, updates, res);
      

    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }

};

async function runUpdate(_id, updates, res) {
    try {
        const result = await Users.updateOne({
            _id: _id
        }, {
            $set: updates
        }, {
            upsert: true,
            runValidators: true
        });


        {
            if (result.nModified == 1) {
                res.status(200).send({
                    code: 200,
                    message: "Updated Successfully"
                });
            } else if (result.upserted) {
                res.status(200).send({
                    code: 200,
                    message: "Created Successfully"
                });
            } else {
                res
                    .status(422)
                    .send({
                        code: 422,
                        message: 'Unprocessible Entity'
                    });
            }
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}
async function runUpdateById(id, updates, res) {

    try {
        const result = await Users.updateOne({
            id: id
        }, {
            $set: updates
        }, {
            upsert: true,
            runValidators: true
        });


                    if (result.nModified == 1) {
                res.status(200).send({
                    code: 200,
                    message: "Updated Successfully"
                });
            } else if (result.upserted) {
                res.status(200).send({
                    code: 200,
                    message: "Created Successfully"
                });
            } else {

                {
                    res.status(200).send({
                        code: 200,
                        message: "Task completed successfully"
                    });
                }
            //     res
            //         .status(422)
            //         .send({
            //             code: 422,
            //             message: 'Unprocessible Entity'
            //         });
            // }
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
}

module.exports = usersController;