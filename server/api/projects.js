import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  // Map folder names to display categories (PL labels kept as in UI)
  const folderToCategory = {
    'living-room': 'Salon',
    'office': 'Biuro',
    'terrace': 'Taras',
    'kitchen': 'Kuchnia',
    'dining-room': 'Jadalnia',
    'bedroom': 'Sypialnia',
    'bathroom': 'Łazienka',
  };

  const projects = [];

  // Strategy 1: Build-time glob (works on many deployments)
  let files = {};
  try {
    files = import.meta.glob('../../public/portfolio/*/*.{webp,png,jpg,jpeg}', {
      eager: true,
      import: 'default',
    });
  } catch (_) {
    // ignore
  }

  if (files && Object.keys(files).length > 0) {
    for (const filePath in files) {
      const publicUrl = /** @type {string} */ (files[filePath]);
      const parts = filePath.split(path.sep);
      const portfolioIndex = parts.lastIndexOf('portfolio');
      if (portfolioIndex === -1 || portfolioIndex + 1 >= parts.length) continue;
      const folder = parts[portfolioIndex + 1];
      const category = folderToCategory[folder];
      if (!category) continue;
      const fileName = parts[parts.length - 1];
      if (!fileName) continue;
      projects.push({
        title: fileName.replace(/\.(webp|png|jpe?g)$/i, ''),
        category,
        image: publicUrl.startsWith('/') ? publicUrl : `/${publicUrl.replace(/^\/*/, '')}`,
      });
    }
  } else {
    // Strategy 2: Filesystem read (works on Node/Edge with bundled public directory)
    const baseCandidates = [
      path.join(process.cwd(), 'public'),
      path.join(process.cwd(), '..', 'public'),
    ];

    for (const base of baseCandidates) {
      try {
        // Test base exists
        if (!fs.existsSync(base)) continue;
        for (const folder of Object.keys(folderToCategory)) {
          const fullPath = path.join(base, 'portfolio', folder);
          if (!fs.existsSync(fullPath)) continue;
          const dirFiles = fs.readdirSync(fullPath);
          dirFiles.forEach((file) => {
            if (/\.(webp|png|jpe?g)$/i.test(file)) {
              projects.push({
                title: file.replace(/\.(webp|png|jpe?g)$/i, ''),
                category: folderToCategory[folder],
                image: `/portfolio/${folder}/${file}`,
              });
            }
          });
        }
        if (projects.length > 0) break; // success with this base
      } catch (e) {
        // continue to next base
        // eslint-disable-next-line no-console
        console.warn(`[api/projects] Skipping base ${base}:`, e?.message || e);
      }
    }
  }

  return { projects, categories: ['Wszystkie', ...Object.values(folderToCategory)] };
});
