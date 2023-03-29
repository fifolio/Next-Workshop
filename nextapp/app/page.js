import fs from "fs";
import Link from "next/link";

const getPosts = () => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"))
  const slugs = markdownPosts.map((file) => file.replace(".md", ""));
  return slugs;
}


export default function Home() {

  const postsData = getPosts();
  const postsPreview = postsData.map((slug) => (
    <div>
      <Link href={`/posts/${slug}`}>
        <span>{slug}</span>
      </Link>
    </div>
  ))

  return (
    <div>
    {postsPreview}
    </div>
  )
}