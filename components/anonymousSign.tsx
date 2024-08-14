// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// async function signInAnonymously() {
//   const { user, session, error } = await supabase.auth.signIn({
//     provider: 'anonymous',
//   });

//   if (error) {
//     console.error('Error signing in:', error.message);
//     return { user: null, session: null, error }; // エラーを返す
//   } else {
//     console.log('User signed in:', user);
//     return { user, session, error: null }; // ユーザーとセッションを返す
//   }
// }

// // 現在のセッションを取得
// function getCurrentSession() {
//   const session = supabase.auth.session(); // 現在のセッションを取得
//   console.log('Current session:', session);
//   return session; // セッションを返す
// }

// async function signOut() {
//   const { error } = await supabase.auth.signOut();

//   if (error) {
//     console.error('Error signing out:', error.message);
//   } else {
//     console.log('User signed out');
//   }
// }

// // デフォルトエクスポートは匿名サインイン関数
// export default signInAnonymously;

// // 他の関数もエクスポートする場合
// export { getCurrentSession, signOut };
