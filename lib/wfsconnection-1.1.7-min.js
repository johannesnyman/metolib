"use strict";if("undefined"==typeof jQuery||!jQuery)throw"ERROR: jQuery is required for fi.fmi.metoclient.metolib.WfsConnection!";if("undefined"==typeof _||!_)throw"ERROR: Lodash is required for fi.fmi.metoclient.metolib.WfsConnection!";if("undefined"==typeof async||!async)throw"ERROR: Async is required for fi.fmi.metoclient.metolib.WfsConnection!";var fi=fi||{};if(fi.fmi=fi.fmi||{},fi.fmi.metoclient=fi.fmi.metoclient||{},fi.fmi.metoclient.metolib=fi.fmi.metoclient.metolib||{},!fi.fmi.metoclient.metolib.Utils)throw"ERROR: fi.fmi.metoclient.metolib.Utils is required for fi.fmi.metoclient.metolib.WfsConnection!";if(!fi.fmi.metoclient.metolib.SplitterCache)throw"ERROR: fi.fmi.metoclient.metolib.SplitterCache is required for fi.fmi.metoclient.metolib.WfsConnection!";if(!fi.fmi.metoclient.metolib.WfsRequestParser)throw"ERROR: fi.fmi.metoclient.metolib.WfsRequestParser is required for fi.fmi.metoclient.metolib.WfsConnection!";fi.fmi.metoclient.metolib.WfsConnection=function(){function a(a){return jQuery.trim(a).replace(/,\s+/,m)}function b(b,c){var d=[];if(_.isString(c)||(c=""),b&&_.isString(b))d.push(c+a(b));else if(_.isArray(b))for(var e=0;e<b.length;++e){var f=b[e];f&&_.isString(f)&&d.push(c+a(f))}return d}function c(a,b){var c=[];if(_.isString(b)||(b=""),_.isNumber(a)||a&&_.isString(a))c.push(jQuery.trim(b+a));else if(_.isArray(a))for(var d=0;d<a.length;++d){var e=a[d];(_.isNumber(e)||e&&_.isString(e))&&c.push(jQuery.trim(b+e))}return c}function d(a,d){if(a&&d){var e=[];a.location=e,a.geoid=c(d.geoid),a.wmo=c(d.wmo),a.fmisid=c(d.fmisid),a.sites=b(d.sites),e.push.apply(e,c(d.geoid,o)),e.push.apply(e,c(d.wmo,p)),e.push.apply(e,c(d.fmisid,q)),e.push.apply(e,b(d.sites,r))}}function e(a,b,c,d,e,f){var g=r+c;if(a){var h,i=!1;if(a.geoid&&e)for(h=0;h<a.geoid.length;++h)if(a.geoid[h]===e){g=o+e,i=!0;break}if(!i&&a.wmo&&d)for(h=0;h<a.wmo.length;++h)if(a.wmo[h]===d){g=p+d,i=!0;break}if(!i&&a.fmisid&&f)for(h=0;h<a.fmisid.length;++h)if(a.fmisid[h]===f){g=q+f,i=!0;break}if(!i&&a.sites&&b&&c){var j=c+n,k=b.indexOf(j);0===k&&(b=jQuery.trim(b.slice(j.length)));var l=b+m+c;for(h=0;h<a.sites.length;++h){var s=a.sites[h];if(-1!==s.indexOf(m)&&s===l){g=r+s,i=!0;break}}}}return g}function f(a,b){if(_.isArray(a)&&b&&b>0)for(var c=1;c<a.length;++c){var d=a[c-1],e=a[c];if(_.isObject(e)){var f=_.isObject(d)?d.time:void 0,g=e.time;void 0!==f&&null!==f&&void 0!==g&&null!==g&&g-f>b&&(g=f+b,a.splice(c,0,{time:g,value:0/0})),f=g}}}function g(a,b){return _.find(a,function(a){return _.isEqual(a,b)})}function h(a){var b=[];if(_.isArray(a))for(var c=0;c<a.length;++c){var d=a[c],e=_.isObject(d)&&(d.errorCode||d.errorText);if(_.isObject(d)&&_.isArray(d.error)&&d.error.length>0)for(var f=d.error,h=0;h<f.length;++h){var i=f[h];if(_.isObject(i)&&(i.errorCode||i.errorText)){var j={errorCode:i.errorCode,errorText:i.errorText,extension:d};g(b,j)||b.push(j)}else e=!0}else e=!0;if(e){var k={errorCode:_.isObject(d)?d.errorCode:void 0,errorText:_.isObject(d)&&_.isString(d.errorText)?d.errorText:s,extension:d};g(b,k)||b.push(k)}}return b}function i(a,b,c){var d={data:b?{}:void 0,errors:c&&!c.length?null:c};return b&&_.each(b.locations,function(c){var g=e(a,c.info.name,c.info.region,c.info.wmo,c.info.geoid,c.info.fmisid);d.data[g]||(d.data[g]={}),_.each(c.data,function(e,h){d.data[g][h]||(d.data[g][h]=[]),f(e.timeValuePairs,a.resolution),_.each(e.timeValuePairs,function(a){var f={info:b.info,properties:b.properties,locationInfo:c.info,blockProperty:e.property,timeValuePair:a};d.data[g][h].push(f)})})}),d}function j(a,b,c){var d={data:b?{info:void 0,properties:void 0,locations:[]}:void 0,errors:h(c)};return b&&_.each(b.data,function(a){var b={info:void 0,data:{}};_.each(a,function(a,c){var e={property:void 0,timeValuePairs:[]};_.each(a,function(a){a&&(d.data.info||(d.data.info=a.info),d.data.properties||(d.data.properties=a.properties),e.property||(e.property=a.blockProperty),b.info||(b.info=a.locationInfo),e.timeValuePairs.push(a.timeValuePair))}),b.data[c]=e}),d.data.locations.push(b)}),d}function k(a,b,c){fi.fmi.metoclient.metolib.WfsRequestParser.getData({url:a.connectionUrl,storedQueryId:a.storedQueryId,requestParameter:b.parameter,begin:b.start,end:b.end,timestep:b.resolution,denyTimeAdjusting:!0,geoid:b.geoid,wmo:b.wmo,fmisid:b.fmisid,sites:b.sites,crs:b.crs,queryExtension:b.queryExtension,callback:function(d,e){var f=i.call(a,b,d,e);c(f.errors,f.data)}})}var l="parserSites",m=",",n=" ",o="g_",p="w_",q="f_",r="s_",s="ERROR: Cache found error(s)!",t=function(a){if(a.timestep&&1!==a.timestep){var e=a.begin,f=a.end,g=a.timestep;a.denyTimeAdjusting||(e=fi.fmi.metoclient.metolib.WfsRequestParser.adjustBeginTime(g,e),f=fi.fmi.metoclient.metolib.WfsRequestParser.adjustEndTime(g,f,e));var h={service:l,parameter:_.isString(a.requestParameter)?a.requestParameter.split(m):a.requestParameter,start:e instanceof Date?e.getTime():e,end:f instanceof Date?f.getTime():f,resolution:g,crs:a.crs,queryExtension:a.queryExtension};d(h,a),this.cache.fetch(h,function(b,c){var d=j(h,c,b);a.callback(d.data,d.errors)},a.progressCallback)}else{var i=this;fi.fmi.metoclient.metolib.WfsRequestParser.getData({url:i.connectionUrl,storedQueryId:i.storedQueryId,requestParameter:a.requestParameter,begin:a.begin,end:a.end,timestep:a.timestep,denyTimeAdjusting:a.denyTimeAdjusting,geoid:c(a.geoid),wmo:c(a.wmo),fmisid:c(a.fmisid),sites:b(a.sites),crs:a.crs,queryExtension:a.queryExtension,callback:a.callback})}},u=function(a){var d=this;fi.fmi.metoclient.metolib.WfsRequestParser.getData({url:d.connectionUrl,storedQueryId:d.storedQueryId,requestParameter:a.requestParameter,begin:a.begin,end:a.end,timestep:a.timestep,denyTimeAdjusting:a.denyTimeAdjusting,geoid:c(a.geoid),wmo:c(a.wmo),fmisid:c(a.fmisid),sites:b(a.sites),bbox:a.bbox,crs:a.crs,queryExtension:a.queryExtension,callback:a.callback})},v=function(a,b){var c=!0;try{var d=Array.prototype.slice.call(arguments);d.shift(),d.shift(),a.apply(this,d)}catch(e){var f="ERROR: API level error occurred in a synchronous flow!";if("undefined"!=typeof console&&console&&console.error(f),c=!1,b){var g={errorText:f};b(void 0,g)}}return c},w=function(){return this.connectionUrl},x=function(){return this.storedQueryId},y=function(a,b){if(!this.connectionUrl){if(!_.isString(a)||!a){var c="ERROR: WfsConnection URL must be a string and not empty!";throw"undefined"!=typeof console&&console&&console.error(c),c}if(!_.isString(b)||!b){var d="ERROR: WfsConnection stored query ID must be a string and not empty!";throw"undefined"!=typeof console&&console&&console.error(d),d}this.connectionUrl=a,this.storedQueryId=b}},z=function(){this.connectionUrl=void 0,this.storedQueryId=void 0,A.call(this)},A=function(){this.cache.clearCache()},B=function(a){if(!a){var b="ERROR: Options object is mandatory!";throw"undefined"!=typeof console&&console&&console.error(b),b}if(a.bbox)u.call(this,a);else{if(!(a.geoid||a.wmo||a.fmisid||a.sites)){var c="ERROR: Either geoid, wmo, fmisid, sites or bbox is mandatory in options!";throw"undefined"!=typeof console&&console&&console.error(c),c}t.call(this,a)}},C=function(){var a=this,b={connectionInstance:a,connectionUrl:void 0,storedQueryId:void 0,cache:new fi.fmi.metoclient.metolib.SplitterCache({sideFetchAfterFactor:1,sideFetchBeforeFactor:.5,maxBlockDataPoints:200,maxCacheDataSize:4e3})};b.cache.addDataProvider(l,function(a,c){k(b,a,c)}),this.getUrl=function(){return w.call(b)},this.getStoredQueryId=function(){return x.call(b)},this.connect=function(a,c){return v.call(b,y,void 0,a,c)},this.disconnect=function(){return v.call(b,z,void 0)},this.resetCache=function(){return v.call(b,A,void 0)},this.getData=function(a){return v.call(b,B,a?a.callback:void 0,a)}};return C}();