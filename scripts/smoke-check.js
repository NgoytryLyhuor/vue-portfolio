const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const requiredFiles = [
  'index.html',
  'sw.js',
  'version.json',
  'sitemap.xml',
  'manifest.json',
  'images/projects/consatech-home.jpg'
];

let failed = false;

for (const file of requiredFiles) {
  const fullPath = path.join(distDir, file);
  if (!fs.existsSync(fullPath)) {
    console.error(`[SMOKE FAIL] Missing required build artifact: ${file}`);
    failed = true;
  } else {
    const size = fs.statSync(fullPath).size;
    console.log(`[SMOKE OK] ${file} (${size} bytes)`);
  }
}

// Verify version.json is valid JSON
try {
  const versionData = JSON.parse(fs.readFileSync(path.join(distDir, 'version.json'), 'utf8'));
  if (!versionData.version || !versionData.buildTime) {
    throw new Error('Missing version or buildTime');
  }
  console.log(`[SMOKE OK] version.json valid (${versionData.version})`);
} catch (err) {
  console.error(`[SMOKE FAIL] Invalid version.json: ${err.message}`);
  failed = true;
}

if (failed) {
  process.exit(1);
}
console.log('[SMOKE PASS] All production build artifacts verified.');
