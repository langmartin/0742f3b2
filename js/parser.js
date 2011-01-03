
function parser (src, bootstrap) {
  var open = { "(":1, "{":"curly-bracket", "[":"square-bracket"};
  open.s = [];
  open.do = function () {
    var tmp, word = open[ch];
    if (typeof word == "string") {
      ls.cons(word, parser(src, ls, idx));
    }
    else {
      ls.cons(parser(src, ls, idx));
    }
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

  var state = 0;
  var idx, length = src.length;


  function symbol () {
    var sym = [], ch;
    for (; idx < length; idx++) {
      ch = src[idx];
      if (close[ch]) break;
      if (white[ch]) break;
      else sym.push(ch);
    }
    return sym.join('');
  }

  function number () {
    var num = [], ch;
    for (; idx < length; idx++) {
      ch = src[idx];
      if (close[ch]) break;
      if (white[ch]) break;
      else num.push(ch);
    }
    return Number(num.join(''));
  }
      


  function parse (idx) {
    for (; idx < length; idx++) {
      ch = src[idx];
      // console.debug(ch, state)
      switch (state) {
      case 0:
        if (open[ch]) return open.do();
        if (close[ch]) return close.do();
        if (white[ch]) noop();
        if (isNumeric(ch)) return number.do();
        else return symbol.do();
        break;
      case "s":
        if (close[ch]) return close.do();
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
  }
  
  return parse(0, 0);
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
