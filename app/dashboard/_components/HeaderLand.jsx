"use client"
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
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
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>

      <nav className='conatiner mx-auto px-4 py-4 flex items-center justify-between'>
        <Link href='/'>
          <Image src="/logo.svg" alt='Logo' height={60} width={200} 
            className='h-12 w-auto object-contain'
          />
        </Link>
      
        <div className='flex items-center space-x-4'>

          <SignedIn>
            
                    <ul className='hidden md:flex gap-6 '>
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
                   

          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements:{
                avatarBox:"w-10 h-10",
              },
            }} />
          </SignedIn>
        </div>
       
        </nav>
    </div>
  )
}

export default Header