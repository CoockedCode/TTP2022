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
          <section style={{ width: "100%", padding: "0 5%" }}>
            <div id="header-wrapper">
              <div id="page-header">
                <h3>Digidokk</h3>
              </div>
              
            </div>
            <style type="text/css">
            </style>
            <table class="tg">
              <thead>
                <tr>
                  <th class="tg-0lax" rowspan="54"></th>
                  <th class="tg-c3ow">Töö prioriteet<br /><br />K</th>
                  <th class="tg-jnby">K - kiire<br />T - tähtajaline<br />M - määramata<br />(box)</th>
                  <th class="tg-6252" colspan="12">logo picture4<br /><span style={{color:'#000'}}>TELLIMUSLEHT - TÖÖKÄSK - SAATELEHT</span></th>
                  <th class="tg-de2y">grundfos<br />logo<br />picture 3</th>
                </tr>
                <tr>
                  <th class="tg-73oq">Aadress:</th>
                  <th class="tg-73oq">Reg. nr.</th>
                  <th class="tg-c3ow" rowspan="2">Saabumise kp.</th>
                  <th class="tg-0pky" colspan="5" rowspan="2">Arve nr.<br />&nbsp;&nbsp;&nbsp;&nbsp;</th>
                  <th class="tg-0pky" colspan="7" rowspan="2">Töö nr.<br />&nbsp;&nbsp;&nbsp;</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2"></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="13" rowspan="2">Tellija:</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2">Kontaktisik:</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2">Tel.nr</th>
                  <th class="tg-0pky" colspan="11">Arve e-post:</th>
                  <th class="tg-c3ow" colspan="2">allkiri</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2">E-post:</th>
                  <th class="tg-0pky" colspan="9">Tellimuse esitaja nimi:</th>
                  <th class="tg-0pky" colspan="4" rowspan="2"></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2">Lisainfo:</th>
                  <th class="tg-0pky" colspan="9">Tel.nr.</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Saabunud:</th>
                  <th class="tg-0pky">Kliendi toodud <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Pakkum. Nr.</th>
                  <th class="tg-0pky" colspan="7">Kokkulepitud hind:</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Transp. firma nimi</th>
                  <th class="tg-0pky"><Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Lepingu Nr.</th>
                  <th class="tg-0pky" colspan="7">Kokkulepitud tähtaeg:</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Tagastus:</th>
                  <th class="tg-0pky">Klient tuleb järgi <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Kliendi PO</th>
                  <th class="tg-0pky" colspan="7">Lõpetatud:</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Transp. firma nimi</th>
                  <th class="tg-0pky"><Checkbox /></th>
                  <th class="tg-0pky" colspan="13">Lisainfo:</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2" rowspan="2">Seadme liik</th>
                  <th class="tg-0pky">Varustus:</th>
                  <th class="tg-0pky" colspan="6">Klemmkarp <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Küttekeha <Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky">Võlli kiil <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Klemmk.kaas <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Pidur <Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2" rowspan="2">Tüüp</th>
                  <th class="tg-0pky">Rihmaratas <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Klemmik <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Alaldi <Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky">Poolmuhv <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Sillad <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Kondensaator <Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky" rowspan="2">Võlli kõrgus</th>
                  <th class="tg-0pky" rowspan="2">Tootja</th>
                  <th class="tg-0pky">Hammasrat.<Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Riviklemmik<Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Tahhomeeter <Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky">Tööratas <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Läbiviik <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Sag.muund<Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2" rowspan="2">Tehase nr.</th>
                  <th class="tg-0pky">Ketiratas<Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Kork <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Konks <Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky">Reduktor <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Poolik läbiviik <Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Tõstekarab. <Checkbox /></th>
                </tr>
                <tr>
                  <th class="tg-0pky" rowspan="2">Võimsus</th>
                  <th class="tg-0pky" rowspan="2">Pöörete arv</th>
                  <th class="tg-0pky">Tiivikukate<Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Andurid <Checkbox /></th>
                  <th class="tg-c3ow" colspan="6">Klemmikarbi asend</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Tiivik<Checkbox /></th>
                  <th class="tg-0pky" colspan="6">Ühend.kaabel<Checkbox /></th>
                  <th class="tg-0pky" colspan="6" rowspan="4">placeholder img (picture1)</th>
                </tr>
                <tr>
                  <th class="tg-0pky" rowspan="2">Pinge (V)</th>
                  <th class="tg-0pky" rowspan="2">Nimivool (A)</th>
                  <th class="tg-0pky" colspan="7">Muud varustuse märkused:</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="7"></th>
                </tr>
                <tr>
                  <th class="tg-0pky">Toite liik</th>
                  <th class="tg-0pky">Sagedus (Hz)</th>
                  <th class="tg-0pky" colspan="7"></th>
                </tr>
                <tr>
                  <th class="tg-0pky">Isol. Klass</th>
                  <th class="tg-0pky">IP-klass</th>
                  <th class="tg-0pky" colspan="7">Skeem:</th>
                  <th class="tg-0pky" colspan="6">Klemmliistu ühendus</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Režiim</th>
                  <th class="tg-0pky">Ex märge</th>
                  <th class="tg-0pky"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="3"></th>
                  <th class="tg-0pky" colspan="3" rowspan="4">picture2</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Laager DE</th>
                  <th class="tg-0pky">Laager NDE</th>
                  <th class="tg-0pky"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="3">Väljaviike</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2">MÄRKUSED:</th>
                  <th class="tg-0pky"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-c3ow" colspan="3">(box)</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="3">Märkused:</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="6"></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="6"></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky" colspan="13"></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="15">Tööplaanid ja instruktsioonid</th>
                </tr>
                <tr>
                  <th class="tg-0pky" rowspan="2">Töö nimetus:</th>
                  <th class="tg-0pky" colspan="2" rowspan="2">box</th>
                  <th class="tg-c3ow" colspan="7">Mehaanikule<br /></th>
                  <th class="tg-c3ow" colspan="5">Mähkijale<br /></th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="7"><Checkbox /> Staat.korp välja</th>
                  <th class="tg-0pky" colspan="5"><Checkbox /> Mähisepärja mõõdud</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Valikud &gt;</th>
                  <th class="tg-llyw" colspan="2">Hooldus, Remont, Defekteerimine, Müük;<br />Garantii,<br />Välitöö/Diagnostika, Välitöö/Laagrite vahetus,<br />Välitöö/Remondi tööd, Välitöö/Tasakaalustus,<br />Välitöö/Joondamine, Välitöö/Seadme vahetus</th>
                  <th class="tg-0pky" colspan="7"><Checkbox /> Erilaagrid<br /><br /><Checkbox /> Uued vedrutihendid<br /><br /><Checkbox /> Pumba tihend. ktrl.</th>
                  <th class="tg-0pky" colspan="5"><Checkbox /> Täpne skeem<br /><br /><Checkbox /> Raua test<br /><br /><Checkbox /> Andurid</th>
                </tr>
                <tr>
                  <th class="tg-0pky">Käsitleja:</th>
                  <th class="tg-0pky">box</th>
                  <th class="tg-0pky">Käsitletud:</th>
                  <th class="tg-0pky" colspan="7"><Checkbox /> Silikooniga tihend.</th>
                  <th class="tg-0pky" colspan="5"><Checkbox /> "H" klassi materjalid</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="2"></th>
                  <th class="tg-0pky">Kuup. dd.mm.yyyy</th>
                  <th class="tg-0pky" colspan="7"><Checkbox /> Muu erimääre</th>
                  <th class="tg-0pky" colspan="5"><Checkbox /> uurdeisol. -MYLAR</th>
                </tr>
                <tr>
                  <th class="tg-0pky" colspan="3">Tööetapid töökoja töödele</th>
                  <th class="tg-0pky" colspan="7"><Checkbox /> Õli vahetus</th>
                  <th class="tg-0pky" colspan="5"><Checkbox /> Nomex v.v juhtmed</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="2">(DE) (L) (MÄR) (V) (TA) (LV) (KO) (KA) (VÄ)</th>
                  <th class="tg-baqh" colspan="13">Muud planeeritavad tööd ja märkused:</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="2">(box)(box)(box)(box)(box)(box)(box)(box)(box)</th>
                  <th class="tg-0lax" colspan="13"></th>
                </tr>
                <tr>
                  <th class="tg-y6fn">DE - Defekteer.<br />L - Lahtivõtm.<br />MÄ - Mähkimine<br />VA - Vaigutus<br />TA - Tasakaalust.</th>
                  <th class="tg-y6fn">LV - Laagrite vahetus<br />KO - Kokkupanek<br />KA - Katsetamine<br />VÄ - Värvimine</th>
                  <th class="tg-0lax" colspan="13"></th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="5">Remondijärgne kontroll</th>
                  <th class="tg-0lax" colspan="6">Kontrolli teostaja:</th>
                  <th class="tg-0lax" colspan="4">Kuup. dd.mm.yyyy a.</th>
                </tr>
                <tr>
                  <th class="tg-0lax">Isolatsioonitakistus</th>
                  <th class="tg-baqh">sobiv (box)</th>
                  <th class="tg-baqh" colspan="3">puudulik (box)</th>
                  <th class="tg-0lax" colspan="10">Vello Papp (box)</th>
                </tr>
                <tr>
                  <th class="tg-0lax">Pingeteim 2 kV</th>
                  <th class="tg-baqh">läbis (box)</th>
                  <th class="tg-baqh" colspan="3">läbilöök (box)</th>
                  <th class="tg-0lax" colspan="10">Toivo Nõmmeots (box)</th>
                </tr>
                <tr>
                  <th class="tg-0lax">Talitluskatse</th>
                  <th class="tg-baqh">hea (box)</th>
                  <th class="tg-baqh" colspan="3">puudulik (box)</th>
                  <th class="tg-0lax" colspan="10">Jüri Kotelevski (box)</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="4">Seade tunnistatud kontrolli põhjal ohutuks        &nbsp;&nbsp;&nbsp;&nbsp;(box)</th>
                  <th class="tg-baqh" colspan="11">(allkiri)</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="4">Seade tunnistatud kontrolli põhjal puudulikuks     (box)</th>
                  <th class="tg-0lax" colspan="11">Elektrimasinad OÜ poolt tehtud töödele ning materjalidele</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="4">Seade tunnistatud remondiks mittekõlblikuks/utiil (box)</th>
                  <th class="tg-0lax" colspan="11">kehtib ühe aastane garantii kauba väljastamise kuupäevast</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="4">Kaup väljastatud:</th>
                  <th class="tg-0lax" colspan="11">Kaup kliendi poolt vastu võetud:</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="2"></th>
                  <th class="tg-0lax" colspan="2">Kuup. dd/mm/yyyy. a.</th>
                  <th class="tg-0lax" colspan="7"></th>
                  <th class="tg-0lax" colspan="4">Kuup. dd/mm/yyyy. a.</th>
                </tr>
                <tr>
                  <th class="tg-0lax" colspan="4">Andis välja</th>
                  <th class="tg-0lax" colspan="11">Võttis vastu</th>
                </tr>
                <tr>
                  <th class="tg-0lax"></th>
                  <th class="tg-0lax">(Nimi, allkiri)</th>
                  <th class="tg-0lax" colspan="2"></th>
                  <th class="tg-0lax" colspan="3"></th>
                  <th class="tg-0lax" colspan="4">(Nimi, allkiri)</th>
                  <th class="tg-0lax" colspan="4"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="tg-0lax">F-EM-01</td>
                  <td class="tg-0lax">Elektrimasinad OÜ</td>
                  <td class="tg-0lax"></td>
                  <td class="tg-0lax" colspan="2">KMKR: EE101722229</td>
                  <td class="tg-0lax" colspan="5">Tel. 56862290</td>
                  <td class="tg-0lax" colspan="6">Reg. nr. 12671107</td>
                </tr>
                <tr>
                  <td class="tg-0lax"></td>
                  <td class="tg-0lax" colspan="2">Võru 47E, 50111 Tartu</td>
                  <td class="tg-0lax" colspan="2">www.elektrimasinad.ee</td>
                  <td class="tg-0lax" colspan="5">Tel. 56862291</td>
                  <td class="tg-0lax" colspan="6">a/a EE402200221059825730</td>
                </tr>
              </tbody>
              </table>
          </section>
        </main>
      </>
    );
  };
  
  export default DigiDokk;
  