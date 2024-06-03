'use client'

import { IMessage, INotification } from '@/components/LatestMessage';
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from 'aws-amplify/auth';
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';
import { cookies } from 'next/headers';
import { fetchAuthSession } from 'aws-amplify/auth/server';

async function fetchNotifications() {

    const response = await fetch("/api/history", {
        method: "GET",
        credentials: "include",

    });
    const notifications = await response.json();
    //console.log(notifications.map((notif: INotification) => {notif.data.map((d:) => d.id)}));
    return notifications.map((notif: INotification) => {return (((notif.data) as string).replace(/\\/g, ''))});

  }
  


function History() {
    const [notifications, setNotifications] = useState()

    useEffect (() => {
        const fetchData = async () => {
            const notifs = await fetchNotifications();
            console.log(notifs);
            setNotifications(notifs);
        }
        fetchData();
    }, [])

  return (
    <div>History</div>
  )
}

export default (History)