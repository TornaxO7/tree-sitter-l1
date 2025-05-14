/**
 * @file Tree sitter parser for the L1 language for the compiler lab of KIT.
 * @author TornaxO7 <tornax@pm.me>
 * @license GPLv3
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "l1",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => $.program,

    program: $ => seq(
      "int", "main", "(", ")", "{",
      optional($.statements),
      "}"
    ),

    statements: $ => repeat1($.statement),

    // `stmt`
    statement: $ => choice(
      seq($.decl, ";"),
      seq($.simp, ";"),
      seq("return", $.expression, ";"),
    ),

    decl: $ => choice(
      seq($.type, $.identifier, optional(seq("=", $.expression))),
    ),

    simp: $ => seq($.lvalue, $.asnop, $.expression),

    lvalue: $ => choice(
      $.identifier,
      seq("(", $.lvalue , ")"),
    ),

    // `exp`
    expression: $ => choice(
      seq("(", $.expression, ")"),
      $.intconst,
      $.identifier,
      $._unary_expression,
      $._binary_expression,
    ),
    _unary_expression: $ => prec(3, seq($.unop, $.expression)),
    _binary_expression: $ => choice(
      prec.left(1, seq($.expression, "+", $.expression)),
      prec.left(1, seq($.expression, "-", $.expression)),

      prec.left(2, seq($.expression, "*", $.expression)),
      prec.left(2, seq($.expression, "/", $.expression)),
      prec.left(2, seq($.expression, "%", $.expression)),
    ),

    intconst: $ => choice($.decnum, $.hexnum),

    unop: $ => "-",
    asnop: $ => choice("=", "+=", "-=", "*=", "/=", "%="),

    // `iden`
    identifier: $ => seq(
      /[A-Za-z_]/,
      repeat(/[A-Za-z0-9_]/)
    ),
    decnum: $ => choice(
      "0",
      seq(
        /[1-9]/,
        repeat(/[0-9]/)
      )
    ),
    hexnum: $ => seq("0", /[xX]/, repeat1(/[A-Fa-f0-9]/)),
    type: $ => "int",

    comment: $ => choice(
      $._line_comment,
      $._block_comment,
    ),

    _line_comment: $ => seq("//", repeat(choice(/.|\n|\r/))),
    _block_comment: $ => seq("/*", $._block_comment_content, "*/"),
    _block_comment_content: $ => repeat1(choice(/.|\n|\r/)),
  }
});
