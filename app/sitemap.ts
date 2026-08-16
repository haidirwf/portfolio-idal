import { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/projects';
import { ACHIEVEMENTS } from '@/lib/achievements';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://haidarwf.vercel.app';

  const projectUrls = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const achievementUrls = ACHIEVEMENTS.map((achievement) => ({
    url: `${baseUrl}/achievements/${achievement.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...projectUrls,
    ...achievementUrls,
  ];
}
