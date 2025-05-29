;; java.scm — Tree-sitter query for Java highlighting/captures

;; 包和导入
(package_declaration
  (scoped_identifier) @namespace)

(import_declaration
  (scoped_identifier) @namespace)

;; 类型声明
(class_declaration
  name: (identifier) @type)

(interface_declaration
  name: (identifier) @type)

(enum_declaration
  name: (identifier) @type)

(annotation_type_declaration
  name: (identifier) @type)

;; 字段声明
(field_declaration
  declarator: (variable_declarator
    name: (identifier) @variable.member))

;; 方法、构造函数
(method_declaration
  name: (identifier) @function.method
  parameters: (formal_parameters) @parameters
  body: (block) @method.body)

(constructor_declaration
  name: (identifier) @type)

;; 注解
(annotation
  name: (identifier) @attribute)

;; 注释
(line_comment) @comment
(block_comment) @comment

;; 操作符和界定符
"(" @punctuation.paren
")" @punctuation.paren
"{" @punctuation.brace
"}" @punctuation.brace
"[" @punctuation.bracket
"]" @punctuation.bracket
";" @punctuation.terminator
"," @punctuation.delimiter

;; 泛型、数组、类型参数等
; (type_parameters
;   (type_parameter
;     name: (identifier) @type.parameter))

(array_type
  element: _ @type)

;; 方法调用
(method_invocation
  name: (identifier) @function.call)

;; 字段访问
(field_access
  field: (identifier) @property)

;; 如果需要更多自定义捕获，直接参考 Tree-sitter Java grammar 定义，添加相应的节点模式。