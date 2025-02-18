import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../provider/UserAuthProvider';
import { useTranslation } from 'react-i18next';
import { getUser, sendTournamentName} from '../api/api';
import './tournamentAlias.css';

function TournamentAlias({ Actif, setActif }) {
	const { t } = useTranslation();
	const { myUser, setUser } = useAuth();
	const [input, setInput] = useState(myUser.username || '');
	const [modif, setModif] = useState(false);
	const [valide, setValide] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleClick = async () => {
		if (modif) {
			const usernameRegex = /^[a-zA-Z0-9.-]{3,11}$/;

			if (input === '') {
				setErrorMessage("registerPage.idRequired");
				return;
			} else if (!usernameRegex.test(input)) {
				setErrorMessage("registerPage.idCara");
				return;
			}

			try {
				const response = await sendTournamentName(input);
				if (response.success) {
					const tmpUser = await getUser();
					setUser(tmpUser);
					setInput('');
					setModif(false);
					setActif(false);
					setValide(false);
					setErrorMessage('');
				} else if (response.success === false) {
					setErrorMessage("profilPage.errorUser");
				}
			} catch (error) {
				console.log('Failed user');
			}
		} else {
			setInput('');
			setValide(true);
			setActif(true);
			setModif(true);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (modif) {
			handleClick();
		}
	};

	return (
	<div>
		<Form onSubmit={handleSubmit}>
			<p className="para-ps-2">{t("registerPage.idTournament")}</p>
			<Form.Group className="inputTournoi" controlId="User">
				<Form.Control
					type="text"
					placeholder={myUser.tournamentUsername}
					value={modif ? input : myUser.tournamentUsername}
					onChange={(e) => setInput(e.target.value)}
					readOnly={!modif}
					className="form-test-2"
				/>
			</Form.Group>
		</Form>

		{errorMessage && <p className="error-TournamentAlias-2">{t(errorMessage)}</p>}

		<Button variant="outline-dark" className="custom-TournamentAlias-2"
			onClick={handleClick} disabled={Actif && !valide}>
			{modif ? t("profilPage.valide") : t('profilPage.modif')}
		</Button>
	</div>
	);
}

export default TournamentAlias;