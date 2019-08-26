var currentSection = 0;

function navigationBtn(n) {
  $(".err").remove();
  var s = $(".section");
  if (n == 1 && !validate()) return false;
  s[currentSection].style.display = "none";
  currentSection = currentSection + n;
  if (currentSection >= s.length) {    
    $(".lastSection").attr("style", "display:block");
    $("#prevBtn").hide();
    $("#nextBtn").hide();  
    $("ul").hide(); 
    $("#thankyoubox").append("<p>Username: " + $("#username").val() + "</p>");      
    $("#thankyoubox").append("<p>Full Name: " + $("#fname").val() + " " + $("#lname").val() + "</p>");
    $("#thankyoubox").append("<p>Email: " + $("#username").val() + "</p>");      
    $("#thankyoubox").append("<p>Phone Numer: " + $("#phone").val() + "</p>");      
    $("#thankyoubox").append("<p>Address: " + $("#address").val() + "</p>");      
    $("#thankyoubox").append("<p>Bio: " + $("#bio").val() + "</p>");        
    return false;
  }
  showSection(currentSection);
}

function showSection(n) {
  $(".section:eq("+n+")").fadeIn(2000);   
  var s = $(".section");
  s[n].style.display = "block";
  if (n == 0) {
    $("#prevBtn").attr("style", "display:none");
  } else {
    $("#prevBtn").attr("style", "display:inline");
  }
  if (n == (s.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  setStep(n)
}

function setStep(n) {
  var i, x = $("li");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace("active", "");
  }
  x[n].className += "active";
}

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  var regex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
  return regex.test(phone);
}

function showError(el, err){
    $(".input#" + el.id).after("<div class='err'> " + err + "</div>");
}

function validate() {
  var els, i, valid = true;
  var s = $(".section");
  els = s[currentSection].getElementsByClassName("input");
  for (i = 0; i < els.length; i++) {
      
      if (valid && els[i].id == "chbox"){
          if (!$("#chbox").is(':checked')){
              alert("The terms of service checkbox must be checked");
              valid = false;
          }
      } 
      else{
         els[i].className = els[i].className.replace("invalid", ""); 
         if (els[i].value == "") {
              els[i].className += " invalid";
              valid = false;
              showError(els[i], els[i].name + " required");
              //alert(els[i].id);
         }
         if (valid) {
             if (els[i].id == "email"){
                 if (!isValidEmail(els[i].value)){
                     els[i].className += " invalid";
                     valid = false;
                     showError(els[i], "wrong format of " + els[i].name);
                     //alert("email in wrong format");
                 }
             }
             
             if (els[i].id == "phone"){
                 if (!isValidPhone(els[i].value)){
                     els[i].className += " invalid";
                     valid = false;
                     showError(els[i], "wrong format of " + els[i].name + "(###-###-####)");
                     //alert("email in wrong format");
                 }
             }
             
             if (els[i].id == "confirmpassword"){
                 //alert($("#password").val());
                 //alert(els[i].value);
                if ($("#password").val() != els[i].value){
                    els[i].className += " invalid";
                    valid = false;
                    showError(els[i], "passwords don't match");    
                }   
             }
         }
      }
  }
  return valid;
}

$(document).ready(function() {
    showSection(currentSection); 

    $("#nextBtn").click(function(){
        //alert("next");
        navigationBtn(1);
    })

    $("#prevBtn").click(function(){
        navigationBtn(-1);   
    })
})