import "./StyleSheets/InputText.css"


export default function InputText(){
    return(

        
        <div className="input-container">
        <input type="text" name="text" className="input" placeholder="Enter text" />
        <div className="highlight" />
      </div>
      
    )
}