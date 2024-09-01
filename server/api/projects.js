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
    const fullPath = path.join(process.cwd(), 'public', dir);
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
  }

  return { projects, categories: ['Wszystkie', ...Object.keys(directories)] };
});
