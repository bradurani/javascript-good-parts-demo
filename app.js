//Constructor simple
var Car = function(){ };

Car.prototype.getGoing = function() {
	console.log("Vroooooom!");
}

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
juneysCar.honk(); //Auuuuuugggaaa!

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
dusenberg.honk(); //Dussel Dussel Dussel


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

burrito.getEaten(); //Non non nom eat my Steak

chickenBurrito = Object.create(burrito);
chickenBurrito.type = "Chicken";
chickenBurrito.getEaten(); //Non nom nom, eat my Chicken

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

 console.log(5.55.toInt())

String.method('trim', function() {
	return this.replace(/^\s+|+$/g, '');
});



console.log(5.2345345.toInt())

console.log("    bradurani@gmail.com \n\r   ".trim())

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
console.log(myQuo.get_status()); //amazed


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

	/* private methods */
	function findCave() {
		console.log('Looks cozy in here');
	}

	function sleepAlot() {
		console.log('zzzzz');
	}

	function wakeUp() {
		console.log("spring finally!");
	}

	/* public methods */
	that.hibernate = function() {
		findCave();
		sleepAlot();
		wakeUp();
	}

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
console.log(kangaroo.hibernate());

try {
	console.sleepAlot(); //throw error
} catch (e) {
	console.log(e);
}

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

var meow = function() {
	console.log("meow");
}

meow();

function meow() {
	console.log("meow");
}

meow();

//awful parts:
///GLOBAL VARIABLES
foo = "bar"; //global
var foo = "bar";


var bleh = "hmmm" //semi-colon inserted here
var anotherbleh = "yummy";

function wrong() {
	return   //semi-colon inserted here. returns undefined
	{
		status: true
	};
}

console.log(wrong()); //undefined

//correct
function right() {
	return {
		status: true
	};
}

console.log(right());

var Obj = function(path) {
			var self = this;

			var docRoot = path;
			
			console.log(self);
			
			self.color = "red";
			self.count = 0;

			this.validateDocRoot = function(val) {

			};

			this.setDocRoot = function(val) {
				self.validateDocRoot(val);
				docRoot = val;
			};

			this.getDocRoot = function() {
				return docRoot;
			};

			this.increment = function() {
				return self.count++;
			}
};


var Obj = function() {
	return function(path) {
			var self = this;

			var docRoot = path;
			
			console.log(self);
			
			self.color = "red";
			self.count = 0;

			this.validateDocRoot = function(val) {

			};

			this.setDocRoot = function(val) {
				self.validateDocRoot(val);
				docRoot = val;
			};

			this.getDocRoot = function() {
				return docRoot;
			};

			this.increment = function() {
				return self.count++;
			}
	};
}());

var Obj = function(path) {
			var instance = {};

			var docRoot = path;
			
			console.log(self);
			
			instance.color = "red";
			self.count = 0;

			instance.validateDocRoot = function(val) {

			};

			instance.setDocRoot = function(val) {
				self.validateDocRoot(val);
				docRoot = val;
			};

			instance.getDocRoot = function() {
				return docRoot;
			};

			instance.increment = function() {
				return instance.count++;
			}
};


var obj = new Obj("/root");
console.log(obj.getDocRoot())
var inc = obj.increment //'this' no refers to window, but we're ok
//$(".btn").click(obj.increment); //real world example where it matters
//$(".btn").click(obj.increment.bind(obj)) //other option if you're not sure whether 'this' is safely scoped
inc(); //0
inc(); //1
inc(); //2

// //parseInt has errors
console.log(parseInt("16 tons") == 16) //true

//factory pattern:
// parent constructor
function AutoFactory() {}
 
//override toString()
AutoFactory.prototype.toString = function () {
    return "I have " + this.numberOfHorses + " horses under the hood.";
};
 
AutoFactory.prototype.drive = function () {
    return "Vroom!";
};
 
// the static factory method
AutoFactory.build = function (constr) {
    // Throw an error if no constructor for the given automobile
    if (typeof AutoFactory[constr] !== "function") {
        throw {
            name:    "AutoFactoryError",
            message: "You cannot create " + constr + " automobiles in this factory"
        };
    }
     
    for (var fn in AutoFactory.prototype) {
      // Here, the method borrowing technique is used to 
      // selectively inherit from the AutoFactory
      if (  typeof AutoFactory[constr].prototype[fn] !== "function"
         || AutoFactory[constr].prototype[fn].toString().indexOf('[native code]') > -1 ) {
          AutoFactory[constr].prototype[fn] = AutoFactory.prototype[fn];
      }
    }
    // create a new automobile using the factory
    return new AutoFactory[constr]();
};
 
// define specific animal makers
AutoFactory.Prius = function () {
    this.numberOfHorses = 110;
};
AutoFactory.G35 = function () {
    this.numberOfHorses = 306;
};
AutoFactory.Porsche = function () {
    this.numberOfHorses = 400;
};
AutoFactory.Porsche.prototype.toString = function () {
  return "I have my own toString() method.";
};              
 
var prius = AutoFactory.build('Prius');
var g35 = AutoFactory.build('G35');
var porsche = AutoFactory.build('Porsche');
alert(prius); // "I have 110 horses under the hood."
alert(prius.drive()); // "Vroom!"
alert(g35); // "I have 306 horses under the hood."
alert(g35.drive()); // "Vroom!"
alert(porsche); // "I have my own toString() method."
alert(porsche.drive()); // "Vroom!"




