import Candidates from "../components/candidates";
import Sidebar from "../components/sidebar";

const dashboard = () => {
  return (
    <div className="flex min-h-screen justify-center bg-default">
      <Sidebar />
      <Candidates />
    </div>
  );
};

export default dashboard;
