import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
      <div>
        Signed in as {session?.user.email} <br />
      </div>
      <div>
        <button onClick={() => signOut()}>Signout</button>
      </div>
    </>
  );
}
