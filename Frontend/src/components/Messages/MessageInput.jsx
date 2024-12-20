import React, { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../context/hooks/useSendMessage";
import { useAuthContext } from "../../context/AuthContext";
import MainInputFields from "./MainInputFields";
import useConversations from "../../store/useConversation";

const MessageInput = () => {
  const ref = useRef();

  const { authUser } = useAuthContext();
  const { setScannerResult, setScannerResultName } = useConversations();

  const { loading, sendMessage } = useSendMessage();
  const [activeForm, setActiveForm] = useState(false);
  const [kupac, setKupac] = useState("");
  const [ime, setIme] = useState("");
  const [web, setWeb] = useState("");
  const [savaGodine, setSavaGodine] = useState("");
  const [sava, setSava] = useState(false);
  const [pack, setPack] = useState(false);
  const [rez, setRez] = useState(false);

  const [messages, setMessages] = useState([{ ean: "", naziv: "", qty: 1 }]);

  const addMessage = () => {
    setScannerResult("");
    setScannerResultName("");
    const newMessage = { ean: "", naziv: "", qty: 1 };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = {
      messages,
      sava,
      toPack: pack,
      sellerId: ime,
      rez,
      buyer: kupac,
      opened: false,
      web: web,
      savaGodine: savaGodine,
    };

    await sendMessage(message);

    setActiveForm(false);
    setMessages([{ ean: "", naziv: "", qty: 1 }]);
    setKupac("");
    setSava(false);
    setPack(false);
    setRez(false);
    setSavaGodine("");
    setWeb("");
  };

  const updateMessage = (index, field, value) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, i) =>
        i === index ? { ...message, [field]: value } : message
      )
    );
  };
  return (
    <>
      {activeForm ? (
        <form className=" my-3" onSubmit={handleSubmit}>
          <button type="button" onClick={addMessage} className="ml-auto">
            Add Message
          </button>
          <div className="w-full relative">
            {messages.map((message, index) => (
              <MainInputFields
                key={index}
                index={index}
                ean={message.ean}
                naziv={message.naziv}
                qty={message.qty}
                updateMessage={updateMessage}
              />
            ))}
            <input
              type="text"
              placeholder="IME KUPCA"
              id="kupac"
              value={kupac}
              onChange={(e) => setKupac(e.target.value)}
              className="border my-2 text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
            />
            <select
              ref={ref}
              name="ime"
              id="ime"
              onChange={(e) => setIme(e.target.value)}
              className="border min-h-9 my-2 text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white"
            >
              <option value="" defaultValue>
                Izaberi prodavca
              </option>
              <option value="Mita Babic">Mita Babic</option>
              <option value="Tijana Vlatkovic">Tijana Vlatkovic</option>
              <option value="Bogdan Ostojic">Bogdan Ostojic</option>
              <option value="Jovan Milosavljevic">Jovan Milosavljevic</option>
              <option value="Dejan Nestorov">Dejan Nestorov</option>
              <option value="Nikola Milisic">Nikola Milisic</option>
              <option value="Danijel Osovnikar">Danijel Osovnikar</option>
              <option value="Zoran Icin">Zoran Icin</option>
              <option value="Branislav Cucin">Branislav Cucin</option>
              <option value="Aleksandar Peric">Aleksandar Peric</option>
              <option value="Aleksandra Sretovic">Aleksandra Sretovic</option>
              <option value="Aleksandra Vukasinovic">
                Aleksandra Vukasinovic
              </option>
              <option value="Denis Lavodic">Denis Lavodic</option>
              <option value="Ilija Popnovakov">Ilija Popnovakov</option>
              <option value="Milica Jesic">Milica Jesic</option>
              <option value="Bozidar Miljevic">Bozidar Miljevic</option>
              <option value="Miloslav Funtik">Miloslav Funtik</option>
              <option value="Adrijana Jokic">Adrijana Jokic</option>
              <option value="Dunja Jovanovic">Dunja Jovanovic</option>
              <option value="Dragan Corkovic">Dragan Corkovic</option>
              <option value="Jovan Stefanovic">Jovan Stefanovic</option>
              <option value="Katica Jovic">Katica Jovic</option>
              <option value="Marija Miletic">Marija Miletic</option>
              <option value="Nenad Kocar">Nenad Kocar</option>
              <option value="Nikola Savkovic">Nikola Savkovic</option>
              <option value="Uros Milutinovic">Uros Milutinovic</option>
              <option value="Borislav Mirkov">Borislav Mirkov</option>
              <option value="Luka Grbic">Luka Grbic</option>
            </select>
            <p className="my-2">Sava Osiguranje</p>
            <label
              className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
              htmlFor="savaDa"
            >
              Da
              <input
                type="radio"
                name="sava"
                id="savaDa"
                className="appearance-none"
                onChange={() => setSava(true)}
              />
            </label>
            <label
              className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
              htmlFor="savaNe"
            >
              Ne
              <input
                type="radio"
                name="sava"
                id="savaNe"
                className="appearance-none"
                onChange={() => setSava(false)}
              />
            </label>
            {sava ? (
              <>
                <label
                  className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
                  htmlFor="savaGodina"
                >
                  1 God
                  <input
                    type="radio"
                    name="savaGod"
                    id="savaGodina"
                    className="appearance-none"
                    onChange={() => setSavaGodine("1 Godina")}
                  />
                </label>
                <label
                  className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
                  htmlFor="savaDveGodine"
                >
                  2 God
                  <input
                    type="radio"
                    name="savaGod"
                    id="savaDveGodine"
                    className="appearance-none"
                    onChange={() => setSavaGodine("2 Godine")}
                  />
                </label>
              </>
            ) : null}
            <p className="my-2">Treba da se spakuje proizvod</p>
            <label
              className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
              htmlFor="packDa"
            >
              Da
              <input
                type="radio"
                name="pack"
                id="packDa"
                className="appearance-none"
                onChange={() => setPack(true)}
              />
            </label>
            <label
              className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
              htmlFor="packNe"
            >
              Ne
              <input
                type="radio"
                name="pack"
                id="packNe"
                className="appearance-none"
                onChange={() => setPack(false)}
              />
            </label>
            <p className="my-2">Vec odvojen na rezervaciji</p>
            <label
              className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
              htmlFor="rezDa"
            >
              Da
              <input
                type="radio"
                name="rez"
                id="rezDa"
                className="appearance-none"
                onChange={() => setRez(true)}
              />
            </label>
            <label
              className="m-2 checkbox-label p-2 cursor-pointer rounded-md"
              htmlFor="rezNe"
            >
              Ne
              <input
                type="radio"
                name="rez"
                id="rezNe"
                className="appearance-none"
                onChange={() => setRez(false)}
              />
            </label>
            {rez ? (
              <>
                <input
                  type="text"
                  placeholder="WEB ili IME"
                  id="webRez"
                  value={web}
                  onChange={(e) => setWeb(e.target.value)}
                  className="border text-sm rounded-lg inline-block w-44 px-2 py-2.5 bg-gray-600 text-white"
                />
              </>
            ) : null}
            <button
              type="submit"
              className="absolute end-0 myBtn flex items-center pe-0"
            >
              <BsSend className="w-6 h-6" />
            </button>
          </div>
        </form>
      ) : (
        <button
          className="p-2 m-4 my-3 w-11/12 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
          onClick={() => {
            setActiveForm(true);
            setTimeout(() => {
              ref.current.value = authUser.fullName;
              setIme(authUser.fullName);
            }, 100);
          }}
        >
          Send a order
        </button>
      )}
    </>
  );
};

export default MessageInput;
