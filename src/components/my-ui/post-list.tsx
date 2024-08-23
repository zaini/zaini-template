"use client";
import { Post, User } from "@prisma/client"
import { Input } from "../ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PostListProps = {
    posts: (Post & {
        author: User;
    })[]
}

const PostList = (props: PostListProps) => {
    const [search, setSearch] = useState<string>("");

    const filteredPosts = props.posts.filter((post) => {
        return (
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.content.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="p-4">
            {/* Search bar */}
            <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Post list */}
            <ul className="space-y-4">
                {filteredPosts.map((post) => (
                    <li key={post.id}>
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{post.content}</p>
                                <p className="text-sm text-gray-500 mt-2">Written by {post.author.name}</p>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;