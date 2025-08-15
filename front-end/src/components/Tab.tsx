import { useState } from "react";

type TabChild = {
  id: string; // must be unique on One Tab Component
  label: string;
  component: React.ReactNode;
};

type TabProps = {
  tabs: TabChild[];
};

export default function Tab({ tabs }: TabProps) {
  const [selected, setSelected] = useState<string>(tabs[0].id);

  const isSelected = (id: string) => {
    return id === selected;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center">
        {tabs.map((tab: TabChild) => (
          <div
            className="p-5 cursor-pointer transition hover: text-lg"
            key={tab.id}
            onClick={() => setSelected(tab.id)}
          >
            <div>{tab.label}</div>
          </div>
        ))}
      </div>
      {tabs.map((tab: TabChild) => (
        <>{isSelected(tab.id) && <div className="p-20">{tab.component}</div>}</>
      ))}
    </div>
  );
}
