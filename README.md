# Basic

* [DEMO](https://geoloniamaps.github.io/basic/)
* [DEMO on editor](https://editor.geolonia.com/?style=https://geoloniamaps.github.io/basic/style.json)


## ユーザーがカスタマイズする際の手順

* [Use this template](https://github.com/geoloniamaps/basic/generate) ボタンでこのリポジトリをコピー。
* `style.yml` を編集。
* しばらくすると `gh-pages` ブランチに `style.json` がコミットされるので、Geolonia Maps で表示する場合は、その URL を以下のように指定してください。

```
<div data-style="https://<あなたのGitHubユーザー名>.github.io/<リポジトリ名>/style.json"></div>
```

例: https://codepen.io/naogify/pen/ZEJOErQ


## 色のカスタマイズ

[style.yml](./style.yml) を開いて下さい。 以下をお好きな色のカラーコードに変更しコミットして下さい。

```
$background: rgba(254, 254, 254, 1)

# カスタマイズここまで
```
