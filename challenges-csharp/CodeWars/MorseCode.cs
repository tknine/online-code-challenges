using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace code_wars_csharp_test
{
    /*
         In this kata you have to write a simple Morse code decoder. While the Morse code is now mostly superceded by voice and digital data communication channels, it still has its use in some applications around the world.

        The Morse code encodes every character as a sequence of "dots" and "dashes". For example, the letter A is coded as ·−, letter Q is coded as −−·−, and digit 1 is coded as ·−−−. The Morse code is case-insensitive, traditionally capital letters are used. When the message is written in Morse code, a single space is used to separate the character codes and 3 spaces are used to separate words. For example, the message HEY JUDE in Morse code is ···· · −·−− ·−−− ··− −·· ·.

        NOTE: Extra spaces before or after the code have no meaning and should be ignored.

        In addition to letters, digits and some punctuation, there are some special service codes, the most notorious of those is the international distress signal SOS (that was first issued by Titanic), that is coded as ···−−−···. These special codes are treated as single special characters, and usually are transmitted as separate words.

        Your task is to implement a function decodeMorse(morseCode), that would take the morse code as input and return a decoded human-readable string.

        For example:

        MorseCodeDecoder.Decode('.... . -.--   .--- ..- -.. .')
        //should return "HEY JUDE"

        The Morse code table is preloaded for you as a dictionary, feel free to use it. In CoffeeScript, C++, JavaScript, PHP, Python, Ruby and TypeScript, the table can be accessed like this: MORSE_CODE['.--'], in Java it is MorseCode.get('.--'), in C# it is MorseCode.Get('.--'), in Haskell the codes are in a Map String String and can be accessed like this: morseCodes ! ".--", in Elixir it is morse_codes variable.

        All the test strings would contain valid Morse code, so you may skip checking for errors and exceptions. In C#, tests will fail if the solution code throws an exception, please keep that in mind. This is mostly because otherwise the engine would simply ignore the tests, resulting in a "valid" solution.

        Good luck!

        After you complete this kata, you may try yourself at Decode the Morse code, advanced.
     */
    public class MorseCode
    {
        //needs Morse letter map
        public static string Get(string morse)
        {
            return "";
        }
    }
    class MorseCodeDecoder
    {
        public static string Decode(string morseCode)
        {
            List<string> letters = new List<string>();

            foreach (var morseWord in Regex.Split(morseCode, @"\s{2,}"))
            {

                foreach (var morseLetter in Regex.Split(morseWord, @"\s{1,}"))
                {
                    letters.Add(MorseCode.Get(morseLetter));
                }

                letters.Add(" ");
            }

            return String.Join("", letters).Trim();
        }
    }


    [TestClass]
    public class MorseCodeDecoderTest
    {
        [TestMethod]
        public void MorseCodeDecoderTest_1()
        {
            try
            {
                string input = ".... . -.--   .--- ..- -.. .";
                string expected = "HEY JUDE";

                string actual = MorseCodeDecoder.Decode(input);

                Assert.AreEqual(expected, actual);
            }
            catch (Exception ex)
            {
                Assert.Fail("There seems to be an error somewhere in your code. Exception message reads as follows: " + ex.Message);
            }
        }
    }
}
