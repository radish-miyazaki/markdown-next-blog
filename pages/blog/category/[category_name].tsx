import Layout from "@/components/Layout";
import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Post from "@/components/Post";
import {sortByDate} from "@/utils/index";

const CategoryBlogPage = ({posts, categoryName}) => {
  return (
    <Layout>
      <h1 className="text-4xl border-b-4 p-5 font-bold">Posts in {categoryName}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        }
      </div>
    </Layout>
  )
}

export default CategoryBlogPage

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const categories = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)

    return frontmatter.category.toLowerCase()
  })

  const paths = categories.map(category => ({
    params: {category_name: category}
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = ({params}) => {
  const {category_name} = params

  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    const slug: string = filename.replace('.md', '')
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const {data: frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  // Filter posts by category
  const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name)

  return {
    props: {
      posts: categoryPosts.sort(sortByDate),
      categoryName: category_name,
    }
  }
}

