import Link from "next/link";

const TYPES = ["A", "B", "C", "D", "E", "F"];

export default function Home() {
  return (
    <main className="page">
      <div className="header">
        <h1>송전전기원 예상문제</h1>
        <p>풀어볼 유형을 선택하세요</p>
      </div>

      <div className="type-grid">
        {TYPES.map((t) => (
          <Link key={t} href={`/quiz/${t.toLowerCase()}`} className="type-btn">
            {t}형
          </Link>
        ))}
      </div>
    </main>
  );
}
