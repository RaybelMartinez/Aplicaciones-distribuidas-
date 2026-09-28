const express = require("express");


const app = express();
const PORT = 3000;

app.use(express.json());

//variables globales
let tareas = [];

/* ===============================
   SERVICIOS
================================ */

/* 1. Saludo Basico */
app.post("/saludo", (req,res) =>{
    const {nombre}=req.body;
    if (!nombre){
        return res.json({
            success:false,
            error: "Dime tu nombre"
        });
    }
    res.json({
        estado:true,
        mensaje: `Hola ${nombre}`
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

/* 2. Calculadora de operaciones */
app.post("/calculadora", (req,res) =>{

    const{a,b, operacion}= req.body;
        if(a=== undefined|| b=== undefined || !operacion){
        return res.json({
            success : false,
            error: "Falta numero"
        });
    }

    let resultado;

    switch (operacion){
        case "suma":
            resultado = a+b;
            break;

        case "resta":
            resultado = a-b;
            break;

        case "division":
            resultado = a/b;
            break;

        case "multiplicacion":
            resultado = a*b;
            break;

        default:
            return res.json({
                estado: false,
                error: "Operacion no valida"
            });
    }
    
    res.json({
        estado: true,
        resultado: resultado
    });

});

//3.CRUD Basico
app.post("/crear", (req,res) =>{
    const {id, titulo, completada} = req.body;
    if (id === undefined || titulo === undefined || completada === undefined) {
        return res.json({
            success: false,
            error: "Faltan datos"
        })
    }
    //Declaro existe
    let existe = false;

    //Recorrer array mediante estrucutura
    for (let i= 0; i< tareas.length; i++){
        if (tareas[i].id === id){
            existe = true;
            break;
        }
    }

    if (existe){
        return res.json({
            estado: false,
            error: "ID ya existe"
        });
    }
    
    const nuevaTarea = {
        id, titulo, completada};
        tareas.push(nuevaTarea);

        res.json({
            estado: true,
            tareas: nuevaTarea
        });
    });

app.get("/tareas", (req,res) => {
    res.json({
        estado: true,
        tareas: tareas
    })
});

app.put("/tareas/:id", (req,res) => {
    let id = Number(req.params.id);
    // Veo que exita
    if (Number.isNaN(id)){
        return res.json({estado: false,error: "ID no existe"});
    }
    // Busco tarea
    let indice= -1;

    for (let i = 0; i<tareas.length; i++){
        if (tareas[i].id === id){
            indice = i;
            break;
        }
    }

    //si no existe
    if (indice === -1){
        return res.json({estado: false, error: "No existe"});
    }

    //Actualiza

    const {titulo, completada} = req.body;

    if (titulo !== undefined){
        tareas [indice].titulo = titulo;
    }

    if (completada !== undefined){
        tareas[indice].completada= completada;
    }

    //Responder
    res.json({estado: true, tarea: tareas[indice]});
});

app.delete("/tareas/:id", (req,res) => {
    let id = Number(req.params.id)

    if (Number.isNaN(id)){
        return res.json({estado:false, error: "No existe"});
    }

    let indice= -1;

    for (let i = 0; i<tareas.length; i++){
        if (tareas[i].id === id){
            indice = i;
            break;
        }
    }

    if (indice==-1){
        return res.json({ estado:false, error: "No existe"});
    }

    tareas.splice(indice,1);

    res.json({
        estado :true , mensaje: "Se elimino con exito"});
});
//4 Validar pass
app.post("/validar-password", (req,res) =>{
    const {contrasena} = req.body;
                if (!contrasena){
                    return res.json({
                        success:"Error",
                        esValida: false,
                        errores: ["Error de password"]
                    });
                }

    let errores = [];
                //Al menos 8 caracteres
                if (contrasena.length <8 ){
                    errores.push ("Debe tener minimo 8 caracteres");
                }

                // Letra mayuscula y minuscula
                if (!/[A-Z]/.test(contrasena)){
                    errores.push("Debe tener una letra mayuscula");
                }

                if (!/[a-z]/.test(contrasena)){
                    errores.push("Debe tener una minuscula");
                }

                //Validacion numero
                if (!/[0-9]/.test(contrasena)){
                    errores.push("Debe tener un numero");
                }

            if (errores.length === 0){
                return res.json({
                    estado: "Password valida",
                    esValida: true,
                    errores: []
                });
            } else {
                return res.json ({
                    estado: "Password invalida",
                    esValida: false,
                    errores: errores
                });
            }
});
//5 Convertir
app.post("/convertir-temperatura", (req,res) =>{
    const {valor, desde, hacia} = req.body;
        if (valor === undefined || ! desde || !hacia){
            return res.json({
                success : "error",
                valorOriginal: null,
                valorConvertido: null,
                escalaOriginal: desde || null,
                escalaConvertida: hacia || null
            });
        }

    let resultado = valor;
        //Convercion C
        let celcius;

        if(desde === "C"){
            celcius = valor;
        } else if (desde === "F"){
            celcius = (valor-32)*5/9;
        } else if (desde === "K"){
            celcius = (valor-273.15);
        }

        //De celcius a destino
        if (hacia === "C"){
            resultado = celcius;
        } else if(hacia === "F"){
            resultado = (celcius * 9/5)+32
        } else if (hacia === "K"){
            resultado = celcius+273.15;
        }

    return res.json({
        estado: "Conversion Exitosa",
        valorOriginal : valor,
        valorConvertido: Number(resultado.toFixed (2)),
        escalaOriginal: desde,
        escalaConvertida: hacia
    });
});
//6 Buscar array
app.post("/buscar", (req,res) =>{
    const {array, elemento}= req.body;
        if(!Array.isArray(array) || elemento === undefined){
            return res.json({
                estado: "error",
                encontrado: false,
                indice: null,
                tipoElemento: "Error de informacion"
            });
        }
    const indice = array.indexOf(elemento);
    const encontrado = indice !== -1;

    return res.json({
        estado: "Busqueda completada",
        encontrado: encontrado,
        indice: encontrado ? indice : -1,
        tipoElemento: typeof elemento
    })
});
//7. Contador de palabras
app.post("/contar-palabras", (req,res)=>{
    const {texto}=req.body;
        if(!texto){
            return res.json({
                estado: "Valor",
                totalPalabras: null,
                totalCaracteres: null,
                palabrasUnicas: null
            })
        }
    const palabras = texto.trim().split(/\s+/); /*Trim elimina espacios al inicio y al final
                                                y split separa por uno o mas espacios
                                                EJEMPLO ["Hola","mundo"] */
    const totalPalabras= palabras.length;

    const totalCaracteres= texto.length;
    /*Si quisera contacon sin espacios seria
    const totalCaracteres = texto.replace(/\s/g, "").length;*/

    const palabrasUnicas= new Set(palabras).size;
    // const totalUnicas = palabrasUnicas.size;

    return res.json ({
        estado : "Conteo completado",
        totalPalabras: totalPalabras,
        totalCaracteres: totalCaracteres,
        palabrasUnicas: palabrasUnicas
    });
});