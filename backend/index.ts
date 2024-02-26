import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';

type TFli = {
    id:number;
    start_time:any;
    end_time:any;
    price:any;
    retreat_place:string;
    destination:string;
    id_seats:any;
    id_airplane:any;
}

let Fli: TFli[] = [
    {
        id:1,
        start_time:"12:00am",
        end_time:"03:00pm",
        price:"$3,000",
        retreat_place:"USA",
        destination:"Paris",
        id_seats:"D010",
        id_airplane:"I3049",
    }
]

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use((req, res, next) => {
    //     if (ic.caller().isAnonymous()) {
    //         res.status(401);
    //         res.send();
    //     } else {
    //         next();
    //     }
    // });

    app.post('/create',(req, res)=>{
        const flights = Fli.find((flights)=>flights.id === parseInt(req.body.id));
        if(flights){
            res.status(400).json({msg:"El vuelo ya esta en uso.", data:flights});
            return;
        }
        req.body.id = Fli[Fli.length - 1].id + 1;
        Fli.push(req.body);
        res.status(200).json({msg:"El vuelo fue añadido exitosamente"});
    });

    app.get('/get',(req,res)=>{
        res.status(200).json({msg:"El vuelo se ha obtenido con exito", data:Fli});
    });

    app.put('/update/:id', (req, res)=>{
        const flights = Fli.find((flights)=>flights.id === parseInt(req.params.id));

        if(!flights){
            res.status(404).json({msg:"El vuelo ha actualizar no existe."});
            return;
        }

        const UFLi = {...flights, ...req.body};

        Fli = Fli.map((e) => e.id === UFLi.id ? UFLi : e);

        res.status(200).json({msg:"El vuelo se actualizo con exito"});
    });

    app.delete('/delete/:id',(req, res)=>{
        Fli = Fli.filter((e) => e.id !== parseInt(req.params.id));
        res.status(200).json({msg:"El vuelo se elimino con exito", data:Fli});
    });



    app.post('/test', (req, res) => {
        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    app.get('/health', (req, res) => {
        res.send().statusCode = 204;
    });

    return app.listen();
});
