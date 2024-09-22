import { useSession } from "next-auth/react";
export async function middleware() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
