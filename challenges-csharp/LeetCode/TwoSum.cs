using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;
using System.Diagnostics;

namespace code_wars_csharp_test.LeetCode
{

    /*
        The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

        P   A   H   N
        A P L S I I G
        Y   I   R

        And then read line by line: "PAHNAPLSIIGYIR"

        Write the code that will take a string and make this conversion given a number of rows:

        string convert(string text, int numRows);

        convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".

        Subscribe to see which companies asked this question.


    */
    public class ZigZagConversionSolution
    {
        private enum ZigDirectionType {
            Down,
            Up
        }

        //This solution in O(s.Length) in time and O(s.Length) in space.

        public string Convert(string s, int numRows)
        {
            if (s.Length <= numRows || numRows <= 1)
            {
                return s;
            }

            var capcity = s.Length / (numRows - 1) + 1;
            var zigzag = new List<List<string>>(numRows);

            for (int i = 0; i < numRows; i++)
            {
                zigzag.Add(new List<string>(capcity));
            }

            var row = 0;
            var direction = ZigDirectionType.Down;

            foreach (var c in s)
            {
                if (direction == ZigDirectionType.Down)
                {
                    zigzag[row].Add(c.ToString());
                    row++;

                    if (row == numRows)
                    {
                        row = Math.Max(numRows - 2, 0);
                        direction = ZigDirectionType.Up;
                    }
                }
                else
                {
                    zigzag[row].Add(c.ToString());
                    row--;

                    if (row < 0)
                    {
                        row = 1;
                        direction = ZigDirectionType.Down;
                    }
                }
            }

            System.Text.StringBuilder sb = new System.Text.StringBuilder(s.Length);

            foreach (var list in zigzag)
            {
                sb.Append(String.Join("", list));
            }

            return sb.ToString();
        }

        //This is very fast compared to the initial version I created.
        public String Convert_NoList(String s, int numRows)
        {
            if (numRows <= 1)
                return s;

            char[] chars = s.ToCharArray();
            char[] result = new char[chars.Length];

            int r = 0;

            //the size of a cycle(period)
            int cycle = 2 * numRows - 2;

            //build the first row into result from chars using the cycle amount to skip
            for (int j = 0; j < chars.Length; j += cycle)
            {
                result[r++] = chars[j];
            }

            //build the middle row(s) into result
            for (int row = 1; row < numRows - 1; ++row)
            {
                //grab middle row columns from chars using the cycle amount to skip
                for (int charCol = row; charCol < chars.Length; charCol += cycle)
                {
                    result[r++] = chars[charCol];
                    int secondJ = (charCol - row) + cycle - row;
                    if (secondJ < chars.Length)
                        result[r++] = chars[secondJ];
                }
            }

            //build the last row into result from chars using the cycle amount to skip
            for (int j = numRows - 1; j < chars.Length; j += cycle)
            {
                result[r++] = chars[j];
            }

            return String.Join("", result);
        }
    }


    [TestFixture]
    public class ZigZagConversionTest
    {
        [Test]
        public void ZigZagConversionTest_00_Init()
        {


        }

        [Test]
        public void ZigZagConversionTest_BF()
        {
            ZigZagConversionSolution s = new ZigZagConversionSolution();

            Assert.AreEqual("PAHNAPLSIIGYIR", s.Convert("PAYPALISHIRING", 3));
            Assert.AreEqual("", s.Convert("", 1));
            Assert.AreEqual("AB", s.Convert("AB", 1));
            Assert.AreEqual("ACBD", s.Convert("ABCD", 2));
            Assert.AreEqual("ABCED", s.Convert("ABCDE", 4));

        }

        [Test]
        public void ZigZagConversionTest_BP()
        {
            ZigZagConversionSolution s = new ZigZagConversionSolution();

            Assert.AreEqual("PAHNAPLSIIGYIR", s.Convert_NoList("PAYPALISHIRING", 3));
            //Assert.AreEqual("", s.Convert_NoList("", 1));
            //Assert.AreEqual("AB", s.Convert_NoList("AB", 1));
            //Assert.AreEqual("ACBD", s.Convert_NoList("ABCD", 2));
            //Assert.AreEqual("ABCED", s.Convert_NoList("ABCDE", 4));

        }
    }
}
