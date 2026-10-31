import { getCollection, type CollectionEntry } from 'astro:content';
import { entryPath, otherLang, type Lang } from '../i18n/ui';
import { getArticles } from './articles';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(lang?: Lang) {
  const all = await getCollection('posts', ({ data }) => !data.draft && (!lang || data.lang === lang));
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Paths of a post in both languages. Every post must be translated. */
export async function getPostAlternates(post: Post) {
  const target = otherLang(post.data.lang);
  const translation = (await getPosts(target)).find((p) => p.data.translationKey === post.data.translationKey);
  if (!translation) {
    throw new Error(`Post "${post.id}" has no ${target} translation (translationKey: ${post.data.translationKey}).`);
  }
  return {
    [post.data.lang]: entryPath('blog', post.data.lang, post.data.slug),
    [target]: entryPath('blog', target, translation.data.slug),
  } as Record<Lang, string>;
}

/** Guides a post points to, in the post's language. Fails on an unknown key. */
export async function getRelatedGuides(post: Post) {
  const guides = await getArticles(post.data.lang);
  return post.data.relatedGuides.map((key) => {
    const guide = guides.find((g) => g.data.translationKey === key);
    if (!guide) throw new Error(`Post "${post.id}" links to unknown guide "${key}".`);
    return guide;
  });
}
