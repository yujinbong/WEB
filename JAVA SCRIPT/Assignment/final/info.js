/*********************************************************************************
* WEB222 – Final Project
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of
* this assignment has been copied manually or electronically from any other source (including web sites)
* or distributed to other students.
*
* Name: Yujin Bong Student ID: 147525208 Date: Dec.9
*
********************************************************************************/

var form=document.getElementById('signup');
var firstName=document.querySelector('#firstName');
var lastName=document.querySelector('#lastName');
var password=document.querySelector('#password');
var confirmPassword=document.querySelector('#confirmPassword');
var submit=document.getElementById('submit');
const errorElement=document.getElementById('error');
var userName = document.getElementById('username');
var education = document.getElementById('education');
var email = document.getElementById('email');
var age = document.getElementById('age');
var idcheck = /^[A-Z][a-z]*$/;//only characters
var passcheck =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}/;
var usercheck = /^[A-Za-z]*.{5,}/;
var emailcheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var ageCheck= /[0-9]{1,2}$/ 

/* A. You must make all fields mandatory to insert for users.
B. First name: Must start with a cap and only alphabet allowed.
C. Last name: Must start with a cap and only alphabet allowed.
D. Password: must be at least 6 characters long, must start with an alphabet,
must have at least 1 digit and 1 uppercase. The password strings must
match. Pattern attribute is not allowed for this field.
E. Username: username must start with an alphabet, must have at least 6
characters. Pattern attribute is not allowed for this field.
F. Education Status: Type of radio. The value should choose from one of the
following: Graduated, Current enrolled, Did not graduate.
G. Email: use html5 input type for default validation.
H. Age: must be in between 18-60.
I. The name of the form must be “signup” to accept user’s input for creating
user account. This form must submit to https://httpbin.org/post using the post method only when the form does not contain any validation errors. You must do the following for displaying error messages-
Display appropriate messages in side panel only for each error when the user clicks the submit button. There should not be more than 5 error messages in total for each display. These errors are mainly for part D and E above.
J. You should use pattern matching wherever possible to make JavaScript code efficient. You may want to use “required" attribute as necessary. If there is no error found, then a success alert is displayed and form is submitted to https://httpbin.org/post.
K. This page must have two hidden fields: one with your last name as value and lastName as field name/id and the other with your Seneca student id as value and studentId as field name/id. Failure to have this hidden field with appropriate property/value will result in zero mark for this page. Example is given below:
<input type="hidden" name="lastName" id="lastName" value="Your last name goes here" />
<input type="hidden" name="studentId" id="studentId" value="Your student Id goes here" />*/









//first name validation check
form.addEventListener('submit', (e) => {
let messages=[]
if(firstName.value === '' || firstName.value == null) {
    messages.push('First name is required')
}
//왜 name1은 여기에있어야만 작동할까?
var name1 = document.getElementById('firstName').value;


if(!idcheck.test(firstName.value)){
    messages.push('First Name :Please enter start with a capital letter and enter only characters')   
    form.firstName.focus();// back to the fiesrNamme form.
}

//last name validation check
else if(!idcheck.test(lastName.value)){
    messages.push('Last Name : Please enter start with a capital letter and enter only characters')   
}

else if(lastName.value === '' || lastName.value == null) {
    messages.push('Last name is required')
}

//password validation check
else if(!passcheck.test(password.value)){
    messages.push('Password: Please enter 6-20 characters including capital letters and numbers.')   
}

//Password cannot be password
else if(password.value === 'password') {
    messages.push('Password cannot be password')
}

//confirm password
else if(confirmPassword.value  != password.value) {
    messages.push('Password must match the password above.')
    } 

//UserName check
else if(!usercheck.test(userName.value)){
    messages.push('User names must start with an alphabetic character and must be at least 6 characters long.')   
}

//age check
else if(age.value <18 || age.value > 60) {
    messages.push('Sorry,only between the ages of 18 and 60 can sign up.')
}
//email check
else if(!emailcheck.test(email.value)){
    messages.push('Please check the email form again.')   
}


//error
if(messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(' / ') 
}else   {
    alert('Login Success!')
   // window.open('reflection.html')   
}
})


