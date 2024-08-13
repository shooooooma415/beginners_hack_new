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

  const handleSocialLogin = async (prov: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: prov,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.log(error);
      return;
    }

    // `data` の構造に応じた処理を実装する
    if (data) {  // 例: URL プロパティを使用する場合
      router.push("/home");  // 認証成功後に /home にリダイレクト
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
