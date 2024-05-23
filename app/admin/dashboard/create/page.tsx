"use client"
import { createClient } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

function Create() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let imageUrl = ''

        if (image) {
            // Upload file using Supabase storage
            const { data: uploadData, error: uploadError } = await uploadFile(image)

            if (uploadError) {
                console.error('Error uploading image:', uploadError.message)
                return
            }

            imageUrl = `${supabaseUrl}/storage/v1/object/public/images/${uploadData.path}`
        }

        const { data, error } = await supabase
            .from('news')
            .insert([
                {
                    title,
                    description,
                    category,
                    image_url: imageUrl || null, 
                },
            ])
            .select()

        if (error) {
            console.error('Error inserting data:', error.message)
        } else {
            console.log('Data inserted successfully:', data)
            router.push('/admin/dashboard')
            // reset form fields
            setTitle('')
            setDescription('')
            setCategory('')
            setImage(null)
        }
    }

    async function uploadFile(file: File) {
        const { data, error } = await supabase.storage
            .from('images')
            .upload(`${Date.now()}-${file.name}`, file)

        if (error) {
            return { error }
        } else {
            return { data }
        }
    }

    return (
        <div className="h-fit bg-white flex justify-center items-center">
            <div className="card my-10 rounded-md text-black w-3/5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5">
                <div className="flex-1 join font-bold">
                    <h1 className="join-item btn-sm text-white text-xl border-none bg-[#CC0000] hover:bg-[#CC0000]">Add</h1>
                    <h1 className="join-item btn-sm bg-white border-none hover:bg-white text-xl text-[#121221]">News</h1>
                </div>
                <form onSubmit={handleSubmit} className="pt-5">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg text-black font-semibold">Title</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Add title"
                            className="input border-1 border-black focus:border-black input-md w-full bg-white"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg text-black font-semibold">Description</span>
                        </div>
                        <textarea
                            placeholder="Add description"
                            className="textarea border-1 border-black focus:border-black textarea-md w-full min-h-20 bg-white"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg text-black font-semibold">Category</span>
                        </div>
                        <select
                            className="select w-full select-md border-1 border-black bg-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option disabled value="">choose category</option>
                            <option value="Nasional">Nasional</option>
                            <option value="Internasional">Internasional</option>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Olahraga">Olahraga</option>
                            <option value="Teknologi">Teknologi</option>
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg text-black font-semibold">Image</span>
                        </div>
                        <input
                            type="file"
                            className="file-input file-input-ghost border-1 border-black bg-white file-input-md w-full"
                            onChange={(e) => e.target.files && setImage(e.target.files[0])}
                        />
                    </label>
                    <div className="flex justify-end w-full">
                        <button type="submit" className="btn btn-success btn-sm text-white my-5">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create