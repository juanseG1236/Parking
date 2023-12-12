import app from "./app.js";
import  "./database.js"

async function main(){

   await app.listen(app.get("port"))
    console.log("pruebita")

}



main();