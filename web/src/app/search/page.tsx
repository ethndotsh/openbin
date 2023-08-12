"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Database } from "types/supabase";
import { Profile } from "types/types";

export default function SearchUserPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Profile[]>([]);

  const supabase = createClientComponentClient<Database>();

  const searchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .ilike("username", `%${search}%`);
    if (error) {
      console.error(error);
      return;
    }
    setResults(data);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Search for a user</h1>
        <input
          className="focus:shadow-outline h-10 w-80 rounded-lg border px-3 py-2 text-base text-gray-700 placeholder-gray-600"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="focus:shadow-outline mt-2 h-10 w-80 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-base font-semibold text-white shadow transition duration-200 ease-in-out hover:bg-blue-700 focus:outline-none"
          onClick={searchUsers}
        >
          Search
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        {results.map((result) => (
          <div key={result.id}>
            <p>{result.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
