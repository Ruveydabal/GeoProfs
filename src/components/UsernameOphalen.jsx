import { db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect, useMemo } from 'react';

function UsernameOphalen({ user }) {
    if (!user) return <>Onbekend</>;
    return <>{user.voornaam}</>;
}

export default UsernameOphalen;