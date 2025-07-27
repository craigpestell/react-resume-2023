// Script to create placeholder images for projects
// Run this in your browser console or use an image generation tool

const projectImages = [
  { name: 'apple-project.jpg', title: 'Apple Hardware Testing Platform', color: '#007AFF' },
  { name: 'healthcare-dashboard.jpg', title: 'Healthcare AI Platform', color: '#34C759' },
  { name: 'google-silicon.jpg', title: 'Google Silicon Design', color: '#4285F4' },
  { name: 'williams-sonoma.jpg', title: 'Williams Sonoma MFE', color: '#8B4513' },
  { name: 'macys.jpg', title: 'Macys.com Platform', color: '#E60012' },
  { name: 'kali-protectives.jpg', title: 'Kali Protectives', color: '#FF6B35' }
];

// Instructions:
// 1. Visit https://via.placeholder.com/ or similar service
// 2. Generate 800x600 images with the above colors and titles
// 3. Download and save them in /public/images/ with the specified names
// 4. Or use any screenshots from your actual projects

console.log('Project image placeholders needed:');
projectImages.forEach(img => {
  console.log(`${img.name} - ${img.title} (${img.color})`);
  console.log(`URL: https://via.placeholder.com/800x600/${img.color.slice(1)}/FFFFFF?text=${encodeURIComponent(img.title)}`);
});
