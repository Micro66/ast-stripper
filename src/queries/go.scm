(
  (comment)* @comment
  .
  (function_declaration
    name: (identifier) @name.definition.function
    parameters: (_) @parameters
    result: (_)? @return_type
    body: (block) @method.body
  ) @definition.function
)

(
  (comment)* @comment
  .
  (method_declaration
    receiver: (_) @receiver
    name: (field_identifier) @name.definition.method
    parameters: (_) @parameters
    result: (_)? @return_type
    body: (block) @method.body
  ) @definition.method
)

(type_spec
  name: (type_identifier) @name.definition.type) @definition.type