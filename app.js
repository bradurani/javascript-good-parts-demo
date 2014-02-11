//Constructor simple
var Car = function(){ };

Car.prototype.honk = function() {
	console.log("Meep Meep");
};

var myCar = new Car();

myCar.stepOnIt = function() { //dynamic property
 	console.log("Vroom Vroom");
}

myCar.honk(); //Meep . - Super class method
myCar.stepOnIt(); //Vroom Vroom - Sub class method

//--------Constructor with param--------//
var Quo = function(string) {
	this.status = string;
};

Quo.prototype.get_status = function() {
	return this.status;
};
var my_quo = new Quo("bork");
console.log(my_quo.get_status()); //bork


//-----Pseudo Classical construction------//
var Jalopy = function(){};
Jalopy.prototype = new Car();
Jalopy.prototype.honk = function() {
	console.log("Auuuuuuuuggggaaa!");
};
var juneysCar = new Jalopy();
juneysCar.honk();

//---Create a new constructor from a prototype---
if(typeof Object.createConstructor !== 'function') {
	Object.createConstructor = function(o) {
		var F = function() {};
		F.prototype = o;
		return F;
	}
}


var Dusenberg = Object.createConstructor(new Jalopy());
Dusenberg.prototype.honk = function() {
	console.log("Dussel Dussel Dussel");
}
dusenberg = new Dusenberg();
dusenberg.honk();


//---Create a new object from a prototype
if(typeof Object.create !== 'function'){ //actually, jQuery has this built in
	Object.create = function(o){
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

var rollsRoyce = Object.create(new Jalopy());



//An object literal
var burrito = {
	toppings: ["sour cream", "lettuce", "guac"],
	type: "Steak",
	getEaten: function() {
		console.log("Nom nom nom, eat my " + this.type);
	}
};

burrito.getEaten();

chickenBurrito = Object.create(burrito);
chickenBurrito.type = "Chicken";
chickenBurrito.getEaten();

console.log("\n-------");
for(prop in chickenBurrito) {
	console.log(prop + ": " + chickenBurrito[prop]);
}
console.log("\n-------");

//Looping through properties
function printProperties(obj){
	for (p in obj)
	{
		if (typeof obj[p] !== 'function')
			console.log(p + ": " + obj[p]);
	}
}

console.log("\n-------");
printProperties(chickenBurrito);
console.log("-------\n");


//Method for augmenting existing types (functions)
 Function.prototype.method = function(name, func)
 {
 	if(!this.prototype[name]){
 		this.prototype[name] = func;
 	}
 	return this;
 };

 Number.method('toInt', function() {
 	return Math[this < 0 ? 'ceil' : 'floor'](this); //cool example of using string accessors instead of .property
 });

String.method('trim', function() {
	return this.replace(/^\s+|+$/g, '');
});
console.log(parseInt("  5  ".trim()).toInt());


//------late binding---------//
var factorial = function factorial(i, a) {
	a = a || 1;
	if(i < 2) {
		return a;
	}
	return factorial(i - 1, a * i); //late biding, function in parent scope not defined until execution
};

console.log(factorial(11)); //'factorial' gets defined when function called

//-----------closures--------//
var quo = function(status) {
	return {
		get_status: function() {
			return status;
		}
	}
};

var myQuo = quo("amazed");
console.log(myQuo.get_status());


//-----------another closure-----------
var generator = function(skip) {
	var skip = typeof skip === 'number' ? skip : 1;
	var start = 0
	return function() {
		start = start + skip;
		return start;
	}
}

var skip3 = generator(3);
console.log(skip3());
console.log(skip3());
console.log(skip3());

//--------closure--------//
var arrayOfExpFunctions = (function() {
	var ret = [];
	var f = function(exponent) {
		return function(base) {
			return Math.pow(base, exponent);
		} 
	};
	var i;
	for(i = 0; i < 10; i++) {
		ret.push(f(i));
	}
	return ret;

})();




//--------Functional inheritance-------
var mammal = function(spec) {
	var that = {};

	//required constructor arg
	that.get_name = function() {
		return spec.name
	};

	//optional override
	that.get_type = function() {
		return spec.type || 'mammal';
	}

	//private constructor argument
	that.says = function(){
		return spec.noise || '';
	}

	return that;
};

var kangaroo = mammal({ 
	name: 'Fred',
	type: 'Kangaroo',
	noise: 'Boing boing'
});

console.log("Name: " + kangaroo.get_name() + " Says: " + kangaroo.says());

//-------sub class-------//
var cat = function(spec) {
	spec.noise = spec.noise || 'meow'; //optional constructor arg
	var that = mammal(spec); //inherit from mammal
	
	//add subclass method
	that.purr = function(n) {
		times = typeof n === "number" ? n : 1;
		var ret = ""
		for (var i=0; i < times; i++)
			ret += "Prrrrrrrr\n";
		return ret;
	};

	//override getter
	that.get_name = function() {
		return that.says() + ' ' + spec.name + ' ' + that.says(); 
	} 
	return that;
};

heathcliff = cat({ name : "Heathcliff" });
console.log(heathcliff.purr());
console.log(heathcliff.get_name());



// //awful parts:
// ///GLOBAL VARIABLES
// foo = "bar"; //global
// var foo = "bar";

// //Semicolon Insertion
// return   //returns undefined
// {
// 	status: true
// }

// //correct
// return {
// 	status: true
// };

// //parseInt has errors
// parseInt("16") ==




