const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sequencesDir = path.join(__dirname, '../public/sequences');
const sourcesDir = path.join(__dirname, '../Webpg');

// Ensure directories exist
['debit', 'credit'].forEach(type => {
  const dir = path.join(sequencesDir, type);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function extractFrames() {
  const files = [
    { src: 'debit card.webp', destFolder: 'debit' },
    { src: 'credit card.webp', destFolder: 'credit' }
  ];

  for (const { src, destFolder } of files) {
    const srcPath = path.join(sourcesDir, src);
    if (!fs.existsSync(srcPath)) {
      console.log(`Source file not found: ${srcPath}`);
      continue;
    }

    console.log(`Processing ${src}...`);
    try {
      // Load the animated WebP
      // Sharp handles animated webp by page. We need to know how many pages (frames) there are.
      // Metadata gives 'pages' count.
      const image = sharp(srcPath);
      const metadata = await image.metadata();

      if (!metadata.pages) {
        console.log(`${src} is not animated. Copying as frame-001.webp`);
         await image.toFile(path.join(sequencesDir, destFolder, 'frame-001.webp'));
         continue;
      }

      console.log(`Found ${metadata.pages} frames in ${src}`);

      // Limit to 100 frames if huge, or just take all? Requirement says 100.
      // If less than 100, we might need to duplicate or just accept fewer.
      const totalFrames = Math.min(metadata.pages, 150); // Cap at 150 just in case

      for (let i = 0; i < totalFrames; i++) {
        // Output filename: frame-001.webp
        const frameNum = String(i + 1).padStart(3, '0');
        const destPath = path.join(sequencesDir, destFolder, `frame-${frameNum}.webp`);
        
        await sharp(srcPath, { page: i })
          .webp({ quality: 80 }) // Optimize size slightly
          .toFile(destPath);
        
        if (i % 10 === 0) process.stdout.write('.');
      }
      console.log(`\nExtracted ${totalFrames} frames to ${destFolder}`);

    } catch (err) {
      console.error(`Error processing ${src}:`, err);
    }
  }
}

extractFrames();
