$p = 'assets/css/styles.css'
$c = [IO.File]::ReadAllText($p) -replace "`r`n", "`n"

function Replace-Once($text, $old, $new) {
    if (-not $text.Contains($old)) { Write-Output "NOT FOUND: $old"; exit 1 }
    return $text.Replace($old, $new)
}

# 1. blue token next to the existing green one
$c = Replace-Once $c "    --green: #22c55e;`n" "    --green: #22c55e;`n    --blue: #3b82f6;`n"

# 2. CSS-only technical placeholder visual (same hairline-grid language as body::before)
$anchor = ".project-media-placeholder {`n    background: var(--pill-bg);`n}`n"
$addition = $anchor + @'

/* Placeholder visual: COMING SOON */
.project-media-placeholder::before,
.project-media-placeholder::after {
    content: '';
    position: absolute;
}

.project-media-placeholder::before {
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
    background-size: 20px 20px;
}

.project-media-placeholder::after {
    inset: 34% 40%;
    border: 1px dashed rgba(229, 229, 229, 0.18);
    border-radius: 4px;
}
'@ -replace "`r`n", "`n"
$c = Replace-Once $c $anchor $addition

# 3. UPCOMING status (grey label, blue pulsing dot reusing .status-dot animation)
$anchor2 = ".project-body .project-status {`n    margin-top: 0.6rem;`n}`n"
$addition2 = $anchor2 + @'

.project-status.upcoming {
    color: var(--text-secondary);
}

.status-dot.blue {
    background: var(--blue);
}
'@ -replace "`r`n", "`n"
$c = Replace-Once $c $anchor2 $addition2

[IO.File]::WriteAllText($p, ($c -replace "`n", "`r`n"))
Write-Output 'OK'
