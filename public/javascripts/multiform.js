/*------------Validation Function-----------------*/
var count = 0; // To count blank fields.
function validation(event) {
  var radio_check = document.getElementsByName('gender'); // Fetching radio button by name.
  var input_field = document.getElementsByClassName('text_field'); // Fetching all inputs with same class name text_field and an html tag textarea.
  var text_area = document.getElementsByTagName('textarea');
  // Validating radio button.
  if (radio_check[0].checked == false && radio_check[1].checked == false) {
    var y = 0;
  } else {
    var y = 1;
  }
  // For loop to count blank inputs.
  for (var i = input_field.length; i > count; i--) {
    if (input_field[i - 1].value == '' || text_area.value == '') {
      count = count + 1;
    } else {
      count = 0;
    }
  }
  if (count != 0 || y == 0) {
    alert("*All Fields are mandatory*"); // Notifying validation
    event.preventDefault();
  } else {
    return true;
  }
}
/*---------------------------------------------------------*/
// Function that executes on click of first next button.
function next_step1() {
  document.getElementById("first").style.display = "none";
  document.getElementById("second").style.display = "block";
  document.getElementById("active2").style.color = "red";
}
// Function that executes on click of first previous button.
function prev_step1() {
  document.getElementById("first").style.display = "block";
  document.getElementById("second").style.display = "none";
  document.getElementById("active1").style.color = "red";
  document.getElementById("active2").style.color = "gray";
}
// Function that executes on click of second next button.
function next_step2() {
  document.getElementById("second").style.display = "none";
  document.getElementById("third").style.display = "block";
  document.getElementById("active3").style.color = "red";
}
// Function that executes on click of second previous button.
function prev_step2() {
  document.getElementById("third").style.display = "none";
  document.getElementById("second").style.display = "block";
  document.getElementById("active2").style.color = "red";
  document.getElementById("active3").style.color = "gray";
}
// Function that executes on click of third next button.
function next_step3() {
  document.getElementById("third").style.display = "none";
  document.getElementById("fourth").style.display = "block";
  document.getElementById("active4").style.color = "red";
}
// Function that executes on click of third previous button.
function prev_step3() {
  document.getElementById("fourth").style.display = "none";
  document.getElementById("third").style.display = "block";
  document.getElementById("active3").style.color = "red";
  document.getElementById("active4").style.color = "gray";
}
// Function that executes on click of fourth next button.
function next_step4() {
  document.getElementById("fourth").style.display = "none";
  document.getElementById("fifth").style.display = "block";
  document.getElementById("active5").style.color = "red";
}
// Function that executes on click of fourth previous button.
function prev_step4() {
  document.getElementById("fifth").style.display = "none";
  document.getElementById("fourth").style.display = "block";
  document.getElementById("active4").style.color = "red";
  document.getElementById("active5").style.color = "gray";
}
// Function that executes on click of fifth next button.
function next_step5() {
  document.getElementById("fifth").style.display = "none";
  document.getElementById("sixth").style.display = "block";
  document.getElementById("active6").style.color = "red";
}
// Function that executes on click of fifth previous button.
function prev_step5() {
  document.getElementById("sixth").style.display = "none";
  document.getElementById("fifth").style.display = "block";
  document.getElementById("active5").style.color = "red";
  document.getElementById("active6").style.color = "gray";
}

function myFunction() {
  const x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function yesnoCheck() {
  if (document.getElementById('yesCheck').checked) {
    document.getElementById('ifYes').style.visibility = 'visible';
    document.getElementById('ifNo').style.visibility = 'hidden';
  } else {
    document.getElementById('ifYes').style.visibility = 'hidden';
    document.getElementById('ifNo').style.visibility = 'visible';
  }
}
function yesnoCheck2() {
  if (document.getElementById('yesCheck2').checked) {
    document.getElementById('ifYes2').style.visibility = 'visible';
    document.getElementById('ifNo2').style.visibility = 'hidden';
  } else {
    document.getElementById('ifYes2').style.visibility = 'hidden';
    document.getElementById('ifNo2').style.visibility = 'visible';
  }
}

$(document).ready(async function () {
    const response = await fetch("https://dev61659.service-now.com/api/now/table/domain", {
      headers: {
        Authorization: "Basic YWRtaW46QW1lbGllMTQh",
      }
    })
    const responseCopy = await response.clone();
    const responseData = await responseCopy.json();
    const data = responseData.result;

      $.each(data, function (index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $('#sel').append('<option value="' + value.sys_domain.value + '">' + value.name + '</option>');
      });
  });
$(document).ready(async function () {
    const response = await fetch("https://dev61659.service-now.com/api/now/table/core_company", {
      headers: {
        Authorization: "Basic YWRtaW46QW1lbGllMTQh",
      }
    })
    const responseCopy = await response.clone();
    const responseData = await responseCopy.json();
    const data = responseData.result;

      $.each(data, function (index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $('#sel2').append('<option value="' + value.sys_id + '">' + value.name + '</option>');
      });
  });

  // SHOW SELECTED VALUE.
  $('#sel2').change(function () {
    $('#msg2').text('You have selected: ' + this.options[this.selectedIndex].text);
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}