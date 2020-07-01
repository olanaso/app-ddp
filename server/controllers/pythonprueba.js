let {PythonShell} = require('python-shell')

PythonShell.runString('x=1;print(x)', null, function (err, results) {
    // script finished
    console.log(results)
});