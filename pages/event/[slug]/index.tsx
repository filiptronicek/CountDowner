import { useRouter } from "next/router";
import { getCountdown } from "../../api/countdownDetail";

const CountDownRedirect = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <>Redirecting you to {slug}</>;
};

export async function getServerSideProps({ query }: { query: any }) {
  const event = await getCountdown(query.slug);
  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: `/?name=${encodeURIComponent(event.name!)}&date=${
        event.timestamp
      }`,
      permanent: false,
    },
  };
}

export default CountDownRedirect;
