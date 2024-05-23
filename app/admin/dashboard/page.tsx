"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
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

function Dashboard() {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorData | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);
        const { data: news, error } = await supabase.from('news').select('*');
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
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) {
        throw error;
      }
      console.log('Delete data with id:', id);
      // Refresh the news data after delete
      const { data: refreshedNews, error: fetchError } = await supabase.from('news').select('*');
      if (fetchError) {
        throw fetchError;
      }
      if (refreshedNews) {
        setNewsData(refreshedNews);
      }
    } catch (error: any) {
      console.error('Error deleting news data:', error.message);
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
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <div className="mb-4">
            <Link href="/admin/dashboard/create" className="btn btn-sm btn-primary text-white">
              Add
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full border border-black">
              <thead>
                <tr className="text-black">
                  <th></th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {newsData.map((news) => (
                  <tr key={news.id}>
                    <th></th>
                    <td className="w-60">{news.title}</td>
                    <td>
                      <div className="line-clamp-3 w-80">{news.description}</div>
                    </td>
                    <td>{news.category}</td>
                    <td>
                      <img src={news.image_url} alt={news.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td>{new Date(news.created_at).toLocaleString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link className="btn btn-sm btn-warning text-white" href={`/admin/dashboard/edit/${news.id}`}>
                          Edit
                        </Link>
                        <button className="btn btn-sm btn-error text-white" onClick={() => handleDelete(news.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
