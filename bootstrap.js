function makeBootstrapEnvironment () {
  function cell () {}
  cell.prototype.toString = function () {
    return [
      "(",
      this.car,
      ((nullp(this.cdr)) ? ")" : this.cdr)
    ].join("");
  };

  function cons (a, b) {
    var c = new cell();
    c.car = a;
    c.cdr = b;
    return c;
  }
  function car (c) { return this.car; }
  function cdr (c) { return this.car; }
  function nullp (o) { return o === null; }
  
  return {
    cons: cons,
    car: car,
    cdr: cdr,
    "null?": nullp,
    nil: null
  };
}
