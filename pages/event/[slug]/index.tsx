import { useRouter } from "next/router";
import prisma from "../../../lib/prisma";

const CountDownRedirect = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <>Redirecting you to {slug}</>;
};

export async function getServerSideProps({ query }: { query: any }) {
  const event = await prisma.countDown.findUnique({
    where: { slug: query.slug },
  });
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    redirect: {
      destination: `/?name=${event.name}&date=${event.timestamp}`,
      permanent: false,
    },
  };
}

export default CountDownRedirect;
