import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const handleGETPosts = async () => {
    try {
      const res = await fetch("https://codebuddy.review/posts");
      const data = await res.json();
      setPosts(data.data);
    } catch (error) {
      console.log("Error while fetching posts", error);
    }
  };

  useEffect(() => {
    handleGETPosts();
  }, []);

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg bg-white p-7 shadow-lg">
            <div className="mb-4 flex items-center">
              <img
                src={post.avatar}
                alt={`${post.firstName} ${post.lastName}`}
                className="m3 h-10 w-10 rounded-full"
              />
              <h2 className="text-2cl font-bold">{`${post.firstName} ${post.lastName}`}</h2>
            </div>
            <img
              src={post.image}
              alt="Post Image"
              className="mb-4 h-40 w-full rounded-lg object-cover"
            />
            <p className="text-gray-700">{post.writeup}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
