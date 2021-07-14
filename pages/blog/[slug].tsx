import React from 'react';
import * as fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";
import marked from "marked";
import Layout from "@/components/Layout";
import CategoryLabel from "@/components/CategoryLabel";

const PostPage = ({frontmatter, content, slug}) => {
  const {title, category, date, cover_image, author, author_image} = frontmatter

  return (
    <Layout title={title}>
      <Link href={"/blog"}><a className="hover:text-blue-600">Go Back</a></Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-4xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <Image src={cover_image} width={960} height={600} layout="responsive" className="rounded w-full" />
        <div className="flex justify-between bg-gray-100 p-2 my-8 items-center">
          <div className="flex items-center">
            <Image
              src={author_image}
              width={35}
              height={35}
              className="rounded-full"
            />
            <h4 className="pl-3 font-bold">{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>
        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{__html: marked(content)}} />
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params}) => {
  const {slug} = params

  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
  const {data: frontmatter, content} = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      content,
      slug
    }
  }
}