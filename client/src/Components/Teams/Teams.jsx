import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { filteredByTeam } from '../../redux/actions';

export default function Team() {
    const teams = useSelector((state) => state.allTeams); // Se suscribe al estado global
    const isLoading = useSelector((state) => state.isLoading);
    const clean = useSelector((state) => state.isClean);

    const dispatch = useDispatch();
    const [selectedTeam, setSelectedTeam] = useState('all'); // se define el estado local
    useEffect(() => {
        if (clean) {
            setSelectedTeam('all'); // Escucha el estado global, y si es verdadero actualiza el estado local
        }
    }, [clean]);
    console.log(clean)
    console.log(selectedTeam)

    const handleOptionSelect = (e) => {
        const option = e.target.value;
        setSelectedTeam(option); // actualizar el estado con la opcion seleccionada
        dispatch(filteredByTeam(option)); // enviar la opcion seleccionada a la accion
    };

    return (
        <div>
            Temperaments: {isLoading? 'Loading...': 
            <select value={selectedTeam} onChange={handleOptionSelect}>'
            <option value="all">All</option>
            {teams.map((team) => (
                <option key={team.name} value={team.name}>
                    {team.name}
                </option>
            ))}
            </select>
            }
        </div>
    )
}