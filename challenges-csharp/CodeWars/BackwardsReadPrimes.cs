using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using NUnit.Framework;
using System.Linq;

namespace code_wars_csharp_test
{


    /*

        Backwards Read Primes are primes that when read backwards in base 10 (from right to left) are a different prime. (This rules out primes which are palindromes.)

        Examples:
        13 17 31 37 71 73 are Backwards Read Primes

        13 is such because it's prime and read from right to left writes 31 which is prime too. Same for the others.
        Task

        Find all Backwards Read Primes between two positive given numbers (both inclusive), the second one being greater than the first one. The resulting array or the resulting string will be ordered following the natural order of the prime numbers.
        Example

        backwardsPrime(2, 100) => [13, 17, 31, 37, 71, 73, 79, 97] backwardsPrime(9900, 10000) => [9923, 9931, 9941, 9967]

        backwardsPrime(2, 100) => "13 17 31 37 71 73 79 97"
        backwardsPrime(9900, 10000) => "9923 9931 9941 9967"



    */

    public class BackWardsPrime
    {
        public static string backwardsPrime(long start, long end)
        {
            Console.WriteLine($"Assert.AreEqual(\"expected\", BackWardsPrime.backwardsPrime({start}, {end}));");

            List<long> primes = new List<long>();

            for (long i = start; i <= end; i++)
            {int x = 1;
                if (IsPrime(i))
                {
                    var num = int.Parse(String.Join("", Regex.Split(i.ToString(), string.Empty).Reverse()));

                    if (num != i && IsPrime(num))
                    {
                        primes.Add(i);
                    }
                }
            }

            return String.Join(" ", primes);
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



    public class BackWardsPrime_BestPractice
    {
        public static string backwardsPrime(long start, long end)
        {
            var primes = new List<long>();
            for (long n = start; n <= end; n++)
                if (n > 9 && IsPrime(n))
                    primes.Add(n);
            return string.Join(" ", primes.Select(x => new { Prime = x, Reversed = long.Parse(string.Concat(x.ToString().Reverse())) })
                .Where(x => x.Prime != x.Reversed && IsPrime(x.Reversed)).Select(x => x.Prime));
        }

        private static bool IsPrime(long n)
        {
            if (n <= 1) return false;
            else if (n <= 3) return true;
            else if (n % 2 == 0 || n % 3 == 0) return false;
            for (long i = 5; i * i <= n; i += 6)
                if (n % i == 0 || n % (i + 2) == 0)
                    return false;
            return true;
        }
    }




    [TestFixture]
    public class BackwardsPrimeTests
    {
        [Test]
        public void BackwardsPrimeTests_1()
        {
            Assert.AreEqual("13 17 31 37 71 73 79 97", BackWardsPrime.backwardsPrime(1, 100));
        }
        [Test]
        public void BackwardsPrimeTests_2()
        {
            Assert.AreEqual("9923 9931 9941 9967", BackWardsPrime.backwardsPrime(9900, 10000));
        }
        [Test]
        public void BackwardsPrimeTests_3()
        {
            Assert.AreEqual("13 17 31", BackWardsPrime.backwardsPrime(1, 31));
        }
        [Test]
        public void BackwardsPrimeTests_4()
        {
            Assert.AreEqual("107 113 149 157 167 179 199", BackWardsPrime.backwardsPrime(101, 199));
        }
        [Test]
        public void BackwardsPrimeTests_5()
        {
            Assert.AreEqual("1095047 1095209 1095319 1095403", BackWardsPrime.backwardsPrime(1095000, 1095403));
        }

    }


}
