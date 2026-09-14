$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

$edits = @{
    'index.html' = @(
        @('href="favicon.png"', 'href="assets/img/favicon.png"'),
        @('href="styles.css"',  'href="assets/css/styles.css"'),
        @('src="script.js"',    'src="assets/js/script.js"'),
        @('src="dmdh-tools.jpg"', 'src="assets/img/dmdh-tools.jpg"')
    )
    'dmdh-tools.html' = @(
        @('href="favicon.png"', 'href="assets/img/favicon.png"'),
        @('href="styles.css"',  'href="assets/css/styles.css"'),
        @('src="script.js"',    'src="assets/js/script.js"'),
        @('src="dmdh-tools.jpg"', 'src="assets/img/dmdh-tools.jpg"')
    )
    'README.md' = @(
        @('(preview.png)', '(assets/img/preview.png)')
    )
    'config.json' = @(
        @('"preview": "preview.png"', '"preview": "assets/img/preview.png"')
    )
}

$utf8 = [System.Text.UTF8Encoding]::new($false)
foreach ($file in $edits.Keys) {
    $path = Join-Path $root $file
    $text = [System.IO.File]::ReadAllText($path)
    foreach ($pair in $edits[$file]) {
        if ($text -notlike "*$($pair[0])*") { Write-Output "MISS $file : $($pair[0])"; continue }
        $text = $text.Replace($pair[0], $pair[1])
    }
    [System.IO.File]::WriteAllText($path, $text, $utf8)
    Write-Output "OK   $file"
}
