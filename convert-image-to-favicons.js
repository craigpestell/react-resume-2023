import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const appDir = path.join(__dirname, 'src/app');

// Check for source image
const sourceImagePath = path.join(__dirname, 'source-image.png');

if (!fs.existsSync(sourceImagePath)) {
  console.log('❌ Please save your character image as "source-image.png" in the project root directory.');
  console.log('📁 Expected location:', sourceImagePath);
  process.exit(1);
}

// Favicon sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 144, name: 'favicon-144x144.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

async function generateFavicons() {
  try {
    console.log('🎨 Converting your image to favicons...');
    
    // Generate PNG favicons from the source image
    for (const { size, name } of sizes) {
      const outputPath = path.join(publicDir, name);
      await sharp(sourceImagePath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png({ quality: 100 })
        .toFile(outputPath);
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }
    
    // Generate ICO file for the app directory
    const icoPath = path.join(appDir, 'favicon.ico');
    await sharp(sourceImagePath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(icoPath);
    console.log('✅ Generated favicon.ico');
    
    // Create web app manifest
    const manifest = {
      name: "Craig Pestell - Senior Software Engineer",
      short_name: "Craig Pestell",
      description: "Senior Software Engineer Portfolio",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/"
    };
    
    const manifestPath = path.join(publicDir, 'site.webmanifest');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Generated site.webmanifest');
    
    // Create browserconfig.xml for Microsoft tiles
    const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/favicon-144x144.png"/>
            <TileColor>#ffffff</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;
    
    const browserconfigPath = path.join(publicDir, 'browserconfig.xml');
    fs.writeFileSync(browserconfigPath, browserconfig);
    console.log('✅ Generated browserconfig.xml');
    
    console.log('🎉 All favicons generated successfully from your image!');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

generateFavicons();
