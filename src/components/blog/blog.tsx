import BlogCard from "./card";

const blogPosts = [
  {
    title: "Leave here",
    auth: "John Dee",
    slug: "Post-2",
  },
];
const Blog = () => {
  <div className="container mx-auto p-8">
    <section>
      <h1 className="text-4xl bold text-center font-bold mb-8">Blog</h1>

      <div className="max-w-2xl mx-auto">
        {blogPosts.map((post) => (
          <BlogCard title={post.title} author={post.auth} slug={post.slug} />
        ))}
      </div>
    </section>
  </div>;
};

export default Blog;
