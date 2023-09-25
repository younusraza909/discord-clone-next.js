import { NextApiRequest } from 'next';
import { getAuth } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const currentProfilePages = async (req: NextApiRequest) => {
  // In next 12 api we cannot user auth from @clerk/next
  // Instead we have to uer getAuth from @clerk.nextjs/server and pass req into it
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
