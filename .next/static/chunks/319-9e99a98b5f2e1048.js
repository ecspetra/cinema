(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[319],{7484:function(e){var t,r,n,s,i,o,a,l,u,h,c,d,_,f,p,m,g,b,w,T,v,y;e.exports=(t="millisecond",r="second",n="minute",s="hour",i="week",o="month",a="quarter",l="year",u="date",h="Invalid Date",c=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,d=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_=function(e,t,r){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(r)+e},(p={})[f="en"]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],r=e%100;return"["+e+(t[(r-20)%10]||t[r]||"th")+"]"}},m="$isDayjsObject",g=function(e){return e instanceof v||!(!e||!e[m])},b=function e(t,r,n){var s;if(!t)return f;if("string"==typeof t){var i=t.toLowerCase();p[i]&&(s=i),r&&(p[i]=r,s=i);var o=t.split("-");if(!s&&o.length>1)return e(o[0])}else{var a=t.name;p[a]=t,s=a}return!n&&s&&(f=s),s||!n&&f},w=function(e,t){if(g(e))return e.clone();var r="object"==typeof t?t:{};return r.date=e,r.args=arguments,new v(r)},(T={s:_,z:function(e){var t=-e.utcOffset(),r=Math.abs(t);return(t<=0?"+":"-")+_(Math.floor(r/60),2,"0")+":"+_(r%60,2,"0")},m:function e(t,r){if(t.date()<r.date())return-e(r,t);var n=12*(r.year()-t.year())+(r.month()-t.month()),s=t.clone().add(n,o),i=r-s<0,a=t.clone().add(n+(i?-1:1),o);return+(-(n+(r-s)/(i?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return({M:o,y:l,w:i,d:"day",D:u,h:s,m:n,s:r,ms:t,Q:a})[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}}).l=b,T.i=g,T.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})},y=(v=function(){function e(e){this.$L=b(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[m]=!0}var _=e.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,r=e.utc;if(null===t)return new Date(NaN);if(T.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(c);if(n){var s=n[2]-1||0,i=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)}}return new Date(t)}(e),this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return T},_.isValid=function(){return this.$d.toString()!==h},_.isSame=function(e,t){var r=w(e);return this.startOf(t)<=r&&r<=this.endOf(t)},_.isAfter=function(e,t){return w(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<w(e)},_.$g=function(e,t,r){return T.u(e)?this[t]:this.set(r,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var a=this,h=!!T.u(t)||t,c=T.p(e),d=function(e,t){var r=T.w(a.$u?Date.UTC(a.$y,t,e):new Date(a.$y,t,e),a);return h?r:r.endOf("day")},_=function(e,t){return T.w(a.toDate()[e].apply(a.toDate("s"),(h?[0,0,0,0]:[23,59,59,999]).slice(t)),a)},f=this.$W,p=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(c){case l:return h?d(1,0):d(31,11);case o:return h?d(1,p):d(0,p+1);case i:var b=this.$locale().weekStart||0,w=(f<b?f+7:f)-b;return d(h?m-w:m+(6-w),p);case"day":case u:return _(g+"Hours",0);case s:return _(g+"Minutes",1);case n:return _(g+"Seconds",2);case r:return _(g+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,i){var a,h=T.p(e),c="set"+(this.$u?"UTC":""),d=((a={}).day=c+"Date",a[u]=c+"Date",a[o]=c+"Month",a[l]=c+"FullYear",a[s]=c+"Hours",a[n]=c+"Minutes",a[r]=c+"Seconds",a[t]=c+"Milliseconds",a)[h],_="day"===h?this.$D+(i-this.$W):i;if(h===o||h===l){var f=this.clone().set(u,1);f.$d[d](_),f.init(),this.$d=f.set(u,Math.min(this.$D,f.daysInMonth())).$d}else d&&this.$d[d](_);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[T.p(e)]()},_.add=function(e,t){var a,u=this;e=Number(e);var h=T.p(t),c=function(t){var r=w(u);return T.w(r.date(r.date()+Math.round(t*e)),u)};if(h===o)return this.set(o,this.$M+e);if(h===l)return this.set(l,this.$y+e);if("day"===h)return c(1);if(h===i)return c(7);var d=((a={})[n]=6e4,a[s]=36e5,a[r]=1e3,a)[h]||1,_=this.$d.getTime()+e*d;return T.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return r.invalidDate||h;var n=e||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),i=this.$H,o=this.$m,a=this.$M,l=r.weekdays,u=r.months,c=r.meridiem,_=function(e,r,s,i){return e&&(e[r]||e(t,n))||s[r].slice(0,i)},f=function(e){return T.s(i%12||12,e,"0")},p=c||function(e,t,r){var n=e<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace(d,function(e,n){return n||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return T.s(t.$y,4,"0");case"M":return a+1;case"MM":return T.s(a+1,2,"0");case"MMM":return _(r.monthsShort,a,u,3);case"MMMM":return _(u,a);case"D":return t.$D;case"DD":return T.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return _(r.weekdaysMin,t.$W,l,2);case"ddd":return _(r.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(i);case"HH":return T.s(i,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return p(i,o,!0);case"A":return p(i,o,!1);case"m":return String(o);case"mm":return T.s(o,2,"0");case"s":return String(t.$s);case"ss":return T.s(t.$s,2,"0");case"SSS":return T.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")})},_.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},_.diff=function(e,t,u){var h,c=this,d=T.p(t),_=w(e),f=(_.utcOffset()-this.utcOffset())*6e4,p=this-_,m=function(){return T.m(c,_)};switch(d){case l:h=m()/12;break;case o:h=m();break;case a:h=m()/3;break;case i:h=(p-f)/6048e5;break;case"day":h=(p-f)/864e5;break;case s:h=p/36e5;break;case n:h=p/6e4;break;case r:h=p/1e3;break;default:h=p}return u?h:T.a(h)},_.daysInMonth=function(){return this.endOf(o).$D},_.$locale=function(){return p[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var r=this.clone(),n=b(e,t,!0);return n&&(r.$L=n),r},_.clone=function(){return T.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},e}()).prototype,w.prototype=y,[["$ms",t],["$s",r],["$m",n],["$H",s],["$W","day"],["$M",o],["$y",l],["$D",u]].forEach(function(e){y[e[1]]=function(t){return this.$g(t,e[0],e[1])}}),w.extend=function(e,t){return e.$i||(e(t,v,w),e.$i=!0),w},w.locale=b,w.isDayjs=g,w.unix=function(e){return w(1e3*e)},w.en=p[f],w.Ls=p,w.p={},w)},6650:function(e,t,r){"use strict";r.d(t,{Jt:function(){return eg},cF:function(){return ew},iH:function(){return eb},B0:function(){return em}});var n,s,i,o,a=r(5816),l=r(1199),u=r(8463);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let h="firebasestorage.googleapis.com",c="storageBucket";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d extends l.ZR{constructor(e,t,r=0){super(_(e),`Firebase Storage: ${t} (${_(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,d.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return _(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function _(e){return"storage/"+e}function f(){return new d(i.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function p(){return new d(i.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function m(){return new d(i.CANCELED,"User canceled the upload/download.")}function g(){return new d(i.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function b(e){return new d(i.INVALID_ARGUMENT,e)}function w(){return new d(i.APP_DELETED,"The Firebase app was deleted.")}function T(e,t){return new d(i.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function v(e){throw new d(i.INTERNAL_ERROR,"Internal error: "+e)}(n=i||(i={})).UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=y.makeFromUrl(e,t)}catch(t){return new y(e,"")}if(""===r.path)return r;throw new d(i.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let r=null,n="([A-Za-z0-9.\\-_]+)",s=RegExp("^gs://"+n+"(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}let a=t.replace(/[.]/g,"\\."),l=RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${n}/o(/([^?#]*).*)?$`,"i"),u=RegExp(`^https?://${t===h?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${n}/([^?#]*)`,"i"),c=[{regex:s,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:l,indices:{bucket:1,path:3},postModify:o},{regex:u,indices:{bucket:1,path:2},postModify:o}];for(let t=0;t<c.length;t++){let n=c[t],s=n.regex.exec(e);if(s){let e=s[n.indices.bucket],t=s[n.indices.path];t||(t=""),r=new y(e,t),n.postModify(r);break}}if(null==r)throw new d(i.INVALID_URL,"Invalid URL '"+e+"'.");return r}}class R{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function E(e){return"string"==typeof e||e instanceof String}function k(e){return O()&&e instanceof Blob}function O(){return"undefined"!=typeof Blob}function U(e,t,r,n){if(n<t)throw b(`Invalid value for '${e}'. Expected ${t} or greater.`);if(n>r)throw b(`Invalid value for '${e}'. Expected ${r} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e,t,r){let n=t;return null==r&&(n=`https://${t}`),`${r}://${n}/v0${e}`}function C(e){let t=encodeURIComponent,r="?";for(let n in e)if(e.hasOwnProperty(n)){let s=t(n)+"="+t(e[n]);r=r+s+"&"}return r.slice(0,-1)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(e,t){let r=e>=500&&e<600,n=-1!==[408,429].indexOf(e),s=-1!==t.indexOf(e);return r||n||s}(s=o||(o={}))[s.NO_ERROR=0]="NO_ERROR",s[s.NETWORK_ERROR=1]="NETWORK_ERROR",s[s.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e,t,r,n,s,i,o,a,l,u,h,c=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=s,this.additionalRetryCodes_=i,this.callback_=o,this.errorCallback_=a,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=c,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{let r=this.resolve_,n=this.reject_,s=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(s,s.getResponse());void 0!==e?r(e):r()}catch(e){n(e)}else if(null!==s){let e=f();e.serverResponse=s.getErrorText(),n(this.errorCallback_?this.errorCallback_(s,e):e)}else if(t.canceled){let e=this.appDelete_?w():m();n(e)}else{let e=p();n(e)}};this.canceled_?e(!1,new D(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,r){let n=1,s=null,i=null,o=!1,a=0,l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){s=setTimeout(()=>{s=null,e(d,2===a)},t)}function c(){i&&clearTimeout(i)}function d(e,...t){let r;if(l){c();return}if(e){c(),u.call(null,e,...t);return}let s=2===a||o;if(s){c(),u.call(null,e,...t);return}n<64&&(n*=2),1===a?(a=2,r=0):r=(n+Math.random())*1e3,h(r)}let _=!1;function f(e){!_&&(_=!0,c(),!l&&(null!==s?(e||(a=2),clearTimeout(s),h(0)):e||(a=1)))}return h(0),i=setTimeout(()=>{o=!0,f(!0)},r),f}((e,t)=>{if(t){e(!1,new D(!1,null,!0));return}let r=this.connectionFactory_();this.pendingConnection_=r;let n=e=>{let t=e.loaded,r=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,r)};null!==this.progressCallback_&&r.addUploadProgressListener(n),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&r.removeUploadProgressListener(n),this.pendingConnection_=null;let t=r.getErrorCode()===o.NO_ERROR,s=r.getStatus();if(!t||A(s,this.additionalRetryCodes_)&&this.retry){let t=r.getErrorCode()===o.ABORT;e(!1,new D(!1,null,t));return}let i=-1!==this.successCodes_.indexOf(s);e(!0,new D(i,r))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class D{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function $(...e){let t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){let r=new t;for(let t=0;t<e.length;t++)r.append(e[t]);return r.getBlob()}if(O())return new Blob(e);throw new d(i.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let I={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class x{constructor(e,t){this.data=e,this.contentType=t||null}}function M(e){let t=[];for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|63&n);else if((64512&n)==55296){let s=r<e.length-1&&(64512&e.charCodeAt(r+1))==56320;if(s){let s=n,i=e.charCodeAt(++r);n=65536|(1023&s)<<10|1023&i,t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n)}else t.push(239,191,189)}else(64512&n)==56320?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function P(e,t){let r;switch(e){case I.BASE64:{let r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n)throw T(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case I.BASE64URL:{let r=-1!==t.indexOf("+"),n=-1!==t.indexOf("/");if(r||n)throw T(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}}try{r=/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("undefined"==typeof atob)throw new d(i.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw T(e,"Invalid character found")}let n=new Uint8Array(r.length);for(let e=0;e<r.length;e++)n[e]=r.charCodeAt(e);return n}class L{constructor(e){this.base64=!1,this.contentType=null;let t=e.match(/^data:([^,]+)?,/);if(null===t)throw T(I.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let r=t[1]||null;null!=r&&(this.base64=function(e,t){let r=e.length>=t.length;return!!r&&e.substring(e.length-t.length)===t}(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e,t){let r=0,n="";k(e)?(this.data_=e,r=e.size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}size(){return this.size_}type(){return this.type_}slice(e,t){if(k(this.data_)){let r=this.data_,n=r.webkitSlice?r.webkitSlice(e,t):r.mozSlice?r.mozSlice(e,t):r.slice?r.slice(e,t):null;return null===n?null:new B(n)}{let r=new Uint8Array(this.data_.buffer,e,t-e);return new B(r,!0)}}static getBlob(...e){if(O()){let t=e.map(e=>e instanceof B?e.data_:e);return new B($.apply(null,t))}{let t=e.map(e=>E(e)?function(e,t){switch(e){case I.RAW:return new x(M(t));case I.BASE64:case I.BASE64URL:return new x(P(e,t));case I.DATA_URL:return new x(function(e){let t=new L(e);return t.base64?P(I.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw T(I.DATA_URL,"Malformed data URL.")}return M(t)}(t.rest)}(t),function(e){let t=new L(e);return t.contentType}(t))}throw f()}(I.RAW,e).data:e.data_),r=0;t.forEach(e=>{r+=e.byteLength});let n=new Uint8Array(r),s=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)n[s++]=e[t]}),new B(n,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){var t;let r;try{r=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=r)||Array.isArray(t)?null:r}function H(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e,t){return t}class z{constructor(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||q}}let j=null;function V(){if(j)return j;let e=[];e.push(new z("bucket")),e.push(new z("generation")),e.push(new z("metageneration")),e.push(new z("name","fullPath",!0));let t=new z("name");t.xform=function(e,t){return!E(t)||t.length<2?t:H(t)},e.push(t);let r=new z("size");return r.xform=function(e,t){return void 0!==t?Number(t):t},e.push(r),e.push(new z("timeCreated")),e.push(new z("updated")),e.push(new z("md5Hash",null,!0)),e.push(new z("cacheControl",null,!0)),e.push(new z("contentDisposition",null,!0)),e.push(new z("contentEncoding",null,!0)),e.push(new z("contentLanguage",null,!0)),e.push(new z("contentType",null,!0)),e.push(new z("metadata","customMetadata",!0)),j=e}function W(e,t,r){let n=F(t);return null===n?null:function(e,t,r){let n={};n.type="file";let s=r.length;for(let e=0;e<s;e++){let s=r[e];n[s.local]=s.xform(n,t[s.server])}return Object.defineProperty(n,"ref",{get:function(){let t=n.bucket,r=n.fullPath,s=new y(t,r);return e._makeStorageReference(s)}}),n}(e,n,r)}function X(e,t){let r={},n=t.length;for(let s=0;s<n;s++){let n=t[s];n.writable&&(r[n.server]=e[n.local])}return JSON.stringify(r)}class G{constructor(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(e){if(!e)throw f()}function K(e,t){return function(r,n){let s=W(e,n,t);return Y(null!==s),s}}function Z(e){return function(t,r){var n,s;let o;return 401===t.getStatus()?o=t.getErrorText().includes("Firebase App Check token is invalid")?new d(i.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new d(i.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(n=e.bucket,o=new d(i.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(s=e.path,o=new d(i.UNAUTHORIZED,"User does not have permission to access '"+s+"'.")):o=r,o.status=t.getStatus(),o.serverResponse=r.serverResponse,o}}function J(e){let t=Z(e);return function(r,n){let s=t(r,n);if(404===r.getStatus()){var o;o=e.path,s=new d(i.OBJECT_NOT_FOUND,"Object '"+o+"' does not exist.")}return s.serverResponse=n.serverResponse,s}}function Q(e,t,r){let n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),!n.contentType&&(n.contentType=t&&t.type()||"application/octet-stream"),n}class ee{constructor(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null}}function et(e,t){let r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){Y(!1)}return Y(!!r&&-1!==(t||["active"]).indexOf(r)),r}let er={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function en(e){switch(e){case"running":case"pausing":case"canceling":return er.RUNNING;case"paused":return er.PAUSED;case"success":return er.SUCCESS;case"canceled":return er.CANCELED;default:return er.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,t,r){"function"==typeof e||null!=t||null!=r?(this.next=e,this.error=null!=t?t:void 0,this.complete=null!=r?r:void 0):(this.next=e.next,this.error=e.error,this.complete=e.complete)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e){return(...t)=>{Promise.resolve().then(()=>e(...t))}}class eo{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=o.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=o.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=o.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,n){if(this.sent_)throw v("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==n)for(let e in n)n.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,n[e].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw v("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw v("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw v("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw v("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class ea extends eo{initXhr(){this.xhr_.responseType="text"}}function el(){return new ea}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=V(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(i.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{let t=this.isExponentialBackoffExpired();if(A(e.status,[])){if(t)e=p();else{this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,this.completeTransitions_();return}}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(i.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((e,t)=>{this._resolve=e,this._reject=t,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){let e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}})}_createResumable(){this._resolveToken((e,t)=>{let r=function(e,t,r,n,s){let i=t.bucketOnlyServerUrl(),o=Q(t,n,s),a={name:o.fullPath},l=S(i,e.host,e._protocol),u={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${n.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},h=X(o,r),c=e.maxUploadRetryTime,d=new G(l,"POST",function(e){let t;et(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){Y(!1)}return Y(E(t)),t},c);return d.urlParams=a,d.headers=u,d.body=h,d.errorHandler=Z(t),d}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,el,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){let e=this._uploadUrl;this._resolveToken((t,r)=>{let n=function(e,t,r,n){let s=e.maxUploadRetryTime,i=new G(r,"POST",function(e){let t=et(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){Y(!1)}r||Y(!1);let s=Number(r);return Y(!isNaN(s)),new ee(s,n.size(),"final"===t)},s);return i.headers={"X-Goog-Upload-Command":"query"},i.errorHandler=Z(t),i}(this._ref.storage,this._ref._location,e,this._blob),s=this._ref.storage._makeRequest(n,el,t,r);this._request=s,s.getPromise().then(e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){let e=262144*this._chunkMultiplier,t=new ee(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((n,s)=>{let o;try{o=function(e,t,r,n,s,o,a,l){let u=new ee(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=n.size()),n.size()!==u.total)throw new d(i.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");let h=u.total-u.current,c=h;s>0&&(c=Math.min(c,s));let _=u.current,f=_+c,p="";p=0===c?"finalize":h===c?"upload, finalize":"upload";let m={"X-Goog-Upload-Command":p,"X-Goog-Upload-Offset":`${u.current}`},b=n.slice(_,f);if(null===b)throw g();let w=t.maxUploadRetryTime,T=new G(r,"POST",function(e,r){let s;let i=et(e,["active","final"]),a=u.current+c,l=n.size();return s="final"===i?K(t,o)(e,r):null,new ee(a,l,"final"===i,s)},w);return T.headers=m,T.body=b.uploadData(),T.progressCallback=l||null,T.errorHandler=Z(e),T}(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(e){this._error=e,this._transition("error");return}let a=this._ref.storage._makeRequest(o,el,n,s,!1);this._request=a,a.getPromise().then(e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){let e=262144*this._chunkMultiplier;2*e<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{let r=function(e,t,r){let n=t.fullServerUrl(),s=S(n,e.host,e._protocol),i=e.maxOperationRetryTime,o=new G(s,"GET",K(e,r),i);return o.errorHandler=J(t),o}(this._ref.storage,this._ref._location,this._mappings),n=this._ref.storage._makeRequest(r,el,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{let r=function(e,t,r,n,s){let i=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"},a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();o["Content-Type"]="multipart/related; boundary="+a;let l=Q(t,n,s),u=X(l,r),h="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+u+"\r\n--"+a+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",c=B.getBlob(h,n,"\r\n--"+a+"--");if(null===c)throw g();let d={name:l.fullPath},_=S(i,e.host,e._protocol),f=e.maxUploadRetryTime,p=new G(_,"POST",K(e,r),f);return p.urlParams=d,p.headers=o,p.body=c.uploadData(),p.errorHandler=Z(t),p}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(r,el,e,t);this._request=n,n.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){let t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":let t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=m(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){let e=en(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,n){let s=new es(t||void 0,r||void 0,n||void 0);return this._addObserver(s),()=>{this._removeObserver(s)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){let t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();let e=this._observers.slice();e.forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(en(this._state)){case er.SUCCESS:ei(this._resolve.bind(null,this.snapshot))();break;case er.CANCELED:case er.ERROR:let t=this._reject;ei(t.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){let t=en(this._state);switch(t){case er.RUNNING:case er.PAUSED:e.next&&ei(e.next.bind(e,this.snapshot))();break;case er.SUCCESS:e.complete&&ei(e.complete.bind(e))();break;case er.CANCELED:case er.ERROR:default:e.error&&ei(e.error.bind(e,this._error))()}}resume(){let e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){let e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){let e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e,t){this._service=e,t instanceof y?this._location=t:this._location=y.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new eh(e,t)}get root(){let e=new y(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return H(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");if(-1===t)return"";let r=e.slice(0,t);return r}(this._location.path);if(null===e)return null;let t=new y(this._location.bucket,e);return new eh(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw new d(i.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}function ec(e,t){let r=null==t?void 0:t[c];return null==r?null:y.makeFromBucketSpec(r,e)}class ed{constructor(e,t,r,n,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=n,this._firebaseVersion=s,this._bucket=null,this._host=h,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=n?this._bucket=y.makeFromBucketSpec(n,this._host):this._bucket=ec(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=y.makeFromBucketSpec(this._url,e):this._bucket=ec(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){U("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){U("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();return t.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new eh(this,e)}_makeRequest(e,t,r,n,s=!0){if(this._deleted)return new R(w());{let i=function(e,t,r,n,s,i,o=!0){let a=C(e.urlParams),l=e.url+a,u=Object.assign({},e.headers);return t&&(u["X-Firebase-GMPID"]=t),null!==r&&r.length>0&&(u.Authorization="Firebase "+r),u["X-Firebase-Storage-Version"]="webjs/"+(null!=i?i:"AppManager"),null!==n&&(u["X-Firebase-AppCheck"]=n),new N(l,e.method,u,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,o)}(e,this._appId,r,n,t,this._firebaseVersion,s);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(e,t){let[r,n]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,n).getPromise()}}let e_="@firebase/storage",ef="0.12.0",ep="storage";function em(e,t,r){var n;return(n=e=(0,l.m9)(e))._throwIfRoot("uploadBytesResumable"),new eu(n,new B(t),r)}function eg(e){return function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,r){let n=t.fullServerUrl(),s=S(n,e.host,e._protocol),i=e.maxOperationRetryTime,o=new G(s,"GET",function(t,n){let s=W(e,n,r);return Y(null!==s),function(e,t,r,n){let s=F(t);if(null===s||!E(s.downloadTokens))return null;let i=s.downloadTokens;if(0===i.length)return null;let o=encodeURIComponent,a=i.split(","),l=a.map(t=>{let s=e.bucket,i=e.fullPath,a="/b/"+o(s)+"/o/"+o(i),l=S(a,r,n),u=C({alt:"media",token:t});return l+u});return l[0]}(s,n,e.host,e._protocol)},i);return o.errorHandler=J(t),o}(e.storage,e._location,V());return e.storage.makeRequestWithTokens(t,el).then(e=>{if(null===e)throw new d(i.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(e=(0,l.m9)(e))}function eb(e,t){return function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,r){if(t instanceof ed){if(null==t._bucket)throw new d(i.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+c+"' property when initializing the app?");let n=new eh(t,t._bucket);return null!=r?e(n,r):n}return void 0!==r?function(e,t){let r=function(e,t){let r=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?r:e+"/"+r}(e._location.path,t),n=new y(e._location.bucket,r);return new eh(e.storage,n)}(t,r):t}(e,t);if(e instanceof ed)return new eh(e,t);throw b("To use ref(service, url), the first argument must be a Storage instance.")}(e=(0,l.m9)(e),t)}function ew(e=(0,a.Mq)(),t){e=(0,l.m9)(e);let r=(0,a.qX)(e,ep),n=r.getImmediate({identifier:t}),s=(0,l.P0)("storage");return s&&function(e,t,r,n={}){!function(e,t,r,n={}){e.host=`${t}:${r}`,e._protocol="http";let{mockUserToken:s}=n;s&&(e._overrideAuthToken="string"==typeof s?s:(0,l.Sg)(s,e.app.options.projectId))}(e,t,r,n)}(n,...s),n}(0,a.Xd)(new u.wA(ep,function(e,{instanceIdentifier:t}){let r=e.getProvider("app").getImmediate(),n=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new ed(r,n,s,t,a.Jn)},"PUBLIC").setMultipleInstances(!0)),(0,a.KN)(e_,ef,""),(0,a.KN)(e_,ef,"esm2017")}}]);