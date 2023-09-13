import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function currentProfile() {
  let { userId } = await auth();

  if (!userId) {
    return null;
  }

  let profile = await db.profile.findUnique({ where: { userId: userId } });

  return profile;
}
