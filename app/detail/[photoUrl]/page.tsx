'use client'
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import deleteRowById from "./deletaPost";
import { useRouter } from "next/navigation";
import './style.css';

interface Comment {
    comment: string;
    event_date: string; 
    latitude: string;
    longitude: string;
    id: string;
    user_id: string;
}

export default function DetailPage() {
    const pathname = usePathname()
    const photoUrl = pathname.replace(/^\/detail\//, '');
    console.log(photoUrl);
    const [user_id, setUserId] = useState<string>("");
    const public_url = `https://xydxmymbedqcfqzzjmgk.supabase.co/storage/v1/object/public/public-image-bucket/img/${user_id}/`;

    const [loadingState, setLoadingState] = useState("hidden");
    const [comment, setComment] = useState<Comment>();
    const supabase = createClientComponentClient();
    const router = useRouter()

    const handleDelete = () => {
        comment&& deleteRowById(comment.id, comment.user_id, photoUrl)
        router.push('/home')
    } 

    useEffect(() => {
        supabase.auth.getUser().then((user) => {
            if (user.data.user === null) {
                // ユーザーがサインインしていない場合、警告を表示
                return alert("ログインしてください");
            }
            setUserId(user.data.user.id);
        });
    }, []);

    const image = async () => {
        const tempUrlList: string[] = [];
        setLoadingState("flex justify-center");

        const { data } = await supabase
            .storage
            .from('public-image-bucket')
            .getPublicUrl(photoUrl)
            ;

        await fetchComment(photoUrl);
        setLoadingState("hidden");
    };

    const fetchComment = async (imageUrl: string) => {
        // const tempComments: { [key: string]: Comment[] } = {};

        const { data, error } = await supabase
            .from('comments')
            .select('user_id, id, comment, event_date, latitude, longitude') // 修正：created_at を event_date に変更
            .eq('image_name', photoUrl);

        if (error) {
            console.log(error);
        }

        if (data !== null) {
            setComment(
                {
                    comment: data[0].comment,
                    event_date: data[0].event_date,
                    latitude: data[0].latitude,
                    longitude: data[0].longitude,
                    id: data[0].id,
                    user_id: data[0].user_id,
                }
            );
        }

    };


    useEffect(() => {
        if (user_id) {
            image();
        }
    }, [user_id]);

    return (
        <div className="w-screen max-w-3xl mx-auto">
    <div className={loadingState} aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
    <ul className="ul">
        <li className="li">
            <img className="object-cover" style={{ aspectRatio: 1 / 1 }} src={public_url + photoUrl} alt={photoUrl} />
            <ul className="ul2">
                <li className="comment">{comment?.comment}</li>
                <span className="datelog">
                    日付: {comment?.event_date} {/* 修正：created_at を event_date に変更 */}
                </span>
            </ul>
        </li>
    </ul>
    <div className="button-group">
    <button className="position"><Link href={{ pathname: "/home", query: { longitude: comment?.longitude, latitude: comment?.latitude } }}>
        位置に移動する
    </Link></button>
    <button className="delete" onClick={() => handleDelete()}>
        削除
    </button>
    </div>
</div>

    );
}