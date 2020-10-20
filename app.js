var svg = d3.select("svg"), //La variable
  width = +svg.attr("width"), //vale para obtener y/o modificar valores en los atributos de los diferentes elementos del DOM de una página web  
  height = +svg.attr("height"), //vale para obtener y/o modificar valores en los atributos de los diferentes elementos del DOM de una página web
  sites = d3.range(100).map(function(d) {
    return [Math.random() * width, Math.random() * height];
  }), 
  //Declaramos una variable para que D3 opere. Se está mapeando cada valor del rango creado a un objeto, por lo que se drefiere a cada valor del rango a su vez. 
  //Creará una matriz de números enteros, cuando .map() se llama en la matriz, accedemos a cada valor a su vez a través de la función de devolución de llamada.
  //La función de devolución de llamada devuelve un objeto para cada valor de la matriz. Entonces, la variable sites será una matriz que contiene objetos con una propiedad.
  // Este retorno es una matriz que opera segun el tamaño del "lienzo".
  voronoi = d3.voronoi().extent([[0, 0], [width, height]]),
  //establece la extensión del clip del diseño de Voronoi en los límites especificados y devuelve el diseño. 
  //Los límites de la extensión se especifican como una matriz, va de 0 a width y de 0 a height.
  //En teoria delimita el espacio donde se computara el diagrama.
  relaxedSites = voronoi(sites).polygons().map(d3.polygonCentroid),// Aplica al diagrama la Relajacion de Lloyd.
  diagram = voronoi(relaxedSites), 
  polygons = diagram.polygons(); 
//

// Dibuja los poligonos
polygons.map(function(i) {
svg.append("path")
  .attr("d", "M" + i.join("L") + "Z");
});