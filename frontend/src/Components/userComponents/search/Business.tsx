import React, { useEffect, useState } from "react";
import { AccountProps } from "../../../interface/interface";

type SetUserIdFunction = (userId: string) => void;

const Business: React.FC<AccountProps & { setUserId: SetUserIdFunction }> = ({ datas = [], pending, setUserId }) => {
  const [accountId, setAccountId] = useState<string>('');

  useEffect(() => {
    setUserId(accountId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  return (
    <div className="mt-5 ml-2">
      <div>
        {pending ? (
          ""
        ) : datas.length > 0 ? (
          datas.map((data, index) => (
            <div key={index} className="flex gap-3" onClick={() => setAccountId(data.userId._id)}>
              <img
                src={data?.userId?.profileImage}
                className="rounded-full my-3 w-9 h-9"
                alt="image"
              />
              <p className="font-medium text-xl mt-4 cursor-pointer">
                {data.bussinessName} 
              </p>
            </div>
          ))
        ) : (
          <div
            key="no-match"
            className="flex justify-center items-center sm:items-start sm:justify-start"
          >
            No matching Business found
          </div>
        )}
      </div>
    </div>
  );
};

export default Business;
