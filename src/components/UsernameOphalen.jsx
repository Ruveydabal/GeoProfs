function UserName({ userId, fetchUser }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        let mounted = true;
        fetchUser(userId).then(user => {
            if (mounted && user) setUserName(user.voornaam);
        });
        return () => mounted = false;
    }, [userId, fetchUser]);

    return <>{userName || 'Onbekend'}</>;
}