import Link from "next/link";
import { notFound } from "next/navigation";
import Quiz from "../../../components/Quiz";
import questionSets, { TYPE_LABELS, MIXED_TYPE_QUESTION_COUNT } from "../../../data/questions";

const BASE_TYPES = Object.keys(questionSets); // ["a","b","c","d","e"]
const VALID_TYPES = [...BASE_TYPES, "f"];

export default async function QuizTypePage({ params, searchParams }) {
  const { type } = await params;
  const sp = await searchParams;

  if (!VALID_TYPES.includes(type)) {
    notFound();
  }

  const isMixed = type === "f";
  const pool = isMixed
    ? BASE_TYPES.flatMap((t) => questionSets[t].map((q) => ({ ...q, sourceType: t })))
    : questionSets[type];

  const randomOrder = isMixed ? true : sp?.randomOrder === "1";
  const randomOptions = isMixed ? true : sp?.randomOptions === "1";
  const limit = isMixed ? MIXED_TYPE_QUESTION_COUNT : undefined;

  return (
    <main className="page">
      <div className="header quiz-header">
        <div className="quiz-header-row">
          <Link href="/" className="back-link">
            ← 메인으로
          </Link>
          <h1>{TYPE_LABELS[type]}</h1>
        </div>
      </div>
      <Quiz
        key={`${type}-${randomOrder}-${randomOptions}`}
        questions={pool}
        randomOrder={randomOrder}
        randomOptions={randomOptions}
        limit={limit}
      />
    </main>
  );
}
