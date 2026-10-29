import { getCollection, type CollectionEntry } from 'astro:content';
import { guidePath, otherLang, type Lang } from '../i18n/ui';

export type Article = CollectionEntry<'articles'>;

export async function getArticles(lang?: Lang) {
  const all = await getCollection('articles', ({ data }) => !data.draft && (!lang || data.lang === lang));
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Paths of an article in both languages. Every article must be translated. */
export async function getArticleAlternates(article: Article) {
  const target = otherLang(article.data.lang);
  const all = await getArticles(target);
  const translation = all.find((a) => a.data.translationKey === article.data.translationKey);
  if (!translation) {
    throw new Error(`Article "${article.id}" has no ${target} translation (translationKey: ${article.data.translationKey}).`);
  }
  return {
    [article.data.lang]: guidePath(article.data.lang, article.data.slug),
    [target]: guidePath(target, translation.data.slug),
  } as Record<Lang, string>;
}
