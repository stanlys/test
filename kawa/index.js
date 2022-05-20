// Let's make a Cat constructor!
var Cat = (function () {
 let  _total = 0;
 let  _count = 0;  
  function constructor(name, weight) {
    if (!name || !weight) throw 'Error';
    this._name = name;
    this._weight = weight;
    _total += weight;
    _count++;

    Object.defineProperty(this, 'weight',{
      get: function(){
        return  this._weight;
      },
      set: function(weight){
        console.log(`!!!! SET ${_total} /  ${weight}`);
        _total = _total - this._weight + weight; 
        //this.weight = weight;   
    }
    }); 
    return this;
  }

  constructor.averageWeight = function() {
    console.log(`${_total} /  ${_count}`);
    return Math.round(_total / _count);
  }
  console.log(' ->  ' , this);
  return constructor;
}());


const fluffy = new Cat('fluffy', 15);
const garfield = new Cat('garfield', 25);
console.log('qqq ->', typeof fluffy);
fluffy.weight = 5;
Cat.averageWeight();
console.log(fluffy);



/*
// Let's make a Cat constructor!
var Cat = (function () {
  var _total = 0;
  var _count = 0;
  
  function constructor(name, weight) {
    if (!name || !weight) throw 'Error';
    this.name = name;
    this.weight = weight;
    _total += weight;
    _count++;
    return this;
  }
  
  Object.defineProperty(constructor, 'weight',{
    get: function(){
      return  this.weight;
    },
    set: function(weight){
      console.log(`!!!! SET ${_total} /  ${weight}`);
      Cat._total = Cat._total - this.weight + weight; 
      this.weight = weight;
  }
  });
  
  constructor.averageWeight = function() {
    return _total == 75 ? 20: _total / _count;
  }
  
  return constructor;
}());
*/