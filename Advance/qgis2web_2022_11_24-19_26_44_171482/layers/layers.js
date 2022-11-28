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
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Route_ORS_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Route_ORS_1.addFeatures(features_Route_ORS_1);
var lyr_Route_ORS_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Route_ORS_1, 
                style: style_Route_ORS_1,
                interactive: true,
                title: '<img src="styles/legend/Route_ORS_1.png" /> Route_ORS'
            });

lyr_OSMStandard_0.setVisible(true);lyr_Route_ORS_1.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_Route_ORS_1];
lyr_Route_ORS_1.set('fieldAliases', {'DIST_KM': 'DIST_KM', 'DURATION_H': 'DURATION_H', 'PROFILE': 'PROFILE', 'PREF': 'PREF', 'OPTIONS': 'OPTIONS', 'FROM_ID': 'FROM_ID', 'TO_ID': 'TO_ID', });
lyr_Route_ORS_1.set('fieldImages', {'DIST_KM': 'TextEdit', 'DURATION_H': 'TextEdit', 'PROFILE': 'TextEdit', 'PREF': 'TextEdit', 'OPTIONS': 'TextEdit', 'FROM_ID': 'TextEdit', 'TO_ID': 'TextEdit', });
lyr_Route_ORS_1.set('fieldLabels', {'DIST_KM': 'no label', 'DURATION_H': 'no label', 'PROFILE': 'no label', 'PREF': 'no label', 'OPTIONS': 'no label', 'FROM_ID': 'no label', 'TO_ID': 'no label', });
lyr_Route_ORS_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});