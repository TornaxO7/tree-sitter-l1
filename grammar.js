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
    source_file: $ => "hello"
  }
});
