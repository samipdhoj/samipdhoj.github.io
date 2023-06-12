async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET'
  });
  return response.json();
}
let testVar = null;
var pathName = "Lukla-EBC"
var currentDifficulty = "beginner";
var backendURL = "https://api.laliguras.de"
var s3URL = "https://raw.githubusercontent.com/Isha-Karn/SQL_Learning/master"

var offset = 1.5;     // height of route from database points
var legNum = 0;       // used by routeOverlord to take each of the leg ids. has the total number of legs when all routes are drawn
// var totalLegs = 0;    // Gives total number of legs beforehand


require([
  "esri/config",
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/ElevationLayer",
  "esri/layers/ImageryLayer",
  "esri/PopupTemplate",
  "esri/widgets/Track",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/symbols/SimpleLineSymbol",
  "esri/geometry/SpatialReference",
  "esri/rest/route",
  "esri/rest/support/RouteParameters",
  "esri/rest/support/FeatureSet",
  "esri/geometry/Point",
  "esri/symbols/PictureMarkerSymbol",
  "esri/geometry/Polyline",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/TextSymbol",
  "esri/widgets/ElevationProfile",
  "esri/widgets/ElevationProfile/ElevationProfileViewModel",
  "esri/layers/support/RasterFunction",
  "esri/layers/GroupLayer",
  "esri/widgets/BasemapToggle",
  "esri/widgets/BasemapGallery",
  "dojo/on",

], function (
  esriConfig
  , Map
  , SceneView
  , ElevationLayer
  , ImageryLayer
  , PopupTemplate
  , Track
  , Graphic
  , GraphicsLayer
  , SimpleLineSymbol
  , SpatialReference
  , route
  , RouteParameters
  , FeatureSet
  , Point
  , PictureMarkerSymbol
  , Polyline
  , SimpleMarkerSymbol
  , SimpleLineSymbol
  , TextSymbol
  , ElevationProfile
  , ElevationProfileViewModel
  , RasterFunction
  , GroupLayer
  , BasemapToggle
  , BasemapGallery
  , on
) {

  esriConfig.apiKey = "AAPK0ab1ad9de14c4ec2827bc685240befc2oqSFsxEpdS40T8c6J3R2ES1fu2HdkNKAbQogfMbd6O1DaqWhQjmD_DsO0PZOnMaM";
  var map = new Map({
    basemap: "satellite",
    ground: "world-elevation",
    // maxScale: 100
  });


  var view = new SceneView({
    container: "viewDiv",
    map: map,
    environment: {
      colorCorrection: {
        brightness: -100,
        contrast: -100,
        hue: 0
      }
    },
    camera: {
      position: {
        x: 85.36206495348216,
        y: 28.16079021373097,
        z: 12000
      },
      tilt: 0.5,


    },
    constraints: {

      tilt: {
        max: 75
      }
    }
  });


  view.environment.colorCorrection = {
    brightness: 100,
    contrast: 0,
    hue: 0
  };
  var track = new Track({
    view: view,
    graphic: new Graphic({
      symbol: {
        type: "simple-marker",
        size: "12px",
        color: "green",
        outline: {
          color: "#efefef",
          width: "1.5px"
        }
      }
    }),
    useHeadingEnabled: false
  });
  view.ui.add(track, "top-left");

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "arcgis-topographic"
  });

  view.ui.add(basemapToggle, "bottom-right")



  // Create the BasemapGallery widget
  // const basemapGallery = new BasemapGallery({
  //   view: view,
  //   container: document.getElementById("basemapGalleryDiv")
  // });

  // // Define the desired basemaps
  // const hybridBasemap = new Basemap({
  //   portalItem: {
  //     id: "your_hybrid_basemap_id"
  //   }
  // });

  // const topoBasemap = new Basemap({
  //   portalItem: {
  //     id: "your_topo_basemap_id"
  //   }
  // });

  // // Add the desired basemaps to the BasemapGallery widget
  // basemapGallery.source.add(hybridBasemap);
  // basemapGallery.source.add(topoBasemap);

  // // Hide the BasemapGallery initially
  // basemapGallery.container.style.display = "none";

  // // Add event listener to the Layers button
  // var layersButton = document.getElementById("layersButton");
  // layersButton.addEventListener("click", function() {
  //   // Toggle the visibility of the BasemapGallery
  //   basemapGallery.container.style.display = basemapGallery.container.style.display === "none" ? "block" : "none";
  // });

  // // Add event listener to the BasemapGallery close button
  // var basemapGalleryClose = document.getElementById("basemapGalleryClose");
  // on(basemapGalleryClose, "click", function() {
  //   basemapGallery.container.style.display = "none";
  // });

  // // Add the widget to the top-right corner of the view
  // view.ui.add(basemapGallery, {
  //   position: "top-right"
  // });


  var profile = new ElevationProfile({
    view: view,
    profiles: [{
      type: "ground",
      color: "#7A9BCC",
      width: 2,
      unit: "feet"
    }]
  });

  //elevation profile
  // view.ui.add(profile, "bottom-left");


  // create elevation layer
  var profileTask = new ElevationProfile({
    url: "https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer",
  });

  profile.set("task", profileTask);

  // create elevation layer
  var elevationLayer = new ElevationLayer({
    url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
  });

  const currentElevationInfo = {
    mode: "relative-to-ground",
    offset: 5
  };

  const highlightedElevationInfo = {
    mode: "relative-to-ground",
    offset: 6
  };

  
  // Get longitude and latitude
  view.on("click", function (event) {
    // get the clicked point's coordinates
    var point = event.mapPoint;
    var longitude = point.longitude;
    var latitude = point.latitude;
    // addButton(longitude, latitude);
    // // query elevation at the clicked point
    // elevationLayer.queryElevation(point)
    //   .then(function(result) {
    //     // get the elevation value from the result
    //     var elevation = result.geometry.z;

    //     // log the coordinates and elevation
    console.log("Clicked point coordinates: ", latitude, longitude);
    //     console.log("Elevation at clicked point: ", elevation);
    //   })
    //   .catch(function(error) {
    //     console.error("Error querying elevation: ", error);
    //   });
  });


  async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET'
    });
    return response.json();
  }

  function difficultyButtonMaster(difficulty) {
    let diff = ['beginner', 'advanced', 'expert'];
    diff.splice(diff.indexOf(difficulty), 1);
    const difficultyBtn = document.getElementById(difficulty + "-btn");
    difficultyBtn.addEventListener("click", () => {
      currentDifficulty = difficulty;
      // For turining off other difficulty routes
      for (d of diff) {
        // console.log('Turning off layer', d + "RouteLayer")
        if (map.findLayerById(d + "RouteLayer")) map.findLayerById(d + "RouteLayer").visible = false;
        // hide the leg card of different difficulty
        // console.log(d + 'LegCardContainer set display none')
        console.log(d + 'LegCardContainer')
        document.getElementById(d + 'LegCardContainer').style = 'display: none;'
      }
      // For turining on required difficulty routes
      difficultyBtn.style.backgroundColor = "red";
      // console.log('Turning on layer', difficulty + "RouteLayer");
      map.findLayerById(difficulty + 'RouteLayer').visible = true;

      // Display the leg card detail for selected difficulty
      // console.log(difficulty+'LegCardContainer display set block')
      document.getElementById(difficulty + 'LegCardContainer').style = 'display: block;'
      // document.getElementById('

    });
  }

  function routeOverlord(pathName, difficulty) {
    const url = backendURL + '/route/' + pathName + '/difficulty/' + difficulty;
    const myPromise = getData(url);
    myPromise
      .then((data) => {
        testVar = data;

        let groupLayerName = difficulty + "RouteLayer";
        // console.log(groupLayerName);
        var groupLayer = new GroupLayer({
          id: groupLayerName,
          visible: (difficulty == currentDifficulty) ? true : false
        });
        map.add(groupLayer);
        let card = {
        }
        legCardGenerator(data, difficulty, 0);
        let totalLegs  =  data.length;
        setTimeout(() => {
          let standList = [];
          for (let i in data) {
            if (data[i]) {
              // console.log("data", data[i])
              let startLocation = data[i].start;

              for (let x of data[i].coords) {
                if (isNaN(x[0])) console.log('not a number found', x[0]);
                if (isNaN(x[1])) console.log('not a number found', x[1]);
              }

              // let legInfo = {
              //   start: startLocation,
              //   end: data[i].end,
              //   distance: data[i].distance,
              //   duration: data[i].duration,
              //   elevation: data[i].elevation
              // }
              // console.log('legcardgenerator for', i, 'leg')
              routeMaster(data[i].coords, i, groupLayerName, totalLegs, difficulty);
              // Condition removed
              // if (i == data.length - 1) {
              //   stand(startLocation, [data[i].coords.at(-1)[0], data[i].coords.at(-1)[1]])
              // }
              // else {
                if (!standList.includes(startLocation)){
                  stand(startLocation, [data[i].coords[0][0], data[i].coords[0][1]], groupLayerName);
                  standList.push(startLocation);
                }
              // }
            }
          }
        }, 1000);

        difficultyButtonMaster(difficulty);
      })

  }

  function stand(from, coord, groupLayerId) {
    var location = new Point({
      x: coord[0],
      y: coord[1],
      spatialReference: { wkid: 4326 }
    });

    var lineSymbol = new SimpleLineSymbol({
      color: "#FFD700",
      haloColor: [255, 194, 255],
      width: 3,
      style: "solid"
    });

    var markerSymbol;

    // Check if the village is the start or end village
    if (from === "Syabrubesi") {
      markerSymbol = new PictureMarkerSymbol({
        url: s3URL + "/Shoe.png",
        height: 40,
        width: 40,
      });
    }

    elevationLayer.queryElevation(location).then((result) => {
      if (result.geometry) {
        location = result.geometry;
        var graphics = [];

        var markerGraphic = new Graphic({
          geometry: {
            type: "polyline",
            paths: [[[location.x, location.y, 0], [location.x, location.y, 10]]]
          },
          symbol: markerSymbol
        });
        graphics.push(markerGraphic);

        if (from !== "Syabrubesi") {
          var lineGraphic = new Graphic({
            geometry: {
              type: "polyline",
              paths: [[[location.x, location.y, 0], [location.x, location.y, 100]]]
            },
            symbol: lineSymbol
          });
          graphics.push(lineGraphic);
        }

        var locationStand = LocationShower(location, from);
        graphics.push(locationStand);

        var groupLayer = map.findLayerById(groupLayerId);
        if (groupLayer) {
          var graphicsLayer = new GraphicsLayer({
            graphics: graphics,
            elevationInfo: currentElevationInfo
          });

          // Set the maximum and minimum scales for the layer
          graphicsLayer.maxScale = 500; // The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
          graphicsLayer.minScale = 200000; // The layer will not be visible when the view is zoomed out beyond a scale of 1:3,000,000

          groupLayer.add(graphicsLayer);
          map.add(groupLayer);
        } else {
          console.error("Group Layer not found in stand: ", groupLayerId);
        }
      }
    });
  }


  function addViewPoint(location, name, image_url) {
    // Create a point from the provided location
    var point = new Point({
      x: location[0],
      y: location[1],
      spatialReference: { wkid: 4326 }
    });

    // Create a picture marker symbol using the provided image URL
    var markerSymbol = new PictureMarkerSymbol({
      url: s3URL + "/View_point_icon.png",
      height: 32,
      width: 32,
      minScale: 2000,
      maxScale: 2500
    });

    // Create a popup template with the photo and viewpoint name
    var popupTemplate = new PopupTemplate({
      title: "{name}",
      content: '<a href="{image}" target="_blank"><img src="{image}" width="400" height="250"></a>'
    });

    // Create a graphic with the point, marker symbol, and popup template
    var graphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        name: name,
        image: image_url,
        elevation: 0 // you need to set the elevation value
      },
      popupTemplate: popupTemplate
    });

    // Add the graphic to the graphics layer
    var graphicsLayer = new GraphicsLayer
    graphicsLayer.elevationInfo = currentElevationInfo;
    graphicsLayer.add(graphic);
    map.add(graphicsLayer);


    // Set the maximum and minimum scales for the layer
    graphicsLayer.maxScale = 1000; // The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
    graphicsLayer.minScale = 200000; // The layer will not be visible when the view is zoomed out beyond a scale of 1:3,000,000


    // Set the view to the provided location and zoom level
    view.goTo({
      target: point,

    });
  }

  addViewPoint([85.56115600377703, 28.218051006003503], "GLA Lake", "https://raw.githubusercontent.com/Laliguras/lali-s3-temp/main/viewPoint/GLA_Lake_viewpoint.jpeg");
  addViewPoint([85.57093487320884, 28.21773512253451], "Kyanjin Ri Lower Peak", "https://raw.githubusercontent.com/Laliguras/lali-s3-temp/main/viewPoint/Kyanjin_Ri_viewpoint.jpeg");


  // function viewPointShower(location, name) {
  //   let textSymbol = {
  //     type: "text",
  //     color: [231,84,128],
  //     haloColor: [255, 194, 255],
  //     haloSize: 1,
  //     text: name,
  //     font: {
  //       size: 13,
  //       family: "univers-condensed",
  //       weight: "bold"
  //     }
  //   };

  //   var point = new Point({
  //     x: location[0],
  //     y: location[1],
  //     z: 120,
  //     spatialReference: { wkid: 4326 }
  //   });

  //   let textGraphic = new Graphic({
  //     geometry: point,
  //     symbol: textSymbol
  //   });

  //   var graphicsLayer = new GraphicsLayer();
  //   graphicsLayer.elevationInfo = currentElevationInfo;
  //   graphicsLayer.add(textGraphic);
  //   map.add(graphicsLayer);

  //   return textGraphic;
  // }

  // viewPointShower([85.56115600377703,28.218051006003503], "GLA Lake");
  // viewPointShower([85.57093487320884,28.21773512253451], "Kyanjin Ri Lower Peak");
  // //viewPointShower([85.56679346159257, 28.212975893712795], "Kyangjin View point");


  function routeMaster(routeCoords, legNum, groupLayerId, totalLegs,difficulty) {
    console.log("Hello")
    var route = new Polyline({
      paths: [routeCoords],
      spatialReference: {
        wkid: 4326
      }
    });

    profile.input = route;

    var routeSymbol = new SimpleLineSymbol({
      color: "#66FF66",
      width: 4
    });


    var routeGraphic = new Graphic({
      geometry: route,
      symbol: routeSymbol,
    });
    // console.log('searching gfroup layer')
    var groupLayer = map.findLayerById(groupLayerId);
    if (groupLayer) {
      var graphicsLayer = new GraphicsLayer();
      graphicsLayer.add(routeGraphic);
      graphicsLayer.elevationInfo = currentElevationInfo;
      groupLayer.add(graphicsLayer);
      map.add(groupLayer);
      graphicsLayer.maxScale = 500; // The layer will not be visible when the view is zoomed in beyond a scale of 1:1,000
      graphicsLayer.minScale = 300000; // The layer will not be visible when the view is zoomed out beyond a scale of 1:3,000,000

    }
    else {
      console.error('Group Layer not found in RouteMaster: ', groupLayerId);
    }

    var highlightSymbol = new SimpleLineSymbol({
      color: "#00FFFF",
      width: 5
    });

    // For route highlight
    for (var i = 0; i < totalLegs; i++) {
      id = difficulty+'Leg' + i.toString()+'Button';
      console.log('route master vitra',id,'total legs',totalLegs)
      if (document.getElementById(id)) {
        console.log('element exists',id)
        console.log('legnum and i', parseInt(legNum),i)
        if (i === parseInt(legNum)) {
          console.log('matched too',i,legNum,'for id ',id)
          document.getElementById(id).addEventListener("click", function () {
            graphicsLayer.elevationInfo = highlightedElevationInfo;
            routeGraphic.symbol = highlightSymbol;
            console.log('route ko color highlight')
            // graphicsLayer.refresh();
          });
        }
        else {
          document.getElementById(id).addEventListener("click", function () {
            routeGraphic.symbol = routeSymbol;
            graphicsLayer.elevationInfo = currentElevationInfo;
            // graphicsLayer.refresh();
            console.log('route ko color back to normal')
          });
        }
      }
    }

    // view.on("click", function (event) {
    //   view.hitTest(event).then(function (response) {
    //     if (response.results[0] != undefined && response.results[0] != null && Object.hasOwn(response.results[0], 'graphic')) {
    //       var feature = response.results[0].graphic;
    //       if (feature === routeGraphic) {
    //         console.log('ya puge')
    //         if (document.getElementById(difficulty+'leg' + legNum.toString())) document.getElementById(difficulty+'leg' + legNum.toString()).click();
    //         feature.symbol = highlightSymbol;
    //         // graphicsLayer.refresh();
    //       } else {
    //         routeGraphic.symbol = routeSymbol;
    //         // graphicsLayer.refresh();
    //       }
    //     }
    //   });
    // });

  }

  function pathMaster(pathName, difficulty) {
    var locations = giveCoordinate("source_paths", pathName, difficulty)
    locations.forEach(location => {
      stand(location, 10);
      LocationShower(location, 100);
    });

  }

  function stand_v0_5(placeName, elevation) {
    const url = backendURL + '/hotels/langtang/coordinates';
    const myPromise = getData(url);
    myPromise
      .then((data) => {
        // testVar = data;
        for (let i in data) {
          // console.log(i)
        }
      })
  }

   // Declare the graphicsLayer variable outside the function
let graphicsLayer = null;

function hotelIcon() {
  const url = backendURL + '/hotels/langtang';
  const myPromise = getData(url);

  myPromise.then((data) => {
    if (!graphicsLayer) {
      graphicsLayer = new GraphicsLayer();
      graphicsLayer.elevationInfo = currentElevationInfo;
      graphicsLayer.maxScale = 100;
      graphicsLayer.minScale = 200000;
      map.add(graphicsLayer);
    }

    for (let datum of data) {
      var location = new Point({
        x: datum.coordinates[0],
        y: datum.coordinates[1],
        z: 10,
        spatialReference: { wkid: 4326 }
      });

      var markerSymbol = new PictureMarkerSymbol({
        url: s3URL + "/Hotel_icon_pink.png",
        height: 24,
        width: 24,
        minScale: 2000,
        maxScale: 2500,
      });

      var markerGraphic = new Graphic({
        geometry: location,
        symbol: markerSymbol,
        attributes: {
          type: 'hotelIcon',
          id: datum.hotelCode,
          name: datum.name,
          elevation: 5000,
          contactNumber: (datum.contactNumber.toString()).replaceAll(',', ' '),
          contactPerson: datum.contactPerson,
          rating: datum.rating,
          description: datum.description,
        }
      });

      graphicsLayer.add(markerGraphic);
    }
  });

  // Function to toggle the visibility of the graphicsLayer
  function ToggleHotels() {
    if (graphicsLayer) {
      graphicsLayer.visible = !graphicsLayer.visible;
    }
  }

  // Get a reference to the overlays button element
  const overlaysButton = document.getElementById('overlays');
  if (overlaysButton) {
    overlaysButton.addEventListener('click', ToggleHotels);
  } else {
    console.error('Overlays button element not found.');
  }
}

  function LocationShower(location, from) {
    if (from === "Syabrubesi") {
      return null;
    }

    // let z = 300;
    // let color = [231, 84, 128];
    // let size = 10;
    // if (from === "Kyangjin") {
    //   z = 140;
    //   color = "#FFA500" 
    //   size = 14;
    // }


    let textSymbol = {
      type: "text",
      color: "#FFD700",
      // haloColor: [255, 255, 255],
      haloSize: 1,
      //color: "#FFFFFF",
      text: from,
      xoffset: 0,
      yoffset: 0,
      zoffset: 0,
      font: {
        size: 13,
        family: "Universe Condensed",
        weight: "bold"
      }
    };

    let coord = new Point({
      x: location.x,
      y: location.y,
      z: 105,
      spatialReference: { wkid: 4326 }
    });

    let textGraphic = new Graphic({
      geometry: coord,
      symbol: textSymbol
    });

    return textGraphic;
  }


  view.when(function (event) {
    routeOverlord("langtang", 'beginner');
    routeOverlord("langtang", 'advanced');
    routeOverlord("langtang", 'expert');


    // "picture-marker": Represents a graphic with an image or icon.
    // "simple-line": Represents a graphic with a simple line symbol.
    // "simple-fill": Represents a graphic with a simple fill symbol.
    // "text": Represents a graphic with a text symbol.
    // "web-style": Represents a graphic with a symbol defined by a web style.



    view.on("click", function (event) {
      view.hitTest(event)
        .then(function (response) {
          var clickedGraphics = response.results.filter(function (result) {
            return result.graphic.symbol.type === "picture-marker";
          });
          if (clickedGraphics.length > 0) {
            // console.log('vetiyo'); // Call your custom function here
            var clickedGraphic = clickedGraphics[0].graphic;
            if (clickedGraphic.hasOwnProperty('attributes')) {
              var type = clickedGraphic.attributes.type;
              if (type === 'hotelIcon') {
                var id = clickedGraphic.attributes["id"]; // Replace "OBJECTID" with the actual ID field name in your layer
                var name = clickedGraphic.attributes["name"];
                // console.log("ID:", id, "Name:", name);
                hotelDetail(id);
              }
            }
          }
        });
    });


  });

  // function showHotelDetailDiv(info) {
  //   document.getElementById("hotelDetailText").innerHTML = '';
  //   if (info) {
  //     document.getElementById("hotelDetailText").innerHTML =`
  //     Contact Person: ${(info.contactPerson)}<br> 
  //     wifi: ${(info.facilities.wifi == "x")?"Yes":"No"}<br>
  //     bedsheetCleaning:${(info.facilities.bedsheetCleaning == "D")? "Daily":(info.facilities.bedsheetCleaning == "W3")? "within 3 days": (info.facilities.bedsheetCleaning == "W7")? "within 7 days":"more than 7 days"}<br>
  //     electricity:${(info.facilities.electricity == "x")?"Yes":"No"}<br>
  //     hotShower:${(info.facilities.hotShower == "x")?"Yes":"No"}<br>
  //     mobilePay:${(info.facilities.mobilePay == "x")?"Yes":"No"}<br>
  //     roomInsulation:${(info.facilities.roomInsulation== "B")? "Basic": (info.facilities.washingMethod == "M")? "Moderate":"Productive"}<br>
  //     towel:${(info.facilities.towel == "x")?"Yes":"No"}<br>
  //     washingMethod:${(info.facilities.washingMethod == "H")? "Hand wash":"Machine wash"}<br>

  //     `;
  //   }
  //   document.getElementById("hotelDetails").classList.add("show");

  // }
  // Launcher
  function hotelDetail(id) {
    const url = backendURL + '/hotels/langtang/' + id;
    // console.log('url for hotel ', url);
    const myPromise = getData(url);
    // showHotelDetailDiv();
    myPromise
      .then((data) => {
        // testVar = data;
        // console.log("from showHotelInfo", data)
        showHotelDetailDiv(data);
      })
  }




  // function viewHotelImages() {
  //   // panoramaViewer(urlArray);
  //   document.getElementById("floatingDiv").classList.add("show");
  // }

  setTimeout(function () {
    // userStoryTeller();
    hotelIcon()
  }, 3000);

  window.addEventListener("load", function () {
    var buttons = document.querySelectorAll("table button");
    var lastClickedButton = null;

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        if (lastClickedButton !== null) {
          lastClickedButton.classList.remove("clicked");
        }

        this.classList.add("clicked");
        lastClickedButton = this;

        buttons.forEach(function (button) {
          if (button !== this) {
            button.style.backgroundColor = "#89CFF0";
          }
        }, this);

        this.style.backgroundColor = "#001f3f";
      });

    });
  });
});