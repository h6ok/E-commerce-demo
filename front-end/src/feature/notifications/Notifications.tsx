import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Notifications() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/user");
    return;
  }

  return (
    <div className="pt-20">
      <div className="w-full flex flex-col">
        <div className="h-150 flex justify-center items-start">
          <div className="shadow-md">
            <table className="scroll-auto">
              <thead>
                <tr className="h-10">
                  <th className="w-30 text-center">Date</th>
                  <th className="w-120 text-center">Subject</th>
                  <th className="w-30 text-center">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-10">
                  <td className="text-center">aa</td>
                  <td className="text-center">bb</td>
                  <td className="text-center">cc</td>
                </tr>
                <tr className="h-10">
                  <td className="text-center">aa</td>
                  <td className="text-center">bb</td>
                  <td className="text-center">cc</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
