// Timer for updating current date and time
var timerInterval = setInterval(function () {
  var currDateTime = dayjs().format("MMM DD, YYYY [at] hh:mm:ss A");
  $("#currDateTime").text(currDateTime);
}, 1000);

// Function to capture form data and update localStorage
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

    // Clear the form data
    $("#projName").val("");
    $("#projType").val("");
    $("#projDate").val("");

    // Call the function to print project data
    printProjectData();
  }
}

// Function to print project data to the page
function printProjectData() {
  var projects = JSON.parse(localStorage.getItem("projects")) || [];
  var tableBody = $("#projTable tbody");
  tableBody.empty();

  projects.forEach(function (project, index) {
    var rowClass = dayjs(project.date).isBefore(dayjs(), "day")
      ? "table-danger"
      : "";
    var newRow = $("<tr>").addClass(rowClass);

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

// Attach event listener to form submission
$("#projForm").submit(function (event) {
  event.preventDefault();
  // Call the function to capture form data
  captureFormData();
});

// Call the function to print project data when the page loads
printProjectData();
