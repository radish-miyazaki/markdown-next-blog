import * as fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  let posts

  if (process.env.NODE_ENV === 'production') {
    // TODO: fetch from cache
  } else {
    const files = fs.readdirSync(path.join('posts'))

    posts = files.map(filename => {
      const slug = filename.replace('.md', '')
      const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
      const {data :frontmatter} = matter(markdownWithMeta)

      return {
        frontmatter,
        slug,
      }
    })
  }

  // queryで送られてきた"q params"を含むタイトルのポストを探す
  const results = posts.filter(({frontmatter}) => {
    return (
      frontmatter.title.indexOf(req.query.q) != -1    ||
      frontmatter.excerpt.indexOf(req.query.q) != -1  ||
      frontmatter.category.toLowerCase().indexOf(req.query.q) != -1
    )
  })

  // INFO: resultsは配列なので、オブジェクトの形にする
  res.status(200).json(JSON.stringify({results}))
}
