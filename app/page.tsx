"use client"
import { Dispatch, SetStateAction } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import GoogleButton from "@/components/socialLogin/googleButton";
import FacebookButton from "@/components/socialLogin/facebookButton";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function SignInForm(props: {
  showModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { showModal } = props;
  const supabase = createClientComponentClient();
  const router = useRouter();  // useRouter フックを初期化

  const handleSocialLogin = async (prov: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: prov,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `http://localhost:3000/home`,  // リダイレクト先の URL
      },
    });
  

    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      <div>
        <GoogleButton handleClickMethod={handleSocialLogin} />
      </div>
      <div>
        <FacebookButton handleClickMethod={handleSocialLogin} />
      </div>
    </>
  );
}
