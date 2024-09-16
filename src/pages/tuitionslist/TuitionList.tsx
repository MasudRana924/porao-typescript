import React, { useEffect } from 'react';
import { AppDispatch, RootState } from "../../features/store";
import { fetchTutionPost } from "../../features/tuition/tuitionsSlice";
import { useDispatch, useSelector } from 'react-redux';

const TuitionList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, isLoading, isError } = useSelector((state: RootState) => state.tuitions);

    useEffect(() => {
        // Provide default filters or an empty object
        dispatch(fetchTutionPost({ teacherName: '', versityName: '', city: '' }));
    }, [dispatch]);

    // Skeleton loader for the posts
    const renderSkeletons = () => {
        return Array(8).fill(0).map((_, index) => (
            <div key={index} className="group bg-white shadow-md border border-white rounded-xl">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-h-8 xl:aspect-w-7 p-4">
                    {/* Skeleton for image */}
                    <div className="h-full w-full bg-gray-300 animate-pulse rounded-lg">
                        <img
                            alt='Tuition Post Image'
                            src='https://via.placeholder.com/150'
                            className="h-full w-full object-cover object-center group-hover:opacity-75 border rounded-lg"
                        />
                    </div>
                </div>
                <div className="mt-4 ml-4">
                    {/* Skeleton for title */}
                    <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4 mb-2">
                       
                    </div>
                    {/* Skeleton for price */}
                    <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2">
                        
                    </div>
                </div>
            </div>
        ));
    };

    if (isLoading) {
        return (
            <div className="w-3/4 mx-auto mt-4 lg:mt-0 sm:px-6 sm:py-24 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {renderSkeletons()}
                </div>
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching posts!</div>;
    }

    return (
        <div className="w-3/4 mx-auto mt-4 lg:mt-0 sm:px-6 sm:py-24 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {posts?.data && posts?.data?.length > 0 ? (
                    posts?.data?.map((post: any) => (
                        <div key={post.id} className="group bg-white shadow-md border border-white rounded-xl">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-h-8 xl:aspect-w-7 p-4">
                                <img
                                    alt={post.imageAlt || 'Tuition Post Image'}
                                    src={post.imageSrc || 'https://via.placeholder.com/150'} // Fallback image if no src
                                    className="h-full w-full object-cover object-center group-hover:opacity-75 border rounded-lg"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700 ml-4">{post.name || 'No Title'}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900 ml-4">{post.price || 'No Price'}</p>
                        </div>
                    ))
                ) : (
                    <div>No tuition posts available</div>
                )}
            </div>
        </div>
    );
};

export default TuitionList;
