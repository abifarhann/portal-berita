import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex bg-white">
        <div className="w-8/12 p-14 h-full bg-white text-black">
          <h1 className="text-2xl border-b-4 border-black w-fit font-semibold">Berita utama</h1>
          <Link href="/detail" className="group flex justify-start items-center h-48 w-full">
            <div className="overflow-hidden mr-8">
              <Image src="/dummy1.png" alt="" width={300} height={150} className="group-hover:scale-110 transition duration-700" />
            </div>
            <div className="">
              <h1 className="text-xl font-medium mb-2 group-hover:text-red-500 transition duration-300">Kemenhub Bebastugaskan Asri Damuna Usai Ajak Youtuber Korsel ke Hotel</h1>
              <p className="text-red-500">Hiburan</p>
            </div>
          </Link>
          <Link href="/detail" className="group flex justify-start items-center h-48 w-full">
            <div className="overflow-hidden mr-8">
              <Image src="/dummy1.png" alt="" width={300} height={150} className="group-hover:scale-110 transition duration-700" />
            </div>
            <div className="">
              <h1 className="text-xl font-medium mb-2 group-hover:text-red-500 transition duration-300">Kemenhub Bebastugaskan Asri Damuna Usai Ajak Youtuber Korsel ke Hotel</h1>
              <p className="text-red-500">Hiburan</p>
            </div>
          </Link>
          <Link href="/detail" className="group flex justify-start items-center h-48 w-full">
            <div className="overflow-hidden mr-8">
              <Image src="/dummy1.png" alt="" width={300} height={150} className="group-hover:scale-110 transition duration-700" />
            </div>
            <div className="">
              <h1 className="text-xl font-medium mb-2 group-hover:text-red-500 transition duration-300">Kemenhub Bebastugaskan Asri Damuna Usai Ajak Youtuber Korsel ke Hotel</h1>
              <p className="text-red-500">Hiburan</p>
            </div>
          </Link>
        </div>
        <div className="w-4/12 p-14 h-full text-red-500">
          <h1 className="text-2xl border-b-4 border-red-500 w-fit font-semibold">Berita terpopuler</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
