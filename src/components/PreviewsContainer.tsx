import React from 'react';
import BlogPreview from './BlogPreview';

interface ContainerProps {
  posts: IPost[];
}

function PreviewsContainer({ posts }: ContainerProps): JSX.Element{
  return (
    <div className='previews-container'>
      {posts.length > 0
        ? posts.map((post, i) => (
            <BlogPreview
              title={post.title}
              published={post.published}
              createdAt={post.createdAt}
              key={i}
            />
          ))
        : null}
    </div>
  );
}

export default PreviewsContainer