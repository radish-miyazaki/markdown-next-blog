import React from "react";
import * as fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Pagination from "@/components/Pagination";
import {POSTS_PER_PAGE} from "@/config/index";
import getPosts from "@/lib/posts";
import CategoryList from "@/components/CategoryList";

const BlogPage = ({posts, numPages, currentPage, categories}) => {
  return (
    <Layout>

      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-4xl border-b-4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              posts.map((post, index) => (
                <Post key={index} post={post} />
              ))
            }
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        {/* TODO: 画面が小さい場合は非表示にする */}
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length /POSTS_PER_PAGE)

  let paths = []

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: {page_index: i.toString()}
    })
  }

  return {
    paths,
    fallback: false
  }

}

export const getStaticProps = ({params}) => {
  const page = parseInt((params && params.page_index || 1))
  const files = fs.readdirSync(path.join('posts'))
  const posts = getPosts()

  // Get categories fot sidebar
  const categories = posts.map(post => post.frontmatter.category)
  const uniqueCategories = [...Array.from(new Set(categories))]

  // Pagination
  const numPages = Math.ceil(files.length /POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    }
  }
}

