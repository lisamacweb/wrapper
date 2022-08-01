import Link from "next/link";

export default function Home() {
  return (
    <div>
      Welcome Page
      <div>
        <Link href="/search/houses?type=type1"> ===> Go to Houses Pages</Link>
      </div>
      <div>
        <Link href="/search/users"> ===> Go to Users Pages</Link>
      </div>
    </div>
  );
}
