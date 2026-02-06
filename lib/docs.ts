import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const docsDirectory = path.join(process.cwd(), 'docs');

export interface Doc {
  slug: string;
  title: string;
  order: number;
  contentHtml?: string;
}

export function getAllDocs(): Doc[] {
  // Get file names under /docs
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        title: matterResult.data.title || slug,
        order: matterResult.data.order || 999,
        ...matterResult.data,
      };
    });

  // Sort docs by order
  return allDocsData.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    } else {
      return 1;
    }
  });
}

export async function getDocData(slug: string): Promise<Doc> {
  const fullPath = path.join(docsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Doc not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    title: matterResult.data.title || slug,
    order: matterResult.data.order || 999,
    ...matterResult.data,
  };
}
