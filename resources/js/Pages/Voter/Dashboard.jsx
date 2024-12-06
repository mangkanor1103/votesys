import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Candidates = ({ electionId, positionId }) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        // Fetch candidates from your API
        axios.get(`/api/candidates/${electionId}/${positionId}`)
            .then(response => {
                setCandidates(response.data); // Set the candidates with the photo URL
            })
            .catch(error => console.error('Error fetching candidates:', error));
    }, [electionId, positionId]);

    return (
        <div>
            <h1>Candidates</h1>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate.id}>
                        <h2>{candidate.name}</h2>
                        <p>{candidate.platform}</p>
                        <img src={candidate.photo_url} alt={candidate.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Candidates;
