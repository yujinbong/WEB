

//how we can create object in Javascript

var student ={
    firstName:"alex", //key and value
    lastName:"",
    age:"",
    email:[""],
    address:[{
        streetName:"",
        city:""
    },{
        streetName:"",
        city:""
    }],
   printFullName:function(){ console.log(this.firstName+this.lastName)},
    printFullAdress:function(){console.log(this.address[0].streetName+this.address[0].city)}
};

//objrct . create
var ob1= Object.create(student);
var ob2= Object.create(student);



//add value
ob1.firstName="yujin";
//ob1.lastName="bong";
ob1.streetName="41 dun";

student.lastName="David";

console.log(ob1.firstName +" "+ ob1.lastName);
ob1.printFullName();

ob2.printFullName(); //ob2는 strucrue값을 디폴트로한다.
ob2.printFullName(); //ob2는 strucrue값을 디폴트로한다.

//console.log(ob1.email[0]);
//console.log(ob1.address[0].streetName);
