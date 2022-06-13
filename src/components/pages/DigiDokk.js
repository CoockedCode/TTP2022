//import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units
//const doc = new jsPDF();

//doc.text("Hello world!", 10, 10);
//doc.save("a4.pdf");

import '../../styles/pages/php.css';
import Checkbox from '@mui/material/Checkbox';


const DigiDokk = () => {


    return (
      <>
        <main>
          <section class="leht">
            <div class="pdf">
              <table class="tg">
                  <tr class="tr-titlebar">
                    <td class="tg-prio">
                      <td class="tg-prioH">Töö prioriteet
                        <td class="tg-prioV">(prio autofill)</td>
                        <td class="tg-prioL">K - kiire<br />T - tähtajaline<br />M - määramata</td>
                      </td>
                    </td>

                    
                    <th class="tg-title" colSpan="12"><img class="elektrimasinad-logo" src="https://elektrimasinad.digifi.eu/media/DigiDokk/Picture_4.png" alt="logo"></img><br /><span style={{color:'#000'}}>TELLIMUSLEHT - TÖÖKÄSK - SAATELEHT</span></th>
                    <td class="tg-grundfos">
                    <img class="grundfos-logo" src="https://elektrimasinad.digifi.eu/media/DigiDokk/Picture_3.png" alt="grundfos volitus"></img>
                    </td>
                  </tr>
                  <tr>
                    <td class="tg-73oq">Aadress:</td>
                    <td class="tg-73oq2">Reg. nr.</td>
                    <td class="tg-c3ow1" rowSpan="2">Saabumise kp.</td>
                    <td class="tg-0pky" colSpan="5" rowSpan="2">Arve nr.<br />&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td class="tg-0pky" colSpan="7" rowSpan="2">Töö nr.<br />&nbsp;&nbsp;&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky1" colSpan="2"></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="13" rowSpan="2">Tellija:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2">Kontaktisik:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2">Tel.nr</td>
                    <td class="tg-0pky" colSpan="11">Arve e-post:</td>
                    <td class="tg-c3ow" colSpan="2">allkiri</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2">E-post:</td>
                    <td class="tg-0pky" colSpan="9">Tellimuse esitaja nimi:</td>
                    <td class="tg-0pky" colSpan="4" rowSpan="2"></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2">Lisainfo:</td>
                    <td class="tg-0pky" colSpan="9">Tel.nr.</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Saabunud:</td>
                    <td class="tg-0pky">Kliendi toodud <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Pakkum. Nr.</td>
                    <td class="tg-0pky" colSpan="7">Kokkulepitud hind:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Transp. firma nimi</td>
                    <td class="tg-0pky"><Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Lepingu Nr.</td>
                    <td class="tg-0pky" colSpan="7">Kokkulepitud tähtaeg:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Tagastus:</td>
                    <td class="tg-0pky">Klient tuleb järgi <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Kliendi PO</td>
                    <td class="tg-0pky" colSpan="7">Lõpetatud:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Transp. firma nimi</td>
                    <td class="tg-0pky"><Checkbox /></td>
                    <td class="tg-0pky" colSpan="13">Lisainfo:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2" rowSpan="2">Seadme liik</td>
                    <td class="tg-0pky">Varustus:</td>
                    <td class="tg-0pky" colSpan="6">Klemmkarp <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Küttekeha <Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Võlli kiil <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Klemmk.kaas <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Pidur <Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2" rowSpan="2">Tüüp</td>
                    <td class="tg-0pky">Rihmaratas <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Klemmik <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Alaldi <Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Poolmuhv <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Sillad <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Kondensaator <Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" rowSpan="2">Võlli kõrgus</td>
                    <td class="tg-0pky" rowSpan="2">Tootja</td>
                    <td class="tg-0pky">Hammasrat.<Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Riviklemmik<Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Tahhomeeter <Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Tööratas <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Läbiviik <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Sag.muund<Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2" rowSpan="2">Tehase nr.</td>
                    <td class="tg-0pky">Ketiratas<Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Kork <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Konks <Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Reduktor <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Poolik läbiviik <Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Tõstekarab. <Checkbox /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" rowSpan="2">Võimsus</td>
                    <td class="tg-0pky" rowSpan="2">Pöörete arv</td>
                    <td class="tg-0pky">Tiivikukate<Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Andurid <Checkbox /></td>
                    <td class="tg-c3ow" colSpan="6">Klemmikarbi asend</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Tiivik<Checkbox /></td>
                    <td class="tg-0pky" colSpan="6">Ühend.kaabel<Checkbox /></td>
                    <td class="tg-0pky" colSpan="6" rowSpan="4">placeholder img (picture1)</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" rowSpan="2">Pinge (V)</td>
                    <td class="tg-0pky" rowSpan="2">Nimivool (A)</td>
                    <td class="tg-0pky" colSpan="7">Muud varustuse märkused:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="7"></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Toite liik</td>
                    <td class="tg-0pky">Sagedus (Hz)</td>
                    <td class="tg-0pky" colSpan="7"></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Isol. Klass</td>
                    <td class="tg-0pky">IP-klass</td>
                    <td class="tg-0pky" colSpan="7">Skeem:</td>
                    <td class="tg-0pky" colSpan="6">Klemmliistu ühendus</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Režiim</td>
                    <td class="tg-0pky">Ex märge</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="3"></td>
                    <td class="tg-0pky" colSpan="3" rowSpan="4">picture2</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Laager DE</td>
                    <td class="tg-0pky">Laager NDE</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="3">Väljaviike</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2">MÄRKUSED:</td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-c3ow" colSpan="3">(box)</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="3">Märkused:</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="6"></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="6"></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky" colSpan="13"></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="15">Tööplaanid ja instruktsioonid</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" rowSpan="2">Töö nimetus:</td>
                    <td class="tg-0pky" colSpan="2" rowSpan="2">box</td>
                    <td class="tg-c3ow" colSpan="7">Mehaanikule<br /></td>
                    <td class="tg-c3ow" colSpan="5">Mähkijale<br /></td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="7"><Checkbox /> Staat.korp välja</td>
                    <td class="tg-0pky" colSpan="5"><Checkbox /> Mähisepärja mõõdud</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Valikud &gt;</td>
                    <td class="tg-llyw" colSpan="2">Hooldus, Remont, Defekteerimine, Müük;<br />Garantii,<br />Välitöö/Diagnostika, Välitöö/Laagrite vahetus,<br />Välitöö/Remondi tööd, Välitöö/Tasakaalustus,<br />Välitöö/Joondamine, Välitöö/Seadme vahetus</td>
                    <td class="tg-0pky" colSpan="7"><Checkbox /> Erilaagrid<br /><br /><Checkbox /> Uued vedrutihendid<br /><br /><Checkbox /> Pumba tihend. ktrl.</td>
                    <td class="tg-0pky" colSpan="5"><Checkbox /> Täpne skeem<br /><br /><Checkbox /> Raua test<br /><br /><Checkbox /> Andurid</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Käsitleja:</td>
                    <td class="tg-0pky">box</td>
                    <td class="tg-0pky">Käsitletud:</td>
                    <td class="tg-0pky" colSpan="7"><Checkbox /> Silikooniga tihend.</td>
                    <td class="tg-0pky" colSpan="5"><Checkbox /> "H" klassi materjalid</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="2"></td>
                    <td class="tg-0pky">Kuup. dd.mm.yyyy</td>
                    <td class="tg-0pky" colSpan="7"><Checkbox /> Muu erimääre</td>
                    <td class="tg-0pky" colSpan="5"><Checkbox /> uurdeisol. -MYLAR</td>
                  </tr>
                  <tr>
                    <td class="tg-0pky" colSpan="3">Tööetapid töökoja töödele</td>
                    <td class="tg-0pky" colSpan="7"><Checkbox /> Õli vahetus</td>
                    <td class="tg-0pky" colSpan="5"><Checkbox /> Nomex v.v juhtmed</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="2">(DE) (L) (MÄR) (V) (TA) (LV) (KO) (KA) (VÄ)</td>
                    <td class="tg-baqh" colSpan="13">Muud planeeritavad tööd ja märkused:</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="2">(box)(box)(box)(box)(box)(box)(box)(box)(box)</td>
                    <td class="tg-0lax" colSpan="13"></td>
                  </tr>
                  <tr>
                    <td class="tg-y6fn">DE - Defekteer.<br />L - Lahtivõtm.<br />MÄ - Mähkimine<br />VA - Vaigutus<br />TA - Tasakaalust.</td>
                    <td class="tg-y6fn">LV - Laagrite vahetus<br />KO - Kokkupanek<br />KA - Katsetamine<br />VÄ - Värvimine</td>
                    <td class="tg-0lax" colSpan="13"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="5">Remondijärgne kontroll</td>
                    <td class="tg-0lax" colSpan="6">Kontrolli teostaja:</td>
                    <td class="tg-0lax" colSpan="4">Kuup. dd.mm.yyyy a.</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax">Isolatsioonitakistus</td>
                    <td class="tg-baqh">sobiv (box)</td>
                    <td class="tg-baqh" colSpan="3">puudulik (box)</td>
                    <td class="tg-0lax" colSpan="10">Vello Papp (box)</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax">Pingeteim 2 kV</td>
                    <td class="tg-baqh">läbis (box)</td>
                    <td class="tg-baqh" colSpan="3">läbilöök (box)</td>
                    <td class="tg-0lax" colSpan="10">Toivo Nõmmeots (box)</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax">Talitluskatse</td>
                    <td class="tg-baqh">hea (box)</td>
                    <td class="tg-baqh" colSpan="3">puudulik (box)</td>
                    <td class="tg-0lax" colSpan="10">Jüri Kotelevski (box)</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="4">Seade tunnistatud kontrolli põhjal ohutuks        &nbsp;&nbsp;&nbsp;&nbsp;(box)</td>
                    <td class="tg-baqh" colSpan="11">(allkiri)</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="4">Seade tunnistatud kontrolli põhjal puudulikuks     (box)</td>
                    <td class="tg-0lax" colSpan="11">Elektrimasinad OÜ poolt tehtud töödele ning materjalidele</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="4">Seade tunnistatud remondiks mittekõlblikuks/utiil (box)</td>
                    <td class="tg-0lax" colSpan="11">kehtib ühe aastane garantii kauba väljastamise kuupäevast</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="4">Kaup väljastatud:</td>
                    <td class="tg-0lax" colSpan="11">Kaup kliendi poolt vastu võetud:</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="2"></td>
                    <td class="tg-0lax" colSpan="2">Kuup. dd/mm/yyyy. a.</td>
                    <td class="tg-0lax" colSpan="7"></td>
                    <td class="tg-0lax" colSpan="4">Kuup. dd/mm/yyyy. a.</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax" colSpan="4">Andis välja</td>
                    <td class="tg-0lax" colSpan="11">Võttis vastu</td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax">(Nimi, allkiri)</td>
                    <td class="tg-0lax" colSpan="2"></td>
                    <td class="tg-0lax" colSpan="3"></td>
                    <td class="tg-0lax" colSpan="4">(Nimi, allkiri)</td>
                    <td class="tg-0lax" colSpan="4"></td>
                  </tr>
                  <tr>
                    <td class="tg-VPR">F-EM-01</td>
                    <td class="tg-0lax">Elektrimasinad OÜ</td>
                    <td class="tg-0lax"></td>
                    <td class="tg-0lax" colSpan="2">KMKR: EE101722229</td>
                    <td class="tg-0lax" colSpan="5">Tel. 56862290</td>
                    <td class="tg-0lax" colSpan="6">Reg. nr. 12671107</td>
                  </tr>
                  <tr>
                    <td class="tg-VPR"></td>
                    <td class="tg-0lax" colSpan="2">Võru 47E, 50111 Tartu</td>
                    <td class="tg-0lax" colSpan="2">www.elektrimasinad.ee</td>
                    <td class="tg-0lax" colSpan="5">Tel. 56862291</td>
                    <td class="tg-0lax" colSpan="6">a/a EE402200221059825730</td>
                  </tr>
                </table>
              </div>
            </section>
        </main>
      </>
    );
  };
  
  export default DigiDokk;
  