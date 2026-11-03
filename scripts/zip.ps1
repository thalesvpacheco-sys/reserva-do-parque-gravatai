# Zip com barras normais nos caminhos (o CreateFromDirectory do Windows PowerShell 5 grava "\", que o servidor Linux não entende).
param([string]$Pasta, [string]$Destino)
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$raiz = (Resolve-Path $Pasta).Path
$saida = Join-Path (Get-Location) $Destino
$zip = [IO.Compression.ZipFile]::Open($saida, 'Create')
try {
  Get-ChildItem $raiz -Recurse -File | ForEach-Object {
    $nome = $_.FullName.Substring($raiz.Length + 1).Replace('\', '/')
    [void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $nome, [IO.Compression.CompressionLevel]::Optimal)
  }
} finally { $zip.Dispose() }
