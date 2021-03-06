import React from 'react';
import Link from "next/link";
import Image from "next/image";
import CategoryLabel from "@/components/CategoryLabel";

type PostProps = {
  post: any;
  compact?: boolean
}

const Post = ({post, compact}: PostProps) => {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      {/* Main Image */}
      {
        !compact && (
          <Image
            src={post.frontmatter.cover_image}
            alt=""
            height={420}
            width={600}
            className="mb-4 rounded"
          />
        )
      }

      {/* Content */}
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>
          {post.frontmatter.category}
        </CategoryLabel>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">
          {post.frontmatter.excerpt}
        </p>
      </div>

      {/* Action Buttons */}
      {
        !compact && (
          <div className="flex justify-between items-center mt-6">
            <Link href={`/blog/${post.slug}`}>
              <a className="text-gray-900 hover:text-blue-600">Read More</a>
            </Link>
            <div className="flex items-center">
              <Image
                src={post.frontmatter.author_image}
                alt="author_image"
                width={35}
                height={35}
                className="rounded-full hidden"
              />
              <h3 className="text-gray-700 font-bold pl-2">
                {post.frontmatter.author}
              </h3>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Post;
