"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { faBell, faBars, faXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ViewMode from "./mini-component/ViewMode";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BACKEND_API;


function Navbar() {
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [isClick, setIsClick] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isFixed, setIsFixed] = useState(false); // State to manage if the navbar is fixed
  const [isSearchPopupVisible, setIsSearchPopupVisible] = useState(false); // State to manage search popup visibility
  const [contents, setContents] = useState([{
    _id: "",
    title: ""
  }]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContents, setFilteredContents] = useState([{ _id: "", title: "" }]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    // Function to handle scroll
    const handleScroll = () => {
      const bannerHeight = 112; // Adjust this to the actual height of your ad banner (in pixels)
      if (window.scrollY > bannerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  useEffect(() => {
    const getAllContents = async () => {
      try {
        const response = await fetch(`${API}api/content/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const result = await response.json();
        if (!response.ok) {
          throw Error(result.msg);
        }
        setContents(result.content);
      } catch (err: any) {
        addNotification(err.message, "error");
      }
    }

    getAllContents();
  }, [isSearchPopupVisible])

  useEffect(() => {
    setSearchQuery(transcript);
    handleSearch();
  }, [transcript]);

  function toggleMenu() {
    setIsClick(!isClick);
  }
  function handleActiveLink(linkName: string) {
    setActiveLink(linkName);
    setIsClick(false);
  }

  function handleSearch() {
    if (!searchQuery) {
      setFilteredContents([]);
      return;
    }
    const filtered = contents.filter(content =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContents(filtered);
  }

  function toggleSearchPopup() {
    setIsSearchPopupVisible(!isSearchPopupVisible);
    setSearchQuery("");
    setFilteredContents([]);
  }

  function handleContentClick(id: string) {
    router.push(`/post/${id}`);
    toggleSearchPopup();
  }

  function startListening() {
    SpeechRecognition.startListening({ continuous: false });
  }

  if (!browserSupportsSpeechRecognition) {
    addNotification("Your browser does not support voice recognition.", "error");
    return null;
  }

  const navItems = [
    { id: "home", name: "Home", link: "/" },
    {
      id: "notification",
      name: (
        <>
          <span className="hidden sm:inline">
            <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
          </span>
          <span className="inline sm:hidden">Notification</span>
        </>
      ),
      link: "/notification",
    },
    { id: "about", name: "About", link: "/about" },
    { id: "signup", name: "Sign Up", link: "/register" },
    { id: "login", name: "Login", link: "/login" },
    {
      id: "search",
      name: (
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5 cursor-pointer" onClick={toggleSearchPopup} />
      ),
      link: "#",
    },
  ];

  return (
    <>
      <Image
        src="/GyanShristiAdBanner.png"
        width={500}
        height={500}
        alt="Advertisement"
        className="w-screen h-28 object-cover"
      />
      <nav
        className={`dark:bg-[#1A1A1A] dark:text-white w-screen z-50 shadow-md ${isFixed ? "fixed top-0" : "relative"
          }`}
      >
        <div className="h-16 flex justify-between items-center pl-1 pr-3 bg-white dark:bg-[#1A1A1A] shadow-md ">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="CMS Logo"
              width={45}
              height={45}
              className="rounded-full"
            />
          </Link>
          <ul className="hidden sm:flex justify-between gap-8 font-semibold">
            {navItems.map((item, index) => (
              <Link href={item.link} key={index}>
              {" "}
              <li
                className={`dark:text-[#E0E0E0] hover:bg-[rgb(162,204,243)] dark:hover:bg-[#1E58C8] p-2 ${
                  activeLink === item.id ? "border-b-2 border-[#1E58C8]" : ""
                }`}
                onClick={() => handleActiveLink(item.id)}
              >
                {item.name}
              </li>
            </Link>
            ))}

            <ViewMode />
          </ul>

          {/* Mobile Menu Toggle */}
          <FontAwesomeIcon
            icon={isClick ? faXmark : faBars}
            onClick={toggleMenu}
            className="h-[60%] sm:hidden cursor-pointer"
          />
        </div>

        {/* Mobile Menu */}
        {isClick && (
          <ul className="w-screen flex flex-col items-start font-semibold bg-white dark:bg-[#1A1A1A] sm:hidden">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="w-screen flex justify-center hover:bg-[rgb(162,204,243)] dark:hover:bg-[#1E58C8] p-2"
                onClick={() => handleActiveLink(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Search Popup */}
      {isSearchPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[300]">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Search Content</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
            <button
              onClick={toggleSearchPopup}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded mt-2"
            >
              Close
            </button>
            <button
              onClick={startListening}
              className={`w-full bg-green-500 text-white px-4 py-2 rounded mt-2 ${listening ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={listening}
            >
              {listening ? "Listening..." : "Voice Search"}
            </button>
            {filteredContents.length > 0 ? (
              <ul className="mt-4 flex flex-col">
                {filteredContents.map((content) => (
                  <li onClick={()=>handleContentClick(content._id)} key={content._id} className="border-b border-gray-300 py-2">
                    {content.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4">No results found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;