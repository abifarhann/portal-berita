"use client"
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface News {
  id: number;
  title: string;
  category: string;
  image_url: string;
}

export default function Home() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase.from("news").select("*");
      if (error) {
        console.error("Error fetching news:", error);
      } else {
        setNews(data as News[]);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex bg-white">
        <div className="w-8/12 p-14 h-full bg-white text-black">
          <h1 className="text-2xl border-b-4 border-red-500 w-fit font-semibold">
            Berita utama
          </h1>
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/detail?id=${item.id}`}
              className="group flex justify-start items-center h-48 w-full my-5"
            >
              <div className="overflow-hidden mr-8">
                <img
                  src={item.image_url}
                  alt=""
                  className="group-hover:scale-110 transition duration-700 w-[300px] h-[170px]"
                />
              </div>
              <div className="">
                <h1 className="text-xl font-medium mb-2 group-hover:text-red-500 transition duration-300">
                  {item.title}
                </h1>
                <p className="text-red-500">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-4/12 p-14 h-full text-black">
          <h1 className="text-2xl border-b-4 border-red-500 w-fit font-semibold">
            Berita terpopuler
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
}