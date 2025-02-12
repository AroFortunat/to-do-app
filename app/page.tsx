'use client'

import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const handleClickSignIn = ()=>{
    router.push('/sign-in')
  }
  const handleClickSignUp = ()=>{
    router.push('/sign-up')
  }
  return (
    <div>
      <button 
      onClick={handleClickSignIn}
      className="btn btn-primary">Sign in</button>
      <button 
      onClick={handleClickSignUp}
      className="btn btn-primary">Sign up</button>
    </div>
  );
}
