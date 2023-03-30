import fs from "fs";
import Link from "next/link";
import matter from "gray-matter"

const getPosts = () => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"))
  
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", "")
    };
  });

  return posts;
};


export default function Home() {

  const postsData = getPosts();
  const postsPreview = postsData.map((post) => (
    <div className="border border-slate-200 p-4 my-1 rounded-md shadow-md bg-white">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="font-bold text-violet-600 hover:underline">{post.title}</h2>
        <p className="text-sm text-slate-400">{post.subtitle}</p>
        <p className="text-xs mt-2 text-slate-700">Published: {post.date}</p>
      </Link>

    </div>
  ))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {postsPreview}
    </div>
  )
}