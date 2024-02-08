import React from 'react';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import PostsListPage from './components/PostsListPage';
import PostDetailsPage from './components/PostDetailsPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route  path="/" element={<PostsListPage/>} />
                <Route path="/post/:postId" element={<PostDetailsPage/>} />
            </Routes>
        </Router>
    );
};

export default App;