(function_declaration
  body: (statement_block) @method.body)

(method_definition
  body: (statement_block) @method.body)

(arrow_function
  body: (statement_block) @method.body)

(function_expression
  body: (statement_block) @method.body)

(variable_declarator
  value: (arrow_function
    body: (statement_block) @method.body))

(variable_declarator
  value: (function_expression
    body: (statement_block) @method.body))

(pair
  value: (function_expression
    body: (statement_block) @method.body))

(pair
  value: (arrow_function
    body: (statement_block) @method.body))
