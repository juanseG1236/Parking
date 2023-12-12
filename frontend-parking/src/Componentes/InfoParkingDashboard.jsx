export default function InfoParkingDashboard() {
  return (
    <div className="flex flex-col  bg-[#fff] p-7 pt-5 rounded-modules w-full justify-evenly h-full items-center">
      <h1 className="title ">Informacion parqueadero</h1>
      <div className="flex flex-col h-1/2 w-full justify-evenly items-center">
        <div className="flex w-full justify-evenly items-center ">
        <p  className="w-1/3 text-right text-lg font-semibold">Puestos disponibles</p>
          <p  className="w-1/3 text-center text-6xl font-bold">30</p>
        </div>

        <div className="flex w-full justify-evenly items-center ">
          <p  className="w-1/3 text-right text-lg font-semibold">Puestos Ocupados</p>
          <p  className="w-1/3 text-center text-6xl font-bold">30</p>
        </div>
      </div>
    </div>
  );
}
