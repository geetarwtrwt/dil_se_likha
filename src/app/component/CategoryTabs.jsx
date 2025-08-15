import React from "react";

let categoryTab = [
  { name: "All", tab: "all" },
  { name: "Dil Se Baaten", tab: "Dil Se Baaten" },
  { name: "Khayalon Ki Dunia", tab: "Khayalon Ki Dunia" },
  { name: "Rozana Ki Diary", tab: "Rozana Ki Diary" },
];
function CategoryTabs({ tabSelect, setTabSelect }) {
  return (
    <div className="flex justify-evenly flex-col md:flex-row gap-2">
      {categoryTab.map((e, index) => {
        return (
          <button
            onClick={() => setTabSelect(e.tab)}
            key={index}
            className={`${
              tabSelect === e.tab
                ? "bg-primary text-background"
                : "text-foreground"
            }  transition duration-500 border-2 border-primary px-2 md:px-8 py-2 rounded-md font-semibold `}
          >
            {e.name}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
