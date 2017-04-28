/*
Description:
Build Tower

Build Tower by the following given argument:
number of floors (integer and always greater than 0).

Tower block is represented as *

    Python: return a list;
    JavaScript: returns an Array;
    C#: returns a string[];
    PHP: returns an array;
    C++: returns a vector<string>;
    Haskell: returns a [String];

Have fun!

for example, a tower of 3 floors looks like below

[
  '  *  ', 
  ' *** ', 
  '*****'
]

and a tower of 6 floors looks like below

[
  '     *     ', 
  '    ***    ', 
  '   *****   ', 
  '  *******  ', 
  ' ********* ', 
  '***********'
]
*/


function towerBuilder(nFloors) {
  if (nFloors <= 0) {
    return [];
  }
  
  var width = 2 * nFloors - 1;
  var floors = [];
  
  for (var floor=1; floor <= nFloors; floor++) {
    var blocks = 2 * floor - 1;
    var spaces = parseInt((width - blocks)/2);
    floors.push(' '.repeat(spaces) + '*'.repeat(blocks) + ' '.repeat(spaces)); 
  }
  
  return floors;
}


Test.assertEquals(JSON.stringify(towerBuilder(1)), JSON.stringify(["*"]));
Test.assertEquals(JSON.stringify(towerBuilder(2)), JSON.stringify([" * ","***"]));
Test.assertEquals(JSON.stringify(towerBuilder(3)), JSON.stringify(["  *  "," *** ","*****"]));