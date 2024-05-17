"use client"

import Link from 'next/link'
import React from 'react'
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
function Navbar() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then((session) => {
            setSession(session.data.session ?? null);
        }).catch((err) => {
            console.log("ERROR GET SESSION: ", err);
        });
    }, []);
    return (
        <div className="navbar bg-white sticky top-0 z-10 shadow-md">
            <div className="flex-1 join">
                <a className="btn join-item btn-sm text-white text-xl border-none bg-[#CC0000] hover:bg-[#CC0000]" href='/'>News</a>
                <a className="btn join-item btn-sm bg-white border-none hover:bg-white text-xl text-[#121221]" href='/'>Portal</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input bg-transparent text-black input-bordered w-24 md:w-auto" />
                </div>
                <h1 className="text-black font-semibold">
                    Welcome, {session ? session.user.email : 'Guest!'}
                </h1>
                {session ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white text-black border-2 rounded-box w-52">
                            <li><button>Profile</button></li>
                            <li><button>Settings</button></li>
                            <li><button onClick={async (e) => {
                                e.preventDefault();
                                setLoading(true);
                                const { error } = await supabase.auth.signOut();
                                setLoading(false);
                                if (!error) setSession(null);
                            }} disabled={loading}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link href="/auth/login" className="bg-slate-900 font-semibold rounded px-4 py-2 text-white">
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar