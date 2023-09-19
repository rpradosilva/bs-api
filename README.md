<div align="center">
    <img src=".github/icon.png" alt="Logo Repo" />
    <h1 style="padding-top: 16px;">
      Bone Shaker API
    </h1>
    An API for all bone shaker fandom hotwheels.
</div>

<br>
<div align="center">

[![About](https://img.shields.io/badge/-About-0D0D0D)](#about)
[![License](https://img.shields.io/badge/-License-27282A)](/LICENSE)
[![Authors](https://img.shields.io/badge/-Author-27282A)](#authors)

</div>

## About

To use, import [JSON](https://rpradosilva.github.io/bs-api/src/api/bs-api.json) to your js file:

```js
const api = "https://rpradosilva.github.io/boneshaker-api/src/api/bs-api.json";

async function getCars(api) {
  let apiObject = await fetch(api);
  let boneshakers = await apiObject.json();
  console.log(boneshakers);
}

getCars(api);
```

JSON structure example:

```json
{
  "id": 0, // auto id
  "toy_code": "", // string
  "toy_image": "", // string src
  "year": 0, // number
  "model": "", // open_roof or closed_roof
  "series": "", // string
  "external_color": "", // lowercase string
  "inner_color": "", // lowercase string
  "tampo": "", // string
  "details": "", // string
  "wheel_type": "", // string
  "madein": "", // string
  "notes": "" // string
}
```

### Local usage

1. Clone repo
2. `npm i`
3. `npm start`
4. Access the file into path: `./src/api/boneshaker-api.json`

## Authors

|      [Rafael Prado](http://www.github.com/rpradosilva)      |
| :---------------------------------------------------------: |
| ![](https://avatars2.githubusercontent.com/u/22681977?s=80) |

---

[<img alt="Logo RPrado" src="https://avatars.githubusercontent.com/u/87092922" width="40" />](http://rprado.design)
