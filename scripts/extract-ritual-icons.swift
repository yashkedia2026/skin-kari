import Foundation
import PDFKit
import AppKit

// Extract the actual printed directions artwork, not a redrawn approximation.
// Run from the repository root on macOS, then run optimize-ritual-icons.mjs.
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let source = root.appendingPathComponent(
    "reference/products/HYALURONIC ACID FACE SHEET MASK_SKINKARI_231026.pdf"
)
let destination = root.appendingPathComponent("public/images/ritual", isDirectory: true)
try FileManager.default.createDirectory(at: destination, withIntermediateDirectories: true)

guard let document = PDFDocument(url: source), let page = document.page(at: 0) else {
    fatalError("Cannot open the source packaging PDF: \(source.path)")
}

// Measurements are PDF points from the page's top-left corner. The first and
// third disks are slightly elliptical in the original artwork. Clip just inside
// their printed white edges to remove the surrounding blue panel cleanly while
// preserving the white backing, blue mask, timer markings, and facial line art.
let icons: [(name: String, centerX: CGFloat, radiusX: CGFloat)] = [
    ("apply-mask", 511.05, 16.25),
    ("wait-fifteen", 610.60, 16.20),
    ("pat-serum", 710.15, 15.65),
]
let centerFromTop: CGFloat = 272.55
let radiusY: CGFloat = 15.80
let cropSize: CGFloat = 34
let pixelSize = 512
let scale = CGFloat(pixelSize) / cropSize

for icon in icons {
    let centerY = page.bounds(for: .mediaBox).height - centerFromTop
    let crop = CGRect(
        x: icon.centerX - cropSize / 2,
        y: centerY - cropSize / 2,
        width: cropSize,
        height: cropSize
    )
    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: pixelSize,
        pixelsHigh: pixelSize,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bitmapFormat: [],
        bytesPerRow: pixelSize * 4,
        bitsPerPixel: 32
    ), let graphics = NSGraphicsContext(bitmapImageRep: bitmap) else {
        fatalError("Cannot create the image canvas for \(icon.name)")
    }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = graphics
    let context = graphics.cgContext
    context.clear(CGRect(x: 0, y: 0, width: pixelSize, height: pixelSize))
    context.setShouldAntialias(true)
    context.scaleBy(x: scale, y: scale)
    context.translateBy(x: -crop.minX, y: -crop.minY)
    context.addEllipse(in: CGRect(
        x: icon.centerX - icon.radiusX,
        y: centerY - radiusY,
        width: icon.radiusX * 2,
        height: radiusY * 2
    ))
    context.clip()
    page.draw(with: .mediaBox, to: context)
    NSGraphicsContext.restoreGraphicsState()

    guard let png = bitmap.representation(using: .png, properties: [:]) else {
        fatalError("Cannot encode \(icon.name)")
    }
    try png.write(to: destination.appendingPathComponent("\(icon.name).png"))
    print("\(icon.name).png: \(pixelSize)×\(pixelSize), \(png.count) bytes")
}
