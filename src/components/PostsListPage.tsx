import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetPostsQuery } from '../api/jsonPlaceholderApi';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, ListRowProps } from 'react-virtualized';
import './PostsListPage.css';

const PostsListPage: React.FC = () => {
    const { data: posts, isLoading, isError, refetch } = useGetPostsQuery({});

    useEffect(() => {
        refetch();
    }, [refetch]);

    const cache = new CellMeasurerCache({
        defaultHeight: 100,
        fixedWidth: true,
    });

    const rowRenderer = ({ index, style, key, parent }: ListRowProps) => {
        const post = posts[index];

        return (
            <CellMeasurer cache={cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
                <div className="post" style={style}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <Link to={`/post/${post.id}`}>Просмотр</Link>
                </div>
            </CellMeasurer>
        );
    };

    return (
        <div className="page-container">
            <h1>Список постов</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error occurred while fetching posts.</div>
            ) : (

                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                className="posts-list"
                                width={width}
                                height={height}
                                rowCount={posts.length}
                                rowHeight={cache.rowHeight}
                                rowRenderer={rowRenderer}
                                overscanRowCount={10}
                            />
                        )}
                    </AutoSizer>

            )}
        </div>
    );
};

export default PostsListPage;