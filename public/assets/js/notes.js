$(document).ready(function () {

  renderNotes();

  $("#save-note").on("click", function (e) {

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
      console.log("new note", dbResponse);
      location.reload();
    });
  })

  function renderNotes() {

    $.ajax({
      url: "api/notes",
      method: "GET"
    }).then(function (results) {

      for (let i = 0; i < results.length; i++) {

        const dbData =
                  `<div class="card">
                    <div class="card-body" id=${results[i].id}>
                      <h5 class="card-subtitle mb-2 text-muted" id="newNote-title">${results[i].title}</h5>
                      <p class="card-text" id="newNote-body">
                        ${results[i].body}
                        <a><i class="fas fa-trash-alt deleteNote"></i></a>
                        <a><i class="fas fa-edit editNote"></i></a>
                      </p>
                    </div>
                  </div>`
        $("#notesDiv").prepend(dbData);
      }
    })
  }
 
  $(document).on("click", ".deleteNote", function (e) {

    // package up data from form
    const deleteNote = $(this).parent().parent().parent().attr("id");

    $.ajax({
      url: `/api/notes/${deleteNote}`,
      method: "DELETE",
    }).then(function () {
      location.reload();
    });
  })

  $(document).on("click", ".editNote", function () {

    // package up data from form
    const parent = $(this).parents(".card-body");
    const titleInput = parent.find("h5").text();
    const bodyInput = parent.find("p").text().trim();
    let editedText = `<input value="${titleInput}"><br><br>
                      <textarea>${bodyInput}</textarea>
                      <a href="/notes" <i class="fas fa-ban"></i></a>
                      <i class="far fa-save"></i>`

    parent.html(editedText)
  })

  $(document).on("click", ".fa-save", function () {
    
    const parent = $(this).parents(".card-body");

    $.ajax({
      url: '/api/notes/' + parent.attr("id"),
      method: "PUT",
      data: {
        title: parent.find("input").val().trim(),
        body: parent.find("textarea").val().trim()
      }
    }).then(()=>location.reload());
  })












})