import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  return {
    props: {},
  };
}
