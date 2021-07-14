import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import {sortByDate} from "@/utils/index";

const files = fs.readdirSync(path.join('posts'))

const getPosts = () => {
  const posts = files.map(filename => {
    const slug: string = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const {data: frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  return posts.sort(sortByDate)
}

export default getPosts