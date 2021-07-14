import Layout from "@/components/Layout";
import * as fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function HomePage({posts}) {
  return (
    <Layout>
      <h1>Hello World</h1>
    </Layout>
  )
}

export const getStaticProps = () => {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const {data:formatter} = matter(markdownWithMeta)

    return {
      slug,
      formatter
    }
  })

  return {
    props: {
      posts
    }
  }
}

