import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Preview = styled.button`
  width: 250px;
  background-color: var(--old-lace);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 2px 2px 4px 2px gray;
  &:hover{
    background-color: var(--beige)
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  h1{
    font-size: 2rem;
  }
`;

interface BlogProps {
  title: string;
  published: boolean;
  createdAt: string;
  key?: number;
}

function BlogPreview({ title, published, createdAt}: BlogProps): JSX.Element{
  return(
    <Preview onClick={() => {console.log('si')}}>
      <h1>{title}</h1>
      <p>{format(new Date(createdAt), 'd MMM yyyy')}</p>
    </Preview>
  )
}

export default BlogPreview
