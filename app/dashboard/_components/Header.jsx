"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';

function Header() {

    const router=useRouter();

    const goDashboard=()=>{
        router.push('/dashboard');
    }

    const goQueshions=()=>{
        router.push("/queshion");
    }

    const goUpgrade=()=>{
        router.push("/upgrade");
    }

    const goHow=()=>{
        router.push("/working");
    }
    

    const path=usePathname();
    useEffect(() =>{
        console.log(path);
    })

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer *
                ${path == '/dashboard' && 'text-primary font-bold'}
                `}
                onClick={goDashboard}
                >Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer *
                ${path == '/dashboard/questions' && 'text-primary font-bold'}
                `}
                onClick={goQueshions}
                >Queshions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer *
                ${path == '/dashboard/upgrade' && 'text-primary font-bold'}
                `}
                onClick={goUpgrade}
                >Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer *
                ${path == '/dashboard/how' && 'text-primary font-bold'}
                `}
                onClick={goHow}
                >How it works ?</li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Header