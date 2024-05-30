import React from 'react';

const HomeLoadingSkeleton = () => {
    return (
        <div className="flex bg-white">
            <div className="w-8/12 p-14 h-full bg-white text-black">
                <div className="h-8 bg-gray-200 rounded-md w-48 mb-6"></div>
                <div className="h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
            </div>
            <div className="w-4/12 p-14 h-full text-black">
                <div className="h-8 bg-gray-200 rounded-md w-48 mb-6"></div>
                <div className="h-20 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
            </div>
        </div>
    );
};

export default HomeLoadingSkeleton;