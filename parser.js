function parser (src) {
  var idx, end = src.len;
  var ch, state = 0;
  var result = [], tmp, data = result;

  var open = { "(": 1 };
  var stack = [];
  open.do = function () {
    data.push(tmp = []);
    stack.unshift(data);
    data = tmp;
  };

  var close = { ")": 1 };
  close.do = function () { data = stack.pop(); };

  var white = { " ": 1, "\t": 1, "\r": 1, "\n": 1 };
  white.do = function () {
    if (symbol.s) symbol.eject();
    state = 0;
  };

  var symbol = {};
  symbol.s = [];
  symbol.do = function () {
    symbol.s.push(ch);
    state = "s";
  };
  symbol.eject = function () {
    data.push(symbol.s.join(''));
    symbol.s = [];
  };

  for (idx = 0; idx < end; idx++) {
    ch = src[idx];
    switch (state) {
    case 0:
      if (open[ch]) open.do();
      if (close[ch]) close.do();
      if (white[ch]);
        else symbol.do();
      break;
    case "s":
      if (white[ch]) white.do();
      break;
    }
  }
  
  return result;
}
