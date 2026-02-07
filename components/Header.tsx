'use client'
import { cn } from "@/lib/utils";

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SearchModal } from "./SearchModal";

const Header = () => {
    const pathName = usePathname()
  return (
    <header>
        <div className="main-container inner">
            <Link href="/">
            <Image src="/assets/logo-removebg-preview.png" alt="Vectra Logo" width={150} height={100} />
            </Link>
            <nav>
                <Link href="/" className={cn('nav-link',{
                    'is-active': pathName === '/',
                    'is-home': true
                })}>Home</Link>
                <SearchModal />
                <Link href="/coins" className={cn('nav-link',{
                    'is-active': pathName === '/coins',
                    'is-home': true
                })}>Coins</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header