import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostQuery } from '../api/jsonPlaceholderApi';
// Импортируйте файл со стилями
import s from './PostDetailesPage.module.css'

const PostDetailsPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { data: post, isLoading, isError } = useGetPostQuery(postId);

    return (
        <div className={s.pagecontainer}>
            <h1>Пост {postId}</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error occurred while fetching post.</div>
            ) : (
                <div className={s.post}>
                    <h3>{post?.title}</h3>
                    <p>{post?.body}</p>
                    <Link to="/" className={s.backLink}>Назад</Link>
                </div>
            )}
        </div>
    );
};

export default PostDetailsPage;