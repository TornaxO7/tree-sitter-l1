from unittest import TestCase

import tree_sitter
import tree_sitter_l1


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_l1.language())
        except Exception:
            self.fail("Error loading L1 grammar")
