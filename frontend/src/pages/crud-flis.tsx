"use client";
import { useEffect, useState } from 'react';

import axios from 'axios';

type TFli = {
    id?:any;
    start_time:any;
    end_time:any;
    price:any;
    retreat_place:string;
    destination:string;
    id_seats:any;
    id_airplane:any;
}
type TRes = {
    msg: string;
    data?: any
}


const headers = {
    headers: {
        "Content-Type": "application/json",
    }
}

export default function CrudFliPage() {
    useEffect(() => {
        getEvents();
    }, []);

    const [events, setEvents] = useState<TFli[]>([]);
    const [event, setEvent] = useState<TFli>({
        start_time: "00:00",
        end_time: "00:00",
        price: "",
        retreat_place: "",
        destination: "",
        id_seats: "",
        id_airplane: ""
    });

    const [isEditable, setIsEditable] = useState(false);

    const onChange = (e: any) => {
        const data: any = event;
        data[e.target.name] = e.target.value;
        setEvent(data);
    }



    const getEvents = async () => {
        try {
            const response = await axios.get<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/get`);

            if (response.data.data) {
                setEvents(response.data.data);
            }
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const createEvents = async () => {
        try {
            await axios.post<TRes>(`${process.env.NEXT_PUBLIC_API_REST_URL}/create`, event, headers);
            getEvents();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const updateEvent = async (id:number) => {
        try {
            await axios.put<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/update/${id}`,
                event,
                headers
            );
            getEvents();
            setIsEditable(false);
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const deleteEvent = async (id: number) => {
        try {
            await axios.delete<TRes>(
                `${process.env.NEXT_PUBLIC_API_REST_URL}/delete/${id}`,
            );
            getEvents();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    }

    const preUpdate = (e:TFli) => {
        setEvent(e);
        setIsEditable(true);
    }

    return (
        <div>
            <h1>CRUD De Vuelos</h1>
            <div>
                <label htmlFor="destination">Ingresa tu destino:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='destination'
                    placeholder='Destino'
                /><br/>
                <label htmlFor="start_time">Ingresa el inicio del vuelo:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='start_time'
                    placeholder='Inicio'
                /><br/>
                <label htmlFor="end_time">Ingresa el final del vuelo:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='end_time'
                    placeholder='Fin'
                /><br/>
                <label htmlFor="retreat_place">Ingresa el lugar de despegue:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='retreat_place'
                    placeholder='Lugar'
                /><br/>
                 <label htmlFor="price">Ingrese el coste de su vuelo:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='price'
                    placeholder='Monto'
                /><br/>
                <label htmlFor="id_airplane">Ingresa el numero de tu avion:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='id_airplane'
                    placeholder='Avion'
                /><br/>
                <label htmlFor="id_seats">Ingresa tu numero de asiento:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='id_seats'
                    placeholder='Asiento'
                /><br/>
            </div>
            <button onClick={createEvents}>Agregar vuelo</button>
            <table>
                <tr>
                    <th>Destino</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Despegue</th>
                    <th>Precios</th>
                    <th>Asiento</th>
                    <th>Avion</th>
                </tr>
                {events.map((event, index) => (
                    <tr key={index}>
                        <td>{event.destination}</td>
                        <td>{event.start_time}</td>
                        <td>{event.end_time}</td>
                        <td>{event.retreat_place}</td>
                        <td>{event.price}</td>
                        <td>{event.id_seats}</td>
                        <td>{event.id_airplane}</td>
                        <td>
                            <button onClick={() => deleteEvent(event.id ?? 0)}>Delete</button>
                        </td>
                        <td>
                            <button onClick={() => preUpdate(event)}>Update</button>
                        </td>
                    </tr>
                ))}
            </table>

            {
                isEditable && (
                    <div>
                        <h2>Formulario para actualizar</h2>
                        <label htmlFor="destination">Ingresa tu destino:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={event.destination}
                            name='destination'
                        /><br/>
                        <label htmlFor="start_time">Ingresa el inicio del vuelo:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={event.start_time}
                            name='start_time'
                        /><br/>
                        <label htmlFor="end_time">Ingresa el final del vuelo:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={event.end_time}
                            name='end_time'
                        /><br/>
                        <label htmlFor="place">Ingresa el lugar de donde despegas:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={event.retreat_place}
                            name='retreat_place'
                        /><br/>
                        <label htmlFor="price">Ingresa el monto de tu vuelo:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={event.price}
                            name='price'
                        /><br/>
                        <label htmlFor="id_seats">Ingresa tu numero de asiento:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={event.id_seats}
                            name='id_seats'
                        /><br/>
                        <label htmlFor="id_airplane">Ingresa el numero de tu vuelo:</label><br />
                        <input
                            type="text"
                            onChange={(e) => onChange(e)}
                            defaultValue={event.id_airplane}
                            name='id_airplane'
                        /><br/>
                        <button onClick={() => updateEvent(event.id ?? 0)}>Guardar</button>
                    </div>
                )
            }
        </div>
    );
}
