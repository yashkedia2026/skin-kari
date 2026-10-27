import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let names = [
("VITAMIN C ACID FACE SHEET MASK_SKINKARI_231026.pdf", "vitamin-c"),
("HYALURONIC ACID FACE SHEET MASK_SKINKARI_231026.pdf", "hyaluronic-acid"),
("COLLAGEN & PEPTIDE FACE SHEET MASK_SKINKARI_231026.pdf", "collagen-peptide"),
("DETAN FACE SHEET MASK_SKINKARI_231026.pdf", "detan"),
("BRIGHTENING MASK.pdf", "brightening-reference")
]
for (name, slug) in names {
  let src = root.appendingPathComponent(name)
  guard let document = PDFDocument(url: src) else { continue }
  let dest = root.appendingPathComponent("reference/products/" + name)
  if !FileManager.default.fileExists(atPath: dest.path) { try FileManager.default.copyItem(at: src, to: dest) }
  var text = "SOURCE: \(name)\nPAGES: \(document.pageCount)\n"
  for i in 0..<document.pageCount {
    guard let page = document.page(at: i) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    text += "\nPAGE \(i+1) SIZE \(bounds)\n\(page.string ?? "NO EXTRACTABLE TEXT")\n"
    let scale: CGFloat = 2.5
    let w = Int(bounds.width * scale), h = Int(bounds.height * scale)
    guard let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0), let context = NSGraphicsContext(bitmapImageRep: rep) else {continue}
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    context.cgContext.setFillColor(NSColor.white.cgColor)
    context.cgContext.fill(CGRect(x: 0, y: 0, width: w, height: h))
    context.cgContext.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context.cgContext)
    NSGraphicsContext.restoreGraphicsState()
    if let png = rep.representation(using: .png, properties: [:]) {
      try png.write(to: root.appendingPathComponent("reference/packaging-renders/\(slug)-page-\(i+1).png"))
    }
  }
  try text.write(to: root.appendingPathComponent("reference/packaging-renders/\(slug).txt"), atomically: true, encoding: .utf8)
  print(text)
}
