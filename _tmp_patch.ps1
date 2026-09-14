$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$nl = "`n"

# ---------- index.html ----------
$htmlPath = Join-Path $PSScriptRoot 'index.html'
$html = [System.IO.File]::ReadAllText($htmlPath, $utf8)

$html = $html.Replace(
  '<h3 class="project-title">COMING SOON</h3>',
  '<h3 class="project-title">Coming soon</h3>'
)

[System.IO.File]::WriteAllText($htmlPath, $html, $utf8)

# ---------- styles.css ----------
$cssPath = Join-Path $PSScriptRoot 'assets\css\styles.css'
$css = [System.IO.File]::ReadAllText($cssPath, $utf8)

# A. blue variable
$css = $css.Replace(
  "    --green: #22c55e;$nl}",
  "    --green: #22c55e;${nl}    --blue: #3b82f6;$nl}"
)

# B. blue status dot rule (after pulse keyframes)
$pulseOld = "@keyframes pulse {${nl}    0%, 100% { opacity: 1; }${nl}    50% { opacity: 0.3; }${nl}}"
$pulseNew = $pulseOld + "${nl}${nl}.status-dot.blue {${nl}    background: var(--blue);${nl}}"
$css = $css.Replace($pulseOld, $pulseNew)

# C. project-body flex + status anchored to bottom (aligns ACTIVE / UPCOMING)
$bodyOld = ".project-body .project-status {${nl}    margin-top: 0.6rem;${nl}}"
$bodyNew = ".project-body {${nl}    display: flex;${nl}    flex-direction: column;${nl}    flex: 1 1 auto;${nl}}${nl}${nl}.project-body .project-status {${nl}    margin-top: auto;${nl}    padding-top: 0.6rem;${nl}}"
$css = $css.Replace($bodyOld, $bodyNew)

# D. responsive tweaks for project cards
$respOld = "@media (max-width: 640px) {${nl}    .projects-grid {${nl}        grid-template-columns: 1fr;${nl}    }${nl}}"
$respNew = "@media (max-width: 640px) {${nl}    .projects-grid {${nl}        grid-template-columns: 1fr;${nl}    }${nl}${nl}    .project-media {${nl}        aspect-ratio: auto;${nl}        min-height: 160px;${nl}    }${nl}}"
$css = $css.Replace($respOld, $respNew)

[System.IO.File]::WriteAllText($cssPath, $css, $utf8)

Write-Output "patch done"
