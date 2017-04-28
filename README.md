# Development Environment for Online Code Challenges

The repository contains projects used in programming solutions for various online coding challenges.  It contains solutions and unit tests for solutions.  

The unit tests are done mainly with NUnit.

The following sites and languages are being targeted right now, but more may be added.

[CodeWars](https://www.codewars.com/users/tknine)

Languages:
* C# - with Visual Studio 2017
* JavaScript - with VS Code in Node.js debugger

[LeetCode](https://leetcode.com/tknine/)

* C# - with Visual Studio 2017

### CodeWars and LeetCode C# Configuration

Both these sites seem to use NUnit as the test framework for testing solutions, and so does the C# project here.  

There is no special configuration for each solution.  Just add the appropriate library references to each file and create the tests.  The convention being used in this case is to have each set of tests be located in the same file as the solution.


### CodeWars JavaScript Configuration


#### Test Framework
The CodeWars JavaScript development is tested using the cut down version of their test framework so that the sample unit tests can just be added to the code file without any changes and run the VS Code Node.js debugger.  Just require the framework at the top of each solution.

```javascript
var Test = require('./frameworks/javascript/cw-2');

function towerBuilder(nFloors) {
  var floors = [];
  
  //SOLUTION CODE...
  
  return floors;
}

// Unit tests
Test.assertEquals(JSON.stringify(towerBuilder(1)), JSON.stringify(["*"]));
Test.assertEquals(JSON.stringify(towerBuilder(2)), JSON.stringify([" * ","***"]));
Test.assertEquals(JSON.stringify(towerBuilder(3)), JSON.stringify(["  *  "," *** ","*****"]));
```

&nbsp;

#### Debugger
Enabling the debugger for a solution requires changing the VS Code launch configuration with each new solution.  Here is an example where the **some-solution.js** located in the top folder of the project.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceRoot}\\some-solution.js"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Process",
            "address": "localhost",
            "port": 5858
        }
    ]
}
```