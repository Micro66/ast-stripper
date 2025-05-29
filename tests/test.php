<?php
function hello() {
    echo "Hello, world!\n";
}

class Person {
    public $name;
    public function __construct($name) {
        $this->name = $name;
    }
    public function sayHello() {
        echo "Hello, {$this->name}!\n";
    }
} 