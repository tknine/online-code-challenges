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
        You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

        You may assume the two numbers do not contain any leading zero, except the number 0 itself.

        Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
        Output: 7 -> 0 -> 8
    */
   
    public class ListNode {
        public int val;
        public ListNode next;
        public ListNode(int x) { val = x; }
    }
 
    public class AddTwoNumbersSolution
    {
        public ListNode AddTwoNumbers(ListNode l1, ListNode l2)
        {
            ListNode head = null;
            ListNode tail = null;

            var carry = 0;

            while (l1 != null || l2 != null || carry > 0)
            {

                var sum = carry + (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0);
                carry = 0;

                if (sum >= 10)
                {
                    sum -= 10;
                    carry = 1;
                }

                if (head == null)
                {
                    head = new ListNode(sum);
                    tail = head;
                }
                else
                {
                    tail.next = new ListNode(sum);
                    tail = tail.next;
                }

                l1 = l1 != null ? l1.next : null;
                l2 = l2 != null ? l2.next : null;

            }

            return head;
        }
    }


    [TestFixture]
    public class AddTwoNumbersTest
    {

        public string ListNodesToString(ListNode n)
        {
            List<int> nums = new List<int>();
            var tail = n;
            while (tail != null)
            {
                nums.Add(tail.val);
                tail = tail.next;

            }

            return String.Join(",", nums);
        }

        [Test]
        public void AddTwoNumbersTest_00_Init()
        {
        }

        [Test]
        public void AddTwoNumbersTest_BF()
        {
            ListNode a = new ListNode(2);
            a.next = new ListNode(4);
            a.next.next = new ListNode(3);
            ListNode b = new ListNode(5);
            b.next = new ListNode(6);
            b.next.next = new ListNode(4);

            AddTwoNumbersSolution s = new AddTwoNumbersSolution();


            Assert.AreEqual("7,0,8", ListNodesToString(s.AddTwoNumbers(a, b)));

        }

        [Test]
        public void AddTwoNumbersTest_BP()
        {

        }
    }
}
