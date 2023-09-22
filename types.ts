import { Member, Profile, Server } from '@prisma/client';

import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SockerIOServer } from 'socket.io';

export type ServerWithMemebersWithProfile = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SockerIOServer;
    };
  };
};
