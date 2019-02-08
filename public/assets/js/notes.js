$(document).ready(function () {

  $("#save-note").on("click", function (e) {
    e.preventDefault();

    // package up data from form
    const newNote = {
      title: $("#note-title").val().trim(),
      body: $("#note-body").val().trim(),
    };

    $.ajax({
      url: "/api/notes",
      method: "POST",
      data: newNote // this is req.body
    }).then(function (dbResponse) {
      console.log(dbResponse);
      location.reload();
    });
  })

  // $.ajax({
  //   url: "/api/notes",
  //   method: "GET",
  // }).then(function (dbResponse) {
  //   console.log(dbResponse);
  //   // location.reload();
  // });







})