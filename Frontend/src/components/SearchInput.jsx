import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useConversation from "../store/useConversation";
import useGetConversations from "../context/hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Minimalni broj karaktera je 3!");
    }
    const converastion = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (converastion) {
      setSelectedConversation(converastion);
      setSearch("");
    } else {
      toast.error("Nije pronadjen korisnik!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button
        type="submit"
        className="btn  btn-circle bg-white text-black hover:text-white"
      >
        <CiSearch className="size-8" />
      </button>
    </form>
  );
};

export default SearchInput;
