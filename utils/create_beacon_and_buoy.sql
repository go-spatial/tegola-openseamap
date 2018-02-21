CREATE TABLE osm_beacon AS
SELECT osm_id, type, name, category, colour, colour_pattern, construction, elevation, height, reflectivity, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_beacon_cardinal
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, construction, elevation, height, reflectivity, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_beacon_isolated_danger
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, construction, elevation, height, reflectivity, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_beacon_lateral
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, construction, elevation, height, reflectivity, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_beacon_safe_water
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, construction, elevation, height, reflectivity, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_beacon_special_purpose
;

CREATE TABLE osm_buoy AS
SELECT osm_id, type, name, category, colour, colour_pattern, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_buoy_cardinal
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_buoy_installation
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_buoy_isolated_danger
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_buoy_lateral
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_buoy_safe_water
UNION
SELECT osm_id, type, name, category, colour, colour_pattern, shape, system, daymark_category, daymark_colour, daymark_colour_pattern, daymark_shape, topmark_category, topmark_colour, topmark_colour_pattern, topmark_shape, geometry FROM osm_buoy_special_purpose
;

CREATE INDEX osm_beacon_geom ON osm_beacon USING gist (geometry);
CREATE INDEX osm_beacon_osm_id_idx ON osm_beacon USING btree (osm_id);
CREATE INDEX osm_buoy_geom ON osm_buoy USING gist (geometry);
CREATE INDEX osm_buoy_osm_id_idx ON osm_buoy USING btree (osm_id);

DROP TABLE osm_beacon_cardinal;
DROP TABLE osm_beacon_isolated_danger;
DROP TABLE osm_beacon_lateral;
DROP TABLE osm_beacon_safe_water;
DROP TABLE osm_beacon_special_purpose;

DROP TABLE osm_buoy_cardinal;
DROP TABLE osm_buoy_installation;
DROP TABLE osm_buoy_isolated_danger;
DROP TABLE osm_buoy_lateral;
DROP TABLE osm_buoy_safe_water;
DROP TABLE osm_buoy_special_purpose;
