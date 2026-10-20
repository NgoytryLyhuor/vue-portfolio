Add-Type -AssemblyName System.Drawing

function Create-ResizedIcon {
    param(
        [string]$sourcePath,
        [string]$destPath,
        [int]$targetWidth,
        [int]$targetHeight,
        [System.Drawing.Color]$bgColor,
        [float]$scaleRatio = 1.0
    )

    $srcImg = [System.Drawing.Image]::FromFile($sourcePath)
    $destBmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)

    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($bgColor -ne [System.Drawing.Color]::Transparent) {
        $brush = New-Object System.Drawing.SolidBrush($bgColor)
        $g.FillRectangle($brush, 0, 0, $targetWidth, $targetHeight)
        $brush.Dispose()
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    $srcAspect = $srcImg.Width / $srcImg.Height
    $targetAspect = $targetWidth / $targetHeight

    $drawWidth = $targetWidth * $scaleRatio
    $drawHeight = $targetHeight * $scaleRatio

    if ($srcAspect -gt 1.0) {
        $drawHeight = $drawWidth / $srcAspect
    } else {
        $drawWidth = $drawHeight * $srcAspect
    }

    $posX = ($targetWidth - $drawWidth) / 2
    $posY = ($targetHeight - $drawHeight) / 2

    $destRect = New-Object System.Drawing.RectangleF($posX, $posY, $drawWidth, $drawHeight)
    $srcRect = New-Object System.Drawing.RectangleF(0, 0, $srcImg.Width, $srcImg.Height)

    $g.DrawImage($srcImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $srcImg.Dispose()

    $destBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()
    Write-Host "Created $destPath ($targetWidth x $targetHeight)"
}

$logoPath = Resolve-Path "src/assets/logo.png"
$publicDir = Resolve-Path "public"
$slateBg = [System.Drawing.Color]::FromArgb(255, 15, 23, 42) # #0f172a
$transp = [System.Drawing.Color]::Transparent

# Standard PWA Icons (Transparent / crisp)
Create-ResizedIcon -sourcePath $logoPath -destPath "$publicDir/pwa-192x192.png" -targetWidth 192 -targetHeight 192 -bgColor $transp -scaleRatio 0.95
Create-ResizedIcon -sourcePath $logoPath -destPath "$publicDir/pwa-512x512.png" -targetWidth 512 -targetHeight 512 -bgColor $transp -scaleRatio 0.95

# Maskable Icons (With slate background & 80% safe zone for Android circular adaptive icon)
Create-ResizedIcon -sourcePath $logoPath -destPath "$publicDir/pwa-maskable-192x192.png" -targetWidth 192 -targetHeight 192 -bgColor $slateBg -scaleRatio 0.80
Create-ResizedIcon -sourcePath $logoPath -destPath "$publicDir/pwa-maskable-512x512.png" -targetWidth 512 -targetHeight 512 -bgColor $slateBg -scaleRatio 0.80

# Apple Touch Icon (iOS home screen, 180x180 with elegant slate background)
Create-ResizedIcon -sourcePath $logoPath -destPath "$publicDir/apple-touch-icon.png" -targetWidth 180 -targetHeight 180 -bgColor $slateBg -scaleRatio 0.82

# Favicons
Create-ResizedIcon -sourcePath $logoPath -destPath "$publicDir/favicon-32x32.png" -targetWidth 32 -targetHeight 32 -bgColor $transp -scaleRatio 1.0
Create-ResizedIcon -sourcePath $logoPath -destPath "$publicDir/favicon-16x16.png" -targetWidth 16 -targetHeight 16 -bgColor $transp -scaleRatio 1.0

Write-Host "All PWA icons generated successfully!"
