/* Changes made by Popov Tihomir
 * 08/09/2011
 * Inheritance: http://stackoverflow.com/questions/1595611/how-to-properly-create-a-custom-object-in-javascript#1598077
 * 
 * Example:
 * 
 * 		// best way to make an object
 * 		Shape = Object.makeSubclass({
			_init: function(x, y) {
			    this.x= x;
		    	this.y= y;
			},
			toString : function() {
		    	return 'Shape at ' + this.x+', '+this.y;
			},
			shapefunc : function() {
		    	return '';
			}
		}); 
		
		
		// prototype functions are defined after
		Circle = Shape.makeSubclass();
		
		Circle.prototype._init = function(x, y, r) {
			Shape.prototype._init.call(this, x, y);
		    this.r= r;
		}

		Circle.prototype.toString = function() {
		    return 'Circular '+Shape.prototype.toString.call(this)+' with radius '+this.r;
		}
		Circle.prototype.circlefunc = function() {
		    return '';
		}

		
		Globe = Circle.makeSubclass();
		
		Globe.prototype._init = function(x, y, r, dimension) {
		    Circle.prototype._init.call(this, x, y, r); // invoke the base class's constructor function to take co-ords
		    this.dimension = dimension;
		}

		Globe.prototype.toString = function() {
		    return 'Globe '+Circle.prototype.toString.call(this)+' with dimension '+this.dimension;
		}
		Globe.prototype.globefunc = function() {
		    return '';
		}

		
		var shape = new Shape(3,4);
		console.log(shape.toString());
		var circle = new Circle(4,5,6);
		console.log(circle.toString());
		var globe = new Globe(10, 10, 6, 1);
		console.log(globe.toString());

 * 
 * 
 */
Function.prototype.makeSubclass = function(addToPrototype) {
	function Class() {
		if (!(this instanceof Class))
            throw('Constructor called without "new"');
		if ('_init' in this)
    		this._init.apply(this, arguments);
	}
	
	Function.prototype.makeSubclass.nonconstructor.prototype = this.prototype;
	
	Class.prototype = new Function.prototype.makeSubclass.nonconstructor();
	if (addToPrototype) {
		for(var prop in addToPrototype) {
			if(addToPrototype.hasOwnProperty(prop))
				Class.prototype[prop] = addToPrototype[prop];
		}
	}
	
	Class.superus = this.prototype;
	
	return Class;
};

Function.prototype.makeSubclass.nonconstructor = function() {};
