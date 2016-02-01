var Fibonacci = (function() {
  var fibonacciNumbers = [0, 1];

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
    learning: function(number) {
      if (number < 0) {
        return 0;
      }

      var length = fibonacciNumbers.length;
      if (number < length) {
        return fibonacciNumbers[number];
      }

      var previous = fibonacciNumbers[length - 2];
      var current = fibonacciNumbers[length - 1];
      var result = current;
      for (; length <= number; length++) {
        result = current + previous;
        previous = current;
        current = result;

        fibonacciNumbers.push(result);
      }

      return result;
    },
    recursive: function(number) {
      if (number <= 0) {
        return 0;
      } else if (number === 1) {
        return 1;
      } else {
        return this.recursive(number - 1) + this.recursive(number - 2);
      }
    }
  };
})();

