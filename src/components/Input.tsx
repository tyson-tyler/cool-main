import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import queryString from "query-string";
const Input = () => {
  const [text, setText] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = {
      searchQuery: text,
    };
    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  };

  return (
    <form
      autoComplete="off"
      className="bg-gray-100 text-black dark:text-white dark:bg-gray-800 rounded-md flex items-center pl-[4px] lg:w-[700px] md:w-[500px] sm:[200px] w-[200px] h-10"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="search"
        placeholder="Search Ai Videos"
        id="search"
        className="bg-transparent w-full h-full px-5 outline-none"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <label htmlFor="search">
        <Button
          variant={"ghost"}
          className="rounded-full"
          type="submit"
          aria-label="search"
        >
          <BiSearch className="w-5 h-5  text-black dark:text-white" />
        </Button>
      </label>
    </form>
  );
};

export default Input;
