import asciiThumbnail from 'assets/ascii.jpg?preset=thumbnail&resize=true'
import auraThumbnail from 'assets/aura.jpg?preset=thumbnail&resize=true'
import babiesThumbnail from 'assets/babies.jpg?preset=thumbnail&resize=true'
import bannersThumbnail from 'assets/banners.jpg?preset=thumbnail&resize=true'
import bitchThumbnail from 'assets/bitch.jpg?preset=thumbnail&resize=true'
import bonklerThumbnail from 'assets/bonkler.jpg?preset=thumbnail&resize=true'
import boredThumbnail from 'assets/bored.jpg?preset=thumbnail&resize=true'
import cigawretteThumbnail from 'assets/cigawrette.jpg?preset=thumbnail&resize=true'
import columbiaThumbnail from 'assets/columbia.jpg?preset=thumbnail&resize=true'
import ghibladyThumbnail from 'assets/ghiblady.jpg?preset=thumbnail&resize=true'
import godsThumbnail from 'assets/gods.jpg?preset=thumbnail&resize=true'
import heiseiThumbnail from 'assets/heisei.jpg?preset=thumbnail&resize=true'
import janklerThumbnail from 'assets/jankler.jpg?preset=thumbnail&resize=true'
import malilyThumbnail from 'assets/malily.jpg?preset=thumbnail&resize=true'
import matrixThumbnail from 'assets/matrix.jpg?preset=thumbnail&resize=true'
import meowladyThumbnail from 'assets/meowlady.jpg?preset=thumbnail&resize=true'
import meowlady2Thumbnail from 'assets/meowlady2.jpg?preset=thumbnail&resize=true'
import mfersThumbnail from 'assets/mfers.jpg?preset=thumbnail&resize=true'
import miauraThumbnail from 'assets/miaura.jpg?preset=thumbnail&resize=true'
import mifairyThumbnail from 'assets/mifairy.jpg?preset=thumbnail&resize=true'
import milThumbnail from 'assets/mil.jpg?preset=thumbnail&resize=true'
import miladyThumbnail from 'assets/milady3.jpg?preset=thumbnail&resize=true'
import milaidyThumbnail from 'assets/milaidy.jpg?preset=thumbnail&resize=true'
import oekakiThumbnail from 'assets/oekaki.jpg?preset=thumbnail&resize=true'
import petzThumbnail from 'assets/petz.jpg?preset=thumbnail&resize=true'
import pixeladyThumbnail from 'assets/pixelady.jpg?preset=thumbnail&resize=true'
import pixelbcThumbnail from 'assets/pixelbc.jpg?preset=thumbnail&resize=true'
import pixelbroThumbnail from 'assets/pixelbro.jpg?preset=thumbnail&resize=true'
import popsThumbnail from 'assets/pops.jpg?preset=thumbnail&resize=true'
import r3dThumbnail from 'assets/r3d.jpg?preset=thumbnail&resize=true'
import radbroThumbnail from 'assets/radbro.jpg?preset=thumbnail&resize=true'
import raveThumbnail from 'assets/rave.jpg?preset=thumbnail&resize=true'
import rememThumbnail from 'assets/remem.jpg?preset=thumbnail&resize=true'
import remilioThumbnail from 'assets/remilio.jpg?preset=thumbnail&resize=true'
import rockThumbnail from 'assets/rock.jpg?preset=thumbnail&resize=true'
import sadbroThumbnail from 'assets/sadbro.jpg?preset=thumbnail&resize=true'
import schizoThumbnail from 'assets/schizo.jpg?preset=thumbnail&resize=true'
import shiroThumbnail from 'assets/shiro.jpg?preset=thumbnail&resize=true'
import sonoraThumbnail from 'assets/sonora.jpg?preset=thumbnail&resize=true'
import stationThumbnail from 'assets/station.jpg?preset=thumbnail&resize=true'
import strawberryThumbnail from 'assets/strawberry.jpg?preset=thumbnail&resize=true'
import streetThumbnail from 'assets/streets.gif'
import vipThumbnail from 'assets/vip.jpg?preset=thumbnail&resize=true'
import wotlikThumbnail from 'assets/wotlik.jpg?preset=thumbnail&resize=true'
import yayoThumbnail from 'assets/yayo.jpg?preset=thumbnail&resize=true'
import zladyThumbnail from 'assets/zlady.jpg?preset=thumbnail&resize=true'
import angelThumbnail from 'assets/angel.jpg?preset=thumbnail&resize=true'
import radcatThumbnail from 'assets/radcat.jpg?preset=thumbnail&resize=true'
import kawamiiThumbnail from 'assets/kawami.jpg?preset=thumbnail&resize=true'

/* Test vite's import.meta.glob */
/* 
const thumbnails = import.meta.glob('assets/*.jpg', {
  query: { preset: 'thumbnail', resize: true },
  eager: true,
})
console.log(thumbnails)
*/

type Collection = {
  image: ResizedImage[]
  name: string
  link: `https://${string}`
}

const approved: Collection[] = [
  {
    image: miladyThumbnail,
    name: 'Milady Maker',
    link: 'https://pro.opensea.io/collection/milady',
  },
  {
    image: schizoThumbnail,
    name: 'Schizoposters',
    link: 'https://pro.opensea.io/collection/schizoposters',
  },
  {
    image: pixeladyThumbnail,
    name: 'Pixelady Maker',
    link: 'https://pro.opensea.io/collection/pixeladymaker',
  },
  {
    image: remilioThumbnail,
    name: 'Redacted Remilio Babies',
    link: 'https://pro.opensea.io/collection/remilio-babies',
  },
  {
    image: bonklerThumbnail,
    name: 'Bonkler',
    link: 'https://pro.opensea.io/collection/bonkler',
  },
  {
    image: bitchThumbnail,
    name: 'Milady that B.I.T.C.H.',
    link: 'https://pro.opensea.io/collection/miladybitch',
  },
  {
    image: bannersThumbnail,
    name: 'Banners',
    link: 'https://pro.opensea.io/collection/banners-nft',
  },
  {
    image: radbroThumbnail,
    name: 'Radbro Webring',
    link: 'https://pro.opensea.io/collection/radbro-webring',
  },
  {
    image: yayoThumbnail,
    name: 'YAYO NFT',
    link: 'https://pro.opensea.io/collection/yayo-nft',
  },
  {
    image: auraThumbnail,
    name: 'milady aura',
    link: 'https://pro.opensea.io/collection/miladyaura',
  },
  {
    image: godsThumbnail,
    name: 'Gods Remix',
    link: 'https://pro.opensea.io/collection/godsremix',
  },
  {
    image: miauraThumbnail,
    name: 'spring miaura',
    link: 'https://pro.opensea.io/collection/spring-miaura',
  },
  {
    image: vipThumbnail,
    name: 'Very Internet Person',
    link: 'https://pro.opensea.io/collection/veryinternetperson',
  },
  {
    image: petzThumbnail,
    name: 'milady aura petz',
    link: 'https://pro.opensea.io/collection/milady-aura-petz',
  },
  {
    image: shiroThumbnail,
    name: '*Oh... I see by shirosamaa',
    link: 'https://opensea.io/collection/shiro-oh-i-see',
  },
  {
    image: rockThumbnail,
    name: 'Milady x EtherRock',
    link: 'https://pro.opensea.io/collection/milady-x-etherrock',
  },
  {
    image: meowladyThumbnail,
    name: 'Meowlady Maker',
    link: 'https://pro.opensea.io/collection/meowlady-maker',
  },
  {
    image: pixelbroThumbnail,
    name: 'Pixelady Maker Radbro',
    link: 'https://pro.opensea.io/collection/pixeladymaker-radbro',
  },
  {
    image: wotlikThumbnail,
    name: 'Pixelady Maker WOTLIK',
    link: 'https://pro.opensea.io/collection/pixeladymaker-wotlk',
  },
  {
    image: pixelbcThumbnail,
    name: 'Pixelady Maker BC',
    link: 'https://pro.opensea.io/collection/pixeladymaker-bc',
  },
  {
    image: mifairyThumbnail,
    name: 'Mifairy Maker',
    link: 'https://pro.opensea.io/collection/mifairy-maker',
  },
  {
    image: stationThumbnail,
    name: 'MiladyStation',
    link: 'https://pro.opensea.io/collection/miladystation',
  },
  {
    image: malilyThumbnail,
    name: 'water malilys',
    link: 'https://pro.opensea.io/collection/water-mililys',
  },
  {
    image: cigawretteThumbnail,
    name: 'Cigawrette Packs',
    link: 'https://pro.opensea.io/collection/cigawrettepacks',
  },
  {
    image: radcatThumbnail,
    name: 'Radbro Webring: Radcats',
    link: 'https://pro.opensea.io/collection/radbro-radcats',
  },
  {
    image: oekakiThumbnail,
    name: 'Oekaki Maker',
    link: 'https://pro.opensea.io/collection/oekakimaker',
  },
  {
    image: ghibladyThumbnail,
    name: 'Ghiblady Maker',
    link: 'https://pro.opensea.io/collection/ghibladymaker',
  },
  {
    image: sadbroThumbnail,
    name: 'Sadbros95',
    link: 'https://pro.opensea.io/collection/sadbros95',
  },
  {
    image: [{ class: '', srcset: streetThumbnail, src: streetThumbnail, type: 'image/gif', loading: 'lazy' }],
    name: 'Streets of Milady',
    link: 'https://pro.opensea.io/collection/streetsofmilady',
  },
  {
    image: heiseiThumbnail,
    name: 'Heisei Milady Maker',
    link: 'https://pro.opensea.io/collection/heisei-milady-maker',
  },
  {
    image: columbiaThumbnail,
    name: 'Milady Colombia',
    link: 'https://pro.opensea.io/collection/miladycolombia',
  },
  {
    image: raveThumbnail,
    name: 'MiladyRave',
    link: 'https://pro.opensea.io/collection/miladyrave',
  },
  {
    image: sonoraThumbnail,
    name: 'Sonora Maker',
    link: 'https://pro.opensea.io/collection/sonoramaker',
  },
  {
    image: matrixThumbnail,
    name: 'Matrix Milady',
    link: 'https://pro.opensea.io/collection/matrix-milady',
  },
  {
    image: rememThumbnail,
    name: 'Remembrance Banners',
    link: 'https://pro.opensea.io/collection/remembrance-banners',
  },
  {
    image: zladyThumbnail,
    name: 'Zlady Maker',
    link: 'https://pro.opensea.io/collection/zladymaker',
  },
  {
    image: r3dThumbnail,
    name: 'R3DBRO',
    link: 'https://pro.opensea.io/collection/r3dbro',
  },
  {
    image: milThumbnail,
    name: 'milAIdy maker',
    link: 'https://pro.opensea.io/collection/milaidymaker',
  },
  {
    image: meowlady2Thumbnail,
    name: 'Meowlady Maker 2',
    link: 'https://pro.opensea.io/collection/meowlady-maker-2',
  },
  {
    image: asciiThumbnail,
    name: 'Ascii Milady',
    link: 'https://pro.opensea.io/collection/ascii-milady',
  },
  {
    image: milaidyThumbnail,
    name: 'milAIdys',
    link: 'https://pro.opensea.io/collection/milaidys',
  },
  {
    image: popsThumbnail,
    name: 'Schizopops',
    link: 'https://pro.opensea.io/collection/schizopops',
  },
  {
    image: angelThumbnail,
    name: 'Angel Banners',
    link: 'https://pro.opensea.io/collection/angel-banners',
  },
  {
    image: janklerThumbnail,
    name: 'Janklerz',
    link: 'https://pro.opensea.io/collection/janklerz',
  },
  {
    image: kawamiiThumbnail,
    name: 'Kawamii Teens',
    link: 'https://pro.opensea.io/collection/kawamii',
  },
  {
    image: strawberryThumbnail,
    name: 'Strawberry Juice',
    link: 'https://pro.opensea.io/collection/strawberryjuice',
  },
  {
    image: boredThumbnail,
    name: 'Bored Milady Maker',
    link: 'https://pro.opensea.io/collection/boredmilady',
  },
  {
    image: babiesThumbnail,
    name: 'Reptilian Babies',
    link: 'https://pro.opensea.io/collection/reptilianbabies',
  },
  {
    image: mfersThumbnail,
    name: 'milady mfers',
    link: 'https://pro.opensea.io/collection/milady-mfers',
  },
]

export { approved }
