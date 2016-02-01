onmessage = function(event) {
  var array = event.data.numbers;
  var type = event.data.type;
  var fibonacciFunction = Fibonacci[type];
  var results = array.map(function(number) {
    return fibonacciFunction ? fibonacciFunction(number) : null;
  });

  postMessage({
    index: event.data.index,
    results: results
  });
  close();
}

var Fibonacci = (function() {
  return {
    iterative: function(number) {
      if (number <= 0) {
        return 0;
      } else if (number === 1) {
        return 1;
      }

      var previous = 0,
        current = 1,
        result = 1;
      for (i = 1; i < number; i++) {
        result = current + previous;
        previous = current;
        current = result;
      }

      return result;
    },
    recursive: function(number) {
      if (number <= 0) {
        return 0;
      } else if (number === 1) {
        return 1;
      } else {
        return Fibonacci.recursive(number - 1) + Fibonacci.recursive(number - 2);
      }
    }
  };
})();

