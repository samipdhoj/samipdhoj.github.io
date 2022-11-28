var wms_layers = [];


var lyr_OSMStandard_0 = new ol.layer.Tile({
    'title': 'OSM Standard',
    'type': 'base',
    'opacity': 1.000000,


    source: new ol.source.XYZ({
        attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
        url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
});
var format_Route_ORS_1 = new ol.format.GeoJSON();
var features_Route_ORS_1 = format_Route_ORS_1.readFeatures(json_Route_ORS_1,
    { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
var jsonSource_Route_ORS_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Route_ORS_1.addFeatures(features_Route_ORS_1);
var lyr_Route_ORS_1 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Route_ORS_1,
    style: style_Route_ORS_1,
    interactive: true,
    title: '<img src="styles/legend/Route_ORS_1.png" /> Route_ORS'
});
var format_Hotels_2 = new ol.format.GeoJSON();
var features_Hotels_2 = format_Hotels_2.readFeatures(json_Hotels_2,
    { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
var jsonSource_Hotels_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Hotels_2.addFeatures(features_Hotels_2);
var lyr_Hotels_2 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Hotels_2,
    style: style_Hotels_2,
    interactive: true,
    title: '<img src="styles/legend/Hotels_2.png" /> Hotels'
});
var format_Markers_3 = new ol.format.GeoJSON();
var features_Markers_3 = format_Markers_3.readFeatures(json_Markers_3,
    { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
var jsonSource_Markers_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Markers_3.addFeatures(features_Markers_3); cluster_Markers_3 = new ol.source.Cluster({
    distance: 10,
    source: jsonSource_Markers_3
});
var lyr_Markers_3 = new ol.layer.Vector({
    declutter: true,
    source: cluster_Markers_3,
    style: style_Markers_3,
    interactive: true,
    title: '<img src="styles/legend/Markers_3.png" /> Markers'
});

lyr_OSMStandard_0.setVisible(true); lyr_Route_ORS_1.setVisible(true); lyr_Hotels_2.setVisible(true); lyr_Markers_3.setVisible(true);
var layersList = [lyr_OSMStandard_0, lyr_Route_ORS_1, lyr_Hotels_2, lyr_Markers_3];
lyr_Route_ORS_1.set('fieldAliases', { 'DIST_KM': 'DIST_KM', 'DURATION_H': 'DURATION_H', 'PROFILE': 'PROFILE', 'PREF': 'PREF', 'OPTIONS': 'OPTIONS', 'FROM_ID': 'FROM_ID', 'TO_ID': 'TO_ID', });
lyr_Hotels_2.set('fieldAliases', { 'id': 'id', 'ttitle':"Kali Hotel"});
lyr_Markers_3.set('fieldAliases', { 'id': 'id', });
lyr_Route_ORS_1.set('fieldImages', { 'DIST_KM': 'TextEdit', 'DURATION_H': 'TextEdit', 'PROFILE': 'TextEdit', 'PREF': 'TextEdit', 'OPTIONS': 'TextEdit', 'FROM_ID': 'TextEdit', 'TO_ID': 'TextEdit', });
lyr_Hotels_2.set('fieldImages', { 'id': 'TextEdit', });
lyr_Markers_3.set('fieldImages', { 'id': 'TextEdit', });
lyr_Route_ORS_1.set('fieldLabels', { 'DIST_KM': 'no label', 'DURATION_H': 'no label', 'PROFILE': 'no label', 'PREF': 'no label', 'OPTIONS': 'no label', 'FROM_ID': 'no label', 'TO_ID': 'no label', });
lyr_Hotels_2.set('fieldLabels', { 'id': 'no label', });
lyr_Markers_3.set('fieldLabels', { 'id': 'no label', });
lyr_Markers_3.on('precompose', function (evt) {
    evt.context.globalCompositeOperation = 'normal';
});