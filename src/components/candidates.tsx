import { useEffect, useState } from "react";
import { type User } from "../types/user";
import axios from "axios";

const Candidates = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [shownUsers, setShownUsers] = useState<User[] | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const fetchUsers = () => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((users) => {
        setUsers(users.data);
        setShownUsers(users.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers();
    if (search) {
      const filteredUsers = users?.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ) as User[];
      setShownUsers(filteredUsers);
    }
  }, [search, users]);
  return (
    <div className="flex-1 p-8 pt-0 pl-0 flex flex-col gap-10">
      <Header setSearch={setSearch} />
      <div className="candidates bg-white p-8 rounded-lg">
        <div className="flex flex-col gap-8 h-[calc(100vh_-_13.25rem)] overflow-y-auto">
          {shownUsers?.length ? (
            shownUsers?.map((user) => (
              <div key={user.id} className="flex items-center gap-4">
                <img
                  className="w-14 h-14 rounded-full"
                  src={`https://avatars.dicebear.com/api/avataaars/${user.name}.svg`}
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="font-bold">{user.name}</span>
                  <span className="text-gray-500">{user.email}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full font-thin text-2xl">
              <h2 className="">No candidate found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Candidates;

const Header = ({
  img,
  setSearch,
}: {
  img?: string | null | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
}) => (
  <header className="flex justify-between items-center sticky top-0 pt-8 bg-default">
    <h2 className="font-montserrat text-2xl font-bold">Candidates</h2>
    <div className="right flex items-center gap-6">
      <div className="input-box flex bg-white rounded-xl px-4 py-2">
        <input
          className="bg-transparent focus:outline-none"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src="/icon/search.svg" alt="" />
      </div>
      <div className="notification cursor-pointer">
        <img src="/icon/notification.svg" alt="" />
      </div>
      <div className="profile cursor-pointer">
        <img
          className="rounded-full w-10"
          src={img ? img : "/img/profile.jpg"}
          alt=""
        />
      </div>
    </div>
  </header>
);
