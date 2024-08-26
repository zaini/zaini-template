// https://authjs.dev/getting-started/session-management/protecting
// check this out for info on how to protect routes too

import SignInButton from "@/components/my-ui/sign-in-button"
import SignOutButton from "@/components/my-ui/sign-out-button"
import { auth } from "@/lib/auth"

export default async function Page() {
    const session = await auth()

    if (!session) {
        return (
            <>
                <SignInButton />
                <div>Not authenticated</div>
            </>
        )
    }

    return (
        <div>
            <SignOutButton />
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}