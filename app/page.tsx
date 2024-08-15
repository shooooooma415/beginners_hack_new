"use client"
import { Dispatch, SetStateAction } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import GoogleButton from "@/components/socialLogin/googleButton";
import { useRouter } from 'next/navigation';
import styles from './signInForm.module.css';
import Image from 'next/image';
import Link from "next/link";

export default function SignInForm() {
  
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSocialLogin = async (prov: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: prov,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `https://up-load-image.vercel.app/home`,
      },
    });
  
    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.googleSin}>
        <Image
          className={styles.Image}
          src="/imagefile/MyMapIcon.png"
          width={1000}
          height={1000}
          alt="My Map Icon"
        />
        <h1 className={styles.title}>My Map</h1>
        <p className={styles.subTitle}>Googleアカウントでサインイン</p>
        <div className={styles.googleButton}>
          <GoogleButton handleClickMethod={handleSocialLogin} />
        </div>
        <p className={styles.signUp} >
        Googleアカウントを作成 
        </p>
        <Link className={styles.signUpButton} href={"https://support.google.com/accounts/answer/27441?hl=ja-JP"}>
          新規登録
        </Link>
      </div>
    </div>
  );
}
