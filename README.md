# Basic

このリポジトリは、Geolonia の [Basic スタイル](https://geoloniamaps.github.io/basic)をカスタマイズし公開するためのテンプレートリポジトリです。

以下のような簡単な手順でお好みのスタイルにカスタマイズし、地図として表示できます。

* [DEMO](https://geoloniamaps.github.io/basic/)
* [DEMO on editor](https://editor.geolonia.com/?style=https://geoloniamaps.github.io/basic/style.json)


## ユーザーがカスタマイズする際の手順

* [Use this template](https://github.com/geoloniamaps/basic/generate) ボタンでこのリポジトリをコピー。
* GitHub Pages を 設定。
* `style.yml` を編集。
* しばらくすると `gh-pages` ブランチに `style.json` がコミットされるので、Geolonia Maps で表示する場合は、その URL を以下のように指定してください。

```
<div data-style="https://<あなたのGitHubユーザー名>.github.io/<リポジトリ名>/style.json"></div>
```

## GitHub Pages の設定方法

* GitHub のリポジトリのメニューの中にある [Settings] をクリックしてください。
* 移動先のページの下の方にある [GitHub Pages] のところで、以下のように設定してください。

![](https://www.evernote.com/l/ABXqA26fEitDNZG6KDxX-Os6Qb8gciGRKSYB/image.png)

## 色のカスタマイズ

[style.yml](./style.yml) を開いて下さい。 以下をお好きな色のカラーコードに変更しコミットして下さい。

```
$background: rgba(254, 254, 254, 1)

# カスタマイズここまで
```
