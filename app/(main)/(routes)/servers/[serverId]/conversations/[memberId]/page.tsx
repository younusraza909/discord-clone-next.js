import { ChatHeader } from '@/components/chat/chat-header';
import { FindOrCreateConversation } from '@/lib/conversation';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface MemberIdProps {
  params: { serverId: string; memberId: string };
}

async function MemberId({ params }: MemberIdProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!currentMember) {
    return redirect(`/`);
  }

  const conversation = await FindOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        name={otherMember.profile.name}
        serverId={params.serverId}
        imageUrl={otherMember.profile.imageUrl}
        type='conversation'
      />
    </div>
  );
}

export default MemberId;
