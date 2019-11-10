using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace demoExercise.Controllers
{
    public class TwoNumbers
    {
        public int Num1 { get; set; }
        public int Num2 { get; set; }
    }

    [Route("api/[controller]")]
    public class DemoController : Controller
    {
        // GET: /api/demo
        [HttpGet]
        public List<string> SendAndRecieveStringsList(List<string> stringsList)
        {
            var results = new List<string>();
            int i = 1;
            foreach (var str in stringsList)
            {
                results.Add(str + " " + i);
                i++;
            }
            return results;






        }
        // GET /api/demo/split_sentence
        [HttpGet("split_sentence")]
        public string[] GetWordsFromSentence(string sentence)
        {
            var results = sentence.Split(' ');
            return results;
        }
        // POST api/demo/are_equal
        [HttpPost("are_equal")]
        public bool AreTwoNumbersEqual([FromBody]TwoNumbers twoNumbers)
        {
            if (twoNumbers.Num1 == twoNumbers.Num2)
            {
                return true;
            }
            return false;
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {

        }
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("random_numbers")]
        // GET api/demo/random_numbers
        public List<int> randNumbers()
        {
            var list = new List<int>();
            var rand = new Random();
            int count = 0;
            while (count < 5)
            {
                int num = rand.Next(1, 10);
                if (!list.Contains(num))
                {
                    list.Add(num);
                    count++;
                }
            }
            return list;
        }

        // POST api/demo/ConvertToStrings
        [HttpPost("ConvertToStrings")]
        public Dictionary<string, string> ConvertToStrings(Dictionary<string, int> dictionaryItems)
        {
            var results = new Dictionary<string, string>();

            foreach (var item in dictionaryItems)
            {
                results.Add(item.Key, item.Value.ToString());
            }

            return results;
        }

        // // // // // //
        // ex9
        [HttpPost("SwitchLetterToNext")]
        public string SwitchLetterToNext(string sentence)
        {
            // empty string handaling
            if (sentence == null)
            {
                return "please send a sentence";
            }

            string str = sentence;
            byte[] bytes = Encoding.ASCII.GetBytes(str.ToCharArray());

            for (int i = 0; i <= bytes.GetUpperBound(0); i++)
            {
                bytes[i]++;
            }

            return Encoding.ASCII.GetString(bytes);
        }

        // ex4
        [HttpPost("EvenIndexsOfString")]
        public string EvenIndexsOfString(string sentence)
        {
            // empty string handaling
            if (sentence == null)
            {
                return "please send a sentence";
            }

            string evensOnly = "";
            string[] words = sentence.Split(' ');

            for (int i = 0; i < words.Length; ++i)
            {
                if (i % 2 == 0)
                {
                    evensOnly += words[i] + " ";
                }
            }
            return evensOnly;
        }

        // ex2
        [HttpPost("ReverseString")]
        public string ReverseString(string sentence)
        {
            // empty string handaling
            if (sentence == null)
            {
                return "please send a sentence";
            }

            string reversed = "";
            string[] words = sentence.Split(' ');

            for (int i = words.Length; i > 0; --i)
            {
                reversed += words[i - 1] + " ";
            }

            return reversed;
        }

        // ex5
        [HttpPost("IsEqualNoCaseSensitive")]
        public bool IsEqualNoCaseSensitive(string wordOne, string wordTwo)
        {
            // empty strings handaling
            if (wordOne == null || wordTwo == null)
            {
                return false;
            }

            bool equals = false;
            string oneLowCase = wordOne.ToLower();
            string twoLowCase = wordTwo.ToLower();

            if (oneLowCase == twoLowCase)
            {
                equals = true;
            }

            return equals;
        }

        // ex3
        [HttpPost("HowManyWords")]
        public int HowManyWords(string sentence)
        {
            // empty string handaling
            if (sentence == null)
            {
                return 0;
            }

            string[] words = sentence.Split(' ');

            return words.Length;
        }
    }
}
