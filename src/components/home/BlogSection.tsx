const blogPosts = [
  {
    id: 1,
    title: 'The Future of Sustainable Manufacturing',
    excerpt: 'Discover how AI and IoT are revolutionizing sustainable production methods...',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    date: '2024-03-15',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Carbon Neutral Supply Chains',
    excerpt: 'Learn how companies are achieving carbon neutrality in their supply chains...',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    date: '2024-03-10',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Water Conservation in Industry',
    excerpt: 'Innovative approaches to reducing industrial water consumption...',
    image: 'https://images.unsplash.com/photo-1519184324956-7f0d0a2f0681',
    date: '2024-03-05',
    readTime: '6 min read',
  },
];

export default function BlogSection() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay updated with the latest in sustainable manufacturing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={`${post.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={post.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="mx-2">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600">{post.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center text-green-600 hover:text-green-700">
                  Read more
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}