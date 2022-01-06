import { getSession } from "next-auth/react";
import BaseLayout from "../components/layouts/BaseLayout";

export default function Home() {
  return <BaseLayout>Home page</BaseLayout>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {},
  };
}
