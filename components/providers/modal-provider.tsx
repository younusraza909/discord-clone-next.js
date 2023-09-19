'use client';

import { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';
import InviteModal from '../modals/invite-modal';
import EditServer from '../modals/edit-server-modal';
import MembersModal from '../modals/members-modal';
import CreateChannelModal from '../modals/create-channel-modal';

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <CreateServerModal />
      <InviteModal />
      <EditServer />
      <MembersModal />
      <CreateChannelModal />
    </div>
  );
}

export default ModalProvider;
