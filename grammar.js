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
    source_file: $ => seq(
      "int", "main", "(", ")", "{",
      // `statements`
      repeat($.statement),
      "}"
    ),

    // `stmt`
    statement: $ => choice(
      seq($.declaration, ";"),
      seq($.simp, ";"),
      seq("return", $.expression, ";"),
    ),

    // `decl`
    declaration: $ => choice(
      seq($.type, $.identifier),
      seq($.type, $.identifier, "=", $.expression),
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
      $.unary_expression,
      $.binary_expression,
    ),
    unary_expression: $ => prec(3, seq($.unop, $.expression)),
    binary_expression: $ => choice(
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
    identifier: $ => /[A-Za-z_][A-Za-z0-9_]*/,
    decnum: $ => choice(
      "0",
      /[1-9][0-9]*/
    ),
    hexnum: $ => "0[xX][A-Fa-f0-9]+",
    type: $ => "int",

    comment: $ => choice(
      $.line_comment,
      $.block_comment,
    ),
    line_comment: $ => /\/\/[^\r\n]*/,
    block_comment: $ => seq("/*", repeat(/[^("*/")]/), "*/"),
  },
  extras: $ => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ]
});
