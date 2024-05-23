"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'

function EditNews() {
    const router = useRouter()
    // const searchParams = useSearchParams()
    const { id } = useParams();
    // setNewsData(news);
    // console.log(id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        async function fetchNews() {
            try {
                const { data, error } = await supabase.from('news').select('*').eq('id', id).single();
                if (error) {
                    throw error;
                }
                if (data) {
                    setNewsData(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setCategory(data.category);
                }
            } catch (error: any) {
                console.error('Error fetching news data:', error.message);
                // setError(error as ErrorData);
            }
        }
        fetchNews();

    }, []);

    interface NewsData {
        title: string;
        description: string;
        category: string;
    }

    const [newsData, setNewsData] = useState<NewsData | null>(null);

    const handleUpdate = async (e: any) => {
        e.preventDefault()
        try {
            const updatedData = {
                title: title,
                description: description,
                category: category,
            }
            console.log(updatedData);

            const { error } = await supabase.from('news').update(updatedData).eq('id', id)
            if (error) {
                throw error
            }
            console.log('News data updated')
            router.push('/admin/dashboard')

        } catch (error: any) {
            console.error('Error updating news data:', error.message)
        }
    }

    const handleTitle = (e: any) => {
        
        setTitle(e.target.value)
        console.log(title);
    }
    const handleDesc = (e: any) => {
        
        setDescription(e.target.value)
        console.log(description);
    }
    const handleCategory = (e: any) => {
        
        setCategory(e.target.value)
        console.log(category);
    }

    return (
        <>
            <div className="w-full h-fit flex justify-center bg-white text-black mx-auto py-8">
                <div className="card my-10 rounded-md h-fit text-black w-3/5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-5 p-5">
                    <h1 className="text-3xl font-bold mb-4">Edit News</h1>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block font-bold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleTitle}
                                className="w-full border bg-white border-black p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block font-bold mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleDesc}
                                className="w-full border textarea-md min-h-80 max-h-80  bg-white border-black p-2 rounded"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block font-bold mb-2">
                                Category
                            </label>
                            <select
                                className="select w-full select-md border-1 border-black bg-white"
                                value={category}
                                onChange={handleCategory}
                            >
                                <option disabled value="">choose category</option>
                                <option value="Nasional">Nasional</option>
                                <option value="Internasional">Internasional</option>
                                <option value="Ekonomi">Ekonomi</option>
                                <option value="Olahraga">Olahraga</option>
                                <option value="Teknologi">Teknologi</option>
                            </select>
                        </div>
                        <div className="w-full flex justify-end">
                            <button type="submit" className="btn btn-sm btn-primary text-white">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditNews;