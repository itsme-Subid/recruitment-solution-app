import { useEffect, useState } from "react";
import { type User } from "../types/user";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Filter from "./dialog/filter";
import { useAppSelector } from "@/redux/store";

const Candidates = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [shownUsers, setShownUsers] = useState<User[] | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const activeFilters = useAppSelector((state) => state.filter.activeFilter);
  const { toast } = useToast();
  const fetchUsers = () => {
    axios
      .get<User[]>("/candidates.json")
      .then((users) => {
        setUsers(users.data);
        setShownUsers(users.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
    if (search) {
      const filteredUsers = users?.filter((user) => {
        const nameMatch = user.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const countryMatch = activeFilters?.countries?.includes(user.country);
        const roleMatch = activeFilters?.roles?.includes(user.role);
        return nameMatch || countryMatch || roleMatch;
      }) as User[];
      setShownUsers(filteredUsers);
    } else {
      if (
        activeFilters &&
        users &&
        (activeFilters.countries || activeFilters.roles)
      ) {
        const filteredUsers = users?.filter((user) => {
          const countryMatch =
            activeFilters.countries?.length === 0 ||
            activeFilters.countries?.includes(user.country);
          const roleMatch =
            activeFilters.roles?.length === 0 ||
            activeFilters.roles?.includes(user.role);
          if (countryMatch || roleMatch) {
            return true;
          }
        });
        setShownUsers(filteredUsers);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeFilters]);
  return (
    <div className="flex-1 p-8 pt-0 pl-0 flex flex-col gap-10">
      <Header setSearch={setSearch} numCandidates={shownUsers?.length} />
      <div className="candidates bg-white p-8 rounded-lg">
        <div className="flex flex-col h-[calc(100vh_-_13.25rem)] overflow-y-auto gap-6">
          {shownUsers?.length ? (
            shownUsers?.map((user, index) => (
              <div key={index} className="flex items-center gap-4 mr-8">
                <img
                  className="w-14 h-14 rounded-full"
                  src={`https://avatars.dicebear.com/api/avataaars/${user.name}.svg`}
                  alt=""
                />
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl">{user.name}</h3>
                  <p className="text-gray-500">{user.role}</p>
                </div>
                <p className="text-gray-500 ml-auto">{user.country}</p>
              </div>
            ))
          ) : loading ? (
            <div className="skeletons flex flex-col gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
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
  numCandidates,
  setSearch,
}: {
  img?: string | null | undefined;
  numCandidates?: number | null | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { toast } = useToast();
  return (
    <header className="flex justify-between items-center sticky top-0 pt-8 bg-default">
      <h2 className="font-montserrat text-2xl font-bold">
        Candidates{numCandidates && numCandidates > 0 && ` (${numCandidates})`}
      </h2>
      <div className="right flex items-center gap-6">
        <Filter />
        <div className="input-box flex bg-white rounded-xl px-4 py-2">
          <input
            className="bg-transparent focus:outline-none"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <img className="w-4" src="/icon/search.svg" alt="" />
        </div>
        <div
          onClick={() =>
            toast({
              title: "Coming Soon",
              description: "This feature is coming soon",
            })
          }
          className="notification cursor-pointer"
        >
          <img src="/icon/notification.svg" alt="" />
        </div>
        <div
          onClick={() =>
            toast({
              title: "Coming Soon",
              description: "This feature is coming soon",
            })
          }
          className="profile cursor-pointer"
        >
          <img
            className="rounded-full w-10"
            src={img ? img : "/img/profile.jpg"}
            alt=""
          />
        </div>
      </div>
    </header>
  );
};
