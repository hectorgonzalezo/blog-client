import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
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
  poster: string;
  id: string;
  key?: number;
}

function PostPreview({ title, published, createdAt, poster, id}: BlogProps): JSX.Element{
  const navigate = useNavigate();

  // When clicking on preview, go to post id
  return (
    <Preview
      onClick={() => {
        navigate(`/posts/${id}`);
      }}
    >
      <h1>{title}</h1>
      <p>By {poster}</p>
      <p>{format(new Date(createdAt), "d MMM yyyy")}</p>
    </Preview>
  );
}

export default PostPreview;
