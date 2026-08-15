import "./globals.css";

export const metadata = {
  title: "송전전기원 필기 문제풀이",
  description: "송전전기원 필기시험 대비 객관식 문제풀이 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
