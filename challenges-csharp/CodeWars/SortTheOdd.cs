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
     * 
        You have an array of numbers.
        Your task is to sort ascending odd numbers but even numbers must be on their places.

        Zero isn't an odd number and you don't need to move it. If you have an empty array, you need to return it.

        Example

        sortArray([5, 3, 2, 8, 1, 4]) == [1, 3, 2, 8, 5, 4]

    */

    public class Kata
    {
        public static int[] SortArray(int[] array)
        {
            var oddsSorted = array.Where(x => x % 2 == 1).OrderBy(x => x).ToList();
            var evens = array.Select((value, index) => new { Value = value, Index = index }).Where(x => x.Value % 2 == 0).ToList();

            foreach (var even in evens)
            {
                oddsSorted.Insert(even.Index, even.Value);
            }

            return oddsSorted.ToArray();
        }

        public static int[] SortArray_BestPractice(int[] array)
        {
            Queue<int> odds = new Queue<int>(array.Where(e => e % 2 == 1).OrderBy(e => e));

            return array.Select(e => e % 2 == 1 ? odds.Dequeue() : e).ToArray();
        }
    }


    [TestClass]
    public class SortTheOddTest
    {
 


        [TestMethod]
        public void SortTheOddTest_1()
        {
            CollectionAssert.AreEqual(new int[] { 1, 3, 2, 8, 5, 4 }, Kata.SortArray(new int[] { 5, 3, 2, 8, 1, 4 }));
            CollectionAssert.AreEqual(new int[] { 1, 3, 5, 8, 0 }, Kata.SortArray(new int[] { 5, 3, 1, 8, 0 }));
            CollectionAssert.AreEqual(new int[] { }, Kata.SortArray(new int[] { }));
        }
    }
}
