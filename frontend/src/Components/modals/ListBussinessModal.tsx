interface ListBusinessProps {
  close : () => void
}

export default function ListBusiness({ close }: ListBusinessProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      >
      <div className="bg-white p-4 rounded-lg">
        <h1 className="">Modal Content</h1>
        <button onClick={close}> X </button>
      </div>
    </div>
  );
}
