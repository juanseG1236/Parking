export function ImgCircle({pathI}){
return(
    <div className="flex items-center justify-center w-full h-full rounded-full bg-darkBlue overflow-hidden">

    <img className="  w-full h-full object-cover"
    src={require(`../Imagenes/${pathI}`)}
    alt={`foto de ${pathI}`}
    />
    </div>
)
    
}