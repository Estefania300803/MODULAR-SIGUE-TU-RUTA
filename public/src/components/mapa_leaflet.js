// Declarar la variable global
let polyC01, polyC02;
let map;
document.addEventListener("DOMContentLoaded", function () {
  const rutaC02 = [
    [20.84197667, -102.79272667],
    [20.82569790, -102.79237667],
    [20.82549333, -102.79176333],
    [20.82156000, -102.77916167],
    [20.82144833, -102.77847167],
    [20.821330, -102.778083], //EMPIEZA LA GLORIETA
    [20.821225, -102.77805667],
    [20.82117167, -102.77803667],
    [20.82111833, -102.77801167],
    [20.82106667, -102.777975],
    [20.82102, -102.77792],
    [20.82097667, -102.77786167],
    [20.82094, -102.77779667],
    [20.820915, -102.777735],
    [20.8209, -102.77766667],
    [20.82089667, -102.77760167],
    [20.82090667, -102.77753833],
    [20.82092667, -102.77747833],
    [20.82095167, -102.77742333],
    [20.82098000, -102.77737333],
    [20.82101500, -102.77733000],
    [20.82105333, -102.77729167],
    [20.82109000, -102.77726167],
    [20.82112167, -102.77723333],
    [20.82114500, -102.77720333],
    [20.821145, -102.777117], //FIN DE LA GLORIETA
    [20.820844, -102.775581],
    [20.81977000, -102.76943000],
    [20.81963167, -102.76909000],
    [20.81960600, -102.76900],
    [20.81961667, -102.76859500],
    [20.819735, -102.76734833],
    [20.819695, -102.767249],
    [20.816508, -102.766374],
    [20.81640667, -102.76610167],
    [20.81624667, -102.76571167],
    [20.816002, -102.765388],
    [20.816009, -102.764672],
    [20.810609, -102.764707],
    [20.808054, -102.764766],
    [20.807958, -102.763790],
    [20.801334, -102.763640],
    [20.801302, -102.764400],
    [20.801274, -102.764469],
    [20.801243, -102.764476],
    [20.801223, -102.764469],
    [20.801223, -102.763640],
    [20.800552, -102.763080],
    [20.804140, -102.758698],
    [20.810186, -102.758524],
    [20.810097, -102.759765],
    [20.812185, -102.759765],
    [20.817433, -102.759700],
    [20.823700, -102.760520],
    [20.823380, -102.762580],
    [20.823043, -102.762520],
    [20.822892, -102.766538],
    [20.820990, -102.766538],
    [20.820760, -102.768939],
    [20.820466, -102.771528],
    [20.820369, -102.772259],
    [20.820335, -102.772336],
    [20.820335, -102.772402],
    [20.820487, -102.773254],
    [20.82053500, -102.77355833],
    [20.82054667, -102.77362667],
    [20.821180, -102.777120],
    [20.82123000, -102.77720333],
    [20.82141833, -102.77724500],
    [20.82158667, -102.77742333],
    [20.821646, -102.777590],
    [20.82161167, -102.77775167],
    [20.821536, -102.777906],
    [20.821446, -102.777977],
    [20.821353, -102.778026],
    [20.821406, -102.778169],
    [20.821531, -102.778646],
    [20.823075, -102.783582],
    [20.824372, -102.787835],
    [20.826547, -102.787106],
    [20.826933, -102.790255],
    [20.825309, -102.790834],
    [20.825722, -102.792321],
    [20.841980, -102.792598], //Entrada Uni
    [20.841938, -102.792043],
    [20.841803, -102.791459],
    [20.841619, -102.790804],
    [20.841356, -102.789994],
    [20.841160, -102.789251],
    [20.841014, -102.788546],
    [20.840833, -102.787644],
    [20.840812, -102.787451],
    [20.840840, -102.787277],
    [20.840913, -102.787119],
    [20.841087, -102.786991],
    [20.841886, -102.786405],
    [20.842046, -102.786286],
    [20.842160, -102.786195],
    [20.842315, -102.786054],
    [20.842771, -102.785654],
    [20.843480, -102.784957],
    [20.844693, -102.783510],
    [20.846050, -102.781955],
    [20.846040, -102.781969],
    [20.846388, -102.781714],
    [20.846742, -102.781328],
    [20.846832, -102.781303],
    [20.846877, -102.781253],
    [20.846905, -102.781219],
    [20.846971, -102.781194],
    [20.847041, -102.781215],
    [20.847085, -102.781267],
    [20.847097, -102.781298],
    [20.847104, -102.781362],
    [20.847093, -102.781390],
    [20.847073, -102.781427],
    [20.847043, -102.781475],
    [20.847019, -102.781482],
    [20.846990, -102.781477],
    [20.846934, -102.781483],
    [20.846895, -102.781440],
    [20.846860, -102.781407],
    [20.846846, -102.781372],
    [20.846826, -102.781323],
    [20.846760, -102.781340],
    [20.846404, -102.781734],
    [20.846050, -102.781955],
    [20.844711, -102.783527],
    [20.843491, -102.784971],
    [20.842782, -102.785666],
    [20.842177, -102.786213],
    [20.842054, -102.786309],
    [20.840925, -102.787132],
    [20.840827, -102.787427],
    [20.840833, -102.787644],
    [20.841014, -102.788546],
    [20.841160, -102.789251],
    [20.841356, -102.789994],
    [20.841619, -102.790804],
    [20.841803, -102.791459],
    [20.841938, -102.792043],
    [20.842006, -102.792600],
    [20.842006, -102.79272667],
    [20.84197667, -102.79272667] //Entrada Uni
  ];

  //RUTA CERRITO-CENTRO DESDE CUALTOS
  const rutaC01 = [
    [20.84197667, -102.79272667],
    [20.82569790, -102.79237667],
    [20.82549333, -102.79176333],
    [20.825223, -102.790895],
    [20.826980, -102.790320],
    [20.827073, -102.790809],
    [20.827953, -102.790580],
    [20.827491, -102.786962],
    [20.826548, -102.787113],
    [20.824271, -102.787859],
    [20.82156000, -102.77916167],
    [20.82144833, -102.77847167],
    [20.821330, -102.778083], //EMPIEZA LA GLORIETA
    [20.821225, -102.77805667],
    [20.82117167, -102.77803667],
    [20.82111833, -102.77801167],
    [20.82106667, -102.777975],
    [20.82102, -102.77792],
    [20.82097667, -102.77786167],
    [20.82094, -102.77779667],
    [20.820915, -102.777735],
    [20.8209, -102.77766667],
    [20.82089667, -102.77760167],
    [20.82090667, -102.77753833],
    [20.82092667, -102.77747833],
    [20.82095167, -102.77742333],
    [20.82098000, -102.77737333],
    [20.82101500, -102.77733000],
    [20.82105333, -102.77729167],
    [20.82109000, -102.77726167],
    [20.82112167, -102.77723333],
    [20.82114500, -102.77720333],
    [20.821145, -102.777117], //FIN DE LA GLORIETA
    [20.820844, -102.775581],
    [20.81977000, -102.76943000],
    [20.81963167, -102.76909000],
    [20.81960600, -102.76900],
    [20.81961667, -102.76859500],
    [20.819735, -102.76734833],
    [20.819740, -102.767120],
    [20.819907, -102.765610],
    [20.821033, -102.765615],
    [20.824122, -102.765613],
    [20.824243, -102.761843],
    [20.820422, -102.761438],
    [20.820530, -102.759451],
    [20.820543, -102.759014],
    [20.820741, -102.757878],
    [20.818543, -102.757920],
    [20.815573, -102.757860],
    [20.812085, -102.757905],
    [20.810230, -102.757738],
    [20.810138, -102.759242],
    [20.807595, -102.759279],
    [20.804083, -102.759491],
    [20.803607, -102.759637],
    [20.802037, -102.761606],
    [20.800811, -102.763162],
    [20.801328, -102.763585],
    [20.801334, -102.763640],
    [20.801302, -102.764400],
    [20.801274, -102.764469],
    [20.801243, -102.764476],
    [20.801223, -102.764469],
    [20.801223, -102.763640],
    [20.801223, -102.763525],
    [20.807952, -102.763700],
    [20.809860, -102.763703],
    [20.809738, -102.765655],
    [20.813282, -102.765605],
    [20.813218, -102.763754],
    [20.814913, -102.763768],
    [20.817140, -102.763825],
    [20.817123, -102.766438],
    [20.820928, -102.767510],
    [20.820698, -102.769282],
    [20.820466, -102.771528],
    [20.820369, -102.772259],
    [20.820335, -102.772336],
    [20.820335, -102.772402],
    [20.820487, -102.773254],
    [20.82053500, -102.77355833],
    [20.82054667, -102.77362667],
    [20.821180, -102.777120],
    [20.82123000, -102.77720333],
    [20.82141833, -102.77724500],
    [20.82158667, -102.77742333],
    [20.821646, -102.777590],
    [20.82161167, -102.77775167],
    [20.821536, -102.777906],
    [20.821446, -102.777977],
    [20.821353, -102.778026],
    [20.821406, -102.778169],
    [20.821531, -102.778646],
    [20.823075, -102.783582],
    [20.824372, -102.787835],
    [20.825722, -102.792321],
    [20.841980, -102.792598], //Entrada Uni
    [20.841938, -102.792043],
    [20.841803, -102.791459],
    [20.841619, -102.790804],
    [20.841356, -102.789994],
    [20.841160, -102.789251],
    [20.841014, -102.788546],
    [20.840833, -102.787644],
    [20.840812, -102.787451],
    [20.840840, -102.787277],
    [20.840913, -102.787119],
    [20.841087, -102.786991],
    [20.841886, -102.786405],
    [20.842046, -102.786286],
    [20.842160, -102.786195],
    [20.842315, -102.786054],
    [20.842771, -102.785654],
    [20.843480, -102.784957],
    [20.844693, -102.783510],
    [20.846050, -102.781955],
    [20.846040, -102.781969],
    [20.846388, -102.781714],
    [20.846742, -102.781328],
    [20.846832, -102.781303],
    [20.846877, -102.781253],
    [20.846905, -102.781219],
    [20.846971, -102.781194],
    [20.847041, -102.781215],
    [20.847085, -102.781267],
    [20.847097, -102.781298],
    [20.847104, -102.781362],
    [20.847093, -102.781390],
    [20.847073, -102.781427],
    [20.847043, -102.781475],
    [20.847019, -102.781482],
    [20.846990, -102.781477],
    [20.846934, -102.781483],
    [20.846895, -102.781440],
    [20.846860, -102.781407],
    [20.846846, -102.781372],
    [20.846826, -102.781323],
    [20.846760, -102.781340],
    [20.846404, -102.781734],
    [20.846050, -102.781955],
    [20.844711, -102.783527],
    [20.843491, -102.784971],
    [20.842782, -102.785666],
    [20.842177, -102.786213],
    [20.842054, -102.786309],
    [20.840925, -102.787132],
    [20.840827, -102.787427],
    [20.840833, -102.787644],
    [20.841014, -102.788546],
    [20.841160, -102.789251],
    [20.841356, -102.789994],
    [20.841619, -102.790804],
    [20.841803, -102.791459],
    [20.841938, -102.792043],
    [20.842006, -102.792600],
    [20.842006, -102.79272667],
    [20.84197667, -102.79272667] //Entrada Uni
  ]

  // Inicializar el mapa centrado en la primera coordenada de la ruta, con límites flexibles
  map = L.map("mi_mapa", {
    maxBounds: [
      [20.77, -102.83], // suroeste
      [20.88, -102.74], // noreste
    ],
    maxBoundsViscosity: 0.4, // permite algo de movimiento sin bloquear por completo
    minZoom: 13,
    maxZoom: 20
  }).setView(rutaC02[0], 18);

  // Capa base de OpenStreetMap
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Crear la ruta C02 con interacciones
  polyC02 = L.polyline(rutaC02, {
    color: "red",
    weight: 5,
    opacity: 0.8
  });

  polyC02.on("mouseover", function (e) {
    this.setStyle({ color: "orange", weight: 6 });
    this.bringToFront();
  });
  polyC02.on("mouseout", function (e) {
    this.setStyle({ color: "red", weight: 6 });
  });

  // Crear la ruta C01 con interacciones
  polyC01 = L.polyline(rutaC01, {
    color: "blue",
    weight: 5,
    opacity: 0.8
  });

  polyC01.on("mouseover", function (e) {
    this.setStyle({ color: "deepskyblue", weight: 7 });
    this.bringToFront();
  });
  polyC01.on("mouseout", function (e) {
    this.setStyle({ color: "blue", weight: 5 });
  });


  // Ajustar el zoom para mostrar ambas rutas
  const allCoords = rutaC01.concat(rutaC02);
  map.fitBounds(L.latLngBounds(allCoords));


  /* Marcadores de inicio y fin
  L.marker(rutaC02[0]).addTo(map).bindPopup("Inicio");
  L.marker(rutaC02[rutaC02.length - 1]).addTo(map).bindPopup("Fin");  */

  /* Marcadores de inicio y fin
  L.marker(rutaC02[0]).addTo(map).bindPopup("Inicio");
  L.marker(rutaC02[rutaC02.length - 1]).addTo(map).bindPopup("Fin");  */

  /* MARCADOR AXILIAR PARA IDENTIFICAR UNA COORDENADA
  const coordenada = [20.830667, -102.792525];
  // Crear marcador
  L.marker(coordenada)
    .addTo(map)
    .bindPopup("Cruce San Luis y Carretera Yahualica-Tepa")
    .openPopup();
  */

  // Lista de coordenadas con sus nombres
  const coordenadasConNombres = [
    { lat: 20.830667, lon: -102.792525, nombre: "Cruce Carretera Yahualica-Tepa y San Luis" },
    { lat: 20.825306, lon: -102.791397, nombre: "López Mateos y Cruce Carretera Yahualica-Tepa" },
    { lat: 20.824266, lon: -102.788171, nombre: "López Mateos" },
    { lat: 20.822490, lon: -102.782244, nombre: "Cruce López Mateos y Las palmas" },
    { lat: 20.82092667, lon: -102.77747833, nombre: "Glorieta colonias" },
    { lat: 20.820770, lon: -102.775401, nombre: "Cruce López Mateos y Mayas" },
    { lat: 20.820493, lon: -102.773704, nombre: "Calle López Mateos" },
    { lat: 20.820088, lon: -102.771649, nombre: "Cruce López Mateos y Aquiles Sérdan" },
    { lat: 20.819664, lon: -102.769242, nombre: "Cruce López Mateos y Gómez Morin" },
    { lat: 20.819704, lon: -102.767261, nombre: "Cruce Félix Ramos y González Gallo" },
    { lat: 20.818199, lon: -102.766898, nombre: "Sagrada Familia" },
    { lat: 20.816559, lon: -102.766443, nombre: "Cruce Gonzalez Gallo y J. Cruz Ramirez" },
    { lat: 20.81579167, lon: -102.76473667, nombre: "Cruce Vallarta y San Martín" },
    { lat: 20.81417333, lon: -102.76472000, nombre: "Colegio Morelos" },
    { lat: 20.81290833, lon: -102.76473833, nombre: "Parque del beso" },
    { lat: 20.80997667, lon: -102.76474833, nombre: "Cruce Niños Heroes y Revolución" },
    { lat: 20.807910, lon: -102.763795, nombre: "Cruce J.Caro Galindo y Matamoros" },
    { lat: 20.80665833, lon: -102.76375500, nombre: "Calle Matamoros" },
    { lat: 20.80137167, lon: -102.76398833, nombre: "Central" },
    { lat: 20.80467167, lon: -102.75863667, nombre: "Oxxo, Calle Hidalgo" },
    { lat: 20.80800500, lon: -102.75864167, nombre: "IMSS" },
    { lat: 20.81015000, lon: -102.75963833, nombre: "Cruce 5 de febrero e Independencia" },
    { lat: 20.81291000, lon: -102.75977167, nombre: "Cruce Independencia y Colón" },
    { lat: 20.81544167, lon: -102.75977833, nombre: "Casa de la cultura" },
    { lat: 20.817432, lon: -102.759674, nombre: "Cruce 16 de septiembre y Moctezuma" },
    { lat: 20.818954, lon: -102.759874, nombre: "Cruce 16 de septiembre y Mariano J." },
    { lat: 20.821534, lon: -102.760217, nombre: "Cruce 16 de septiembre y Gral. Anaya" },
    { lat: 20.82340500, lon: -102.76053167, nombre: "Cruce 16 de sep. y Antonio Rojas" },
    { lat: 20.82294333, lon: -102.76551667, nombre: "Cruce Antonio Rojas y Alvaro Obregon" },
    { lat: 20.82093833, lon: -102.76735167, nombre: "Cruce Gral. Anaya y González Gallo" },
    { lat: 20.82045167, lon: -102.77148500, nombre: "Cruce Gral. Anaya y Aquiles Serdán" },
    { lat: 20.82043833, lon: -102.77306000, nombre: "Cruce José Gpe y López Mateos" },
    { lat: 20.82077500, lon: -102.77505667, nombre: "Cruce López Mateos y Mayas" },
    { lat: 20.82163167, lon: -102.77767000, nombre: "Glorieta Colonias" },
    { lat: 20.82311000, lon: -102.78362500, nombre: "Cruce Av. López Mateos y Alemania" },
    { lat: 20.82694833, lon: -102.79018833, nombre: "Cruce Hacienda Mirandilla y Trasquila" },
    { lat: 20.82548500, lon: -102.79083500, nombre: "Cruce Hacienda Trasquilla y López Mateos" },
    { lat: 20.83383500, lon: -102.79247500, nombre: "Cruce km 71 y Avila Camacho" },
    { lat: 20.84169500, lon: -102.79261000, nombre: "Cruce km 71 y Rafael Casillas Aceves" },
    { lat: 20.847123, lon: -102.781430, nombre: "CUALTOS" },
    { lat: 20.84104333, lon: -102.79275167 },
    //PARADAS SOLO DE C01
    { lat: 20.81246667, lon: -102.76562167, nombre: "Cruce Manuel Altamirano y Gpe. Victoria" },
    { lat: 20.813207, lon: -102.763765, nombre: "Cruce Manuel doblado y matamoros" },
    { lat: 20.81482500, lon: -102.76377500, nombre: "Cruce Matamoros y Morelos" },
    { lat: 20.817138, lon: -102.763776, nombre: "Cruce H. Garza y Moctezuma" },
    { lat: 20.81872833, lon: -102.76695000, nombre: "Gonzalez Gallo" },
    { lat: 20.81960333, lon: -102.76716000, nombre: "Oxxo Gonzalez Gallo" },
    { lat: 20.82077167, lon: -102.76749000, nombre: "Escuela 5 de mayo" },
    { lat: 20.82075667, lon: -102.76915500, nombre: "Cruce Gral Anaya y González hermosillo" },
    { lat: 20.82048667, lon: -102.77136000, nombre: "Gral Anaya y Aquiles serdan" },
    { lat: 20.834383, lon: -102.792612 },
    { lat: 20.83232333, lon: -102.79263000 },
    { lat: 20.82685500, lon: -102.79033667, nombre: "Cruce Hda. la Trasquila y Mirandilla" },
    { lat: 20.827450, lon: -102.790730, nombre: "Cruce Hda. Sta. Ana Apacueco y la Mina" },
    { lat: 20.827481, lon: -102.787027, nombre: "Cruce Hda. La Mina y de Guadalupe" },
    { lat: 20.82400500, lon: -102.76564667, nombre: "Cruce Alvaro Obregon y J. Luis Velazco" },
    { lat: 20.824157, lon: -102.763797, nombre: "Cruce J. Luis Velazco y Allende" },
    { lat: 20.822373, lon: -102.761678, nombre: "Cruce Madero y Avila Camacho" },
    { lat: 20.82062000, lon: -102.76152667, nombre: "Cruce Mapelo y Felix Ramos" },
    { lat: 20.82072167, lon: -102.75806167, nombre: "Cruce Josefa Ortiz y Galeana" },
    { lat: 20.81696167, lon: -102.75789167, nombre: "Cruce Galeana y Zaragoza" },
    { lat: 20.81305333, lon: -102.75789167, nombre: "Cruce Pedro Medina y Colón" },
    { lat: 20.81043500, lon: -102.75777000, nombre: "Cruce Pedro Medina y 5 de Febrero" },
    { lat: 20.80856833, lon: -102.75929667, nombre: "IMSS familiar" },
    { lat: 20.80480333, lon: -102.75951500, nombre: "Policlinica" },
    { lat: 20.80137833, lon: -102.76393833, nombre: "Central" },
    { lat: 20.80355667, lon: -102.76360000, nombre: "Rio" },
    { lat: 20.80546333, lon: -102.76363500, nombre: "Unidad deportiva Morelos" },
    { lat: 20.80985667, lon: -102.76449500, nombre: "Cruce Revolución y Niños Heroes" },
    { lat: 20.81079167, lon: -102.76567833, nombre: "Cruce Calle y Privada Manuel Altamirano" }
  ];

    // === Buscador de paradas ===
  const input = document.getElementById("buscador-paradas");
  const sugerencias = document.getElementById("sugerencias-paradas");

  input.addEventListener("input", () => {
    const texto = input.value.toLowerCase();
    sugerencias.innerHTML = "";

    if (texto.length === 0) {
      sugerencias.style.display = "none";
      return;
    }

    const resultados = coordenadasConNombres.filter(p =>
      p.nombre && p.nombre.toLowerCase().includes(texto)
    );

    if (resultados.length === 0) {
      sugerencias.style.display = "none";
      return;
    }

    resultados.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("sugerencia-item");
      div.textContent = p.nombre;
      div.style.cursor = "pointer";
      div.style.padding = "5px";
      div.addEventListener("click", () => {
        map.setView([p.lat, p.lon], 18);
        L.popup()
          .setLatLng([p.lat, p.lon])
          .setContent(p.nombre)
          .openOn(map);
        sugerencias.style.display = "none";
        input.value = "";
      });
      sugerencias.appendChild(div);
    });

    sugerencias.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!sugerencias.contains(e.target) && e.target !== input) {
      sugerencias.style.display = "none";
    }
  });


  // Crear un ícono más pequeño
  const iconoMini = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [10, 16],     // ancho, alto (por defecto es [25, 41], punto medio [15,25])
    iconAnchor: [5, 16],    // punto del ícono que se alinea con la coordenada
    popupAnchor: [0, -12]
  });

  // Aplicar el ícono a cada marcador
  coordenadasConNombres.forEach(punto => {
    L.marker([punto.lat, punto.lon], { icon: iconoMini })
      .addTo(map)
      .bindPopup(punto.nombre);
  });

});

// ====== Agregar ubicación del usuario ======
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      // Crear icono rojo
      var redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [10, 16],     // ancho, alto (por defecto es [25, 41], punto medio [15,25])
        iconAnchor: [5, 16],    // punto del ícono que se alinea con la coordenada
        popupAnchor: [0, -12],
        shadowSize: [41, 41]
      });

      // Mostrar marcador en la ubicación del usuario
      L.marker([lat, lon], { icon: redIcon })
        .addTo(map)
        .bindPopup('Tu ubicación actual')
        .openPopup();

      // Opcional: centrar el mapa (si quieres quitarlo, comenta la siguiente línea)
      map.setView([lat, lon], 15);
    },
    function (error) {
      console.error('Error al obtener ubicación:', error.message);
      alert('No se pudo obtener tu ubicación: ' + error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
} else {
  alert('Tu navegador no soporta geolocalización.');
}
