# E=mc² Biotech - AutoImplant Guide

자동화된 임플란트 가이드 설계 시스템

## 🌐 Live Demo

- **랜딩 페이지**: [https://implant-web.vercel.app](https://implant-web.vercel.app)
- **3D 데모**: [https://implant-web.vercel.app/main](https://implant-web.vercel.app/main)

## 📖 프로젝트 소개

E=mc² Biotech의 자동화된 임플란트 가이드 설계 로직을 시연하는 웹 플랫폼입니다.

### 주요 기능

- **비즈니스 프레젠테이션**: 회사 소개 및 투자 유치 자료
- **3D 시뮬레이션**: 치아 및 임플란트 위치 시각화
- **실시간 알고리즘**: 0.5mm lingual offset 규칙 적용
- **인터랙티브 UI**: 치아 선택 및 스펙 표시

## 🚀 Getting Started

### 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 랜딩 페이지
│   ├── main/
│   │   └── page.tsx          # 3D 데모 페이지
│   ├── layout.tsx
│   └── globals.css
├── components/               # React 컴포넌트
│   ├── Scene.tsx            # 3D 씬
│   ├── ToothModel.tsx       # 치아 모델
│   ├── ImplantModel.tsx     # 임플란트 모델
│   └── ...
└── lib/
    ├── types.ts             # TypeScript 타입 정의
    ├── constants.ts         # 상수
    └── implant-logic.ts     # 임플란트 로직
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 (React 19)
- **3D Graphics**: Three.js, React Three Fiber
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: Vercel

## 📦 Build

```bash
npm run build
npm start
```

## 📝 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

© 2025 E=mc² Biotech. All rights reserved.
