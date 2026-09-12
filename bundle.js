"use strict";(()=>{var lc=0,Lo=1,cc=2;var di=1,hc=2,Wi=3,Rn=0,Pe=1,_n=2,xn=0,hi=1,Do=2,No=3,Uo=4,uc=5;var Hn=100,dc=101,fc=102,pc=103,mc=104,gc=200,_c=201,xc=202,yc=203,ar=204,or=205,vc=206,Sc=207,Mc=208,bc=209,wc=210,Tc=211,Ec=212,Ac=213,Cc=214,lr=0,cr=1,hr=2,ui=3,ur=4,dr=5,fr=6,pr=7,Fo=0,Rc=1,Ic=2,sn=0,Oo=1,Bo=2,ko=3,vs=4,zo=5,Vo=6,Go=7;var Ho=300,jn=301,fi=302,zr=303,Vr=304,Ss=306,mr=1e3,dn=1001,gr=1002,ve=1003,Pc=1004;var Ms=1005;var be=1006,Gr=1007;var Qn=1008;var Ue=1009,Wo=1010,Xo=1011,Xi=1012,Hr=1013,rn=1014,an=1015,yn=1016,Wr=1017,Xr=1018,qi=1020,qo=35902,Yo=35899,Jo=1021,Zo=1022,Ke=1023,fn=1026,ti=1027,$o=1028,qr=1029,ei=1030,Yr=1031;var Jr=1033,bs=33776,ws=33777,Ts=33778,Es=33779,Zr=35840,$r=35841,Kr=35842,jr=35843,Qr=36196,ta=37492,ea=37496,na=37488,ia=37489,As=37490,sa=37491,ra=37808,aa=37809,oa=37810,la=37811,ca=37812,ha=37813,ua=37814,da=37815,fa=37816,pa=37817,ma=37818,ga=37819,_a=37820,xa=37821,ya=36492,va=36494,Sa=36495,Ma=36283,ba=36284,Cs=36285,wa=36286;var ns=2300,_r=2301,rr=2302,So=2303,Mo=2400,bo=2401,wo=2402;var Lc=3200;var Ta=0,Dc=1,Ln="",Ie="srgb",is="srgb-linear",ss="linear",qt="srgb";var li=7680;var To=519,Nc=512,Uc=513,Fc=514,Ea=515,Oc=516,Bc=517,Aa=518,kc=519,Eo=35044;var Ko="300 es",nn=2e3,Ui=2001;function au(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ou(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function rs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zc(){let i=rs("canvas");return i.style.display="block",i}var zl={},Fi=null;function jo(...i){let t="THREE."+i.shift();Fi?Fi("log",t,...i):console.log(t,...i)}function Vc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ct(...i){i=Vc(i);let t="THREE."+i.shift();if(Fi)Fi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function At(...i){i=Vc(i);let t="THREE."+i.shift();if(Fi)Fi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ci(...i){let t=i.join(" ");t in zl||(zl[t]=!0,Ct(...i))}function Gc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Hc={[lr]:cr,[hr]:fr,[ur]:pr,[ui]:dr,[cr]:lr,[fr]:hr,[pr]:ur,[dr]:ui},pn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var $a=Math.PI/180,xr=180/Math.PI;function Rs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Te[i&255]+Te[i>>8&255]+Te[i>>16&255]+Te[i>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]).toLowerCase()}function zt(i,t,e){return Math.max(t,Math.min(e,i))}function lu(i,t){return(i%t+t)%t}function Ka(i,t,e){return(1-e)*i+e*t}function Ki(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function De(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var il=class il{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};il.prototype.isVector2=!0;var kt=il,mn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3],h=r[a+0],m=r[a+1],x=r[a+2],S=r[a+3];if(u!==S||l!==h||c!==m||d!==x){let p=l*h+c*m+d*x+u*S;p<0&&(h=-h,m=-m,x=-x,S=-S,p=-p);let f=1-o;if(p<.9995){let A=Math.acos(p),E=Math.sin(A);f=Math.sin(f*A)/E,o=Math.sin(o*A)/E,l=l*f+h*o,c=c*f+m*o,d=d*f+x*o,u=u*f+S*o}else{l=l*f+h*o,c=c*f+m*o,d=d*f+x*o,u=u*f+S*o;let A=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=A,c*=A,d*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],h=r[a+1],m=r[a+2],x=r[a+3];return t[e]=o*x+d*u+l*m-c*h,t[e+1]=l*x+d*h+c*u-o*m,t[e+2]=c*x+d*m+o*h-l*u,t[e+3]=d*x-o*u-l*h-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),h=l(n/2),m=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=h*d*u+c*m*x,this._y=c*m*u-h*d*x,this._z=c*d*x+h*m*u,this._w=c*d*u-h*m*x;break;case"YXZ":this._x=h*d*u+c*m*x,this._y=c*m*u-h*d*x,this._z=c*d*x-h*m*u,this._w=c*d*u+h*m*x;break;case"ZXY":this._x=h*d*u-c*m*x,this._y=c*m*u+h*d*x,this._z=c*d*x+h*m*u,this._w=c*d*u-h*m*x;break;case"ZYX":this._x=h*d*u-c*m*x,this._y=c*m*u+h*d*x,this._z=c*d*x-h*m*u,this._w=c*d*u+h*m*x;break;case"YZX":this._x=h*d*u+c*m*x,this._y=c*m*u+h*d*x,this._z=c*d*x-h*m*u,this._w=c*d*u-h*m*x;break;case"XZY":this._x=h*d*u-c*m*x,this._y=c*m*u-h*d*x,this._z=c*d*x+h*m*u,this._w=c*d*u+h*m*x;break;default:Ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],d=e[6],u=e[10],h=n+o+u;if(h>0){let m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(d-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>u){let m=2*Math.sqrt(1+n-o-u);this._w=(d-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>u){let m=2*Math.sqrt(1+o-n-u);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+d)/m}else{let m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(zt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,d=e._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,e=Math.sin(e*c)/d,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},sl=class sl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),d=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ja.copy(this).projectOnVector(t),this.sub(ja)}reflect(t){return this.sub(ja.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};sl.prototype.isVector3=!0;var F=sl,ja=new F,Vl=new mn,rl=class rl{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],m=n[5],x=n[8],S=s[0],p=s[3],f=s[6],A=s[1],E=s[4],v=s[7],b=s[2],M=s[5],C=s[8];return r[0]=a*S+o*A+l*b,r[3]=a*p+o*E+l*M,r[6]=a*f+o*v+l*C,r[1]=c*S+d*A+u*b,r[4]=c*p+d*E+u*M,r[7]=c*f+d*v+u*C,r[2]=h*S+m*A+x*b,r[5]=h*p+m*E+x*M,r[8]=h*f+m*v+x*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return e*a*d-e*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=d*a-o*c,h=o*l-d*r,m=c*r-a*l,x=e*u+n*h+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/x;return t[0]=u*S,t[1]=(s*c-d*n)*S,t[2]=(o*n-s*a)*S,t[3]=h*S,t[4]=(d*e-s*l)*S,t[5]=(s*r-o*e)*S,t[6]=m*S,t[7]=(n*l-c*e)*S,t[8]=(a*e-n*r)*S,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ci("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qa.makeScale(t,e)),this}rotate(t){return ci("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qa.makeRotation(-t)),this}translate(t,e){return ci("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};rl.prototype.isMatrix3=!0;var It=rl,Qa=new It,Gl=new It().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hl=new It().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cu(){let i={enabled:!0,workingColorSpace:is,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===qt&&(s.r=Cn(s.r),s.g=Cn(s.g),s.b=Cn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===qt&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?ss:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ci("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ci("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[is]:{primaries:t,whitePoint:n,transfer:ss,toXYZ:Gl,fromXYZ:Hl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:qt,toXYZ:Gl,fromXYZ:Hl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}var Bt=cu();function Cn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ni(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Mi,yr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Mi===void 0&&(Mi=rs("canvas")),Mi.width=t.width,Mi.height=t.height;let s=Mi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Mi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=rs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Cn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Cn(e[n]/255)*255):e[n]=Cn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},hu=0,Oi=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Rs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(to(s[a].image)):r.push(to(s[a]))}else r=to(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function to(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?yr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ct("Texture: Unable to serialize Texture."),{})}var uu=0,eo=new F,Ne=class i extends pn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=dn,s=dn,r=be,a=Qn,o=Ke,l=Ue,c=i.DEFAULT_ANISOTROPY,d=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Rs(),this.name="",this.source=new Oi(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(eo).x}get height(){return this.source.getSize(eo).y}get depth(){return this.source.getSize(eo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Ct(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ct(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ho)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case mr:t.x=t.x-Math.floor(t.x);break;case dn:t.x=t.x<0?0:1;break;case gr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case mr:t.y=t.y-Math.floor(t.y);break;case dn:t.y=t.y<0?0:1;break;case gr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=Ho;Ne.DEFAULT_ANISOTROPY=1;var al=class al{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],d=l[4],u=l[8],h=l[1],m=l[5],x=l[9],S=l[2],p=l[6],f=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-S)<.01&&Math.abs(x-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+S)<.1&&Math.abs(x+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,v=(m+1)/2,b=(f+1)/2,M=(d+h)/4,C=(u+S)/4,_=(x+p)/4;return E>v&&E>b?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=M/n,r=C/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=M/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=C/r,s=_/r),this.set(n,s,r,e),this}let A=Math.sqrt((p-x)*(p-x)+(u-S)*(u-S)+(h-d)*(h-d));return Math.abs(A)<.001&&(A=1),this.x=(p-x)/A,this.y=(u-S)/A,this.z=(h-d)/A,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=zt(this.x,t.x,e.x),this.y=zt(this.y,t.y,e.y),this.z=zt(this.z,t.z,e.z),this.w=zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=zt(this.x,t,e),this.y=zt(this.y,t,e),this.z=zt(this.z,t,e),this.w=zt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};al.prototype.isVector4=!0;var ie=al,vr=class extends pn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:be,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Ne(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:be,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Oi(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ge=class extends vr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},as=class extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Sr=class extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ve,this.minFilter=ve,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var kr=class kr{constructor(t,e,n,s,r,a,o,l,c,d,u,h,m,x,S,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,d,u,h,m,x,S,p)}set(t,e,n,s,r,a,o,l,c,d,u,h,m,x,S,p){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=u,f[14]=h,f[3]=m,f[7]=x,f[11]=S,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kr().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/bi.setFromMatrixColumn(t,0).length(),r=1/bi.setFromMatrixColumn(t,1).length(),a=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let h=a*d,m=a*u,x=o*d,S=o*u;e[0]=l*d,e[4]=-l*u,e[8]=c,e[1]=m+x*c,e[5]=h-S*c,e[9]=-o*l,e[2]=S-h*c,e[6]=x+m*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*d,m=l*u,x=c*d,S=c*u;e[0]=h+S*o,e[4]=x*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*d,e[9]=-o,e[2]=m*o-x,e[6]=S+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*d,m=l*u,x=c*d,S=c*u;e[0]=h-S*o,e[4]=-a*u,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*d,e[9]=S-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*d,m=a*u,x=o*d,S=o*u;e[0]=l*d,e[4]=x*c-m,e[8]=h*c+S,e[1]=l*u,e[5]=S*c+h,e[9]=m*c-x,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,m=a*c,x=o*l,S=o*c;e[0]=l*d,e[4]=S-h*u,e[8]=x*u+m,e[1]=u,e[5]=a*d,e[9]=-o*d,e[2]=-c*d,e[6]=m*u+x,e[10]=h-S*u}else if(t.order==="XZY"){let h=a*l,m=a*c,x=o*l,S=o*c;e[0]=l*d,e[4]=-u,e[8]=c*d,e[1]=h*u+S,e[5]=a*d,e[9]=m*u-x,e[2]=x*u-m,e[6]=o*d,e[10]=S*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(du,t,fu)}lookAt(t,e,n){let s=this.elements;return ke.subVectors(t,e),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),Fn.crossVectors(n,ke),Fn.lengthSq()===0&&(Math.abs(n.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),Fn.crossVectors(n,ke)),Fn.normalize(),ks.crossVectors(ke,Fn),s[0]=Fn.x,s[4]=ks.x,s[8]=ke.x,s[1]=Fn.y,s[5]=ks.y,s[9]=ke.y,s[2]=Fn.z,s[6]=ks.z,s[10]=ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],m=n[13],x=n[2],S=n[6],p=n[10],f=n[14],A=n[3],E=n[7],v=n[11],b=n[15],M=s[0],C=s[4],_=s[8],w=s[12],R=s[1],I=s[5],N=s[9],G=s[13],X=s[2],O=s[6],W=s[10],H=s[14],K=s[3],Q=s[7],ht=s[11],pt=s[15];return r[0]=a*M+o*R+l*X+c*K,r[4]=a*C+o*I+l*O+c*Q,r[8]=a*_+o*N+l*W+c*ht,r[12]=a*w+o*G+l*H+c*pt,r[1]=d*M+u*R+h*X+m*K,r[5]=d*C+u*I+h*O+m*Q,r[9]=d*_+u*N+h*W+m*ht,r[13]=d*w+u*G+h*H+m*pt,r[2]=x*M+S*R+p*X+f*K,r[6]=x*C+S*I+p*O+f*Q,r[10]=x*_+S*N+p*W+f*ht,r[14]=x*w+S*G+p*H+f*pt,r[3]=A*M+E*R+v*X+b*K,r[7]=A*C+E*I+v*O+b*Q,r[11]=A*_+E*N+v*W+b*ht,r[15]=A*w+E*G+v*H+b*pt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],d=t[2],u=t[6],h=t[10],m=t[14],x=t[3],S=t[7],p=t[11],f=t[15],A=l*m-c*h,E=o*m-c*u,v=o*h-l*u,b=a*m-c*d,M=a*h-l*d,C=a*u-o*d;return e*(S*A-p*E+f*v)-n*(x*A-p*b+f*M)+s*(x*E-S*b+f*C)-r*(x*v-S*M+p*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],d=t[10];return e*(a*d-o*c)-n*(r*d-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],d=t[8],u=t[9],h=t[10],m=t[11],x=t[12],S=t[13],p=t[14],f=t[15],A=e*o-n*a,E=e*l-s*a,v=e*c-r*a,b=n*l-s*o,M=n*c-r*o,C=s*c-r*l,_=d*S-u*x,w=d*p-h*x,R=d*f-m*x,I=u*p-h*S,N=u*f-m*S,G=h*f-m*p,X=A*G-E*N+v*I+b*R-M*w+C*_;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/X;return t[0]=(o*G-l*N+c*I)*O,t[1]=(s*N-n*G-r*I)*O,t[2]=(S*C-p*M+f*b)*O,t[3]=(h*M-u*C-m*b)*O,t[4]=(l*R-a*G-c*w)*O,t[5]=(e*G-s*R+r*w)*O,t[6]=(p*v-x*C-f*E)*O,t[7]=(d*C-h*v+m*E)*O,t[8]=(a*N-o*R+c*_)*O,t[9]=(n*R-e*N-r*_)*O,t[10]=(x*M-S*v+f*A)*O,t[11]=(u*v-d*M-m*A)*O,t[12]=(o*w-a*I-l*_)*O,t[13]=(e*I-n*w+s*_)*O,t[14]=(S*E-x*b-p*A)*O,t[15]=(d*b-u*E+h*A)*O,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,d=a+a,u=o+o,h=r*c,m=r*d,x=r*u,S=a*d,p=a*u,f=o*u,A=l*c,E=l*d,v=l*u,b=n.x,M=n.y,C=n.z;return s[0]=(1-(S+f))*b,s[1]=(m+v)*b,s[2]=(x-E)*b,s[3]=0,s[4]=(m-v)*M,s[5]=(1-(h+f))*M,s[6]=(p+A)*M,s[7]=0,s[8]=(x+E)*C,s[9]=(p-A)*C,s[10]=(1-(h+S))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=bi.set(s[0],s[1],s[2]).length(),o=bi.set(s[4],s[5],s[6]).length(),l=bi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Qe.copy(this);let c=1/a,d=1/o,u=1/l;return Qe.elements[0]*=c,Qe.elements[1]*=c,Qe.elements[2]*=c,Qe.elements[4]*=d,Qe.elements[5]*=d,Qe.elements[6]*=d,Qe.elements[8]*=u,Qe.elements[9]*=u,Qe.elements[10]*=u,e.setFromRotationMatrix(Qe),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=nn,l=!1){let c=this.elements,d=2*r/(e-t),u=2*r/(n-s),h=(e+t)/(e-t),m=(n+s)/(n-s),x,S;if(l)x=r/(a-r),S=a*r/(a-r);else if(o===nn)x=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===Ui)x=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=nn,l=!1){let c=this.elements,d=2/(e-t),u=2/(n-s),h=-(e+t)/(e-t),m=-(n+s)/(n-s),x,S;if(l)x=1/(a-r),S=a/(a-r);else if(o===nn)x=-2/(a-r),S=-(a+r)/(a-r);else if(o===Ui)x=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};kr.prototype.isMatrix4=!0;var ne=kr,bi=new F,Qe=new ne,du=new F(0,0,0),fu=new F(1,1,1),Fn=new F,ks=new F,ke=new F,Wl=new ne,Xl=new mn,In=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Wl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xl.setFromEuler(this),this.setFromQuaternion(Xl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var Bi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},pu=0,ql=new F,wi=new mn,bn=new ne,zs=new F,ji=new F,mu=new F,gu=new mn,Yl=new F(1,0,0),Jl=new F(0,1,0),Zl=new F(0,0,1),$l={type:"added"},_u={type:"removed"},Ti={type:"childadded",child:null},no={type:"childremoved",child:null},Ce=class i extends pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new F,e=new In,n=new mn,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new It}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.multiply(wi),this}rotateOnWorldAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.premultiply(wi),this}rotateX(t){return this.rotateOnAxis(Yl,t)}rotateY(t){return this.rotateOnAxis(Jl,t)}rotateZ(t){return this.rotateOnAxis(Zl,t)}translateOnAxis(t,e){return ql.copy(t).applyQuaternion(this.quaternion),this.position.add(ql.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yl,t)}translateY(t){return this.translateOnAxis(Jl,t)}translateZ(t){return this.translateOnAxis(Zl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zs.copy(t):zs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(ji,zs,this.up):bn.lookAt(zs,ji,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),wi.setFromRotationMatrix(bn),this.quaternion.premultiply(wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(At("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($l),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null):At("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_u),no.child=t,this.dispatchEvent(no),no.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($l),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,t,mu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,gu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),d=a(t.images),u=a(t.shapes),h=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ce.DEFAULT_UP=new F(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ze=class extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},xu={type:"move"},ki=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let S of t.hand.values()){let p=e.getJointPose(S,n),f=this._getHandJoint(c,S);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}let d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),m=.02,x=.005;c.inputState.pinching&&h>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xu)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function io(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Nt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Bt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Bt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Bt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Bt.workingColorSpace){if(t=lu(t,1),e=zt(e,0,1),n=zt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=io(a,r,t+1/3),this.g=io(a,r,t),this.b=io(a,r,t-1/3)}return Bt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&Ct("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ct("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ct("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=Wc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ct("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Cn(t.r),this.g=Cn(t.g),this.b=Cn(t.b),this}copyLinearToSRGB(t){return this.r=Ni(t.r),this.g=Ni(t.g),this.b=Ni(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return Bt.workingToColorSpace(Ee.copy(this),t),Math.round(zt(Ee.r*255,0,255))*65536+Math.round(zt(Ee.g*255,0,255))*256+Math.round(zt(Ee.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Bt.workingColorSpace){Bt.workingToColorSpace(Ee.copy(this),e);let n=Ee.r,s=Ee.g,r=Ee.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=Bt.workingColorSpace){return Bt.workingToColorSpace(Ee.copy(this),e),t.r=Ee.r,t.g=Ee.g,t.b=Ee.b,t}getStyle(t=Ie){Bt.workingToColorSpace(Ee.copy(this),t);let e=Ee.r,n=Ee.g,s=Ee.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(Vs);let n=Ka(On.h,Vs.h,e),s=Ka(On.s,Vs.s,e),r=Ka(On.l,Vs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ee=new Nt;Nt.NAMES=Wc;var os=class extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},tn=new F,wn=new F,so=new F,Tn=new F,Ei=new F,Ai=new F,Kl=new F,ro=new F,ao=new F,oo=new F,lo=new ie,co=new ie,ho=new ie,Gn=class i{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),tn.subVectors(t,e),s.cross(tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){tn.subVectors(s,e),wn.subVectors(n,e),so.subVectors(t,e);let a=tn.dot(tn),o=tn.dot(wn),l=tn.dot(so),c=wn.dot(wn),d=wn.dot(so),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let h=1/u,m=(c*l-o*d)*h,x=(a*d-o*l)*h;return r.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Tn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Tn.x),l.addScaledVector(a,Tn.y),l.addScaledVector(o,Tn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return lo.setScalar(0),co.setScalar(0),ho.setScalar(0),lo.fromBufferAttribute(t,e),co.fromBufferAttribute(t,n),ho.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(lo,r.x),a.addScaledVector(co,r.y),a.addScaledVector(ho,r.z),a}static isFrontFacing(t,e,n,s){return tn.subVectors(n,e),wn.subVectors(t,e),tn.cross(wn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),tn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ei.subVectors(s,n),Ai.subVectors(r,n),ro.subVectors(t,n);let l=Ei.dot(ro),c=Ai.dot(ro);if(l<=0&&c<=0)return e.copy(n);ao.subVectors(t,s);let d=Ei.dot(ao),u=Ai.dot(ao);if(d>=0&&u<=d)return e.copy(s);let h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return a=l/(l-d),e.copy(n).addScaledVector(Ei,a);oo.subVectors(t,r);let m=Ei.dot(oo),x=Ai.dot(oo);if(x>=0&&m<=x)return e.copy(r);let S=m*c-l*x;if(S<=0&&c>=0&&x<=0)return o=c/(c-x),e.copy(n).addScaledVector(Ai,o);let p=d*x-m*u;if(p<=0&&u-d>=0&&m-x>=0)return Kl.subVectors(r,s),o=(u-d)/(u-d+(m-x)),e.copy(s).addScaledVector(Kl,o);let f=1/(p+S+h);return a=S*f,o=h*f,e.copy(n).addScaledVector(Ei,a).addScaledVector(Ai,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Wn=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(en.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(en.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=en.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,en):en.fromBufferAttribute(r,a),en.applyMatrix4(t.matrixWorld),this.expandByPoint(en);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gs.copy(n.boundingBox)),Gs.applyMatrix4(t.matrixWorld),this.union(Gs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,en),en.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qi),Hs.subVectors(this.max,Qi),Ci.subVectors(t.a,Qi),Ri.subVectors(t.b,Qi),Ii.subVectors(t.c,Qi),Bn.subVectors(Ri,Ci),kn.subVectors(Ii,Ri),si.subVectors(Ci,Ii);let e=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-si.z,si.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,si.z,0,-si.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-si.y,si.x,0];return!uo(e,Ci,Ri,Ii,Hs)||(e=[1,0,0,0,1,0,0,0,1],!uo(e,Ci,Ri,Ii,Hs))?!1:(Ws.crossVectors(Bn,kn),e=[Ws.x,Ws.y,Ws.z],uo(e,Ci,Ri,Ii,Hs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,en).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(en).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},En=[new F,new F,new F,new F,new F,new F,new F,new F],en=new F,Gs=new Wn,Ci=new F,Ri=new F,Ii=new F,Bn=new F,kn=new F,si=new F,Qi=new F,Hs=new F,Ws=new F,ri=new F;function uo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ri.fromArray(i,r);let o=s.x*Math.abs(ri.x)+s.y*Math.abs(ri.y)+s.z*Math.abs(ri.z),l=t.dot(ri),c=e.dot(ri),d=n.dot(ri);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var pe=new F,Xs=new kt,yu=0,Ve=class extends pn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Eo,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Xs.fromBufferAttribute(this,e),Xs.applyMatrix3(t),this.setXY(e,Xs.x,Xs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ki(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=De(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ki(e,this.array)),e}setX(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ki(e,this.array)),e}setY(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ki(e,this.array)),e}setZ(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ki(e,this.array)),e}setW(t,e){return this.normalized&&(e=De(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=De(e,this.array),n=De(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=De(e,this.array),n=De(n,this.array),s=De(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=De(e,this.array),n=De(n,this.array),s=De(s,this.array),r=De(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Eo&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}};var ls=class extends Ve{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var cs=class extends Ve{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ue=class extends Ve{constructor(t,e,n){super(new Float32Array(t),e,n)}},vu=new Wn,ts=new F,fo=new F,zi=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):vu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ts.subVectors(t,this.center);let e=ts.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ts,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ts.copy(t.center).add(fo)),this.expandByPoint(ts.copy(t.center).sub(fo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Su=0,Je=new ne,po=new Ce,Pi=new F,ze=new Wn,es=new Wn,ye=new F,He=class i extends pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(au(t)?cs:ls)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new It().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return po.lookAt(t),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ue(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){At("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ze.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&At('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){At("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];es.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(ze.min,es.min),ze.expandByPoint(ye),ye.addVectors(ze.max,es.max),ze.expandByPoint(ye)):(ze.expandByPoint(es.min),ze.expandByPoint(es.max))}ze.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)ye.fromBufferAttribute(o,c),l&&(Pi.fromBufferAttribute(t,c),ye.add(Pi)),s=Math.max(s,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&At('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){At("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ve(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new F,l[_]=new F;let c=new F,d=new F,u=new F,h=new kt,m=new kt,x=new kt,S=new F,p=new F;function f(_,w,R){c.fromBufferAttribute(n,_),d.fromBufferAttribute(n,w),u.fromBufferAttribute(n,R),h.fromBufferAttribute(r,_),m.fromBufferAttribute(r,w),x.fromBufferAttribute(r,R),d.sub(c),u.sub(c),m.sub(h),x.sub(h);let I=1/(m.x*x.y-x.x*m.y);isFinite(I)&&(S.copy(d).multiplyScalar(x.y).addScaledVector(u,-m.y).multiplyScalar(I),p.copy(u).multiplyScalar(m.x).addScaledVector(d,-x.x).multiplyScalar(I),o[_].add(S),o[w].add(S),o[R].add(S),l[_].add(p),l[w].add(p),l[R].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let _=0,w=A.length;_<w;++_){let R=A[_],I=R.start,N=R.count;for(let G=I,X=I+N;G<X;G+=3)f(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let E=new F,v=new F,b=new F,M=new F;function C(_){b.fromBufferAttribute(s,_),M.copy(b);let w=o[_];E.copy(w),E.sub(b.multiplyScalar(b.dot(w))).normalize(),v.crossVectors(M,w);let I=v.dot(l[_])<0?-1:1;a.setXYZW(_,E.x,E.y,E.z,I)}for(let _=0,w=A.length;_<w;++_){let R=A[_],I=R.start,N=R.count;for(let G=I,X=I+N;G<X;G+=3)C(t.getX(G+0)),C(t.getX(G+1)),C(t.getX(G+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ve(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);let s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,d=new F,u=new F;if(t)for(let h=0,m=t.count;h<m;h+=3){let x=t.getX(h+0),S=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,p),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,p),o.add(d),l.add(d),c.add(d),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,l){let c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d),m=0,x=0;for(let S=0,p=l.length;S<p;S++){o.isInterleavedBufferAttribute?m=l[S]*o.data.stride+o.offset:m=l[S]*d;for(let f=0;f<d;f++)h[x++]=c[m++]}return new Ve(h,d,u)}if(this.index===null)return Ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){let h=c[d],m=t(h,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){let m=c[u];d.push(m.toJSON(t.data))}d.length>0&&(s[l]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(e))}let r=t.morphAttributes;for(let c in r){let d=[],u=r[c];for(let h=0,m=u.length;h<m;h++)d.push(u[h].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,d=a.length;c<d;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Mu=0,Xn=class extends pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=hi,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ar,this.blendDst=or,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=To,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Ct(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ct(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ar&&(n.blendSrc=this.blendSrc),this.blendDst!==or&&(n.blendDst=this.blendDst),this.blendEquation!==Hn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ui&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==To&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Nt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new kt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new kt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var An=new F,mo=new F,qs=new F,zn=new F,go=new F,Ys=new F,_o=new F,hs=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){mo.copy(t).add(e).multiplyScalar(.5),qs.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(mo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(qs),o=zn.dot(this.direction),l=-zn.dot(qs),c=zn.lengthSq(),d=Math.abs(1-a*a),u,h,m,x;if(d>0)if(u=a*l-o,h=a*o-l,x=r*d,u>=0)if(h>=-x)if(h<=x){let S=1/d;u*=S,h*=S,m=u*(u+a*h+2*o)+h*(a*u+h+2*l)+c}else h=r,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;else h<=-x?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+h*(h+2*l)+c):h<=x?(u=0,h=Math.min(Math.max(-r,-l),r),m=h*(h+2*l)+c):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+h*(h+2*l)+c);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(mo).addScaledVector(qs,h),m}intersectSphere(t,e){An.subVectors(t.center,this.origin);let n=An.dot(this.direction),s=An.dot(An)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),d>=0?(r=(t.min.y-h.y)*d,a=(t.max.y-h.y)*d):(r=(t.max.y-h.y)*d,a=(t.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-h.z)*u,l=(t.max.z-h.z)*u):(o=(t.max.z-h.z)*u,l=(t.min.z-h.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,s,r){go.subVectors(e,t),Ys.subVectors(n,t),_o.crossVectors(go,Ys);let a=this.direction.dot(_o),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;zn.subVectors(this.origin,t);let l=o*this.direction.dot(Ys.crossVectors(zn,Ys));if(l<0)return null;let c=o*this.direction.dot(go.cross(zn));if(c<0||l+c>a)return null;let d=-o*zn.dot(_o);return d<0?null:this.at(d/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qn=class extends Xn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Fo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},jl=new ne,ai=new hs,Js=new zi,Ql=new F,Zs=new F,$s=new F,Ks=new F,xo=new F,js=new F,tc=new F,Qs=new F,ee=class extends Ce{constructor(t=new He,e=new qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){js.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=o[l],u=r[l];d!==0&&(xo.fromBufferAttribute(u,t),a?js.addScaledVector(xo,d):js.addScaledVector(xo.sub(e),d))}e.add(js)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(Js.containsPoint(ai.origin)===!1&&(ai.intersectSphere(Js,Ql)===null||ai.origin.distanceToSquared(Ql)>(t.far-t.near)**2))&&(jl.copy(r).invert(),ai.copy(t.ray).applyMatrix4(jl),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){let p=h[x],f=a[p.materialIndex],A=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let v=A,b=E;v<b;v+=3){let M=o.getX(v),C=o.getX(v+1),_=o.getX(v+2);s=tr(this,f,t,n,c,d,u,M,C,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let p=x,f=S;p<f;p+=3){let A=o.getX(p),E=o.getX(p+1),v=o.getX(p+2);s=tr(this,a,t,n,c,d,u,A,E,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){let p=h[x],f=a[p.materialIndex],A=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let v=A,b=E;v<b;v+=3){let M=v,C=v+1,_=v+2;s=tr(this,f,t,n,c,d,u,M,C,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),S=Math.min(l.count,m.start+m.count);for(let p=x,f=S;p<f;p+=3){let A=p,E=p+1,v=p+2;s=tr(this,a,t,n,c,d,u,A,E,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function bu(i,t,e,n,s,r,a,o){let l;if(t.side===Pe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Rn,o),l===null)return null;Qs.copy(o),Qs.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Qs);return c<e.near||c>e.far?null:{distance:c,point:Qs.clone(),object:i}}function tr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Zs),i.getVertexPosition(l,$s),i.getVertexPosition(c,Ks);let d=bu(i,t,e,n,Zs,$s,Ks,tc);if(d){let u=new F;Gn.getBarycoord(tc,Zs,$s,Ks,u),s&&(d.uv=Gn.getInterpolatedAttribute(s,o,l,c,u,new kt)),r&&(d.uv1=Gn.getInterpolatedAttribute(r,o,l,c,u,new kt)),a&&(d.normal=Gn.getInterpolatedAttribute(a,o,l,c,u,new F),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new F,materialIndex:0};Gn.getNormal(Zs,$s,Ks,h.normal),d.face=h,d.barycoord=u}return d}var Mr=class extends Ne{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ve,d=ve,u,h){super(null,a,o,l,c,d,s,r,u,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yo=new F,wu=new F,Tu=new It,un=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=yo.subVectors(n,e).cross(wu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(yo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Tu.getNormalMatrix(t),s=this.coplanarPoint(yo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},oi=new zi,Eu=new kt(.5,.5),er=new F,Vi=class{constructor(t=new un,e=new un,n=new un,s=new un,r=new un,a=new un){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=nn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],m=r[7],x=r[8],S=r[9],p=r[10],f=r[11],A=r[12],E=r[13],v=r[14],b=r[15];if(s[0].setComponents(c-a,m-d,f-x,b-A).normalize(),s[1].setComponents(c+a,m+d,f+x,b+A).normalize(),s[2].setComponents(c+o,m+u,f+S,b+E).normalize(),s[3].setComponents(c-o,m-u,f-S,b-E).normalize(),n)s[4].setComponents(l,h,p,v).normalize(),s[5].setComponents(c-l,m-h,f-p,b-v).normalize();else if(s[4].setComponents(c-l,m-h,f-p,b-v).normalize(),e===nn)s[5].setComponents(c+l,m+h,f+p,b+v).normalize();else if(e===Ui)s[5].setComponents(l,h,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(t){oi.center.set(0,0,0);let e=Eu.distanceTo(t.center);return oi.radius=.7071067811865476+e,oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(er.x=s.normal.x>0?t.max.x:t.min.x,er.y=s.normal.y>0?t.max.y:t.min.y,er.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(er)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var us=class extends Ne{constructor(t=[],e=jn,n,s,r,a,o,l,c,d){super(t,e,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Pn=class extends Ne{constructor(t,e,n=rn,s,r,a,o=ve,l=ve,c,d=fn,u=1){if(d!==fn&&d!==ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:u};super(h,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Oi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},br=class extends Pn{constructor(t,e=rn,n=jn,s,r,a=ve,o=ve,l,c=fn){let d={width:t,height:t,depth:1},u=[d,d,d,d,d,d];super(t,t,e,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ds=class extends Ne{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},gn=class i extends He{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],d=[],u=[],h=0,m=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(d,3)),this.setAttribute("uv",new ue(u,2));function x(S,p,f,A,E,v,b,M,C,_,w){let R=v/C,I=b/_,N=v/2,G=b/2,X=M/2,O=C+1,W=_+1,H=0,K=0,Q=new F;for(let ht=0;ht<W;ht++){let pt=ht*I-G;for(let _t=0;_t<O;_t++){let Ht=_t*R-N;Q[S]=Ht*A,Q[p]=pt*E,Q[f]=X,c.push(Q.x,Q.y,Q.z),Q[S]=0,Q[p]=0,Q[f]=M>0?1:-1,d.push(Q.x,Q.y,Q.z),u.push(_t/C),u.push(1-ht/_),H+=1}}for(let ht=0;ht<_;ht++)for(let pt=0;pt<C;pt++){let _t=h+pt+O*ht,Ht=h+pt+O*(ht+1),se=h+(pt+1)+O*(ht+1),Wt=h+(pt+1)+O*ht;l.push(_t,Ht,Wt),l.push(Ht,se,Wt),K+=6}o.addGroup(m,K,w),m+=K,h+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},fs=class i extends He{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],d=e/2,u=Math.PI/2*t,h=e,m=2*u+h,x=n*2+r,S=s+1,p=new F,f=new F;for(let A=0;A<=x;A++){let E=0,v=0,b=0,M=0;if(A<=n){let w=A/n,R=w*Math.PI/2;v=-d-t*Math.cos(R),b=t*Math.sin(R),M=-t*Math.cos(R),E=w*u}else if(A<=n+r){let w=(A-n)/r;v=-d+w*e,b=t,M=0,E=u+w*h}else{let w=(A-n-r)/n,R=w*Math.PI/2;v=d+t*Math.sin(R),b=t*Math.cos(R),M=t*Math.sin(R),E=u+h+w*u}let C=Math.max(0,Math.min(1,E/m)),_=0;A===0?_=.5/s:A===x&&(_=-.5/s);for(let w=0;w<=s;w++){let R=w/s,I=R*Math.PI*2,N=Math.sin(I),G=Math.cos(I);f.x=-b*G,f.y=v,f.z=b*N,o.push(f.x,f.y,f.z),p.set(-b*G,M,b*N),p.normalize(),l.push(p.x,p.y,p.z),c.push(R+_,C)}if(A>0){let w=(A-1)*S;for(let R=0;R<s;R++){let I=w+R,N=w+R+1,G=A*S+R,X=A*S+R+1;a.push(I,N,G),a.push(N,X,G)}}}this.setIndex(a),this.setAttribute("position",new ue(o,3)),this.setAttribute("normal",new ue(l,3)),this.setAttribute("uv",new ue(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}};var Yn=class i extends He{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let d=[],u=[],h=[],m=[],x=0,S=[],p=n/2,f=0;A(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new ue(u,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(m,2));function A(){let v=new F,b=new F,M=0,C=(e-t)/n;for(let _=0;_<=r;_++){let w=[],R=_/r,I=R*(e-t)+t;for(let N=0;N<=s;N++){let G=N/s,X=G*l+o,O=Math.sin(X),W=Math.cos(X);b.x=I*O,b.y=-R*n+p,b.z=I*W,u.push(b.x,b.y,b.z),v.set(O,C,W).normalize(),h.push(v.x,v.y,v.z),m.push(G,1-R),w.push(x++)}S.push(w)}for(let _=0;_<s;_++)for(let w=0;w<r;w++){let R=S[w][_],I=S[w+1][_],N=S[w+1][_+1],G=S[w][_+1];(t>0||w!==0)&&(d.push(R,I,G),M+=3),(e>0||w!==r-1)&&(d.push(I,N,G),M+=3)}c.addGroup(f,M,0),f+=M}function E(v){let b=x,M=new kt,C=new F,_=0,w=v===!0?t:e,R=v===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,p*R,0),h.push(0,R,0),m.push(.5,.5),x++;let I=x;for(let N=0;N<=s;N++){let X=N/s*l+o,O=Math.cos(X),W=Math.sin(X);C.x=w*W,C.y=p*R,C.z=w*O,u.push(C.x,C.y,C.z),h.push(0,R,0),M.x=O*.5+.5,M.y=W*.5*R+.5,m.push(M.x,M.y),x++}for(let N=0;N<s;N++){let G=b+N,X=I+N;v===!0?d.push(X,X+1,G):d.push(X+1,X,G),_+=3}c.addGroup(f,_,v===!0?1:2),f+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ps=class i extends He{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=t/o,h=e/l,m=[],x=[],S=[],p=[];for(let f=0;f<d;f++){let A=f*h-a;for(let E=0;E<c;E++){let v=E*u-r;x.push(v,-A,0),S.push(0,0,1),p.push(E/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let A=0;A<o;A++){let E=A+c*f,v=A+c*(f+1),b=A+1+c*(f+1),M=A+1+c*f;m.push(E,v,M),m.push(v,b,M)}this.setIndex(m),this.setAttribute("position",new ue(x,3)),this.setAttribute("normal",new ue(S,3)),this.setAttribute("uv",new ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Jn=class i extends He{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],d=[],u=[],h=new F,m=new F,x=new F;for(let S=0;S<=n;S++){let p=a+S/n*o;for(let f=0;f<=s;f++){let A=f/s*r;m.x=(t+e*Math.cos(p))*Math.cos(A),m.y=(t+e*Math.cos(p))*Math.sin(A),m.z=e*Math.sin(p),c.push(m.x,m.y,m.z),h.x=t*Math.cos(A),h.y=t*Math.sin(A),x.subVectors(m,h).normalize(),d.push(x.x,x.y,x.z),u.push(f/s),u.push(S/n)}}for(let S=1;S<=n;S++)for(let p=1;p<=s;p++){let f=(s+1)*S+p-1,A=(s+1)*(S-1)+p-1,E=(s+1)*(S-1)+p,v=(s+1)*S+p;l.push(f,A,v),l.push(A,E,v)}this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(d,3)),this.setAttribute("uv",new ue(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};function pi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(ec(s))s.isRenderTargetTexture?(Ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ec(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Re(i){let t={};for(let e=0;e<i.length;e++){let n=pi(i[e]);for(let s in n)t[s]=n[s]}return t}function ec(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Au(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Qo(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Bt.workingColorSpace}var Xc={clone:pi,merge:Re},Cu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ru=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,We=class extends Xn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cu,this.fragmentShader=Ru,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=pi(t.uniforms),this.uniformsGroups=Au(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Nt().setHex(s.value);break;case"v2":this.uniforms[n].value=new kt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new ie().fromArray(s.value);break;case"m3":this.uniforms[n].value=new It().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ne().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},wr=class extends We{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},$e=class extends Xn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ta,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Tr=class extends Xn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Er=class extends Xn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function nr(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}var Zn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ar=class extends Zn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mo,endingEnd:Mo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case bo:r=t,o=2*e-n;break;case wo:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case bo:a=t,l=2*n-e;break;case wo:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,d=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,m=this._weightNext,x=(n-e)/(s-e),S=x*x,p=S*x,f=-h*p+2*h*S-h*x,A=(1+h)*p+(-1.5-2*h)*S+(-.5+h)*x+1,E=(-1-m)*p+(1.5+m)*S+.5*x,v=m*p-m*S;for(let b=0;b!==o;++b)r[b]=f*a[d+b]+A*a[c+b]+E*a[l+b]+v*a[u+b];return r}},Cr=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=(n-e)/(s-e),u=1-d;for(let h=0;h!==o;++h)r[h]=a[c+h]*u+a[l+h]*d;return r}},Rr=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ir=class extends Zn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,d=this.inTangents,u=this.outTangents;if(!d||!u){let x=(n-e)/(s-e),S=1-x;for(let p=0;p!==o;++p)r[p]=a[c+p]*S+a[l+p]*x;return r}let h=o*2,m=t-1;for(let x=0;x!==o;++x){let S=a[c+x],p=a[l+x],f=m*h+x*2,A=u[f],E=u[f+1],v=t*h+x*2,b=d[v],M=d[v+1],C=(n-e)/(s-e),_,w,R,I,N;for(let G=0;G<8;G++){_=C*C,w=_*C,R=1-C,I=R*R,N=I*R;let O=N*e+3*I*C*A+3*R*_*b+w*s-n;if(Math.abs(O)<1e-10)break;let W=3*I*(A-e)+6*R*C*(b-A)+3*_*(s-b);if(Math.abs(W)<1e-10)break;C=C-O/W,C=Math.max(0,Math.min(1,C))}r[x]=N*S+3*I*C*E+3*R*_*M+w*p}return r}},Xe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=nr(e,this.TimeBufferType),this.values=nr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:nr(t.times,Array),values:nr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Rr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Cr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ar(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ir(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case ns:e=this.InterpolantFactoryMethodDiscrete;break;case _r:e=this.InterpolantFactoryMethodLinear;break;case rr:e=this.InterpolantFactoryMethodSmooth;break;case So:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ct("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ns;case this.InterpolantFactoryMethodLinear:return _r;case this.InterpolantFactoryMethodSmooth:return rr;case this.InterpolantFactoryMethodBezier:return So}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(At("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(At("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){At("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){At("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&ou(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){At("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===rr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],d=t[o+1];if(c!==d&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*n,h=u-n,m=u+n;for(let x=0;x!==n;++x){let S=e[u+x];if(S!==e[h+x]||S!==e[m+x]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,h=a*n;for(let m=0;m!==n;++m)e[h+m]=e[u+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Xe.prototype.ValueTypeName="";Xe.prototype.TimeBufferType=Float32Array;Xe.prototype.ValueBufferType=Float32Array;Xe.prototype.DefaultInterpolation=_r;var $n=class extends Xe{constructor(t,e,n){super(t,e,n)}};$n.prototype.ValueTypeName="bool";$n.prototype.ValueBufferType=Array;$n.prototype.DefaultInterpolation=ns;$n.prototype.InterpolantFactoryMethodLinear=void 0;$n.prototype.InterpolantFactoryMethodSmooth=void 0;var Pr=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}};Pr.prototype.ValueTypeName="color";var Lr=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}};Lr.prototype.ValueTypeName="number";var Dr=class extends Zn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let d=c+o;c!==d;c+=4)mn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ms=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Dr(this.times,this.values,this.getValueSize(),t)}};ms.prototype.ValueTypeName="quaternion";ms.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends Xe{constructor(t,e,n){super(t,e,n)}};Kn.prototype.ValueTypeName="string";Kn.prototype.ValueBufferType=Array;Kn.prototype.DefaultInterpolation=ns;Kn.prototype.InterpolantFactoryMethodLinear=void 0;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var Nr=class extends Xe{constructor(t,e,n,s){super(t,e,n,s)}};Nr.prototype.ValueTypeName="vector";var Ur=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){let u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,h=c.length;u<h;u+=2){let m=c[u],x=c[u+1];if(m.global&&(m.lastIndex=0),m.test(d))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},qc=new Ur,Fr=class{constructor(t){this.manager=t!==void 0?t:qc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Fr.DEFAULT_MATERIAL_NAME="__DEFAULT";var gs=class extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},_s=class extends gs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},vo=new ne,nc=new F,ic=new F,Ao=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.mapType=Ue,this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vi,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;nc.setFromMatrixPosition(t.matrixWorld),e.position.copy(nc),ic.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ic),e.updateMatrixWorld(),vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Ui||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ir=new F,sr=new mn,hn=new F,xs=class extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ir,sr,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ir,sr,hn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(ir,sr,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ir,sr,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Vn=new F,sc=new kt,rc=new kt,Ae=class extends xs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=xr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan($a*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xr*2*Math.atan(Math.tan($a*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,sc,rc),e.subVectors(rc,sc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan($a*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Gi=class extends xs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Co=class extends Ao{constructor(){super(new Gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hi=class extends gs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Co}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Li=-90,Di=1,Or=class extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ae(Li,Di,t,e);s.layers=this.layers,this.add(s);let r=new Ae(Li,Di,t,e);r.layers=this.layers,this.add(r);let a=new Ae(Li,Di,t,e);a.layers=this.layers,this.add(a);let o=new Ae(Li,Di,t,e);o.layers=this.layers,this.add(o);let l=new Ae(Li,Di,t,e);l.layers=this.layers,this.add(l);let c=new Ae(Li,Di,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ui)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,d]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=S,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(u,h,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Br=class extends Ae{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var tl="\\[\\]\\.:\\/",Iu=new RegExp("["+tl+"]","g"),el="[^"+tl+"]",Pu="[^"+tl.replace("\\.","")+"]",Lu=/((?:WC+[\/:])*)/.source.replace("WC",el),Du=/(WCOD+)?/.source.replace("WCOD",Pu),Nu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",el),Uu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",el),Fu=new RegExp("^"+Lu+Du+Nu+Uu+"$"),Ou=["material","materials","bones","map"],Ro=class{constructor(t,e,n){let s=n||te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},te=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Iu,"")}static parseTrackName(t){let e=Fu.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ou.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){At("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){At("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){At("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===c){c=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){At("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){At("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){At("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){At("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;At("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){At("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){At("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};te.Composite=Ro;te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};te.prototype.GetterByBindingType=[te.prototype._getValue_direct,te.prototype._getValue_array,te.prototype._getValue_arrayElement,te.prototype._getValue_toArray];te.prototype.SetterByBindingTypeAndVersioning=[[te.prototype._setValue_direct,te.prototype._setValue_direct_setNeedsUpdate,te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[te.prototype._setValue_array,te.prototype._setValue_array_setNeedsUpdate,te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[te.prototype._setValue_arrayElement,te.prototype._setValue_arrayElement_setNeedsUpdate,te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[te.prototype._setValue_fromArray,te.prototype._setValue_fromArray_setNeedsUpdate,te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var s0=new Float32Array(1);var ac=new ne,ys=class{constructor(t,e,n=0,s=1/0){this.ray=new hs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Bi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):At("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ac.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ac),this}intersectObject(t,e=!0,n=[]){return Io(t,this,n,e),n.sort(oc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Io(t[s],this,n,e);return n.sort(oc),n}};function oc(i,t){return i.distance-t.distance}function Io(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Io(r[a],t,e,!0)}}var ol=class ol{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};ol.prototype.isMatrix2=!0;var Po=ol;function nl(i,t,e,n){let s=Bu(n);switch(e){case Jo:return i*t;case $o:return i*t/s.components*s.byteLength;case qr:return i*t/s.components*s.byteLength;case ei:return i*t*2/s.components*s.byteLength;case Yr:return i*t*2/s.components*s.byteLength;case Zo:return i*t*3/s.components*s.byteLength;case Ke:return i*t*4/s.components*s.byteLength;case Jr:return i*t*4/s.components*s.byteLength;case bs:case ws:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ts:case Es:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $r:case jr:return Math.max(i,16)*Math.max(t,8)/4;case Zr:case Kr:return Math.max(i,8)*Math.max(t,8)/2;case Qr:case ta:case na:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ea:case As:case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case la:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ha:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case fa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _a:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ya:case va:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ma:case ba:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Cs:case wa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Bu(i){switch(i){case Ue:case Wo:return{byteLength:1,components:1};case Xi:case Xo:case yn:return{byteLength:2,components:1};case Wr:case Xr:return{byteLength:2,components:4};case rn:case Hr:case an:return{byteLength:4,components:1};case qo:case Yo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window!="undefined"&&(window.__THREE__?Ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function mh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function zu(i){let t=new WeakMap;function e(o,l){let c=o.array,d=o.usage,u=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let d=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,d);else{u.sort((m,x)=>m.start-x.start);let h=0;for(let m=1;m<u.length;m++){let x=u[h],S=u[m];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++h,u[h]=S)}u.length=h+1;for(let m=0,x=u.length;m<x;m++){let S=u[m];i.bufferSubData(c,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ju=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$u=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ku=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ju=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,td=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ed=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ad=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,od=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ld=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,hd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ud=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_d="gl_FragColor = linearToOutputTexel( gl_FragColor );",xd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,vd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Sd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Id=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ld=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Dd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ud=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$d=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Kd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ef=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,af=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,of=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,uf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,df=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ff=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_f=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Tf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ef=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Af=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,If=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ff=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Of=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$f=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ip=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ap=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,op=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,up=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:Vu,alphahash_pars_fragment:Gu,alphamap_fragment:Hu,alphamap_pars_fragment:Wu,alphatest_fragment:Xu,alphatest_pars_fragment:qu,aomap_fragment:Yu,aomap_pars_fragment:Ju,batching_pars_vertex:Zu,batching_vertex:$u,begin_vertex:Ku,beginnormal_vertex:ju,bsdfs:Qu,iridescence_fragment:td,bumpmap_pars_fragment:ed,clipping_planes_fragment:nd,clipping_planes_pars_fragment:id,clipping_planes_pars_vertex:sd,clipping_planes_vertex:rd,color_fragment:ad,color_pars_fragment:od,color_pars_vertex:ld,color_vertex:cd,common:hd,cube_uv_reflection_fragment:ud,defaultnormal_vertex:dd,displacementmap_pars_vertex:fd,displacementmap_vertex:pd,emissivemap_fragment:md,emissivemap_pars_fragment:gd,colorspace_fragment:_d,colorspace_pars_fragment:xd,envmap_fragment:yd,envmap_common_pars_fragment:vd,envmap_pars_fragment:Sd,envmap_pars_vertex:Md,envmap_physical_pars_fragment:Dd,envmap_vertex:bd,fog_vertex:wd,fog_pars_vertex:Td,fog_fragment:Ed,fog_pars_fragment:Ad,gradientmap_pars_fragment:Cd,lightmap_pars_fragment:Rd,lights_lambert_fragment:Id,lights_lambert_pars_fragment:Pd,lights_pars_begin:Ld,lights_toon_fragment:Nd,lights_toon_pars_fragment:Ud,lights_phong_fragment:Fd,lights_phong_pars_fragment:Od,lights_physical_fragment:Bd,lights_physical_pars_fragment:kd,lights_fragment_begin:zd,lights_fragment_maps:Vd,lights_fragment_end:Gd,lightprobes_pars_fragment:Hd,logdepthbuf_fragment:Wd,logdepthbuf_pars_fragment:Xd,logdepthbuf_pars_vertex:qd,logdepthbuf_vertex:Yd,map_fragment:Jd,map_pars_fragment:Zd,map_particle_fragment:$d,map_particle_pars_fragment:Kd,metalnessmap_fragment:jd,metalnessmap_pars_fragment:Qd,morphinstance_vertex:tf,morphcolor_vertex:ef,morphnormal_vertex:nf,morphtarget_pars_vertex:sf,morphtarget_vertex:rf,normal_fragment_begin:af,normal_fragment_maps:of,normal_pars_fragment:lf,normal_pars_vertex:cf,normal_vertex:hf,normalmap_pars_fragment:uf,clearcoat_normal_fragment_begin:df,clearcoat_normal_fragment_maps:ff,clearcoat_pars_fragment:pf,iridescence_pars_fragment:mf,opaque_fragment:gf,packing:_f,premultiplied_alpha_fragment:xf,project_vertex:yf,dithering_fragment:vf,dithering_pars_fragment:Sf,roughnessmap_fragment:Mf,roughnessmap_pars_fragment:bf,shadowmap_pars_fragment:wf,shadowmap_pars_vertex:Tf,shadowmap_vertex:Ef,shadowmask_pars_fragment:Af,skinbase_vertex:Cf,skinning_pars_vertex:Rf,skinning_vertex:If,skinnormal_vertex:Pf,specularmap_fragment:Lf,specularmap_pars_fragment:Df,tonemapping_fragment:Nf,tonemapping_pars_fragment:Uf,transmission_fragment:Ff,transmission_pars_fragment:Of,uv_pars_fragment:Bf,uv_pars_vertex:kf,uv_vertex:zf,worldpos_vertex:Vf,background_vert:Gf,background_frag:Hf,backgroundCube_vert:Wf,backgroundCube_frag:Xf,cube_vert:qf,cube_frag:Yf,depth_vert:Jf,depth_frag:Zf,distance_vert:$f,distance_frag:Kf,equirect_vert:jf,equirect_frag:Qf,linedashed_vert:tp,linedashed_frag:ep,meshbasic_vert:np,meshbasic_frag:ip,meshlambert_vert:sp,meshlambert_frag:rp,meshmatcap_vert:ap,meshmatcap_frag:op,meshnormal_vert:lp,meshnormal_frag:cp,meshphong_vert:hp,meshphong_frag:up,meshphysical_vert:dp,meshphysical_frag:fp,meshtoon_vert:pp,meshtoon_frag:mp,points_vert:gp,points_frag:_p,shadow_vert:xp,shadow_frag:yp,sprite_vert:vp,sprite_frag:Sp},ct={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},Sn={basic:{uniforms:Re([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Re([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Nt(0)},envMapIntensity:{value:1}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Re([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Re([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Re([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Re([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Re([ct.points,ct.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Re([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Re([ct.common,ct.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Re([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Re([ct.sprite,ct.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distance:{uniforms:Re([ct.common,ct.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distance_vert,fragmentShader:Ut.distance_frag},shadow:{uniforms:Re([ct.lights,ct.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};Sn.physical={uniforms:Re([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};var Ca={r:0,b:0,g:0},Mp=new ne,gh=new It;gh.set(-1,0,0,0,1,0,0,0,1);function bp(i,t,e,n,s,r){let a=new Nt(0),o=s===!0?0:1,l,c,d=null,u=0,h=null;function m(A){let E=A.isScene===!0?A.background:null;if(E&&E.isTexture){let v=A.backgroundBlurriness>0;E=t.get(E,v)}return E}function x(A){let E=!1,v=m(A);v===null?p(a,o):v&&v.isColor&&(p(v,1),E=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(A,E){let v=m(E);v&&(v.isCubeTexture||v.mapping===Ss)?(c===void 0&&(c=new ee(new gn(1,1,1),new We({name:"BackgroundCubeMaterial",uniforms:pi(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Pe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Mp.makeRotationFromEuler(E.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(gh),c.material.toneMapped=Bt.getTransfer(v.colorSpace)!==qt,(d!==v||u!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,h=i.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ee(new ps(2,2),new We({name:"BackgroundMaterial",uniforms:pi(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Bt.getTransfer(v.colorSpace)!==qt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,d=v,u=v.version,h=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function p(A,E){A.getRGB(Ca,Qo(i)),e.buffers.color.setClear(Ca.r,Ca.g,Ca.b,E,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,E=1){a.set(A),o=E,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,p(a,o)},render:x,addToRenderList:S,dispose:f}}function wp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(I,N,G,X,O){let W=!1,H=u(I,X,G,N);r!==H&&(r=H,c(r.object)),W=m(I,X,G,O),W&&x(I,X,G,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,v(I,N,G,X),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function d(I){return i.deleteVertexArray(I)}function u(I,N,G,X){let O=X.wireframe===!0,W=n[N.id];W===void 0&&(W={},n[N.id]=W);let H=I.isInstancedMesh===!0?I.id:0,K=W[H];K===void 0&&(K={},W[H]=K);let Q=K[G.id];Q===void 0&&(Q={},K[G.id]=Q);let ht=Q[O];return ht===void 0&&(ht=h(l()),Q[O]=ht),ht}function h(I){let N=[],G=[],X=[];for(let O=0;O<e;O++)N[O]=0,G[O]=0,X[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:X,object:I,attributes:{},index:null}}function m(I,N,G,X){let O=r.attributes,W=N.attributes,H=0,K=G.getAttributes();for(let Q in K)if(K[Q].location>=0){let pt=O[Q],_t=W[Q];if(_t===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(_t=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(_t=I.instanceColor)),pt===void 0||pt.attribute!==_t||_t&&pt.data!==_t.data)return!0;H++}return r.attributesNum!==H||r.index!==X}function x(I,N,G,X){let O={},W=N.attributes,H=0,K=G.getAttributes();for(let Q in K)if(K[Q].location>=0){let pt=W[Q];pt===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(pt=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(pt=I.instanceColor));let _t={};_t.attribute=pt,pt&&pt.data&&(_t.data=pt.data),O[Q]=_t,H++}r.attributes=O,r.attributesNum=H,r.index=X}function S(){let I=r.newAttributes;for(let N=0,G=I.length;N<G;N++)I[N]=0}function p(I){f(I,0)}function f(I,N){let G=r.newAttributes,X=r.enabledAttributes,O=r.attributeDivisors;G[I]=1,X[I]===0&&(i.enableVertexAttribArray(I),X[I]=1),O[I]!==N&&(i.vertexAttribDivisor(I,N),O[I]=N)}function A(){let I=r.newAttributes,N=r.enabledAttributes;for(let G=0,X=N.length;G<X;G++)N[G]!==I[G]&&(i.disableVertexAttribArray(G),N[G]=0)}function E(I,N,G,X,O,W,H){H===!0?i.vertexAttribIPointer(I,N,G,O,W):i.vertexAttribPointer(I,N,G,X,O,W)}function v(I,N,G,X){S();let O=X.attributes,W=G.getAttributes(),H=N.defaultAttributeValues;for(let K in W){let Q=W[K];if(Q.location>=0){let ht=O[K];if(ht===void 0&&(K==="instanceMatrix"&&I.instanceMatrix&&(ht=I.instanceMatrix),K==="instanceColor"&&I.instanceColor&&(ht=I.instanceColor)),ht!==void 0){let pt=ht.normalized,_t=ht.itemSize,Ht=t.get(ht);if(Ht===void 0)continue;let se=Ht.buffer,Wt=Ht.type,$=Ht.bytesPerElement,it=Wt===i.INT||Wt===i.UNSIGNED_INT||ht.gpuType===Hr;if(ht.isInterleavedBufferAttribute){let tt=ht.data,Rt=tt.stride,Pt=ht.offset;if(tt.isInstancedInterleavedBuffer){for(let Tt=0;Tt<Q.locationSize;Tt++)f(Q.location+Tt,tt.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Tt=0;Tt<Q.locationSize;Tt++)p(Q.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,se);for(let Tt=0;Tt<Q.locationSize;Tt++)E(Q.location+Tt,_t/Q.locationSize,Wt,pt,Rt*$,(Pt+_t/Q.locationSize*Tt)*$,it)}else{if(ht.isInstancedBufferAttribute){for(let tt=0;tt<Q.locationSize;tt++)f(Q.location+tt,ht.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let tt=0;tt<Q.locationSize;tt++)p(Q.location+tt);i.bindBuffer(i.ARRAY_BUFFER,se);for(let tt=0;tt<Q.locationSize;tt++)E(Q.location+tt,_t/Q.locationSize,Wt,pt,_t*$,_t/Q.locationSize*tt*$,it)}}else if(H!==void 0){let pt=H[K];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(Q.location,pt);break;case 3:i.vertexAttrib3fv(Q.location,pt);break;case 4:i.vertexAttrib4fv(Q.location,pt);break;default:i.vertexAttrib1fv(Q.location,pt)}}}}A()}function b(){w();for(let I in n){let N=n[I];for(let G in N){let X=N[G];for(let O in X){let W=X[O];for(let H in W)d(W[H].object),delete W[H];delete X[O]}}delete n[I]}}function M(I){if(n[I.id]===void 0)return;let N=n[I.id];for(let G in N){let X=N[G];for(let O in X){let W=X[O];for(let H in W)d(W[H].object),delete W[H];delete X[O]}}delete n[I.id]}function C(I){for(let N in n){let G=n[N];for(let X in G){let O=G[X];if(O[I.id]===void 0)continue;let W=O[I.id];for(let H in W)d(W[H].object),delete W[H];delete O[I.id]}}}function _(I){for(let N in n){let G=n[N],X=I.isInstancedMesh===!0?I.id:0,O=G[X];if(O!==void 0){for(let W in O){let H=O[W];for(let K in H)d(H[K].object),delete H[K];delete O[W]}delete G[X],Object.keys(G).length===0&&delete n[N]}}}function w(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:R,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:p,disableUnusedAttributes:A}}function Tp(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),e.update(c,n,d))}function o(l,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let h=0;for(let m=0;m<d;m++)h+=c[m];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ep(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Ke&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let _=C===yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Ue&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==an&&!_)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",d=l(c);d!==c&&(Ct("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let u=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:A,maxVaryings:E,maxFragmentUniforms:v,maxSamples:b,samples:M}}function Ap(i){let t=this,e=null,n=0,s=!1,r=!1,a=new un,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){let m=u.length!==0||h||n!==0||s;return s=h,n=u.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){e=d(u,h,0)},this.setState=function(u,h,m){let x=u.clippingPlanes,S=u.clipIntersection,p=u.clipShadows,f=i.get(u);if(!s||x===null||x.length===0||r&&!p)r?d(null):c();else{let A=r?0:n,E=A*4,v=f.clippingState||null;l.value=v,v=d(x,h,E,m);for(let b=0;b!==E;++b)v[b]=e[b];f.clippingState=v,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(u,h,m,x){let S=u!==null?u.length:0,p=null;if(S!==0){if(p=l.value,x!==!0||p===null){let f=m+S*4,A=h.matrixWorldInverse;o.getNormalMatrix(A),(p===null||p.length<f)&&(p=new Float32Array(f));for(let E=0,v=m;E!==S;++E,v+=4)a.copy(u[E]).applyMatrix4(A,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,p}}var ni=4,Yc=[.125,.215,.35,.446,.526,.582],mi=20,Cp=256,Is=new Gi,Jc=new Nt,ll=null,cl=0,hl=0,ul=!1,Rp=new F,Ia=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Rp}=r;ll=this._renderer.getRenderTarget(),cl=this._renderer.getActiveCubeFace(),hl=this._renderer.getActiveMipmapLevel(),ul=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$c(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ll,cl,hl),this._renderer.xr.enabled=ul,t.scissorTest=!1,Yi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===jn||t.mapping===fi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ll=this._renderer.getRenderTarget(),cl=this._renderer.getActiveCubeFace(),hl=this._renderer.getActiveMipmapLevel(),ul=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:be,minFilter:be,generateMipmaps:!1,type:yn,format:Ke,colorSpace:is,depthBuffer:!1},s=Zc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zc(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ip(r)),this._blurMaterial=Lp(r,t,e),this._ggxMaterial=Pp(r,t,e)}return s}_compileMaterial(t){let e=new ee(new He,t);this._renderer.compile(e,Is)}_sceneToCubeUV(t,e,n,s,r){let l=new Ae(90,1,e,n),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,m=u.toneMapping;u.getClearColor(Jc),u.toneMapping=sn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ee(new gn,new qn({name:"PMREM.Background",side:Pe,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,p=S.material,f=!1,A=t.background;A?A.isColor&&(p.color.copy(A),t.background=null,f=!0):(p.color.copy(Jc),f=!0);for(let E=0;E<6;E++){let v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[E],r.y,r.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[E]));let b=this._cubeSize;Yi(s,v*b,E>2?b:0,b,b),u.setRenderTarget(s),f&&u.render(S,l),u.render(t,l)}u.toneMapping=m,u.autoClear=h,t.background=A}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===jn||t.mapping===fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$c());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Yi(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Is)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-d*d),h=0+c*1.25,m=u*h,{_lodMax:x}=this,S=this._sizeLods[n],p=3*S*(n>x-ni?n-x+ni:0),f=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=x-e,Yi(r,p,f,3*S,2*S),s.setRenderTarget(r),s.render(o,Is),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-n,Yi(t,p,f,3*S,2*S),s.setRenderTarget(t),s.render(o,Is)}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&At("blur direction must be either latitudinal or longitudinal!");let d=3,u=this._lodMeshes[s];u.material=c;let h=c.uniforms,m=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*mi-1),S=r/x,p=isFinite(r)?1+Math.floor(d*S):mi;p>mi&&Ct(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mi}`);let f=[],A=0;for(let C=0;C<mi;++C){let _=C/S,w=Math.exp(-_*_/2);f.push(w),C===0?A+=w:C<p&&(A+=2*w)}for(let C=0;C<f.length;C++)f[C]=f[C]/A;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:E}=this;h.dTheta.value=x,h.mipInt.value=E-n;let v=this._sizeLods[s],b=3*v*(s>E-ni?s-E+ni:0),M=4*(this._cubeSize-v);Yi(e,b,M,3*v,2*v),l.setRenderTarget(e),l.render(u,Is)}};function Ip(i){let t=[],e=[],n=[],s=i,r=i-ni+1+Yc.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ni?l=Yc[a-i+ni-1]:a===0&&(l=0),e.push(l);let c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,x=6,S=3,p=2,f=1,A=new Float32Array(S*x*m),E=new Float32Array(p*x*m),v=new Float32Array(f*x*m);for(let M=0;M<m;M++){let C=M%3*2/3-1,_=M>2?0:-1,w=[C,_,0,C+2/3,_,0,C+2/3,_+1,0,C,_,0,C+2/3,_+1,0,C,_+1,0];A.set(w,S*x*M),E.set(h,p*x*M);let R=[M,M,M,M,M,M];v.set(R,f*x*M)}let b=new He;b.setAttribute("position",new Ve(A,S)),b.setAttribute("uv",new Ve(E,p)),b.setAttribute("faceIndex",new Ve(v,f)),n.push(new ee(b,null)),s>ni&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Zc(i,t,e){let n=new Ge(i,t,e);return n.texture.mapping=Ss,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yi(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Pp(i,t,e){return new We({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Cp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Da(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function Lp(i,t,e){let n=new Float32Array(mi),s=new F(0,1,0);return new We({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function $c(){return new We({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function Kc(){return new We({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function Da(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Pa=class extends Ge{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new us(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gn(5,5,5),r=new We({name:"CubemapFromEquirect",uniforms:pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pe,blending:xn});r.uniforms.tEquirect.value=e;let a=new ee(s,r),o=e.minFilter;return e.minFilter===Qn&&(e.minFilter=be),new Or(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Dp(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){let m=h.mapping;if(m===zr||m===Vr)if(t.has(h)){let x=t.get(h).texture;return o(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let S=new Pa(x.height);return S.fromEquirectangularTexture(i,h),t.set(h,S),h.addEventListener("dispose",c),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let m=h.mapping,x=m===zr||m===Vr,S=m===jn||m===fi;if(x||S){let p=e.get(h),f=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Ia(i)),p=x?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{let A=h.image;return x&&A&&A.height>0||S&&A&&l(A)?(n===null&&(n=new Ia(i)),p=x?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",d),p.texture):null}}}return h}function o(h,m){return m===zr?h.mapping=jn:m===Vr&&(h.mapping=fi),h}function l(h){let m=0,x=6;for(let S=0;S<x;S++)h[S]!==void 0&&m++;return m===x}function c(h){let m=h.target;m.removeEventListener("dispose",c);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function d(h){let m=h.target;m.removeEventListener("dispose",d);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Np(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ci("WebGLRenderer: "+n+" extension not supported."),s}}}function Up(i,t,e,n){let s={},r=new WeakMap;function a(u){let h=u.target;h.index!==null&&t.remove(h.index);for(let x in h.attributes)t.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete s[h.id];let m=r.get(h);m&&(t.remove(m),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(u){let h=u.attributes;for(let m in h)t.update(h[m],i.ARRAY_BUFFER)}function c(u){let h=[],m=u.index,x=u.attributes.position,S=0;if(x===void 0)return;if(m!==null){let A=m.array;S=m.version;for(let E=0,v=A.length;E<v;E+=3){let b=A[E+0],M=A[E+1],C=A[E+2];h.push(b,M,M,C,C,b)}}else{let A=x.array;S=x.version;for(let E=0,v=A.length/3-1;E<v;E+=3){let b=E+0,M=E+1,C=E+2;h.push(b,M,M,C,C,b)}}let p=new(x.count>=65535?cs:ls)(h,1);p.version=S;let f=r.get(u);f&&t.remove(f),r.set(u,p)}function d(u){let h=r.get(u);if(h){let m=u.index;m!==null&&h.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function Fp(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,h){i.drawElements(n,h,r,u*a),e.update(h,n,1)}function c(u,h,m){m!==0&&(i.drawElementsInstanced(n,h,r,u*a,m),e.update(h,n,m))}function d(u,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,u,0,m);let S=0;for(let p=0;p<m;p++)S+=h[p];e.update(S,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Op(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:At("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Bp(i,t,e){let n=new WeakMap,s=new ie;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0,h=n.get(o);if(h===void 0||h.count!==u){let w=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],A=o.morphAttributes.color||[],E=0;m===!0&&(E=1),x===!0&&(E=2),S===!0&&(E=3);let v=o.attributes.position.count*E,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let M=new Float32Array(v*b*4*u),C=new as(M,v,b,u);C.type=an,C.needsUpdate=!0;let _=E*4;for(let R=0;R<u;R++){let I=p[R],N=f[R],G=A[R],X=v*b*4*R;for(let O=0;O<I.count;O++){let W=O*_;m===!0&&(s.fromBufferAttribute(I,O),M[X+W+0]=s.x,M[X+W+1]=s.y,M[X+W+2]=s.z,M[X+W+3]=0),x===!0&&(s.fromBufferAttribute(N,O),M[X+W+4]=s.x,M[X+W+5]=s.y,M[X+W+6]=s.z,M[X+W+7]=0),S===!0&&(s.fromBufferAttribute(G,O),M[X+W+8]=s.x,M[X+W+9]=s.y,M[X+W+10]=s.z,M[X+W+11]=G.itemSize===4?s.w:1)}}h={count:u,texture:C,size:new kt(v,b)},n.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let S=0;S<c.length;S++)m+=c[S];let x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function kp(i,t,e,n,s){let r=new WeakMap;function a(c){let d=s.render.frame,u=c.geometry,h=t.get(c,u);if(r.get(h)!==d&&(t.update(h),r.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let m=c.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return h}function o(){r=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:o}}var zp={[Oo]:"LINEAR_TONE_MAPPING",[Bo]:"REINHARD_TONE_MAPPING",[ko]:"CINEON_TONE_MAPPING",[vs]:"ACES_FILMIC_TONE_MAPPING",[Vo]:"AGX_TONE_MAPPING",[Go]:"NEUTRAL_TONE_MAPPING",[zo]:"CUSTOM_TONE_MAPPING"};function Vp(i,t,e,n,s,r){let a=new Ge(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Pn(t,e):void 0}),o=new Ge(t,e,{type:yn,depthBuffer:!1,stencilBuffer:!1}),l=new He;l.setAttribute("position",new ue([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ue([0,2,0,0,2,0],2));let c=new wr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new ee(l,c),u=new Gi(-1,1,1,-1,0,1),h=null,m=null,x=!1,S,p=null,f=[],A=!1;this.setSize=function(E,v){a.setSize(E,v),o.setSize(E,v);for(let b=0;b<f.length;b++){let M=f[b];M.setSize&&M.setSize(E,v)}},this.setEffects=function(E){f=E,A=f.length>0&&f[0].isRenderPass===!0;let v=a.width,b=a.height;for(let M=0;M<f.length;M++){let C=f[M];C.setSize&&C.setSize(v,b)}},this.begin=function(E,v){if(x||E.toneMapping===sn&&f.length===0)return!1;if(p=v,v!==null){let b=v.width,M=v.height;(a.width!==b||a.height!==M)&&this.setSize(b,M)}return A===!1&&E.setRenderTarget(a),S=E.toneMapping,E.toneMapping=sn,!0},this.hasRenderPass=function(){return A},this.end=function(E,v){E.toneMapping=S,x=!0;let b=a,M=o;for(let C=0;C<f.length;C++){let _=f[C];if(_.enabled!==!1&&(_.render(E,M,b,v),_.needsSwap!==!1)){let w=b;b=M,M=w}}if(h!==E.outputColorSpace||m!==E.toneMapping){h=E.outputColorSpace,m=E.toneMapping,c.defines={},Bt.getTransfer(h)===qt&&(c.defines.SRGB_TRANSFER="");let C=zp[m];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=b.texture,E.setRenderTarget(p),E.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var _h=new Ne,pl=new Pn(1,1),xh=new as,yh=new Sr,vh=new us,jc=[],Qc=[],th=new Float32Array(16),eh=new Float32Array(9),nh=new Float32Array(4);function Zi(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=jc[s];if(r===void 0&&(r=new Float32Array(s),jc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function _e(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Na(i,t){let e=Qc[t];e===void 0&&(e=new Int32Array(t),Qc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Gp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Hp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),_e(e,t)}}function Wp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),_e(e,t)}}function Xp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),_e(e,t)}}function qp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;nh.set(n),i.uniformMatrix2fv(this.addr,!1,nh),_e(e,n)}}function Yp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;eh.set(n),i.uniformMatrix3fv(this.addr,!1,eh),_e(e,n)}}function Jp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;th.set(n),i.uniformMatrix4fv(this.addr,!1,th),_e(e,n)}}function Zp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function $p(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),_e(e,t)}}function Kp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),_e(e,t)}}function jp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),_e(e,t)}}function Qp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function tm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),_e(e,t)}}function em(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),_e(e,t)}}function nm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),_e(e,t)}}function im(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(pl.compareFunction=e.isReversedDepthBuffer()?Aa:Ea,r=pl):r=_h,e.setTexture2D(t||r,s)}function sm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||yh,s)}function rm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||vh,s)}function am(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||xh,s)}function om(i){switch(i){case 5126:return Gp;case 35664:return Hp;case 35665:return Wp;case 35666:return Xp;case 35674:return qp;case 35675:return Yp;case 35676:return Jp;case 5124:case 35670:return Zp;case 35667:case 35671:return $p;case 35668:case 35672:return Kp;case 35669:case 35673:return jp;case 5125:return Qp;case 36294:return tm;case 36295:return em;case 36296:return nm;case 35678:case 36198:case 36298:case 36306:case 35682:return im;case 35679:case 36299:case 36307:return sm;case 35680:case 36300:case 36308:case 36293:return rm;case 36289:case 36303:case 36311:case 36292:return am}}function lm(i,t){i.uniform1fv(this.addr,t)}function cm(i,t){let e=Zi(t,this.size,2);i.uniform2fv(this.addr,e)}function hm(i,t){let e=Zi(t,this.size,3);i.uniform3fv(this.addr,e)}function um(i,t){let e=Zi(t,this.size,4);i.uniform4fv(this.addr,e)}function dm(i,t){let e=Zi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function fm(i,t){let e=Zi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function pm(i,t){let e=Zi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function mm(i,t){i.uniform1iv(this.addr,t)}function gm(i,t){i.uniform2iv(this.addr,t)}function _m(i,t){i.uniform3iv(this.addr,t)}function xm(i,t){i.uniform4iv(this.addr,t)}function ym(i,t){i.uniform1uiv(this.addr,t)}function vm(i,t){i.uniform2uiv(this.addr,t)}function Sm(i,t){i.uniform3uiv(this.addr,t)}function Mm(i,t){i.uniform4uiv(this.addr,t)}function bm(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=pl:a=_h;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function wm(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||yh,r[a])}function Tm(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||vh,r[a])}function Em(i,t,e){let n=this.cache,s=t.length,r=Na(e,s);ge(n,r)||(i.uniform1iv(this.addr,r),_e(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||xh,r[a])}function Am(i){switch(i){case 5126:return lm;case 35664:return cm;case 35665:return hm;case 35666:return um;case 35674:return dm;case 35675:return fm;case 35676:return pm;case 5124:case 35670:return mm;case 35667:case 35671:return gm;case 35668:case 35672:return _m;case 35669:case 35673:return xm;case 5125:return ym;case 36294:return vm;case 36295:return Sm;case 36296:return Mm;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Tm;case 36289:case 36303:case 36311:case 36292:return Em}}var ml=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=om(e.type)}},gl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Am(e.type)}},_l=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},dl=/(\w+)(\])?(\[|\.)?/g;function ih(i,t){i.seq.push(t),i.map[t.id]=t}function Cm(i,t,e){let n=i.name,s=n.length;for(dl.lastIndex=0;;){let r=dl.exec(n),a=dl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ih(e,c===void 0?new ml(o,i,t):new gl(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new _l(o),ih(e,u)),e=u}}}var Ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Cm(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function sh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Rm=37297,Im=0;function Pm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var rh=new It;function Lm(i){Bt._getMatrix(rh,Bt.workingColorSpace,i);let t=`mat3( ${rh.elements.map(e=>e.toFixed(4))} )`;switch(Bt.getTransfer(i)){case ss:return[t,"LinearTransferOETF"];case qt:return[t,"sRGBTransferOETF"];default:return Ct("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ah(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Pm(i.getShaderSource(t),o)}else return r}function Dm(i,t){let e=Lm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Nm={[Oo]:"Linear",[Bo]:"Reinhard",[ko]:"Cineon",[vs]:"ACESFilmic",[Vo]:"AgX",[Go]:"Neutral",[zo]:"Custom"};function Um(i,t){let e=Nm[t];return e===void 0?(Ct("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ra=new F;function Fm(){Bt.getLuminanceCoefficients(Ra);let i=Ra.x.toFixed(4),t=Ra.y.toFixed(4),e=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Om(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ls).join(`
`)}function Bm(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function km(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ls(i){return i!==""}function oh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var zm=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(i){return i.replace(zm,Gm)}var Vm=new Map;function Gm(i,t){let e=Ut[t];if(e===void 0){let n=Vm.get(t);if(n!==void 0)e=Ut[n],Ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return xl(e)}var Hm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ch(i){return i.replace(Hm,Wm)}function Wm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function hh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Xm={[di]:"SHADOWMAP_TYPE_PCF",[Wi]:"SHADOWMAP_TYPE_VSM"};function qm(i){return Xm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ym={[jn]:"ENVMAP_TYPE_CUBE",[fi]:"ENVMAP_TYPE_CUBE",[Ss]:"ENVMAP_TYPE_CUBE_UV"};function Jm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Ym[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Zm={[fi]:"ENVMAP_MODE_REFRACTION"};function $m(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Zm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Km={[Fo]:"ENVMAP_BLENDING_MULTIPLY",[Rc]:"ENVMAP_BLENDING_MIX",[Ic]:"ENVMAP_BLENDING_ADD"};function jm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Km[i.combine]||"ENVMAP_BLENDING_NONE"}function Qm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function tg(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=qm(e),c=Jm(e),d=$m(e),u=jm(e),h=Qm(e),m=Om(e),x=Bm(r),S=s.createProgram(),p,f,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ls).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ls).join(`
`),f.length>0&&(f+=`
`)):(p=[hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ls).join(`
`),f=[hh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==sn?"#define TONE_MAPPING":"",e.toneMapping!==sn?Ut.tonemapping_pars_fragment:"",e.toneMapping!==sn?Um("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,Dm("linearToOutputTexel",e.outputColorSpace),Fm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ls).join(`
`)),a=xl(a),a=oh(a,e),a=lh(a,e),o=xl(o),o=oh(o,e),o=lh(o,e),a=ch(a),o=ch(o),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Ko?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ko?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let E=A+p+a,v=A+f+o,b=sh(s,s.VERTEX_SHADER,E),M=sh(s,s.FRAGMENT_SHADER,v);s.attachShader(S,b),s.attachShader(S,M),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function C(I){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(S)||"",G=s.getShaderInfoLog(b)||"",X=s.getShaderInfoLog(M)||"",O=N.trim(),W=G.trim(),H=X.trim(),K=!0,Q=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,b,M);else{let ht=ah(s,b,"vertex"),pt=ah(s,M,"fragment");At("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+ht+`
`+pt)}else O!==""?Ct("WebGLProgram: Program Info Log:",O):(W===""||H==="")&&(Q=!1);Q&&(I.diagnostics={runnable:K,programLog:O,vertexShader:{log:W,prefix:p},fragmentShader:{log:H,prefix:f}})}s.deleteShader(b),s.deleteShader(M),_=new Ji(s,S),w=km(s,S)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(S,Rm)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Im++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=b,this.fragmentShader=M,this}var eg=0,yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new vl(t),e.set(t,n)),n}},vl=class{constructor(t){this.id=eg++,this.code=t,this.usedTimes=0}};function ng(i){return i===ei||i===As||i===Cs}function ig(i,t,e,n,s,r){let a=new Bi,o=new yl,l=new Set,c=[],d=new Map,u=n.logarithmicDepthBuffer,h=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return l.add(_),_===0?"uv":`uv${_}`}function S(_,w,R,I,N,G){let X=I.fog,O=N.geometry,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,K=t.get(_.envMap||W,H),Q=K&&K.mapping===Ss?K.image.height:null,ht=m[_.type];_.precision!==null&&(h=n.getMaxPrecision(_.precision),h!==_.precision&&Ct("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));let pt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,_t=pt!==void 0?pt.length:0,Ht=0;O.morphAttributes.position!==void 0&&(Ht=1),O.morphAttributes.normal!==void 0&&(Ht=2),O.morphAttributes.color!==void 0&&(Ht=3);let se,Wt,$,it;if(ht){let xt=Sn[ht];se=xt.vertexShader,Wt=xt.fragmentShader}else{se=_.vertexShader,Wt=_.fragmentShader;let xt=o.getVertexShaderStage(_),ae=o.getFragmentShaderStage(_);o.update(_,xt,ae),$=xt.id,it=ae.id}let tt=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Pt=N.isInstancedMesh===!0,Tt=N.isBatchedMesh===!0,le=!!_.map,Ot=!!_.matcap,Zt=!!K,Xt=!!_.aoMap,Vt=!!_.lightMap,de=!!_.bumpMap&&_.wireframe===!1,me=!!_.normalMap,xe=!!_.displacementMap,Me=!!_.emissiveMap,re=!!_.metalnessMap,fe=!!_.roughnessMap,L=_.anisotropy>0,Le=_.clearcoat>0,Yt=_.dispersion>0,T=_.iridescence>0,g=_.sheen>0,U=_.transmission>0,z=L&&!!_.anisotropyMap,q=Le&&!!_.clearcoatMap,et=Le&&!!_.clearcoatNormalMap,st=Le&&!!_.clearcoatRoughnessMap,Y=T&&!!_.iridescenceMap,Z=T&&!!_.iridescenceThicknessMap,rt=g&&!!_.sheenColorMap,St=g&&!!_.sheenRoughnessMap,lt=!!_.specularMap,at=!!_.specularColorMap,wt=!!_.specularIntensityMap,Et=U&&!!_.transmissionMap,Lt=U&&!!_.thicknessMap,P=!!_.gradientMap,nt=!!_.alphaMap,J=_.alphaTest>0,ot=!!_.alphaHash,ft=!!_.extensions,j=sn;_.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(j=i.toneMapping);let vt={shaderID:ht,shaderType:_.type,shaderName:_.name,vertexShader:se,fragmentShader:Wt,defines:_.defines,customVertexShaderID:$,customFragmentShaderID:it,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:Tt,batchingColor:Tt&&N._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&N.instanceColor!==null,instancingMorph:Pt&&N.morphTexture!==null,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Bt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:le,matcap:Ot,envMap:Zt,envMapMode:Zt&&K.mapping,envMapCubeUVHeight:Q,aoMap:Xt,lightMap:Vt,bumpMap:de,normalMap:me,displacementMap:xe,emissiveMap:Me,normalMapObjectSpace:me&&_.normalMapType===Dc,normalMapTangentSpace:me&&_.normalMapType===Ta,packedNormalMap:me&&_.normalMapType===Ta&&ng(_.normalMap.format),metalnessMap:re,roughnessMap:fe,anisotropy:L,anisotropyMap:z,clearcoat:Le,clearcoatMap:q,clearcoatNormalMap:et,clearcoatRoughnessMap:st,dispersion:Yt,iridescence:T,iridescenceMap:Y,iridescenceThicknessMap:Z,sheen:g,sheenColorMap:rt,sheenRoughnessMap:St,specularMap:lt,specularColorMap:at,specularIntensityMap:wt,transmission:U,transmissionMap:Et,thicknessMap:Lt,gradientMap:P,opaque:_.transparent===!1&&_.blending===hi&&_.alphaToCoverage===!1,alphaMap:nt,alphaTest:J,alphaHash:ot,combine:_.combine,mapUv:le&&x(_.map.channel),aoMapUv:Xt&&x(_.aoMap.channel),lightMapUv:Vt&&x(_.lightMap.channel),bumpMapUv:de&&x(_.bumpMap.channel),normalMapUv:me&&x(_.normalMap.channel),displacementMapUv:xe&&x(_.displacementMap.channel),emissiveMapUv:Me&&x(_.emissiveMap.channel),metalnessMapUv:re&&x(_.metalnessMap.channel),roughnessMapUv:fe&&x(_.roughnessMap.channel),anisotropyMapUv:z&&x(_.anisotropyMap.channel),clearcoatMapUv:q&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:et&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:rt&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:St&&x(_.sheenRoughnessMap.channel),specularMapUv:lt&&x(_.specularMap.channel),specularColorMapUv:at&&x(_.specularColorMap.channel),specularIntensityMapUv:wt&&x(_.specularIntensityMap.channel),transmissionMapUv:Et&&x(_.transmissionMap.channel),thicknessMapUv:Lt&&x(_.thicknessMap.channel),alphaMapUv:nt&&x(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(me||L),vertexNormals:!!O.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(le||nt),fog:!!X,useFog:_.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||O.attributes.normal===void 0&&me===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Rt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Ht,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:j,decodeVideoTexture:le&&_.map.isVideoTexture===!0&&Bt.getTransfer(_.map.colorSpace)===qt,decodeVideoTextureEmissive:Me&&_.emissiveMap.isVideoTexture===!0&&Bt.getTransfer(_.emissiveMap.colorSpace)===qt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===_n,flipSided:_.side===Pe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ft&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&_.extensions.multiDraw===!0||Tt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return vt.vertexUv1s=l.has(1),vt.vertexUv2s=l.has(2),vt.vertexUv3s=l.has(3),l.clear(),vt}function p(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)w.push(R),w.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(f(w,_),A(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function f(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function A(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function E(_){let w=m[_.type],R;if(w){let I=Sn[w];R=Xc.clone(I.uniforms)}else R=_.uniforms;return R}function v(_,w){let R=d.get(w);return R!==void 0?++R.usedTimes:(R=new tg(i,w,_,s),c.push(R),d.set(w,R)),R}function b(_){if(--_.usedTimes===0){let w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),d.delete(_.cacheKey),_.destroy()}}function M(_){o.remove(_)}function C(){o.dispose()}return{getParameters:S,getProgramCacheKey:p,getUniforms:E,acquireProgram:v,releaseProgram:b,releaseShaderCache:M,programs:c,dispose:C}}function sg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function rg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function uh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,x,S,p,f){let A=i[t];return A===void 0?(A={id:h.id,object:h,geometry:m,material:x,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:p,group:f},i[t]=A):(A.id=h.id,A.object=h,A.geometry=m,A.material=x,A.materialVariant=a(h),A.groupOrder=S,A.renderOrder=h.renderOrder,A.z=p,A.group=f),t++,A}function l(h,m,x,S,p,f){let A=o(h,m,x,S,p,f);x.transmission>0?n.push(A):x.transparent===!0?s.push(A):e.push(A)}function c(h,m,x,S,p,f){let A=o(h,m,x,S,p,f);x.transmission>0?n.unshift(A):x.transparent===!0?s.unshift(A):e.unshift(A)}function d(h,m,x){e.length>1&&e.sort(h||rg),n.length>1&&n.sort(m||uh),s.length>1&&s.sort(m||uh),x&&(e.reverse(),n.reverse(),s.reverse())}function u(){for(let h=t,m=i.length;h<m;h++){let x=i[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:d}}function ag(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new dh,i.set(n,[a])):s>=r.length?(a=new dh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function og(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Nt};break;case"SpotLight":e={position:new F,direction:new F,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function lg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var cg=0;function hg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function ug(i){let t=new og,e=lg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);let s=new F,r=new ne,a=new ne;function o(c){let d=0,u=0,h=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let m=0,x=0,S=0,p=0,f=0,A=0,E=0,v=0,b=0,M=0,C=0;c.sort(hg);for(let w=0,R=c.length;w<R;w++){let I=c[w],N=I.color,G=I.intensity,X=I.distance,O=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ei?O=I.shadow.map.texture:O=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=N.r*G,u+=N.g*G,h+=N.b*G;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],G);C++}else if(I.isDirectionalLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let H=I.shadow,K=e.get(I);K.shadowIntensity=H.intensity,K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=O,n.directionalShadowMatrix[m]=I.shadow.matrix,A++}n.directional[m]=W,m++}else if(I.isSpotLight){let W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(N).multiplyScalar(G),W.distance=X,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[S]=W;let H=I.shadow;if(I.map&&(n.spotLightMap[b]=I.map,b++,H.updateMatrices(I),I.castShadow&&M++),n.spotLightMatrix[S]=H.matrix,I.castShadow){let K=e.get(I);K.shadowIntensity=H.intensity,K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,n.spotShadow[S]=K,n.spotShadowMap[S]=O,v++}S++}else if(I.isRectAreaLight){let W=t.get(I);W.color.copy(N).multiplyScalar(G),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[p]=W,p++}else if(I.isPointLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){let H=I.shadow,K=e.get(I);K.shadowIntensity=H.intensity,K.shadowBias=H.bias,K.shadowNormalBias=H.normalBias,K.shadowRadius=H.radius,K.shadowMapSize=H.mapSize,K.shadowCameraNear=H.camera.near,K.shadowCameraFar=H.camera.far,n.pointShadow[x]=K,n.pointShadowMap[x]=O,n.pointShadowMatrix[x]=I.shadow.matrix,E++}n.point[x]=W,x++}else if(I.isHemisphereLight){let W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(G),W.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[f]=W,f++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;let _=n.hash;(_.directionalLength!==m||_.pointLength!==x||_.spotLength!==S||_.rectAreaLength!==p||_.hemiLength!==f||_.numDirectionalShadows!==A||_.numPointShadows!==E||_.numSpotShadows!==v||_.numSpotMaps!==b||_.numLightProbes!==C)&&(n.directional.length=m,n.spot.length=S,n.rectArea.length=p,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+b-M,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,_.directionalLength=m,_.pointLength=x,_.spotLength=S,_.rectAreaLength=p,_.hemiLength=f,_.numDirectionalShadows=A,_.numPointShadows=E,_.numSpotShadows=v,_.numSpotMaps=b,_.numLightProbes=C,n.version=cg++)}function l(c,d){let u=0,h=0,m=0,x=0,S=0,p=d.matrixWorldInverse;for(let f=0,A=c.length;f<A;f++){let E=c[f];if(E.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),u++}else if(E.isSpotLight){let v=n.spot[m];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),m++}else if(E.isRectAreaLight){let v=n.rectArea[x];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),a.identity(),r.copy(E.matrixWorld),r.premultiply(p),a.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),x++}else if(E.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),h++}else if(E.isHemisphereLight){let v=n.hemi[S];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(p),S++}}}return{setup:o,setupView:l,state:n}}function fh(i){let t=new ug(i),e=[],n=[],s=[];function r(h){u.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function d(h){t.setupView(e,h)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function dg(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new fh(i),t.set(s,[o])):r>=a.length?(o=new fh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var fg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mg=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],gg=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],ph=new ne,Ps=new F,fl=new F;function _g(i,t,e){let n=new Vi,s=new kt,r=new kt,a=new ie,o=new Tr,l=new Er,c={},d=e.maxTextureSize,u={[Rn]:Pe,[Pe]:Rn,[_n]:_n},h=new We({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:fg,fragmentShader:pg}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let x=new He;x.setAttribute("position",new Ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new ee(x,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=di;let f=this.type;this.render=function(M,C,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;this.type===hc&&(Ct("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=di);let w=i.getRenderTarget(),R=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),N=i.state;N.setBlending(xn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let G=f!==this.type;G&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(O=>O.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,O=M.length;X<O;X++){let W=M[X],H=W.shadow;if(H===void 0){Ct("WebGLShadowMap:",W,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let K=H.getFrameExtents();s.multiply(K),r.copy(H.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/K.x),s.x=r.x*K.x,H.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/K.y),s.y=r.y*K.y,H.mapSize.y=r.y));let Q=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=Q,H.map===null||G===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Wi){if(W.isPointLight){Ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Ge(s.x,s.y,{format:ei,type:yn,minFilter:be,magFilter:be,generateMipmaps:!1}),H.map.texture.name=W.name+".shadowMap",H.map.depthTexture=new Pn(s.x,s.y,an),H.map.depthTexture.name=W.name+".shadowMapDepth",H.map.depthTexture.format=fn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ve,H.map.depthTexture.magFilter=ve}else W.isPointLight?(H.map=new Pa(s.x),H.map.depthTexture=new br(s.x,rn)):(H.map=new Ge(s.x,s.y),H.map.depthTexture=new Pn(s.x,s.y,rn)),H.map.depthTexture.name=W.name+".shadowMap",H.map.depthTexture.format=fn,this.type===di?(H.map.depthTexture.compareFunction=Q?Aa:Ea,H.map.depthTexture.minFilter=be,H.map.depthTexture.magFilter=be):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=ve,H.map.depthTexture.magFilter=ve);H.camera.updateProjectionMatrix()}let ht=H.map.isWebGLCubeRenderTarget?6:1;for(let pt=0;pt<ht;pt++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,pt),i.clear();else{pt===0&&(i.setRenderTarget(H.map),i.clear());let _t=H.getViewport(pt);a.set(r.x*_t.x,r.y*_t.y,r.x*_t.z,r.y*_t.w),N.viewport(a)}if(W.isPointLight){let _t=H.camera,Ht=H.matrix,se=W.distance||_t.far;se!==_t.far&&(_t.far=se,_t.updateProjectionMatrix()),Ps.setFromMatrixPosition(W.matrixWorld),_t.position.copy(Ps),fl.copy(_t.position),fl.add(mg[pt]),_t.up.copy(gg[pt]),_t.lookAt(fl),_t.updateMatrixWorld(),Ht.makeTranslation(-Ps.x,-Ps.y,-Ps.z),ph.multiplyMatrices(_t.projectionMatrix,_t.matrixWorldInverse),H._frustum.setFromProjectionMatrix(ph,_t.coordinateSystem,_t.reversedDepth)}else H.updateMatrices(W);n=H.getFrustum(),v(C,_,H.camera,W,this.type)}H.isPointLightShadow!==!0&&this.type===Wi&&A(H,_),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(w,R,I)};function A(M,C){let _=t.update(S);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,m.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ge(s.x,s.y,{format:ei,type:yn})),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(C,null,_,h,S,null),m.uniforms.shadow_pass.value=M.mapPass.texture,m.uniforms.resolution.value=M.mapSize,m.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(C,null,_,m,S,null)}function E(M,C,_,w){let R=null,I=_.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(I!==void 0)R=I;else if(R=_.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let N=R.uuid,G=C.uuid,X=c[N];X===void 0&&(X={},c[N]=X);let O=X[G];O===void 0&&(O=R.clone(),X[G]=O,C.addEventListener("dispose",b)),R=O}if(R.visible=C.visible,R.wireframe=C.wireframe,w===Wi?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:u[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let N=i.properties.get(R);N.light=_}return R}function v(M,C,_,w,R){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&R===Wi)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,M.matrixWorld);let G=t.update(M),X=M.material;if(Array.isArray(X)){let O=G.groups;for(let W=0,H=O.length;W<H;W++){let K=O[W],Q=X[K.materialIndex];if(Q&&Q.visible){let ht=E(M,Q,w,R);M.onBeforeShadow(i,M,C,_,G,ht,K),i.renderBufferDirect(_,null,G,ht,M,K),M.onAfterShadow(i,M,C,_,G,ht,K)}}}else if(X.visible){let O=E(M,X,w,R);M.onBeforeShadow(i,M,C,_,G,O,null),i.renderBufferDirect(_,null,G,O,M,null),M.onAfterShadow(i,M,C,_,G,O,null)}}let N=M.children;for(let G=0,X=N.length;G<X;G++)v(N[G],C,_,w,R)}function b(M){M.target.removeEventListener("dispose",b);for(let _ in c){let w=c[_],R=M.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function xg(i,t){function e(){let P=!1,nt=new ie,J=null,ot=new ie(0,0,0,0);return{setMask:function(ft){J!==ft&&!P&&(i.colorMask(ft,ft,ft,ft),J=ft)},setLocked:function(ft){P=ft},setClear:function(ft,j,vt,xt,ae){ae===!0&&(ft*=xt,j*=xt,vt*=xt),nt.set(ft,j,vt,xt),ot.equals(nt)===!1&&(i.clearColor(ft,j,vt,xt),ot.copy(nt))},reset:function(){P=!1,J=null,ot.set(-1,0,0,0)}}}function n(){let P=!1,nt=!1,J=null,ot=null,ft=null;return{setReversed:function(j){if(nt!==j){let vt=t.get("EXT_clip_control");j?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),nt=j;let xt=ft;ft=null,this.setClear(xt)}},getReversed:function(){return nt},setTest:function(j){j?tt(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(j){J!==j&&!P&&(i.depthMask(j),J=j)},setFunc:function(j){if(nt&&(j=Hc[j]),ot!==j){switch(j){case lr:i.depthFunc(i.NEVER);break;case cr:i.depthFunc(i.ALWAYS);break;case hr:i.depthFunc(i.LESS);break;case ui:i.depthFunc(i.LEQUAL);break;case ur:i.depthFunc(i.EQUAL);break;case dr:i.depthFunc(i.GEQUAL);break;case fr:i.depthFunc(i.GREATER);break;case pr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ot=j}},setLocked:function(j){P=j},setClear:function(j){ft!==j&&(ft=j,nt&&(j=1-j),i.clearDepth(j))},reset:function(){P=!1,J=null,ot=null,ft=null,nt=!1}}}function s(){let P=!1,nt=null,J=null,ot=null,ft=null,j=null,vt=null,xt=null,ae=null;return{setTest:function(jt){P||(jt?tt(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(jt){nt!==jt&&!P&&(i.stencilMask(jt),nt=jt)},setFunc:function(jt,on,ln){(J!==jt||ot!==on||ft!==ln)&&(i.stencilFunc(jt,on,ln),J=jt,ot=on,ft=ln)},setOp:function(jt,on,ln){(j!==jt||vt!==on||xt!==ln)&&(i.stencilOp(jt,on,ln),j=jt,vt=on,xt=ln)},setLocked:function(jt){P=jt},setClear:function(jt){ae!==jt&&(i.clearStencil(jt),ae=jt)},reset:function(){P=!1,nt=null,J=null,ot=null,ft=null,j=null,vt=null,xt=null,ae=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,d={},u={},h={},m=new WeakMap,x=[],S=null,p=!1,f=null,A=null,E=null,v=null,b=null,M=null,C=null,_=new Nt(0,0,0),w=0,R=!1,I=null,N=null,G=null,X=null,O=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,K=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=K>=1):Q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=K>=2);let ht=null,pt={},_t=i.getParameter(i.SCISSOR_BOX),Ht=i.getParameter(i.VIEWPORT),se=new ie().fromArray(_t),Wt=new ie().fromArray(Ht);function $(P,nt,J,ot){let ft=new Uint8Array(4),j=i.createTexture();i.bindTexture(P,j),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let vt=0;vt<J;vt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,ot,0,i.RGBA,i.UNSIGNED_BYTE,ft):i.texImage2D(nt+vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ft);return j}let it={};it[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),it[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),it[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(i.DEPTH_TEST),a.setFunc(ui),de(!1),me(Lo),tt(i.CULL_FACE),Xt(xn);function tt(P){d[P]!==!0&&(i.enable(P),d[P]=!0)}function Rt(P){d[P]!==!1&&(i.disable(P),d[P]=!1)}function Pt(P,nt){return h[P]!==nt?(i.bindFramebuffer(P,nt),h[P]=nt,P===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=nt),P===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function Tt(P,nt){let J=x,ot=!1;if(P){J=m.get(nt),J===void 0&&(J=[],m.set(nt,J));let ft=P.textures;if(J.length!==ft.length||J[0]!==i.COLOR_ATTACHMENT0){for(let j=0,vt=ft.length;j<vt;j++)J[j]=i.COLOR_ATTACHMENT0+j;J.length=ft.length,ot=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ot=!0);ot&&i.drawBuffers(J)}function le(P){return S!==P?(i.useProgram(P),S=P,!0):!1}let Ot={[Hn]:i.FUNC_ADD,[dc]:i.FUNC_SUBTRACT,[fc]:i.FUNC_REVERSE_SUBTRACT};Ot[pc]=i.MIN,Ot[mc]=i.MAX;let Zt={[gc]:i.ZERO,[_c]:i.ONE,[xc]:i.SRC_COLOR,[ar]:i.SRC_ALPHA,[wc]:i.SRC_ALPHA_SATURATE,[Mc]:i.DST_COLOR,[vc]:i.DST_ALPHA,[yc]:i.ONE_MINUS_SRC_COLOR,[or]:i.ONE_MINUS_SRC_ALPHA,[bc]:i.ONE_MINUS_DST_COLOR,[Sc]:i.ONE_MINUS_DST_ALPHA,[Tc]:i.CONSTANT_COLOR,[Ec]:i.ONE_MINUS_CONSTANT_COLOR,[Ac]:i.CONSTANT_ALPHA,[Cc]:i.ONE_MINUS_CONSTANT_ALPHA};function Xt(P,nt,J,ot,ft,j,vt,xt,ae,jt){if(P===xn){p===!0&&(Rt(i.BLEND),p=!1);return}if(p===!1&&(tt(i.BLEND),p=!0),P!==uc){if(P!==f||jt!==R){if((A!==Hn||b!==Hn)&&(i.blendEquation(i.FUNC_ADD),A=Hn,b=Hn),jt)switch(P){case hi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Do:i.blendFunc(i.ONE,i.ONE);break;case No:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:At("WebGLState: Invalid blending: ",P);break}else switch(P){case hi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Do:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case No:At("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uo:At("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:At("WebGLState: Invalid blending: ",P);break}E=null,v=null,M=null,C=null,_.set(0,0,0),w=0,f=P,R=jt}return}ft=ft||nt,j=j||J,vt=vt||ot,(nt!==A||ft!==b)&&(i.blendEquationSeparate(Ot[nt],Ot[ft]),A=nt,b=ft),(J!==E||ot!==v||j!==M||vt!==C)&&(i.blendFuncSeparate(Zt[J],Zt[ot],Zt[j],Zt[vt]),E=J,v=ot,M=j,C=vt),(xt.equals(_)===!1||ae!==w)&&(i.blendColor(xt.r,xt.g,xt.b,ae),_.copy(xt),w=ae),f=P,R=!1}function Vt(P,nt){P.side===_n?Rt(i.CULL_FACE):tt(i.CULL_FACE);let J=P.side===Pe;nt&&(J=!J),de(J),P.blending===hi&&P.transparent===!1?Xt(xn):Xt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);let ot=P.stencilWrite;o.setTest(ot),ot&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Me(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function de(P){I!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),I=P)}function me(P){P!==lc?(tt(i.CULL_FACE),P!==N&&(P===Lo?i.cullFace(i.BACK):P===cc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),N=P}function xe(P){P!==G&&(H&&i.lineWidth(P),G=P)}function Me(P,nt,J){P?(tt(i.POLYGON_OFFSET_FILL),(X!==nt||O!==J)&&(X=nt,O=J,a.getReversed()&&(nt=-nt),i.polygonOffset(nt,J))):Rt(i.POLYGON_OFFSET_FILL)}function re(P){P?tt(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function fe(P){P===void 0&&(P=i.TEXTURE0+W-1),ht!==P&&(i.activeTexture(P),ht=P)}function L(P,nt,J){J===void 0&&(ht===null?J=i.TEXTURE0+W-1:J=ht);let ot=pt[J];ot===void 0&&(ot={type:void 0,texture:void 0},pt[J]=ot),(ot.type!==P||ot.texture!==nt)&&(ht!==J&&(i.activeTexture(J),ht=J),i.bindTexture(P,nt||it[P]),ot.type=P,ot.texture=nt)}function Le(){let P=pt[ht];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Yt(){try{i.compressedTexImage2D(...arguments)}catch(P){At("WebGLState:",P)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(P){At("WebGLState:",P)}}function g(){try{i.texSubImage2D(...arguments)}catch(P){At("WebGLState:",P)}}function U(){try{i.texSubImage3D(...arguments)}catch(P){At("WebGLState:",P)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(P){At("WebGLState:",P)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(P){At("WebGLState:",P)}}function et(){try{i.texStorage2D(...arguments)}catch(P){At("WebGLState:",P)}}function st(){try{i.texStorage3D(...arguments)}catch(P){At("WebGLState:",P)}}function Y(){try{i.texImage2D(...arguments)}catch(P){At("WebGLState:",P)}}function Z(){try{i.texImage3D(...arguments)}catch(P){At("WebGLState:",P)}}function rt(P){return u[P]!==void 0?u[P]:i.getParameter(P)}function St(P,nt){u[P]!==nt&&(i.pixelStorei(P,nt),u[P]=nt)}function lt(P){se.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),se.copy(P))}function at(P){Wt.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Wt.copy(P))}function wt(P,nt){let J=c.get(nt);J===void 0&&(J=new WeakMap,c.set(nt,J));let ot=J.get(P);ot===void 0&&(ot=i.getUniformBlockIndex(nt,P.name),J.set(P,ot))}function Et(P,nt){let ot=c.get(nt).get(P);l.get(nt)!==ot&&(i.uniformBlockBinding(nt,ot,P.__bindingPointIndex),l.set(nt,ot))}function Lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},u={},ht=null,pt={},h={},m=new WeakMap,x=[],S=null,p=!1,f=null,A=null,E=null,v=null,b=null,M=null,C=null,_=new Nt(0,0,0),w=0,R=!1,I=null,N=null,G=null,X=null,O=null,se.set(0,0,i.canvas.width,i.canvas.height),Wt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:Rt,bindFramebuffer:Pt,drawBuffers:Tt,useProgram:le,setBlending:Xt,setMaterial:Vt,setFlipSided:de,setCullFace:me,setLineWidth:xe,setPolygonOffset:Me,setScissorTest:re,activeTexture:fe,bindTexture:L,unbindTexture:Le,compressedTexImage2D:Yt,compressedTexImage3D:T,texImage2D:Y,texImage3D:Z,pixelStorei:St,getParameter:rt,updateUBOMapping:wt,uniformBlockBinding:Et,texStorage2D:et,texStorage3D:st,texSubImage2D:g,texSubImage3D:U,compressedTexSubImage2D:z,compressedTexSubImage3D:q,scissor:lt,viewport:at,reset:Lt}}function yg(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new kt,d=new WeakMap,u=new Set,h,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(T,g){return x?new OffscreenCanvas(T,g):rs("canvas")}function p(T,g,U){let z=1,q=Yt(T);if((q.width>U||q.height>U)&&(z=U/Math.max(q.width,q.height)),z<1)if(typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&T instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&T instanceof ImageBitmap||typeof VideoFrame!="undefined"&&T instanceof VideoFrame){let et=Math.floor(z*q.width),st=Math.floor(z*q.height);h===void 0&&(h=S(et,st));let Y=g?S(et,st):h;return Y.width=et,Y.height=st,Y.getContext("2d").drawImage(T,0,0,et,st),Ct("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+et+"x"+st+")."),Y}else return"data"in T&&Ct("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),T;return T}function f(T){return T.generateMipmaps}function A(T){i.generateMipmap(T)}function E(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(T,g,U,z,q,et=!1){if(T!==null){if(i[T]!==void 0)return i[T];Ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let st;z&&(st=t.get("EXT_texture_norm16"),st||Ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=g;if(g===i.RED&&(U===i.FLOAT&&(Y=i.R32F),U===i.HALF_FLOAT&&(Y=i.R16F),U===i.UNSIGNED_BYTE&&(Y=i.R8),U===i.UNSIGNED_SHORT&&st&&(Y=st.R16_EXT),U===i.SHORT&&st&&(Y=st.R16_SNORM_EXT)),g===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(Y=i.R8UI),U===i.UNSIGNED_SHORT&&(Y=i.R16UI),U===i.UNSIGNED_INT&&(Y=i.R32UI),U===i.BYTE&&(Y=i.R8I),U===i.SHORT&&(Y=i.R16I),U===i.INT&&(Y=i.R32I)),g===i.RG&&(U===i.FLOAT&&(Y=i.RG32F),U===i.HALF_FLOAT&&(Y=i.RG16F),U===i.UNSIGNED_BYTE&&(Y=i.RG8),U===i.UNSIGNED_SHORT&&st&&(Y=st.RG16_EXT),U===i.SHORT&&st&&(Y=st.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(Y=i.RG8UI),U===i.UNSIGNED_SHORT&&(Y=i.RG16UI),U===i.UNSIGNED_INT&&(Y=i.RG32UI),U===i.BYTE&&(Y=i.RG8I),U===i.SHORT&&(Y=i.RG16I),U===i.INT&&(Y=i.RG32I)),g===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),U===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),U===i.UNSIGNED_INT&&(Y=i.RGB32UI),U===i.BYTE&&(Y=i.RGB8I),U===i.SHORT&&(Y=i.RGB16I),U===i.INT&&(Y=i.RGB32I)),g===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),U===i.UNSIGNED_INT&&(Y=i.RGBA32UI),U===i.BYTE&&(Y=i.RGBA8I),U===i.SHORT&&(Y=i.RGBA16I),U===i.INT&&(Y=i.RGBA32I)),g===i.RGB&&(U===i.UNSIGNED_SHORT&&st&&(Y=st.RGB16_EXT),U===i.SHORT&&st&&(Y=st.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),g===i.RGBA){let Z=et?ss:Bt.getTransfer(q);U===i.FLOAT&&(Y=i.RGBA32F),U===i.HALF_FLOAT&&(Y=i.RGBA16F),U===i.UNSIGNED_BYTE&&(Y=Z===qt?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&st&&(Y=st.RGBA16_EXT),U===i.SHORT&&st&&(Y=st.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function b(T,g){let U;return T?g===null||g===rn||g===qi?U=i.DEPTH24_STENCIL8:g===an?U=i.DEPTH32F_STENCIL8:g===Xi&&(U=i.DEPTH24_STENCIL8,Ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===rn||g===qi?U=i.DEPTH_COMPONENT24:g===an?U=i.DEPTH_COMPONENT32F:g===Xi&&(U=i.DEPTH_COMPONENT16),U}function M(T,g){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==ve&&T.minFilter!==be?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function C(T){let g=T.target;g.removeEventListener("dispose",C),w(g),g.isVideoTexture&&d.delete(g),g.isHTMLTexture&&u.delete(g)}function _(T){let g=T.target;g.removeEventListener("dispose",_),I(g)}function w(T){let g=n.get(T);if(g.__webglInit===void 0)return;let U=T.source,z=m.get(U);if(z){let q=z[g.__cacheKey];q.usedTimes--,q.usedTimes===0&&R(T),Object.keys(z).length===0&&m.delete(U)}n.remove(T)}function R(T){let g=n.get(T);i.deleteTexture(g.__webglTexture);let U=T.source,z=m.get(U);delete z[g.__cacheKey],a.memory.textures--}function I(T){let g=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(g.__webglFramebuffer[z]))for(let q=0;q<g.__webglFramebuffer[z].length;q++)i.deleteFramebuffer(g.__webglFramebuffer[z][q]);else i.deleteFramebuffer(g.__webglFramebuffer[z]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[z])}else{if(Array.isArray(g.__webglFramebuffer))for(let z=0;z<g.__webglFramebuffer.length;z++)i.deleteFramebuffer(g.__webglFramebuffer[z]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let z=0;z<g.__webglColorRenderbuffer.length;z++)g.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[z]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let U=T.textures;for(let z=0,q=U.length;z<q;z++){let et=n.get(U[z]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),a.memory.textures--),n.remove(U[z])}n.remove(T)}let N=0;function G(){N=0}function X(){return N}function O(T){N=T}function W(){let T=N;return T>=s.maxTextures&&Ct("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),N+=1,T}function H(T){let g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function K(T,g){let U=n.get(T);if(T.isVideoTexture&&L(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&U.__version!==T.version){let z=T.image;if(z===null)Ct("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Ct("WebGLRenderer: Texture marked for update but image is incomplete");else{Rt(U,T,g);return}}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+g)}function Q(T,g){let U=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){Rt(U,T,g);return}else T.isExternalTexture&&(U.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+g)}function ht(T,g){let U=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&U.__version!==T.version){Rt(U,T,g);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+g)}function pt(T,g){let U=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&U.__version!==T.version){Pt(U,T,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+g)}let _t={[mr]:i.REPEAT,[dn]:i.CLAMP_TO_EDGE,[gr]:i.MIRRORED_REPEAT},Ht={[ve]:i.NEAREST,[Pc]:i.NEAREST_MIPMAP_NEAREST,[Ms]:i.NEAREST_MIPMAP_LINEAR,[be]:i.LINEAR,[Gr]:i.LINEAR_MIPMAP_NEAREST,[Qn]:i.LINEAR_MIPMAP_LINEAR},se={[Nc]:i.NEVER,[kc]:i.ALWAYS,[Uc]:i.LESS,[Ea]:i.LEQUAL,[Fc]:i.EQUAL,[Aa]:i.GEQUAL,[Oc]:i.GREATER,[Bc]:i.NOTEQUAL};function Wt(T,g){if(g.type===an&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===be||g.magFilter===Gr||g.magFilter===Ms||g.magFilter===Qn||g.minFilter===be||g.minFilter===Gr||g.minFilter===Ms||g.minFilter===Qn)&&Ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,_t[g.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,_t[g.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,_t[g.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Ht[g.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Ht[g.minFilter]),g.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,se[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===ve||g.minFilter!==Ms&&g.minFilter!==Qn||g.type===an&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function $(T,g){let U=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",C));let z=g.source,q=m.get(z);q===void 0&&(q={},m.set(z,q));let et=H(g);if(et!==T.__cacheKey){q[et]===void 0&&(q[et]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),q[et].usedTimes++;let st=q[T.__cacheKey];st!==void 0&&(q[T.__cacheKey].usedTimes--,st.usedTimes===0&&R(g)),T.__cacheKey=et,T.__webglTexture=q[et].texture}return U}function it(T,g,U){return Math.floor(Math.floor(T/U)/g)}function tt(T,g,U,z){let et=T.updateRanges;if(et.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,U,z,g.data);else{et.sort((St,lt)=>St.start-lt.start);let st=0;for(let St=1;St<et.length;St++){let lt=et[st],at=et[St],wt=lt.start+lt.count,Et=it(at.start,g.width,4),Lt=it(lt.start,g.width,4);at.start<=wt+1&&Et===Lt&&it(at.start+at.count-1,g.width,4)===Et?lt.count=Math.max(lt.count,at.start+at.count-lt.start):(++st,et[st]=at)}et.length=st+1;let Y=e.getParameter(i.UNPACK_ROW_LENGTH),Z=e.getParameter(i.UNPACK_SKIP_PIXELS),rt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let St=0,lt=et.length;St<lt;St++){let at=et[St],wt=Math.floor(at.start/4),Et=Math.ceil(at.count/4),Lt=wt%g.width,P=Math.floor(wt/g.width),nt=Et,J=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Lt),e.pixelStorei(i.UNPACK_SKIP_ROWS,P),e.texSubImage2D(i.TEXTURE_2D,0,Lt,P,nt,J,U,z,g.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Y),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(i.UNPACK_SKIP_ROWS,rt)}}function Rt(T,g,U){let z=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(z=i.TEXTURE_3D);let q=$(T,g),et=g.source;e.bindTexture(z,T.__webglTexture,i.TEXTURE0+U);let st=n.get(et);if(et.version!==st.__version||q===!0){if(e.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let J=Bt.getPrimaries(Bt.workingColorSpace),ot=g.colorSpace===Ln?null:Bt.getPrimaries(g.colorSpace),ft=g.colorSpace===Ln||J===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let Z=p(g.image,!1,s.maxTextureSize);Z=Le(g,Z);let rt=r.convert(g.format,g.colorSpace),St=r.convert(g.type),lt=v(g.internalFormat,rt,St,g.normalized,g.colorSpace,g.isVideoTexture);Wt(z,g);let at,wt=g.mipmaps,Et=g.isVideoTexture!==!0,Lt=st.__version===void 0||q===!0,P=et.dataReady,nt=M(g,Z);if(g.isDepthTexture)lt=b(g.format===ti,g.type),Lt&&(Et?e.texStorage2D(i.TEXTURE_2D,1,lt,Z.width,Z.height):e.texImage2D(i.TEXTURE_2D,0,lt,Z.width,Z.height,0,rt,St,null));else if(g.isDataTexture)if(wt.length>0){Et&&Lt&&e.texStorage2D(i.TEXTURE_2D,nt,lt,wt[0].width,wt[0].height);for(let J=0,ot=wt.length;J<ot;J++)at=wt[J],Et?P&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,at.width,at.height,rt,St,at.data):e.texImage2D(i.TEXTURE_2D,J,lt,at.width,at.height,0,rt,St,at.data);g.generateMipmaps=!1}else Et?(Lt&&e.texStorage2D(i.TEXTURE_2D,nt,lt,Z.width,Z.height),P&&tt(g,Z,rt,St)):e.texImage2D(i.TEXTURE_2D,0,lt,Z.width,Z.height,0,rt,St,Z.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Et&&Lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,nt,lt,wt[0].width,wt[0].height,Z.depth);for(let J=0,ot=wt.length;J<ot;J++)if(at=wt[J],g.format!==Ke)if(rt!==null)if(Et){if(P)if(g.layerUpdates.size>0){let ft=nl(at.width,at.height,g.format,g.type);for(let j of g.layerUpdates){let vt=at.data.subarray(j*ft/at.data.BYTES_PER_ELEMENT,(j+1)*ft/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,j,at.width,at.height,1,rt,vt)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,at.width,at.height,Z.depth,rt,at.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,lt,at.width,at.height,Z.depth,0,at.data,0,0);else Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Et?P&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,at.width,at.height,Z.depth,rt,St,at.data):e.texImage3D(i.TEXTURE_2D_ARRAY,J,lt,at.width,at.height,Z.depth,0,rt,St,at.data)}else{Et&&Lt&&e.texStorage2D(i.TEXTURE_2D,nt,lt,wt[0].width,wt[0].height);for(let J=0,ot=wt.length;J<ot;J++)at=wt[J],g.format!==Ke?rt!==null?Et?P&&e.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,at.width,at.height,rt,at.data):e.compressedTexImage2D(i.TEXTURE_2D,J,lt,at.width,at.height,0,at.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Et?P&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,at.width,at.height,rt,St,at.data):e.texImage2D(i.TEXTURE_2D,J,lt,at.width,at.height,0,rt,St,at.data)}else if(g.isDataArrayTexture)if(Et){if(Lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,nt,lt,Z.width,Z.height,Z.depth),P)if(g.layerUpdates.size>0){let J=nl(Z.width,Z.height,g.format,g.type);for(let ot of g.layerUpdates){let ft=Z.data.subarray(ot*J/Z.data.BYTES_PER_ELEMENT,(ot+1)*J/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ot,Z.width,Z.height,1,rt,St,ft)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,rt,St,Z.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,lt,Z.width,Z.height,Z.depth,0,rt,St,Z.data);else if(g.isData3DTexture)Et?(Lt&&e.texStorage3D(i.TEXTURE_3D,nt,lt,Z.width,Z.height,Z.depth),P&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,rt,St,Z.data)):e.texImage3D(i.TEXTURE_3D,0,lt,Z.width,Z.height,Z.depth,0,rt,St,Z.data);else if(g.isFramebufferTexture){if(Lt)if(Et)e.texStorage2D(i.TEXTURE_2D,nt,lt,Z.width,Z.height);else{let J=Z.width,ot=Z.height;for(let ft=0;ft<nt;ft++)e.texImage2D(i.TEXTURE_2D,ft,lt,J,ot,0,rt,St,null),J>>=1,ot>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let J=i.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),Z.parentNode!==J){J.appendChild(Z),u.add(g),J.onpaint=ot=>{let ft=ot.changedElements;for(let j of u)ft.includes(j.image)&&(j.needsUpdate=!0)},J.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Z);else{let ft=i.RGBA,j=i.RGBA,vt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ft,j,vt,Z)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(wt.length>0){if(Et&&Lt){let J=Yt(wt[0]);e.texStorage2D(i.TEXTURE_2D,nt,lt,J.width,J.height)}for(let J=0,ot=wt.length;J<ot;J++)at=wt[J],Et?P&&e.texSubImage2D(i.TEXTURE_2D,J,0,0,rt,St,at):e.texImage2D(i.TEXTURE_2D,J,lt,rt,St,at);g.generateMipmaps=!1}else if(Et){if(Lt){let J=Yt(Z);e.texStorage2D(i.TEXTURE_2D,nt,lt,J.width,J.height)}P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt,St,Z)}else e.texImage2D(i.TEXTURE_2D,0,lt,rt,St,Z);f(g)&&A(z),st.__version=et.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function Pt(T,g,U){if(g.image.length!==6)return;let z=$(T,g),q=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+U);let et=n.get(q);if(q.version!==et.__version||z===!0){e.activeTexture(i.TEXTURE0+U);let st=Bt.getPrimaries(Bt.workingColorSpace),Y=g.colorSpace===Ln?null:Bt.getPrimaries(g.colorSpace),Z=g.colorSpace===Ln||st===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let rt=g.isCompressedTexture||g.image[0].isCompressedTexture,St=g.image[0]&&g.image[0].isDataTexture,lt=[];for(let j=0;j<6;j++)!rt&&!St?lt[j]=p(g.image[j],!0,s.maxCubemapSize):lt[j]=St?g.image[j].image:g.image[j],lt[j]=Le(g,lt[j]);let at=lt[0],wt=r.convert(g.format,g.colorSpace),Et=r.convert(g.type),Lt=v(g.internalFormat,wt,Et,g.normalized,g.colorSpace),P=g.isVideoTexture!==!0,nt=et.__version===void 0||z===!0,J=q.dataReady,ot=M(g,at);Wt(i.TEXTURE_CUBE_MAP,g);let ft;if(rt){P&&nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Lt,at.width,at.height);for(let j=0;j<6;j++){ft=lt[j].mipmaps;for(let vt=0;vt<ft.length;vt++){let xt=ft[vt];g.format!==Ke?wt!==null?P?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,0,0,xt.width,xt.height,wt,xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,Lt,xt.width,xt.height,0,xt.data):Ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,0,0,xt.width,xt.height,wt,Et,xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,Lt,xt.width,xt.height,0,wt,Et,xt.data)}}}else{if(ft=g.mipmaps,P&&nt){ft.length>0&&ot++;let j=Yt(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Lt,j.width,j.height)}for(let j=0;j<6;j++)if(St){P?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,lt[j].width,lt[j].height,wt,Et,lt[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Lt,lt[j].width,lt[j].height,0,wt,Et,lt[j].data);for(let vt=0;vt<ft.length;vt++){let ae=ft[vt].image[j].image;P?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,0,0,ae.width,ae.height,wt,Et,ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,Lt,ae.width,ae.height,0,wt,Et,ae.data)}}else{P?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,wt,Et,lt[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Lt,wt,Et,lt[j]);for(let vt=0;vt<ft.length;vt++){let xt=ft[vt];P?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,0,0,wt,Et,xt.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,Lt,wt,Et,xt.image[j])}}}f(g)&&A(i.TEXTURE_CUBE_MAP),et.__version=q.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function Tt(T,g,U,z,q,et){let st=r.convert(U.format,U.colorSpace),Y=r.convert(U.type),Z=v(U.internalFormat,st,Y,U.normalized,U.colorSpace),rt=n.get(g),St=n.get(U);if(St.__renderTarget=g,!rt.__hasExternalTextures){let lt=Math.max(1,g.width>>et),at=Math.max(1,g.height>>et);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,et,Z,lt,at,g.depth,0,st,Y,null):e.texImage2D(q,et,Z,lt,at,0,st,Y,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,q,St.__webglTexture,0,re(g)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,q,St.__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function le(T,g,U){if(i.bindRenderbuffer(i.RENDERBUFFER,T),g.depthBuffer){let z=g.depthTexture,q=z&&z.isDepthTexture?z.type:null,et=b(g.stencilBuffer,q),st=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;fe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re(g),et,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,re(g),et,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,et,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,T)}else{let z=g.textures;for(let q=0;q<z.length;q++){let et=z[q],st=r.convert(et.format,et.colorSpace),Y=r.convert(et.type),Z=v(et.internalFormat,st,Y,et.normalized,et.colorSpace);fe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re(g),Z,g.width,g.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,re(g),Z,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,Z,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ot(T,g,U){let z=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(g.depthTexture);if(q.__renderTarget=g,(!q.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),z){if(q.__webglInit===void 0&&(q.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Wt(i.TEXTURE_CUBE_MAP,g.depthTexture);let rt=r.convert(g.depthTexture.format),St=r.convert(g.depthTexture.type),lt;g.depthTexture.format===fn?lt=i.DEPTH_COMPONENT24:g.depthTexture.format===ti&&(lt=i.DEPTH24_STENCIL8);for(let at=0;at<6;at++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,lt,g.width,g.height,0,rt,St,null)}}else K(g.depthTexture,0);let et=q.__webglTexture,st=re(g),Y=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,Z=g.depthTexture.format===ti?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===fn)fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Y,et,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,Z,Y,et,0);else if(g.depthTexture.format===ti)fe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Y,et,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,Z,Y,et,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Zt(T){let g=n.get(T),U=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){let z=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),z){let q=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,z.removeEventListener("dispose",q)};z.addEventListener("dispose",q),g.__depthDisposeCallback=q}g.__boundDepthTexture=z}if(T.depthTexture&&!g.__autoAllocateDepthBuffer)if(U)for(let z=0;z<6;z++)Ot(g.__webglFramebuffer[z],T,z);else{let z=T.texture.mipmaps;z&&z.length>0?Ot(g.__webglFramebuffer[0],T,0):Ot(g.__webglFramebuffer,T,0)}else if(U){g.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[z]),g.__webglDepthbuffer[z]===void 0)g.__webglDepthbuffer[z]=i.createRenderbuffer(),le(g.__webglDepthbuffer[z],T,!1);else{let q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=g.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,et)}}else{let z=T.texture.mipmaps;if(z&&z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),le(g.__webglDepthbuffer,T,!1);else{let q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,et)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(T,g,U){let z=n.get(T);g!==void 0&&Tt(z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Zt(T)}function Vt(T){let g=T.texture,U=n.get(T),z=n.get(g);T.addEventListener("dispose",_);let q=T.textures,et=T.isWebGLCubeRenderTarget===!0,st=q.length>1;if(st||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=g.version,a.memory.textures++),et){U.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer[Y]=[];for(let Z=0;Z<g.mipmaps.length;Z++)U.__webglFramebuffer[Y][Z]=i.createFramebuffer()}else U.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer=[];for(let Y=0;Y<g.mipmaps.length;Y++)U.__webglFramebuffer[Y]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(st)for(let Y=0,Z=q.length;Y<Z;Y++){let rt=n.get(q[Y]);rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&fe(T)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){let Z=q[Y];U.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[Y]);let rt=r.convert(Z.format,Z.colorSpace),St=r.convert(Z.type),lt=v(Z.internalFormat,rt,St,Z.normalized,Z.colorSpace,T.isXRRenderTarget===!0),at=re(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,at,lt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,U.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),le(U.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),Wt(i.TEXTURE_CUBE_MAP,g);for(let Y=0;Y<6;Y++)if(g.mipmaps&&g.mipmaps.length>0)for(let Z=0;Z<g.mipmaps.length;Z++)Tt(U.__webglFramebuffer[Y][Z],T,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else Tt(U.__webglFramebuffer[Y],T,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);f(g)&&A(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let Y=0,Z=q.length;Y<Z;Y++){let rt=q[Y],St=n.get(rt),lt=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(lt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,St.__webglTexture),Wt(lt,rt),Tt(U.__webglFramebuffer,T,rt,i.COLOR_ATTACHMENT0+Y,lt,0),f(rt)&&A(lt)}e.unbindTexture()}else{let Y=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Y=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Y,z.__webglTexture),Wt(Y,g),g.mipmaps&&g.mipmaps.length>0)for(let Z=0;Z<g.mipmaps.length;Z++)Tt(U.__webglFramebuffer[Z],T,g,i.COLOR_ATTACHMENT0,Y,Z);else Tt(U.__webglFramebuffer,T,g,i.COLOR_ATTACHMENT0,Y,0);f(g)&&A(Y),e.unbindTexture()}T.depthBuffer&&Zt(T)}function de(T){let g=T.textures;for(let U=0,z=g.length;U<z;U++){let q=g[U];if(f(q)){let et=E(T),st=n.get(q).__webglTexture;e.bindTexture(et,st),A(et),e.unbindTexture()}}}let me=[],xe=[];function Me(T){if(T.samples>0){if(fe(T)===!1){let g=T.textures,U=T.width,z=T.height,q=i.COLOR_BUFFER_BIT,et=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=n.get(T),Y=g.length>1;if(Y)for(let rt=0;rt<g.length;rt++)e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer);let Z=T.texture.mipmaps;Z&&Z.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let rt=0;rt<g.length;rt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let St=n.get(g[rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,St,0)}i.blitFramebuffer(0,0,U,z,0,0,U,z,q,i.NEAREST),l===!0&&(me.length=0,xe.length=0,me.push(i.COLOR_ATTACHMENT0+rt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(me.push(et),xe.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let rt=0;rt<g.length;rt++){e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let St=n.get(g[rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,St,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let g=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function re(T){return Math.min(s.maxSamples,T.samples)}function fe(T){let g=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function L(T){let g=a.render.frame;d.get(T)!==g&&(d.set(T,g),T.update())}function Le(T,g){let U=T.colorSpace,z=T.format,q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||U!==is&&U!==Ln&&(Bt.getTransfer(U)===qt?(z!==Ke||q!==Ue)&&Ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):At("WebGLTextures: Unsupported texture color space:",U)),g}function Yt(T){return typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame!="undefined"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=G,this.getTextureUnits=X,this.setTextureUnits=O,this.setTexture2D=K,this.setTexture2DArray=Q,this.setTexture3D=ht,this.setTextureCube=pt,this.rebindTextures=Xt,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=fe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function vg(i,t){function e(n,s=Ln){let r,a=Bt.getTransfer(s);if(n===Ue)return i.UNSIGNED_BYTE;if(n===Wr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wo)return i.BYTE;if(n===Xo)return i.SHORT;if(n===Xi)return i.UNSIGNED_SHORT;if(n===Hr)return i.INT;if(n===rn)return i.UNSIGNED_INT;if(n===an)return i.FLOAT;if(n===yn)return i.HALF_FLOAT;if(n===Jo)return i.ALPHA;if(n===Zo)return i.RGB;if(n===Ke)return i.RGBA;if(n===fn)return i.DEPTH_COMPONENT;if(n===ti)return i.DEPTH_STENCIL;if(n===$o)return i.RED;if(n===qr)return i.RED_INTEGER;if(n===ei)return i.RG;if(n===Yr)return i.RG_INTEGER;if(n===Jr)return i.RGBA_INTEGER;if(n===bs||n===ws||n===Ts||n===Es)if(a===qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===bs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Es)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===bs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ts)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Es)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Zr||n===$r||n===Kr||n===jr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Zr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===$r)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Kr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qr||n===ta||n===ea||n===na||n===ia||n===As||n===sa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qr||n===ta)return a===qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ea)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===na)return r.COMPRESSED_R11_EAC;if(n===ia)return r.COMPRESSED_SIGNED_R11_EAC;if(n===As)return r.COMPRESSED_RG11_EAC;if(n===sa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ra||n===aa||n===oa||n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ra)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===aa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===la)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ca)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ha)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ua)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===da)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ma)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ga)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_a)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xa)return a===qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ya||n===va||n===Sa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ya)return a===qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ma||n===ba||n===Cs||n===wa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ma)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ba)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cs)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Sg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Mg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ds(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new We({vertexShader:Sg,fragmentShader:Mg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ml=class extends pn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,m=null,x=null,S=typeof XRWebGLBinding!="undefined",p=new Sl,f={},A=e.getContextAttributes(),E=null,v=null,b=[],M=[],C=new kt,_=null,w=new Ae;w.viewport=new ie;let R=new Ae;R.viewport=new ie;let I=[w,R],N=new Br,G=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let it=b[$];return it===void 0&&(it=new ki,b[$]=it),it.getTargetRaySpace()},this.getControllerGrip=function($){let it=b[$];return it===void 0&&(it=new ki,b[$]=it),it.getGripSpace()},this.getHand=function($){let it=b[$];return it===void 0&&(it=new ki,b[$]=it),it.getHandSpace()};function O($){let it=M.indexOf($.inputSource);if(it===-1)return;let tt=b[it];tt!==void 0&&(tt.update($.inputSource,$.frame,c||a),tt.dispatchEvent({type:$.type,data:$.inputSource}))}function W(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",H);for(let $=0;$<b.length;$++){let it=M[$];it!==null&&(M[$]=null,b[$].disconnect(it))}G=null,X=null,p.reset();for(let $ in f)delete f[$];t.setRenderTarget(E),m=null,h=null,u=null,s=null,v=null,Wt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return u===null&&S&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",W),s.addEventListener("inputsourceschange",H),A.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let tt=null,Rt=null,Pt=null;A.depth&&(Pt=A.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=A.stencil?ti:fn,Rt=A.stencil?qi:rn);let Tt={colorFormat:e.RGBA8,depthFormat:Pt,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(Tt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),v=new Ge(h.textureWidth,h.textureHeight,{format:Ke,type:Ue,depthTexture:new Pn(h.textureWidth,h.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:A.stencil,colorSpace:t.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let tt={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new Ge(m.framebufferWidth,m.framebufferHeight,{format:Ke,type:Ue,colorSpace:t.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Wt.setContext(s),Wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function H($){for(let it=0;it<$.removed.length;it++){let tt=$.removed[it],Rt=M.indexOf(tt);Rt>=0&&(M[Rt]=null,b[Rt].disconnect(tt))}for(let it=0;it<$.added.length;it++){let tt=$.added[it],Rt=M.indexOf(tt);if(Rt===-1){for(let Tt=0;Tt<b.length;Tt++)if(Tt>=M.length){M.push(tt),Rt=Tt;break}else if(M[Tt]===null){M[Tt]=tt,Rt=Tt;break}if(Rt===-1)break}let Pt=b[Rt];Pt&&Pt.connect(tt)}}let K=new F,Q=new F;function ht($,it,tt){K.setFromMatrixPosition(it.matrixWorld),Q.setFromMatrixPosition(tt.matrixWorld);let Rt=K.distanceTo(Q),Pt=it.projectionMatrix.elements,Tt=tt.projectionMatrix.elements,le=Pt[14]/(Pt[10]-1),Ot=Pt[14]/(Pt[10]+1),Zt=(Pt[9]+1)/Pt[5],Xt=(Pt[9]-1)/Pt[5],Vt=(Pt[8]-1)/Pt[0],de=(Tt[8]+1)/Tt[0],me=le*Vt,xe=le*de,Me=Rt/(-Vt+de),re=Me*-Vt;if(it.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(re),$.translateZ(Me),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pt[10]===-1)$.projectionMatrix.copy(it.projectionMatrix),$.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{let fe=le+Me,L=Ot+Me,Le=me-re,Yt=xe+(Rt-re),T=Zt*Ot/L*fe,g=Xt*Ot/L*fe;$.projectionMatrix.makePerspective(Le,Yt,T,g,fe,L),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function pt($,it){it===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(it.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let it=$.near,tt=$.far;p.texture!==null&&(p.depthNear>0&&(it=p.depthNear),p.depthFar>0&&(tt=p.depthFar)),N.near=R.near=w.near=it,N.far=R.far=w.far=tt,(G!==N.near||X!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),G=N.near,X=N.far),N.layers.mask=$.layers.mask|6,w.layers.mask=N.layers.mask&-5,R.layers.mask=N.layers.mask&-3;let Rt=$.parent,Pt=N.cameras;pt(N,Rt);for(let Tt=0;Tt<Pt.length;Tt++)pt(Pt[Tt],Rt);Pt.length===2?ht(N,w,R):N.projectionMatrix.copy(w.projectionMatrix),_t($,N,Rt)};function _t($,it,tt){tt===null?$.matrix.copy(it.matrixWorld):($.matrix.copy(tt.matrixWorld),$.matrix.invert(),$.matrix.multiply(it.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(it.projectionMatrix),$.projectionMatrixInverse.copy(it.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=xr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(N)},this.getCameraTexture=function($){return f[$]};let Ht=null;function se($,it){if(d=it.getViewerPose(c||a),x=it,d!==null){let tt=d.views;m!==null&&(t.setRenderTargetFramebuffer(v,m.framebuffer),t.setRenderTarget(v));let Rt=!1;tt.length!==N.cameras.length&&(N.cameras.length=0,Rt=!0);for(let Ot=0;Ot<tt.length;Ot++){let Zt=tt[Ot],Xt=null;if(m!==null)Xt=m.getViewport(Zt);else{let de=u.getViewSubImage(h,Zt);Xt=de.viewport,Ot===0&&(t.setRenderTargetTextures(v,de.colorTexture,de.depthStencilTexture),t.setRenderTarget(v))}let Vt=I[Ot];Vt===void 0&&(Vt=new Ae,Vt.layers.enable(Ot),Vt.viewport=new ie,I[Ot]=Vt),Vt.matrix.fromArray(Zt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Zt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),Ot===0&&(N.matrix.copy(Vt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Rt===!0&&N.cameras.push(Vt)}let Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){u=n.getBinding();let Ot=u.getDepthInformation(tt[0]);Ot&&Ot.isValid&&Ot.texture&&p.init(Ot,s.renderState)}if(Pt&&Pt.includes("camera-access")&&S){t.state.unbindTexture(),u=n.getBinding();for(let Ot=0;Ot<tt.length;Ot++){let Zt=tt[Ot].camera;if(Zt){let Xt=f[Zt];Xt||(Xt=new ds,f[Zt]=Xt);let Vt=u.getCameraImage(Zt);Xt.sourceTexture=Vt}}}}for(let tt=0;tt<b.length;tt++){let Rt=M[tt],Pt=b[tt];Rt!==null&&Pt!==void 0&&Pt.update(Rt,it,c||a)}Ht&&Ht($,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),x=null}let Wt=new mh;Wt.setAnimationLoop(se),this.setAnimationLoop=function($){Ht=$},this.dispose=function(){}}},bg=new ne,Sh=new It;Sh.set(-1,0,0,0,1,0,0,0,1);function wg(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Qo(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,A,E,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),u(p,f)):f.isMeshPhongMaterial?(r(p,f),d(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,v)):f.isMeshMatcapMaterial?(r(p,f),x(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),S(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,A,E):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Pe&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Pe&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);let A=t.get(f),E=A.envMap,v=A.envMapRotation;E&&(p.envMap.value=E,p.envMapRotation.value.setFromMatrix4(bg.makeRotationFromEuler(v)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Sh),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,A,E){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*A,p.scale.value=E*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function d(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,A){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Pe&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,f){f.matcap&&(p.matcap.value=f.matcap)}function S(p,f){let A=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Tg(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,b){let M=b.program;n.uniformBlockBinding(v,M)}function c(v,b){let M=s[v.id];M===void 0&&(p(v),M=d(v),s[v.id]=M,v.addEventListener("dispose",A));let C=b.program;n.updateUBOMapping(v,C);let _=t.render.frame;r[v.id]!==_&&(h(v),r[v.id]=_)}function d(v){let b=u();v.__bindingPointIndex=b;let M=i.createBuffer(),C=v.__size,_=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return At("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let b=s[v.id],M=v.uniforms,C=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,w=M.length;_<w;_++){let R=M[_];if(Array.isArray(R))for(let I=0,N=R.length;I<N;I++)m(R[I],_,I,C);else m(R,_,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(v,b,M,C){if(S(v,b,M,C)===!0){let _=v.__offset,w=v.value;if(Array.isArray(w)){let R=0;for(let I=0;I<w.length;I++){let N=w[I],G=f(N);x(N,v.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(w,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,v.__data)}}function x(v,b,M){typeof v=="number"||typeof v=="boolean"?b[0]=v:v.isMatrix3?(b[0]=v.elements[0],b[1]=v.elements[1],b[2]=v.elements[2],b[3]=0,b[4]=v.elements[3],b[5]=v.elements[4],b[6]=v.elements[5],b[7]=0,b[8]=v.elements[6],b[9]=v.elements[7],b[10]=v.elements[8],b[11]=0):ArrayBuffer.isView(v)?b.set(new v.constructor(v.buffer,v.byteOffset,b.length)):v.toArray(b,M)}function S(v,b,M,C){let _=v.value,w=b+"_"+M;if(C[w]===void 0)return typeof _=="number"||typeof _=="boolean"?C[w]=_:ArrayBuffer.isView(_)?C[w]=_.slice():C[w]=_.clone(),!0;{let R=C[w];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return C[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function p(v){let b=v.uniforms,M=0,C=16;for(let w=0,R=b.length;w<R;w++){let I=Array.isArray(b[w])?b[w]:[b[w]];for(let N=0,G=I.length;N<G;N++){let X=I[N],O=Array.isArray(X.value)?X.value:[X.value];for(let W=0,H=O.length;W<H;W++){let K=O[W],Q=f(K),ht=M%C,pt=ht%Q.boundary,_t=ht+pt;M+=pt,_t!==0&&C-_t<Q.storage&&(M+=C-_t),X.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=M,M+=Q.storage}}}let _=M%C;return _>0&&(M+=C-_),v.__size=M,v.__cache={},this}function f(v){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?Ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Ct("WebGLRenderer: Unsupported uniform value type.",v),b}function A(v){let b=v.target;b.removeEventListener("dispose",A);let M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function E(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}var Eg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),vn=null;function Ag(){return vn===null&&(vn=new Mr(Eg,16,16,ei,yn),vn.name="DFG_LUT",vn.minFilter=be,vn.magFilter=be,vn.wrapS=dn,vn.wrapT=dn,vn.generateMipmaps=!1,vn.needsUpdate=!0),vn}var La=class{constructor(t={}){let{canvas:e=zc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:m=Ue}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let S=m,p=new Set([Jr,Yr,qr]),f=new Set([Ue,rn,Xi,qi,Wr,Xr]),A=new Uint32Array(4),E=new Int32Array(4),v=new F,b=null,M=null,C=[],_=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=sn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,N=null,G=null,X=null,O=null;this._outputColorSpace=Ie;let W=0,H=0,K=null,Q=-1,ht=null,pt=new ie,_t=new ie,Ht=null,se=new Nt(0),Wt=0,$=e.width,it=e.height,tt=1,Rt=null,Pt=null,Tt=new ie(0,0,$,it),le=new ie(0,0,$,it),Ot=!1,Zt=new Vi,Xt=!1,Vt=!1,de=new ne,me=new F,xe=new ie,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},re=!1;function fe(){return K===null?tt:1}let L=n;function Le(y,D){return e.getContext(y,D)}try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"185"}`),e.addEventListener("webglcontextlost",ae,!1),e.addEventListener("webglcontextrestored",jt,!1),e.addEventListener("webglcontextcreationerror",on,!1),L===null){let D="webgl2";if(L=Le(D,y),L===null)throw Le(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw At("WebGLRenderer: "+y.message),y}let Yt,T,g,U,z,q,et,st,Y,Z,rt,St,lt,at,wt,Et,Lt,P,nt,J,ot,ft,j;function vt(){Yt=new Np(L),Yt.init(),ot=new vg(L,Yt),T=new Ep(L,Yt,t,ot),g=new xg(L,Yt),T.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),G=L.createFramebuffer(),X=L.createFramebuffer(),O=L.createFramebuffer(),U=new Op(L),z=new sg,q=new yg(L,Yt,g,z,T,ot,U),et=new Dp(R),st=new zu(L),ft=new wp(L,st),Y=new Up(L,st,U,ft),Z=new kp(L,Y,st,ft,U),P=new Bp(L,T,q),wt=new Ap(z),rt=new ig(R,et,Yt,T,ft,wt),St=new wg(R,z),lt=new ag,at=new dg(Yt),Lt=new bp(R,et,g,Z,x,l),Et=new _g(R,Z,T),j=new Tg(L,U,T,g),nt=new Tp(L,Yt,U),J=new Fp(L,Yt,U),U.programs=rt.programs,R.capabilities=T,R.extensions=Yt,R.properties=z,R.renderLists=lt,R.shadowMap=Et,R.state=g,R.info=U}vt(),S!==Ue&&(w=new Vp(S,e.width,e.height,o,s,r));let xt=new Ml(R,L);this.xr=xt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let y=Yt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=Yt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(y){y!==void 0&&(tt=y,this.setSize($,it,!1))},this.getSize=function(y){return y.set($,it)},this.setSize=function(y,D,V=!0){if(xt.isPresenting){Ct("WebGLRenderer: Can't change size while VR device is presenting.");return}$=y,it=D,e.width=Math.floor(y*tt),e.height=Math.floor(D*tt),V===!0&&(e.style.width=y+"px",e.style.height=D+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set($*tt,it*tt).floor()},this.setDrawingBufferSize=function(y,D,V){$=y,it=D,tt=V,e.width=Math.floor(y*V),e.height=Math.floor(D*V),this.setViewport(0,0,y,D)},this.setEffects=function(y){if(S===Ue){At("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let D=0;D<y.length;D++)if(y[D].isOutputPass===!0){Ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(pt)},this.getViewport=function(y){return y.copy(Tt)},this.setViewport=function(y,D,V,B){y.isVector4?Tt.set(y.x,y.y,y.z,y.w):Tt.set(y,D,V,B),g.viewport(pt.copy(Tt).multiplyScalar(tt).round())},this.getScissor=function(y){return y.copy(le)},this.setScissor=function(y,D,V,B){y.isVector4?le.set(y.x,y.y,y.z,y.w):le.set(y,D,V,B),g.scissor(_t.copy(le).multiplyScalar(tt).round())},this.getScissorTest=function(){return Ot},this.setScissorTest=function(y){g.setScissorTest(Ot=y)},this.setOpaqueSort=function(y){Rt=y},this.setTransparentSort=function(y){Pt=y},this.getClearColor=function(y){return y.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor(...arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,V=!0){let B=0;if(y){let k=!1;if(K!==null){let dt=K.texture.format;k=p.has(dt)}if(k){let dt=K.texture.type,gt=f.has(dt),ut=Lt.getClearColor(),yt=Lt.getClearAlpha(),Mt=ut.r,Dt=ut.g,Ft=ut.b;gt?(A[0]=Mt,A[1]=Dt,A[2]=Ft,A[3]=yt,L.clearBufferuiv(L.COLOR,0,A)):(E[0]=Mt,E[1]=Dt,E[2]=Ft,E[3]=yt,L.clearBufferiv(L.COLOR,0,E))}else B|=L.COLOR_BUFFER_BIT}D&&(B|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(B|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&L.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),N=y},this.dispose=function(){e.removeEventListener("webglcontextlost",ae,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",on,!1),Lt.dispose(),lt.dispose(),at.dispose(),z.dispose(),et.dispose(),Z.dispose(),ft.dispose(),j.dispose(),rt.dispose(),xt.dispose(),xt.removeEventListener("sessionstart",Ll),xt.removeEventListener("sessionend",Dl),ii.stop()};function ae(y){y.preventDefault(),jo("WebGLRenderer: Context Lost."),I=!0}function jt(){jo("WebGLRenderer: Context Restored."),I=!1;let y=U.autoReset,D=Et.enabled,V=Et.autoUpdate,B=Et.needsUpdate,k=Et.type;vt(),U.autoReset=y,Et.enabled=D,Et.autoUpdate=V,Et.needsUpdate=B,Et.type=k}function on(y){At("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function ln(y){let D=y.target;D.removeEventListener("dispose",ln),Qh(D)}function Qh(y){tu(y),z.remove(y)}function tu(y){let D=z.get(y).programs;D!==void 0&&(D.forEach(function(V){rt.releaseProgram(V)}),y.isShaderMaterial&&rt.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,V,B,k,dt){D===null&&(D=Me);let gt=k.isMesh&&k.matrixWorld.determinantAffine()<0,ut=iu(y,D,V,B,k);g.setMaterial(B,gt);let yt=V.index,Mt=1;if(B.wireframe===!0){if(yt=Y.getWireframeAttribute(V),yt===void 0)return;Mt=2}let Dt=V.drawRange,Ft=V.attributes.position,bt=Dt.start*Mt,Jt=(Dt.start+Dt.count)*Mt;dt!==null&&(bt=Math.max(bt,dt.start*Mt),Jt=Math.min(Jt,(dt.start+dt.count)*Mt)),yt!==null?(bt=Math.max(bt,0),Jt=Math.min(Jt,yt.count)):Ft!=null&&(bt=Math.max(bt,0),Jt=Math.min(Jt,Ft.count));let ce=Jt-bt;if(ce<0||ce===1/0)return;ft.setup(k,B,ut,V,yt);let oe,$t=nt;if(yt!==null&&(oe=st.get(yt),$t=J,$t.setIndex(oe)),k.isMesh)B.wireframe===!0?(g.setLineWidth(B.wireframeLinewidth*fe()),$t.setMode(L.LINES)):$t.setMode(L.TRIANGLES);else if(k.isLine){let we=B.linewidth;we===void 0&&(we=1),g.setLineWidth(we*fe()),k.isLineSegments?$t.setMode(L.LINES):k.isLineLoop?$t.setMode(L.LINE_LOOP):$t.setMode(L.LINE_STRIP)}else k.isPoints?$t.setMode(L.POINTS):k.isSprite&&$t.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(Yt.get("WEBGL_multi_draw"))$t.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let we=k._multiDrawStarts,mt=k._multiDrawCounts,Be=k._multiDrawCount,Gt=yt?st.get(yt).bytesPerElement:1,Ye=z.get(B).currentProgram.getUniforms();for(let cn=0;cn<Be;cn++)Ye.setValue(L,"_gl_DrawID",cn),$t.render(we[cn]/Gt,mt[cn])}else if(k.isInstancedMesh)$t.renderInstances(bt,ce,k.count);else if(V.isInstancedBufferGeometry){let we=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,mt=Math.min(V.instanceCount,we);$t.renderInstances(bt,ce,mt)}else $t.render(bt,ce)};function Pl(y,D,V){y.transparent===!0&&y.side===_n&&y.forceSinglePass===!1?(y.side=Pe,y.needsUpdate=!0,Bs(y,D,V),y.side=Rn,y.needsUpdate=!0,Bs(y,D,V),y.side=_n):Bs(y,D,V)}this.compile=function(y,D,V=null){V===null&&(V=y),M=at.get(V),M.init(D),_.push(M),V.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),y!==V&&y.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),M.setupLights();let B=new Set;return y.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let dt=k.material;if(dt)if(Array.isArray(dt))for(let gt=0;gt<dt.length;gt++){let ut=dt[gt];Pl(ut,V,k),B.add(ut)}else Pl(dt,V,k),B.add(dt)}),M=_.pop(),B},this.compileAsync=function(y,D,V=null){let B=this.compile(y,D,V);return new Promise(k=>{function dt(){if(B.forEach(function(gt){z.get(gt).currentProgram.isReady()&&B.delete(gt)}),B.size===0){k(y);return}setTimeout(dt,10)}Yt.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Ja=null;function eu(y){Ja&&Ja(y)}function Ll(){ii.stop()}function Dl(){ii.start()}let ii=new mh;ii.setAnimationLoop(eu),typeof self!="undefined"&&ii.setContext(self),this.setAnimationLoop=function(y){Ja=y,xt.setAnimationLoop(y),y===null?ii.stop():ii.start()},xt.addEventListener("sessionstart",Ll),xt.addEventListener("sessionend",Dl),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){At("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;N!==null&&N.renderStart(y,D);let V=xt.enabled===!0&&xt.isPresenting===!0,B=w!==null&&(K===null||V)&&w.begin(R,K);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),xt.enabled===!0&&xt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(xt.cameraAutoUpdate===!0&&xt.updateCamera(D),D=xt.getCamera()),y.isScene===!0&&y.onBeforeRender(R,y,D,K),M=at.get(y,_.length),M.init(D),M.state.textureUnits=q.getTextureUnits(),_.push(M),de.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Zt.setFromProjectionMatrix(de,nn,D.reversedDepth),Vt=this.localClippingEnabled,Xt=wt.init(this.clippingPlanes,Vt),b=lt.get(y,C.length),b.init(),C.push(b),xt.enabled===!0&&xt.isPresenting===!0){let gt=R.xr.getDepthSensingMesh();gt!==null&&Za(gt,D,-1/0,R.sortObjects)}Za(y,D,0,R.sortObjects),b.finish(),R.sortObjects===!0&&b.sort(Rt,Pt,D.reversedDepth),re=xt.enabled===!1||xt.isPresenting===!1||xt.hasDepthSensing()===!1,re&&Lt.addToRenderList(b,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xt===!0&&wt.beginShadows();let k=M.state.shadowsArray;if(Et.render(k,y,D),Xt===!0&&wt.endShadows(),(B&&w.hasRenderPass())===!1){let gt=b.opaque,ut=b.transmissive;if(M.setupLights(),D.isArrayCamera){let yt=D.cameras;if(ut.length>0)for(let Mt=0,Dt=yt.length;Mt<Dt;Mt++){let Ft=yt[Mt];Ul(gt,ut,y,Ft)}re&&Lt.render(y);for(let Mt=0,Dt=yt.length;Mt<Dt;Mt++){let Ft=yt[Mt];Nl(b,y,Ft,Ft.viewport)}}else ut.length>0&&Ul(gt,ut,y,D),re&&Lt.render(y),Nl(b,y,D)}K!==null&&H===0&&(q.updateMultisampleRenderTarget(K),q.updateRenderTargetMipmap(K)),B&&w.end(R),y.isScene===!0&&y.onAfterRender(R,y,D),ft.resetDefaultState(),Q=-1,ht=null,_.pop(),_.length>0?(M=_[_.length-1],q.setTextureUnits(M.state.textureUnits),Xt===!0&&wt.setGlobalState(R.clippingPlanes,M.state.camera)):M=null,C.pop(),C.length>0?b=C[C.length-1]:b=null,N!==null&&N.renderEnd()};function Za(y,D,V,B){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLightProbeGrid)M.pushLightProbeGrid(y);else if(y.isLight)M.pushLight(y),y.castShadow&&M.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Zt.intersectsSprite(y)){B&&xe.setFromMatrixPosition(y.matrixWorld).applyMatrix4(de);let gt=Z.update(y),ut=y.material;ut.visible&&b.push(y,gt,ut,V,xe.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Zt.intersectsObject(y))){let gt=Z.update(y),ut=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),xe.copy(y.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),xe.copy(gt.boundingSphere.center)),xe.applyMatrix4(y.matrixWorld).applyMatrix4(de)),Array.isArray(ut)){let yt=gt.groups;for(let Mt=0,Dt=yt.length;Mt<Dt;Mt++){let Ft=yt[Mt],bt=ut[Ft.materialIndex];bt&&bt.visible&&b.push(y,gt,bt,V,xe.z,Ft)}}else ut.visible&&b.push(y,gt,ut,V,xe.z,null)}}let dt=y.children;for(let gt=0,ut=dt.length;gt<ut;gt++)Za(dt[gt],D,V,B)}function Nl(y,D,V,B){let{opaque:k,transmissive:dt,transparent:gt}=y;M.setupLightsView(V),Xt===!0&&wt.setGlobalState(R.clippingPlanes,V),B&&g.viewport(pt.copy(B)),k.length>0&&Os(k,D,V),dt.length>0&&Os(dt,D,V),gt.length>0&&Os(gt,D,V),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Ul(y,D,V,B){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[B.id]===void 0){let bt=Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[B.id]=new Ge(1,1,{generateMipmaps:!0,type:bt?yn:Ue,minFilter:Qn,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Bt.workingColorSpace})}let dt=M.state.transmissionRenderTarget[B.id],gt=B.viewport||pt;dt.setSize(gt.z*R.transmissionResolutionScale,gt.w*R.transmissionResolutionScale);let ut=R.getRenderTarget(),yt=R.getActiveCubeFace(),Mt=R.getActiveMipmapLevel();R.setRenderTarget(dt),R.getClearColor(se),Wt=R.getClearAlpha(),Wt<1&&R.setClearColor(16777215,.5),R.clear(),re&&Lt.render(V);let Dt=R.toneMapping;R.toneMapping=sn;let Ft=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),M.setupLightsView(B),Xt===!0&&wt.setGlobalState(R.clippingPlanes,B),Os(y,V,B),q.updateMultisampleRenderTarget(dt),q.updateRenderTargetMipmap(dt),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let bt=!1;for(let Jt=0,ce=D.length;Jt<ce;Jt++){let oe=D[Jt],{object:$t,geometry:we,material:mt,group:Be}=oe;if(mt.side===_n&&$t.layers.test(B.layers)){let Gt=mt.side;mt.side=Pe,mt.needsUpdate=!0,Fl($t,V,B,we,mt,Be),mt.side=Gt,mt.needsUpdate=!0,bt=!0}}bt===!0&&(q.updateMultisampleRenderTarget(dt),q.updateRenderTargetMipmap(dt))}R.setRenderTarget(ut,yt,Mt),R.setClearColor(se,Wt),Ft!==void 0&&(B.viewport=Ft),R.toneMapping=Dt}function Os(y,D,V){let B=D.isScene===!0?D.overrideMaterial:null;for(let k=0,dt=y.length;k<dt;k++){let gt=y[k],{object:ut,geometry:yt,group:Mt}=gt,Dt=gt.material;Dt.allowOverride===!0&&B!==null&&(Dt=B),ut.layers.test(V.layers)&&Fl(ut,D,V,yt,Dt,Mt)}}function Fl(y,D,V,B,k,dt){y.onBeforeRender(R,D,V,B,k,dt),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),k.onBeforeRender(R,D,V,B,y,dt),k.transparent===!0&&k.side===_n&&k.forceSinglePass===!1?(k.side=Pe,k.needsUpdate=!0,R.renderBufferDirect(V,D,B,k,y,dt),k.side=Rn,k.needsUpdate=!0,R.renderBufferDirect(V,D,B,k,y,dt),k.side=_n):R.renderBufferDirect(V,D,B,k,y,dt),y.onAfterRender(R,D,V,B,k,dt)}function Bs(y,D,V){D.isScene!==!0&&(D=Me);let B=z.get(y),k=M.state.lights,dt=M.state.shadowsArray,gt=k.state.version,ut=rt.getParameters(y,k.state,dt,D,V,M.state.lightProbeGridArray),yt=rt.getProgramCacheKey(ut),Mt=B.programs;B.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,B.fog=D.fog;let Dt=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;B.envMap=et.get(y.envMap||B.environment,Dt),B.envMapRotation=B.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Mt===void 0&&(y.addEventListener("dispose",ln),Mt=new Map,B.programs=Mt);let Ft=Mt.get(yt);if(Ft!==void 0){if(B.currentProgram===Ft&&B.lightsStateVersion===gt)return Bl(y,ut),Ft}else ut.uniforms=rt.getUniforms(y),N!==null&&y.isNodeMaterial&&N.build(y,V,ut),y.onBeforeCompile(ut,R),Ft=rt.acquireProgram(ut,yt),Mt.set(yt,Ft),B.uniforms=ut.uniforms;let bt=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(bt.clippingPlanes=wt.uniform),Bl(y,ut),B.needsLights=ru(y),B.lightsStateVersion=gt,B.needsLights&&(bt.ambientLightColor.value=k.state.ambient,bt.lightProbe.value=k.state.probe,bt.directionalLights.value=k.state.directional,bt.directionalLightShadows.value=k.state.directionalShadow,bt.spotLights.value=k.state.spot,bt.spotLightShadows.value=k.state.spotShadow,bt.rectAreaLights.value=k.state.rectArea,bt.ltc_1.value=k.state.rectAreaLTC1,bt.ltc_2.value=k.state.rectAreaLTC2,bt.pointLights.value=k.state.point,bt.pointLightShadows.value=k.state.pointShadow,bt.hemisphereLights.value=k.state.hemi,bt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,bt.spotLightMatrix.value=k.state.spotLightMatrix,bt.spotLightMap.value=k.state.spotLightMap,bt.pointShadowMatrix.value=k.state.pointShadowMatrix),B.lightProbeGrid=M.state.lightProbeGridArray.length>0,B.currentProgram=Ft,B.uniformsList=null,Ft}function Ol(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=Ji.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function Bl(y,D){let V=z.get(y);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function nu(y,D){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;v.setFromMatrixPosition(D.matrixWorld);for(let V=0,B=y.length;V<B;V++){let k=y[V];if(k.texture!==null&&k.boundingBox.containsPoint(v))return k}return null}function iu(y,D,V,B,k){D.isScene!==!0&&(D=Me),q.resetTextureUnits();let dt=D.fog,gt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?D.environment:null,ut=K===null?R.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Bt.workingColorSpace,yt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Mt=et.get(B.envMap||gt,yt),Dt=B.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ft=!!V.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),bt=!!V.morphAttributes.position,Jt=!!V.morphAttributes.normal,ce=!!V.morphAttributes.color,oe=sn;B.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(oe=R.toneMapping);let $t=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,we=$t!==void 0?$t.length:0,mt=z.get(B),Be=M.state.lights;if(Xt===!0&&(Vt===!0||y!==ht)){let Qt=y===ht&&B.id===Q;wt.setState(B,y,Qt)}let Gt=!1;B.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==Be.state.version||mt.outputColorSpace!==ut||k.isBatchedMesh&&mt.batching===!1||!k.isBatchedMesh&&mt.batching===!0||k.isBatchedMesh&&mt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&mt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&mt.instancing===!1||!k.isInstancedMesh&&mt.instancing===!0||k.isSkinnedMesh&&mt.skinning===!1||!k.isSkinnedMesh&&mt.skinning===!0||k.isInstancedMesh&&mt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&mt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&mt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&mt.instancingMorph===!1&&k.morphTexture!==null||mt.envMap!==Mt||B.fog===!0&&mt.fog!==dt||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==wt.numPlanes||mt.numIntersection!==wt.numIntersection)||mt.vertexAlphas!==Dt||mt.vertexTangents!==Ft||mt.morphTargets!==bt||mt.morphNormals!==Jt||mt.morphColors!==ce||mt.toneMapping!==oe||mt.morphTargetsCount!==we||!!mt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Gt=!0):(Gt=!0,mt.__version=B.version);let Ye=mt.currentProgram;Gt===!0&&(Ye=Bs(B,D,k),N&&B.isNodeMaterial&&N.onUpdateProgram(B,Ye,mt));let cn=!1,Dn=!1,vi=!1,Kt=Ye.getUniforms(),he=mt.uniforms;if(g.useProgram(Ye.program)&&(cn=!0,Dn=!0,vi=!0),B.id!==Q&&(Q=B.id,Dn=!0),mt.needsLights){let Qt=nu(M.state.lightProbeGridArray,k);mt.lightProbeGrid!==Qt&&(mt.lightProbeGrid=Qt,Dn=!0)}if(cn||ht!==y){g.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),Kt.setValue(L,"projectionMatrix",y.projectionMatrix),Kt.setValue(L,"viewMatrix",y.matrixWorldInverse);let Un=Kt.map.cameraPosition;Un!==void 0&&Un.setValue(L,me.setFromMatrixPosition(y.matrixWorld)),T.logarithmicDepthBuffer&&Kt.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Kt.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),ht!==y&&(ht=y,Dn=!0,vi=!0)}if(mt.needsLights&&(Be.state.directionalShadowMap.length>0&&Kt.setValue(L,"directionalShadowMap",Be.state.directionalShadowMap,q),Be.state.spotShadowMap.length>0&&Kt.setValue(L,"spotShadowMap",Be.state.spotShadowMap,q),Be.state.pointShadowMap.length>0&&Kt.setValue(L,"pointShadowMap",Be.state.pointShadowMap,q)),k.isSkinnedMesh){Kt.setOptional(L,k,"bindMatrix"),Kt.setOptional(L,k,"bindMatrixInverse");let Qt=k.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),Kt.setValue(L,"boneTexture",Qt.boneTexture,q))}k.isBatchedMesh&&(Kt.setOptional(L,k,"batchingTexture"),Kt.setValue(L,"batchingTexture",k._matricesTexture,q),Kt.setOptional(L,k,"batchingIdTexture"),Kt.setValue(L,"batchingIdTexture",k._indirectTexture,q),Kt.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&Kt.setValue(L,"batchingColorTexture",k._colorsTexture,q));let Nn=V.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&P.update(k,V,Ye),(Dn||mt.receiveShadow!==k.receiveShadow)&&(mt.receiveShadow=k.receiveShadow,Kt.setValue(L,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&D.environment!==null&&(he.envMapIntensity.value=D.environmentIntensity),he.dfgLUT!==void 0&&(he.dfgLUT.value=Ag()),Dn){if(Kt.setValue(L,"toneMappingExposure",R.toneMappingExposure),mt.needsLights&&su(he,vi),dt&&B.fog===!0&&St.refreshFogUniforms(he,dt),St.refreshMaterialUniforms(he,B,tt,it,M.state.transmissionRenderTarget[y.id]),mt.needsLights&&mt.lightProbeGrid){let Qt=mt.lightProbeGrid;he.probesSH.value=Qt.texture,he.probesMin.value.copy(Qt.boundingBox.min),he.probesMax.value.copy(Qt.boundingBox.max),he.probesResolution.value.copy(Qt.resolution)}Ji.upload(L,Ol(mt),he,q)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ji.upload(L,Ol(mt),he,q),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Kt.setValue(L,"center",k.center),Kt.setValue(L,"modelViewMatrix",k.modelViewMatrix),Kt.setValue(L,"normalMatrix",k.normalMatrix),Kt.setValue(L,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){let Qt=B.uniformsGroups;for(let Un=0,Si=Qt.length;Un<Si;Un++){let kl=Qt[Un];j.update(kl,Ye),j.bind(kl,Ye)}}return Ye}function su(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function ru(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(y,D,V){let B=z.get(y);B.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),z.get(y.texture).__webglTexture=D,z.get(y.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:V,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){let V=z.get(y);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,V=0){K=y,W=D,H=V;let B=null,k=!1,dt=!1;if(y){let ut=z.get(y);if(ut.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(L.FRAMEBUFFER,ut.__webglFramebuffer),pt.copy(y.viewport),_t.copy(y.scissor),Ht=y.scissorTest,g.viewport(pt),g.scissor(_t),g.setScissorTest(Ht),Q=-1;return}else if(ut.__webglFramebuffer===void 0)q.setupRenderTarget(y);else if(ut.__hasExternalTextures)q.rebindTextures(y,z.get(y.texture).__webglTexture,z.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Dt=y.depthTexture;if(ut.__boundDepthTexture!==Dt){if(Dt!==null&&z.has(Dt)&&(y.width!==Dt.image.width||y.height!==Dt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(y)}}let yt=y.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(dt=!0);let Mt=z.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Mt[D])?B=Mt[D][V]:B=Mt[D],k=!0):y.samples>0&&q.useMultisampledRTT(y)===!1?B=z.get(y).__webglMultisampledFramebuffer:Array.isArray(Mt)?B=Mt[V]:B=Mt,pt.copy(y.viewport),_t.copy(y.scissor),Ht=y.scissorTest}else pt.copy(Tt).multiplyScalar(tt).floor(),_t.copy(le).multiplyScalar(tt).floor(),Ht=Ot;if(V!==0&&(B=G),g.bindFramebuffer(L.FRAMEBUFFER,B)&&g.drawBuffers(y,B),g.viewport(pt),g.scissor(_t),g.setScissorTest(Ht),k){let ut=z.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut.__webglTexture,V)}else if(dt){let ut=D;for(let yt=0;yt<y.textures.length;yt++){let Mt=z.get(y.textures[yt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+yt,Mt.__webglTexture,V,ut)}}else if(y!==null&&V!==0){let ut=z.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ut.__webglTexture,V)}Q=-1},this.readRenderTargetPixels=function(y,D,V,B,k,dt,gt,ut=0){if(!(y&&y.isWebGLRenderTarget)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt){g.bindFramebuffer(L.FRAMEBUFFER,yt);try{let Mt=y.textures[ut],Dt=Mt.format,Ft=Mt.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ut),!T.textureFormatReadable(Dt)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!T.textureTypeReadable(Ft)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-B&&V>=0&&V<=y.height-k&&L.readPixels(D,V,B,k,ot.convert(Dt),ot.convert(Ft),dt)}finally{let Mt=K!==null?z.get(K).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(y,D,V,B,k,dt,gt,ut=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=z.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt)if(D>=0&&D<=y.width-B&&V>=0&&V<=y.height-k){g.bindFramebuffer(L.FRAMEBUFFER,yt);let Mt=y.textures[ut],Dt=Mt.format,Ft=Mt.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ut),!T.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!T.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let bt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.bufferData(L.PIXEL_PACK_BUFFER,dt.byteLength,L.STREAM_READ),L.readPixels(D,V,B,k,ot.convert(Dt),ot.convert(Ft),0);let Jt=K!==null?z.get(K).__webglFramebuffer:null;g.bindFramebuffer(L.FRAMEBUFFER,Jt);let ce=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Gc(L,ce,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,bt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,dt),L.deleteBuffer(bt),L.deleteSync(ce),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,V=0){let B=Math.pow(2,-V),k=Math.floor(y.image.width*B),dt=Math.floor(y.image.height*B),gt=D!==null?D.x:0,ut=D!==null?D.y:0;q.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,gt,ut,k,dt),g.unbindTexture()},this.copyTextureToTexture=function(y,D,V=null,B=null,k=0,dt=0){let gt,ut,yt,Mt,Dt,Ft,bt,Jt,ce,oe=y.isCompressedTexture?y.mipmaps[dt]:y.image;if(V!==null)gt=V.max.x-V.min.x,ut=V.max.y-V.min.y,yt=V.isBox3?V.max.z-V.min.z:1,Mt=V.min.x,Dt=V.min.y,Ft=V.isBox3?V.min.z:0;else{let he=Math.pow(2,-k);gt=Math.floor(oe.width*he),ut=Math.floor(oe.height*he),y.isDataArrayTexture?yt=oe.depth:y.isData3DTexture?yt=Math.floor(oe.depth*he):yt=1,Mt=0,Dt=0,Ft=0}B!==null?(bt=B.x,Jt=B.y,ce=B.z):(bt=0,Jt=0,ce=0);let $t=ot.convert(D.format),we=ot.convert(D.type),mt;D.isData3DTexture?(q.setTexture3D(D,0),mt=L.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(q.setTexture2DArray(D,0),mt=L.TEXTURE_2D_ARRAY):(q.setTexture2D(D,0),mt=L.TEXTURE_2D),g.activeTexture(L.TEXTURE0),g.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,D.flipY),g.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),g.pixelStorei(L.UNPACK_ALIGNMENT,D.unpackAlignment);let Be=g.getParameter(L.UNPACK_ROW_LENGTH),Gt=g.getParameter(L.UNPACK_IMAGE_HEIGHT),Ye=g.getParameter(L.UNPACK_SKIP_PIXELS),cn=g.getParameter(L.UNPACK_SKIP_ROWS),Dn=g.getParameter(L.UNPACK_SKIP_IMAGES);g.pixelStorei(L.UNPACK_ROW_LENGTH,oe.width),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe.height),g.pixelStorei(L.UNPACK_SKIP_PIXELS,Mt),g.pixelStorei(L.UNPACK_SKIP_ROWS,Dt),g.pixelStorei(L.UNPACK_SKIP_IMAGES,Ft);let vi=y.isDataArrayTexture||y.isData3DTexture,Kt=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){let he=z.get(y),Nn=z.get(D),Qt=z.get(he.__renderTarget),Un=z.get(Nn.__renderTarget);g.bindFramebuffer(L.READ_FRAMEBUFFER,Qt.__webglFramebuffer),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,Un.__webglFramebuffer);for(let Si=0;Si<yt;Si++)vi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(y).__webglTexture,k,Ft+Si),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(D).__webglTexture,dt,ce+Si)),L.blitFramebuffer(Mt,Dt,gt,ut,bt,Jt,gt,ut,L.DEPTH_BUFFER_BIT,L.NEAREST);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(k!==0||y.isRenderTargetTexture||z.has(y)){let he=z.get(y),Nn=z.get(D);g.bindFramebuffer(L.READ_FRAMEBUFFER,X),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,O);for(let Qt=0;Qt<yt;Qt++)vi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,he.__webglTexture,k,Ft+Qt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,he.__webglTexture,k),Kt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Nn.__webglTexture,dt,ce+Qt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Nn.__webglTexture,dt),k!==0?L.blitFramebuffer(Mt,Dt,gt,ut,bt,Jt,gt,ut,L.COLOR_BUFFER_BIT,L.NEAREST):Kt?L.copyTexSubImage3D(mt,dt,bt,Jt,ce+Qt,Mt,Dt,gt,ut):L.copyTexSubImage2D(mt,dt,bt,Jt,Mt,Dt,gt,ut);g.bindFramebuffer(L.READ_FRAMEBUFFER,null),g.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Kt?y.isDataTexture||y.isData3DTexture?L.texSubImage3D(mt,dt,bt,Jt,ce,gt,ut,yt,$t,we,oe.data):D.isCompressedArrayTexture?L.compressedTexSubImage3D(mt,dt,bt,Jt,ce,gt,ut,yt,$t,oe.data):L.texSubImage3D(mt,dt,bt,Jt,ce,gt,ut,yt,$t,we,oe):y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,dt,bt,Jt,gt,ut,$t,we,oe.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,dt,bt,Jt,oe.width,oe.height,$t,oe.data):L.texSubImage2D(L.TEXTURE_2D,dt,bt,Jt,gt,ut,$t,we,oe);g.pixelStorei(L.UNPACK_ROW_LENGTH,Be),g.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Gt),g.pixelStorei(L.UNPACK_SKIP_PIXELS,Ye),g.pixelStorei(L.UNPACK_SKIP_ROWS,cn),g.pixelStorei(L.UNPACK_SKIP_IMAGES,Dn),dt===0&&D.generateMipmaps&&L.generateMipmap(mt),g.unbindTexture()},this.initRenderTarget=function(y){z.get(y).__webglFramebuffer===void 0&&q.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?q.setTextureCube(y,0):y.isData3DTexture?q.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?q.setTexture2DArray(y,0):q.setTexture2D(y,0),g.unbindTexture()},this.resetState=function(){W=0,H=0,K=null,g.reset(),ft.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Bt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Bt._getUnpackColorSpace()}};function Mh(i,t,e){return i<t?t:i>e?e:i}function bh(i){return i<=0?0:i>=1?1:i*i*(3-2*i)}function Rg(i){let t=i>>>0,e=()=>{t|=0,t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n^=n+Math.imul(n^n>>>7,61|n),((n^n>>>14)>>>0)/4294967296};return e.next=()=>{let n=e();return n===1?1.5-n:n*2-1},e}function Se(i,t){return Rg((i^2654435769)+(t<<6|t>>>4))()}var By=new Float32Array(8);function gi(i){let t=2166136261;for(let e=0;e<i.length;e++)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Ds(i){let t=Math.round(Math.max(0,i));return String(t)}var Fa=1;function wl(i){return i===null||typeof i!="object"?JSON.stringify(i):Array.isArray(i)?"["+i.map(wl).join(",")+"]":"{"+Object.keys(i).sort().map(e=>JSON.stringify(e)+":"+wl(i[e])).join(",")+"}"}function Oa(i){let t=Object.assign({},i);return gi(wl(t))>>>0}var Fe=[{id:"core",name:"Pendulum Core",links:["workshop","observatory"]},{id:"workshop",name:"Gearwright Workshop",links:["core","foundry","gallery"]},{id:"observatory",name:"Starlens Observatory",links:["core","aviary"]},{id:"foundry",name:"Brass Foundry",links:["workshop","cistern"]},{id:"gallery",name:"Chronicle Gallery",links:["workshop","greenhouse"]},{id:"aviary",name:"Windup Aviary",links:["observatory","greenhouse"]},{id:"cistern",name:"Mainspring Cistern",links:["foundry","greenhouse"]},{id:"greenhouse",name:"Copper Greenhouse",links:["gallery","aviary","cistern"]}];function $i(i){for(let t=0;t<Fe.length;t++)if(Fe[t].id===i)return t;return-1}function Ig(i,t){let e=Fe[$i(i)];return!!e&&e.links.indexOf(t)>=0}function wh(i,t){if(i===t)return[i];let e={},n=[i];for(e[i]=null;n.length;){let s=n.shift(),r=Fe[$i(s)];for(let a of r.links)if(!(a in e)){if(e[a]=s,a===t){let o=[t],l=s;for(;l;)o.unshift(l),l=e[l];return o}n.push(a)}}return null}var Pg=["Alder","Blythe","Corin","Dessa","Emmet","Farra","Gosse","Hilde","Ivo","Juniper","Kett","Lumen"],bl=["Wind the mainspring","Polish the starlens","Balance the escapement","Refill the oil globes","Sort chronicle plates","Tune the whistle pipes","Feed the windup finches","Bleed the steam valves","Align the pendulum","Patch the bellows","Chart the brass tides","Rewind the dumbwaiter"];function Ba(i){let t=i.seed>>>0||1,e=i.playerCount!=null?i.playerCount:6,n=i.saboteurCount!=null?i.saboteurCount:1,s=i.taskCount!=null?i.taskCount:8,r=i.meetingsPerPlayer!=null?i.meetingsPerPlayer:1,a=[];for(let u=0;u<e;u++)a.push(u);for(let u=a.length-1;u>0;u--){let h=Math.floor(Se(t,1e3+u)*(u+1)),m=a[u];a[u]=a[h],a[h]=m}let o={};for(let u=0;u<n;u++)o[a[u]]=!0;let l=[];for(let u=0;u<e;u++)l.push({id:"p"+u,name:i.names&&i.names[u]?i.names[u]:Pg[u],role:o[u]?"saboteur":"crew",ai:u!==0,alive:!0,room:Fe[u%Fe.length].id});let c=[];for(let u=0;u<s;u++){let h=Math.floor(Se(t,2e3+u)*Fe.length),m=Math.floor(Se(t,3e3+u)*bl.length);c.push({id:"t"+u,room:Fe[h].id,label:bl[(m+u)%bl.length],done:!1,doneBy:null})}let d={};for(let u of l)d[u.id]=r;return{v:Fa,seed:t,sessionId:i.sessionId||"s"+t.toString(36),tick:0,elapsedTicks:0,phase:"play",players:l,tasks:c,bodies:[],meeting:null,meetingsLeft:d,cooldowns:{},elimCooldown:i.elimCooldown!=null?i.elimCooldown:8,goals:{timeLimit:i.timeLimit||null,moveLimit:i.moveLimit||null,par:i.par||Math.max(30,s*6+e*4)},moveCounts:{},invalidTotal:0,invalidBy:{},stats:{tasksBy:{},correctVotes:{},eliminations:{}},winner:null,winReason:null,seen:[],log:[],startedAt:i.startedAt||0}}function je(i,t){for(let e of i.players)if(e.id===t)return e;return null}function Ns(i){return i.players.filter(t=>t.alive)}function Ah(i){return i.players.filter(t=>t.alive&&t.role==="crew")}function Ch(i){return i.players.filter(t=>t.alive&&t.role==="saboteur")}function Rh(i){return i.tasks.filter(t=>!t.done).length}function Lg(i,t){i.invalidTotal+=1,i.invalidBy[t]=(i.invalidBy[t]||0)+1}function qe(i,t,e){i.log.push({tick:i.tick,kind:t,text:e})}function Tl(i,t){if(i.phase==="over")return[];let e=je(i,t);if(!e||!e.alive)return[];let n=[];if(i.phase==="meeting"){if(i.meeting&&!(t in i.meeting.votes)){for(let r of Ns(i))n.push({type:"vote",choice:r.id});n.push({type:"vote",choice:"skip"})}return n}let s=Fe[$i(e.room)];for(let r of s.links)n.push({type:"move",room:r});if(e.role==="crew")for(let r of i.tasks)!r.done&&r.room===e.room&&n.push({type:"task",task:r.id});else if((i.cooldowns[e.id]||0)<=i.tick){let a=Ns(i).filter(l=>l.id!==e.id&&l.room===e.room),o=a.filter(l=>l.role!=="saboteur");for(let l of a)l.role==="crew"&&o.length===1&&n.push({type:"eliminate",target:l.id})}for(let r of i.bodies)if(!r.reported&&r.room===e.room){n.push({type:"report",body:r.id});break}return(i.meetingsLeft[e.id]||0)>0&&n.push({type:"call"}),n.push({type:"wait"}),n}function Th(i){if(i.phase==="over")return;let t=Ch(i).length,e=Ah(i).length;if(i.goals.timeLimit!=null&&i.elapsedTicks>i.goals.timeLimit){i.phase="over",i.winner="saboteurs",i.winReason="time_limit",qe(i,"end","The station clock ran out. The saboteurs prevail.");return}if(i.goals.moveLimit!=null){let s=0;for(let r of Object.keys(i.moveCounts))s+=i.moveCounts[r];if(s>i.goals.moveLimit){i.phase="over",i.winner="saboteurs",i.winReason="move_limit",qe(i,"end","Too many wasted motions. The saboteurs prevail.");return}}if(Rh(i)===0){i.phase="over",i.winner="crew",i.winReason="tasks_complete",qe(i,"end","Every task is complete. The crew restores the station.");return}if(i.players.some(s=>s.role==="saboteur")&&t===0){i.phase="over",i.winner="crew",i.winReason="saboteurs_ejected",qe(i,"end","All saboteurs have been voted out. The crew prevails.");return}t>=e&&(i.phase="over",i.winner="saboteurs",i.winReason="parity",qe(i,"end","The saboteurs hold the council. The station falls silent."))}function ka(i,t){let e=JSON.parse(JSON.stringify(i));try{if(!t||typeof t!="object")return{ok:!1,reason:"malformed_command"};if(typeof t.id!="string"||t.id.length===0||t.id.length>64)return{ok:!1,reason:"bad_command_id"};if(typeof t.type!="string")return{ok:!1,reason:"missing_type"};if(typeof t.player!="string")return{ok:!1,reason:"missing_player"};if(e.seen.indexOf(t.id)>=0)return{ok:!1,reason:"duplicate_command"};let n=je(e,t.player);if(!n)return{ok:!1,reason:"unknown_player"};if(e.phase==="over")return{ok:!1,reason:"game_over"};if(!n.alive)return{ok:!1,reason:"player_dead"};e.tick+=1,e.seen.push(t.id),e.phase==="play"&&(e.elapsedTicks+=1);let s=r=>(Lg(e,t.player),{ok:!1,reason:r,state:e});if(e.phase==="meeting"){if(t.type!=="vote")return s("phase_locked");if(!e.meeting)return s("no_meeting");if(t.player in e.meeting.votes)return s("already_voted");let r=t.choice;return r!=="skip"&&!(je(e,r)&&je(e,r).alive)?s("bad_vote_target"):(e.meeting.votes[t.player]=r,qe(e,"vote",n.name+" voted."),Object.keys(e.meeting.votes).length>=Ns(e).length&&Dg(e),Th(e),{ok:!0,state:e})}switch(t.type){case"move":{if(typeof t.room!="string"||$i(t.room)<0)return s("bad_room");if(!Ig(n.room,t.room))return s("not_linked");e.moveCounts[n.id]=(e.moveCounts[n.id]||0)+1,n.room=t.room,qe(e,"move",n.name+" moved to "+Fe[$i(t.room)].name+".");break}case"task":{if(n.role!=="crew")return s("not_crew");let r=e.tasks.filter(a=>a.id===t.task)[0];if(!r)return s("bad_task");if(r.done)return s("task_done");if(r.room!==n.room)return s("wrong_room");r.done=!0,r.doneBy=n.id,e.stats.tasksBy[n.id]=(e.stats.tasksBy[n.id]||0)+1,qe(e,"task",n.name+" completed: "+r.label+".");break}case"eliminate":{if(n.role!=="saboteur")return s("not_saboteur");if((e.cooldowns[n.id]||0)>e.tick)return s("cooldown");let r=je(e,t.target);if(!r||!r.alive)return s("bad_target");if(r.room!==n.room)return s("wrong_room");if(r.role!=="crew")return s("bad_target");if(Ns(e).filter(o=>o.room===n.room&&o.role==="crew").length!==1)return s("witnessed");r.alive=!1,e.bodies.push({id:"b"+e.bodies.length,player:r.id,room:r.room,reported:!1}),e.cooldowns[n.id]=e.tick+e.elimCooldown,e.stats.eliminations[n.id]=(e.stats.eliminations[n.id]||0)+1,qe(e,"eliminate","Something went quiet in the "+Fe[$i(r.room)].name+".");break}case"report":{let r=e.bodies.filter(a=>a.id===t.body)[0];if(!r)return s("bad_body");if(r.reported)return s("already_reported");if(r.room!==n.room)return s("wrong_room");r.reported=!0,e.suspicion=e.suspicion||{};for(let a of Ns(e))a.id!==n.id&&a.room===r.room&&(e.suspicion[a.id]=(e.suspicion[a.id]||0)+1);Eh(e,"report",n.id);break}case"call":{if((e.meetingsLeft[n.id]||0)<=0)return s("no_meetings_left");e.meetingsLeft[n.id]-=1,Eh(e,"emergency",n.id);break}case"wait":{qe(e,"wait",n.name+" waited.");break}default:return s("unknown_type")}return Th(e),{ok:!0,state:e}}catch{return{ok:!1,reason:"internal_error"}}}function Eh(i,t,e){i.phase="meeting",i.meeting={reason:t,by:e,votes:{}};let n=je(i,e);qe(i,"meeting",(t==="report"?"An incident was reported by ":"An emergency chime was rung by ")+(n?n.name:e)+".")}function Dg(i){let t={};for(let o of Object.keys(i.meeting.votes)){let l=i.meeting.votes[o];t[l]=(t[l]||0)+1}let e=null,n=0,s=!1;for(let o of Object.keys(t).sort())t[o]>n?(e=o,n=t[o],s=!1):t[o]===n&&(s=!0);let r=Object.keys(i.meeting.votes).length,a=null;if(e&&e!=="skip"&&!s&&n>r/2){let o=je(i,e);if(o&&o.alive){o.alive=!1,a=o,i.bodies.push({id:"b"+i.bodies.length,player:o.id,room:o.room,reported:!0});for(let l of Object.keys(i.meeting.votes)){let c=je(i,l);c&&c.role==="crew"&&i.meeting.votes[l]===o.id&&o.role==="saboteur"&&(i.stats.correctVotes[l]=(i.stats.correctVotes[l]||0)+1)}qe(i,"eject",o.name+" was ejected from the station. "+(o.role==="saboteur"?"A saboteur is unmasked.":"They were loyal crew."))}}else qe(i,"eject","No one was ejected.");i.phase="play",i.meeting=null}function Ua(i,t,e){return Se(i.seed^gi(t),(i.tick+1)*131+e*17)}function El(i,t,e){let n=Tl(i,t);if(!n.length)return null;let s=je(i,t);if(i.phase==="meeting"){let l=n.filter(u=>u.type==="vote"&&u.choice!=="skip"),c=Ua(i,t,7),d="skip";if(s.role==="saboteur"){let u=l.filter(h=>je(i,h.choice).role==="crew");u.length&&(d=u[Math.floor(c*u.length)].choice)}else{let u=i.suspicion||{},h=null,m=0;for(let x of l){let S=u[x.choice]||0;S>m&&(m=S,h=x.choice)}h&&c>.25?d=h:l.length&&c>.9&&(d=l[Math.floor(c*1e3)%l.length].choice)}return{id:e,type:"vote",player:t,choice:d}}let r=n.filter(l=>l.type==="report")[0];if(r)return{id:e,type:"report",player:t,body:r.body};if(s.role==="saboteur"){let l=n.filter(c=>c.type==="eliminate");if(l.length&&Ua(i,t,3)>.55)return{id:e,type:"eliminate",player:t,target:l[0].target}}else{let l=n.filter(c=>c.type==="task")[0];if(l)return{id:e,type:"task",player:t,task:l.task}}let a=n.filter(l=>l.type==="move");if(!a.length)return{id:e,type:"wait",player:t};let o=null;if(s.role==="crew"){let l=null;for(let c of i.tasks){if(c.done)continue;let d=wh(s.room,c.room);d&&(!l||d.length<l.length)&&(l=d)}l&&l.length>1&&(o=l[1])}else{let l=null;for(let c of Ah(i)){let d=wh(s.room,c.room);d&&(!l||d.length<l.length)&&(l=d)}l&&l.length>1&&Ua(i,t,5)>.2&&(o=l[1])}return(!o||!a.some(l=>l.room===o))&&(o=a[Math.floor(Ua(i,t,11)*a.length)].room),{id:e,type:"move",player:t,room:o}}function Ih(i,t){let e=je(i,t);return!e||!i.winner?!1:i.winner===(e.role==="saboteur"?"saboteurs":"crew")}function Ph(i,t){let e=je(i,t),n=(i.stats.tasksBy[t]||0)*10,s=(i.stats.correctVotes[t]||0)*25,r=(i.stats.eliminations[t]||0)*30,a=e&&e.alive&&i.winner?50:0,o=i.goals.par||60,l=Math.max(0,o*2-i.elapsedTicks)|0,c=i.winner&&e&&(i.winner==="crew"&&e.role==="crew"||i.winner==="saboteurs"&&e.role==="saboteur")?100:0,d={tasks:n,votes:s,eliminations:r,survival:a,time:l,winBonus:c},u=0;for(let h of Object.keys(d))u+=d[h];return{total:u|0,parts:d}}var _i=3,Oe=[{id:"brass-dawn",name:"Brass Dawn",sky:1709088,key:16767392,fill:4872842,floor:3813160,accent:16758093},{id:"verdigris",name:"Verdigris Night",sky:793114,key:10485721,fill:2767450,floor:2109740,accent:6217912},{id:"embers",name:"Furnace Embers",sky:1838602,key:16751194,fill:5913130,floor:3350554,accent:16742973},{id:"moonlit",name:"Moonlit Escapement",sky:856608,key:12571903,fill:3820138,floor:2435640,accent:9417983},{id:"porcelain",name:"Porcelain Hour",sky:2106412,key:16773856,fill:6978186,floor:3948616,accent:15918022}],Lh=[{id:"tut-move",title:"Getting Around",rule:"move",seed:41,playerCount:4,saboteurCount:0,taskCount:3,steps:[{text:"Rooms are joined by brass corridors. Select a connected room and move there.",expect:"move"},{text:"Good. Move once more \u2014 the station is yours to explore.",expect:"move"}]},{id:"tut-task",title:"Work of the Crew",rule:"task",seed:42,playerCount:4,saboteurCount:0,taskCount:2,steps:[{text:"Tasks keep the station alive. Stand in a room with an unfinished task and complete it.",expect:"task"}]},{id:"tut-meeting",title:"The Council Convenes",rule:"vote",seed:43,playerCount:4,saboteurCount:1,taskCount:6,steps:[{text:"When the chime rings, the council votes. Cast your vote \u2014 or skip if unsure.",expect:"vote"}]}],Ng=["First Windings","Oil and Ink","The Quiet Cog","Bellwether","Half Past Brass","A Borrowed Gear","The Long Corridor","Finchsong","Steam and Suspicion","The Ninth Chime","Mastery: Pendulum","Cistern Whispers","Two Shadows","The Gallery Watch","Coilspring","A Cold Lens","The Patient Valve","Lantern Drift","Foundry Waltz","Under Pressure","Mastery: Escapement","Static in the Pipes","The Tally","Borrowed Time","Aviary Hush","Three Turnings","The Alibi","Copperroot","Dwindling Hours","False Springs","Mastery: Mainspring","The Narrow Vote","Rush of Steam","Gilt and Guile","The Last Cylinder","Night Shift","Parity","The Silent Council","Full Wind","Mastery: Grand Chime"];function Ug(i){let t=Math.floor(i/8)+1,e=(i+1)%10===0,n=1e3+i*77,s=Math.min(4+Math.floor(i/6),9),r=i<8?1:i<28?1+(i%3===0?1:0):2,a=5+Math.floor(i/3)+(e?3:0),o={seed:n+Math.floor(Se(n,i)*1e3),playerCount:s,saboteurCount:Math.min(r,s-2),taskCount:a,elimCooldown:Math.max(5,10-t)},l=30+a*5+s*3-t*2,c={tasks:a,survive:!0};return i>=16&&i%4===1&&(c.timeLimit=l+40,o.timeLimit=c.timeLimit),i>=24&&i%4===3&&(c.moveLimit=a*4+s*2,o.moveLimit=c.moveLimit),{id:"journey-"+(i+1),index:i,name:Ng[i],version:_i,config:o,seed:o.seed,goals:c,par:l,difficulty:t,mastery:e,mechanics:i<4?["move","task"]:i<12?["move","task","report","vote"]:["move","task","report","vote","call","pressure"],tutorial:i===0,theme:Oe[i%Oe.length].id}}var Us=[];for(let i=0;i<40;i++)Us.push(Ug(i));function Dh(i){let t=i||new Date,e=Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())/864e5,n=(gi("hidden-council-daily")^e*2654435761)>>>0;return{id:"daily-"+e,dayKey:e,name:"Daily Chime "+t.toISOString().slice(0,10),version:_i,seed:n,config:{seed:n,playerCount:7,saboteurCount:2,taskCount:10,elimCooldown:7},goals:{tasks:10,survive:!0},par:90,difficulty:3,mastery:!1,mechanics:["move","task","report","vote","call"],tutorial:!1,theme:Oe[e%Oe.length].id,ranked:!0}}function Nh(i){let t=Math.max(1,Math.min(5,i|0)),e=9e3+t*131;return{id:"practice-d"+t,name:"Practice (Difficulty "+t+")",version:_i,seed:e,config:{seed:e,playerCount:4+t,saboteurCount:t>=3?2:1,taskCount:4+t*2,elimCooldown:11-t},goals:{tasks:4+t*2,survive:!0},par:40+t*12,difficulty:t,mastery:!1,mechanics:["move","task","report","vote"],tutorial:!1,theme:Oe[(t-1)%Oe.length].id,practice:!0}}function Uh(i){let t={"clock-tower":{name:"Beat the Clock",timeLimit:55,moveLimit:null,seed:31001},"short-fuse":{name:"Short Fuse",timeLimit:40,moveLimit:null,seed:31002},"sure-footed":{name:"Sure-Footed",timeLimit:null,moveLimit:46,seed:31003}}[i]||{name:"Challenge",timeLimit:60,moveLimit:null,seed:31e3};return{id:"challenge-"+i,name:"Challenge: "+t.name,version:_i,seed:t.seed,config:{seed:t.seed,playerCount:6,saboteurCount:1,taskCount:8,elimCooldown:8,timeLimit:t.timeLimit,moveLimit:t.moveLimit},goals:{tasks:8,survive:!0,timeLimit:t.timeLimit,moveLimit:t.moveLimit},par:t.timeLimit||70,difficulty:4,mastery:!1,mechanics:["move","task","report","vote","pressure"],tutorial:!1,theme:"embers",challenge:!0}}var Fg=0,Fs=1,za=2,Og=3,xi={core:[0,0],workshop:[-4.2,0],observatory:[4.2,0],foundry:[-6.4,4.2],gallery:[-1.5,4.2],aviary:[5.6,4.2],cistern:[-4.2,8.4],greenhouse:[1.8,8.4]},Fh=[16739179,7067135,16765286,10316799,7077816,16752098,12648299,16753259,9412095,7077859,14876523,12566463],Bg=[15113984,5682409,40563,15787074,29362,13983232,13400487,10066329,6737049,11158681,14535799,8921685],Oh={low:{shadows:!1,particles:0,pixelRatio:1,renderScale:.75,gears:4},medium:{shadows:!0,particles:200,pixelRatio:1.5,renderScale:1,gears:8},high:{shadows:!0,particles:800,pixelRatio:2,renderScale:1,gears:14}},Mn={dist:14,height:12,lookY:0,fov:42},Va=class{constructor(t,e){this.opts=e||{},this.canvas=t,this.visualSeed=e&&e.seed||1,this.reducedMotion=!!(e&&e.reducedMotion),this.cvd=!!(e&&e.cvd),this.disposed=!1,this.pawns=new Map,this.roomMeshes=new Map,this.markers=[],this.gears=[],this.time=0,this.camAnim=null,this.focusRoom="core",this.hidden=!1;let n;try{n=new La({canvas:t,antialias:!0,powerPreference:"high-performance"})}catch{this.failed=!0;return}this.renderer=n,n.outputColorSpace=Ie,n.toneMapping=vs,n.toneMappingExposure=1.05,t.addEventListener("webglcontextlost",s=>{s.preventDefault(),this.contextLost=!0},!1),t.addEventListener("webglcontextrestored",()=>{this.contextLost=!1,this.rebuild()},!1),this.scene=new os,this.camera=new Ae(Mn.fov,1,.1,200),this.camera.layers.enable(Fs),this.camera.layers.enable(za),this.camera.layers.enable(Og),this.raycaster=new ys,this.raycaster.layers.set(Fs),this.setTheme(e&&e.theme||"brass-dawn"),this.buildEnvironment(),this.buildSelectionAids(),this.setQuality(e&&e.tier||"medium"),this.placeCamera("core",!0),this.lastFrame=0,this.animate=this.animate.bind(this),this.raf=requestAnimationFrame(this.animate)}setTheme(t){let e=Oe.find(a=>a.id===t)||Oe[0];if(this.theme=e,this.scene.background=new Nt(e.sky),this.lights)for(let a of this.lights)this.scene.remove(a);let n=new Hi(e.key,2.4);n.position.set(6,10,4),n.castShadow=!0,n.shadow.mapSize.set(1024,1024),n.shadow.camera.left=-14,n.shadow.camera.right=14,n.shadow.camera.top=14,n.shadow.camera.bottom=-14;let s=new _s(e.fill,e.sky,.9),r=new Hi(e.accent,.5);r.position.set(-5,6,-8),this.lights=[n,s,r];for(let a of this.lights)a.layers.enableAll(),this.scene.add(a)}buildEnvironment(){let t=this.theme,e=new Ze;e.layers.set(Fg);let n=new ee(new gn(22,.4,18),new $e({color:t.floor,roughness:.85,metalness:.35}));n.position.set(0,-.2,4),n.receiveShadow=!0,e.add(n);for(let l of Fe){let[c,d]=xi[l.id],u=new ee(new Yn(1.7,1.9,.35,8),new $e({color:new Nt(t.floor).offsetHSL(0,.05,.09),roughness:.6,metalness:.5}));u.position.set(c,.18,d),u.receiveShadow=!0,u.castShadow=!0,u.userData.roomId=l.id,u.layers.enable(Fs),e.add(u),this.roomMeshes.set(l.id,u);let h=new ee(new Jn(1.75,.07,8,24),new $e({color:t.accent,roughness:.4,metalness:.8,emissive:t.accent,emissiveIntensity:.15}));h.rotation.x=Math.PI/2,h.position.set(c,.36,d),e.add(h)}let s=new Set;for(let l of Fe){let[c,d]=xi[l.id];for(let u of l.links){let h=[l.id,u].sort().join("|");if(s.has(h))continue;s.add(h);let[m,x]=xi[u],S=m-c,p=x-d,f=Math.hypot(S,p)-3,A=new ee(new gn(.9,.14,f),new $e({color:t.accent,roughness:.5,metalness:.7}));A.position.set((c+m)/2,.12,(d+x)/2),A.rotation.y=Math.atan2(S,p),e.add(A)}}let r=new $e({color:9071162,roughness:.35,metalness:.9}),a=14;for(let l=0;l<a;l++){let c=8+Math.floor(Se(this.visualSeed,l)*6),d=.4+Se(this.visualSeed,50+l)*.7,u=this.makeGear(d,c,.12,r),h=l%4,m=h===0?-10:h===1?10:Se(this.visualSeed,100+l)*20-10,x=h<2?Se(this.visualSeed,200+l)*16-4:h===2?-3:12;u.position.set(m,.6+Se(this.visualSeed,300+l)*1.6,x),u.rotation.x=Math.PI/2,u.userData.spin=(Se(this.visualSeed,400+l)-.5)*1.6,u.userData.maxTier=l<4?"low":l<8?"medium":"high",this.gears.push(u),e.add(u)}let o=new $e({color:6969930,roughness:.5,metalness:.8});for(let l=0;l<6;l++){let c=new ee(new Yn(.12,.12,16,10),o);c.rotation.z=Math.PI/2,c.position.set(0,.3+l*.28,-4.2-l%2*.3),e.add(c)}this.envGroup=e,this.scene.add(e)}makeGear(t,e,n,s){let r=new Ze,a=new ee(new Yn(t,t,n,24),s);r.add(a);for(let l=0;l<e;l++){let c=new ee(new gn(t*.28,n,t*.24),s),d=l/e*Math.PI*2;c.position.set(Math.cos(d)*t*1.08,0,Math.sin(d)*t*1.08),c.rotation.y=-d,r.add(c)}let o=new ee(new Yn(t*.25,t*.25,n*1.6,12),s);return r.add(o),r}buildSelectionAids(){this.marker=new ee(new Jn(.55,.06,8,24),new qn({color:16777215,transparent:!0,opacity:.9})),this.marker.rotation.x=Math.PI/2,this.marker.layers.set(za),this.marker.visible=!1,this.scene.add(this.marker),this.previews=new Ze,this.previews.layers.set(za),this.scene.add(this.previews)}pawnColor(t){return(this.cvd?Bg:Fh)[t%Fh.length]}syncState(t){let e=new Set;t.players.forEach((n,s)=>{e.add(n.id);let r=this.pawns.get(n.id);r||(r=this.makePawn(s,n.id),this.pawns.set(n.id,r),this.scene.add(r.group));let[a,o]=xi[n.room],c=t.players.filter(h=>h.alive&&h.room===n.room).indexOf(n)/7*Math.PI*2,d=a+Math.cos(c)*.8,u=o+Math.sin(c)*.8;r.target.set(d,n.alive?.4:.12,u),r.group.visible=!0,r.body.material.opacity=n.alive?1:.35,r.body.rotation.z=n.alive?0:Math.PI/2});for(let[n,s]of this.pawns)e.has(n)||(this.scene.remove(s.group),this.pawns.delete(n))}makePawn(t,e){let n=new Ze,s=this.pawnColor(t),r=new ee(new fs(.22,.4,6,14),new $e({color:s,roughness:.35,metalness:.25,transparent:!0}));r.castShadow=!0,r.layers.enable(Fs),r.userData.playerId=e,n.add(r);let a=new $e({color:14271098,roughness:.3,metalness:.9}),o=new ee(new Jn(.12,.035,6,12),a);o.position.y=.62,n.add(o),n.userData.playerId=e;let l=new F;return{group:n,body:r,key:o,target:l,id:e}}select(t){if(!this.pawns.get(t)){this.marker.visible=!1,this.selected=null;return}this.selected=t,this.marker.visible=!0}showLegalTargets(t){for(;this.previews.children.length;)this.previews.remove(this.previews.children[0]);for(let e of t){let[n,s]=xi[e],r=new ee(new Jn(.4,.05,8,20),new qn({color:this.theme.accent,transparent:!0,opacity:.75}));r.rotation.x=Math.PI/2,r.position.set(n,.42,s),r.layers.set(za),this.previews.add(r)}}pick(t,e){if(this.failed||this.contextLost)return null;this.raycaster.setFromCamera({x:t,y:e},this.camera),this.raycaster.layers.set(Fs);let n=this.raycaster.intersectObjects(this.scene.children,!0);for(let s of n){let r=s.object;if(r.userData.playerId)return{kind:"pawn",id:r.userData.playerId};if(r.userData.roomId)return{kind:"room",id:r.userData.roomId}}return null}roomScreenPos(t){let[e,n]=xi[t],s=new F(e,.6,n).project(this.camera);return{x:(s.x*.5+.5)*this.canvas.clientWidth,y:(-s.y*.5+.5)*this.canvas.clientHeight}}fitScale(t,e){let n=this.camera.aspect||1,s=Math.tan(Mn.fov*Math.PI/180/2),r=1,a=.82,o=typeof document!="undefined"?document:null;if(o&&this.canvas.clientWidth){let u=this.canvas.clientWidth,h=0,m=0;for(let[x,S]of[[".hc-rail-left","l"],[".hc-rail-right","r"]]){let p=o.querySelector(x);if(!p)continue;let f=getComputedStyle(p);if(f.visibility==="hidden"||f.display==="none"||f.transform!=="none")continue;let A=p.getBoundingClientRect();A.width<u*.4&&(S==="l"?h=A.width/u:m=A.width/u)}r=Math.max(.4,1-h-m-.04)}let l=Math.hypot(Mn.height,Mn.dist*.55),c=t/(s*n*r),d=e*.72/(s*a);return Math.max(1,c/l,d/l)}placeCamera(t,e){let[n,s]=xi[t]||[0,0];this.focusRoom=t,this.overview=!1;let r=new F(n*.55,Mn.lookY,s*.55+2.5),a=this.fitScale(6.2,4.2),o=new F(r.x,Mn.height*a,r.z+Mn.dist*.55*a);this.moveCamera(o,r,e)}placeOverview(t){this.overview=!0;let e=new F(-.3,Mn.lookY,4.4),n=this.fitScale(8.4,6.2)*1.05,s=new F(e.x,Mn.height*n,e.z+Mn.dist*.55*n);this.moveCamera(s,e,t)}toggleOverview(){return this.overview?this.placeCamera(this.focusRoom||"core",!1):this.placeOverview(!1),!!this.overview}moveCamera(t,e,n){n||this.reducedMotion?(this.camera.position.copy(t),this.camera.lookAt(e),this.camAnim=null,this.camLook=e.clone()):this.camAnim={from:this.camera.position.clone(),to:t,fromLook:(this.camLook||e).clone(),toLook:e,t:0,dur:.7}}resetCamera(){this.placeCamera(this.focusRoom||"core",!1)}refitCamera(){this.overview?this.placeOverview(!0):this.placeCamera(this.focusRoom||"core",!0)}setQuality(t){let e=Oh[t]||Oh.medium;this.tier=t,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,e.pixelRatio));let n=this.renderer.shadowMap.enabled!==e.shadows;this.renderer.shadowMap.enabled=e.shadows,this.renderer.shadowMap.type=di,n&&this.scene.traverse(s=>{s.material&&(Array.isArray(s.material)?s.material:[s.material]).forEach(r=>{r.needsUpdate=!0})}),this.renderScale=e.renderScale;for(let s of this.gears){let r={low:0,medium:1,high:2};s.visible=r[s.userData.maxTier]<=r[t]}this.resize()}resize(){let t=this.canvas.clientWidth||window.innerWidth,e=this.canvas.clientHeight||window.innerHeight,n=this.renderScale||1;this.renderer.setSize(Math.floor(t*n),Math.floor(e*n),!1),this.canvas.style.width="100%",this.canvas.style.height="100%",this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.focusRoom&&this.refitCamera()}rebuild(){this.resize()}setHidden(t){this.hidden=t}animate(){if(this.disposed)return;if(this.raf=requestAnimationFrame(this.animate),this.hidden||this.failed||this.contextLost){this.lastFrame=0;return}let t=performance.now()/1e3,e=Math.min(this.lastFrame?t-this.lastFrame:0,.1);if(this.lastFrame=t,this.time+=e,this.camAnim){this.camAnim.t+=e/this.camAnim.dur;let s=bh(Mh(this.camAnim.t,0,1));this.camera.position.lerpVectors(this.camAnim.from,this.camAnim.to,s),this.camLook=this.camAnim.fromLook.clone().lerp(this.camAnim.toLook,s),this.camera.lookAt(this.camLook),this.camAnim.t>=1&&(this.camAnim=null)}for(let s of this.pawns.values()){s.group.position.lerp(s.target,this.reducedMotion?1:Math.min(1,e*6));let r=this.selected===s.id?.22:0;s.body.position.y+=(r+(this.reducedMotion?0:Math.sin(this.time*2+s.group.id)*.02)-s.body.position.y)*.2,this.reducedMotion||(s.key.rotation.y+=e*2)}let n=this.selected&&this.pawns.get(this.selected);if(n&&(this.marker.position.set(n.group.position.x,.05,n.group.position.z),this.marker.material.opacity=.6+(this.reducedMotion?.2:Math.sin(this.time*4)*.25)),!this.reducedMotion)for(let s of this.gears)s.visible&&(s.rotation.z+=s.userData.spin*e);this.renderer.render(this.scene,this.camera)}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.scene.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(e=>e.dispose())}),this.renderer&&this.renderer.dispose()}};var Ga=class{constructor(t,e){this.root=t,this.app=e,this.focusMemory=null,this.build()}el(t,e,n){let s=document.createElement(t);return e&&(s.className=e),n!=null&&(s.textContent=n),s}button(t,e,n){let s=this.el("button","btn "+(e||""),t);return s.type="button",s.addEventListener("click",n),s}build(){this.root.innerHTML="",this.root.className="hc-root",this.canvasWrap=this.el("div","hc-canvas-wrap"),this.canvas=this.el("canvas","hc-canvas"),this.canvas.setAttribute("aria-label","Clockwork research station playfield"),this.canvasWrap.appendChild(this.canvas),this.live=this.el("div","sr-only"),this.live.setAttribute("aria-live","polite"),this.live.setAttribute("role","status"),this.screenLayer=this.el("div","hc-screens"),this.hud=this.el("div","hc-hud"),this.hud.hidden=!0,this.root.append(this.canvasWrap,this.hud,this.screenLayer,this.live),this.buildHud()}announce(t){this.live.textContent="",this.live.textContent=t}buildHud(){this.hud.innerHTML="",this.hudLeft=this.el("aside","hc-rail hc-rail-left"),this.hudLeft.setAttribute("aria-label","Objective and progress"),this.hudRight=this.el("aside","hc-rail hc-rail-right"),this.hudRight.setAttribute("aria-label","Actions"),this.hudTop=this.el("header","hc-topbar"),this.objectiveEl=this.el("h2","hc-objective","Objective"),this.progressEl=this.el("div","hc-progress"),this.logEl=this.el("ol","hc-log"),this.logEl.setAttribute("aria-label","Station log"),this.hudLeft.append(this.objectiveEl,this.progressEl,this.logEl),this.actorEl=this.el("div","hc-actor"),this.actorEl.setAttribute("aria-live","polite"),this.actionsEl=this.el("div","hc-actions"),this.hudRight.append(this.actorEl,this.actionsEl);let t=this.button("\u23F8 Pause","hc-pause",()=>this.app.pauseGame());t.setAttribute("aria-keyshortcuts","Escape");let e=(s,r,a)=>{let o=this.button(s,"hc-drawer-toggle",()=>{let l=r.classList.toggle("open");a.classList.remove("open"),o.setAttribute("aria-expanded",String(l))});return o.setAttribute("aria-expanded","false"),o};this.drawerLeftBtn=e("\u2630 Log",this.hudLeft,this.hudRight),this.drawerRightBtn=e("Actions \u25B8",this.hudRight,this.hudLeft);let n=this.button("\u2316 Map","hc-map",()=>{let s=this.app.renderer;if(!s)return;let r=s.toggleOverview();n.setAttribute("aria-pressed",String(r))});n.setAttribute("aria-pressed","false"),n.title="Toggle station overview / room view",this.hudTop.append(t,n,this.drawerLeftBtn,this.el("span","hc-caption"),this.drawerRightBtn),this.captionEl=this.hudTop.querySelector(".hc-caption"),this.hud.append(this.hudTop,this.hudLeft,this.hudRight)}showHud(t){this.hud.hidden=!t}updateHud(t,e,n){this.objectiveEl.textContent=n?n.name:"Hidden Council";let s=t.tasks.filter(c=>c.done).length,r=t.players.filter(c=>c.alive).length,a=`Tasks ${s}/${t.tasks.length} \xB7 ${r} aboard \xB7 tick ${t.tick}`;if(t.goals.timeLimit!=null&&(a+=` \xB7 ${Math.max(0,t.goals.timeLimit-t.elapsedTicks)} ticks left`),t.goals.moveLimit!=null){let c=0;for(let d of Object.keys(t.moveCounts))c+=t.moveCounts[d];a+=` \xB7 ${Math.max(0,t.goals.moveLimit-c)} moves left`}this.progressEl.textContent=a,this.actorEl.textContent=t.phase==="meeting"?"Council in session \u2014 cast your vote":t.phase==="over"?"Session over":"Your move",this.actionsEl.innerHTML="";let o=e||[],l=(c,d,u)=>{let h=this.button(c,"hc-action",d);u&&h.setAttribute("aria-keyshortcuts",u),this.actionsEl.appendChild(h)};for(let c of o)if(c.type==="move"){let d=c.room;l("Go: "+kg(d),()=>this.app.humanAct({type:"move",room:d}))}else c.type==="task"?l("Do: "+zg(t,c.task),()=>this.app.humanAct({type:"task",task:c.task})):c.type==="report"?l("\u26A0 Report incident",()=>this.app.humanAct({type:"report",body:c.body})):c.type==="eliminate"?l("Eliminate "+Bh(t,c.target),()=>this.app.humanAct({type:"eliminate",target:c.target})):c.type==="call"?l("Ring the chime",()=>this.app.humanAct({type:"call"})):c.type==="vote"&&l(c.choice==="skip"?"Vote: skip":"Vote: "+Bh(t,c.choice),()=>this.app.humanAct({type:"vote",choice:c.choice}));o.some(c=>c.type==="wait")&&l("Wait",()=>this.app.humanAct({type:"wait"}),"Space"),this.app.session&&this.app.session.practice&&l("\u21A9 Undo (U)",()=>this.app.undo(),"u"),l("\u{1F4A1} Hint (H)",()=>this.app.hint(),"h"),this.logEl.innerHTML="";for(let c of t.log.slice(-7)){let d=this.el("li","hc-log-"+c.kind,c.text);this.logEl.appendChild(d)}}caption(t){this.captionEl.textContent=t,clearTimeout(this._capT),this._capT=setTimeout(()=>{this.captionEl.textContent=""},2500)}showScreen(t,e){if(e!==!1&&(this.focusMemory=document.activeElement),this.screenLayer.innerHTML="",t){this.screenLayer.appendChild(t),this.screenLayer.hidden=!1;let n=t.querySelector("button, [tabindex], input, select");n&&n.focus()}else this.screenLayer.hidden=!0,this.focusMemory&&this.focusMemory.focus&&this.focusMemory.focus(),this.focusMemory=null}screen(t){let e=this.el("section","hc-screen");e.setAttribute("role","dialog"),e.setAttribute("aria-label",t);let n=this.el("h1","hc-title",t);return e.appendChild(n),e}titleScreen(t,e){let n=this.screen("Hidden Council");n.classList.add("hc-screen-title"),n.appendChild(this.el("p","hc-tagline","A clockwork station. A hidden hand. A council of gears."));let s=this.button("\u25B6 Play","hc-play",()=>this.app.showModeSelect());n.appendChild(s);let r=this.el("div","hc-row");r.append(this.button("Daily Chime","",()=>this.app.startDaily()),this.button("Journey","",()=>this.showScreen(this.journeyScreen(t))),this.button("Hosted Play","",()=>this.showScreen(this.hostedScreen())),this.button("Help","",()=>this.showScreen(this.helpScreen()))),n.appendChild(r);let a=this.el("div","hc-profile");if(this.app.platform&&this.app.platform.hosted)a.append(this.el("label","","Tinkerer: "),this.el("strong","",this.app.platform.displayName||"\u2026"),this.el("span","hc-muted",` \xB7 ${t.sessions} sessions \xB7 streak ${t.streak}`),this.el("span","hc-sync",this.app.platform.syncLine()));else{let l=this.el("input","hc-name");l.value=t.profile.name,l.maxLength=24,l.setAttribute("aria-label","Display name"),l.addEventListener("change",()=>{t.profile.name=l.value.trim()||t.profile.name,this.app.persistSave()}),a.append(this.el("label","","Tinkerer: "),l,this.el("span","hc-muted",` \xB7 ${t.sessions} sessions \xB7 streak ${t.streak}`))}n.appendChild(a);let o=this.button("\u2699 Settings","hc-subtle",()=>this.showScreen(this.settingsScreen()));return n.appendChild(o),n}modeSelectScreen(){let t=this.screen("Choose Your Session"),e=[["Tutorial","Learn one rule at a time.",()=>this.showScreen(this.tutorialScreen())],["Journey","40 staged councils, growing pressure.",()=>this.showScreen(this.journeyScreen(this.app.save))],["Daily Chime","One shared seed per UTC day.",()=>this.app.startDaily()],["Practice","Any difficulty. Undo allowed. Unranked.",()=>this.showScreen(this.practiceScreen())],["Challenge","Constrained goals: beat the clock, sure-footed.",()=>this.showScreen(this.challengeScreen())],["Hosted Play","Create or join a room with others.",()=>this.showScreen(this.hostedScreen())]];for(let[n,s,r]of e){let a=this.button(n,"hc-mode",r),o=this.el("div","hc-muted",s),l=this.el("div","hc-mode-wrap");l.append(a,o),t.appendChild(l)}return t.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showTitle())),t}setupScreen(t,e){let n=this.screen(t.name),s=this.el("ul","hc-facts"),r=[["Rules",t.mechanics.join(", ")],["Expected length","~"+Math.max(3,Math.round(t.par/8))+" minutes"],["Players",t.config.playerCount+" ("+t.config.saboteurCount+" saboteur"+(t.config.saboteurCount>1?"s":"")+")"],["Par",t.par+" ticks"],["Difficulty","\u2605".repeat(t.difficulty)],["Ranked",t.ranked?this.app.platform&&this.app.platform.hosted?"Yes \u2014 shown on the read-only platform board":"Yes":"No"]];for(let[c,d]of r){let u=this.el("li","",c+": ");u.appendChild(this.el("strong","",d)),s.appendChild(u)}n.appendChild(s);let a=this.el("label","hc-check"),o=this.el("input");o.type="checkbox",o.checked=!0,a.append(o,document.createTextNode(" Assists (hints + target preview)")),n.appendChild(a);let l=this.button("Begin","hc-play",()=>e(!!o.checked));return n.appendChild(l),n.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showModeSelect())),n}tutorialScreen(){let t=this.screen("Tutorial Lessons");for(let e of Lh){let n=this.app.save.tutorialDone[e.id];t.appendChild(this.button((n?"\u2713 ":"")+e.title,"hc-mode",()=>this.app.startTutorial(e)))}return t.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showModeSelect())),t}journeyScreen(t){let e=this.screen("Journey"),n=this.el("div","hc-journey");for(let s of Us){let r=t.journey[s.id],a=this.button(s.index+1+(s.mastery?" \u25C6":"")+(r?r.won?" \u2713":" \xB7"+Ds(r.score):""),"hc-stage"+(r&&r.won?" won":""),()=>this.showScreen(this.setupScreen(s,o=>this.app.startStage(s,o))));a.title=s.name+" \u2014 difficulty "+s.difficulty,n.appendChild(a)}return e.appendChild(n),e.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showModeSelect())),e}practiceScreen(){let t=this.screen("Practice");t.appendChild(this.el("p","hc-muted","Unranked. Restart and undo are available."));for(let e=1;e<=5;e++)t.appendChild(this.button("Difficulty "+e,"hc-mode",()=>this.app.startPractice(e)));return t.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showModeSelect())),t}challengeScreen(){let t=this.screen("Challenges");return t.appendChild(this.button("Beat the Clock \u2014 55 ticks","hc-mode",()=>this.app.startChallenge("clock-tower"))),t.appendChild(this.button("Short Fuse \u2014 40 ticks","hc-mode",()=>this.app.startChallenge("short-fuse"))),t.appendChild(this.button("Sure-Footed \u2014 46 moves max","hc-mode",()=>this.app.startChallenge("sure-footed"))),t.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showModeSelect())),t}hostedScreen(){let t=this.app.platform&&this.app.platform.hosted,e=this.screen("Hosted Play");if(e.appendChild(this.el("p","hc-muted",t?"Create a council or quick-join an open one. The room is routed by StarHermit; the tab that creates it runs the station.":"Create a private room or quick-join. Works when served by server.js.")),e.appendChild(this.button("Create Room","hc-mode",()=>this.app.hostedCreate())),e.appendChild(this.button("Quick Join","hc-mode",()=>this.app.hostedQuickJoin())),t)e.appendChild(this.el("p","hc-muted","Room codes are a local-play feature \u2014 on-platform, others join with Quick Join."));else{let n=this.el("div","hc-row"),s=this.el("input","hc-name");s.placeholder="ROOM CODE",s.maxLength=6,s.setAttribute("aria-label","Room code"),n.append(s,this.button("Join","",()=>this.app.hostedJoin(s.value))),e.appendChild(n)}return this.lobbyEl=this.el("div","hc-lobby"),e.appendChild(this.lobbyEl),e.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showModeSelect())),e}updateLobby(t){if(!this.lobbyEl)return;this.lobbyEl.innerHTML="",this.lobbyEl.appendChild(this.el("h2","","Room "+t.code));let e=this.el("ul");for(let s of t.seats)e.appendChild(this.el("li","",`${s.name}${s.ai?" (automaton)":""}${s.ready?" \u2014 ready":""}${s.id===t.you||s.you?" \u2190 you":""}`));this.lobbyEl.appendChild(e);let n=this.app.net;n?(n.isHost?this.lobbyEl.append(this.button("Add Automaton","",()=>this.app.hostedAddAi()),this.button("Start","hc-play",()=>this.app.hostedStart())):this.lobbyEl.appendChild(this.button("Ready","",()=>this.app.hostedReady())),this.lobbyEl.appendChild(this.button("Leave Room","hc-subtle",()=>this.app.hostedLeave()))):this.lobbyEl.append(this.button("Add Automaton","",()=>this.app.hostedAddAi()),this.button("Ready","",()=>this.app.hostedReady()),this.button("Start","hc-play",()=>this.app.hostedStart()))}pauseScreen(){let t=this.screen("Paused");return t.appendChild(this.button("\u25B6 Resume","hc-play",()=>this.app.resumeGame())),t.appendChild(this.settingsBlock()),t.appendChild(this.button("Help","",()=>this.showScreen(this.helpScreen(!0)))),t.appendChild(this.button("Leave Session","hc-subtle",()=>this.app.leaveGame())),t}settingsBlock(){let t=this.el("div","hc-settings"),e=this.app.settings,n=(c,d)=>{let u=this.el("label","hc-slider",c+" "),h=this.el("input");return h.type="range",h.min=0,h.max=1,h.step=.05,h.value=e[d],h.setAttribute("aria-label",c),h.addEventListener("input",()=>{e[d]=Number(h.value),this.app.applySettings()}),u.appendChild(h),u};t.append(n("Music","music"),n("Effects","effects"),n("Ambience","ambience"),n("Voice","voice"));let s=this.el("select");s.setAttribute("aria-label","Graphics tier");for(let c of["auto","low","medium","high"]){let d=this.el("option","",c);d.value=c,s.appendChild(d)}s.value=e.tier,s.addEventListener("change",()=>{e.tier=s.value,this.app.applySettings()});let r=this.el("label","hc-slider","Graphics ");r.appendChild(s),t.appendChild(r);let a=this.el("select");a.setAttribute("aria-label","Visual theme");for(let c of Oe){let d=this.el("option","",c.name);d.value=c.id,a.appendChild(d)}a.value=e.theme,a.addEventListener("change",()=>{e.theme=a.value,this.app.applySettings()});let o=this.el("label","hc-slider","Theme ");o.appendChild(a),t.appendChild(o);let l=(c,d)=>{let u=this.el("label","hc-check"),h=this.el("input");return h.type="checkbox",h.checked=!!e[d],h.addEventListener("change",()=>{e[d]=h.checked,this.app.applySettings()}),u.append(h,document.createTextNode(" "+c)),u};return t.append(l("Larger text","largeText"),l("High contrast","highContrast"),l("Color-vision-safe palette","cvdPalette"),l("Reduced motion","reducedMotion"),l("Left-handed controls","leftHanded"),l("Hold to confirm","holdToConfirm"),l("Hints","hints")),t}settingsScreen(){let t=this.screen("Settings");return t.appendChild(this.settingsBlock()),t.appendChild(this.button("Replay Tutorials","",()=>this.showScreen(this.tutorialScreen()))),t.appendChild(this.button("\u2190 Back","hc-subtle",()=>this.app.showTitle())),t}resultsScreen(t,e,n,s){let r=t.playerWon!=null?!!t.playerWon:t.winner==="crew",a=this.screen(r?"The Station Turns Again":"The Gears Fall Silent");a.setAttribute("aria-live","assertive");let o=this.el("img","hc-hero-img");o.src="./assets/council-chamber.webp",o.alt="",o.setAttribute("aria-hidden","true"),o.decoding="async",o.addEventListener("error",()=>{o.remove()}),a.appendChild(o);let l=t.winner==="crew"?"Crew victory":"Saboteur victory";a.appendChild(this.el("p","hc-headline",l+" \u2014 "+Vg(t.winReason)+(t.playerRole?" \xB7 you played "+(t.playerRole==="saboteur"?"a saboteur":"loyal crew"):"")));let c=this.el("table","hc-score");c.appendChild(this.el("caption","","Score breakdown"));for(let[u,h]of Object.entries(t.score.parts)){let m=this.el("tr");m.append(this.el("td","",u),this.el("td","",Ds(h))),c.appendChild(m)}let d=this.el("tr","hc-total");if(d.append(this.el("td","","Total"),this.el("td","",Ds(t.score.total))),c.appendChild(d),a.appendChild(c),n&&n.length){let u=this.el("ul","hc-achievements");for(let h of n)u.appendChild(this.el("li","","\u{1F3C5} "+h.replace(/_/g," ")));a.appendChild(u)}if(s&&s.leaderboard==="loading")a.appendChild(this.el("p","hc-muted","Loading the global board\u2026"));else if(s&&s.leaderboard&&!s.leaderboard.leaderboardId)a.appendChild(this.el("p","hc-muted","No platform leaderboard for this game \u2014 your personal bests travel with your save."));else if(s&&s.leaderboard){a.appendChild(this.el("h2","","Global board"));let u=this.el("ol","hc-board");for(let h of s.leaderboard.entries)u.appendChild(this.el("li",h.you?"hc-you":"",`${h.rank!=null?h.rank+". ":""}${h.name} \u2014 ${Ds(h.score)}${h.you?" (you)":""}`));s.leaderboard.entries.length||u.appendChild(this.el("li","","No entries yet.")),a.appendChild(u)}else s&&s.leaderboard===null&&a.appendChild(this.el("p","hc-muted","Global board unavailable (offline)."));return s&&s.leaderboardError&&a.appendChild(this.el("p","hc-muted","Leaderboard: "+s.leaderboardError)),a.append(this.button("\u21BB Retry","hc-mode",()=>this.app.retry()),this.button("Next Stage","hc-play",()=>this.app.nextStage()),this.button("Copy Replay Hash: "+t.hash.toString(16),"hc-subtle",()=>this.copyText(t.hash.toString(16))),this.button("\u2190 Title","hc-subtle",()=>this.app.leaveGame())),a}copyText(t){let e=n=>{this.caption(n?"Copied: "+t:"Copy failed \u2014 "+t),this.announce(n?"Copied to clipboard":"Copy failed")};try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(()=>e(!0),()=>e(!1));return}}catch{}e(!1)}helpScreen(t){let e=this.screen("How to Play"),n=[["Move","Click a glowing room, press arrow keys to browse, Enter to go. Linked rooms only."],["Tasks","Stand in a room with an unfinished task and choose its action. Finish every task to win as crew."],["Incidents","Find a silenced tinkerer? Report it (\u26A0) to convene the council."],["Voting","During a council, vote to eject a suspect or skip. Majority decides."],["Keys","Enter confirm \xB7 Esc pause/cancel \xB7 U undo (practice) \xB7 H hint \xB7 C camera reset"]];for(let[s,r]of n){let a=this.el("div","hc-card");a.append(this.el("h3","",s),this.el("p","",r)),e.appendChild(a)}return e.appendChild(this.button("\u2190 Back","hc-subtle",()=>{this.showScreen(null),t?this.app.showPause():this.app.showTitle()})),e}};function kg(i){return{core:"Pendulum Core",workshop:"Gearwright Workshop",observatory:"Starlens Observatory",foundry:"Brass Foundry",gallery:"Chronicle Gallery",aviary:"Windup Aviary",cistern:"Mainspring Cistern",greenhouse:"Copper Greenhouse"}[i]||i}function Bh(i,t){let e=i.players.find(n=>n.id===t);return e?e.name:t}function zg(i,t){let e=i.tasks.find(n=>n.id===t);return e?e.label:t}function Vg(i){return{tasks_complete:"all tasks complete",saboteurs_ejected:"saboteurs voted out",parity:"the council was overrun",time_limit:"the clock ran out",move_limit:"too many moves spent"}[i]||i||"session ended"}var Gg={ack:["ui-ack"],reject:["ui-reject"],move:["footstep","footstep-alt"],task:["task-complete"],meeting:["council-bell"],eject:["eject-whoosh"],eliminate:["eliminate-thud"],win:["victory-fanfare"],lose:["defeat-drone"],vote:["vote-token"],tick:["clock-tick"],start:["session-start"],undo:["undo-rewind"],hint:["hint-whisper"],achievement:["achievement-chime"]},Ha=class{constructor(t){this.settings=t,this.ctx=null,this.buses={},this.musicNodes=null,this.ambNodes=null,this.caption=null,this.muted=!1,this.samples=new Map}ensure(){if(this.ctx)return!0;try{let t=window.AudioContext||window.webkitAudioContext;if(!t)return!1;this.ctx=new t;let e=this.ctx.createGain();e.connect(this.ctx.destination),this.master=e;for(let n of["music","effects","ambience","voice"]){let s=this.ctx.createGain();s.gain.value=this.settings[n]!=null?this.settings[n]:.7,s.connect(e),this.buses[n]=s}return this.startAmbience(),this.startMusic(),!0}catch{return!1}}setVolume(t,e){this.buses[t]&&this.buses[t].gain.setTargetAtTime(Math.max(0,Math.min(1,e)),this.ctx.currentTime,.05)}setMuted(t){this.muted=t,this.master&&this.master.gain.setTargetAtTime(t?0:1,this.ctx.currentTime,.05)}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}blip(t,e,n,s,r,a){if(!this.ctx||this.muted)return;let o=a||this.ctx.currentTime,l=this.ctx.createOscillator(),c=this.ctx.createGain();l.type=s||"sine",l.frequency.setValueAtTime(e,o),c.gain.setValueAtTime(0,o),c.gain.linearRampToValueAtTime(r||.2,o+.008),c.gain.exponentialRampToValueAtTime(1e-4,o+n),l.connect(c),c.connect(this.buses[t]||this.master),l.start(o),l.stop(o+n+.02)}chime(t,e,n,s,r){if(!this.ctx||this.muted)return;let a=this.ctx.currentTime;e.forEach((o,l)=>this.blip(t,o,s||.5,"triangle",r||.16,a+l*n))}playSample(t,e){if(!this.ctx||this.muted)return!0;let n=Gg[t];if(!n||!n.length)return!1;let s=n[Math.floor(Se(e||1,7)*n.length)],r=this.samples.get(s);if(r&&r.buffer){let a=this.ctx.createBufferSource();return a.buffer=r.buffer,a.connect(this.buses.effects),a.start(),!0}return r||(this.samples.set(s,{}),fetch("sfx/"+s+".opus").then(a=>{if(!a.ok)throw new Error("http "+a.status);return a.arrayBuffer()}).then(a=>this.ctx?this.ctx.decodeAudioData(a):Promise.reject(new Error("no ctx"))).then(a=>{this.samples.set(s,{buffer:a})}).catch(()=>{this.samples.set(s,{failed:!0})})),!1}event(t,e){if(!this.ensure())return;this.resume();let n=this.playSample(t,e),s=Se(e||1,Date.now()&65535)*.06-.03;switch(t){case"ack":n||this.blip("effects",620*(1+s),.07,"square",.08);break;case"reject":n||this.blip("effects",180,.12,"sawtooth",.1),this.say("Not allowed");break;case"move":n||(this.blip("effects",330*(1+s),.14,"triangle",.14),this.blip("effects",495,.1,"sine",.08));break;case"task":n||this.chime("effects",[523,659,784],.05,.3,.12),this.say("Task complete");break;case"meeting":n||this.chime("voice",[880,660,880,660],.12,.5,.15),this.say("Council convened");break;case"eject":n||this.chime("voice",[440,330,220],.15,.6,.15),this.say("Someone was ejected");break;case"eliminate":n||this.blip("effects",90,.4,"sawtooth",.16),this.say("An incident occurred");break;case"win":n||this.chime("music",[523,659,784,1047],.12,.8,.16),this.say("Victory");break;case"lose":n||this.chime("music",[392,330,262,196],.16,.9,.16),this.say("Defeat");break;case"vote":n||this.blip("voice",700*(1+s),.1,"sine",.12);break;case"tick":n||this.blip("effects",1200,.03,"square",.04);break;case"start":n||this.chime("music",[392,523,659],.1,.7,.14),this.say("Session begins");break;case"undo":n||(this.blip("effects",520,.09,"triangle",.1),this.blip("effects",390,.09,"triangle",.08));break;case"hint":n||this.blip("voice",880*(1+s),.12,"sine",.07);break;case"achievement":n||this.chime("music",[784,988,1319],.08,.5,.13),this.say("Achievement unlocked");break}}say(t){this.caption&&this.caption(t)}startAmbience(){if(!this.ctx||this.ambNodes)return;let t=this.ctx.sampleRate*2,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),n=e.getChannelData(0),s=7;for(let l=0;l<t;l++)s=s*16807%2147483647,n[l]=(s/2147483647*2-1)*.25;let r=this.ctx.createBufferSource();r.buffer=e,r.loop=!0;let a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.value=320;let o=this.ctx.createGain();o.gain.value=.5,r.connect(a),a.connect(o),o.connect(this.buses.ambience),r.start(),this.ambNodes={src:r,g:o}}startMusic(){if(!this.ctx||this.musicNodes)return;let t=[261.6,293.7,329.6,392,440,523.3],e=this.ctx.createGain();e.gain.value=.5,e.connect(this.buses.music);let n=0,s=()=>{if(!this.ctx||this.muted)return;let r=t[Math.floor(Se(99,n)*t.length)];this.blip("music",r,1.4,"sine",.05),n%4===0&&this.blip("music",r/2,1.8,"triangle",.04),n++};this.musicNodes={g:e,interval:setInterval(s,1400)},s()}dispose(){this.musicNodes&&clearInterval(this.musicNodes.interval),this.ctx&&this.ctx.close().catch(()=>{}),this.ctx=null,this.buses={},this.musicNodes=null,this.ambNodes=null}};var kh="hidden-council-save",zh="hidden-council-settings";function Al(i){return gi(JSON.stringify(i))}function Vh(i){return Al(i)}function Hg(i){return{v:1,data:i,sum:Al(i)}}function Cl(){try{let i=localStorage.getItem(kh);if(!i)return Wa();let t=JSON.parse(i);return t.v!==1||Al(t.data)!==t.sum?Wa():t.data}catch{return Wa()}}function Wa(){return{profile:{name:"Guest "+Math.floor(Math.random()*900+100)},journey:{},sessions:0,wins:0,streak:0,bestStreak:0,actionsUsed:[],achievements:{},tutorialDone:{}}}function Gh(i){try{localStorage.setItem(kh,JSON.stringify(Hg(i)))}catch{}}function Hh(i,t){let e=Wa();e.profile=i.profile&&i.profile.name?i.profile:t.profile,e.journey=Object.assign({},t.journey,i.journey);for(let n of Object.keys(t.journey))i.journey[n]&&t.journey[n]&&(e.journey[n]=i.journey[n].score>=t.journey[n].score?i.journey[n]:t.journey[n]);return e.sessions=Math.max(i.sessions||0,t.sessions||0),e.wins=Math.max(i.wins||0,t.wins||0),e.streak=Math.max(i.streak||0,t.streak||0),e.bestStreak=Math.max(i.bestStreak||0,t.bestStreak||0),e.actionsUsed=Array.from(new Set([].concat(i.actionsUsed||[],t.actionsUsed||[]))),e.achievements=Object.assign({},t.achievements,i.achievements),e.tutorialDone=Object.assign({},t.tutorialDone,i.tutorialDone),e}function Wh(){let i={music:.6,effects:.8,ambience:.5,voice:.7,tier:"auto",theme:"brass-dawn",largeText:!1,highContrast:!1,cvdPalette:!1,reducedMotion:!1,leftHanded:!1,holdToConfirm:!1,hints:!0,camera:"default"};try{let t=localStorage.getItem(zh);return t?Object.assign(i,JSON.parse(t)):i}catch{return i}}function Xh(i){try{localStorage.setItem(zh,JSON.stringify(i))}catch{}}function Wg(i,t){let e=[];for(let n of t)i.achievements[n]||(i.achievements[n]=Date.now(),e.push(n));return e}async function qh(i){try{let t=Date.now(),e=i?{authorization:`Bearer ${i}`}:{},n=await fetch("/api/v1/time",{headers:e,cache:"no-store"});if(!n.ok)throw new Error(String(n.status));let s=await n.json(),r=Date.now(),a=typeof s.now=="number"?s.now:s.serverTime;if(typeof a=="number")return{offset:a-Math.round((t+r)/2),rtt:r-t,ok:!0}}catch{}return{offset:0,rtt:0,ok:!1}}var yi=class{constructor(t,e){this.stage=t,this.hooks=e,this.humanId="p0",this.cmdCounter=0,this.undoStack=[],this.state=Ba(Object.assign({},t.config,{sessionId:t.id+"-"+t.seed.toString(36)})),this.initialConfig=Object.assign({},t.config,{sessionId:this.state.sessionId}),this.commands=[],this.paused=!1,this.over=!1,this.aiTimer=null,this.practice=!!t.practice}legal(){return Tl(this.state,this.humanId)}makeCmd(t){return Object.assign({id:"c"+this.state.tick+"-"+this.cmdCounter++,player:this.humanId},t)}act(t){if(this.over||this.paused)return{ok:!1,reason:"not_active"};let e=this.makeCmd(t);return this.commit(e)}commit(t){let e=ka(this.state,t);return e.ok?(this.undoStack.push({state:this.state,commands:this.commands.slice()}),this.undoStack.length>40&&this.undoStack.shift(),this.commands.push(t),this.state=e.state,this.hooks.onState&&this.hooks.onState(this.state,this.newEvents()),this.state.phase==="over"?this.finish():this.scheduleAi(),{ok:!0}):(this.hooks.onReject&&this.hooks.onReject(t,e.reason),this.state=e.state||this.state,{ok:!1,reason:e.reason})}newEvents(){return this.state.log.slice(-4)}undo(){if(!this.practice)return{ok:!1,reason:"undo_not_allowed"};let t=this.undoStack.pop();return t?(this.stopAi(),this.state=t.state,this.commands=t.commands,this.over=this.state.phase==="over",this.hooks.onState&&this.hooks.onState(this.state,[{kind:"undo",text:"Undone."}]),{ok:!0}):{ok:!1,reason:"nothing_to_undo"}}scheduleAi(){if(this.over||this.paused)return;this.stopAi();let t=this.hooks.aiDelayMs!=null?this.hooks.aiDelayMs:500;this.aiTimer=setTimeout(()=>this.stepAi(),t)}stepAi(t){if(this.over||this.paused)return;if(this.hooks.aiGate&&!this.hooks.aiGate()){t||this.scheduleAi();return}let e=0;do{let n=this.state;if(n.phase==="over")break;let s=null;if(n.phase==="meeting"){for(let o of n.players)if(o.ai&&o.alive&&!(o.id in n.meeting.votes)){s=o;break}if(!s)break}else{let o=n.players.filter(l=>l.ai&&l.alive);o.length&&(s=o[n.tick%o.length])}if(!s)break;let r=El(n,s.id,"ai-"+n.tick+"-"+s.id+"-"+this.cmdCounter++);if(!r)break;let a=ka(n,r);if(!a.state){if(++e>50)break;continue}if(this.state=a.state,this.commands.push(r),!a.ok){if(++e>50)break;continue}}while(t&&++e<2e3);if(this.hooks.onState&&this.hooks.onState(this.state,this.newEvents()),this.state.phase==="over"){this.finish();return}t||this.scheduleAi()}skipToEnd(){this.stopAi();let t=0;for(;this.state.phase!=="over"&&t++<4e3;){let e=this.state,n=null;if(e.phase==="meeting"){for(let a of e.players)if(a.alive&&!(a.id in e.meeting.votes)){n=a;break}}else{let a=e.players.filter(o=>o.alive);n=a[t%a.length]}if(!n)break;let s=El(e,n.id,"ff-"+t+"-"+n.id);if(!s)break;let r=ka(e,s);r.state&&(this.state=r.state,this.commands.push(s))}this.hooks.onState&&this.hooks.onState(this.state,this.newEvents()),this.state.phase==="over"&&this.finish()}pause(){this.paused=!0,this.stopAi()}resume(){this.paused=!1,this.over||this.scheduleAi()}stopAi(){this.aiTimer&&(clearTimeout(this.aiTimer),this.aiTimer=null)}result(){let t=Ph(this.state,this.humanId),e=this.state.players.find(n=>n.id===this.humanId);return{winner:this.state.winner,winReason:this.state.winReason,playerRole:e?e.role:"crew",playerWon:Ih(this.state,this.humanId),score:t,hash:Oa(this.state),ticks:this.state.tick,elapsed:this.state.elapsedTicks,invalidTotal:this.state.invalidTotal,sessionId:this.state.sessionId,seed:this.stage.seed,rulesVersion:Fa,contentVersion:_i}}finish(){this.over=!0,this.stopAi(),this.hooks.onEnd&&this.hooks.onEnd(this.result())}recordCompletion(t){let e=this.result();t.sessions+=1;let n=e.playerWon;n?(t.wins+=1,t.streak+=1):t.streak=0,t.bestStreak=Math.max(t.bestStreak,t.streak);for(let r of this.commands)r.player===this.humanId&&t.actionsUsed.push(r.type);if(t.actionsUsed=Array.from(new Set(t.actionsUsed)),this.stage.id&&this.stage.id.startsWith("journey-")){let r=t.journey[this.stage.id];(!r||e.score.total>r.score)&&(t.journey[this.stage.id]={score:e.score.total,won:n})}let s=["first_completion"];return t.actionsUsed.length>=5&&s.push("mechanic_mastery"),t.streak>=3&&s.push("streak_three"),n&&this.stage.difficulty>=5&&s.push("hard_milestone"),t.sessions>=25&&s.push("long_haul"),Wg(t,s)}exportReplay(){return{schema:1,rulesVersion:Fa,contentVersion:_i,seed:this.stage.seed,config:this.initialConfig,initialHash:Oa(Ba(this.initialConfig)),commands:this.commands,finalHash:Oa(this.state)}}};var Xg=(()=>{let i=new Uint32Array(256);for(let t=0;t<256;t++){let e=t;for(let n=0;n<8;n++)e=e&1?3988292384^e>>>1:e>>>1;i[t]=e>>>0}return i})();function qg(i){let t=4294967295;for(let e=0;e<i.length;e++)t=Xg[(t^i[e])&255]^t>>>8;return(t^4294967295)>>>0}function Yg(i,t){let n=new TextEncoder().encode(i),s=qg(t),r=[],a=M=>r.push(M&255,M>>8&255),o=M=>r.push(M&255,M>>8&255,M>>16&255,M>>>24&255);o(67324752),a(20),a(0),a(0),a(0),a(0),o(s),o(t.length),o(t.length),a(n.length),a(0);let l=r.length,c=new Uint8Array(r),d=[],u=M=>d.push(M&255,M>>8&255),h=M=>d.push(M&255,M>>8&255,M>>16&255,M>>>24&255);h(33639248),u(20),u(20),u(0),u(0),u(0),u(0),h(s),h(t.length),h(t.length),u(n.length),u(0),u(0),u(0),u(0),h(0),h(0);let m=new Uint8Array(d),x=c.length+n.length+t.length,S=[c,n,t,m,n],p=[],f=M=>p.push(M&255,M>>8&255,M>>16&255,M>>>24&255),A=M=>p.push(M&255,M>>8&255);f(101010256),A(0),A(0),A(1),A(1),f(m.length+n.length),f(x),A(0),S.push(new Uint8Array(p));let E=S.reduce((M,C)=>M+C.length,0),v=new Uint8Array(E),b=0;for(let M of S)v.set(M,b),b+=M.length;return v}function Jg(i){let t=new DataView(i.buffer,i.byteOffset,i.byteLength),e=0;for(;e+30<=i.length&&t.getUint32(e,!0)===67324752;){let n=t.getUint16(e+8,!0),s=t.getUint32(e+18,!0),r=t.getUint16(e+26,!0),a=t.getUint16(e+28,!0),o=e+30+r+a;if(n!==0)throw new Error("unsupported zip entry");return i.slice(o,o+s)}throw new Error("bad zip")}function Zg(i){let t="";for(let e=0;e<i.length;e+=32768)t+=String.fromCharCode.apply(null,i.subarray(e,e+32768));return btoa(t)}function $g(){var i,t;if(typeof location=="undefined"||typeof history=="undefined")return null;if(location.hash.length>1)try{let e=new URLSearchParams(location.hash.slice(1)),n=e.get("game_token");if(n){e.delete("game_token"),e.delete("session_id");let s=e.toString();return history.replaceState(null,"",location.pathname+location.search+(s?`#${s}`:"")),n}}catch{}try{let e=new URLSearchParams(location.search),n=(t=(i=e.get("token"))!=null?i:e.get("launch"))!=null?t:e.get("launch_token");return n&&history.replaceState(null,"",location.pathname+location.hash),n}catch{return null}}function Kg(i){try{let e=i.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=atob(e+"=".repeat((4-e.length%4)%4)),s=JSON.parse(n);return s&&typeof s=="object"?s:null}catch{return null}}var Yh=2700*1e3,jg=60*1e3,Qg=2e3,Xa=class{constructor(){var t,e;this.token=$g(),this.claims=this.token?Kg(this.token):null,this.sub=typeof((t=this.claims)==null?void 0:t.sub)=="string"?this.claims.sub:null,this.gameSlug=typeof((e=this.claims)==null?void 0:e.game_scope)=="string"?this.claims.game_scope:null,this.nickname=null,this.syncStatus="offline",this.onSync=null,this._profileCache=new Map,this._cloudTimer=null,this._refreshTimer=null,this.token&&(this._scheduleRefresh(Yh),this._installCloudFlush())}get hosted(){return!!this.token}get displayName(){return this.nickname?this.nickname:this.sub?"Player "+this.sub.slice(0,8):null}accountLine(){var t;return this.hosted?`Playing as ${(t=this.displayName)!=null?t:"\u2026"} \xB7 ${this.syncLine()}`:""}syncLine(){var e;return`cloud save ${(e={saving:"saving\u2026",synced:"synced",offline:"offline"}[this.syncStatus])!=null?e:"offline"}`}_setSync(t){var e;this.syncStatus!==t&&(this.syncStatus=t,(e=this.onSync)==null||e.call(this,t))}async api(t,e={}){if(!this.token)throw new Error("offline");let n=Object.assign({},e.headers||{});return n.authorization=`Bearer ${this.token}`,e.body&&!n["content-type"]&&(n["content-type"]="application/json"),fetch(t,Object.assign({},e,{headers:n}))}_scheduleRefresh(t){var e,n;typeof setTimeout!="undefined"&&(clearTimeout(this._refreshTimer),this._refreshTimer=setTimeout(()=>this.refreshToken(),t),(n=(e=this._refreshTimer).unref)==null||n.call(e))}async refreshToken(){if(!(!this.token||!this.gameSlug))try{let t=await this.api(`/api/v1/games/${encodeURIComponent(this.gameSlug)}/launch-token`,{method:"POST"});if(!t.ok)throw new Error(String(t.status));let e=await t.json();e&&typeof e.token=="string"&&e.token&&(this.token=e.token),this._scheduleRefresh(Yh)}catch{this._scheduleRefresh(jg)}}async profileFor(t){if(this._profileCache.has(t))return this._profileCache.get(t);let e=null;if(this.token)try{let s=await this.api(`/api/v1/users/${encodeURIComponent(t)}/profile`);s.ok&&(e=await s.json())}catch{}let n=e&&typeof e.nickname=="string"&&e.nickname.trim()?e.nickname.trim():`Player ${String(t).slice(0,8)}`;return this._profileCache.set(t,n),n}async fetchProfile(){return this.sub?(this.nickname=await this.profileFor(this.sub),this.nickname):null}async fetchPlatformLeaderboard({page:t=0,pageSize:e=10,friendsOnly:n=!1}={}){var s,r,a,o,l,c,d,u,h;if(!this.token||!this.gameSlug)return null;try{let m=await this.api(`/api/v1/games/${encodeURIComponent(this.gameSlug)}`);if(!m.ok)return null;let x=await m.json(),S=(s=x==null?void 0:x.leaderboardId)!=null?s:null,p={me:(r=x==null?void 0:x.me)!=null?r:null,leaderboardId:S,entries:[]};if(!S)return p;let f=`?friendsOnly=${n?"true":""}&page=${t}&pageSize=${e}`,A=await this.api(`/api/v1/leaderboards/${encodeURIComponent(S)}/entries${f}`);if(!A.ok)return p;let E=await A.json(),v=Array.isArray(E)?E:(a=E==null?void 0:E.entries)!=null?a:[];p.entries=[];for(let b of v){let M=(l=(o=b==null?void 0:b.userId)!=null?o:b==null?void 0:b.playerId)!=null?l:null;p.entries.push({userId:M,name:M?await this.profileFor(M):(c=b==null?void 0:b.name)!=null?c:"Player",score:(d=b==null?void 0:b.score)!=null?d:0,rank:(u=b==null?void 0:b.rank)!=null?u:null,you:!!M&&M===this.sub})}return p.me==null&&!Array.isArray(E)&&(p.me=(h=E==null?void 0:E.me)!=null?h:null),p}catch{return null}}_installCloudFlush(){if(typeof window=="undefined"||typeof document=="undefined")return;let t=()=>{this._cloudTimer&&(clearTimeout(this._cloudTimer),this._cloudTimer=null,this._pushCloudSave(!0))};window.addEventListener("pagehide",t),document.addEventListener("visibilitychange",()=>{document.hidden&&t()})}_queueCloudSave(){var t,e;!this.token||!this.gameSlug||(this._setSync("saving"),clearTimeout(this._cloudTimer),this._cloudTimer=setTimeout(()=>{this._cloudTimer=null,this._pushCloudSave(!1)},Qg),(e=(t=this._cloudTimer).unref)==null||e.call(t))}async _pushCloudSave(t){if(!(!this.token||!this.gameSlug||!this._saveDoc))try{let e=new TextEncoder().encode(JSON.stringify(this._saveDoc)),n=Yg("save.json",e),s=await fetch(`/api/v1/me/cloud-saves/${encodeURIComponent(this.gameSlug)}`,{method:"PUT",headers:{authorization:`Bearer ${this.token}`,"content-type":"application/json"},body:JSON.stringify({dataBase64:Zg(n)}),keepalive:t});this._setSync(s.ok?"synced":"offline")}catch{this._setSync("offline")}}async cloudLoad(){if(!this.token||!this.gameSlug)return null;let t=await this.api(`/api/v1/me/cloud-saves/${encodeURIComponent(this.gameSlug)}`);if(t.status===404)return this._setSync("synced"),null;if(!t.ok)throw new Error(String(t.status));let e=new Uint8Array(await t.arrayBuffer()),n=JSON.parse(new TextDecoder().decode(Jg(e)));if(!n||n.v!==1||typeof n.sum!="number"||!n.data)throw new Error("bad save doc");return this._setSync("synced"),n}syncSave(t){this.hosted&&(this._saveDoc=t,this._queueCloudSave())}async initHosted(){if(!this.hosted)return null;try{await this.fetchProfile()}catch{}try{return await this.cloudLoad()}catch{return null}}};var Rl=16,jh=8192,Jh=4096,t0=40,Zh=16,$h=12,Kh=4;function qa(i){return!i||!Array.isArray(i.log)||i.log.length<=Zh?i:Object.assign({},i,{log:i.log.slice(-Zh)})}function e0(i){let t=new TextEncoder().encode(JSON.stringify(i));return t.byteLength>jh?null:t}function n0(i){let t="";for(let e of i)t+=e.toString(16).padStart(2,"0");return t}var Ya=class{constructor(t,e){this.platform=t,this.hooks=e||{},this.ws=null,this.connected=!1,this.room=null,this.isHost=!1,this.myParticipantId=null,this.seats=[],this.sim=null,this._reconnects=0,this._lastInputAt=0,this._hostParticipantId=null}get active(){return!!this.room}get inGame(){return!!this.sim}get myName(){return this.platform.displayName||"Player"}_caption(t){var e,n;(n=(e=this.hooks).onCaption)==null||n.call(e,t)}_api(t,e){return this.platform.api(t,e)}_emit(t){var e,n;(n=(e=this.hooks).onMessage)==null||n.call(e,t)}async createRoom(){var n,s;let t=await this._api("/api/v1/realtime/rooms",{method:"POST",body:JSON.stringify({teamCount:1,seatsPerTeam:$h,aiPlayers:0,metadata:{gameSlug:this.platform.gameSlug,mode:"council"}})});if(!t.ok)throw new Error("rooms-unavailable");let e=await t.json();if(this.room=(s=(n=e==null?void 0:e.id)!=null?n:e==null?void 0:e.roomId)!=null?s:null,!this.room)throw new Error("rooms-unavailable");this.isHost=!0,this.seats=[{id:"seat:host",name:this.myName,ai:!1,ready:!0,userId:this.platform.sub,participantId:this.myParticipantId||void 0}],await this._api(`/api/v1/realtime/rooms/${encodeURIComponent(this.room)}/open`,{method:"POST"}).catch(r=>{}),await this._connectWs(),this._broadcastRoom()}async quickJoin(){var n,s,r,a;let t=await this._api("/api/v1/realtime/rooms/quick-join",{method:"POST",body:JSON.stringify({gameSlug:this.platform.gameSlug,seats:1})});if(t.status===404)return this._caption("No open councils \u2014 create one and others can quick-join."),!1;if(!t.ok)throw new Error("rooms-unavailable");let e=await t.json();if(this.room=(a=(r=(n=e==null?void 0:e.roomId)!=null?n:e==null?void 0:e.id)!=null?r:(s=e==null?void 0:e.room)==null?void 0:s.id)!=null?a:null,!this.room)throw new Error("rooms-unavailable");return this.isHost=!1,this.seats=[],await this._connectWs(),this._sendControl({op:"ready"}),!0}async friends(){var t;try{let e=await this._api("/api/v1/me/friends");if(!e.ok)return[];let n=await e.json();return Array.isArray(n)?n:(t=n==null?void 0:n.friends)!=null?t:[]}catch{return[]}}_wsUrl(){return`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws/v1/realtime?roomId=${encodeURIComponent(this.room)}&access_token=${encodeURIComponent(this.platform.token)}`}_connectWs(){return this.ws&&this.ws.readyState<=1?Promise.resolve():new Promise((t,e)=>{let n=new WebSocket(this._wsUrl());n.binaryType="arraybuffer";let s=()=>e(new Error("connect-failed"));n.onerror=s,n.onclose=()=>{let r=this.connected;this.connected=!1,r&&this.room&&this._scheduleReconnect()},n.onopen=()=>{this.connected=!0,this._reconnects=0,this.ws=n,this.isHost||this._sendControl({op:"ready"}),t()},n.onmessage=r=>this._onMessage(r)})}_scheduleReconnect(){if(this._reconnects>=5){this._emit({type:"error",error:"connection lost"});return}let t=Math.min(8e3,500*2**this._reconnects++);this._caption("Reconnecting\u2026"),setTimeout(()=>{this._api("/api/v1/realtime/rooms/mine").then(async e=>{var r,a,o,l;if(!e.ok)throw new Error(String(e.status));let n=await e.json(),s=(l=(o=(r=n==null?void 0:n.roomId)!=null?r:n==null?void 0:n.id)!=null?o:(a=n==null?void 0:n.room)==null?void 0:a.id)!=null?l:null;if(!s)throw new Error("not-in-room");this.room=s,await this._connectWs(),this._caption("Reconnected."),this.isHost&&this.sim&&this._broadcastState()}).catch(e=>this._scheduleReconnect())},t)}_sendControl(t){var n;let e=JSON.stringify(t);e.length>Jh||((n=this.ws)==null?void 0:n.readyState)===1&&this.ws.send(e)}_sendGameMsg(t){var n;let e=e0(t);if(!e){this._caption("Message too large for the room channel.");return}((n=this.ws)==null?void 0:n.readyState)===1&&this.ws.send(e)}sendCommand(t){if(this.isHost)return;let e=Date.now();e-this._lastInputAt<t0||(this._lastInputAt=e,this._sendGameMsg({type:"command",command:t}))}leave(){var e;let t=this.room;this._stopSim(),this.seats=[],this._hostParticipantId=null,this.room=null,this.isHost=!1;try{(e=this.ws)==null||e.close()}catch{}this.ws=null,this.connected=!1,t&&this._api(`/api/v1/realtime/rooms/${encodeURIComponent(t)}/leave`,{method:"POST"}).catch(n=>{})}addAi(){if(!this.isHost||this.sim)return;if(this.seats.length>=$h){this._caption("The council is full.");return}let t=this.seats.filter(e=>e.ai).length+1;this.seats.push({id:"ai:"+t,name:"Automaton "+t,ai:!0,ready:!0}),this._broadcastRoom()}setReady(){this.isHost||this._sendControl({op:"ready"})}start(){if(!this.isHost||this.sim)return;if(this.seats.length<Kh){this._caption("Need at least "+Kh+" seats to convene the council.");return}let t=Math.random()*2**31>>>0,e=this.seats.map(r=>r.name),n=this.hooks;this.sim=new yi({id:"hosted",seed:t,config:{seed:t,playerCount:this.seats.length,saboteurCount:1,taskCount:8,names:e}},{aiDelayMs:450,onState:(r,a)=>{var o;this._broadcastState(),(o=n.onAuthorityState)==null||o.call(n,r,a)},onReject:(r,a)=>{var o;return(o=n.onAuthorityReject)==null?void 0:o.call(n,a)},onEnd:r=>this._finish(r)}),this.sim.state.players.forEach((r,a)=>{r.ai=!!this.seats[a].ai}),this.sim.humanId="p0";let s={type:"started",state:qa(this.sim.state),seats:this._startedSeats()};this._sendGameMsg(s),this._onGuestGameMsg(s)}_startedSeats(){return this.seats.map((t,e)=>({id:t.id,name:t.name,ai:!!t.ai,playerId:"p"+e,userId:t.userId,participantId:t.participantId}))}_broadcastRoom(){let t={type:"room",code:String(this.room||"").slice(0,6).toUpperCase(),roomId:this.room,seats:this.seats.map(e=>({id:e.id,name:e.name,ai:!!e.ai,ready:!0})),you:this.isHost?"seat:host":this._mySeatId()};this._sendControl(t),this._emit(t)}_mySeatId(){let t=this.platform.sub,e=this.seats.find(n=>n.userId&&t&&n.userId===t)||this.seats.find(n=>n.participantId&&this.myParticipantId&&n.participantId===this.myParticipantId);return e?e.id:null}_broadcastState(){this.sim&&this._sendGameMsg({type:"state",state:qa(this.sim.state)})}_finish(t){var s,r,a;let e=this.sim;if(!e)return;this._stopSim();let n={type:"results",state:qa(e.state),result:t};this._sendGameMsg(n),this.isHost&&this._onGuestGameMsg(n),this.room&&this._api(`/api/v1/realtime/rooms/${encodeURIComponent(this.room)}/result`,{method:"POST",body:JSON.stringify({result:{winner:(s=t==null?void 0:t.winner)!=null?s:null,score:(a=(r=t==null?void 0:t.score)==null?void 0:r.total)!=null?a:null}})}).catch(o=>{})}_stopSim(){this.sim&&(this.sim.stopAi(),this.sim=null)}_applyGuestCommand(t){if(!this.sim||!t||typeof t!="object")return;this.sim.commit(t).ok||this._broadcastState()}_onMessage(t){if(typeof t.data=="string")return this._onControl(t.data);let e=new Uint8Array(t.data);if(e.byteLength<=Rl)return;let n=n0(e.slice(0,Rl)),s=e.slice(Rl);if(s.byteLength>jh)return;let r;try{r=JSON.parse(new TextDecoder().decode(s))}catch{return}!r||typeof r!="object"||(this.isHost?this._onHostGameMsg(n,r):this._onGuestGameMsg(r))}_onGuestGameMsg(t){t.type==="started"&&this._resolveYou(t),t.type==="room"&&this._resolveYou(t),this._emit(t)}_resolveYou(t){let e=this.platform.sub,n=Array.isArray(t.seats)?t.seats:[],s=n.find(r=>r.userId&&e&&r.userId===e)||n.find(r=>r.participantId&&this.myParticipantId&&r.participantId===this.myParticipantId);for(let r of n)r.you=!!(s&&r===s);s&&(t.you=s.id)}_onHostGameMsg(t,e){e.type==="command"&&e.command&&this._applyGuestCommand(e.command)}_onControl(t){var s,r,a;if(t.length>Jh)return;let e;try{e=JSON.parse(t)}catch{return}if(!e||typeof e!="object")return;if(typeof e.op=="string")return this._onOp(e);let n=(a=(r=(s=e.participants)!=null?s:e.roster)!=null?r:e.members)!=null?a:Array.isArray(e)?e:null;Array.isArray(n)&&this._onRoster(n),typeof e.type=="string"&&(e.type==="room"&&!this.isHost?this._onGuestGameMsg(e):e.type==="error"&&this._emit(e))}_onOp(t){var e;switch(t.op){case"ready":this.isHost&&(this.sim?this._sendGameMsg({type:"snapshot",state:qa(this.sim.state),away:[]}):this._broadcastRoom());break;case"chat":{let n=String((e=t.text)!=null?e:"").slice(0,200).trim();if(!n)return;this.isHost&&this._sendControl({op:"chat",from:"Councillor",text:n}),this._emit({type:"chat",from:"Councillor",text:n});break}case"error":this._emit({type:"error",error:t.error||"room error"});break;default:break}}async _onRoster(t){var o,l,c,d,u,h,m,x,S,p,f,A;let e=t.filter(E=>E&&typeof E=="object"),n=this.platform.sub,s=e.find(E=>E.you||E.self)||e.find(E=>{var v,b;return((v=E.userId)!=null?v:E.user_id)&&n&&((b=E.userId)!=null?b:E.user_id)===n});if(s){let E=(l=(o=s.participantId)!=null?o:s.id)!=null?l:null;E!=null&&(this.myParticipantId=String(E))}if(!this.isHost){if(!this._hostParticipantId){let E=e.find(v=>v.host||v.isHost);if(E)this._hostParticipantId=String((d=(c=E.participantId)!=null?c:E.id)!=null?d:"");else{let v=e.find(b=>{var _,w,R,I;let M=String((w=(_=b.participantId)!=null?_:b.id)!=null?w:""),C=((R=b.userId)!=null?R:b.user_id)!=null?String((I=b.userId)!=null?I:b.user_id):null;return M&&M!==this.myParticipantId&&!(C&&n&&C===n)});v&&(this._hostParticipantId=String((h=(u=v.participantId)!=null?u:v.id)!=null?h:""))}}this._hostParticipantId&&!e.some(E=>{var v,b;return String((b=(v=E.participantId)!=null?v:E.id)!=null?b:"")===this._hostParticipantId})&&(this._emit({type:"host_left"}),this.leave());return}if(this.myParticipantId){let E=this.seats.find(v=>v.id==="seat:host");E&&(E.participantId=this.myParticipantId)}let r=new Set;for(let E of e){let v=String((x=(m=E.participantId)!=null?m:E.id)!=null?x:"");if(!v)continue;let b=((S=E.userId)!=null?S:E.user_id)!=null?String((p=E.userId)!=null?p:E.user_id):null;if(b&&n&&b===n){this.myParticipantId=v;continue}r.add(v);let M=this.seats.find(C=>C.participantId===v);if(!M){let C=((A=(f=E.nickname)!=null?f:E.name)!=null?A:E.displayName)||null;M={id:"seat:"+v,name:C||(b?`Player ${b.slice(0,8)}`:"Councillor "+(this.seats.length+1)),ai:!1,ready:!0,userId:b||void 0,participantId:v},this.seats.push(M),b&&this.platform.profileFor(b).then(_=>{_&&M.name!==_&&(M.name=_,this.sim||this._broadcastRoom())}).catch(_=>{})}}let a=this.seats.length;this.seats=this.seats.filter(E=>E.ai||E.id==="seat:host"||r.has(E.participantId)),!this.sim&&a!==this.seats.length&&this._broadcastRoom()}};var Il=class{constructor(t){this.phase="boot",this.platform=new Xa,this.save=Cl(),this.settings=Wh(),this.ui=new Ga(t,this),this.audio=new Ha(this.settings),this.audio.caption=e=>this.ui.caption(e),this.renderer=null,this.session=null,this.stage=null,this.serverOffset=0,this.ws=null,this.net=null,this.hostedSeatId=null,this.focusIndex=0,this.applyAccessibilityClasses(),this.bindGlobalInput(),this.bindLifecycle(),qh(this.platform.token).then(e=>{this.serverOffset=e.offset}),this.platform.hosted&&this.initHosted(),this.webglAvailable()&&(this.phase="title"),this.showTitle()}initHosted(){return this.platform.onSync=()=>{this.phase==="title"&&this.showTitle()},this.platform.initHosted().then(t=>{t&&(this.save=Hh(t.data,Cl())),this.platform.displayName&&(this.save.profile.name=this.platform.displayName),this.persistSave(),this.phase==="title"&&this.showTitle()})}webglAvailable(){try{let t=document.createElement("canvas");return!!(t.getContext("webgl2")||t.getContext("webgl"))}catch{return!1}}persistSave(){Gh(this.save),this.platform.syncSave({v:1,data:this.save,sum:Vh(this.save)})}hostedActive(){return this.ws&&this.ws.readyState===1||!!(this.net&&this.net.inGame)}showTitle(){this.phase="title",this.ui.showHud(!1),this.teardownRenderer(),this.ui.showScreen(this.ui.titleScreen(this.save,this.settings))}showModeSelect(){this.phase="mode-select",this.ui.showScreen(this.ui.modeSelectScreen())}showPause(){this.ui.showScreen(this.ui.pauseScreen())}startStage(t,e){if(this.stage=t,this.assists=e,this.phase="preparing",this.ui.showScreen(null),this.session=new yi(t,{aiDelayMs:this.settings.reducedMotion?200:450,aiGate:()=>!this.tutorial||this.tutorial.step>=this.tutorial.def.steps.length||!!this.tutorial.humanActed,onState:(n,s)=>this.onState(n,s),onReject:(n,s)=>this.onReject(s),onEnd:n=>this.onEnd(n)}),!this.webglAvailable()){this.ui.showScreen(this.compatScreen());return}this.buildRenderer(t),this.countdown()}compatScreen(){let t=this.ui.screen("Compatibility Notice");return t.appendChild(this.ui.el("p","","WebGL is unavailable in this browser. The 3D station cannot be shown, but your progress is safe. You can still play using the action buttons.")),t.appendChild(this.ui.button("Continue (2D controls)","hc-play",()=>this.countdown())),t.appendChild(this.ui.button("\u2190 Title","hc-subtle",()=>this.showTitle())),t}buildRenderer(t){if(this.teardownRenderer(),this.renderer=new Va(this.ui.canvas,{seed:t.seed,theme:this.settings.theme==="auto"?t.theme:this.settings.theme,reducedMotion:this.settings.reducedMotion,cvd:this.settings.cvdPalette,tier:this.settings.tier==="auto"?"medium":this.settings.tier}),this.renderer.failed){this.renderer=null;return}this.renderer.syncState(this.session.state),this.bindCanvasInput()}teardownRenderer(){this.renderer&&(this.renderer.dispose(),this.renderer=null)}countdown(){this.phase="countdown",this.ui.showHud(!0),this.ui.announce("Session starting"),this.onState(this.session.state,[]);let t=3,e=()=>{this.phase==="countdown"&&(t>0?(this.ui.caption(String(t)),this.audio.event("tick",t),t--,this._cdTimer=setTimeout(e,this.settings.reducedMotion?250:600)):(this.phase="active",this.audio.event("start",this.stage?this.stage.seed:1),this.ui.announce("Go. "+(this.stage.tutorialText||"Complete the station tasks.")),this.session.scheduleAi()))};e()}startTutorial(t){let e={id:t.id,name:"Tutorial: "+t.title,seed:t.seed,config:{seed:t.seed,playerCount:t.playerCount,saboteurCount:t.saboteurCount,taskCount:t.taskCount},goals:{tasks:t.taskCount},par:60,difficulty:1,mechanics:[t.rule],theme:Oe[0].id,practice:!0};this.tutorial={def:t,step:0},this.pendingStepText=t.steps[0].text,this.startStage(e,!0)}startDaily(){this.startStage(Dh(new Date(Date.now()+this.serverOffset)),!0)}startPractice(t){this.startStage(Nh(t),!0)}startChallenge(t){this.startStage(Uh(t),!0)}retry(){this.stage&&this.startStage(this.stage,this.assists)}nextStage(){if(this.stage&&this.stage.id&&this.stage.id.startsWith("journey-")){let t=Us[this.stage.index+1];if(t){this.ui.showScreen(this.ui.setupScreen(t,e=>this.startStage(t,e)));return}}this.showModeSelect()}pauseGame(){this.phase==="active"&&(this.phase="paused",this.session&&this.session.pause(),this.showPause(),this.ui.announce("Paused"))}resumeGame(){this.phase="active",this.session&&this.session.resume(),this.ui.showScreen(null),this.ui.announce("Resumed")}leaveGame(){if(this.hostedSession=!1,this.session&&(this.session.pause(),this.session=null),this.ws){try{this.ws.close()}catch{}this.ws=null}this.net&&(this.net.leave(),this.net=null),this.showTitle()}onState(t,e){if(this.renderer){this.renderer.syncState(t);let n=this.session?this.session.humanId:"p0",s=t.players.find(a=>a.id===n);s&&s.room!==this.renderer.focusRoom&&this.renderer.placeCamera(s.room,!1);let r=this.session?this.session.legal():[];this.renderer.select(n),this.renderer.showLegalTargets(this.settings.hints&&this.assists?r.filter(a=>a.type==="move").map(a=>a.room):[])}this.session&&this.ui.updateHud(t,this.session.legal(),this.stage);for(let n of e){if(!n||!n.kind)continue;let r={move:"move",task:"task",meeting:"meeting",eject:"eject",eliminate:"eliminate",vote:"vote",end:null,wait:null}[n.kind];r&&this.audio.event(r,t.seed+t.tick),["meeting","eject","eliminate","end"].includes(n.kind)&&this.ui.announce(n.text)}this.tutorial&&this.checkTutorialStep()}checkTutorialStep(){let t=this.tutorial;if(!t)return;let e=t.def.steps;if(t.step>=e.length)return;let n=this.session.commands.filter(s=>s.player===this.session.humanId).pop();n&&n.type===e[t.step].expect?(t.step++,t.humanActed=!1,this.audio.event("ack",5),t.step>=e.length?(this.save.tutorialDone[t.def.id]=!0,this.persistSave(),this.ui.announce("Lesson complete: "+t.def.title),this.ui.caption("Lesson complete! Keep playing or leave.")):this.ui.announce(e[t.step].text)):this.ui.announce(e[t.step].text)}onReject(t){this.audio.event("reject",3);let e="Cannot do that: "+t.replace(/_/g," ");this.ui.caption(e),this.ui.announce(e)}humanAct(t){if(!(!this.session||this.phase!=="active")){if(this.tutorial&&(this.tutorial.humanActed=!0),this.audio.event("ack",1),this.net&&this.net.connected){this.net.isHost?this.session.act(t):this.net.sendCommand(this.session.makeCmd(t));return}if(this.ws&&this.ws.readyState===1){let e=this.session.makeCmd(t);this.ws.send(JSON.stringify({type:"command",command:e}));return}this.session.act(t)}}undo(){if(!this.session)return;let t=this.session.undo();t.ok?this.audio.event("undo",4):this.onReject(t.reason)}hint(){if(!this.session)return;let t=this.session.legal();if(!t.length){this.ui.caption("No actions right now.");return}let e=t.find(s=>s.type==="report")||t.find(s=>s.type==="task")||t.find(s=>s.type==="vote")||t[0],n={move:"Try moving toward a room with unfinished work.",task:"A task is ready here \u2014 complete it.",report:"Report the incident to convene the council.",vote:"Weigh the log and cast your vote.",eliminate:"An opportunity\u2026",call:"You can ring the emergency chime.",wait:"Waiting lets the station tick forward."}[e.type];this.ui.caption("Hint: "+n),this.ui.announce("Hint: "+n),this.audio.event("hint",2)}onEnd(t){this.phase="resolving";let e=!!t.playerWon;if(this.session&&!this.hostedSession){let n=this.session.recordCompletion(this.save);if(this.persistSave(),this.platform.hosted){this.phase="results",this.audio.event(e?"win":"lose",9),n&&n.length&&setTimeout(()=>this.audio.event("achievement",11),700),this.ui.showScreen(this.ui.resultsScreen(t,this.stage,n,{leaderboard:"loading"})),this.platform.fetchPlatformLeaderboard().then(s=>{if(this.phase!=="results")return;let r=s&&s.entries&&s.entries.length?{leaderboard:s}:{leaderboard:null};this.ui.showScreen(this.ui.resultsScreen(t,this.stage,[],r))});return}this.submitScore(t,s=>{this.phase="results",this.audio.event(e?"win":"lose",9),n&&n.length&&setTimeout(()=>this.audio.event("achievement",11),700),this.ui.showScreen(this.ui.resultsScreen(t,this.stage,n,{leaderboardError:s}))})}else this.phase="results",this.audio.event(e?"win":"lose",9),this.ui.showScreen(this.ui.resultsScreen(t,this.stage,[],{}))}submitScore(t,e){if(this.stage&&this.stage.practice)return e(null);try{fetch("/api/v1/scores",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:this.save.profile.name,score:t.score.total,seed:t.seed|0,rulesVersion:t.rulesVersion,contentVersion:t.contentVersion,assists:!!this.assists,durationMs:Math.max(1e3,t.elapsed*600),daily:!!(this.stage&&this.stage.id.startsWith("daily-"))})}).then(n=>n.json()).then(n=>e(n&&n.error?n.error:null)).catch(()=>e("offline"))}catch{e("offline")}}onHostedMessage(t){if(!(!t||typeof t.type!="string")){if(t.type==="room"&&(t.you&&(this.hostedSeatId=t.you),this.ui.updateLobby(t)),t.type==="started"){this.stage={id:"hosted",name:"Hosted Council",seed:t.state.seed,config:t.state,goals:{tasks:t.state.tasks.length},par:80,difficulty:3,theme:this.settings.theme},this.hostedSession=!0,this.net&&this.net.isHost&&this.net.sim?this.session=this.net.sim:(this.session=new yi({id:"hosted",seed:t.state.seed,config:{seed:t.state.seed,playerCount:t.state.players.length,saboteurCount:1,taskCount:t.state.tasks.length}},{onState:(n,s)=>this.onState(n,s),onReject:n=>this.onReject(n),onEnd:n=>this.onEnd(n)}),this.session.stopAi());let e=(t.seats||[]).find(n=>n.you)||(t.seats||[]).find(n=>n.id===this.hostedSeatId);this.session.humanId=e&&e.playerId?e.playerId:"p0",this.ui.showScreen(null),this.buildRenderer(this.stage),this.phase="active",this.ui.showHud(!0),this.applyHostedState(t.state,["The session begins."])}t.type==="state"&&this.applyHostedState(t.state,[]),t.type==="snapshot"&&this.applyHostedState(t.state,t.away&&t.away.length?["While you were away:"].concat(t.away):[]),t.type==="rejected"&&this.onReject(t.reason),t.type==="results"&&(this.applyHostedState(t.state,[]),this.phase!=="results"&&this.session&&this.onEnd(this.session.result())),t.type==="host_left"&&(this.ui.caption("The host left \u2014 the session has ended."),this.leaveGame()),t.type==="error"&&this.ui.caption("Server: "+t.error)}}_makeNet(){return new Ya(this.platform,{onMessage:t=>this.onHostedMessage(t),onCaption:t=>this.ui.caption(t),onAuthorityState:(t,e)=>{this.session&&this.net&&this.session===this.net.sim&&this.onState(t,e)},onAuthorityReject:t=>this.onReject(t)})}hostedConnect(t){if(this.ws&&this.ws.readyState===1)return t();let e=location.protocol==="https:"?"wss":"ws";try{this.ws=new WebSocket(e+"://"+location.host+"/ws")}catch{this.ui.caption("Hosted play requires server.js");return}this.ws.onopen=t,this.ws.onerror=()=>this.ui.caption("Connection failed \u2014 is server.js running?"),this.ws.onmessage=n=>{let s;try{s=JSON.parse(n.data)}catch{return}this.onHostedMessage(s)}}applyHostedState(t,e){this.session&&(this.net&&this.net.isHost&&this.session===this.net.sim||(this.session.state=t),this.onState(this.session.state,e.map(n=>({kind:"meeting",text:n}))),this.session.state.phase==="over"&&this.phase!=="results"&&this.session.finish())}hostedCreate(){if(this.platform.hosted){this.net=this._makeNet(),this.net.createRoom().catch(t=>{this.ui.caption("Could not create a room \u2014 try again."),this.net=null});return}this.hostedConnect(()=>this.ws.send(JSON.stringify({type:"create",name:this.save.profile.name})))}hostedQuickJoin(){if(this.platform.hosted){this.net=this._makeNet(),this.net.quickJoin().then(t=>{t||(this.net=null)}).catch(t=>{this.ui.caption("Quick join failed \u2014 try again."),this.net=null});return}this.hostedConnect(()=>this.ws.send(JSON.stringify({type:"quickjoin",name:this.save.profile.name})))}hostedJoin(t){if(this.platform.hosted){this.ui.caption("Room codes are local-play only \u2014 use Quick Join here.");return}this.hostedConnect(()=>this.ws.send(JSON.stringify({type:"join",code:t,name:this.save.profile.name})))}hostedAddAi(){if(this.net){this.net.isHost&&this.net.addAi();return}this.ws&&this.ws.send(JSON.stringify({type:"addAi"}))}hostedReady(){if(this.net){this.net.setReady();return}this.ws&&this.ws.send(JSON.stringify({type:"ready",ready:!0}))}hostedStart(){if(this.net){this.net.isHost&&this.net.start();return}this.ws&&this.ws.send(JSON.stringify({type:"start"}))}hostedLeave(){this.net&&(this.net.leave(),this.net=null,this.showScreen(this.ui.hostedScreen()))}bindCanvasInput(){let t=this.ui.canvas,e=0,n=0,s=0,r=!1;t.style.touchAction="none",t.addEventListener("pointerdown",a=>{e=a.clientX,n=a.clientY,s=performance.now(),r=!0;try{t.setPointerCapture(a.pointerId)}catch{}}),t.addEventListener("pointerup",a=>{if(!r)return;r=!1;let o=Math.hypot(a.clientX-e,a.clientY-n),l=performance.now()-s;o<12&&l<500&&this.handleTap(a)}),t.addEventListener("pointercancel",()=>{r=!1})}handleTap(t){if(!this.renderer||!this.session||this.phase!=="active")return;let e=this.ui.canvas.getBoundingClientRect(),n=(t.clientX-e.left)/e.width*2-1,s=-((t.clientY-e.top)/e.height*2-1),r=this.renderer.pick(n,s);if(!r)return;let a=this.session.legal();if(r.kind==="room")a.find(l=>l.type==="move"&&l.room===r.id)?this.humanAct({type:"move",room:r.id}):this.onReject("not_a_legal_target");else if(r.kind==="pawn"){let o=a.find(c=>c.type==="vote"&&c.choice===r.id),l=a.find(c=>c.type==="eliminate"&&c.target===r.id);o?this.humanAct({type:"vote",choice:r.id}):l?this.humanAct({type:"eliminate",target:r.id}):this.onReject("not_a_legal_target")}}bindGlobalInput(){window.addEventListener("keydown",t=>{if(!(t.target&&(t.target.tagName==="INPUT"||t.target.tagName==="SELECT"))){if(t.key==="Escape"){this.phase==="active"?(this.pauseGame(),t.preventDefault()):this.phase==="paused"&&(this.resumeGame(),t.preventDefault());return}if(this.phase==="active"){if((t.key==="u"||t.key==="U")&&(this.undo(),t.preventDefault()),(t.key==="h"||t.key==="H")&&(this.hint(),t.preventDefault()),(t.key==="c"||t.key==="C")&&(this.renderer&&this.renderer.resetCamera(),t.preventDefault()),(t.key===" "||t.key==="Enter")&&t.key===" "&&(this.humanAct({type:"wait"}),t.preventDefault()),t.key.startsWith("Arrow")){let e=this.session?this.session.legal().filter(n=>n.type==="move"):[];if(e.length){this.focusIndex=(this.focusIndex+(t.key==="ArrowLeft"||t.key==="ArrowUp"?-1:1)+e.length)%e.length;let n=e[this.focusIndex].room;this.renderer&&(this.renderer.showLegalTargets([n]),this.renderer.placeCamera(n,!1)),this.ui.caption("Target: "+n),this.audio.event("ack",this.focusIndex),t.key==="ArrowDown"&&t.shiftKey&&this.humanAct({type:"move",room:n})}t.preventDefault()}if(t.key==="Enter"){let e=this.session?this.session.legal().filter(n=>n.type==="move"):[];e.length&&(this.humanAct({type:"move",room:e[this.focusIndex%e.length].room}),t.preventDefault())}}}})}bindLifecycle(){document.addEventListener("visibilitychange",()=>{let t=document.hidden;this.renderer&&this.renderer.setHidden(t),this.audio.setMuted(t),t&&this.phase==="active"&&!this.hostedActive()&&this.pauseGame()}),window.addEventListener("resize",()=>{this.renderer&&this.renderer.resize()}),window.addEventListener("orientationchange",()=>setTimeout(()=>{this.renderer&&this.renderer.resize()},120))}applyAccessibilityClasses(){let t=document.body;t.classList.toggle("hc-large-text",!!this.settings.largeText),t.classList.toggle("hc-high-contrast",!!this.settings.highContrast),t.classList.toggle("hc-left-handed",!!this.settings.leftHanded),t.classList.toggle("hc-reduced-motion",!!this.settings.reducedMotion)}applySettings(){Xh(this.settings),this.applyAccessibilityClasses();for(let t of["music","effects","ambience","voice"])this.audio.setVolume(t,this.settings[t]);this.renderer&&(this.renderer.cvd=!!this.settings.cvdPalette,this.renderer.reducedMotion=!!this.settings.reducedMotion,this.renderer.setTheme(this.settings.theme==="auto"?this.stage?this.stage.theme:Oe[0].id:this.settings.theme),this.renderer.setQuality(this.settings.tier==="auto"?"medium":this.settings.tier))}},i0=document.getElementById("app")||document.body.appendChild(document.createElement("div"));window.__hiddenCouncil=new Il(i0);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
