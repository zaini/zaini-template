"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { revalidatePath } from "next/cache"

export default async function AddPostForm() {
    const session = await auth()

    if (!session) {
        return null
    }

    async function addPost(formData: FormData) {
        "use server"
        const user = await prisma.user.findUnique({
            where: {
                email: session!.user!.email!
            }
        })

        if (!user) {
            console.error("User not found")
            return
        }

        const postData = {
            title: formData.get('title')!.toString(),
            content: formData.get('content')!.toString(),
            authorId: user.id
        }

        try {
            await prisma.post.create({
                data: postData
            })
            revalidatePath('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form action={addPost} className="mx-4 p-4 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add a new post</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <Input type="text" name="title" id="title" className="w-full" placeholder="Enter the title" />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <Textarea name="content" id="content" rows={4} className="w-full" placeholder="Enter the content" />
            </div>
            <Button type="submit" className="w-full">
                Add Post
            </Button>
        </form>
    )
}