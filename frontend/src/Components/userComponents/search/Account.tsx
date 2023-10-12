interface AccountProps {
  datas?: { username: string }[];
}

const Account: React.FC<AccountProps> = ({ datas = [] }) => {
  return (
    <div className="mt-5 ml-5">
      <h1>
        {datas.length > 0 ? (
          datas.map((data, index) => <div key={index}>{data.username}</div>)
        ) : (
          <div>No matching usernames found</div>
        )}
      </h1>
    </div>
  );
};

export default Account;
