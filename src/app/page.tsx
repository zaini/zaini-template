import AddPostForm from "@/components/my-ui/add-post-form";
import PostList from "@/components/my-ui/post-list";
import SignInButton from "@/components/my-ui/sign-in-button";
import SignOutButton from "@/components/my-ui/sign-out-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db"
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  const posts = await prisma.post.findMany({
    include: {
      author: true,
    }
  })

  return (
    <main>
      <div className="space-y-4 mb-4 px-6">
        <h2 className="text-2xl font-semibold">Welcome to the Zaini Template</h2>
        {
          session == null ? <SignInButton /> : <SignOutButton />
        }
        <p className="text-gray-700">
          This template uses the following technologies and frameworks:
        </p>
        <ul className="ml-4 list-disc list-inside text-gray-700">
          <li>
            <a href="https://nextjs.org/docs/app" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Next.js App Router
            </a>
          </li>
          <li>
            <a href="https://www.typescriptlang.org/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              TypeScript
            </a>
          </li>
          <li>
            <a href="https://react.dev/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              React
            </a>
          </li>
          <li>
            <a href="https://tailwindcss.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Tailwind CSS
            </a>
          </li>
          <li>
            <a href="https://shadcn.dev/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              shadcn
            </a>
          </li>
          <li>
            <a href="https://yarnpkg.com/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Yarn
            </a>
          </li>
          <li>
            <a href="https://www.prisma.io/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Prisma (using SQLite for development)
            </a>
          </li>
        </ul>
        <p className="text-gray-700">
          For production, it&apos;s recommended to use PostgreSQL as Vercel does not support SQLite.
        </p>
        <p className="text-gray-700">
          Get started by running <code className="bg-gray-100 p-1 rounded">yarn dev</code> in your terminal.
        </p>
        <p className="text-gray-700">
          There is also a <code className="bg-gray-100 p-1 rounded">seed.ts</code> file to help you seed the database.
        </p>
      </div>

      <hr className="my-8 border-gray-200 border-t" />

      <Link href="/protected" className="text-blue-500 hover:underline">
        <Button variant={"link"}>Go to protected page (<code>/app/protected/page.tsx</code>)</Button>
      </Link>

      <hr className="my-8 border-gray-200 border-t" />

      <AddPostForm />
      <PostList posts={posts} />
    </main>
  );
}
