import Button from 'react-bootstrap/Button';
import './button.css'
import myIcon from '../assets/login_page/42.svg';
import { useTranslation } from 'react-i18next';


const host = import.meta.env.VITE_HOST;
const id = import.meta.env.VITE_ID42;

function button42() {
	const { t } = useTranslation();
	return (
	  <div>
	  <Button href={`https://api.intra.42.fr/oauth/authorize?client_id=${id}&redirect_uri=https%3A%2F%2F${encodeURIComponent(location.host)}%2Fcheck42user&response_type=code`}
	  variant="outline-dark" 
	  className="custom-42">{t('loginPage.log42')} 
	  <img src={myIcon} style={{ marginLeft: '1vw', width: '2vw', height: '2.2vw'}} />
	  </Button>
	</div>
	);
  }
  
  export default button42;
