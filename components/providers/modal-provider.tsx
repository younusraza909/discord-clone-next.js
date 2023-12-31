'use client';

import { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';
import InviteModal from '../modals/invite-modal';
import EditServer from '../modals/edit-server-modal';
import MembersModal from '../modals/members-modal';
import CreateChannelModal from '../modals/create-channel-modal';
import LeaveServerModal from '../modals/leave-server-modal';
import DeleteServerModal from '../modals/delete-server-modal';
import DeleteChannelModal from '../modals/delete-channel-modal';
import EditChannelModal from '../modals/edit-channel-modal';
import MessageFileModal from '../modals/message-file-modal';
import DeleteMessageModal from '../modals/delete-message-modal';

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
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </div>
  );
}

export default ModalProvider;
