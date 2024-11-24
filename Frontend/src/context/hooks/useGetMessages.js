import React, { useEffect, useState } from "react";
import useConversations from "../../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversations();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
