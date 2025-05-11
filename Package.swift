// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterL1",
    products: [
        .library(name: "TreeSitterL1", targets: ["TreeSitterL1"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterL1",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterL1Tests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterL1",
            ],
            path: "bindings/swift/TreeSitterL1Tests"
        )
    ],
    cLanguageStandard: .c11
)
