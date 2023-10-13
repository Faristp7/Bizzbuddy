import { AccountProps } from "../../../interface/interface";

const Account: React.FC<AccountProps> = ({ datas = [], pending }) => {
  return (
    <div className="mt-5 ml-2">
      <div>
        {pending ? (
          ""
        ) : datas.length > 0 ? (
          datas.map((data) => (
            <div key={data._id} className="flex gap-3">
              <img
                src={data.profileImage}
                className="rounded-full my-3 w-9 h-9"
                alt="image"
              />
              <p className="font-medium text-xl mt-4 cursor-pointer">
                {data.username}
              </p>
            </div>
          ))
        ) : (
          <div
            key="no-match"
            className="flex justify-center items-center sm:items-start sm:justify-start"
          >
            No matching usernames found
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
