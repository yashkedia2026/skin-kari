import Foundation
import PDFKit
import AppKit

// Original brand illustrations, isolated from the four approved packaging PDFs.
// Coordinates are PDF points measured from the top-left corner of page one.
// The clipping paths omit the wordmark, package labels and ingredient claims.
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let output = root.appendingPathComponent("public/images/editorial", isDirectory: true)
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)

struct Artwork {
    let name: String
    let source: String
    let crop: CGRect
    let polygon: [CGPoint]
    var ellipse: CGRect? = nil
    var ellipseRotation: CGFloat = 0
    var scale: CGFloat = 6
}

let vitamin = "VITAMIN C ACID FACE SHEET MASK_SKINKARI_231026.pdf"
let detan = "DETAN FACE SHEET MASK_SKINKARI_231026.pdf"
let artwork: [Artwork] = [
    Artwork(
        name: "vitamin-c-portrait", source: vitamin,
        crop: CGRect(x: 174, y: 230, width: 160, height: 288),
        polygon: [
            CGPoint(x: 261, y: 230), CGPoint(x: 334, y: 230),
            CGPoint(x: 334, y: 518), CGPoint(x: 174, y: 518),
            CGPoint(x: 174, y: 470), CGPoint(x: 176, y: 438),
            CGPoint(x: 181, y: 393), CGPoint(x: 177, y: 340),
            CGPoint(x: 188, y: 318), CGPoint(x: 232, y: 354),
            CGPoint(x: 250, y: 342), CGPoint(x: 259, y: 300),
            CGPoint(x: 261, y: 270),
        ]
    ),
    Artwork(
        name: "detan-portrait", source: detan,
        crop: CGRect(x: 174, y: 251, width: 162, height: 267),
        polygon: [
            CGPoint(x: 260, y: 251), CGPoint(x: 305, y: 263),
            CGPoint(x: 317, y: 287), CGPoint(x: 317, y: 400),
            CGPoint(x: 336, y: 435), CGPoint(x: 336, y: 518),
            CGPoint(x: 174, y: 518), CGPoint(x: 174, y: 448),
            CGPoint(x: 177, y: 404), CGPoint(x: 177, y: 368),
            CGPoint(x: 188, y: 341), CGPoint(x: 219, y: 351),
            CGPoint(x: 241, y: 319), CGPoint(x: 252, y: 279),
        ]
    ),
    Artwork(
        name: "green-tea", source: detan,
        crop: CGRect(x: 85, y: 350, width: 18, height: 18),
        polygon: [], ellipse: CGRect(x: 86.3, y: 351.3, width: 15.4, height: 15.4), scale: 24
    ),
    Artwork(
        name: "aloe", source: detan,
        crop: CGRect(x: 85, y: 378, width: 18, height: 18),
        polygon: [], ellipse: CGRect(x: 86.3, y: 379.3, width: 15.4, height: 15.4), scale: 24
    ),
    Artwork(
        name: "charcoal", source: detan,
        crop: CGRect(x: 85, y: 322, width: 18, height: 18),
        polygon: [], ellipse: CGRect(x: 86.3, y: 323.3, width: 15.4, height: 15.4), scale: 24
    ),
    Artwork(
        name: "vitamin-c", source: vitamin,
        crop: CGRect(x: 242, y: 410, width: 76, height: 87),
        polygon: [], ellipse: CGRect(x: 247, y: 410, width: 62, height: 86),
        ellipseRotation: .pi * 21 / 180, scale: 8
    ),
]

for art in artwork {
    guard let document = PDFDocument(url: root.appendingPathComponent("reference/products/" + art.source)),
          let page = document.page(at: 0) else { fatalError("Cannot open \(art.source)") }
    let pageHeight = page.bounds(for: .mediaBox).height
    let width = Int(art.crop.width * art.scale)
    let height = Int(art.crop.height * art.scale)
    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height,
        bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
        colorSpaceName: .deviceRGB, bitmapFormat: [], bytesPerRow: width * 4, bitsPerPixel: 32
    ), let graphics = NSGraphicsContext(bitmapImageRep: bitmap) else { fatalError("Cannot create canvas") }
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = graphics
    let context = graphics.cgContext
    context.clear(CGRect(x: 0, y: 0, width: width, height: height))
    context.setShouldAntialias(true)
    context.scaleBy(x: art.scale, y: art.scale)
    context.translateBy(x: -art.crop.minX, y: -(pageHeight - art.crop.maxY))
    if let ellipse = art.ellipse {
        var transform = CGAffineTransform(translationX: ellipse.midX, y: pageHeight - ellipse.midY)
            .rotated(by: art.ellipseRotation)
        let path = CGPath(ellipseIn: CGRect(x: -ellipse.width / 2, y: -ellipse.height / 2, width: ellipse.width, height: ellipse.height), transform: &transform)
        context.addPath(path)
    } else {
        for (index, point) in art.polygon.enumerated() {
            let converted = CGPoint(x: point.x, y: pageHeight - point.y)
            if index == 0 { context.move(to: converted) } else { context.addLine(to: converted) }
        }
        context.closePath()
    }
    context.clip()
    page.draw(with: .mediaBox, to: context)
    NSGraphicsContext.restoreGraphicsState()
    // The original page has a white paper backing. Clear only nearly-white
    // pixels connected to a transparent edge; preserve enclosed artwork whites.
    if let bytes = bitmap.bitmapData {
        var seen = Array(repeating: false, count: width * height)
        var queue: [Int] = []
        for x in 0..<width { queue.append(x); queue.append((height - 1) * width + x) }
        for y in 0..<height { queue.append(y * width); queue.append(y * width + width - 1) }
        var cursor = 0
        while cursor < queue.count {
            let pixel = queue[cursor]; cursor += 1
            if seen[pixel] { continue }; seen[pixel] = true
            let offset = pixel * 4
            let transparent = bytes[offset + 3] == 0
            let paper = bytes[offset] > 247 && bytes[offset + 1] > 247 && bytes[offset + 2] > 247
            if !transparent && !paper { continue }
            bytes[offset + 3] = 0
            let x = pixel % width, y = pixel / width
            if x > 0 { queue.append(pixel - 1) }; if x < width - 1 { queue.append(pixel + 1) }
            if y > 0 { queue.append(pixel - width) }; if y < height - 1 { queue.append(pixel + width) }
        }
    }
    guard let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("Cannot encode artwork") }
    try png.write(to: output.appendingPathComponent("\(art.name).png"))
    print("\(art.name).png: \(width)×\(height), \(png.count) bytes")
}
