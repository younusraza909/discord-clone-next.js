import { db } from './db';

export async function FindOrCreateConversation(
  memberIdOne: string,
  memberIdTwo: string
) {
  try {
    let conversation;
    conversation =
      (await findConversation(memberIdOne, memberIdTwo)) ||
      (await findConversation(memberIdTwo, memberIdOne));

    if (!conversation) {
      conversation = await createConversation(memberIdOne, memberIdTwo);
    }

    return conversation;
  } catch (error) {
    return null;
  }
}

async function createConversation(memberIdOne: string, memberIdTwo: string) {
  try {
    let conversation = await db.conversation.create({
      data: {
        memberOneId: memberIdOne,
        memberTwoId: memberIdTwo,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    return conversation;
  } catch (error) {
    console.log('[ERROR FINDING CONVERSATION]', error);
    return null;
  }
}

async function findConversation(memberIdOne: string, memberIdTwo: string) {
  try {
    let conversation = await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberIdOne }, { memberTwoId: memberIdTwo }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
    return conversation;
  } catch (error) {
    console.log('[ERROR CREATING CONVERSATION]', error);
    return null;
  }
}
