Object.prototype.accessor = function(name) {
  var field_name= "_" + name;
  this.prototype[name]= function(new_value) {
    if (name === "angular_velocity") {
      console.log(`angular_velocity(${new_value})`);
      console.log(`  this._angular_velocity: ${this[field_name]}`);
    }

    if (new_value !== undefined) {
      this[field_name]= new_value;
    }

    if (name === "angular_velocity") {
      console.log(`  this._angular_velocity: ${this[field_name]}`);
    }

    return this[field_name];
  };
};
