"use client";

import WeaterComponent from "./_components/WeaterComponent"
import LoginComponent from "./_components/LoginComponent"

import {  useSession } from 'next-auth/react'


export default function Page() {

    const { data: session } = useSession();

    console.log("User id: " + session?.user.email);
    
    return (
        <>
            {session?.user ? <WeaterComponent /> : <LoginComponent />}
        </>
    )

}
