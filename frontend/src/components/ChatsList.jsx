import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import NoChatsFound from './NoChatsFound';

function ChatsList() {
  const { getMyChatPartners , chats , isUsersLoading , setSelectedUser} = useChatStore();


  useEffect(() => {
    getMyChatPartners();
  },[getMyChatPartners])


  // if(isUsersLoading) return<UsersLoadingSkeleton/>

  // if(chats.length === 0 ) return <NoChatsFound/>

  return (
    <div>
      Chatlist
    </div>
  )

  
}

export default ChatsList
