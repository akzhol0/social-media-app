type

function MyInput() {
  return (
    <input
      value={header}
      onChange={(e) => setHeader(e.target.value)}
      placeholder="Header"
      className="w-[300px] h-[30px] border rounded ps-2"
      type="text"
    />
  );
}

export default MyInput;
