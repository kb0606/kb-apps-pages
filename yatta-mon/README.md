# Yatta-Mon 紹介ページ

`kb0606/yatta-mon` の実装済み機能を参照して作成した多言語の静的紹介ページです。

## 画面構成

- トップの言語判定 `index.html` はミタモンと同一ロジック（既定は英語）
- `ja/`, `en/`, `de/`, `es/`, `fr/`, `ko/`, `pt-BR/`, `zh-TW/` には翻訳済みの紹介本文
- `style.css` はミタモンの基本レイアウトをコピーし、ヤッタモン用の青・青緑系スタイルを追記
- `assets/common/language-picker.css` はミタモンの言語選択メニューを再利用

## 掲載機能の根拠

- 体験日時・場所・カテゴリ・タグ・同行者・満足度・感想: `yatta-mon/docs/product.md`
- 1件最大20枚の写真、写真タブ、写真マップ、カレンダー、ハイライト、共有コラージュ、ZIPバックアップ: 同仕様書
- 無料20件・買い切り上限解除: `yatta-mon/lib/core/providers/purchase_provider.dart`
- 8言語: 同仕様書の Issue #218 セクション

## 公開前チェック

- [x] 日本語紹介ページに実アプリのスクリーンショット12枚を配置（記録一覧4形式、写真一覧、詳細、検索、カレンダー、マップ、ハイライト、記録フォーム、コラージュ）
- [x] 正式なアプリアイコン画像を配置する（`assets/common/app-icon.png`）
- [ ] Google Play 公開後、正しいストアリンクを追加する
- [ ] プライバシーポリシー・利用規約を独立して用意する際は、ヤッタモン固有の仕様を反映し、他アプリの法務文書を転用しない
- [ ] 価格・機能・対応言語はリリース時のアプリと照合する

注: `assets/common/app-icon.png` は Git LFS の対象から除外し、通常の Git blob として保存する設定です。日本語ページのファビコン・ヘッダー・フッターから相対パスで参照します。`assets/ja/screens/*.webp` は引き続き Git LFS 管理のため、日本語ページでは `https://media.githubusercontent.com/media/kb0606/kb-apps-pages/main/yatta-mon/assets/ja/screens/` を参照しています。
