(function_declaration
  body: (statement_block) @method.body)

(method_definition
  body: (statement_block) @method.body)

(arrow_function
  body: (statement_block) @method.body)

(class_declaration
  body: (class_body) @method.body)

(expression_statement
  (call_expression
    (function
      body: (statement_block) @method.body)))

(interface_declaration
  body: (object_type) @method.body)

(type_alias_declaration
  value: (object_type) @method.body)

(jsx_element
  body: (jsx_element) @method.body) 