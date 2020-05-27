const db = require('../models')
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // validate request
    if(!req.body.firstName) {
        res.status(400).send({
            message : "Contenu ne peut pas être vide !"
        });
        return ;
    }

    //create user
    const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age : req.body.age,
        email : req.body.email,
        password : req.body.password
    }

    //save user in db
    User.create(user)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message :
                    err.message || "Erreur lors de la création de l'utilisateur"
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    var condition = (email && password) ? { 
        email: { [Op.iLike]: `%${email}%` },
        password: { [Op.iLike]: `%${password}%` }
    } : null;
    User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur lors de la récupération de l'utilisateur."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
   
    User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur lors de la récupération de l'utilisateur." + id
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "User was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Users."
        });
    })
};