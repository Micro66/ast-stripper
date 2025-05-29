class TestClass(val value: Int) {
    fun method() {
        println(value)
    }

    suspend fun suspendMethod(): String {
        return "suspend"
    }

    fun <T> genericMethod(param: T): T {
        return param
    }
}

interface TestInterface {
    fun interfaceMethod()
}

class InterfaceImpl : TestInterface {
    override fun interfaceMethod() {
        println("interface")
    }
}

object TestObject {
    fun objectMethod() {
        println("object")
    }
}

fun topLevelFunction() {
    println("top level")
}

fun <T> topLevelGenericFunction(param: T): T {
    return param
}

fun simpleFunction() {
    println("Hello")
}

class TestClass {
    fun classMethod() {
        println("Class method")
    }
}

interface TestInterface {
    fun interfaceMethod() {
        println("Interface method")
    }
}

object TestObject {
    fun objectMethod() {
        println("Object method")
    }
} 