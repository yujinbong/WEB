/*
function student(fName="", lName=""){
    this.firstName=fName;
    this.lastName =lName;
}

student.prototype.printFullName=function(){console.log(this.firstName + " " + this.lastName)};
var ob1= new student("yujin","bong");
ob1.printFullName();
*/

class student{
    constructor(fName="",lName="") {
        this.firstName=fName;
        this.lastName=lName;
    }
    printFullName(){
        console.log(this.firstName + this.lastName);
    }
}

var ob1=new student("alex","david");

ob1.printFullName();
