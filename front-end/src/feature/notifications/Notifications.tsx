export default function Notifications() {
  return (
    <div className="pt-20">
      <div className="w-full flex flex-col">
        <div className="h-150 flex justify-center items-start">
          <div className="shadow-md">
            <table className="scroll-auto">
              <thead>
                <tr className="h-10">
                  <th className="w-30 text-center">日付</th>
                  <th className="w-120 text-center">件名</th>
                  <th className="w-30 text-center">カテゴリー</th>
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
