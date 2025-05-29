using System;
using System.Collections.Generic;

namespace TestNamespace
{
    public class TestClass
    {
        private int _value;

        public TestClass(int value)
        {
            _value = value;
        }

        public void Method1()
        {
            Console.WriteLine(_value);
        }

        public async Task<string> AsyncMethod()
        {
            await Task.Delay(100);
            return "async";
        }

        public IEnumerable<int> IteratorMethod()
        {
            yield return 1;
            yield return 2;
        }

        public T GenericMethod<T>(T param)
        {
            return param;
        }
    }

    public static class StaticClass
    {
        public static void StaticMethod()
        {
            Console.WriteLine("static");
        }
    }

    public interface ITestInterface
    {
        void InterfaceMethod();
    }

    public class InterfaceImpl : ITestInterface
    {
        public void InterfaceMethod()
        {
            Console.WriteLine("interface");
        }
    }
} 