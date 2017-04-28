using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace code_wars_csharp_test
{

    /*

        At a job interview, you are challenged to write an algorithm to check if a given string, s, can be formed from two other strings, part1 and part2.

        The restriction is that the characters in part1 and part2 are in the same order as in s.

        The interviewer gives you the following example and tells you to figure out the rest from the given test cases.

        For example:

        'codewars' is a merge from 'cdw' and 'oears':

            s:  c o d e w a r s   = codewars
        part1:  c   d   w         = cdw
        part2:    o   e   a r s   = oears

    */

    public class StringMerger
    {
        public static bool isMerge(string s, string p1, string p2)
        {
            Console.WriteLine($"Assert.IsTrue(StringMerger.isMerge(\"{s}\", \"{p1}\", \"{p2}\"), \"message\");");

            if (s == string.Empty && p1.Length == 0 && p2.Length == 0)
            {
                return true;
            }

            if (s == string.Empty || s.Length != p1.Length + p2.Length)
            {
                return false;
            }

            var result = Regex.Split(s, String.Empty).Skip(1).Take(s.Length).ToList();


            Func<string, bool> 
                findAll = (string part) =>
                {
                    var pointer = 0;

                    for (int p = 0; p < part.Length; p++)
                    {
                        var c = part[p].ToString();
                        var found = false;

                        for (int r = pointer; r < result.Count; r++)
                        {
                            if (result[r] == c)
                            {
                                pointer = r + 1;
                                found = true;
                                break;
                            }
                        }

                        if (!found)
                        {
                            return false;
                        }
                    }

                    return true;
                };


            Func<string, bool>
                removeChar = (string part) =>
                {
                    var pointer = 0;

                    for (int p = 0; p < part.Length; p++)
                    {
                        var c = part[p].ToString();
                        var cIndex = result.IndexOf(c);

                        if (cIndex >= 0) 
                        {
                            result.RemoveAt(cIndex);
                        }
                        else
                        {
                            return false;
                        }
                    }

                    return true;
                };

            var p1Find = findAll(p1);
            var p2Find = findAll(p2);
            var removeChars = removeChar(p1 + p2);

            return p1Find && p2Find && removeChars && result.Count == 0;
        }
    }


    /*
     * Best Practice using recursion
     * 
    */

    public class StringMerger_BestPractice
    {
        public static bool isMerge(string s, string part1, string part2)
        {
            return IsMatch(s, part1, part2);
        }

        public static bool IsMatch(string target, string part1, string part2)
        {
            if (target.Length != part1.Length + part2.Length)
            {
                return false;
            }
            if (string.IsNullOrEmpty(target))
            {
                return true;
            }

            if (part1.Length > 0 && target[0] == part1[0])
            {
                if (IsMatch(target.Substring(1), part1.Substring(1), part2.Substring(0)))
                {
                    return true;
                }
            }
            if (part2.Length > 0 && target[0] == part2[0])
            {
                if (IsMatch(target.Substring(1), part1.Substring(0), part2.Substring(1)))
                {
                    return true;
                }
            }

            return false;
        }
    }




    [TestFixture]
    public class StringMergerTests
    {
        [Test]
        public void HappyPathSample_01()
        {
            Assert.IsTrue(StringMerger.isMerge("codewars", "code", "wars"), "codewars can be created from code and wars");
        }

        [Test]
        public void HappyPathSample_02()
        {
            Assert.IsTrue(StringMerger.isMerge("codewars", "cdwr", "oeas"), "codewars can be created from cdwr and oeas");
        }

        [Test]
        public void SadPathSample_01()
        {
            Assert.IsFalse(StringMerger.isMerge("codewars", "cod", "wars"), "Codewars are not codwars");
        }



        [Test]
        public void HappyPath_01()
        {
            /*
            
            Bananas from Bahamas
                         Bah  as
            Bananas from    am

            */

            Assert.IsTrue(StringMerger.isMerge("Bananas from Bahamas", "Bahas", "Bananas from am"), "message");
        }

        [Test]
        public void HappyPath_01_2()
        {

            /*

            Bananas from Bahamas
            Bananas from    am
                         Bah  as
            xx

            */


            Assert.IsTrue(StringMerger.isMerge("Bananas from Bahamas", "Bananas from am", "Bahas"), "message");
        }

        [Test]
        public void HappyPath_02()
        {
            Assert.IsTrue(StringMerger.isMerge("codewars", "codewars", ""), "message");
        }

        [Test]
        public void HappyPath_03()
        {
            Assert.IsTrue(StringMerger.isMerge("codewars", "code", "wars"), "message");
        }

        [Test]
        public void HappyPath_04()
        {
            Assert.IsTrue(StringMerger.isMerge("codewars", "cdwr", "oeas"), "message");
        }

        [Test]
        public void HappyPath_05()
        {
            Assert.IsTrue(StringMerger.isMerge("codewars", "code", "wars"), "message");
        }

        [Test]
        public void HappyPath_06()
        {
            Assert.IsTrue(StringMerger.isMerge("Can we merge it? Yes, we can!", "n ee tYw n!", "Cawe mrgi? es, eca"), "message");
        }

        [Test]
        public void HappyPath_07()
        {
            Assert.IsTrue(StringMerger.isMerge("Can we ", "n e", "Caw "), "message");
        }

        [Test]
        public void HappyPath_08()
        {
            Assert.IsTrue(StringMerger.isMerge("Bananas from Bahamas", "asfo Bams", "Banan rmaha"), "message");
        }

        [Test]
        public void HappyPath_09()
        {
            Assert.IsTrue(StringMerger.isMerge("G%CEJ<#^?mk/9+c]@Vj1IDHb3", "GJ<?/+c@Vj1IDH", "%CE#^mk9]b3"), "message");
        }


        [Test]
        public void SadPath_01()
        {
            Assert.IsTrue(StringMerger.isMerge("codewars", "codewars", ""), "empty result");
            Assert.IsTrue(StringMerger.isMerge("codewars", "", "codewars"), "empty result");
            Assert.IsFalse(StringMerger.isMerge("", "code", "wars"), "empty result");
            Assert.IsTrue(StringMerger.isMerge("", "", ""), "empty result");
        }

        [Test]
        public void SadPath_02()
        {
            Assert.IsFalse(StringMerger.isMerge("codewars", "code", "warss"), "codewars is not codewarss");
        }

        [Test]
        public void SadPath_03()
        {
            Assert.IsFalse(StringMerger.isMerge("codewars", "code", "war"), "codewars is not codewar");
        }

        [Test]
        public void SadPath_04()
        {
            Assert.IsFalse(StringMerger.isMerge("Bananas from Bahamas", ":%n [roHpah", "t8as amah"), "message");
        }

        [Test]
        public void SadPath_05()
        {
            Assert.IsFalse(StringMerger.isMerge("codewars", "cod", "wars"), "Codewars are not codwars");
        }

        [Test]
        public void SadPath_06()
        {
            Assert.IsFalse(StringMerger.isMerge("codewars", "code", "wasr"), "codewars can't be created from code and wasr");
        }

    
    }
}
