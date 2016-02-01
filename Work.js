Work = (function() {
  function findFibonaccis(type, numbers, numberOfWorkers) {
    var startTime = new Date().getTime();
    numberOfWorkers = numberOfWorkers || 1;
    var numberOfResults = 0;
    var results = [];
    var length = numbers.length;
    var numbersPerWorker = Math.ceil(length / numberOfWorkers);

    for (var i = 0; i < length; i += numbersPerWorker) {
      var array = numbers.slice(i, i + numbersPerWorker);
      var worker = new Worker('Worker.js');
      worker.onmessage = function(event) {
        results.push(event.data);
        if (++numberOfResults * numbersPerWorker >= length) {
          results.sort(function(a, b) {
            return a.index - b.index;
          });
          results = results.reduce(function(result, element) {
            return result.concat(element.results);
          }, []);
          var message = `Total time for type ${type} with ${numberOfWorkers} workers: ${(new Date().getTime() - startTime) / 1000}`;
          var div = document.createElement('div');
          div.innerHTML = message;
          document.body.appendChild(div);
          console.log(message);
        };
      }
      worker.postMessage({
        numbers: array,
        type: type,
        index: i
      });
    }
  };
  return {
    iterative: function(numbers, numberOfWorkers) {
      findFibonaccis('iterative', numbers, numberOfWorkers);
    },
    recursive: function(numbers, numberOfWorkers){
      findFibonaccis('recursive', numbers, numberOfWorkers);
    }
  };
})();

