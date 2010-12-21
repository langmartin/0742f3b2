function parser (src, bootstrap) {
  var idx, end = src.length;
  var ch, state = 0;
  var result = [], data = result;

  var open = { "(":1, "{":"curly-bracket", "[":"square-bracket"};
  open.s = [];
  open.do = function () {
    var tmp, word = open[ch];
    if (typeof word == "string") tmp = ["word"];
    else tmp = [];
    data.push(tmp);
    open.s.push(data);
    data = tmp;
  };

  var close = { ")":1, "}":1, "]":1 };
  close.do = function () {
    eject();
    data = open.s.pop();
  };

  var white = { " ": 1, "\t": 1, "\r": 1, "\n": 1 };
  white.do = function () {
    eject();
    state = 0;
  };

  function eject () {
    if (symbol.s) {
      data.push(symbol.s.join(''));
      delete symbol.s;
    }
    if (number.s) {
      data.push(Number(number.s.join('')));
      delete number.s;
    }
  }

  var symbol = {};
  symbol.do = function () {
    if (! symbol.s) symbol.s = [];
    symbol.s.push(ch);
    state = "s";
  };

  var number = {};
  number.do = function () {
    if (! number.s) number.s = [];
    number.s.push(ch);
    state = "n";
  };

  for (idx = 0; idx < end; idx++) {
    ch = src[idx];
    // console.debug(ch, state)
    switch (state) {
    case 0:
      if (open[ch]) open.do();
      else if (close[ch]) close.do();
      else if (white[ch]) noop();
      else if (isNumeric(ch)) number.do();
      else symbol.do();
      break;
    case "s":
      if (close[ch]) close.do();
      else if (white[ch]) white.do();
      else symbol.do();
      break;
    case "n":
      if (close[ch]) close.do();
      else if (white[ch]) white.do();
      else number.do();
    }
  }
  eject();
  
  return result;
}

assert(
  function () {
    var foo = parser("foo bar");
    return (foo[0] == "foo") && (foo[1] == "bar");
  },
  function () {
    var foo = parser("(foo (bar 1) 1 2");
    return (foo[0][0] === "foo")
      && (foo[0][1][0] === "bar")
      && (foo[0][1][1] === 1);
  }
);
