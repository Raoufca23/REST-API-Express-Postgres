const db = require('../models')
const Reserve = db.reserves;
const Op = db.Sequelize.Op;

// Create and Save a new reserve
exports.create = (req, res) => {
    // validate request
    if(!req.body.name) {
        res.status(400).send({
            message : "Contenu ne peut pas être vide !"
        });
        return ;
    }

    //create reserve
    const reserve = {
        name : req.body.name,
        comments : req.body.comments
    }

    console.log(reserve)

    //save reserve in db
    Reserve.create(reserve)
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message :
                    err.message || "Erreur lors de la création de la réserve"
            });
        });
};

// Retrieve all reserves from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;

    var condition = name ? { name: { [Op.iLike]: `%${name}%` }} : null;
    Reserve.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur lors de la récupération de la réserve."
      });
    });
};

// Find a single reserve with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
   
    Reserve.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur lors de la récupération de la réserve." + id
      });
    });
};

// Update a reserve by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Reserve.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Reserve was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update reserve with id=${id}. Maybe reserve was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating reserve with id=" + id
        });
      });
};

// Delete a reserve with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Reserve.destroy({
      where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "Reserve was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete reserve with id=${id}. Maybe reserve was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: "Could not delete reserve with id=" + id
        });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Reserve.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} reserves were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while removing all reserves."
        });
    })
};