using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Text;
using NUnit.Framework;
using System.Linq;

namespace code_wars_csharp_test.CodeWars
{
    /*
    
    If you reverse the word emirp you will have the word prime. That idea is related with the purpose of this kata.
    We should select all the primes that when reversed are a different prime. The palindromic primes should be discarded. 
    For example: 13, 17 are prime numbers and the reversed respectively are 31, 71 which are also primes, so 13 and 17 
    are emirps But see the cases, 757, 787, 797, these are palindromic primes, with the special property that primes 
    coincides with the reversed ones, so they do not enter in the sequence.

    You should create a function find_emirp(), that receives one argument n, as an upper limit and the output should 
    be an array with this structure:

    [number of emirps bellow n, largest emirp smaller than n, sum of all the emirps of the sequence bellow n]

    Let's some examples:

    find_emirp(10) -------> [0, 0, 0] # No emirps for this value of n

    find_emirp(50) -------> [4, 37, 98] # there are 4 emirps [13, 17, 31, 37]), the max. value is 37, 
        and the sum = 13 + 17 + 31 + 37 = 98

    find_emirp(100) ------> [8, 97, 418] # there are 8 emirps [13, 17, 31, 37, 71, 73, 79, 97], 97 is the highest 
    emirp for this range and the sum of all these 8 emirp primes is 418.

    Happy coding!!

    (Advise: Do not use a primality test. It will make your code very slow. Create a set of primes using a prime generator 
    or a range of primes producer. Remember that search in a set is faster that in a sorted list or array) (The emirps 
    sequence is registered in OEIS as A006567)


    */

    public class Emirps
    {
        public static long[] FindEmirp(long n)
        {
            List<int> primes = new List<int>();

            for (int i = 1; i < n; i++)
            {
                if (IsPrime(i))
                {
                    var reversed = int.Parse(String.Join("", Regex.Split(i.ToString(), string.Empty).Reverse()));

                    if (i != reversed && IsPrime(reversed))
                    {
                        primes.Add(i);
                    }
                }
            }

            primes = primes.OrderBy(x => x).ToList();

            return new long[] { primes.Count, primes.Last(),  primes.Sum() };
        }

        public static bool IsPrime(long number)
        {
            if ((number % 2) == 0)
            {
                return number == 2;
            }
            long sqrt = (long)Math.Sqrt(number);
            for (int t = 3; t <= sqrt; t = t + 2)
            {
                if (number % t == 0)
                {
                    return false;
                }
            }
            return number != 1;
        }
    }

    [TestFixture]
    public static class EmirpsTests
    {
        private static string Array2String(long[] list)
        {
            return "[" + string.Join(", ", list) + "]";
        }
        private static void testing(string actual, string expected)
        {
            Assert.AreEqual(expected, actual);
        }
        public static void tests(long[] list1, long[][] results)
        {
            for (int i = 0; i < list1.Length; i++)
                testing(EmirpsTests.Array2String(Emirps.FindEmirp(list1[i])), EmirpsTests.Array2String(results[i]));
            return;
        }
        [Test]
        public static void Emirps_Test1()
        {
            Console.WriteLine("Basic Tests FindEmirp");
            long[] l = new long[] { 50, 100, 200, 500, 750, 1000 };
            long[][] r = new long[][] { new long[] {4, 37, 98}, new long[] {8, 97, 418}, new long[] {15, 199, 1489}, new long[] {20, 389, 3232},
            new long[] {25, 743, 6857}, new long[] {36, 991, 16788} };
            tests(l, r);
        }
    }
 }
