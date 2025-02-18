import { useEffect, useState } from 'react'
import "./notifs.css"
import { getFriendsInvitations, getGamesInvitations } from '../api/api';
import { useWebSocket } from '../provider/WebSocketProvider';
import { useAuth } from '../provider/UserAuthProvider';
import { useNavigate, useLocation, } from 'react-router-dom';
import Loading from '../loading_page/Loading';
import InviteItem from './InviteNotif';
import GameNotif from './GameNotif';
import { useTranslation } from 'react-i18next';

function Notifications() {
	const {myUser} = useAuth();
	const {socketUser} = useWebSocket();
	const [inviteNotifShown, setInviteNotifShown] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [gameNotifShown, setGameNotifShown] = useState(false);

	const [myInviteNotifs, setFriendsNotifs] = useState([null]);
	const [myGameNotifs, setGameNotifs] = useState([null]);
	const navigate = useNavigate()
	const { subscribeToNotifs } = useWebSocket();
	const { t } = useTranslation();

	useEffect(() => {
		const handleNotif = (data) => {
			if (data["friendsInvitations"]) {
				const InviteNotifTmp = data["friendsInvitations"];
				setFriendsNotifs(InviteNotifTmp);

			}
			if (data["gamesInvitations"]) {
				const gameNotifTMp = data["gamesInvitations"];
				setGameNotifs(gameNotifTMp)
			}
			if (data["acceptGameInvitation"])
				handleJoinGame(data);
		};

		const unsubscribe = subscribeToNotifs(handleNotif);

		const initNotifs = async () => {
			setIsLoading(true)
			const myFriendData = await getFriendsInvitations();
			const myGameData = await getGamesInvitations();
			setFriendsNotifs(myFriendData);
			setGameNotifs(myGameData);
			setIsLoading(false)
		};

		initNotifs();

		return () => {
			unsubscribe();
		};
	}, [subscribeToNotifs]);

	const handleInviteNotifShown = () => {
		setInviteNotifShown(!inviteNotifShown);
		if (gameNotifShown === true)
			setGameNotifShown(false);
	}

	const handleGameNotifShown = () => {
		setGameNotifShown(!gameNotifShown);
		if (inviteNotifShown === true)
			setInviteNotifShown(false);
	}

	const handleJoinGame = (data) => {
		const myRoom = data["acceptGameInvitation"]
		const myLink =  "/globalGameMulti/" + myRoom
		navigate(myLink);
	}

    const declineInvitation = (senderUser) => {
        if (socketUser && socketUser.readyState === WebSocket.OPEN) {
            const data = {
                type: "DECLINE",
                invitationFrom: senderUser,
                to: myUser.id,
                parse: senderUser.id + "|" + myUser.id
            };
            socketUser.send(JSON.stringify(data));
        } else {
            console.log("WebSocket for invitations is not open");
        }
    };

    const acceptInvitation = (userInvited) => {
        if (socketUser && socketUser.readyState === WebSocket.OPEN) {
            const data = {
                type: "INVITE",
                invitationFrom: myUser.id,
                to: userInvited.id,
                parse: myUser.id + "|" + userInvited.id
            };
            socketUser.send(JSON.stringify(data));
        } else {
            console.log("WebSocket for invitations is not open");
        }
    };

	const declineGameInvitation = (userWhoInvites) => {
        if (socketUser && socketUser.readyState === WebSocket.OPEN) {
            const data = {
                type: "DECLINE-GameInvitation",
                userWhoInvites: userWhoInvites.id,
                userWhoDeclines: myUser.id,
            };
            socketUser.send(JSON.stringify(data));
        } else {
            console.log("WebSocket for invitations is not open");
        }
    };

	const acceptGameInvitation = (userWhoInvites) => {
        if (socketUser && socketUser.readyState === WebSocket.OPEN) {
            const data = {
                type: "ACCEPT-GameInvitation",
                userWhoInvites: userWhoInvites,
                userWhoAccepts: myUser,
            };
            socketUser.send(JSON.stringify(data));
        } else {
            console.log("WebSocket for invitations is not open");
        }
    };

	return (
		<div className="notifications">
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className="center-div">
						<h4
							onClick={() => handleInviteNotifShown()}
							type="button"
							className={`btn btn-outline-dark ButtonNotif ${inviteNotifShown ? 'active' : ''}`}
						>
							{t('notif.friend')}
						</h4>
						<h4
							onClick={() => handleGameNotifShown()}
							type="button"
							className={`btn btn-outline-dark ButtonNotif ${gameNotifShown ? 'active' : ''}`}
						>
							{t('notif.game')}
						</h4>
					</div>
					
					{inviteNotifShown ? (
						<div>
							{myInviteNotifs && myInviteNotifs.length === 0 ? (
								<div className="noNotif">{t('notif.invitation')}</div>
							) : (
								<div className={`inviteList ${myInviteNotifs.length >= 3 ? 'scroll' : ''}`}>
									{myInviteNotifs.map((user) => (
										<InviteItem
											key={user.id}
											myUser={user}
											declineInvitation={declineInvitation}
											acceptInvitation={acceptInvitation}
										/>
									))}
								</div>
							)}
						</div>
					) : (
						<div>
							{myGameNotifs && myGameNotifs.length === 0 ? (
								<div className="noNotif">{t('notif.invitation')}</div>
							) : (
								<div className={`inviteList ${myGameNotifs.length >= 3 ? 'scroll' : ''}`}>
									{myGameNotifs.map((user) => (
										<GameNotif
										key={user.id}
										myUser={user}
										declineGameInvitation={declineGameInvitation}
										acceptGameInvitation={acceptGameInvitation}
										/>
									))}
								</div>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}
export default Notifications
