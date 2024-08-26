import { signIn } from "@/lib/auth";
import { Github } from "lucide-react";

export default async function SignInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200 w-full sm:w-auto"
            >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">Sign in with GitHub</span>
            </button>
        </form>
    );
}