import React, { useEffect, useRef, useState } from "react";
import useConversation from "../../store/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const iframeRef = useRef(null);
  const [color, setColor] = useState(false);

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  // const profilePic = fromMe ? authUser.img : selectedConversation?.img;
  const bgColor = fromMe
    ? "bg-blue-500"
    : message.opened || color
    ? "bg-pink-500"
    : "";
  const formatedTime = extractTime(message.createdAt);

  useEffect(() => {
    async function test() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/messages/${selectedConversation._id}/${message._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    if (color) {
      test();
    }
  }, [color]);

  const handlePrint = async () => {
    const iframe = iframeRef.current;

    // Write content to the iframe
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
      <head>
        <title></title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h2 {
            margin: 10rem;
            text-align:center;
            color: #333;
            font
          }
          p, span {
            font-size: 24px;
            margin: 10px 0;
          }
          
          .group{
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid black;
          }

          .group:last-of-type{
          border-bottom: unset;
          }
        </style>
      </head>
      <body>
      <h2><strong>Prodavac:</strong> ${message.sellerId}</h2>
        <div class="group">
        <p><strong>EAN:</strong></p>
        <span>${message.ean}</span>
        </div>
        <div class="group">
        <p><strong>Naziv proizvoda:</strong></p>
        <span>${message.productName}</span>
        </div>
        <div class="group">
        <p><strong>Sava:</strong></p>
        <span>${message.sava ? "Da" : "Ne"}</span>
        </div>
        <div class="group">
        <p><strong>Zapakovati:</strong></p>
        <span>${message.toPack ? "Da" : "Ne"}</span>
        </div>
        <div class="group">
        <p><strong>Odvojeno:</strong></p>
        <span>${message.rez ? "Da" : "Ne"}</span>
        </div>
        <div class="group">
        <p><strong>Kupac:</strong></p>
        <span>${message.buyer}</span>
        </div>
        <h2><strong>Vreme kreiranja:</strong> ${extractTime(
          message.createdAt
        )}</h2>
      </body>
      </html>
    `);
    doc.close();

    // Trigger print
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setColor(true);
  };

  return (
    <div
      className={`chat ${chatClassName} hover:cursor-pointer`}
      onClick={() => {
        if (!fromMe) handlePrint();
      }}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ">
          <img id="avatar" src="/infos_404.png" alt="icon photo" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bgColor} pb-2`}>
        EAN: {message.ean} <br />
        {message.productName}
      </div>
      <div className="chat-footer opacity-50 text-xs text-white flex gap-1 items-center">
        {formatedTime}
      </div>
      <iframe
        ref={iframeRef}
        style={{ display: "none" }}
        title="Print Message Frame"
      />
    </div>
  );
};

export default Message;

function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}
function padZero(number) {
  return number.toString().padStart(2, "0");
}
