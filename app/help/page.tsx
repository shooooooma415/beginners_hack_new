import { Main } from 'next/document';
import './style.css';
import { useLatLng } from '@/contexts/LatLngContext';

export default function help() {
    return(
    <>
        <h2 className="custom-heading">ヘルプページ</h2>

        <ul className="main">ログインについて
        </ul>
        <ul >
            <li className ="text-center">このサイトはログインが<span className="highlight">必須条件</span>になっています。</li>
            <li className ="text-center">ログインされない場合は利用できません。</li>
            <li className ="text-center">ログインにはGogleアカウントを使用しています。</li>
            <li className ="text-center">ログインページで新規登録することができます。</li>

        </ul>

        <ul className="main">投稿について</ul>
        <ul>
            <li className ="text-center">投稿ページでは投稿する写真や画像の選択・日付・コメントが入力できます</li>
            <li className ="text-center"></li>
        </ul>

        <ul className="main">写真の選択について</ul>
        <ul>
            <li className ="text-center">ここでは<span className="highlight">画像・写真ファイルのみ</span>アップロードができます。</li>
            <li className ="text-center">それ以外のファイルはアップロードができませんのでご注意ください。</li>
            <li className ="text-center">またファイル名に半角の英数字以外が含まれているとアップロードができない場合があります。</li>
            <li className ="text-center">そのはファイル名を変更して再度アップロードしてください。</li>
        </ul>




    </>

    );
}