using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace code_wars_csharp_test.LeetCode
{

    /*
        Given an array of integers, return indices of the two numbers such that they add up to a specific target.

        You may assume that each input would have exactly one solution, and you may not use the same element twice.

        Example:

        Given nums = [2, 7, 11, 15], target = 9,

        Because nums[0] + nums[1] = 2 + 7 = 9,
        return [0, 1].

    */
    public class TwoSumSolution
    {

        //brute force finds the first match
        public int[] TwoSum(int[] nums, int target)
        {
            for (int i = 0; i < nums.Length; i++)
            {
                for (int j = 0; j < nums.Length; j++)
                {
                    if (i != j)
                    {
                        if (nums[i] + nums[j] == target)
                        {
                            return new int[] { i, j };
                        }
                    }
                }
            }

            return null;
        }

        //finds the first match using a dictionary of lists that handles multiples of the same value in the input list.
        public int[] TwoSum_BP(int[] nums, int target)
        {
            Dictionary<int, List<int>> map = new Dictionary<int, List<int>>();

            for (int i = 0; i < nums.Length; i++)
            {
                if (!map.ContainsKey(nums[i]))
                {
                    map.Add(nums[i], new List<int> { i });
                }
                else
                {
                    map[nums[i]].Add(i);
                }
                
            }
            for (int i = 0; i < nums.Length; i++)
            {
                int complement = target - nums[i];

                if (map.ContainsKey(complement))
                {
                    if (map[complement].Count == 1)
                    {
                        if (map[complement][0] != i)
                        {
                            return new int[] { map[complement][0], i };
                        }
                    }
                    else
                    {
                        return new int[] { map[complement].FirstOrDefault(x => x != i), i };
                    }      
                }
            }
            return null;
        }

        //only works if there is a single solution for data.
        public int[] TwoSum_BP2(int[] nums, int target)
        {
            var dict = new Dictionary<int, int>();

            for (int i = 0; i < nums.Count(); ++i)
            {
                if (dict.ContainsKey(nums[i]))
                {
                    return new int[] { i, dict[nums[i]] };
                }

                dict[target - nums[i]] = i;
            }
            return null;
        }
    }


    [TestFixture]
    public class TwoSumTest
    {
        [Test]
        public void TwoSumTest_00_Init()
        {
            int[] nums = Enumerable.Range(1, 100).Select(x => x).ToArray();
            TwoSumSolution s = new TwoSumSolution();

            CollectionAssert.AreEquivalent(new int[] { 0, 1 }, s.TwoSum(nums, 3));

        }

        [Test]
        public void TwoSumTest_BF()
        {
            int[] nums = Enumerable.Range(1, 100).Select(x => x).ToArray();
            TwoSumSolution s = new TwoSumSolution();

            CollectionAssert.AreEquivalent(new int[] { 0, 1 }, s.TwoSum(nums, 3));
            CollectionAssert.AreEquivalent(new int[] { 98, 99 }, s.TwoSum(nums, 199));
            CollectionAssert.AreEquivalent(new int[] { 0, 49 }, s.TwoSum(nums, 51));
            CollectionAssert.AreEquivalent(new int[] { 50, 99 }, s.TwoSum(nums, 151));

        }

        [Test]
        public void TwoSumTest_BP()
        {
            int[] nums = Enumerable.Range(1, 100).Select(x => x).ToArray();
            TwoSumSolution s = new TwoSumSolution();

            CollectionAssert.AreEquivalent(new int[] { 0, 1 }, s.TwoSum_BP(nums, 3));
            CollectionAssert.AreEquivalent(new int[] { 98, 99 }, s.TwoSum_BP(nums, 199));
            CollectionAssert.AreEquivalent(new int[] { 0, 49 }, s.TwoSum_BP(nums, 51));
            CollectionAssert.AreEquivalent(new int[] { 99, 50 }, s.TwoSum_BP(nums, 151));
            CollectionAssert.AreEquivalent(new int[] { 0, 1 }, s.TwoSum_BP(new int[] { 3, 3 }, 6));
        }
    }
}
