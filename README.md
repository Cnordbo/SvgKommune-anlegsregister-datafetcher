# A simple json datafetcher
En enkel dataparser for å filtrere ut resultater fra Stavanger kommunes åpne anleggsregister. 

Bruk: 
```js
node index.js [objecttype]
```

Params: 
*objecttype* (Optional, default: 'SportIdrettPlass')

Filtrer basert på en bestemt objekttype 

```
Tema Objekttype
4022 Naturvernområde
4022 Naturverngrense
4110 Arealbrukgrense
4122 Park
4123 Lekeplass
4131 SportIdrettPlass
4274 Friluftslivsområde
4278 FriluftslivsområdeAvgrensing
5200 Bebygd
7002 Veg
7018 Vegdekkekant
9111 ....
```

API URL: https://open.stavanger.kommune.no/dataset/anleggsregister
