import fs from 'fs';
import path from 'path';

export default defineEventHandler(() => {
  const directories = {
    'Salon': '/portfolio/living-room',
    'Biuro': '/portfolio/office',
    'Taras': '/portfolio/terrace',
    'Kuchnia': '/portfolio/kitchen',
    'Jadalnia': '/portfolio/dining-room',
    'Sypialnia': '/portfolio/bedroom',
    'Łazienka': '/portfolio/bathroom'
  };
  const projects = [];

  for (const [category, dir] of Object.entries(directories)) {
    try {
      const dirRelative = dir.replace(/^\/+/, '');
      const fullPath = path.join(process.cwd(), 'public', dirRelative);
      const files = fs.readdirSync(fullPath);

      files.forEach((file) => {
        if (/\.(webp)$/i.test(file)) {
          projects.push({
            title: file.replace('.webp', ''),
            category: category,
            image: `${dir}/${file}`,
          });
        }
      });
    } catch (e) {
      // Gracefully skip missing dirs in production
      // eslint-disable-next-line no-console
      console.warn(`[api/projects] Skipping directory ${dir}:`, e?.message || e);
      continue;
    }
  }

  return { projects, categories: ['Wszystkie', ...Object.keys(directories)] };
});
