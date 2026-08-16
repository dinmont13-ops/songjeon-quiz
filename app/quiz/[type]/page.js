import Link from "next/link";
import { notFound } from "next/navigation";
import Quiz from "../../../components/Quiz";
import questionSets, { TYPE_LABELS, MIXED_TYPE_QUESTION_COUNT } from "../../../data/questions";

const BASE_TYPES = Object.keys(questionSets); // ["a","b","c","d","e"]
const VALID_TYPES = [...BASE_TYPES, "f"];
const TYPE_SEQUENCE = [...BASE_TYPES, "f"]; // 정답모드에서 "다음 유형 보기" 이동 순서

function getNextType(current) {
  const idx = TYPE_SEQUENCE.indexOf(current);
  if (idx === -1) return TYPE_SEQUENCE[0];
  return TYPE_SEQUENCE[(idx + 1) % TYPE_SEQUENCE.length];
}

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
  const answerMode = sp?.answerMode === "1";
  const limit = isMixed ? MIXED_TYPE_QUESTION_COUNT : undefined;

  // 정답모드에서 마지막 문제의 "다음 유형 보기" 버튼이 이동할 다음 유형 URL
  // (원래 선택했던 랜덤 설정을 그대로 유지해서 넘어갑니다.)
  const nextType = getNextType(type);
  const nextParams = new URLSearchParams();
  if (sp?.randomOrder === "1") nextParams.set("randomOrder", "1");
  if (sp?.randomOptions === "1") nextParams.set("randomOptions", "1");
  if (answerMode) nextParams.set("answerMode", "1");
  const nextQs = nextParams.toString();
  const nextTypeHref = `/quiz/${nextType}${nextQs ? `?${nextQs}` : ""}`;

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
        key={`${type}-${randomOrder}-${randomOptions}-${answerMode}`}
        questions={pool}
        randomOrder={randomOrder}
        randomOptions={randomOptions}
        answerMode={answerMode}
        nextTypeHref={nextTypeHref}
        limit={limit}
      />
    </main>
  );
}
