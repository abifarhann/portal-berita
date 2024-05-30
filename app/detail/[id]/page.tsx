"use client"
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import DetailLoadingSkeleton from '@/components/DetailLoadingSkeleton'


function Detail() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  // const searchParams = useSearchParams()
  const { id } = useParams();
  // setNewsData(news);
  // console.log(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image_url, setImage] = useState('');
  const [created_at, setCreated] = useState('');

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase.from('news').select('*').eq('id', id).single();
        if (error) {
          setIsLoading(false)
          throw error
        }
        if (data) {
          setIsLoading(false)
          setNewsData(data);
          setTitle(data.title);
          setDescription(data.description);
          setCategory(data.category);
          setImage(data.image_url);
          setCreated(data.created_at);
        }
      } catch (error: any) {
        console.error('Error fetching news data:', error.message);
        setIsLoading(false)
      }
    }
    fetchNews();
  }, []);

  interface NewsData {
    title: string;
    description: string;
    category: string;
    image_url: string;
    created_at: string;
  }

  const [newsData, setNewsData] = useState<NewsData | null>(null);

  const dateString = created_at;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const renderDescription = () => {
    const paragraphs = description.split('\n\n');

    return (
      <>
        {paragraphs.map((paragraph, index) => (
          <React.Fragment key={index}>
            <p>{paragraph.trim()}</p>
            {index !== paragraphs.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-white">
        {isLoading ? (
          <DetailLoadingSkeleton />
        ) : (
          <div className="px-4 mx-56 py-6 md:px-6 lg:py-16 md:py-12">
            <article className="prose prose-gray flex flex-col items-center mx-auto dark:prose-invert text-black">
              <div className="space-y-2 not-prose">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
                  {title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Published on {formattedDate}</p>
              </div>
              <img
                alt="Breaking news image"
                className="aspect-video h-[400] w-[800px] object-cover my-5"
                src={image_url}
              />
              {renderDescription()}
            </article>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Detail