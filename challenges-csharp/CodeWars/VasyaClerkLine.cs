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
     
        The new "Avengers" movie has just been released! There are a lot of people at the cinema box office standing in a huge line. Each of them has a single 100, 50 or 25 dollars bill. A "Avengers" ticket costs 25 dollars.

        Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.

        Can Vasya sell a ticket to each person and give the change if he initially has no money and sells the tickets strictly in the order people follow in the line?

        Return YES, if Vasya can sell a ticket to each person and give the change. Otherwise return NO.
        Examples:

        // === C Sharp ===

        Line.Tickets(new int[] {25, 25, 50}) // => YES 
        Line.Tickets(new int[] {25, 100})  
                   // => NO. Vasya will not have enough money to give change to 100 dollars

    */
    public class Line
    {
        public static string Tickets(int[] peopleInLine)
        {
            Dictionary<int, int> cashRegister = new Dictionary<int, int>();
            cashRegister.Add(25, 0);
            cashRegister.Add(50, 0);
            cashRegister.Add(100, 0);


            for (int i = 0; i < peopleInLine.Length; i++)
            {
                var changeDue = peopleInLine[i] - 25;
                cashRegister[peopleInLine[i]] += peopleInLine[i];
                
                if (changeDue >= 50 && changeDue <= 75 && cashRegister[50] >= 50)
                {
                    changeDue -= 50;
                    cashRegister[50] -= 50;
                }

                if (changeDue > 0 && cashRegister[25] >= changeDue)
                {
                    cashRegister[25] -= changeDue;
                    changeDue = 0;
                }


                if (changeDue > 0)
                {
                    return "NO";
                }
            }

            return "YES"; 
        }

        public static string Tickets_BestPractice(int[] peopleInLine)
        {
            Dictionary<int, int> wallet = new Dictionary<int, int>() { { 25, 0 }, { 50, 0 }, { 100, 0 } };
            int i = 0;
            bool result = true;


            while (result && i < peopleInLine.Count())
            {
                var curPayment = peopleInLine[i++];

                int moneyBack = curPayment - 25;

                while (moneyBack > 0 && result)
                {
                    var tempResult = wallet.Where(el => el.Value > 0)
                        .OrderByDescending(el => el.Key)
                        .FirstOrDefault(el => moneyBack % el.Key == 0);

                    result = tempResult.Key != 0;
                    if (result)
                    {
                        wallet[tempResult.Key]--;
                        moneyBack -= tempResult.Key;
                    }
                }

                wallet[curPayment] = wallet[curPayment] + 1;
            }

            return result ? "YES" : "NO";
        }
    }

    [TestClass]
    public class VasyaClerkLineTests
    {
        [TestMethod]
        public void LineTests_1()
        {
            int[] peopleInLine = new int[] { 25, 25, 50, 50 };
            Assert.AreEqual("YES", Line.Tickets(peopleInLine));
        }

        [TestMethod]
        public void LineTests_2()
        {
            int[] peopleInLine = new int[] { 25, 100 };
            Assert.AreEqual("NO", Line.Tickets(peopleInLine));
        }

        [TestMethod]
        public void LineTests_3()
        {
            int[] peopleInLine = new int[] { 25, 25, 50, 50, 100};
            Assert.AreEqual("NO", Line.Tickets(peopleInLine));
        }

        [TestMethod]
        public void LineTests_4()
        {
            int[] peopleInLine = new int[] { 25, 25, 25, 25, 25, 100, 100 };
            Assert.AreEqual("NO", Line.Tickets(peopleInLine));
        }

        [TestMethod]
        public void LineTests_5()
        {
            int[] peopleInLine = new int[] { 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 };
            Assert.AreEqual("NO", Line.Tickets(peopleInLine));
        }


    }

}
