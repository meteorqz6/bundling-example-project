# learning-bundling-with-webpack

[튜토리얼: 웹팩으로 배우는 번들링](https://frontend-fundamentals.com/bundling/webpack-tutorial/intro.html)을 직접 실습한 프로젝트

## 기술 스택

- **React 19** + **TypeScript**
- **Webpack 5**: 모듈 번들러, webpack-dev-server (HMR 포함)
- **Babel**: 트랜스파일러
  - `@babel/preset-env`: 최신 JS → 구형 브라우저 대응
  - `@babel/preset-react`: JSX → `React.createElement()` 변환
  - `@babel/preset-typescript`: TypeScript 타입 제거
- **date-fns**: 날짜 포맷팅 라이브러리

## 프로젝트 구조

```
bundling-example-project/
├── assets/           # 이미지, 폰트 등 정적 자원
├── dist/             # 번들 결과물
├── App.tsx
├── main.tsx          # 진입점
├── emoji.ts
├── style.css
├── global.d.ts       # 이미지, CSS 등 모듈 타입 선언
├── tsconfig.json
└── webpack.config.js
```

## 실습 포인트

### Babel preset 3개의 역할 분리

```js
presets: [
  "@babel/preset-env",        // 최신 JS 문법 변환
  "@babel/preset-react",      // JSX 변환
  "@babel/preset-typescript", // TypeScript 타입 제거
]
```

`@babel/preset-typescript`는 타입 검사를 하지 않는다. 타입 어노테이션을 제거하면 남는 순수 JS를 `preset-env`가 변환한다. 타입 검사는 `tsc`가 별도로 담당한다. 덕분에 빌드 속도를 유지하면서 TypeScript를 쓸 수 있다.

### Loader 실행 순서

```js
{ test: /\.css$/, use: ["style-loader", "css-loader"] }
```

Webpack loader는 배열의 **오른쪽에서 왼쪽** 순서로 실행된다.

1. `css-loader`: CSS 파일을 JavaScript 모듈로 변환
2. `style-loader`: 그 결과를 DOM의 `<style>` 태그로 주입

순서를 바꾸면 에러가 난다.

### 이미지와 폰트를 import할 수 있는 이유

```js
{ test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset" }
{ test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource", generator: { filename: "assets/[name][ext]" } }
```

- `type: "asset"`: 파일 크기에 따라 자동 결정. 작으면 base64 인라인, 크면 별도 파일
- `type: "asset/resource"`: 항상 별도 파일로 내보냄. 폰트처럼 항상 분리해야 하는 경우에 사용

이 설정 덕분에 `import logo from "./assets/logo.svg"` 같은 코드가 가능하다.

### HtmlWebpackPlugin

```js
new HtmlWebpackPlugin({ template: "./index.html", inject: true })
```

Webpack만으로는 `bundle.js`만 생성되고, 그것을 로드하는 HTML은 직접 만들어야 한다. 이 플러그인이 `index.html`을 템플릿으로 `dist/index.html`을 자동 생성하고, `<script>` 태그를 자동으로 삽입해준다.

### global.d.ts

```ts
declare module "*.svg";
declare module "*.css";
declare module "*.png";
```

TypeScript는 `.svg`, `.css` 같은 파일을 모듈로 인식하지 못한다. 이 선언 파일로 해당 확장자를 가진 모듈이 존재한다는 것을 TypeScript에 알려줘야 한다.

### HMR (Hot Module Replacement)

```js
devServer: { hot: true }
```

소스 파일을 수정했을 때 페이지 전체를 새로고침하지 않고 바뀐 모듈만 교체한다. React 컴포넌트를 수정해도 상태를 유지한 채로 UI만 업데이트된다.

## 실행 방법

```bash
npm install
npm start         # webpack-dev-server 실행 (localhost:3000)
npm run build     # 프로덕션 번들 생성
```
