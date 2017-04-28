var Test = require('./frameworks/javascript/cw-2');

var Morse = {};

Morse.encode = function (message) {
    // ·–·–·– ·–·–·– ·–·–·–

    var binaryCodes = [];

    //turn all the chars into morse code
    for (var i = 0; i < message.length; i++) {
        if (message[i] === ' ') {
            binaryCodes.push(...'0000000'.split(''));
        } else {
            binaryCodes.push(...this.alpha[message[i]].split(''));
            if (i < message.length-1 && message[i+1] != ' ') {
                binaryCodes.push(...'000'.split(''));
            }
        }
    }

    //pad end with zeros to get total bits to a factor or 32
    for (var i=0; i < binaryCodes.length % 32; i++) {
        binaryCodes.push('0');
    }

    //use a Int32Array to hold the values converted from binary
    var encodedChars = new Int32Array(binaryCodes.length / 32);

    //loop through each 32 bit chuck of bits and convert to signed integer
    for (var i=0; i < binaryCodes.length / 32; i++) {
        var bin = binaryCodes.filter(function(digit, index) {
            return index >= i * 32 && index < (i + 1) * 32;
        }).join('');

        //use and eval statement to turn the binary code into a sign integer
        encodedChars[i] = eval('0b' + bin);
    }

    var values = [];

    encodedChars.forEach(function(num) {
        values.push(num);
    });

    return values;
};

Morse.decode = function (integerArray) {
    // ·–·–·– ·–·–·– ·–·–·–
    var binaryString = '';

    for (var i=0; i < integerArray.length; i++) {
        //if the number is greater than -1, then convert to a binary string and pad start with zeros
        if (integerArray[i] >= 0) {
            var tempBinary = (integerArray[i]).toString(2);
            //padStart is a polyfill function on String
            binaryString += tempBinary.padStart(32, '0');
        } 
        //the number is less than zero and we can use a trick that converts the 
        //number to a 2's complement binary representation with right shift of zero places.
        else {
            binaryString += (integerArray[i] >>> 0).toString(2);
        }
        
    }

    var text = '';

    //remove the trailing zeros
    binaryString = binaryString.substr(0, binaryString.lastIndexOf('1')+1);

    //break into words on the 000000 boundaries
    binaryString.split('0000000').forEach(function(word, index, words) {
        //break the word into chars on the 000 boundaries
        word.split('000').forEach(function(char, index, chars) {
            //add the reverse alpha of each morse char to the text.
            text += Morse.alphaReverse[char];
        });

        if (index < words.length - 1) {
            text += ' ';
        }
    });

    return text;
};

Morse.alpha = {
    'A': '10111',
    'B': '111010101',
    'C': '11101011101',
    'D': '1110101',
    'E': '1',
    'F': '101011101',
    'G': '111011101',
    'H': '1010101',
    'I': '101',
    'J': '1011101110111',
    'K': '111010111',
    'L': '101110101',
    'M': '1110111',
    'N': '11101',
    'O': '11101110111',
    'P': '10111011101',
    'Q': '1110111010111',
    'R': '1011101',
    'S': '10101',
    'T': '111',
    'U': '1010111',
    'V': '101010111',
    'W': '101110111',
    'X': '11101010111',
    'Y': '1110101110111',
    'Z': '11101110101',
    '0': '1110111011101110111',
    '1': '10111011101110111',
    '2': '101011101110111',
    '3': '1010101110111',
    '4': '10101010111',
    '5': '101010101',
    '6': '11101010101',
    '7': '1110111010101',
    '8': '111011101110101',
    '9': '11101110111011101',
    '.': '10111010111010111',
    ',': '1110111010101110111',
    '?': '101011101110101',
    "'": '1011101110111011101',
    '!': '1110101110101110111',
    '/': '1110101011101',
    '(': '111010111011101',
    ')': '1110101110111010111',
    '&': '10111010101',
    ':': '11101110111010101',
    ';': '11101011101011101',
    '=': '1110101010111',
    '+': '1011101011101',
    '-': '111010101010111',
    '_': '10101110111010111',
    '"': '101110101011101',
    '$': '10101011101010111',
    '@': '10111011101011101',
    ' ': '0' // Technically is 7 0-bits, but we assume that a space will always be between two other characters
};

//invert the alpha for reverse lookup of the binary code for a letter;
Morse.alphaReverse = (function() {
    var reverse = {};
    for (var p in Morse.alpha) {
        reverse[Morse.alpha[p]] = p;
    }

    return reverse;
}());

//String.padStart polyfill
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

var data = new Int32Array(1);
data[0] = eval('0b11111111111111111111111111111101');

Test.assertSimilar(Morse.encode('HELLO WORLD'), [-1440552402, -1547992901, -1896993141, -1461059584]);
Test.assertEquals(Morse.decode([-1440552402, -1547992901, -1896993141, -1461059584]), 'HELLO WORLD');
Test.assertSimilar(Morse.encode('EEEEEEEIE'), [-2004318070, 536870912]);
Test.assertSimilar(Morse.decode([-2004318070, 536870912]), 'EEEEEEEIE');
Test.assertEquals(Morse.decode([-298086688]), 'MMM', 'Numbers must be converted into 32-bit integers. Try using a bitwise operator to force the conversion.');
Test.assertEquals(Morse.decode([3996880608]), 'MMM', 'Numbers must be converted into 32-bit integers. Try using a bitwise operator to force the conversion.');