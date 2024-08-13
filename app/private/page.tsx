import Link from 'next/link'
import  ImageApp from "../../components/imageApp";

export default function Index() {
  return (
    <>
      <h1 className="mb-4 pt-28 text-4xl">プライベートページ</h1>
      <Link href="/">homeへ
      </Link>
    </>
  );
}