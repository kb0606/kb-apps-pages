# kb-apps-pages

GitHub Pages で公開するアプリ紹介ページ、プライバシーポリシー、利用規約などの静的サイトを管理するリポジトリです。

## 基本方針

- アプリごとにトップレベルのディレクトリを分けます。
- 多言語ページは言語コードごとにディレクトリを分けます。
- 各ページ直下の `index.html` は言語振り分け専用とし、本文は言語別ディレクトリ側に置きます。
- 言語振り分け用 `index.html` はページごとに独自実装せず、同じ実装を再利用します。
- 対応言語が見つからない場合は英語 (`en`) を既定のフォールバック先とします。
- HTML 本文は言語ごとに個別ファイルとして管理します。
- CSS は可能な範囲で共通化します。
- UI スクリーンショットなど、表示内容が言語に依存する画像は言語別ディレクトリで管理します。
- アイコンなど言語に依存しない画像は `assets/common/` で管理します。

## ディレクトリ構成

現在の `mita-mon` は概ね次の構成です。

```text
mita-mon/
├─ index.html
├─ style.css
├─ assets/
│  ├─ common/
│  │  ├─ app-icon.webp
│  │  └─ privacy-icon.webp
│  ├─ en/
│  │  └─ screens/
│  │     ├─ record-form.webp
│  │     ├─ timeline-normal.webp
│  │     ├─ timeline-compact.webp
│  │     ├─ timeline-thumbnail.webp
│  │     ├─ timeline-grid.webp
│  │     ├─ detail.webp
│  │     ├─ calendar.webp
│  │     └─ highlight.webp
│  └─ ja/
│     ├─ feature-graphic.webp
│     └─ screens/
│        ├─ record-form.webp
│        ├─ timeline-normal.webp
│        ├─ timeline-compact.webp
│        ├─ timeline-thumbnail.webp
│        ├─ timeline-grid.webp
│        ├─ detail.webp
│        ├─ calendar.webp
│        └─ highlight.webp
├─ ja/
│  └─ index.html
├─ en/
│  └─ index.html
├─ de/
│  └─ index.html
├─ es/
│  └─ index.html
├─ fr/
│  └─ index.html
├─ ko/
│  └─ index.html
├─ pt-BR/
│  └─ index.html
├─ zh-TW/
│  └─ index.html
├─ privacy-policy/
│  ├─ index.html
│  ├─ style.css
│  ├─ ja/
│  │  └─ index.html
│  ├─ en/
│  │  └─ index.html
│  ├─ de/
│  │  └─ index.html
│  ├─ es/
│  │  └─ index.html
│  ├─ fr/
│  │  └─ index.html
│  ├─ ko/
│  │  └─ index.html
│  ├─ pt-BR/
│  │  └─ index.html
│  └─ zh-TW/
│     └─ index.html
└─ terms/
   ├─ index.html
   ├─ style.css
   ├─ ja/
   │  └─ index.html
   ├─ en/
   │  └─ index.html
   ├─ de/
   │  └─ index.html
   ├─ es/
   │  └─ index.html
   ├─ fr/
   │  └─ index.html
   ├─ ko/
   │  └─ index.html
   ├─ pt-BR/
   │  └─ index.html
   └─ zh-TW/
      └─ index.html
```

`mita-mon` は日本語 (`ja`)、英語 (`en`)、ドイツ語 (`de`)、スペイン語 (`es`)、フランス語 (`fr`)、韓国語 (`ko`)、ブラジルポルトガル語 (`pt-BR`)、繁體中文 (`zh-TW`) に対応しています。紹介ページ、プライバシーポリシー、利用規約を各言語で用意します。

## 言語振り分け

言語振り分け用の `index.html` は本文を持たず、ブラウザの言語設定から対応する言語ディレクトリへ移動する用途に限定します。

基本動作:

1. `navigator.languages` / `navigator.language` を参照
2. ブラウザ設定を対応する言語ディレクトリへ対応付ける
3. 繁體中文 (`zh-TW` / `zh-Hant`) は `/zh-TW/`、ポルトガル語は `/pt-BR/` へ移動
4. 対応言語がなければ `./en/` へ移動

`mita-mon` の紹介ページ、プライバシーポリシー、利用規約でこの方式を使用しています。

## 紹介ページのスクリーンショット

`mita-mon` の日本語・英語紹介ページでは、各言語のアプリ実画面を同じファイル名で参照します。画像は `assets/ja/screens/` と `assets/en/screens/` に分けて管理します。

| ファイル | 内容 |
| --- | --- |
| `record-form.webp` | 新規記録画面 |
| `timeline-normal.webp` | 記録一覧・通常表示 |
| `timeline-compact.webp` | 記録一覧・コンパクト表示 |
| `timeline-thumbnail.webp` | 記録一覧・サムネイル表示 |
| `timeline-grid.webp` | 記録一覧・画像グリッド表示 |
| `detail.webp` | 記録詳細 |
| `calendar.webp` | カレンダー |
| `highlight.webp` | ハイライト |

記録一覧の4種類は、紹介ページ上でカルーセル表示します。日本語版と英語版ではそれぞれの言語に合った画面を使用し、追加6言語では各言語の画像を配置するまでプレースホルダーを表示します。

## Git LFS と GitHub Pages

通常の画像ファイルは Git LFS の対象にしていますが、GitHub Pages から直接配信する `mita-mon/assets/**` は通常の Git blob として保存します。

`.gitattributes` では次の例外を設定しています。

```gitattributes
mita-mon/assets/** -filter -diff -merge -text
```

Git LFS のポインタファイルをそのまま GitHub Pages から参照すると画像として表示できないため、公開用アセットは LFS 化しません。

## ページ間リンク

言語別ページから、同じ言語のプライバシーポリシー・利用規約へリンクします。

例:

```text
/mita-mon/ja/
/mita-mon/privacy-policy/ja/
/mita-mon/terms/ja/
```

各言語ページから、同じ言語のプライバシーポリシーと利用規約へリンクします。紹介ページと法務ページには8言語の切り替えリンクがあります。
