import { Member, Profile, Server } from '@prisma/client';

export type ServerWithMemebersWithProfile = Server & {
  members: (Member & { profile: Profile })[];
};
