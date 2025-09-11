import React, { useState } from 'react';
import { mockForumPosts } from '../../data/mockData';

const PeerForum = () => {
    const [viewPost, setViewPost] = useState(null);
    
    if (viewPost) {
        return (
             <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <button onClick={() => setViewPost(null)} className="mb-6 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">← Back to Forum</button>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{viewPost.title}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <span>Posted by {viewPost.author}</span>
                        <span>•</span>
                        <div className="flex gap-2">
                            {viewPost.tags.map(tag => <span key={tag} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">{tag}</span>)}
                        </div>
                    </div>
                    <p className="text-gray-700 mb-6">{viewPost.content}</p>
                    <h3 className="text-lg font-semibold border-t pt-4">Replies</h3>
                    <div className="space-y-4 mt-4">
                        {viewPost.replies.map((reply, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md">
                                <p className="font-semibold text-gray-800">{reply.author}</p>
                                <p className="text-gray-600">{reply.content}</p>
                            </div>
                        ))}
                    </div>
                     <div className="mt-6 border-t pt-6">
                        <textarea className="w-full p-2 border rounded-md" rows="3" placeholder="Write a supportive reply..."></textarea>
                        <button className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Post Reply</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Peer Support Forum</h1>
                    <p className="text-gray-600">Connect anonymously with peers. Share, listen, and support each other.</p>
                </div>
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700">Start a Discussion</button>
            </div>
            
            <div className="space-y-4">
                {mockForumPosts.map(post => (
                    <div key={post.id} onClick={() => setViewPost(post)} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                        <h2 className="font-bold text-xl text-gray-900">{post.title}</h2>
                        <p className="text-gray-600 mt-1 truncate">{post.content}</p>
                        <div className="mt-3 flex justify-between items-center">
                            <div className="flex gap-2">
                                {post.tags.map(tag => <span key={tag} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">{tag}</span>)}
                            </div>
                            <span className="text-sm text-gray-500">{post.replies.length} replies</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeerForum;