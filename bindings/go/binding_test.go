package tree_sitter_l1_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_l1 "github.com/tornaxo7/tree-sitter-l1/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_l1.Language())
	if language == nil {
		t.Errorf("Error loading L1 grammar")
	}
}
