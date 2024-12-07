import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTournamentSocket } from '../provider/TournamentSocketProvider';
const Countdown = ({ roomId, idTournament }) => {
  const [seconds, setSeconds] = useState(3);
  const { tournamentSocket } = useTournamentSocket();
  const navigate = useNavigate();
  const isTournament = true;

  // Décrémenter les secondes à chaque seconde
  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // Lancer le jeu après le compte à rebours
  useEffect(() => {
    if (seconds === 0) {
      launchGame();
    }
  }, [seconds]);

  const launchGame = () => {
    const dataToSend = {
      "type": "NAVIGATE-TO-MATCH",
    };
    tournamentSocket.send(JSON.stringify(dataToSend));

    const maxScore = 5;
    const powerUp = false;
    navigate(`/globalGameMulti/${roomId}`, { state: { maxScore, powerUp, isTournament, idTournament } });
  };

  return (
    <div className="countdown">
      {seconds !== 0 && <span className="seconds">{seconds}</span>}
      {seconds === 0 && <span className="loader-2">Launching game...</span>}
    </div>
  );
};

export default Countdown;
