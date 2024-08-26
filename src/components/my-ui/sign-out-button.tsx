import { auth, signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default async function SignOutButton() {
    const session = await auth();

    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 w-full sm:w-auto"
            >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out {session?.user?.name}</span>
            </button>
        </form>
    );
}