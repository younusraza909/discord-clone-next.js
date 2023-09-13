import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    let { name, imageUrl } = await req.json();

    let profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized Error', { status: 401 });
    }

    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        profileId: profile.id,
        members: {
          create: [{ role: MemberRole.ADMIN, profileId: profile.id }],
        },
        channels: {
          create: [{ name: 'general', profileId: profile.id }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('SERVER[POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
