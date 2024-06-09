"use client";
import { useState } from "react";
import Image from "next/image";

// create the type for the location item
interface Location {
  id: string;
  address: string;
  imgPath: string;
  name: string;
}

// dummy data used for the list of locations.
const dummyData: Location[] = [
  {
    id: "1",
    address: "Sydney, Australia",
    imgPath: "/scotland-island-1.jfif",
    name: "Scotland Island",
  },
  {
    id: "2",
    address: "Lorem ipsum, Dolor",
    imgPath: "/the-charles-grand-brasseire-and-bar.jfif",
    name: "The Charles Grand Brasseire & Bar",
  },
  {
    id: "3",
    address: "Dolor, Sit amet",
    imgPath: "/bridge-climb.png",
    name: "Bridge Climb",
  },
  {
    id: "4",
    address: "Sydney, Australia",
    imgPath: "/scotland-island-2.jfif",
    name: "Scotland Island",
  },
  {
    id: "5",
    address: "Ecetera veni, Vidi vici",
    imgPath: "/clam-bar.png",
    name: "Clam Bar",
  },
  {
    id: "6",
    address: "Sydney, Australia",
    imgPath: "/vivid-festival.png",
    name: "Vivid Festival",
  },
];

export default function Home() {
  const [locations, setLocations] = useState(dummyData);
  const [draggedLayerIndex, setDraggedLayerIndex] = useState<number | null>(
    null
  );

  return (
    <main className="grid place-content-center py-5">
      <ul>
        {locations.map((location, i) => {
          const draggedLayer =
            draggedLayerIndex !== null ? locations[draggedLayerIndex] : null;

          return (
            <>
              {i === 1 && (
                <section
                  className={`w-full flex item-center justify-center h-[3px]${
                    draggedLayer ? " bg-[#1E9BF0]" : " bg-white"
                  }`}
                >
                  {draggedLayer && (
                    <div className="w-72 bg-white h-16 rounded-md border p-4 flex items-center gap-x-3 relative bottom-[32px] shadow-[0_8px_16px_0_rgba(6, 31, 48, 0.08)]">
                      <Image
                        alt={draggedLayer?.name || ""}
                        className="rounded-[5px] h-8 w-8 object-cover"
                        height={32}
                        objectFit="cover"
                        src={draggedLayer?.imgPath || ""}
                        width={32}
                      />
                      <p className="leading-6 text-[17px]">
                        {draggedLayer?.name}
                      </p>
                    </div>
                  )}
                </section>
              )}
              <li
                key={location.id}
                className="bg-white flex items-center gap-x-6 px-10 py-5 border-y border-white"
                draggable
                onDragOver={e => e.preventDefault()}
                onDragStart={() => setDraggedLayerIndex(i)}
                onDrop={e => {
                  e.preventDefault();
                  if (!draggedLayer || draggedLayerIndex === null) return;

                  const reorderedLocations = locations.map((layer, j) => {
                    // if current item index is less than or greater than both the item we are dropping on and the currently grabbed item,
                    // then the layer won't be moved
                    if (
                      (j < i && j < draggedLayerIndex) ||
                      (j > i && j > draggedLayerIndex)
                    ) {
                      return layer;
                      // else if current item index is equal to the item we are dropping on, then the grabbed item should replace that spot
                    } else if (j === i) {
                      return draggedLayer;
                      // else shift item up or down one spot
                    } else if (i < draggedLayerIndex) {
                      return locations[j - 1];
                    } else {
                      return locations[j + 1];
                    }
                  });

                  setLocations(reorderedLocations);
                  setDraggedLayerIndex(null);
                }}
              >
                <Image
                  alt={location.name}
                  className="rounded-xl h-24 w-24 object-cover"
                  height={96}
                  src={location.imgPath}
                  width={96}
                />
                <section className="flex flex-col gap-y-1 px-1">
                  <p className="leading-6 text-[19px]">{location.name}</p>
                  <div className="flex items-center gap-x-1">
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 12 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.99987 2.25C4.4995 2.25 3.2832 3.46629 3.2832 4.96667C3.2832 6.46704 4.4995 7.68333 5.99987 7.68333C7.50024 7.68333 8.71654 6.46704 8.71654 4.96667C8.71654 3.46629 7.50024 2.25 5.99987 2.25ZM1.7832 4.96667C1.7832 2.63787 3.67107 0.75 5.99987 0.75C8.32867 0.75 10.2165 2.63787 10.2165 4.96667C10.2165 7.03945 8.72093 8.76293 6.75 9.11681V12C6.75 12.4142 6.41421 12.75 6 12.75C5.58579 12.75 5.25 12.4142 5.25 12V9.11686C3.27894 8.76308 1.7832 7.03955 1.7832 4.96667ZM1.5 13.75C1.08579 13.75 0.75 14.0858 0.75 14.5C0.75 14.9142 1.08579 15.25 1.5 15.25H10.5C10.9142 15.25 11.25 14.9142 11.25 14.5C11.25 14.0858 10.9142 13.75 10.5 13.75H1.5Z"
                        fill="#A8A9AE"
                      />
                    </svg>
                    <p className="text-[17px] leading-[22px] text-[#A8A9AE]">
                      {location.address}
                    </p>
                  </div>
                </section>
              </li>
            </>
          );
        })}
      </ul>
    </main>
  );
}
