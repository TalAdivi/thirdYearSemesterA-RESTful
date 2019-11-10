using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace demoExercise.Controllers
{

    [Route("api/[controller]")]
    public class DemoController : Controller
    {
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
