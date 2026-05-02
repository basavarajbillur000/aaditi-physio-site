const fs = require('fs');

const galleryFile = 'gallery.html';
let content = fs.readFileSync(galleryFile, 'utf8');

// 1. Add overlay CSS
const oldCss = `.gallery-item:hover img { transform: scale(1.05); }`;
const newCss = `.gallery-item:hover img { transform: scale(1.05); }
    .gallery-overlay { position: absolute; inset: 0; background: rgba(13, 115, 119, 0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: var(--transition); color: white; flex-direction: column; gap: 8px; }
    .gallery-item:hover .gallery-overlay { opacity: 1; }
    .gallery-overlay svg { width: 40px; height: 40px; transform: translateY(20px); transition: var(--transition); }
    .gallery-item:hover .gallery-overlay svg { transform: translateY(0); }
    .gallery-overlay span { font-family: var(--font-display); font-size: 1.25rem; font-weight: 600; transform: translateY(20px); transition: var(--transition); transition-delay: 0.05s; }
    .gallery-item:hover .gallery-overlay span { transform: translateY(0); }`;
content = content.replace(oldCss, newCss);

// 2. Build new gallery grid html
let galleryGridHtml = '';
let imagesArrayHtml = 'const images = [\n';

for (let i = 0; i < 15; i++) {
    const delay = (i % 3) * 0.1;
    const delayStyle = delay > 0 ? ` style="transition-delay: ${delay}s;"` : '';
    
    galleryGridHtml += `      <div class="gallery-item fade-up"${delayStyle} onclick="openLightbox(${i})">
        <img src="assets/gallery/gallery-${i+1}.jpg" alt="Clinic Interior ${i+1}">
        <div class="gallery-overlay">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          <span>View Image</span>
        </div>
      </div>\n`;
      
    imagesArrayHtml += `      "assets/gallery/gallery-${i+1}.jpg"${i < 14 ? ',' : ''}\n`;
}
imagesArrayHtml += '    ];';

// Replace grid DOM
const gridRegex = /<div class="gallery-grid" id="gallery-grid">[\s\S]*?<\/div>\s+<div style="text-align: center;/m;
content = content.replace(gridRegex, `<div class="gallery-grid" id="gallery-grid">\n${galleryGridHtml}    </div>\n    \n    <div style="text-align: center;`);

// Replace JS array
const jsRegex = /const images = \[[^\]]*\];/m;
content = content.replace(jsRegex, imagesArrayHtml);

fs.writeFileSync(galleryFile, content, 'utf8');
