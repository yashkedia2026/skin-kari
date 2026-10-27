import Foundation
import PDFKit
import AppKit

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let names = [
("VITAMIN C ACID FACE SHEET MASK_SKINKARI_231026.pdf", "vitamin-c"),
("HYALURONIC ACID FACE SHEET MASK_SKINKARI_231026.pdf", "hyaluronic-acid"),
("COLLAGEN & PEPTIDE FACE SHEET MASK_SKINKARI_231026.pdf", "collagen-peptide"),
("DETAN FACE SHEET MASK_SKINKARI_231026.pdf", "detan")
]
func render(page: PDFPage, crop: CGRect, scale: CGFloat, slug: String, removeExterior: Bool) throws {
    let w = Int(crop.width * scale), h = Int(crop.height * scale)
    guard let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bitmapFormat: [], bytesPerRow: w * 4, bitsPerPixel: 32), let context = NSGraphicsContext(bitmapImageRep: rep) else {return}
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    context.cgContext.setFillColor(NSColor.white.cgColor)
    context.cgContext.fill(CGRect(x: 0, y: 0, width: w, height: h))
    context.cgContext.scaleBy(x: scale, y: scale)
    context.cgContext.translateBy(x: -crop.minX, y: -crop.minY)
    page.draw(with: .mediaBox, to: context.cgContext)
    NSGraphicsContext.restoreGraphicsState()
    if removeExterior, let bytes = rep.bitmapData {
      // Only clear the white exterior connected to the crop edges. Internal
      // white package artwork, original outline, and printed text are preserved.
      var visited = Array(repeating: false, count: w * h)
      var queue: [Int] = []
      for x in 0..<w {queue.append(x);queue.append((h-1)*w+x)}
      for y in 0..<h {queue.append(y*w);queue.append(y*w+w-1)}
      var cursor = 0
      while cursor < queue.count {
        let p = queue[cursor];cursor += 1
        if visited[p] {continue};visited[p] = true
        let o = p*4
        if bytes[o] < 247 || bytes[o+1] < 247 || bytes[o+2] < 247 {continue}
        bytes[o+3] = 0
        let x=p%w,y=p/w
        if x>0 {queue.append(p-1)};if x<w-1 {queue.append(p+1)}
        if y>0 {queue.append(p-w)};if y<h-1 {queue.append(p+w)}
      }
    }
    if let png = rep.representation(using: .png, properties: [:]) {
      try png.write(to: root.appendingPathComponent("public/images/products/\(slug).png"))
      print("\(slug).png: \(w)×\(h), \(png.count) bytes")
    }
}
for (name, slug) in names {
  guard let doc=PDFDocument(url: root.appendingPathComponent("reference/products/"+name)), let page=doc.page(at: 0) else {continue}
  let height = page.bounds(for: .mediaBox).height
  try render(page: page, crop: CGRect(x: 56, y: height-548, width: 366, height: 500), scale: 3, slug: slug, removeExterior: true)
  if slug == "vitamin-c" {
    try render(page: page, crop: CGRect(x: 460, y: height-164, width: 95, height: 36), scale: 10, slug: "brand-wordmark", removeExterior: true)
  }
}

if let doc=PDFDocument(url: root.appendingPathComponent("reference/products/BRIGHTENING MASK.pdf")), let page=doc.page(at: 0) {
  try render(page: page, crop: CGRect(x: 20, y: 74, width: 249, height: 282), scale: 3, slug: "brightening-reference", removeExterior: false)
}
