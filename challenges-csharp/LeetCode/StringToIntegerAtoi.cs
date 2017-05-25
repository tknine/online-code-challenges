using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace code_wars_csharp_test.LeetCode
{
    public class MyAtoiSolution
    {
        /*
        
        Implement atoi to convert a string to an integer.

        Hint: Carefully consider all possible input cases. If you want a challenge, please do not see below and ask yourself what are the possible input cases.

        Notes: It is intended for this problem to be specified vaguely (ie, no given input specs). You are responsible to gather all the input requirements up front.

        Update (2015-02-10):
        The signature of the C++ function had been updated. If you still see your function signature accepts a const char * argument, please click the reload button to reset your code definition.

        spoilers alert... click to show requirements for atoi.
        Requirements for atoi:

        The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

        The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

        If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

        If no valid conversion could be performed, a zero value is returned. If the correct value is out of the range of representable values, INT_MAX (2147483647) or INT_MIN (-2147483648) is returned.

        */

        public int MyAtoi_CatchError(string str)
        {
            int ret = 0;

            var match = Regex.Match(string.Join("", str.SkipWhile(c => c == ' ').ToList()), @"(^[-\+]?\d+)");

            if (match.Length > 0)
            {
                try
                {
                    ret = int.Parse(match.ToString());

                } catch(OverflowException ofe)
                {
                    if (match.ToString().First() == '-')
                    {
                        ret = int.MinValue;
                    }
                    else
                    {
                        ret = int.MaxValue;
                    }
                }
            }

            return ret;
        }

        public int MyAtoi(string str)
        {
            int ret = 0;

            var match = Regex.Match(string.Join("", str.SkipWhile(c => c == ' ').ToList()), @"(^[-\+]?\d+)");

            if (match.Length > 0)
            {
                if(!int.TryParse(match.ToString(), out ret))
                {
                    if (match.ToString().First() == '-')
                    {
                        ret = int.MinValue;
                    }
                    else
                    {
                        ret = int.MaxValue;
                    }
                }
            }

            return ret;
        }

        
    }


    [TestFixture]
    public class MyAtoiTest
    {
        [Test]
        public void MyAtoi_00_Init()
        {


        }

        [Test]
        public void MyAtoiTest_BF()
        {
            MyAtoiSolution s = new MyAtoiSolution();

            Assert.AreEqual(0, s.MyAtoi("      "));
            Assert.AreEqual(0, s.MyAtoi("      X"));
            Assert.AreEqual(0, s.MyAtoi("      +0"));
            Assert.AreEqual(0, s.MyAtoi("      -0"));
            Assert.AreEqual(0, s.MyAtoi("      -sdfsdfs"));
            Assert.AreEqual(0, s.MyAtoi("      +sdfsfd"));
            Assert.AreEqual(1, s.MyAtoi("      1"));
            Assert.AreEqual(1, s.MyAtoi("      1sssssss"));
            Assert.AreEqual(1, s.MyAtoi("      +1"));
            Assert.AreEqual(-1, s.MyAtoi("      -1"));
            Assert.AreEqual(int.MaxValue, s.MyAtoi("      9223372036854775809"));
            Assert.AreEqual(int.MaxValue, s.MyAtoi("      +9223372036854775809"));
            Assert.AreEqual(int.MinValue, s.MyAtoi("      -9223372036854775809"));



        }

        [Test]
        public void MyAtoiTest_BP()
        {
            ZigZagConversionSolution s = new ZigZagConversionSolution();

            //Assert.AreEqual("PAHNAPLSIIGYIR", s.Convert_NoList("PAYPALISHIRING", 3));
            //Assert.AreEqual("", s.Convert_NoList("", 1));
            //Assert.AreEqual("AB", s.Convert_NoList("AB", 1));
            //Assert.AreEqual("ACBD", s.Convert_NoList("ABCD", 2));
            //Assert.AreEqual("ABCED", s.Convert_NoList("ABCDE", 4));

        }
    }
}
