export default function TextModule({ text1, text2 ,isBold }) {
    const EstioBold = ""
console.log(isBold)

  return (

    <div className="flex flex-row justify-between items-center w-full ">
      <div className= {isBold?"text-lg font-medium max-sm:text-sm ":""}>
      {text1}

      </div>
      <div className={isBold?"font-Raleway text-sm ":""}>
      {text2}

      </div>
    </div>
  );
}
