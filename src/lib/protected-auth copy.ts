import { GetServerSidePropsContext } from 'next';
// import { getSession } from 'next-auth/react';

export const protectedAuth = async (context: GetServerSidePropsContext, callback: () => any) => {
  const { req } = context;
  // const session = await getSession({ req });
  const session = true;

  if (!session) {
    return {
      redirect: { destination: '/flow/login', permanent: false },
    };
  }
  return callback();
};

/**
 * @usage
 *
 *
 * ```ts
 * export async function getServerSideProps(context: GetServerSidePropsContext) {
 *   const { req } = context;
 *   const session = await getSession({ req });
 *
 *   return protectedAuth(context, () => {
 *     // if the session is available, return the props
 *     return {
 *       props: { session },
 *     };
 *   });
 * }
 * ```
 */
