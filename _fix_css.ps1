$ErrorActionPreference = 'Stop'
$p = Join-Path $PSScriptRoot 'assets\css\styles.css'
$c = [System.IO.File]::ReadAllText($p)

$old = @'
.detail-title {
    font-size: clamp(2rem, 8vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 0.75rem;
}
'@ -replace "`r`n", "`n"

$new = @'
.detail-head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    margin-bottom: 0.75rem;
}

.detail-title {
    font-size: clamp(2rem, 8vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 0.75rem;
}

.detail-head .detail-title {
    margin-bottom: 0;
}
'@ -replace "`r`n", "`n"

$c = $c -replace "`r`n", "`n"
if ($c.Contains($old)) {
    $c = $c.Replace($old, $new)
    [System.IO.File]::WriteAllText($p, $c, [System.Text.UTF8Encoding]::new($false))
    Write-Output 'CSS DONE'
} else {
    Write-Output 'CSS PATTERN NOT FOUND'
}
