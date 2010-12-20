function assert (thunk0, thunk1) {
  var thunk;
  for (var ii=0; ii<arguments.length; ii++) {
    thunk = arguments[ii];
    if (! (thunk())) {
      if ($ && $.display) $.display(thunk);
      throw new Error("" + thunk);
    }
  }
}

function identity (x) { return x; }
var first = identity;
function second (a) { return a[1]; }
function fnfalse () { return false; }
function fntrue () { return true; }
function noop () { }

function pInt (val) { return parseInt(val, 10); }
function pFloat (val) { return parseFloat(val, 10); }

function isNumeric (ch) {
  return ((ch >= "0") && (ch <= "9"));
}

function isAlphanumeric (ch) {
  return (
    ((ch >= "a") && (ch <= "z")) ||
    ((ch >= "A") && (ch <= "Z")) ||
    ((ch >= "0") && (ch <= "9")) ||
    (ch == "_")
  );
}

function isWhitespace (ch) {
  return (ch.search(/^[ \r\n\t\v]$/) >= 0);
}
