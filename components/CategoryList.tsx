import React from 'react';
import Link from "next/link";

const CategoryList = ({categories}) => {
  return (
    <div className="w-full px-5 pt-5 pb-3 bg-white rounded0lg shadow-md mt-6">
      <h3 className="text-2xl bg-gray-800 text-white p-3 rounded">
        Blog Categories
      </h3>
      <ul className="divide-y divide-gray-300">
        {
          categories.map((category, index) => (
            <Link href={`/blog/category/${category.toLowerCase()}`} key={index}>
              <li className="p-4 cursor-pointer hover:bg-gray-50">
                {category}
              </li>
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

export default CategoryList;
