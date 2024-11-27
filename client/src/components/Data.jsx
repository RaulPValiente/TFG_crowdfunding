const Data = ({ title, value }) => {
    return (
        <div className="flex flex-col items-center w-[150px] rounded-lg">
          <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-black/60 border border-white/10 rounded-t-lg w-full text-center truncate">{value}</h4>
          <p className="font-epilogue font-normal text-[16px] text-white bg-[#13131a] px-3 py-2 w-full rounded-b-[10px] text-center">{title}</p>
        </div>
      )
}

export default Data