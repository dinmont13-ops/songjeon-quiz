// 송전전기원 예상문제 - 유형별 문제 데이터 (샘플)
// TODO: A~F 유형별로 실제 보유하신 문제로 교체하세요.
// 형식: { id, question, options: [4개], answerIndex(0~3), explanation(선택) }

const sampleQuestions = [
  {
    id: 1,
    question: "송전선로에서 코로나 현상을 방지하기 위한 대책으로 옳지 않은 것은?",
    options: [
      "복도체(다도체) 방식을 채택한다",
      "전선의 직경을 크게 한다",
      "전선의 표면을 매끄럽게 유지한다",
      "전선 간의 간격을 좁게 한다",
    ],
    answerIndex: 3,
    explanation:
      "전선 간 간격을 좁히면 오히려 전위경도가 높아져 코로나가 발생하기 쉬워집니다. 간격은 넓히는 것이 유리합니다.",
  },
  {
    id: 2,
    question: "다음 중 송전선로의 안정도 향상 대책이 아닌 것은?",
    options: [
      "직렬 콘덴서 설치",
      "속응 여자 방식 채택",
      "리액턴스를 크게 함",
      "고속도 재폐로 방식 채택",
    ],
    answerIndex: 2,
    explanation:
      "리액턴스를 작게 해야 안정도가 향상됩니다. 리액턴스를 크게 하면 안정도가 저하됩니다.",
  },
  {
    id: 3,
    question: "가공송전선로에서 전선의 진동을 방지하기 위해 사용하는 것은?",
    options: ["댐퍼(Damper)", "아머로드", "스페이서", "현수애자"],
    answerIndex: 0,
    explanation: "댐퍼는 바람 등에 의한 전선의 미소 진동(진동 피로)을 흡수하여 단선을 방지합니다.",
  },
  {
    id: 4,
    question: "송전선로에서 페란티 현상이 가장 발생하기 쉬운 경우는?",
    options: [
      "부하가 매우 큰 경우",
      "선로가 짧고 부하가 큰 경우",
      "무부하 또는 경부하 시 장거리 송전선로",
      "역률이 매우 낮은 지상 부하일 때",
    ],
    answerIndex: 2,
    explanation:
      "페란티 현상은 무부하 또는 경부하 상태의 장거리 송전선로에서 충전전류에 의해 수전단 전압이 송전단보다 높아지는 현상입니다.",
  },
  {
    id: 5,
    question: "가공지선(架空地線)을 설치하는 주된 목적은?",
    options: [
      "전압강하 방지",
      "직격뢰 및 유도뢰로부터 전선로 보호",
      "코로나 손실 저감",
      "전선의 이도(弛度) 조정",
    ],
    answerIndex: 1,
    explanation: "가공지선은 낙뢰로부터 전력선을 보호하기 위해 설치합니다.",
  },
];

// A~F 유형별 문제 세트입니다.
// 지금은 모든 유형이 동일한 샘플 문제를 임시로 사용하고 있습니다.
// 각 유형별로 실제 문제 데이터를 주시면 이 파일을 유형별로 채워드립니다.
const questionSets = {
  a: sampleQuestions,
  b: sampleQuestions,
  c: sampleQuestions,
  d: sampleQuestions,
  e: sampleQuestions,
  f: sampleQuestions,
};

export const TYPE_LABELS = {
  a: "A형",
  b: "B형",
  c: "C형",
  d: "D형",
  e: "E형",
  f: "F형",
};

export default questionSets;
