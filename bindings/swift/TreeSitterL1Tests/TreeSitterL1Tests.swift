import XCTest
import SwiftTreeSitter
import TreeSitterL1

final class TreeSitterL1Tests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_l1())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading L1 grammar")
    }
}
