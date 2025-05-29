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
    (function_expression
      body: (statement_block) @method.body))) 