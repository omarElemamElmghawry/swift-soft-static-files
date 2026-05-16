const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const cssRoot = path.join(__dirname, 'css');
const tenants = fs.readdirSync(cssRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const sourceFiles = ['ep-layout.css', 'ep-main.css'];
const minifier = new CleanCSS({ level: 2 });
let hasError = false;

for (const tenant of tenants) {
  const tenantDir = path.join(cssRoot, tenant);
  const sources = sourceFiles.map((file) => path.join(tenantDir, file));

  const missing = sourceFiles.filter((file, index) => !fs.existsSync(sources[index]));
  if (missing.length) {
    console.warn(`Skipping tenant '${tenant}' because missing files: ${missing.join(', ')}`);
    continue;
  }

  const contents = sources
    .map((filePath) => fs.readFileSync(filePath, 'utf8').trim())
    .join('\n\n');

  const bundleHeader = `/* Bundled CSS for tenant '${tenant}'\n   Sources: ${sourceFiles.join(', ')}\n*/\n\n`;
  const bundleCss = `${bundleHeader}${contents}\n`;
  const bundlePath = path.join(tenantDir, 'ep-layout.bundle.css');
  fs.writeFileSync(bundlePath, bundleCss, 'utf8');

  const minified = minifier.minify(bundleCss);
  if (minified.errors.length) {
    console.error(`Minification failed for tenant '${tenant}':`, minified.errors);
    hasError = true;
    continue;
  }

  const minPath = path.join(tenantDir, 'ep-layout.bundle.min.css');
  fs.writeFileSync(minPath, minified.styles, 'utf8');

  console.log(`Created ${path.relative(__dirname, bundlePath)} and ${path.relative(__dirname, minPath)} for tenant '${tenant}'`);
}

if (hasError) {
  process.exitCode = 1;
}
