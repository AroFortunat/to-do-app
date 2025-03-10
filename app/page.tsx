'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextGenerateEffect } from "./Components/ui/text-generate-effect";
import { verifUser } from '@/app/action/User/verif'
export default function Home() {
  const { user, isSignedIn } = useUser()
  const [Loader, setLoader] = useState<boolean>(true);
  const verification_Utilisateur_Existant_Et_Ajouter_A_la_Base_si_Inexistant = async (id: string, email: string) => {
     await verifUser(id, email)
  }
  useEffect(() => {
      if (user) {
        verification_Utilisateur_Existant_Et_Ajouter_A_la_Base_si_Inexistant(user.id,user.emailAddresses[0].emailAddress)
      }
  }, [user]);
  const router = useRouter()
  const handleClickSignIn = () => {
    router.push('/sign-in')
  }
  const handleClickSignUp = () => {
    router.push('/sign-up')
  }
  const handleClickRedirectTask = () => {
    router.push(`/task/${user?.id}`)
  }
  const handleClickNewTask = () => {
    router.push(`/new-task`)
  }
  useEffect(() => {
    if (user) {
      setLoader(false)
    }
  }, [user]);
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://plus.unsplash.com/premium_photo-1683309567810-4d232ee83d2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <TextGenerateEffect duration={3} filter={false} words="To Do App" />
            <div className="my-5">
              <p className="mb-5 text-2xl">
                Avec <span className="text-primary font-bold"> To DO </span>, transformez votre quotidien en une expérience fluide et sans stress. Planifiez, priorisez et accomplissez vos objectifs grâce à une interface intuitive conçue pour <span className="font-bold text-primary"> vous faire gagner du temps </span> et de la sérénité.
              </p>
            </div>
            {isSignedIn ? (
              <>
                {Loader ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-28"></div>
                  </div>
                ) : (
                  <div className="flex mb-5">
                    <button
                      onClick={handleClickRedirectTask}
                      className="btn btn-primary text-xl">Accéder a vos liste de taches</button>
                    <button
                      onClick={handleClickNewTask}
                      className="btn btn-primary ml-4 text-xl btn-outline">Ajouter une nouvelle Taches</button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={handleClickSignIn}
                  className="btn btn-primary text-xl">Sign in</button>
                <button
                  onClick={handleClickSignUp}
                  className="btn btn-primary ml-4 text-xl btn-outline">Sign up</button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
