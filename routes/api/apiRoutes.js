const router = require("express").Router();
const db = require("../../config/connection");

router.get("/", function (req, res) {
  // query database for all notes and send back as json
  db.query("SELECT * FROM notes", function (err, results) {
    res.json(results);
  });
});

router.post("/", function (req, res) {
  // INSERT into database the data coming from req.body
  db.query("INSERT INTO notes SET ?", req.body, function (err, results) {
    console.log(res.affectedRows);
  })
});

router.put("/:id", function (req, res) {
  // UPDATE database setting req.body WHERE id = req.params.id
});

router.delete("/:id", function (req, res) {
  // DELETE from database where id = req.params.id
});

module.exports = router;