import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import ItemList1 from "./ItemList1";
import ItemListReserve from "./itemListReserve";
import ItemListReserveT from "./itemListReserveT";
import ItemListTicketT from "./itemListTicketT";

export default function List({ dataList, dataItems, isTiny, type }) {
  const items = Object.values(dataItems);
  const arrayItems = items[0];
  console.log(arrayItems)

  if (type == "Reserve") {
    return (
      <div className=" flex flex-col w-full gap-7">
        <div className=" flex w-full justify-evenly">
          <div className=" basis-[5%] text-center max-sm:"></div>

          {dataList.map((item, index) => (
            <div className=" basis-[13%] text-center flex items-end max-sm:text-[0.5rem]">
              {item}
            </div>
          ))}
        </div>

        {isTiny ? (
          <div className="flex flex-col gap-4">
            {arrayItems.map((item, index) => (
              <ItemListReserveT Data={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {arrayItems.map((item, index) => (
              <ItemListReserve Data={item} />
            ))}
          </div>
        )}
      </div>
    );
  } else if (type == "Ticket") {
    return (
      <div className=" flex flex-col w-full gap-7">
        <div className=" flex w-full justify-evenly">
          <div className=" basis-[5%] text-center max-sm:"></div>

          {dataList.map((item, index) => (
            <div className=" basis-[13%] text-center flex items-end max-sm:text-[0.5rem]">
              {item}
            </div>
          ))}
        </div>

        {isTiny ? (
          <div className="flex flex-col gap-4">
            {arrayItems.map((item, index) => (
              <ItemListTicketT Data={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {arrayItems.map((item, index) => (
              <ItemList Data={item} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}
