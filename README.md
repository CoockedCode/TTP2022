# CookedCode, rühm 5 - CMMS programm

> [Tallinna Ülikooli Digitehnoloogiate instituut](https://www.tlu.ee/dt) - Tarkvaraarenduse projekt  2022. a <br>
> Siim Kriibi, Kert Lillenberk, Arjom Morozov, Rain Erik Elias, Martin Lukas

## Elektrimasinad OÜ põhiprotsessi digitaliseerimine

Projekt on loodud Tarkvaraarenduse projekti praktika raames. Projekti telliaks oli Tartu firma Elektrimasinad OÜ. 

![Avalehe kuva](https://raw.githubusercontent.com/CoockedCode/TTP2022/main/media/demo_1.png)
![Kasutaja sätete kuva](https://raw.githubusercontent.com/CoockedCode/TTP2022/main/media/demo_2.png)

## Eesmärgid ja lühikirjeldus

Rakendus digitaliseerib firma projektide haldust. Programm, mida me loome, on CMMS (computerized maintenance management system) ehk tööhaldussüsteemi tüüpi rakendus. Firmal suureks probleemiks oli andmete duplikatsioon, infot hoiti erinevates exeli ja wordi failides ning mingit ühtset süsteem polnud, samuti pidi kõike käsitsi sisestama. Programm toob kõik info sisestuse ühte kohta kokku ning seega ei teki info duplikatsioon ja tänu sellele töö laugeb lihtsamalt.

## Kasutatud tehnoloogiad

> Frontend React.js-iga, välimuse jaoks kasutasime MUI. <br>
> Backend-i tegime vanilla PHP-ga. <br>
> AB jaoks kasutasime MariaDB.

| Tehnoloogia | Versioon |
|--|--|
| PHP | 7.4.28 (LTS) |
| Parcel.js | 2.5.0 |
| Node.js | 16.xx (LTS) |
| React | 18.0.0 |
| MUI | 5.xx |
| MariaDB | 10.3.34 |

![NPM pakketid, mida kasutame](https://raw.githubusercontent.com/CoockedCode/TTP2022/main/media/npm_depend_list.png)

## Andmebaas
[AB vertabelo](https://my.vertabelo.com/doc/7nLObBWSjrfJviiqbb72APGHm6lorTEy)

[AB kood](https://github.com/CoockedCode/TTP2022/tree/main/db)

![AB struktuurist pilt](https://raw.githubusercontent.com/CoockedCode/TTP2022/main/media/Elektrimasinad_O%C3%9C_db.png)
## Kasutus

  1. klooni repo ja installi [Node.js (LTS)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-nodejs-and-npm)
  
   2. repo kaustas ava cmd/bash: 
  
          npm install
          ...
          npm start

  4. Ava brauser:
  http://localhost:1234/
 
  5. Kasutaja:
  Andrus1:Andrus1  ||  1:1  ||  2:2

> *NB! backend töötab elmas serverite peal, vaja katsetamiseks luua lokaalne php ja sql server. Samuti url endpont enpoint.js-s ümber muuta.*
