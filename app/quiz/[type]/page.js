import Link from "next/link";
import { notFound } from "next/navigation";
import Quiz from "../../../components/Quiz";
import questionSets, { TYPE_LABELS } from "../../../data/questions";

export function generateStaticParams() {
  return Object.keys(questionSets).map((type) => ({ type }));
}

export default async function QuizTypePage({ params }) {
  const { type } = await params;
  const questions = questionSets[type];

  if (!questions) {
    notFound();
  }

  return (
    <main className="page">
      <div className="header">
        <Link href="/" className="back-link">
          ← 메인으로
        </Link>
        <h1>{TYPE_LABELS[type]}</h1>
        <p>총 {questions.length}문제 · 4지선다 객관식</p>
      </div>
      <Quiz key={type} questions={questions} />
    </main>
  );
}
