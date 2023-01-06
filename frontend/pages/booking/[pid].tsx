import type { NextPage, NextPageContext, GetServerSideProps } from "next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Client from "../../layout/Client";

interface BookingProp {
  user: string;
}

export const getServerSideProps = ({ query }: GetServerSidePropsContext) => {
  const { pid } = query;
  if (Number(pid) === 312) {
    return {
      props: {
        user: "1",
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

const BookingId: NextPage<BookingProp> = ({ user }) => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <Client>
      <div>
        {pid !== undefined
          ? typeof pid === "string"
            ? pid
            : pid?.join(".")
          : "h"}
      </div>
    </Client>
  );
};

export default BookingId;
