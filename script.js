function captureFormData() {
  var projectName = $("#projName").val();
  var projectType = $("#projType").val();
  var projectDate = $("#projDate").val();

  if (projectName && projectType && projectDate) {
    var projectData = {
      name: projectName,
      type: projectType,
      date: projectDate,
    };

    var projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(projectData);
    localStorage.setItem("projects", JSON.stringify(projects));

    $("#projName").val("");
    $("#projType").val("");
    $("#projDate").val("");

    printProjectData();
  }
}

function printProjectData() {
  var projects = JSON.parse(localStorage.getItem("projects")) || [];
  var tableBody = $("#projectTable tbody");

  tableBody.empty();

  projects.forEach(function (project, index) {
    var newRow = $("<tr>");
    newRow.append($("<td>").text(project.name));
    newRow.append($("<td>").text(project.type));
    newRow.append($("<td>").text(project.date));

    var deleteButton = $("<button>")
      .addClass("btn btn-danger btn-sm")
      .text("Delete");
    deleteButton.attr("data-index", index);

    deleteButton.click(function () {
      var dataIndex = $(this).attr("data-index");
      projects.splice(dataIndex, 1);
      localStorage.setItem("projects", JSON.stringify(projects));
      printProjectData();
    });

    newRow.append($("<td>").append(deleteButton));
    tableBody.append(newRow);
  });
}

printProjectData();
