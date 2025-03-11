// "use client";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select";
// import { Button } from "@/components/ui";
// import { useState } from "react";
// import { AreaCheckbox } from "@/components/dashboard";

// export function AreaSelectLists() {
//   // const transactionLists = [
//   //   "PruServices Change Beneficiary",
//   //   "PruServices Change Frequency",
//   //   "PruServices Pay Premium",
//   //   "PruServices Payment History",
//   //   "PruServices Change Payment Method/ Auto-pay"
//   // ];

//   const ciuSub = [
//     "Update Profile",
//     "Change Dispatch Address",
//     "Update Beneficiary"
//   ];

//   const [selectedItem, setSelectedItem] = useState<string[]>([]);

//   const onSelectItem = (item: string) => {
//     setSelectedItem(prevItems => {
//       if (item === "CIU") {
//         if (selectedItem.length === 3) {
//           setSelectedItem([]);
//         } else setSelectedItem(ciuSub);
//       } else if (!prevItems.includes(item)) {
//         return [...prevItems, item];
//       }
//       return prevItems.filter(i => i !== item);
//     });
//   };

//   const onApply = () => {
//     console.log(selectedItem);
//   };

//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select a transaction/s" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Transaction</SelectLabel>
//           <AreaCheckbox
//             text="CIU"
//             checked={selectedItem.includes("CIU") || selectedItem.length === 3}
//             onCheckedChange={() => onSelectItem("CIU")}
//           />
//           <div className="ml-5">
//             {ciuSub.map(sub => (
//               <AreaCheckbox
//                 textClassname="!text-xs"
//                 key={sub}
//                 text={sub}
//                 checked={selectedItem.includes(sub)}
//                 onCheckedChange={() => onSelectItem(sub)}
//               />
//             ))}
//           </div>
//           {/* {transactionLists.map(transaction => (
//             <CheckboxDemo key={transaction} text={transaction} />
//           ))} */}
//         </SelectGroup>
//         <div className="flex justify-end">
//           <Button
//             variant="default"
//             className="w-16 h-full m-3"
//             onClick={onApply}
//           >
//             Apply
//           </Button>
//         </div>
//       </SelectContent>
//     </Select>
//   );
// }
