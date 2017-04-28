using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace code_wars_csharp_test
{


    public class ReverseOrRotate
    {
        public static string RevRot(string str, int sz)
        {
            if (sz <= 0 || sz > str.Length)
            {
                return "";
            }

            List<string> chuncks = new List<string>();

            for (int i = 0; i < str.Length; i += sz)
            {
                chuncks.Add(str.Substring(i, Math.Min(sz, str.Length - i)));
            }

            for (int i = 0; i < chuncks.Count; i++)
            {
                if (chuncks[i].Length < sz)
                {
                    chuncks[i] = "";
                }
                else
                {
                    var digits = chuncks[i].ToCharArray().Select(c => c.ToString()).ToArray();

                    if (digits.Select(x => (int)Math.Pow(int.Parse(x), 3)).Sum() % 2 == 0)
                    {
                        chuncks[i] = string.Join("", digits.Reverse());
                    }
                    else
                    {
                        chuncks[i] = chuncks[i].Substring(1, chuncks[i].Length - 1) + chuncks[i].Substring(0, 1);
                    }
                }
            }

            return string.Join("", chuncks);
        }

        public static string RevRot_Clever(string strng, int sz)
        {
            if (String.IsNullOrEmpty(strng) || sz <= 0 || sz > strng.Length)
                return String.Empty;

            return
                new String(
                    Enumerable.Range(0, strng.Length / sz)
                        .Select(i => strng.Substring(i * sz, sz))
                        .Select(
                            chunk =>
                                chunk.Sum(digit => (int)Math.Pow(int.Parse(digit.ToString()), 3)) % 2 == 0
                                    ? chunk.Reverse()
                                    : chunk.Skip(1).Concat(chunk.Take(1)))
                        .SelectMany(x => x)
                        .ToArray());
        }

        public static void Main()
        {
            string input = "952528382515607276295140463820085069206641457149673178176244123156661";
            int sz = 15;

            Console.WriteLine("Input: " + input);
            string output = RevRot(input, sz);

            Console.WriteLine("Output: " + output);
            Console.ReadKey();
        }
    }


    [TestClass]
    public class ReverseOrRotateTest
    {


        private void testing(string actual, string expected)
        {
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void ReverseOrRotateTest_1()
        {
            Console.WriteLine("Testing RevRot");
            testing(ReverseOrRotate.RevRot("1234", 0), "");
            testing(ReverseOrRotate.RevRot("", 0), "");
            testing(ReverseOrRotate.RevRot("1234", 5), "");
            String s = "733049910872815764";
            testing(ReverseOrRotate.RevRot(s, 5), "330479108928157");


            //952528382515607276295140463820085069206641457149673178176244123156661, 15

            // Testing RevRot 1234, 0 , 0 
            //    1234, 5 
            //    733049910872815764, 5 
            //    73304991087281576455176044327690580265896, 8
        }
    }
}
