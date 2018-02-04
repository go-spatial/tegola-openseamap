# tegola-openseamap
OpenSeaMap implementation using Tegola

This repo houses instructions and configuration files to aid with standing up a [tegola](https://github.com/terranodo/tegola)-based vector tile server that mimics the OpenSeaMap project. It builds on [earlier work with OpenStreetMap data](https://github.com/terranodo/tegola-osm).

## Repo config files

- seamark.json - an [imposm3](https://github.com/omniscale/imposm3) mapping file for the OSM PBF file.
- seamark.toml - a [tegola](https://github.com/terranodo/tegola) configuration file for the OSM import produced by imposm3.
- mapbox.json - a [Mapbox GL JS Style sheet](https://www.mapbox.com/mapbox-gl-js/style-spec) with seamark extensions

## Dependencies

- [PostgreSQL](https://www.postgresql.org/) server with [PostGIS](http://www.postgis.net) enabled.
- imposm3 ([download binaries for linux](https://imposm.org/static/rel/) or [see the Go Go Go section](http://erictheise.com/blog/2017/11/13/hello-tegola#go-go-go) for a homebrew-ish OS X installation)
- tegola ([download](https://github.com/terranodo/tegola/releases))
- [gdal](http://www.gdal.org/) - required for Natural Earth import

## Creating the osm_seamap database

```
imposm3 import -connection postgis://user:password@host:port/osm_seamark -mapping seamark.json -read path/to/your-planet.osm.pbf -write
imposm3 import -connection postgis://user:password@host:port/osm_seamark -mapping seamark.json -deployproduction
```

## Resources

* [OpenSeaMap](http://openseamap.org/index.php?id=openseamap&L=1)
* Seamarks
  * [Seamark tagging schema](https://wiki.openstreetmap.org/wiki/Seamark_tagging_schema)
  * [Seamark Tag Values](https://wiki.openstreetmap.org/wiki/Seamarks/Seamark_Tag_Values)
  * [Seamark Objects](https://wiki.openstreetmap.org/wiki/Seamarks/Seamark_Objects)
  * [Seamark Object usage](https://wiki.openstreetmap.org/wiki/Seamarks/Seamark_Object_Usage)
  * [Seamark Attributes](https://wiki.openstreetmap.org/wiki/Seamarks/Seamark_Attributes)
  * [INT-1 Cross Reference](https://wiki.openstreetmap.org/wiki/Seamarks/INT-1_Cross_Reference)
  * [Seamark Colours](https://wiki.openstreetmap.org/wiki/Seamarks/Colours)
  
* [Symbology](https://github.com/OpenSeaMap/renderer/tree/master/searender/symbols)
* [vectortiles-generator](https://github.com/OpenSeaMap/vectortiles-generator/blob/master/src/import-osm/mapping.yml) from OpenSeaMap project
* [renderer implemented in c](https://github.com/OpenSeaMap/renderer/tree/master/searender)
* [INT-1 styling](https://github.com/OpenSeaMap/josm/blob/master/INT1_MapCSS.mapcss)


## Setting database connections with environment variables

It can be desirable to use separate databases for a tegola installation. For example, even though you may have OpenStreetMap data for multiple metro or Geofabrik extracts, you'll likely only need one copy of the OSM land polygons and Natural Earth Data.

Starting with `tegola v0.6.0`, environment variables can be used to configure database connection information. Copy `.env-example` to `.env` and customize away. A `Procfile` is included for those who use tools that recognize it, such as [foreman](https://github.com/ddollar/foreman)`, clones such as [node-foreman](https://github.com/strongloop/node-foreman) or Python's [honcho](https://github.com/nickstenning/honcho), or the [Heroku Command Line Interface](https://devcenter.heroku.com/articles/heroku-cli) which bundles it. You can start your server with an invocation such as

```bash
heroku local tegola
```

although you may have a different, preferred way of including environment variables from a file.
