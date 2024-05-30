import React from 'react';

const DetailLoadingSkeleton = () => {
    return (
        <div className="px-4 mx-56 py-6 md:px-6 lg:py-16 md:py-12">
            <div className="prose prose-gray flex flex-col items-center mx-auto dark:prose-invert text-black">
                <div className="h-36 bg-gray-200 rounded-md w-full mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 self-start rounded-md w-1/2 mb-4 animate-pulse"></div>
                <div className="aspect-video h-[400] w-[800px] bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full mb-4 animate-pulse"></div>
            </div>
        </div>
    );
};

export default DetailLoadingSkeleton;