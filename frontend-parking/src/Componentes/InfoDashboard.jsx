import TextModule from "./textModule";

export default function InfoDashboard({data,isBold,title}){
    return(
        <div className="bg-[#fff] p-7 pt-5 rounded-modules flex flex-col items-center w-full h-full">
    <h1 className=" font-normal text-blue100 text-sm">{title}</h1>
<div className=" w-2/3 h-full flex flex-col justify-evenly max-sm:justify-between max-sm:w-full max-sm:m-4 max-sm:whitespace-nowrap">
{ data.map(([prop1,prop2], index)=>(
    <TextModule key={index} text1={prop1} text2={prop2} isBold={isBold}/>
))}
</div>
        </div>
    )
    




}