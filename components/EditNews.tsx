"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';

interface News {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url: string;
    created_at: string;
}

interface ErrorData {
    message: string;
    code: string;
    details?: string;
}

function EditNews() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [newsData, setNewsData] = useState<News>({
        id: 0,
        title: '',
        description: '',
        category: '',
        image_url: '',
        created_at: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorData | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchNews() {
          try {
            setLoading(true);
            setError(null);
            console.log('Fetching news data with id:', id);
            const { data: news, error } = await supabase.from('news').select('*').eq('id', id).single();
            console.log('News data:', news);
            console.log('Error:', error);
            if (error) {
              throw error;
            }
            if (news) {
              setNewsData(news);
            }
          } catch (error: any) {
            console.error('Error fetching news data:', error.message);
            setError(error as ErrorData);
          } finally {
            setLoading(false);
          }
        }
        if (id) {
          fetchNews();
        }
      }, [id]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('news').update(newsData).eq('id', id);
            if (error) {
                throw error;
            }
            console.log('News data updated');
            router.push('/admin/dashboard');
        } catch (error: any) {
            console.error('Error updating news data:', error.message);
        }
    };

    if (loading) {
        return <div className="flex justify-center bg-white text-black items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="w-full h-screen flex justify-center bg-white text-black mx-auto py-8">
                <div className="container">
                    <h1 className="text-3xl font-bold mb-4">Edit News</h1>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block font-bold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={newsData.title}
                                onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                                className="w-full border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block font-bold mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={newsData.description}
                                onChange={(e) => setNewsData({ ...newsData, description: e.target.value })}
                                className="w-full border border-gray-400 p -2 rounded"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block font-bold mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                value={newsData.category}
                                onChange={(e) => setNewsData({ ...newsData, category: e.target.value })}
                                className="w-full border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image_url" className="block font-bold mb-2">
                                Image URL
                            </label>
                            <input
                                type="text"
                                id="image_url"
                                value={newsData.image_url}
                                onChange={(e) => setNewsData({ ...newsData, image_url: e.target.value })}
                                className="w-full border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary text-white">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditNews;