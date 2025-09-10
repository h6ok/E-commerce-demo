import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

export type Notification = {
  date: string;
  subject: string;
  category: string;
};

export function Notifications() {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  });

  const datas: Notification[] = [
    {
      date: "2025/01/01",
      subject: "New Arrivals",
      category: "Products",
    },
  ];

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/user");
    return;
  }

  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="w-full text-4xl pt-10">
          <div className="flex items-center justify-center">
            <div className="border-b-4 border-double">Notifications</div>
          </div>
        </div>
        <div className="pt-20 h-150 flex justify-center items-start">
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
                {datas.map((data) => (
                  <tr className="h-10">
                    <td className="text-center">{data.date}</td>
                    <td className="text-center">{data.subject}</td>
                    <td className="text-center">{data.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
