import { BlogPost } from "../data/blogs";

export function dedupePosts(posts: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  return posts.filter((post) => {
    const key = post.title.toLowerCase().trim(); // or `${post.title}-${post.summary}`

    const isValid = post.id && post.title && post.excerpt;

    if (!isValid || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}
