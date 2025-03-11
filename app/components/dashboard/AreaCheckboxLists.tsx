"use client";

import { Checkbox } from "@/components/common";
import { useTransactionStore } from "@/store/transaction";
import { useEffect, useRef, useState } from "react";

const AreaCheckboxLists = () => {
  const ciuSub = [
    "Update Profile",
    "Change Dispatch Address",
    "Update Beneficiary"
  ];

  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const { getData, setDataKey } = useTransactionStore(state => state);

  const hasMounted = useRef(false);

  const onSelectItem = (item: string) => {
    setSelectedItem(prevItems => {
      if (item === "All") {
        if (selectedItem.length === 3) {
          setSelectedItem([]);
        } else setSelectedItem(ciuSub);
      } else if (!prevItems.includes(item)) {
        return [...prevItems, item];
      }
      return prevItems.filter(i => i !== item);
    });
  };

  useEffect(() => {
    if (hasMounted.current) {
      setDataKey(selectedItem);
    } else {
      (async () => {
        await getData();
      })();
      hasMounted.current = true;
    }
  }, [selectedItem, getData, setDataKey]);

  return (
    <div className="flex">
      <Checkbox
        text="All"
        checked={selectedItem.includes("All") || selectedItem.length === 3}
        onCheckedChange={() => onSelectItem("All")}
      />
      <div className="flex">
        {ciuSub.map(sub => (
          <Checkbox
            textClassname="!text-xs"
            key={sub}
            text={sub}
            checked={selectedItem.includes(sub)}
            onCheckedChange={() => onSelectItem(sub)}
          />
        ))}
      </div>
    </div>
  );
};

export default AreaCheckboxLists;
