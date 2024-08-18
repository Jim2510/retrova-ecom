const products = [
  {
    id: 1,
    nomeP: "Simpatico T-shirt",
    img: "",
    info: "T-shirt in cotone 100%",
    prezzo: 19.99,
    desc: "T-shirt morbida e comoda, perfetta per ogni occasione.",
  },
  {
    id: 2,
    nomeP: "Elegante Giacca",
    img: "",
    info: "Giacca in lana",
    prezzo: 79.99,
    desc: "Giacca elegante e calda, ideale per l'inverno.",
  },
  {
    id: 3,
    nomeP: "Cappello Trendy",
    img: "",
    info: "Cappello in maglia",
    prezzo: 15.99,
    desc: "Cappello stiloso per tenere al caldo la testa.",
  },
  {
    id: 4,
    nomeP: "Orologio Classico",
    img: "",
    info: "Orologio da polso",
    prezzo: 99.99,
    desc: "Orologio elegante con cinturino in pelle.",
  },
  {
    id: 5,
    nomeP: "Sneakers Sportive",
    img: "",
    info: "Scarpe da ginnastica",
    prezzo: 59.99,
    desc: "Sneakers leggere e comode, perfette per l'attività fisica.",
  },
  {
    id: 6,
    nomeP: "Zaino Multiuso",
    img: "",
    info: "Zaino in nylon",
    prezzo: 34.99,
    desc: "Zaino spazioso con numerose tasche e scomparti.",
  },
  {
    id: 7,
    nomeP: "Occhiali da Sole",
    img: "",
    info: "Occhiali UV400",
    prezzo: 24.99,
    desc: "Occhiali da sole con protezione UV400 per proteggere gli occhi.",
  },
  {
    id: 8,
    nomeP: "Borsa Elegante",
    img: "",
    info: "Borsa in pelle",
    prezzo: 89.99,
    desc: "Borsa elegante e capiente, ideale per ogni occasione.",
  },
  {
    id: 9,
    nomeP: "Maglione Morbido",
    img: "",
    info: "Maglione in cashmere",
    prezzo: 119.99,
    desc: "Maglione caldo e morbido, perfetto per l'inverno.",
  },
  {
    id: 10,
    nomeP: "Portafoglio Slim",
    img: "",
    info: "Portafoglio in pelle",
    prezzo: 39.99,
    desc: "Portafoglio elegante e sottile, con diverse tasche.",
  },
  {
    id: 11,
    nomeP: "Sciarpa Lunga",
    img: "",
    info: "Sciarpa in lana",
    prezzo: 25.99,
    desc: "Sciarpa lunga e calda, perfetta per l'inverno.",
  },
  {
    id: 12,
    nomeP: "Guanti Termici",
    img: "",
    info: "Guanti in lana",
    prezzo: 18.99,
    desc: "Guanti caldi e comodi, ideali per le giornate fredde.",
  },
  {
    id: 13,
    nomeP: "Cintura Elegante",
    img: "",
    info: "Cintura in pelle",
    prezzo: 29.99,
    desc: "Cintura elegante, perfetta per completare il tuo outfit.",
  },
  {
    id: 14,
    nomeP: "Rilevatore di Fumo",
    img: "",
    info: "Dispositivo di sicurezza",
    prezzo: 14.99,
    desc: "Rilevatore di fumo per la tua sicurezza domestica.",
  },
  {
    id: 15,
    nomeP: "Lampada da Tavolo",
    img: "",
    info: "Lampada LED",
    prezzo: 44.99,
    desc: "Lampada da tavolo con luce regolabile e design elegante.",
  },
  {
    id: 16,
    nomeP: "Tavolino Moderno",
    img: "",
    info: "Tavolino in legno",
    prezzo: 89.99,
    desc: "Tavolino moderno e resistente, perfetto per il soggiorno.",
  },
  {
    id: 17,
    nomeP: "Frullatore Elettrico",
    img: "",
    info: "Frullatore ad alta potenza",
    prezzo: 59.99,
    desc: "Frullatore potente, ideale per smoothie e frappè.",
  },
  {
    id: 18,
    nomeP: "Caffettiera Italiana",
    img: "",
    info: "Caffettiera in alluminio",
    prezzo: 34.99,
    desc: "Caffettiera tradizionale per preparare un ottimo caffè.",
  },
  {
    id: 19,
    nomeP: "Cuscino Decorativo",
    img: "",
    info: "Cuscino in cotone",
    prezzo: 22.99,
    desc: "Cuscino morbido e decorativo per aggiungere comfort al tuo divano.",
  },
  {
    id: 20,
    nomeP: "Pannello Solare",
    img: "",
    info: "Pannello fotovoltaico",
    prezzo: 299.99,
    desc: "Pannello solare per generare energia rinnovabile.",
  },
  {
    id: 21,
    nomeP: "Asciugacapelli",
    img: "",
    info: "Asciugacapelli professionale",
    prezzo: 54.99,
    desc: "Asciugacapelli potente e silenzioso per risultati professionali.",
  },
  {
    id: 22,
    nomeP: "Caricabatterie Wireless",
    img: "",
    info: "Caricabatterie per smartphone",
    prezzo: 29.99,
    desc: "Caricabatterie wireless per una ricarica facile e veloce.",
  },
  {
    id: 23,
    nomeP: "Smartwatch",
    img: "",
    info: "Orologio smart",
    prezzo: 149.99,
    desc: "Smartwatch con monitoraggio fitness e notifiche smart.",
  },
  {
    id: 24,
    nomeP: "Echo Dot",
    img: "",
    info: "Assistente vocale intelligente",
    prezzo: 49.99,
    desc: "Assistente vocale per controllare la tua casa intelligente.",
  },
  {
    id: 25,
    nomeP: "Mini Frigo",
    img: "",
    info: "Frigo compatto",
    prezzo: 89.99,
    desc: "Mini frigo ideale per ufficio o camera da letto.",
  },
  {
    id: 26,
    nomeP: "Tenda da Sole",
    img: "",
    info: "Tenda per esterni",
    prezzo: 179.99,
    desc: "Tenda da sole resistente per proteggere dal sole.",
  },
  {
    id: 27,
    nomeP: "Racchetta da Tennis",
    img: "",
    info: "Racchetta professionale",
    prezzo: 89.99,
    desc: "Racchetta da tennis leggera e resistente, ideale per giocatori esperti.",
  },
  {
    id: 28,
    nomeP: "Bicicletta",
    img: "",
    info: "Bicicletta da città",
    prezzo: 349.99,
    desc: "Bicicletta robusta e comoda per spostamenti urbani.",
  },
  {
    id: 29,
    nomeP: "Televisore LED",
    img: "",
    info: "Televisore Full HD",
    prezzo: 399.99,
    desc: "Televisore LED con risoluzione Full HD e smart features.",
  },
  {
    id: 30,
    nomeP: "Frigo Congelatore",
    img: "",
    info: "Congelatore combinato",
    prezzo: 499.99,
    desc: "Frigo e congelatore combinato per conservare cibi freschi e congelati.",
  },
  {
    id: 31,
    nomeP: "Sedia Ergonomica",
    img: "",
    info: "Sedia da ufficio",
    prezzo: 129.99,
    desc: "Sedia ergonomica con supporto lombare per il massimo comfort.",
  },
  {
    id: 32,
    nomeP: "Cuscino Massaggiante",
    img: "",
    info: "Cuscino con funzione di massaggio",
    prezzo: 89.99,
    desc: "Cuscino massaggiante per alleviare la tensione muscolare.",
  },
  {
    id: 33,
    nomeP: "Rasoio Elettrico",
    img: "",
    info: "Rasoio per uomo",
    prezzo: 64.99,
    desc: "Rasoio elettrico con diverse testine per una rasatura precisa.",
  },
  {
    id: 34,
    nomeP: "Bicchiere da Vino",
    img: "",
    info: "Bicchiere in cristallo",
    prezzo: 19.99,
    desc: "Bicchiere da vino elegante e raffinato per ogni occasione.",
  },
  {
    id: 35,
    nomeP: "Tappeto Morbido",
    img: "",
    info: "Tappeto in peluche",
    prezzo: 79.99,
    desc: "Tappeto morbido e accogliente per il soggiorno o la camera.",
  },
  {
    id: 36,
    nomeP: "Sega Elettrica",
    img: "",
    info: "Sega per il fai da te",
    prezzo: 129.99,
    desc: "Sega elettrica potente per lavori di bricolage e falegnameria.",
  },
  {
    id: 37,
    nomeP: "Frullatore a Immersione",
    img: "",
    info: "Frullatore multifunzione",
    prezzo: 39.99,
    desc: "Frullatore a immersione per preparare zuppe e frullati.",
  },
  {
    id: 38,
    nomeP: "Tavolo da Pranzo",
    img: "",
    info: "Tavolo in legno massello",
    prezzo: 199.99,
    desc: "Tavolo da pranzo elegante e resistente, perfetto per la sala da pranzo.",
  },
  {
    id: 39,
    nomeP: "Cesto per la Biancheria",
    img: "",
    info: "Cesto in bambù",
    prezzo: 24.99,
    desc: "Cesto per la biancheria con capacità elevata e design elegante.",
  },
  {
    id: 40,
    nomeP: "Espresso Machine",
    img: "",
    info: "Macchina per caffè espresso",
    prezzo: 159.99,
    desc: "Macchina per preparare un perfetto caffè espresso.",
  },
  {
    id: 41,
    nomeP: "Cubo di Rubik",
    img: "",
    info: "Gioco di logica",
    prezzo: 9.99,
    desc: "Cubo di Rubik per sfide di logica e agilità mentale.",
  },
];

export default products;
