class TestClass
  def initialize(value)
    @value = value
  end

  def method
    puts @value
  end

  def self.class_method
    puts "class method"
  end

  def method_with_block
    yield if block_given?
  end
end

module TestModule
  def module_method
    puts "module method"
  end
end

class ModuleClass
  include TestModule
end

def top_level_method
  puts "top level"
end

TestClass.new(42).method
TestClass.class_method
top_level_method

# Lambda
lambda_method = ->(x) { x * 2 }

# Proc
proc_method = Proc.new { |x| x * 2 } 