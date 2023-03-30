import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter"

const getPostContent = (slug) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content)
    return matterResult; 
}

export default function PostPage(props){
    const slug = props.params.slugs;
    const post = getPostContent(slug);
    return (
        <div>
            <h1>{post.data.title}</h1>    
            <article className="prose lg:prose-xl">
            <Markdown>{post.content}</Markdown>
            </article>
        </div>
    )
}