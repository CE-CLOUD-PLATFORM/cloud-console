import React, { ReactNode } from "react";
interface PageProps {
  params: {
    user_id: string;
  };
}

const data = [
  { name: "Default" },
  { name: "Project1" },
  { name: "Project2" },
  { name: "Project3" },
  { name: "Project4" },
];
const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="flex h-full flex-col">
      <div>
        <h1>Your Subject:{params.user_id}</h1>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-3 content-start">
        {data.map((data: any): ReactNode => {
          return (
            <div id={data.name} className=" flex-[30%] h-[20%] border flex-grow-0 flex justify-center items-center">
              {data.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
