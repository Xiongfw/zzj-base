import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import _, { isEmpty as isEmpty$1, isString } from 'lodash';
import dayjs from 'dayjs';
import { createHash } from 'crypto';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _library = true;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'pure' ,
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)






var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$1);

var _extends = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _redefine = _hide;

var _iterators = {};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if (( FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var process$1 = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process$1) == 'process') {
    defer = function (id) {
      process$1.nextTick(_ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};

var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$2 = _global.process;
var Promise$1 = _global.Promise;
var isNode = _cof(process$2) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process$2.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise$1.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$3 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$3
};

var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var navigator = _global.navigator;

var _userAgent = navigator && navigator.userAgent || '';

var _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var SPECIES$1 = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function () { return this; }
  });
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

var task = _task.set;
var microtask = _microtask();




var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process$3 = _global.process;
var versions = process$3 && process$3.versions;
var v8 = versions && versions.v8 || '';
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$3) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && _userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function () {
        if (isNode$1) {
          process$3.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, function () {
    var handler;
    if (isNode$1) {
      process$3.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$3.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library ), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve( this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return _promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return _promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

// https://github.com/tc39/proposal-promise-try




_export(_export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = _newPromiseCapability.f(this);
  var result = _perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

var promise = _core.Promise;

var promise$1 = createCommonjsModule(function (module) {
module.exports = { "default": promise, __esModule: true };
});

var _Promise = unwrapExports(promise$1);

var globalConfig = {
  // 自动退出指令绑定的dom元素
  autoLeavelEl: null,
  // loading alert 绑定到的el元素, 默认是body
  el: null,
  // 必传，vuex实例
  store: null,
  // 非必填，默认自适应
  fontSize: null,
  // 日志选项，操作人ID和姓名
  logger: {
    oper_id: null,
    oper_name: null
  },
  // 提示框
  alert: {
    // 提示框自动退出时间
    time: 30
  },
  // 音频播放选项
  audio: {
    baseUrl: 'https://zzjfaceapp.linkingcloud.cn/audio/'
  }
};

//

var script = {
  name: "BemLoading",
  data: function data() {
    return {
      visible: false,
      loadingText: "加载中"
    };
  },

  watch: {
    visible: function visible() {
      if (this.visible) {
        globalConfig.store.dispatch("isAutoLeave", false);
      } else {
        globalConfig.store.dispatch("isAutoLeave", true);
      }
    }
  }
};

var __$_require_assets_imgs_loading_logo_gif__ = "data:image/gif;base64,R0lGODlhyADIAJEDAP7+/v39/f///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU0NzhFNzk4REI5MTFFQUEyRENGRTk0QzlGQTEwRjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU0NzhFN0E4REI5MTFFQUEyRENGRTk0QzlGQTEwRjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RTQ3OEU3NzhEQjkxMUVBQTJEQ0ZFOTRDOUZBMTBGNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RTQ3OEU3ODhEQjkxMUVBQTJEQ0ZFOTRDOUZBMTBGNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfG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";

var __$_require_assets_imgs_loading_dot_gif__ = "data:image/gif;base64,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";

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visible,
      expression: "visible"
    }],
    staticClass: "bem--fullscreen bem-loading-mask"
  }, [_c("img", {
    staticClass: "bem-loading__logo",
    attrs: { src: __$_require_assets_imgs_loading_logo_gif__ }
  }), _vm._v(" "), _c("div", { staticClass: "bem-loading__text-wrap" }, [_c("span", {
    staticClass: "bem-loading__text",
    domProps: { innerHTML: _vm._s(_vm.loadingText) }
  }), _vm._v(" "), _c("img", {
    staticClass: "bem-loading__dot",
    attrs: { src: __$_require_assets_imgs_loading_dot_gif__ }
  })])]);
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent_1({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var LoadingConstructor = Vue.extend(__vue_component__);
var vm = null;

LoadingConstructor.prototype.close = function () {
  this.visible = false;
};

LoadingConstructor.prototype.show = function () {
  var loadingText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";

  vm.$emit("mount");
  if (globalConfig.store.state.common.isFullscreen) {
    vm.$el.style.position = "fixed";
  } else {
    vm.$el.style.position = "absolute";
  }
  this.visible = true;
  this.loadingText = loadingText;
};

var Loading = function Loading() {

  vm = new LoadingConstructor({
    el: document.createElement('div')
  });
  vm.$once("mount", function () {
    var el = document.querySelector(globalConfig.el);
    if (el) {
      el.style.position != "relative" && (el.style.position = "relative");
      el.appendChild(vm.$el);
    } else {
      document.body.appendChild(vm.$el);
    }
  });
  return vm;
};

var service = Loading();

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: "BemButton",
  props: {
    // 按钮大小 large / small
    size: String,
    // 按钮类型  success / warning / danger / info / transparent / white
    type: String,
    nativeType: {
      type: String,
      default: "button"
    },
    plain: Boolean,
    // 立体按钮
    stereo: Boolean,
    // 圆角按钮
    round: Boolean,
    // 背景透明
    transparent: Boolean,
    // 是否禁用状态
    disabled: Boolean
  },
  methods: {
    handleClick: function handleClick(event) {
      this.$emit("click", event);
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("button", {
    staticClass: "bem-button",
    class: [_vm.size ? "bem-button--" + _vm.size : "", _vm.type ? "bem-button--" + _vm.type : "", {
      "is-stereo": _vm.stereo,
      "is-disabled": _vm.disabled,
      "is-round": _vm.round,
      "is-plain": _vm.plain,
      "is-transparent": _vm.plain && !_vm.transparent
    }],
    attrs: { disabled: _vm.disabled, type: _vm.nativeType },
    on: { click: _vm.handleClick }
  }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

/* style */
var __vue_inject_styles__$1 = undefined;
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent_1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//

var script$2 = {
  name: "BemAlert",
  mounted: function mounted() {
    var _this = this;

    if (this.isAutoExit) {
      var timeId = setInterval(function () {
        if (_this.time-- <= 1) {
          _this.handleAction(true);
          clearInterval(timeId);
        }
      }, 1000);
    }
  },

  components: {
    BemButton: __vue_component__$1
  },
  data: function data() {
    return {
      // 点击取消false, 确定true
      confirm: true,
      // 是否可见
      visible: false,
      // 显示标题
      showTitle: true,
      // 标题
      title: "提示",
      // 内容
      content: "",
      // 是否显示取消按钮
      showCancel: false,
      // 取消按钮文本内容
      cancelText: "取消",
      // 确定按钮文本内容
      confirmText: "确定",
      // 倒计时时间
      time: globalConfig.alert.time,
      // 是否自动退出
      isAutoExit: true,
      // 关闭回调事件
      onClose: null
    };
  },

  watch: {
    visible: function visible(val) {
      var _this2 = this;

      if (val) {
        this.$store.dispatch("isAutoLeave", false);
      } else {
        this.$store.dispatch("isAutoLeave", true);
        typeof this.onClose === "function" && this.onClose(this.confirm);
        setTimeout(function () {
          _this2.$el.parentNode.removeChild(_this2.$el);
          _this2.$destroy();
        });
      }
    }
  },
  methods: {
    handleAction: function handleAction(action) {
      this.confirm = action;
      this.visible = false;
    }
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visible,
      expression: "visible"
    }],
    staticClass: "bem-alert-mask bem--fullscreen"
  }, [_c("div", { staticClass: "bem-alert-box" }, [_vm.showTitle ? _c("div", { staticClass: "bem-alert-box__header" }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "bem-alert-box__content",
    domProps: { innerHTML: _vm._s(_vm.content) }
  }), _vm._v(" "), _c("div", { staticClass: "bem-alert-box__btns" }, [_vm.showCancel ? _c("bem-button", {
    staticClass: "btn--cancel",
    on: {
      click: function click($event) {
        return _vm.handleAction(false);
      }
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]) : _vm._e(), _vm._v(" "), _c("bem-button", {
    on: {
      click: function click($event) {
        return _vm.handleAction(true);
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.confirmText) + "\n        "), _vm.isAutoExit ? _c("span", [_vm._v("(" + _vm._s(_vm.time) + ")")]) : _vm._e()])], 1)])]);
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

/* style */
var __vue_inject_styles__$2 = undefined;
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = undefined;
/* functional template */
var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = normalizeComponent_1({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

Vue.use(Vuex);
var AlertConstructor = Vue.extend(__vue_component__$2);

var Alert = function Alert() {
  var options = {};
  var length = arguments.length;
  if (length == 1 && _.isString(arguments.length <= 0 ? undefined : arguments[0])) {
    options.content = arguments.length <= 0 ? undefined : arguments[0];
  } else if (length == 2) {
    options.content = arguments.length <= 0 ? undefined : arguments[0];
    options.onClose = arguments.length <= 1 ? undefined : arguments[1];
  } else if (length == 1 && _.isPlainObject(arguments.length <= 0 ? undefined : arguments[0])) {
    options = arguments.length <= 0 ? undefined : arguments[0];
  }
  var vm = new AlertConstructor({
    el: document.createElement('div'),
    data: options,
    store: globalConfig.store
  });
  var el = document.querySelector(globalConfig.el);
  if (el && !globalConfig.store.state.common.isFullscreen) {
    el.style.position != "relative" && (el.style.position = "relative");
    vm.$el.style.position != "absolute" && (vm.$el.style.position = "absolute");
    el.appendChild(vm.$el);
  } else {
    document.body.appendChild(vm.$el);
  }
  vm.visible = true;
  return vm;
};

var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify$1 = createCommonjsModule(function (module) {
module.exports = { "default": stringify, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify$1);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

var _Object$defineProperty = unwrapExports(defineProperty$1);

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$1 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$1);

var store = {
  // 硬件信息
  hardware: null,
  // 医院信息
  hospital: null,
  // 版本
  version: null,
  // 机构ID
  orgId: null,
  deptId: null,
  // 机器ID
  winConfigId: null,
  winCode: null,
  // 网关默认地址
  gateway: null,
  // 统一支付平台地址
  payUrl: null,
  // 服务窗地址
  fwcUrl: null,
  // 硬件服务地址
  devUrl: null,
  // 医保服务地址
  yibaoUrl: null,
  // 管理后台地址
  adminUrl: null,
  username: null,
  password: null,
  // token
  authorization: null,
  // 10.11、获取提醒字典 IF_FWC_Tip_Dictionary
  tipDicts: null,
  // 10.15、获取医院配置 IF_Get_Inhospital_ConfigList
  fwcHospConfig: null
};

_Object$keys(store).forEach(function (key) {
  _Object$defineProperty(store, key, {
    get: function get() {
      var value = localStorage.getItem(key);
      if (!value) return '';
      try {
        var valueJson = JSON.parse(value);
        if (_.isObject(valueJson)) return valueJson;
        return value;
      } catch (e) {
        return value;
      }
    },
    set: function set(value) {
      if (_.isNull(value) || _.isUndefined(value)) {
        localStorage.removeItem(key);
      } else if (_.isObject(value)) {
        localStorage.setItem(key, _JSON$stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    }
  });
});

function error(errMessage) {
  console.error('Logger: ' + errMessage);
}

function support() {
  return !!(window.indexedDB && window.IDBTransaction && window.IDBKeyRange);
}

function f$4(arr) {
  try {
    return arr.reduce(function (p, item) {
      return p[item];
    }, globalConfig.store.state);
  } catch (e) {
    return null;
  }
}

// 对象仓库名
var object_store_name = 'logs';
// 数据库名
var database_name = 'berm';
// 数据库版本
var database_version = 2;
// 日志字段
var fields = function fields() {
  return {
    // 创建时间
    create_time: null,
    // 时间戳
    timestamp: null,
    // 日志等级 info, warn, error
    level: 'info',
    // 日志描述
    desc: null,
    // 日志类型 normal: 普通交互日志 api: 接口API日志
    type: 'normal',
    // 接口url
    url: null,
    // 接口入参
    in_param: null,
    // 接口出参
    out_param: null,
    // 操作人ID
    oper_id: f$4(globalConfig.logger.oper_id),
    // 操作人姓名
    oper_name: f$4(globalConfig.logger.oper_name),
    // 机构ID
    org_id: store.orgId,
    // 机器ID
    win_config_id: store.winConfigId,
    // 扩展数据
    data: null
  };
};

// 数据库
var db = null;

/** 初始化数据库 */
function init(callback) {
  if (!support) {
    return error('该环境不支持IndexedDB');
  }
  try {
    var request = window.indexedDB.open(database_name, database_version);
    request.onerror = function (e) {
      return error('打开数据库失败');
    };
    request.onsuccess = function (e) {
      _.isFunction(callback) && callback(e.target.result);
    };
    request.onupgradeneeded = function (e) {
      var db = e.target.result;
      if (db.objectStoreNames.contains(object_store_name)) {
        db.deleteObjectStore(object_store_name);
      }
      var objectStore = db.createObjectStore(object_store_name, { keyPath: 'id', autoIncrement: true });
      _Object$keys(fields()).forEach(function (key) {
        objectStore.createIndex(key, key, { unique: false });
      });
    };
  } catch (e) {
    error('数据库初始化失败-' + e.message);
  }
}

/** 根据索引删除*/
function deleteAllByIndex(callback, indexName, query) {
  getObjectStore(function (store) {
    if (!indexName || !store.indexNames.contains(indexName)) {
      throw new Error('索引不能为空或不存在');
    }
    var index = store.index(indexName);
    var request = index.openCursor(query, 'prev');
    request.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        _.isFunction(callback) && callback(true, null);
      }
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('delete failed');
    };
  });
}

/** 获取对象仓库 */
function getObjectStore(callback) {
  if (!db) {
    init(function (res) {
      db = res;
      getObjectStore(callback);
    });
  } else {
    var transaction = db.transaction(object_store_name, 'readwrite');
    var objectStore = transaction.objectStore(object_store_name);
    _.isFunction(callback) && callback(objectStore);
  }
}

/** 根据索引查询 */
function getAllByIndex(callback, indexName, query, count) {
  getObjectStore(function (store) {
    if (!indexName || !store.indexNames.contains(indexName)) {
      throw new Error('索引不能为空或不存在');
    }
    var index = store.index(indexName);
    var request = index.openCursor(query, 'prev');
    var data = [];
    request.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor && (_.isUndefined(count) || count)) {
        count && count--;
        data.push(cursor.value);
        cursor.continue();
      } else {
        _.isFunction(callback) && callback(data, null);
      }
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('index query failed');
    };
  });
}

/** 获取全部日志 */
function getAll(callback, query, count, isDelete) {
  getObjectStore(function (store) {
    var request = store.openCursor(query, 'prev');
    var data = [];
    request.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor && (_.isUndefined(count) || count)) {
        count && count--;
        data.push(cursor.value);
        isDelete && cursor.delete();
        cursor.continue();
      } else {
        _.isFunction(callback) && callback(data, null);
      }
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('getAll failed');
    };
  });
}

/** 增 */
function add(data, callback) {
  getObjectStore(function (store) {
    var request = store.add(data);
    request.onsuccess = function (event) {
      _.isFunction(callback) && callback(event.target.result, null);
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('insert failed');
    };
  });
}

/** 删 */
function remove(key, callback) {
  getObjectStore(function (store) {
    var request = store.delete(key);
    request.onsuccess = function (event) {
      _.isFunction(callback) && callback(true, null);
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('delete failed');
    };
  });
}
/** 清空数据库 */
function clear(callback) {
  getObjectStore(function (store) {
    var request = store.clear();
    request.onsuccess = function (event) {
      _.isFunction(callback) && callback(event.target.result, null);
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('clear failed');
    };
  });
}

function info() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fields();
  var callback = arguments[1];

  add$1('info', data, callback);
}

function warn() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fields();
  var callback = arguments[1];

  add$1('warn', data, callback);
}

function error$1() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fields();
  var callback = arguments[1];

  add$1('error', data, callback);
}

function add$1(level) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fields();
  var callback = arguments[2];

  var log = fields();
  if (_.isString(data)) {
    log.desc = data;
  }
  var timestamp = dayjs().valueOf();
  log.create_time = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss:SSS');
  log.timestamp = timestamp;
  log.level = level;
  log = _.isPlainObject(data) ? _.defaults(data, log) : log;
  add(log, callback);
}

/**
 * 获取全部日志
 * @param {function} callback 回调函数
 * @param {IDBKeyRange|string|number} query 查询条件
 * @param {number} count 查询条数
 * @param {Boolean} isDelete 查询后是否删除
 */
function getAll$1(callback, query, count, isDelete) {
  getAll(callback, query, count, isDelete);
}

/**
 * 根据索引查询
 * @param {function} callback 回调函数
 * @param {string} indexName 索引名
 * @param {IDBKeyRange|string|number} query 查询条件
 * @param {number} count 查询条数
 */
function getAllByIndex$1(callback, indexName, query, count) {
  getAllByIndex(callback, indexName, query, count);
}

/**
 * 根据时间查询 举个栗子--查看1小时内的日志getAllByTime(1, 'h')
 * @param {function} callback 回调函数
 * @param {number} value 时间值
 * @param {string} unit 时间单位："millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "d" | "M" | "y" | "h" | "m" | "s" | "ms" | "week" | "w"
 */
function getAllByTime(callback, value, unit) {
  var currentTime = dayjs().valueOf();
  var startTime = dayjs(currentTime).subtract(value, unit).valueOf();
  getAllByIndex$1(callback, 'timestamp', IDBKeyRange.bound(startTime, currentTime));
}

/**
 * 
 * @param {function} callback 回调函数
 * @param {string} indexName 索引名
 * @param {IDBKeyRange|string|number} query 查询条件
 */
function deleteAllByIndex$1(callback, indexName, query) {
  deleteAllByIndex(callback, indexName, query);
}

/**
 * 根据时间删除日志 举个栗子--删除1小时内的日志deleteAllByTime(1, 'h')
 * @param {function} callback 回调函数
 * @param {number} value 时间值
 * @param {string} unit 时间单位："millisecond" | "second" | "minute" | "hour" | "day" | "month" | "year" | "date" | "d" | "M" | "y" | "h" | "m" | "s" | "ms" | "week" | "w"
 */
function deleteAllByTime(callback, value, unit) {
  var currentTime = dayjs().valueOf();
  var startTime = dayjs(currentTime).subtract(value, unit).valueOf();
  deleteAllByIndex$1(callback, 'timestamp', IDBKeyRange.bound(startTime, currentTime));
}

/**
 * 删除一条或者多条
 * @param {Array|String} key 主键
 */
function remove$1(keys) {
  var tasks = [];
  var promiseify = function promiseify(id) {
    return new _Promise(function (resolve) {
      remove(id, function (res) {
        resolve(res);
      });
    });
  };
  if (Array.isArray(keys)) {
    keys.forEach(function (item) {
      tasks.push(promiseify(item.id));
    });
  } else {
    tasks.push(promiseify(keys.id));
  }
  return _Promise.all(tasks);
}

/**
 * 删除日志并返回
 * @param {function} callback 回调函数
 * @param {Number} count 删除条数
 */
function pop(callback, count) {
  getAll$1(callback, null, count, true);
}

/**
 * 清空全部日志
 * @param {function} callback 回调函数
 */
function clear$1(callback) {
  clear(callback);
}

var logs = /*#__PURE__*/Object.freeze({
	__proto__: null,
	info: info,
	warn: warn,
	error: error$1,
	clear: clear$1,
	remove: remove$1,
	pop: pop,
	getAll: getAll$1,
	getAllByIndex: getAllByIndex$1,
	getAllByTime: getAllByTime,
	deleteAllByIndex: deleteAllByIndex$1,
	deleteAllByTime: deleteAllByTime
});

var instance = axios.create({
  // 请求超时时间（20s）
  timeout: 1000 * 30
});

var getApiName = function getApiName(url) {
  return url.substring(url.lastIndexOf('/') + 1);
};

/** 是否显示加载动画 */
function isLoading(status, loadingText) {
  if (status) {
    service.show(loadingText);
  } else {
    service.close();
  }
}

/**
 * 记录接口
 * @param {string} level 日志等级 info, warn, error
 * @param {object} res axios响应对象
 */
function record(level, res) {
  var config = res.config;
  var options = config.options,
      url = config.url;

  var isError = function isError() {
    return res instanceof Error;
  };
  var outInfo = {
    'info': function info() {
      console.log('%c执行URL=>%s\n执行成功，返回结果=>%o', 'color: #67C23A;font-weight:bold;', url, res.data.data);
    },
    'warn': function warn() {
      console.log('%c执行URL=>%s\n执行失败，返回结果=>%o', 'color: #E6A23C;font-weight:bold;', url, res.data);
    },
    'error': function error() {
      console.log('%c执行异常\n请求URL=>%s', 'color:#F56C6C;font-weight:bold;', url);
    }
  };
  if (options.log === false) return;
  outInfo[level]();
  logs[level]({
    type: 'api',
    desc: isError() ? res.message : getApiName(url),
    url: url,
    in_param: _Object$assign({}, config.params, JSON.parse(config.data || '{}')),
    out_param: res.data
  });
}

/* 请求拦截 */
instance.interceptors.request.use(function (config) {
  var _config$options = config.options,
      options = _config$options === undefined ? {} : _config$options;

  options.loading !== false && isLoading(true, options.loadingText);
  if (options.hardware && store.hospital) {
    var extInfo = JSON.parse(store.hospital.ext_info || "{}");
    config.headers['YYID'] = extInfo.yyid || "";
    config.headers['SBID'] = store.hospital.winConfig.win_code || "";
    config.headers['LogLevel'] = store.hospital.log_level || "";
    config.headers['Gateway'] = store.gateway || "";
  }
  if (store.authorization) {
    config.headers['Authorization'] = 'Bearer ' + store.authorization;
  }
  if (store.hospital) {
    config.headers['orgId'] = store.orgId || "";
    config.headers['winConfigId'] = store.winConfigId || "";
    config.headers['deptId'] = store.dept_id || "";
  }
  return config;
}, function (error) {
  return _Promise.reject(error);
});

/* 响应拦截 */
instance.interceptors.response.use(function (res) {
  var _res$config$options = res.config.options,
      options = _res$config$options === undefined ? {} : _res$config$options;

  options.loading !== false && isLoading(false);
  if (res.data.code === 0) {
    record('info', res);
    return _Promise.resolve(res.data.data);
  } else {
    options.alert !== false && Alert(res.data.msg);
    record('warn', res);
    var error = new Error(res.data.msg || '接口调用失败，错误信息为空');
    error.failure = true;
    return _Promise.reject(error);
  }
}, function (error) {
  // error里面有request属性就是网络错误
  if (error.request) {
    var _error$config$options = error.config.options,
        options = _error$config$options === undefined ? {} : _error$config$options;

    options.loading !== false && isLoading(false);
    options.alert !== false && Alert('\u63A5\u53E3' + getApiName(error.config.url) + '\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5');
    error.network = true;
    record('error', error);
  }
  return _Promise.reject(error);
});

// 网关地址
var gateway = store.gateway || "https://zzjapi.linkingcloud.cn";
// 统一支付接口地址
var unified_payment_url = void 0;
// 服务窗接口地址
var service_window_url = void 0;
// 后台管理地址
var org_config_url = void 0;
// 日志接口地址
var logs_url = void 0;
// 本地硬件地址
var ext_device_url = "http://localhost:8010/api/";
// 医保地址
var yibao_url = ext_device_url;

if (store.hospital) {
  var extInfo = JSON.parse(store.hospital.ext_info || "{}");
  var winExtInfo = JSON.parse(store.hospital.winConfig.win_ext_info || "{}");
  var devUrl = extInfo.devUrl;

  if (devUrl) {
    if (devUrl.indexOf("http") === 0) {
      ext_device_url = devUrl;
    } else {
      ext_device_url = "http://" + extInfo.devUrl + "/api/";
    }
  }
  if (winExtInfo.yibaoUrl) {
    yibao_url = "http://" + winExtInfo.yibaoUrl + "/api/";
  } else {
    yibao_url = ext_device_url;
  }
}

// 没有配置网关地址
if (!store.gateway) {
  var _location = location,
      hostname = _location.hostname;
  //如果地址为内网地址

  if (/(\d{1,3}\.){3}\d{1,3}/.test(hostname)) {
    gateway = "http://" + hostname + ":8013";
  }
  store.gateway = gateway;
}

// gateway = 'http://192.168.0.119:8090'

logs_url = gateway + '/logs/api/';
unified_payment_url = store.payUrl = gateway + '/pay/api/';
service_window_url = store.fwcUrl = gateway + '/fwc/api/';
org_config_url = store.adminUrl = gateway + '/admin/api/';
store.devUrl = ext_device_url;
store.yibaoUrl = yibao_url;

/* 开发环境的常量地址 */
if (process.env.NODE_ENV == "development") ;

var Constants = {
  unified_payment_url: unified_payment_url,
  service_window_url: service_window_url,
  org_config_url: org_config_url,
  logs_url: logs_url,
  ext_device_url: ext_device_url,
  yibao_url: yibao_url
};

var baseUrl = Constants.org_config_url + 'org/';

var OrgConfigApi = {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getHeartbeatPacket: function getHeartbeatPacket(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl + 'getHeartbeatPacket', params: params, options: _extends$1({ loading: false, log: false, alert: false }, options) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getVersion: function getVersion(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl + 'getVersion', params: params, options: _extends$1({ loading: false, log: false, alert: false }, options) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgList: function getOrgList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl + 'getOrgList', params: params, options: _extends$1({ log: false }, options) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getWinCodeList: function getWinCodeList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl + 'getWinCodeList', params: params, options: _extends$1({ log: false }, options) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgWinconfigDetail: function getOrgWinconfigDetail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl + 'getOrgWinconfigDetail', params: params, options: _extends$1({ log: false }, options) });
  }
};

var baseUrl$1 = Constants.logs_url + 'zwl/';

var ZWLApi = {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  receiveLogs: function receiveLogs(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$1 + 'receiveLogs', params, { options: _extends$1({}, options, { log: false, loading: false }) });
  }
};

var baseUrl$2 = Constants.org_config_url + 'wht/';

var WHTApi = {
  /**
   * 获取硬件信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getInfoByWinConfigId: function getInfoByWinConfigId(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$2 + 'getInfoByWinConfigId', { params: params, options: _extends$1({}, options, { loading: false, log: false }) });
  }
};

var baseUrl$3 = Constants.org_config_url + 'account/';

var AccountApi = {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  login: function login(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$3 + 'login', params, { options: _extends$1({}, options) });
  }
};

var baseUrl$4 = Constants.org_config_url + 'user/';

var UserApi = {
  /**
   * 获取硬件信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getCurrentUser: function getCurrentUser(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$4 + 'getCurrentUser', { params: params, options: _extends$1({}, options) });
  }
};

var baseUrl$5 = store.gateway + '/admin/oauth/';

var OauthApi = {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  login: function login(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var md5 = createHash("md5");
    md5.update(params.password);
    var passwordMd5 = md5.digest("hex");
    params.password = passwordMd5;
    params.grant_type = "password";
    params.client_id = "linkingzzj";
    params.client_secret = "lk.net.01";
    return instance({ method: 'post', url: baseUrl$5 + 'token', params: params, options: _extends$1({}, options) });
  }
};

var baseUrl$6 = Constants.org_config_url + 'printHistory/';

var PrintHistoryApi = {
    /**
     * 获取打印信息
     */
    printInfo: function printInfo(data) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return instance({ method: 'post', url: baseUrl$6 + 'printInfo', data: data, options: options });
    },

    /**
     * 添加打印历史
     */
    updatePrintRemainNum: function updatePrintRemainNum(data) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return instance({ method: 'post', url: baseUrl$6 + 'updatePrintRemainNum', data: data, options: options });
    },

    /**
     * 查询打印历史
     */
    list: function list(params) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return instance({ method: 'get', url: baseUrl$6 + 'list', params: params, options: options });
    },

    /**
     * 添加打印历史
     */
    add: function add(data) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return instance({ method: 'post', url: baseUrl$6 + 'add', data: data, options: options });
    },

    /**
     * 删除打印历史
     */
    del: function del(params) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return instance({ method: 'get', url: baseUrl$6 + 'del', params: params, options: options });
    }
};

var baseUrl$7 = Constants.logs_url + 'cloud/';
var defaultOptions = { log: false, loading: false, alert: false };

var CloudApi = {
  /**
   * 手写识别
   */
  writingOCR: function writingOCR(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$7 + 'writingOCR', data: data, options: _extends$1({}, defaultOptions, options) });
  }
};

var baseUrl$8 = Constants.org_config_url + 'linkingcloud/';

var LinkingcloudApi = {
  /**
   *  根据机构id获取医院信息和科室列表
   */
  Get_Hosp_Info_Speciality_List: function Get_Hosp_Info_Speciality_List(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$8 + 'Get_Hosp_Info_Speciality_List', data: data, options: options });
  },

  /**
   *  获取科室介绍和医生列表，医生介绍
   */
  Get_Speciality_Info_Doctor_List: function Get_Speciality_Info_Doctor_List(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$8 + 'Get_Speciality_Info_Doctor_List', data: data, options: options });
  }
};

var baseUrl$9 = Constants.service_window_url;

var BillServiceApi = {
  /**
   * 4.1、检查订单状态（院方）
   */
  IF_Check_Hospital_Trade_Status: function IF_Check_Hospital_Trade_Status(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$9 + 'IF_Check_Hospital_Trade_Status', data: data, options: options });
  },

  /**
   * 4.2 更新订单状态（院方） IF_Update_Trade_Status
   * 接口说明：
   * 先调服务窗4.2更新订单状态（院方） IF_Update_Trade_Status 再调贝尔曼统一支付平台更新订单状态（我方） PAY_Update_Trade_Status更新我方订单状态接口
   */
  IF_Update_Trade_Status: function IF_Update_Trade_Status(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$9 + 'IF_Update_Trade_Status', data: data, options: options });
  },

  /**
   * 4.3、账单(所有)
   */
  IF_Get_Bill_List: function IF_Get_Bill_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$9 + 'IF_Get_Bill_List', params: params, options: options });
  }
};

var baseUrl$a = Constants.service_window_url;

var BookingServiceApi = {
  /**
   * 22.1、获取预约资源
   */
  IF_Get_Booking_Resource: function IF_Get_Booking_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "get",
      url: baseUrl$a + "IF_Get_Booking_Resource",
      params: params,
      options: _extends$1({ log: false }, options)
    });
  },

  /**
   * 22.2、获取科室预约号源
   */
  IF_Get_Booking_Dept_NoSource: function IF_Get_Booking_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "get",
      url: baseUrl$a + "IF_Get_Booking_Dept_NoSource",
      params: params,
      options: _extends$1({ log: false }, options)
    });
  },

  /**
   * 22.3、获取医生预约号源
   */
  IF_Get_Booking_Doc_Resource: function IF_Get_Booking_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "get",
      url: baseUrl$a + "IF_Get_Booking_Doc_Resource",
      params: params,
      options: _extends$1({ log: false }, options)
    });
  },

  /**
   * 22.6、确认预约
   */
  IF_Confirm_Booking: function IF_Confirm_Booking(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "post",
      url: baseUrl$a + "IF_Confirm_Booking",
      data: data,
      options: options
    });
  },

  /**
   * 22.7、取消预约
   */
  IF_Cancel_Booking: function IF_Cancel_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "get",
      url: baseUrl$a + "IF_Cancel_Booking",
      params: params,
      options: options
    });
  },

  /**
   * 22.8、预约转挂号
   */
  IF_Booking_To_Regist: function IF_Booking_To_Regist(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "post",
      url: baseUrl$a + "IF_Booking_To_Regist",
      data: data,
      options: options
    });
  },

  /**
   * 22.9、获取患者预约列表
   */
  IF_Get_Patient_Booking_List: function IF_Get_Patient_Booking_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "get",
      url: baseUrl$a + "IF_Get_Patient_Booking_List",
      params: params,
      options: options
    });
  },

  /**
   * 22.10、获取患者预约详细
   */
  IF_Get_Patient_Booking_Detail: function IF_Get_Patient_Booking_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "get",
      url: baseUrl$a + "IF_Get_Patient_Booking_Detail",
      params: params,
      options: options
    });
  },

  /**
   * 22.12、确认签到
   */
  IF_Confirm_Check: function IF_Confirm_Check(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "post",
      url: baseUrl$a + "IF_Confirm_Check",
      data: data,
      options: options
    });
  },

  /**
   * 22.14、患者预约挂号列表
   */
  IF_Get_BookingRegist_List: function IF_Get_BookingRegist_List(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({
      method: "post",
      url: baseUrl$a + "IF_Get_BookingRegist_List",
      data: data,
      options: options
    });
  }
};

var baseUrl$b = Constants.service_window_url;

var ClinicChargeServiceApi = {
  /**
   * 5.1、获取诊间未缴费账单列表
   */
  IF_Get_OutPatient_Uncharge_Trade_List: function IF_Get_OutPatient_Uncharge_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_Get_OutPatient_Uncharge_Trade_List', { params: params, options: options });
  },

  /**
   * 5.2、获取未付诊间缴费明细
   */
  IF_Get_OutPatient_UnCharge_Trade_Detail: function IF_Get_OutPatient_UnCharge_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_Get_OutPatient_UnCharge_Trade_Detail', { params: params, options: options });
  },

  /**
   * 5.4、获取诊间费用详细
   */
  IF_Get_OutPatient_Charged_Trade_Detail: function IF_Get_OutPatient_Charged_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$b + 'IF_Get_OutPatient_Charged_Trade_Detail', params, { options: options });
  },

  /**
   * 5.5、诊间未缴费订单验证接口（院方）--
   * 接口说明：
   * 先调服务窗 5.5、诊间未缴费订单验证接口（院方） IF_Check_Hospital_Trade
   * 根据 CheckUnchargedTrade 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   */
  IF_Check_Hospital_Trade: function IF_Check_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$b + 'IF_Check_Hospital_Trade', params, { options: options });
  }
};

var baseUrl$c = Constants.service_window_url;

var EvaluateServiceApi = {
  /**
   * 26.5、获取评价选项
   */
  IF_Get_EvaluateOption_Info: function IF_Get_EvaluateOption_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Get_EvaluateOption_Info', params, { options: options });
  },

  /**
   * 26.6、保存评价
   */
  IF_Evaluate_Save: function IF_Evaluate_Save(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Evaluate_Save', params, { options: options });
  }
};

var baseUrl$d = Constants.service_window_url;

var FwcServiceApi = {
  /**
   * 99.20、代扣协议查询
   */
  FWC_IF_Withholding_Query: function FWC_IF_Withholding_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'FWC_IF_Withholding_Query', params, { options: options });
  },

  /**
   * 99.21、扫码绑定卡号
   */
  IF_FWC_BindCardNoByQrCode: function IF_FWC_BindCardNoByQrCode(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_FWC_BindCardNoByQrCode', params, { options: options });
  },

  /**
   * 99.27、自助绑卡
   */
  FWC_IF_BindCard: function FWC_IF_BindCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'FWC_IF_BindCard', params, { options: options });
  },

  /**
   * 99.33、刷脸支付芝麻授权初始化
   */
  IF_FacePay_ZhiMaInit: function IF_FacePay_ZhiMaInit(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_FacePay_ZhiMaInit', { params: params, options: options });
  },

  /**
   * 99.34、刷脸支付
   */
  FWC_IF_Face_Pay: function FWC_IF_Face_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'FWC_IF_Face_Pay', params, { options: options });
  },

  /**
   * 99.35、刷脸生活芝麻授权初始化
   */
  IF_FaceLive_ZhiMaInit: function IF_FaceLive_ZhiMaInit(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_FaceLive_ZhiMaInit', { params: params, options: options });
  }
};

var baseUrl$e = Constants.service_window_url;

var HospitalizationAppointment = {
  /**
   * 14.1、获取住院列表
   */
  IF_Hospitalization_Get_List: function IF_Hospitalization_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Hospitalization_Get_List', { params: params, options: options });
  },

  /**
   * 14.2、获取已登记住院信息
   */
  IF_Hospitalization_Get_Registration_Info: function IF_Hospitalization_Get_Registration_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$e + 'IF_Hospitalization_Get_Registration_Info', params, { options: options });
  },

  /**
   * 14.3、住院信息登记
   */
  IF_Hospitalization_Registration_Info: function IF_Hospitalization_Registration_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$e + 'IF_Hospitalization_Registration_Info', params, { options: options });
  },

  /**
   * 14.4、获取住院详情
   */
  IF_Hospitalization_Detail: function IF_Hospitalization_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$e + 'IF_Hospitalization_Detail', params, { options: options });
  },

  /**
   * 14.5、确认预约
   */
  IF_Hospitalization_Confirm_Booking: function IF_Hospitalization_Confirm_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$e + 'IF_Hospitalization_Confirm_Booking', params, { options: options });
  },

  /**
   * 14.6、取消住院
   */
  IF_Hospitalization_Cancel_Booking: function IF_Hospitalization_Cancel_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$e + 'IF_Hospitalization_Cancel_Booking', params, { options: options });
  }
};

var baseUrl$f = Constants.service_window_url;

var HospitalLeaveServiceApi = {
  /**
   * 16.1、获取出院列表
   */
  IF_LeaveHospital_Get_List: function IF_LeaveHospital_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$f + 'IF_LeaveHospital_Get_List', { params: params, options: options });
  },

  /**
   * 16.2、获取待办理出院详情
   */
  IF_LeaveHospital_Detail: function IF_LeaveHospital_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_LeaveHospital_Detail', params, { options: options });
  },

  /**
   * 16.3、确认出院办理
   */
  IF_LeaveHospital_Confirm: function IF_LeaveHospital_Confirm(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_LeaveHospital_Confirm', params, { options: options });
  },

  /**
   * 16.4、出院小结列表
   */
  IF_LeaveHospitalSummary_Get_List: function IF_LeaveHospitalSummary_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$f + 'IF_LeaveHospitalSummary_Get_List', { params: params, options: options });
  },

  /**
   * 16.5、出院小结详情
   */
  IF_LeaveHospitalSummary_Detail: function IF_LeaveHospitalSummary_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_LeaveHospitalSummary_Detail', params, { options: options });
  },

  /**
   * 16.6、取消出院办理
   */
  IF_LeaveHospital_Cancel: function IF_LeaveHospital_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_LeaveHospital_Cancel', params, { options: options });
  },

  /**
   * 16.7、确认出院-医保结算预约
   */
  IF_LeaveHospital_ByInsurance_Confirm: function IF_LeaveHospital_ByInsurance_Confirm(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_LeaveHospital_ByInsurance_Confirm', params, { options: options });
  },

  /**
   * 16.8、获取已办理出院详情
   */
  IF_LeaveHospital_Result: function IF_LeaveHospital_Result(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_LeaveHospital_Result', params, { options: options });
  }
};

var baseUrl$g = Constants.service_window_url;

var HospitalPrepaymentServiceApi = {
  /**
   * 6.1、确认住院号（含规则）
   */
  IF_Confirm_AdmissionNumber: function IF_Confirm_AdmissionNumber(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$g + 'IF_Confirm_AdmissionNumber', data: data, options: options });
  },

  /**
   * 6.2、缴纳住院预缴金
   */
  IF_Charge_Foregift: function IF_Charge_Foregift(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$g + 'IF_Charge_Foregift', data: data, options: options });
  },

  /**
   * 6.3、获取住院预缴列表
   */
  IF_Get_Inhospital_Foregift_List: function IF_Get_Inhospital_Foregift_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$g + 'IF_Get_Inhospital_Foregift_List', params: params, options: options });
  },

  /**
   * 6.4、住院预交金详细接口
   */
  IF_Get_Inhospital_Foregift_Detail: function IF_Get_Inhospital_Foregift_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$g + 'IF_Get_Inhospital_Foregift_Detail', params: params, options: options });
  },

  /**
   * 6.5、 获取住院患者列表
   */
  IF_Get_Inhospital_Patient_List: function IF_Get_Inhospital_Patient_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$g + 'IF_Get_Inhospital_Patient_List', params: params, options: options });
  },

  /**
   * 9.28、获取入院登记字段（自助机专用）
   */
  IF_Get_InhospitalCost_Field: function IF_Get_InhospitalCost_Field(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$g + 'IF_Get_InhospitalCost_Field', params: params, options: options });
  }
};

var baseUrl$h = Constants.service_window_url;

var HospitalServiceApi = {
  /**
   * 10.2、获取医院候诊查询列表（个人）
   */
  IF_Get_Hospital_Waiting_List: function IF_Get_Hospital_Waiting_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$h + 'IF_Get_Hospital_Waiting_List', params: params, options: options });
  },

  /**
   * 10.11、获取提醒字典
   */
  IF_FWC_Tip_Dictionary: function IF_FWC_Tip_Dictionary(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$h + 'IF_FWC_Tip_Dictionary', params: params, options: options });
  },

  /**
   * 10.15、获取医院配置
   */
  IF_Get_Inhospital_ConfigList: function IF_Get_Inhospital_ConfigList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$h + 'IF_Get_Inhospital_ConfigList', params: params, options: options });
  }
};

var baseUrl$i = Constants.service_window_url;

var InhospitalServiceApi = {
  /**
   * 9.1、获取住院总费用列表
   */
  IF_Get_Inhospital_Total_Cost_List: function IF_Get_Inhospital_Total_Cost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Inhospital_Total_Cost_List', { params: params, options: options });
  },

  /**
   * 9.2、获取住院总费用详细
   */
  IF_Get_Inhospital_Total_Cost_Detail: function IF_Get_Inhospital_Total_Cost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Inhospital_Total_Cost_Detail', { params: params, options: _extends$1({ log: false }, options) });
  },

  /**
   * 9.5、获取住院患者列表
   */
  IF_Get_InhospitalCost_Patient_List: function IF_Get_InhospitalCost_Patient_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_InhospitalCost_Patient_List', { params: params, options: options });
  },

  /**
   * 9.6、获取住院详情
   * 腕带和就诊卡登录都是调用此接口：腕带登录PatientNumber字段传住院号；就诊卡登录PatientNumber字段传卡号；另外再加biz_type过去非必填字段，主要用于区分是就诊卡还是腕带
   */
  IF_Get_InhospitalCost_Patient_Detail: function IF_Get_InhospitalCost_Patient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_InhospitalCost_Patient_Detail', { params: params, options: options });
  },

  /**
   * 9.7、获取住院记录
   */
  IF_Get_Inhospital_info_List: function IF_Get_Inhospital_info_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Inhospital_info_List', { params: params, options: options });
  }
};

var baseUrl$j = Constants.service_window_url;

var PatientCardService = {
  /**
   * 1.1、创建就诊卡
   */
  IF_Create_MedicalCard: function IF_Create_MedicalCard(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$j + 'IF_Create_MedicalCard', data: data, options: options });
  },

  /**
   * 1.2、登记就诊卡
   */
  IF_Regist_MedicalCard: function IF_Regist_MedicalCard(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$j + 'IF_Regist_MedicalCard', data: data, options: options });
  },

  /**
   * 1.3、注销就诊卡
   */
  IF_Cancel_MedicalCard: function IF_Cancel_MedicalCard(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$j + 'IF_Cancel_MedicalCard', data: data, options: options });
  },

  /**
   * 1.4、清除就诊卡
   */
  IF_Clear_MedicalCard: function IF_Clear_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$j + 'IF_Clear_MedicalCard', params: params, options: options });
  },

  /**
   * 1.5、获取医院已有卡列表
   */
  IF_Get_Hospital_MedicalCard_List: function IF_Get_Hospital_MedicalCard_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$j + 'IF_Get_Hospital_MedicalCard_List', params: params, options: options });
  },

  /**
   * 1.8、刷新就诊卡
   */
  IF_Refresh_MedicalCard: function IF_Refresh_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$j + 'IF_Refresh_MedicalCard', params: params, options: options });
  },

  /**
   * 1.9、获取绑卡人信息
   */
  IF_Get_BindCardPerson_Info: function IF_Get_BindCardPerson_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$j + 'IF_Get_BindCardPerson_Info', params: params, options: options });
  },

  /**
   * 1.9、获取绑卡人信息（新）
   */
  IF_Get_Person_Info: function IF_Get_Person_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$j + 'IF_Get_Person_Info', params: params, options: options });
  }
};

var baseUrl$k = Constants.service_window_url;

var RegistServiceApi = {
  /**
   * 23.1、获取挂号资源
   */
  IF_Get_Regist_Resource: function IF_Get_Regist_Resource(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$k + 'IF_Get_Regist_Resource', data: data, options: _extends$1({ log: false }, options) });
  },

  /**
   * 23.1、获取挂号资源
   */
  IF_Get_Regist_Resource_DataSource: function IF_Get_Regist_Resource_DataSource(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$k + 'IF_Get_Regist_Resource_DataSource', data: data, options: _extends$1({ log: false }, options) });
  },

  /**
   * 23.2、获取科室挂号号源
   */
  IF_Get_Regist_Dept_NoSource: function IF_Get_Regist_Dept_NoSource(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$k + 'IF_Get_Regist_Dept_NoSource', data: data, options: _extends$1({ log: false }, options) });
  },

  /**
   * 23.3、获取医生挂号号源
   */
  IF_Get_Regist_Doc_Resource: function IF_Get_Regist_Doc_Resource(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$k + 'IF_Get_Regist_Doc_Resource', data: data, options: _extends$1({ log: false }, options) });
  },

  /**
   * 23.6、确认挂号
   * 先调服务窗 23.6、确认挂号 IF_Confirm_Regist
   * 根据 HospitalTradeApplyInfo 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   */
  IF_Confirm_Regist: function IF_Confirm_Regist(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$k + 'IF_Confirm_Regist', data: data, options: options });
  },

  /**
   * 23.7、取消挂号
   */
  IF_Cancel_Regist: function IF_Cancel_Regist(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$k + 'IF_Cancel_Regist', data: data, options: options });
  },

  /**
   * 23.8、获取患者挂号列表
   */
  IF_Get_Patient_Regist_List: function IF_Get_Patient_Regist_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$k + 'IF_Get_Patient_Regist_List', params: params, options: options });
  },

  /**
   * 23.9、获取患者挂号详细
   */
  IF_Get_Patient_Regist_Detail: function IF_Get_Patient_Regist_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$k + 'IF_Get_Patient_Regist_Detail', params: params, options: options });
  }
};

var baseUrl$l = Constants.service_window_url;

var ReportServiceApi = {
  /**
   * 8.2、获取检验报告详细
   */
  IF_Get_Jianyan_Report_Detail: function IF_Get_Jianyan_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_Get_Jianyan_Report_Detail', params: params, options: options });
  },

  /**
   * 8.4、获取放射报告详细
   */
  IF_Get_Fangshe_Report_Detail: function IF_Get_Fangshe_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_Get_Fangshe_Report_Detail', params: params, options: options });
  },

  /**
   * 8.6、获取超声报告详细
   */
  IF_Get_Chaosheng_Report_Detail: function IF_Get_Chaosheng_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_Get_Chaosheng_Report_Detail', params: params, options: options });
  },

  /**
   * 8.8、获取病理报告详细
   */
  IF_Get_Bingli_Report_Detail: function IF_Get_Bingli_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_Get_Bingli_Report_Detail', params: params, options: options });
  },

  /**
   * 8.10、获取体检报告详情
   */
  IF_Get_TiJian_Report_Detail: function IF_Get_TiJian_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_Get_TiJian_Report_Detail', params: params, options: options });
  },

  /**
   * 8.11、获取报告列表
   */
  IF_Get_Report_List: function IF_Get_Report_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_Get_Report_List', params: params, options: options });
  },

  /**
   * 8.12、获取报告人列表
   */
  IF_GetReportPerson_List: function IF_GetReportPerson_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_GetReportPerson_List', params: params, options: options });
  },

  /**
   * 8.13、验证手机号
   */
  IF_Tel_verify: function IF_Tel_verify(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$l + 'IF_Tel_verify', params: params, options: options });
  }
};

var baseUrl$m = Constants.service_window_url;

var SchedulingServiceApi = {
  /**
   * 25.1、门诊排班科室列表
   */
  IF_Get_Scheduling_Outpatient: function IF_Get_Scheduling_Outpatient(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$m + 'IF_Get_Scheduling_Outpatient', params, { options: options });
  },

  /**
   * 25.2、门诊排班详情
   */
  IF_Get_Scheduling_Outpatient_Detail: function IF_Get_Scheduling_Outpatient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$m + 'IF_Get_Scheduling_Outpatient_Detail', params, { options: options });
  },

  /**
   * 25.3、获取医生排班 
   */
  IF_Get_Doc_Scheduling_Outpatient_Detail: function IF_Get_Doc_Scheduling_Outpatient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$m + 'IF_Get_Doc_Scheduling_Outpatient_Detail', params, { options: options });
  },

  /**
   * 25.4、停诊排班
   */
  IF_Get_Scheduling_Close: function IF_Get_Scheduling_Close(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$m + 'IF_Get_Scheduling_Close', params, { options: options });
  }
};

var baseUrl$n = Constants.service_window_url;

var SeflQrCodeServiceApi = {
  /**
   * 12.6、自助机登录二维码获取
   */
  IF_Get_ZiZhuJi_LoginUrl: function IF_Get_ZiZhuJi_LoginUrl(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_ZiZhuJi_LoginUrl', { params: params, options: options });
  },

  /**
   * 12.9、获取已绑卡列表
   */
  IF_Get_BindCard_List: function IF_Get_BindCard_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_BindCard_List', { params: params, options: options });
  },

  /**
   * 12.8、获取已绑卡列表
   */
  IF_Get_ZiZhuJi_LoginQuery: function IF_Get_ZiZhuJi_LoginQuery(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_ZiZhuJi_LoginQuery', { params: params, options: options });
  }
};

var baseUrl$o = Constants.service_window_url;

var SurgeryServiceApi = {
  /**
   * 41.1、获取手术相关信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Surgery_Detail: function IF_Surgery_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$o + 'IF_Surgery_Detail', params, { options: options });
  }
};

var baseUrl$p = Constants.service_window_url + '/cust/';

var ZzjCustomServiceApi = {
  /**
   * 自助机登录二维码获取ZZJ_GetLoginUrl
   */
  ZZJ_GetLoginUrl: function ZZJ_GetLoginUrl(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_GetLoginUrl', { params: params, options: options });
  },

  /**
   * 自助机登录查询ZZJ_LoginQuery
   */
  ZZJ_LoginQuery: function ZZJ_LoginQuery(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_LoginQuery', { params: params, options: options });
  },

  /**
   * 获取住院证数据IF_Guidance_Info
   */
  IF_Guidance_Info: function IF_Guidance_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Guidance_Info', { params: params, options: options });
  },

  /**
   * 60.5 ZZJ_Get_ZhuYuan_List 通过就诊卡号获取住院信息
   */
  ZZJ_Get_ZhuYuan_List: function ZZJ_Get_ZhuYuan_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_ZhuYuan_List', { params: params, options: options });
  },

  /**
   * 53.1 确认住院号ZZJ_Confirm_AdmissionNumber 通过腕带（住院号）获取住院信息
   */
  ZZJ_Confirm_AdmissionNumber: function ZZJ_Confirm_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Confirm_AdmissionNumber', { params: params, options: options });
  },

  /**
   * 五官科扫码验证登录
   */
  IF_Get_BindCardPatInfo: function IF_Get_BindCardPatInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Get_BindCardPatInfo', { params: params, options: options });
  },

  /**
   * 50.1、获取挂号号源
   */
  IF_Get_Regist_Resource: function IF_Get_Regist_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Get_Regist_Resource', { params: params, options: options });
  },

  /**
   * 50.1、获取预约号源
   */
  IF_Get_Booking_Resource: function IF_Get_Booking_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Get_Booking_Resource', { params: params, options: options });
  },

  /**
   * 50.3、获取医生挂号号源
   */
  IF_Get_Regist_Doc_Resource: function IF_Get_Regist_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Get_Regist_Doc_Resource', { params: params, options: options });
  },

  /**
   * 50.3、获取医生预约号源
   */
  IF_Get_Booking_Doc_Resource: function IF_Get_Booking_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Get_Booking_Doc_Resource', { params: params, options: options });
  },

  /**
   * 50.2、获取科室挂号号源
   */
  IF_Get_Regist_Dept_NoSource: function IF_Get_Regist_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Get_Regist_Dept_NoSource', { params: params, options: options });
  },

  /**
   * 50.2、获取科室预约号源
   */
  IF_Get_Booking_Dept_NoSource: function IF_Get_Booking_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_Get_Booking_Dept_NoSource', { params: params, options: options });
  },

  /**
   * 51.1 查询未交费记录
   */
  ZZJ_Get_Uncharge_Trade_List: function ZZJ_Get_Uncharge_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_Uncharge_Trade_List', { params: params, options: options });
  },

  /**
   * 51.2 确认订单
   */
  ZZJ_Check_Hospital_Trade: function ZZJ_Check_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Check_Hospital_Trade', { params: params, options: options });
  },

  /**
   * 51.3交易查询
   */
  ZZJ_Barcode_Pay_State: function ZZJ_Barcode_Pay_State(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Barcode_Pay_State', { params: params, options: options });
  },

  /**
   * 51.4交易撤销
   */
  ZZJ_Barcode_Pay_Cancel: function ZZJ_Barcode_Pay_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Barcode_Pay_Cancel', { params: params, options: options });
  },

  /**
   * 51.5交易查询
   */
  ZZJ_Barcode_Pay_Query: function ZZJ_Barcode_Pay_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Barcode_Pay_Query', { params: params, options: options });
  },

  /**
   * 52.1确认就诊卡
   */
  ZZJ_Confirm_MedicalCard: function ZZJ_Confirm_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Confirm_MedicalCard', { params: params, options: options });
  },

  /**
   * 52.2 确认充值
   */
  ZZJ_Charge_MedicalCard: function ZZJ_Charge_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Charge_MedicalCard', { params: params, options: options });
  },

  /**
   * 53.2 确认充值(住院)
   */
  ZZJ_Charge_AdmissionNumber: function ZZJ_Charge_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Charge_AdmissionNumber', { params: params, options: options });
  },

  /**
   * 55.1 获取账单列表
   */
  ZZJ_Get_Bill: function ZZJ_Get_Bill(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_Bill', { params: params, options: options });
  },

  /**
   * 56.1 签到
   */
  ZZJ_SignIn: function ZZJ_SignIn(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_SignIn', { params: params, options: options });
  },

  /**
   * 50.6 获取患者挂号列表
   */
  ZZJ_Get_Patient_Regist_List: function ZZJ_Get_Patient_Regist_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_Patient_Regist_List', { params: params, options: options });
  },

  /**
   * 50.4确认挂号
   */
  ZZJ_Confirm_Regist: function ZZJ_Confirm_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Confirm_Regist', { params: params, options: options });
  },

  /**
   * 50.5取消挂号
   */
  ZZJ_Cancel_Regist: function ZZJ_Cancel_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Cancel_Regist', { params: params, options: options });
  },

  /**
   * 56.2 获取签到列表
   */
  ZZJ_Get_SignIn_List: function ZZJ_Get_SignIn_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_SignIn_List', { params: params, options: options });
  },

  /**
   * 57.1校验是否建档
   */
  ZZJ_Check_IDCard: function ZZJ_Check_IDCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Check_IDCard', { params: params, options: options });
  },

  /**
   * 57.2建档办卡
   */
  ZZJ_CreateMedicalCard: function ZZJ_CreateMedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_CreateMedicalCard', { params: params, options: options });
  },

  /**
   * 57.3获取病人类型
   */
  ZZJ_Get_BRLXDM: function ZZJ_Get_BRLXDM(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_BRLXDM', { params: params, options: options });
  },

  /**
   * 非硬件模式住院充值登录
   */
  ZZJ_GetYhYzLogin: function ZZJ_GetYhYzLogin(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_GetYhYzLogin', { params: params, options: options });
  },

  /**
   * 58.1扫码绑定卡号
   */
  IF_FWC_BindCardNoByQrCode: function IF_FWC_BindCardNoByQrCode(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'IF_FWC_BindCardNoByQrCode', { params: params, options: options });
  },

  /**
   * 获取住院日清单列表
   */
  ZZJ_Get_ZhuYuan_DailyCost_List: function ZZJ_Get_ZhuYuan_DailyCost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_ZhuYuan_DailyCost_List', { params: params, options: options });
  },

  /**
   * 获取住院日清单详情
   */
  ZZJ_Get_ZhuYuan_DailyCost_Detail: function ZZJ_Get_ZhuYuan_DailyCost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_ZhuYuan_DailyCost_Detail', { params: params, options: options });
  },

  /**
   * 获取住院总费用列表
   */
  ZZJ_Get_ZhuYuan_ToTalCost_List: function ZZJ_Get_ZhuYuan_ToTalCost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_ZhuYuan_ToTalCost_List', { params: params, options: options });
  },

  /**
   * 获取住院总费用详情
   */
  ZZJ_Get_ZhuYuan_ToTalCost_Detail: function ZZJ_Get_ZhuYuan_ToTalCost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_ZhuYuan_ToTalCost_Detail', { params: params, options: options });
  },

  /**
   * 获取门诊清单列表
   */
  ZZJ_Get_OutPatient_Charged_Trade_List: function ZZJ_Get_OutPatient_Charged_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_OutPatient_Charged_Trade_List', { params: params, options: options });
  },

  /**
   * 获取门诊清单详情
   */
  ZZJ_Get_OutPatient_Charged_Trade_Detail: function ZZJ_Get_OutPatient_Charged_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_OutPatient_Charged_Trade_Detail', { params: params, options: options });
  },

  /**
   * 获取患者挂号费
   */
  ZZJ_Get_Patient_RegistFee: function ZZJ_Get_Patient_RegistFee(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'ZZJ_Get_Patient_RegistFee', { params: params, options: options });
  }
};

var baseUrl$q = Constants.service_window_url;

var PricePublicityServiceApi = {
  /**
   * 31.99、价格公示列表
   */
  IF_Get_PricePublicity_List: function IF_Get_PricePublicity_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$q + 'IF_Get_PricePublicity_List', params: params, options: options });
  }
};

var baseUrl$r = Constants.service_window_url;

var MedicalCardApi = {
  /**
   * 7.1、确认就诊卡（含规则）
   */
  IF_Confirm_MedicalCard: function IF_Confirm_MedicalCard(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$r + 'IF_Confirm_MedicalCard', data: data, options: options });
  },

  /**
   * 7.2、充值就诊卡
   */
  IF_Charge_MedicalCard: function IF_Charge_MedicalCard(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$r + 'IF_Charge_MedicalCard', data: data, options: options });
  },

  /**
   * 7.3、获取就诊卡充值列表
   */
  IF_Get_MedicalCard_Charge_List: function IF_Get_MedicalCard_Charge_List(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$r + 'IF_Get_MedicalCard_Charge_List', data: data, options: options });
  },

  /**
   * 7.4、获取就诊卡充值详细接口
   */
  IF_Get_MedicalCard_Charge_Detail: function IF_Get_MedicalCard_Charge_Detail(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$r + 'IF_Get_MedicalCard_Charge_Detail', data: data, options: options });
  },

  /**
   * 7.5、就诊卡退费
   */
  IF_Refund_MedicalCard: function IF_Refund_MedicalCard(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$r + 'IF_Refund_MedicalCard', data: data, options: options });
  }
};

var baseUrl$s = Constants.unified_payment_url;

var AuthorizeInfoServiceApi = {
  /**
   * 根据open_user_id查询授权表的用户信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo: function PAY_AuthorizeInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$s + 'PAY_AuthorizeInfo', params, { options: options });
  },

  /**
   * 登录授权回调
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_System_Oauth_Userinfo: function LC_System_Oauth_Userinfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$s + 'lc.system.oauth.userinfo', { params: params, options: options });
  },

  /**
   * 根据ftoken获取联空返回的openUserID
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Alipay_Customer_Ftoken_Query: function LC_Alipay_Customer_Ftoken_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$s + 'lc.alipay.customer.ftoken.query', { params: params, options: options });
  },

  /**
   * 统计授权数据
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo_Statistic: function PAY_AuthorizeInfo_Statistic(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$s + 'PAY_AuthorizeInfo_Statistic', { params: params, options: options });
  }
};

var baseUrl$t = Constants.unified_payment_url;

var PayTradeServiceApi = {
  /**
   * 更新订单状态（我方） PAY_Update_Trade_Status
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Update_His_Fail: function PAY_Update_His_Fail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'PAY_Update_His_Fail', params, { options: options });
  },
  PAY_Update_His_Success: function PAY_Update_His_Success(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'PAY_Update_His_Success', params, { options: options });
  },
  PAY_Update_His_Call: function PAY_Update_His_Call(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'PAY_Update_His_Call', params, { options: options });
  },

  /**
   * 创建支付订单
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Create_Trade: function PAY_Create_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'PAY_Create_Trade', params, { options: options });
  },

  /**
   * 订单列表查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_QueryList: function PAY_Trade_QueryList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$t + 'PAY_Trade_QueryList', { params: params, options: options });
  },

  /**
   * 订单查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Query: function PAY_Trade_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$t + 'PAY_Trade_Query', { params: params, options: options });
  },

  /**
   * 处理HIS支付相关订单 PAY_Hospital_Trade
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Hospital_Trade: function PAY_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'PAY_Hospital_Trade', params, { options: options });
  },

  /**
   * 支付宝刷脸支付 lc.trade.simle.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Simle_Pay: function LC_Trade_Simle_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'lc.trade.simle.pay', params, { options: options });
  },

  /**
   * 条码支付 lc.trade.barcode.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Barcode_Pay: function LC_Trade_Barcode_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'lc.trade.barcode.pay', params, { options: options });
  },

  /**
   * 交易查询 lc.trade.query
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Query: function LC_Trade_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$t + 'lc.trade.query', { params: params, options: options });
  },

  /**
   * 交易撤销 lc.trade.cancel
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Cancel: function LC_Trade_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'lc.trade.cancel', params, { options: options });
  },

  /**
   * 聚合扫码支付 lc.trade.polymerization.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Polymerization_Pay: function LC_Trade_Polymerization_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$t + 'lc.trade.polymerization.pay', params, { options: options });
  },

  /**
   * 订单数据统计
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Statistic: function PAY_Trade_Statistic(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$t + 'PAY_Trade_Statistic', { params: params, options: options });
  }
};

var baseUrl$u = Constants.unified_payment_url;

var PaymentApi = {
  /**
   * 扫码支付（云闪付）
   */
  lc_trade_qrcode_pay: function lc_trade_qrcode_pay(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'lc.trade.qrcode.pay', data: data, options: options });
  },

  /**
   * 聚合扫码支付获取二维码
   */
  phonePayGetQRCode: function phonePayGetQRCode(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'lc.trade.polymerization.pay', data: data, options: options });
  },

  /**
   * 交易查询
   */
  getPayStatus: function getPayStatus(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: baseUrl$u + 'lc.trade.query', params: params, options: options });
  },

  /**
   * 交易撤销
   */
  cancelTrade: function cancelTrade(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'lc.trade.cancel', data: data, options: options });
  },

  /**
   * 在本地创建订单
   */
  PAY_Create_Trade: function PAY_Create_Trade(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'pay/PAY_Create_Trade', data: data, options: options });
  },

  /**
   * 处理HIS支付订单
   */
  PAY_Hospital_Trade: function PAY_Hospital_Trade(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'PAY_Hospital_Trade', data: data, options: options });
  },

  /**
   * 更新本地订单状态
   */
  PAY_Update_Trade_Status: function PAY_Update_Trade_Status(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'pay/PAY_Update_Trade_Status', data: data, options: options });
  },

  /**
   * 更新我方订单状态为His_Fail
   */
  PAY_Update_His_Fail: function PAY_Update_His_Fail(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'pay/PAY_Update_His_Fail', data: data, options: options });
  },

  /**
   * 更新我方订单状态为His_Success
   */
  PAY_Update_His_Success: function PAY_Update_His_Success(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'PAY_Update_His_Success', data: data, options: options });
  },

  /**
   * 更新我方订单状态为His_Call
   */
  PAY_Update_His_Call: function PAY_Update_His_Call(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$u + 'pay/PAY_Update_His_Call', data: data, options: options });
  }
};

var defaultOptions$1 = { log: true, loading: false, alert: false, hardware: true };

var DevBaseApi = {
  /* 打开打印设备串口 */
  OpenDevice: function OpenDevice(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'OpenDevice', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 关闭打印设备串口 */
  CloseDevice: function CloseDevice(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CloseDevice', params: params, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 初始化打印机 */
  Init: function Init(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'Init', data: data, options: _extends$1({}, defaultOptions$1, options) });
  }
};

var defaultOptions$2 = { log: true, loading: false, alert: false, hardware: true };

var DevPrintApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'print/',
  /* 打印字符串 */
  PrintString: function PrintString(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PrintString', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 切纸 */
  CutPaper: function CutPaper(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CutPaper', params: params, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 设置行间距 */
  SetLineSpace: function SetLineSpace(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetLineSpace', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 获取设备状态 */
  GetDeviceStatus: function GetDeviceStatus(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'GetDeviceStatus', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 设置左边距 */
  SetLeftSpace: function SetLeftSpace(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetLeftSpace', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 设置对齐方式 */
  SetAlign: function SetAlign(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetAlign', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 设置英文字体 */
  SetPrintFontE: function SetPrintFontE(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetPrintFontE', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 设置中文字体 */
  SetPrintFontC: function SetPrintFontC(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetPrintFontC', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 微距进纸 */
  Feed: function Feed(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'Feed', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 进纸iLines行 */
  FeedLines: function FeedLines(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'FeedLines', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 打印指定内容条码 */
  PrintBarCode: function PrintBarCode(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PrintBarCode', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 打印指定内容二维码 */
  PrintQRCode: function PrintQRCode(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PrintQRCode', data: data, options: _extends$1({}, defaultOptions$2, options) });
  }
});

var defaultOptions$3 = { log: true, loading: false, alert: false, hardware: true };

var DevReadCardApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'readcard/',
  /* 设置设备类型 */
  SetDeviceType: function SetDeviceType(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDeviceType', data: data, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 设置设备参数 */
  SetDeviceParam: function SetDeviceParam(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDeviceParam', data: data, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 获取磁卡机卡状态 */
  GetStatus: function GetStatus(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetStatus', params: params, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 允许插卡 */
  EnableInsert: function EnableInsert(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'EnableInsert', data: data, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 禁止插卡 */
  DisableInsert: function DisableInsert(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'DisableInsert', data: data, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 退卡 */
  EjectCard: function EjectCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'EjectCard', params: params, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 吞卡 */
  RetainCard: function RetainCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'RetainCard', params: params, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 读磁卡信息，就诊卡、社保卡 */
  ReadCardInfo: function ReadCardInfo(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'ReadCardInfo', data: data, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 社保卡和PSAM卡上电 */
  PowerOn: function PowerOn(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PowerOn', data: data, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 社保卡和PSAM卡下电 */
  PowerOff: function PowerOff(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PowerOff', data: data, options: _extends$1({}, defaultOptions$3, options) });
  }
});

var defaultOptions$4 = { log: true, loading: false, alert: false, hardware: true };

var DevIssueCardApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'issuecard/',
  /* 设置设备类型 */
  SetDeviceType: function SetDeviceType(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDeviceType', data: data, options: _extends$1({}, defaultOptions$4, options) });
  },

  /* 设置设备参数 */
  SetDeviceParam: function SetDeviceParam(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDeviceParam', data: data, options: _extends$1({}, defaultOptions$4, options) });
  },

  /* 获取卡箱状态 */
  GetCardBoxStatus: function GetCardBoxStatus(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetCardBoxStatus', params: params, options: _extends$1({}, defaultOptions$4, options) });
  },

  /* 回收卡 */
  CollectCard: function CollectCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CollectCard', params: params, options: _extends$1({}, defaultOptions$4, options) });
  },

  /* 发卡到指定读卡位置 */
  DispenseCard: function DispenseCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'DispenseCard', params: params, options: _extends$1({}, defaultOptions$4, options) });
  },

  /* 读磁卡信息，就诊卡、社保卡 */
  ReadCardInfo: function ReadCardInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadCardInfo', params: params, options: _extends$1({}, defaultOptions$4, options) });
  },

  /* 发卡到门口 */
  IssueCard: function IssueCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'IssueCard', params: params, options: _extends$1({}, defaultOptions$4, options) });
  }
});

var defaultOptions$5 = { log: true, loading: false, alert: false, hardware: true };

var DevIDCardApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'idcard/',
  /* 读取身份证信息 */
  ReadIdCardInfo: function ReadIdCardInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadIdCardInfo', params: params, options: _extends$1({}, defaultOptions$5, options) });
  }
});

var defaultOptions$6 = { log: true, loading: false, alert: false, hardware: true };

var DevYibaoApi = {
  baseUrl: Constants.yibao_url + 'yibao/',
  /* 保障卡基本信息读取 */
  ReadBaseInfo: function ReadBaseInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadBaseInfo', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 保障卡卡号读取 */
  ReadCardNo: function ReadCardNo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadCardNo', params: params, options: _extends$1({}, defaultOptions$6, options) });
  }
};

var defaultOptions$7 = { log: true, loading: false, alert: false, hardware: true };

var DevUMSApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'ums/',
  /* 设置入参 */
  SetReq: function SetReq(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetReq', data: data, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 进卡 */
  EnterCard: function EnterCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'EnterCard', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 检测卡 */
  CheckCard: function CheckCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CheckCard', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 读卡 */
  ReadCard: function ReadCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadCard', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 弹卡 */
  EjectCard: function EjectCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'EjectCard', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 关闭读卡器 */
  CardClose: function CardClose(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CardClose', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 吞卡 */
  CardSwallow: function CardSwallow(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CardSwallow', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 开启密码键盘 */
  StartPin: function StartPin(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'StartPin', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 获得键值 */
  GetOnePass: function GetOnePass(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetOnePass', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 获取Pin密文 */
  GetPin: function GetPin(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetPin', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 自助终端交易 */
  TransCard: function TransCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'TransCard', params: params, options: _extends$1({}, defaultOptions$7, options) });
  }
});

var defaultOptions$8 = { log: true, loading: false, alert: false, hardware: true };

var DevCashApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'cash/',
  /* 获取现金设备状态 */
  GetStatus: function GetStatus(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetStatus', params: params, options: _extends$1({}, defaultOptions$8, options) });
  },

  /* 设置可以接受纸币面值 */
  SetDenomination: function SetDenomination(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDenomination', data: data, options: _extends$1({}, defaultOptions$8, options) });
  },

  /* 取识币金额 */
  GetMoney: function GetMoney(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetMoney', params: params, options: _extends$1({}, defaultOptions$8, options) });
  },

  /* 读币口停止接收纸币 */
  StopIdentify: function StopIdentify(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'StopIdentify', params: params, options: _extends$1({}, defaultOptions$8, options) });
  }
});

var defaultOptions$9 = { hardware: true };

var DevExeApi = {
  baseUrl: Constants.ext_device_url + 'exe/',
  /**
   * 打开软键盘
   */
  OpenOsk: function OpenOsk(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'OpenOsk', params: params, options: _extends$1({}, defaultOptions$9, options) });
  },

  /**
   * 关闭软键盘
   */
  CloseOsk: function CloseOsk(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CloseOsk', params: params, options: _extends$1({}, defaultOptions$9, options) });
  }
};



var api = /*#__PURE__*/Object.freeze({
	__proto__: null,
	OrgConfigApi: OrgConfigApi,
	ZWLApi: ZWLApi,
	WHTApi: WHTApi,
	AccountApi: AccountApi,
	UserApi: UserApi,
	OauthApi: OauthApi,
	PrintHistoryApi: PrintHistoryApi,
	CloudApi: CloudApi,
	LinkingcloudApi: LinkingcloudApi,
	BillServiceApi: BillServiceApi,
	BookingServiceApi: BookingServiceApi,
	ClinicChargeServiceApi: ClinicChargeServiceApi,
	EvaluateServiceApi: EvaluateServiceApi,
	FwcServiceApi: FwcServiceApi,
	HospitalizationAppointment: HospitalizationAppointment,
	HospitalLeaveServiceApi: HospitalLeaveServiceApi,
	HospitalPrepaymentServiceApi: HospitalPrepaymentServiceApi,
	HospitalServiceApi: HospitalServiceApi,
	InhospitalServiceApi: InhospitalServiceApi,
	PatientCardService: PatientCardService,
	RegistServiceApi: RegistServiceApi,
	ReportServiceApi: ReportServiceApi,
	SchedulingServiceApi: SchedulingServiceApi,
	SeflQrCodeServiceApi: SeflQrCodeServiceApi,
	SurgeryServiceApi: SurgeryServiceApi,
	ZzjCustomServiceApi: ZzjCustomServiceApi,
	PricePublicityServiceApi: PricePublicityServiceApi,
	MedicalCardApi: MedicalCardApi,
	AuthorizeInfoServiceApi: AuthorizeInfoServiceApi,
	PayTradeServiceApi: PayTradeServiceApi,
	PaymentApi: PaymentApi,
	DevPrintApi: DevPrintApi,
	DevReadCardApi: DevReadCardApi,
	DevIssueCardApi: DevIssueCardApi,
	DevIDCardApi: DevIDCardApi,
	DevYibaoApi: DevYibaoApi,
	DevUMSApi: DevUMSApi,
	DevCashApi: DevCashApi,
	DevExeApi: DevExeApi
});

var audio = new Audio();
var defaultExtension = '.wav';

/** 播放 */
function play() {
  var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  return new _Promise(function (resolve) {
    if (filename.startsWith('http')) {
      audio.src = filename;
    } else if (filename.includes('.')) {
      audio.src = globalConfig.audio.baseUrl + filename;
    } else {
      audio.src = globalConfig.audio.baseUrl + filename + defaultExtension;
    }
    audio.play();
    audio.onended = function (e) {
      return resolve(e);
    };
  });
}

function pause() {
  // 没有播放完成就暂停
  if (!audio.ended) {
    audio.pause();
  }
}

var audio$1 = {
  play: play,
  pause: pause
};

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator = core_getIterator;

var getIterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": getIterator, __esModule: true };
});

var _getIterator = unwrapExports(getIterator$1);

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime =  module.exports ;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

var asyncToGenerator = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _promise2 = _interopRequireDefault(promise$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
});

var _asyncToGenerator = unwrapExports(asyncToGenerator);

/* 硬件初始化 */
var devInit = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
    var init = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(dev, config, devType) {
        var CloseDeviceRes, OpenDeviceRes, InitRes;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return dev.CloseDevice();

              case 3:
                CloseDeviceRes = _context.sent;

                CloseDeviceRes && error$1(devType + '|\u5173\u95ED\u4E32\u53E3\u5931\u8D25|' + CloseDeviceRes);
                _context.next = 7;
                return dev.OpenDevice(config);

              case 7:
                OpenDeviceRes = _context.sent;

                OpenDeviceRes !== 0 && error$1(devType + '|\u6253\u5F00\u4E32\u53E3\u5931\u8D25|' + OpenDeviceRes);
                _context.next = 11;
                return dev.Init(config);

              case 11:
                InitRes = _context.sent;

                InitRes !== 0 && error$1(devType + '|\u521D\u59CB\u5316\u5931\u8D25|' + InitRes);
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](0);

                console.error(_context.t0);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 15]]);
      }));

      return function init(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    var winExtInfo, devs, devKeys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, config;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!hospital || !hospital.winConfig.win_ext_info)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return');

          case 2:
            winExtInfo = JSON.parse(hospital.winConfig.win_ext_info);
            devs = {
              'printDev': DevPrintApi,
              'readCardDev': DevReadCardApi,
              'issueCardDev': DevIssueCardApi,
              'idCardDev': DevIDCardApi,
              'cashDev': DevCashApi,
              'umsDev': null
            };
            devKeys = _Object$keys(devs);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 8;
            _iterator = _getIterator(devKeys);

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 19;
              break;
            }

            key = _step.value;
            config = winExtInfo[key];

            if (!(config && devs[key])) {
              _context2.next = 16;
              break;
            }

            _context2.next = 16;
            return init(devs[key], config, key);

          case 16:
            _iteratorNormalCompletion = true;
            _context2.next = 10;
            break;

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 25:
            _context2.prev = 25;
            _context2.prev = 26;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 28:
            _context2.prev = 28;

            if (!_didIteratorError) {
              _context2.next = 31;
              break;
            }

            throw _iteratorError;

          case 31:
            return _context2.finish(28);

          case 32:
            return _context2.finish(25);

          case 33:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[8, 21, 25, 33], [26,, 28, 32]]);
  }));

  return function devInit() {
    return _ref2.apply(this, arguments);
  };
}();

var hospital = null;

/** 设置html font-size大小 */
function setHtmlFontSize(_ref) {
  var fontSize = _ref.fontSize;

  var docEl = document.documentElement;
  if (fontSize === false) return;
  if (fontSize) {
    docEl.style.fontSize = fontSize;
    return;
  }
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function recalc() {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 1280) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 1280) + 'px';
    }
  };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
}

/* 设置标题 */
function setTitle() {
  if (hospital && hospital.hosp_name) {
    document.title = hospital.hosp_name;
  }
}

function init$1(config) {
  hospital = config.store.state.common.hospital;
  setHtmlFontSize(config);
  setTitle();
  devInit();
  /* 屏蔽右键菜单 */
  document.addEventListener("contextmenu", function (e) {
    return false;
  });
  /* 禁止用户两指缩放 */
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  });
}

var defineProperty$2 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(defineProperty$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
});

var _defineProperty = unwrapExports(defineProperty$2);

var f$5 = _wks;

var _wksExt = {
	f: f$5
};

var iterator = _wksExt.f('iterator');

var iterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": iterator, __esModule: true };
});

unwrapExports(iterator$1);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$3 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol =  {} );
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$3($Symbol, name, { value: _wksExt.f(name) });
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$6 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$6
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$7 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$7
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$8 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$8
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;





















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON$1 = _global.JSON;
var _stringify = $JSON$1 && $JSON$1.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE$1 = typeof $Symbol == 'function' && !!_objectGops.f;
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE$1) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return _objectGops.f(_toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON$1 && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON$1, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core.Symbol;

var symbol$1 = createCommonjsModule(function (module) {
module.exports = { "default": symbol, __esModule: true };
});

unwrapExports(symbol$1);

var _typeof_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator$1);



var _symbol2 = _interopRequireDefault(symbol$1);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

var _typeof = unwrapExports(_typeof_1);

/** 根据身份证算出年龄 */
function getAgeByIdCard(idCard) {
  if (!idCard) return "";
  idCard = idCard.toString();
  var len = idCard.length;
  if (len == 0) {
    return 1;
  } else if (len != 15 && len != 18) {
    //身份证号码只能为15位或18位其它不合法
    return 1;
  }

  var strBirthday = "";
  if (len == 18) {
    //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday = idCard.substr(6, 4) + "/" + idCard.substr(10, 2) + "/" + idCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + idCard.substr(6, 2) + "/" + idCard.substr(8, 2) + "/" + idCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate()) {
    age--;
  }
  return age;
}

/* 根据身份证获取生日 */
function getBirthByIdCard(idCard) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  if (!idCard) return "";
  idCard = idCard.toString();
  var len = idCard.length;
  var strBirthday = "";
  if (len == 18) {
    //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday = idCard.substr(6, 4) + separator + idCard.substr(10, 2) + separator + idCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + idCard.substr(6, 2) + separator + idCard.substr(8, 2) + separator + idCard.substr(10, 2);
  }
  return strBirthday;
}

/** 数据脱敏 */
function masking(value) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : start;

  if (!value) return "";
  if (start + end > value.length) return value;
  var startStr = value.substring(0, start);
  var endStr = value.slice(end / -1);
  var length = value.length - (start + end);
  var tempStr = "";
  for (var i = 0; i < length; i++) {
    tempStr += "*";
  }
  return startStr + tempStr + endStr;
}

/** 刷新 */
function refresh() {
  if (window.nativeMethod) {
    window.nativeMethod.refresh();
  } else {
    window.location.reload(true);
  }
}

/** 生成guid */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function buildOpenUserID() {
  if (store.hospital) {
    var openCode = store.hospital.hosp_code + '_' + store.hospital.org_code + '_' + store.hospital.winConfig.win_code;
    if (openCode) {
      return openCode;
    }
  }
}

function toArray(list) {
  if (Array.isArray(list)) return list;
  return list ? [list] : [];
}

function isEmpty(value) {
  if (!value) return true;
  if (Array.isArray(value) && value.length == 0) return true;
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && _Object$keys(value).length == 0) return true;
  return false;
}

var utils = /*#__PURE__*/Object.freeze({
	__proto__: null,
	refresh: refresh,
	guid: guid,
	buildOpenUserID: buildOpenUserID,
	toArray: toArray,
	isEmpty: isEmpty,
	masking: masking,
	getAgeByIdCard: getAgeByIdCard,
	getBirthByIdCard: getBirthByIdCard
});

var autoLeaveQueue = [];

var storeCommon = {
  state: {
    // 硬件信息
    hardware: store.hardware || null,
    // 是否自动退出
    isAutoLeave: true,
    // 是否全屏
    isFullscreen: false,
    // 局部倒计时
    localExitTime: null,
    // 当前倒计时时间
    nowTimeout: 0,
    // 当前医院
    hospital: store.hospital || null,
    // 10.11、获取提醒字典 IF_FWC_Tip_Dictionary
    tipDicts: store.tipDicts || {},
    // 10.15、获取医院配置 IF_Get_Inhospital_ConfigList
    fwcHospConfig: store.fwcHospConfig || {},
    // 心跳包数据
    heartbeatPacket: { dateTime: new Date() }
  },
  mutations: {
    setHospital: function setHospital(state, v) {
      v.treeNodeList = v.treeNodeList.filter(function (item) {
        return item.selected;
      });
      state.hospital = v;
      store.hospital = state.hospital;
      store.orgId = state.hospital.id;
      store.winConfigId = state.hospital.winConfig.winConfigInfo.win_config_id;
      store.winCode = state.hospital.winConfig.win_code;
      store.deptId = state.hospital.winConfig.dept_id;
    },
    setTipDicts: function setTipDicts(state, v) {
      state.tipDicts = v;
      store.tipDicts = v;
    },
    setFwcHospConfig: function setFwcHospConfig(state, v) {
      state.fwcHospConfig = v;
      store.fwcHospConfig = v;
    },
    setLocalExitTime: function setLocalExitTime(state, v) {
      state.localExitTime = v;
    },

    /* 重置全局倒计时 */
    resetExitTime: function resetExitTime(state, v) {
      state.localExitTime = null;
    },
    setHardWare: function setHardWare(state, v) {
      state.hardware = v;
      store.hardware = state.hardware;
    },
    setNowTimeout: function setNowTimeout(state, v) {
      _.isUndefined(v) ? state.nowTimeout-- : state.nowTimeout = v;
    },
    setHeartbeatPacket: function setHeartbeatPacket(state, v) {
      state.heartbeatPacket = v;
    },
    isFullscreen: function isFullscreen(state, v) {
      state.isFullscreen = v;
    },
    _isAutoLeave: function _isAutoLeave(state, v) {
      if (state.hospital && v) {
        state.nowTimeout = state.hospital.exit_timeout;
      }
      state.isAutoLeave = v;
      globalConfig.autoLeavelEl.dispatchEvent(new Event("touchstart"));
      globalConfig.autoLeavelEl.click();
    }
  },
  actions: {
    isAutoLeave: function isAutoLeave(_ref, v) {
      var commit = _ref.commit,
          state = _ref.state;

      // 如果isAutoLeave状态为false并且入参也为false，就把后者的false存起来
      // 之后只能由改变从false改变true
      if (!state.isAutoLeave && !v) {
        autoLeaveQueue.push(v);
      } else {
        commit("_isAutoLeave", v);
        !_.isEmpty(autoLeaveQueue) && commit("_isAutoLeave", autoLeaveQueue.shift());
      }
    },

    /**
     * 获取字典
     */
    fetchFwcHospConfig: function fetchFwcHospConfig(_ref2) {
      var _this = this;

      var commit = _ref2.commit;
      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var resp, HospitalConfigList, configObj;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                commit("setFwcHospConfig", {});
                _context.prev = 1;
                _context.next = 4;
                return HospitalServiceApi.IF_Get_Inhospital_ConfigList({}, { alert: false, loading: false, log: false });

              case 4:
                resp = _context.sent;
                HospitalConfigList = toArray(resp.HospitalConfigList);

                if (!isEmpty(HospitalConfigList)) {
                  configObj = HospitalConfigList.reduce(function (prev, item) {
                    return _extends$1({}, prev, _defineProperty({}, item.ConfigCode, item.ExtInfo));
                  }, {});

                  commit("setFwcHospConfig", configObj);
                }
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](1);

                console.error(_context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[1, 9]]);
      }))();
    },

    /**
     * 获取字典
     */
    fetchTipDicts: function fetchTipDicts(_ref3) {
      var _this2 = this;

      var commit = _ref3.commit;
      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var resp, TipDictionaryList, tipObj;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                commit("setTipDicts", {});
                _context2.prev = 1;
                _context2.next = 4;
                return HospitalServiceApi.IF_FWC_Tip_Dictionary({}, { alert: false, loading: false, log: false });

              case 4:
                resp = _context2.sent;
                TipDictionaryList = toArray(resp.TipDictionaryList);

                if (!isEmpty(TipDictionaryList)) {
                  tipObj = TipDictionaryList.reduce(function (prev, item) {
                    return _extends$1({}, prev, _defineProperty({}, item.TipCode, item.CommonContent.replace(/\\r\\n/g, "<br>")));
                  }, {});

                  commit("setTipDicts", tipObj);
                }
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](1);

                console.error(_context2.t0);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[1, 9]]);
      }))();
    }
  },
  getters: {
    getHeartbeatPacket: function getHeartbeatPacket(state) {
      return state.heartbeatPacket;
    },

    /* 医院ID */
    getOrgId: function getOrgId(state) {
      if (state.hospital) {
        return state.hospital.id;
      }
    },

    /* 机器ID */
    getWinConfigId: function getWinConfigId(state) {
      if (state.hospital) {
        return state.hospital.winConfig.winConfigInfo.win_config_id;
      }
    },

    /* 机器编号 */
    getWinCode: function getWinCode(state) {
      if (state.hospital) {
        return state.hospital.winConfig.win_code;
      }
    },

    /* 部门ID */
    getDeptId: function getDeptId(state) {
      if (state.hospital) {
        return state.hospital.winConfig.dept_id;
      }
    },

    /* 医院扩展信息 */
    getExtInfo: function getExtInfo(state) {
      if (state.hospital && state.hospital.ext_info) {
        return JSON.parse(state.hospital.ext_info);
      } else {
        return {};
      }
    },

    /* 机器扩展信息 */
    getWinExtInfo: function getWinExtInfo(state) {
      if (state.hospital && state.hospital.winConfig.win_ext_info) {
        return JSON.parse(state.hospital.winConfig.win_ext_info);
      } else {
        return {};
      }
    }
  }
};

var script$3 = {
  name: "BemLogcat",
  data: function data() {
    return {
      logs: null,
      selectedLevel: 0,
      levelOptions: [{ label: "全部", value: 0 }, { label: "info", value: "info" }, { label: "warn", value: "warn" }, { label: "error", value: "error" }],
      selectedTime: "h",
      timeOptions: [{ label: "一小时内", value: "h" }, { label: "两天以内", value: "d" }, { label: "全部", value: 0 }]
    };
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: function show() {
      if (this.show) {
        this.getAllByTimeAndLevel();
      }
    },
    selectedLevel: function selectedLevel(level) {
      this.getAllByTimeAndLevel(level, this.selectedTime);
    },
    selectedTime: function selectedTime(unit) {
      this.getAllByTimeAndLevel(this.selectedLevel, unit);
    }
  },
  methods: {
    /** 上传日志 */
    uploadLogs: function uploadLogs(logs$1) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logs$1.forEach(function (log) {
                  log.in_param = log.in_param ? _JSON$stringify(log.in_param) : "";
                  log.out_param = log.out_param ? _JSON$stringify(log.out_param) : "";
                });
                _context.next = 3;
                return ZWLApi.receiveLogs({ zzjWebLogsList: logs$1 });

              case 3:
                _context.next = 5;
                return remove$1(logs$1);

              case 5:
                _this.refresh();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /** 刷新 */
    refresh: function refresh() {
      this.getAllByTimeAndLevel();
    },

    /** 上传按钮事件 */
    handleUploadClick: function handleUploadClick() {
      var _this2 = this;

      this.$bem.showalert({
        content: "上传并删除全部日志",
        showCancel: true,
        isAutoExit: false,
        onClose: function onClose(confirm) {
          if (confirm) {
            getAllByTime(function (res) {
              if (res.length > 0) {
                _this2.uploadLogs(res);
              } else {
                _this2.$bem.showalert("日志为空");
              }
            }, 2, 'h');
          }
        }
      });
    },

    /** 清空日志 */
    clearLog: function clearLog() {
      var _this3 = this;

      this.$bem.showalert({
        content: "确定要清空所有日志吗？",
        showCancel: true,
        isAutoExit: false,
        onClose: function onClose(confirm) {
          if (confirm) {
            clear$1();
            _this3.refresh();
          }
        }
      });
    },

    /** 根据时间和日志等级获取日志 */
    getAllByTimeAndLevel: function getAllByTimeAndLevel(level, timeUnit) {
      var _this4 = this;

      level = level || this.selectedLevel;
      timeUnit = timeUnit || this.selectedTime;
      this.$bem.loading.show();
      if (!timeUnit) {
        getAll$1(function (res) {
          _this4.logs = level ? res.filter(function (item) {
            return item.level === level;
          }) : res;
          _this4.$bem.loading.close();
        });
      } else {
        getAllByTime(function (res) {
          _this4.logs = level ? res.filter(function (item) {
            return item.level === level;
          }) : res;
          _this4.$bem.loading.close();
        }, 2, timeUnit);
      }
    },

    /** 关闭事件 */
    close: function close() {
      this.$emit("update:show", false);
      this.logs = [];
    },

    /** 显示日志详细 */
    showContent: function showContent(log) {
      this.$set(log, "showContent", !log.showContent);
    },
    levelStyle: function levelStyle(level) {
      var colors = {
        info: "#67C23A",
        warn: "#E6A23C",
        error: "#F56C6C"
      };
      return {
        color: colors[level]
      };
    }
  }
};

var __$_require_assets_imgs_logcat_refresh_png__ = "data:image/png;base64,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";

var __$_require_assets_imgs_logcat_upload_png__ = "data:image/png;base64,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";

var __$_require_assets_imgs_logcat_clear_png__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAQS0lEQVR4Xu2dXXIUORLH/QF+hTnB2icATjDmBOM5AZ4TYD8Yh5/wPDmAB9snGHOCMSeY3hOsOQH2Cdb7ajDeFNG929vb+ihlpj6y/h1BDBNIWdJf+atUVSml1RX8oAAU8CqwCm2gABTwKwBA4B1QIKAAAIF7QAEAAh+AAnkKIILk6YZaI1EAgIxkoNHNPAUASJ5uqDUSBQDISAYa3cxTAIDk6YZaI1EAgIxkoNHNPAUASJ5uqDUSBQBIxkCfnp4+vbu7+4Wq7qyurj7NMFGsysPDwy1d7HJjY+PT/v6++zt+AxQAIAPEckU/fPjwlpxuj/7aNBhLunVLMJ8dHBz8PrDLoy4OQAYM//v37/+g4rsDqrRY9OLNmze/tdiwFtsEQBJH5d27d8d0B36bWLzpYhQBfz88PDxuupGNNA6AJAzEycnJ5vr6+peEot0Uub+/3zo6OrrupsGVGgpAEoSnqdUZFXudULSnIuc01XLPUvgFFAAgCe5BgPyDij1PKNpTkSsC5EVPDa7RVgCSoDoB8pBQrLsiBAjGPzJqECjBrUOA0APv57W1tSanKt+/fz+jFwvPfF0EIPHBByBxjVYiEeTv5GjbCWaKF6F2T+iiPwOQfOkBSIJ2ACRBJKNFAEjCwAKQBJGMFgEgCQMLQBJEMloEgCQMLABJEMloEQCSMLAAJEEko0UASMLAApAEkYwWASAJAwtAEkQyWgSAJAwsAEkQyWgRAJIwsAAkQSSjRQBIwsACkASRjBYBIAkDC0ASRDJaBIAkDCwASRDJaBEAkjCwACRBJKNFAEjCwAKQBJGMFqkOCG2js015C68b319qOzD+bq+pq0b9w2VBhrYnmjTa7hW3nxfl2ZzTNkVV21gVENopZI/AOG11kNCu+goQKPu0A4vbE6DKrxogFncKqTKC9i96SzuwvKi1A0s1QGhev0tj6zZiww8KxBT4jbI2L2KFNP69GiCYXmkMp02bNadZ1QChCOIeIN12OvhBgZgCLyiCVHkRUg0QpwhBckn/cbuk4wcFfAp8Ijh2aslTFRB3jMDXr1+PqfPWdi2sNZ7Wrnv++PHj45rHNlQFZH403ZQr9C2EvpVc0r8/WeYBLe9NZc1jU/sT2ZPrhsZy12fLfQOpNaVabFMzgMSEj+zx5AT9KWYD/15OARqvf9LVfB8pm91LzCogK9glsJzzp1yp1+U5ACRldFGGrQAAYUs4zEDsjRciyDA9tUtHAKn6ZmpI37t5Bomd8IQDYYYMu27Z2Deunk64MgMIvRV5WXvlp67b9WPdrdAmCP4KvKXq5gg4ANKP33XTUgBSYahiUyxEkAqD4rlkAiBVl7APUaqbCBITnTpdbcXnEMHHUDa2Urunm5kZQHp68LMOiaVoD0Cse2uF/gGQCqLHpliIIBUGxXNJAFJpLCIfn3Dud6VxWbwsAXJBzxmvfM3p6aNuN1MsJ7aV5QuN+LFaMywdHgpA1NxkvIYBSKWxLxVBaIrgpgc70/yUS0ra+aiZtOMSx759+/aanqO2nbR03cmjR4/OC17zmq79ibbXcRme7B8AYUuYZ4Ac94qc55mn9hXNbV/kWf5vLRpct9PK7oKdK4LkpYbDTrMq3bIMl6M//xPpzzI9plsuuf0AFvM1RJ7jSENne7E/s6Z0kwvy42bFdaiS9bXvTKE3ZXSH/Uh32EVw2N0PvfHR2s0jtDJa4iNeqUjPFj/BAACZE4kG1u3gtzQ/npz1mgDZStB0UJEI9Cp325ADS7wuByCDXECusHYE0ba/TInSgMR2tAQg/ztKXUUQ7ffrNZKySgOi/cF1+kzl8tF9P5HnHLnbbthSb4Ac0xz5ra9L3PlzjS/A1gDRBrAUGLPrAJA5xQHIijt2gJXMBEBKI1zQgccACPXRfd/5MzCMrLQBAFIREO08g5EAojpNjQFC7sMCsLT7dTXFiolfYHognglX+hlE+yagbR+ABBRoABDW/LyF17zaDqxtH4AAkHkFxD8UxhyYLs46aiBmn/umEYAEFNDeb0k7QrUQQbS/9cQA6W3/sq6eQZyDae/YF1mGIb4eq/QziPZqAW37iCARBbTX+WjbX+weACnt8sOuZy2CsOfsAOQNyycQQYYBKF6a5ri3voN06GIAJKI46feF9Nv0FJPQb0K2f15mn17D/4tWRPvODBH3FQmDrLuFRAOG2ojcodgH6YSSsjSWvFeYYj0ENJcAxMTBOTONrAHCPkin9BTBICCqAA69oXLLA5AFBQHIm22OU5V+huO0NaUuABkRICVyNbRfw6c4tWSZ7gDR/hAVS8qizRt+kty8oeQUS/tDqPaHXEnHT7VlDhDuUoYYgFz7Nb+DaAOibT/VqSXLAZAFNQHI4XGugwGQXOUE62k7sLb9liMItY2VqwFABB0911RsELiDTIDs0TTq1Ne+nqdY2vBrJ7Tl+gynXndTrBggBZKmRHNCSj6kawOibZ/j6Ll1AciCctoA1pxiaTuwtv1cJ+fUAyAAZF4BJEst+EN3gGh/7LIcQQokS5k5OGfGSXeAuIZrL2co+TW45DOI9jIabfucqVJuXQCyRDltAOcvCUByXbdMPQACQP6jAPfsQESQMtBGrxI5SEcip6HYku2SEaRAspT34Bx6/f6ZkqV8h+pEx7xWgV4jyIQEW5q15oTk3glLJk2VBER76qhtvwYkAGT5FEsVwIrPIKqREYDUQLiCA5ecSyOCNOJUnmZ0GUFiORvcKZZFQLS/H2nbr4VRr4Co7lBOgHjPKnQDJZk0VSqCaH8A1bYPQAYooL3mR9t+jWcQbQfWtj/APUSLIoIskROADPcxADJcM7Ua2nkHYwSEBks1WYprX82ZIoa7jCAJdyvWQTfaANaYYmlDr20fgAxQIAEQVlKTtn0AMmCwKxe1GkEAyIJjad/hte3X4qRLQLT3X0IEGe6OMUDIIisZa3iLZGp0CYjrumbOhjaANaZY2slSJT+uyrh+mhWrgHSzorfUh0JtB9a2n+bO8qUAiEfTUgvvAIi8U0taBCAA5IcCmuvXejw4Z+YWPQMyoU74TjK6puScLc6dxFoECSVLSSQzkV6mDs4xDYj2HZHss0+ymg1AwSkWckEy7pgmI0gBQNhTEgCS4a0VqgAQ/zOIdwonASAAqeDtGZfsFpDYh6n7+/uto6Oj6wxNflQp9dqyxBQrlsxEzyAf6ZltN1erk5OTzfX19S+++tz9knPbJVHPLCDcXdhjSVNcAEtGEO2VAdr2JRw91wYA8SgXi1BcAAFIrsuWrQdAAMgKdwqECFIW2qSr0R1+h+7ifwbmvb/SvPoyydiSQiOLIN3kz+SOZ269biOI9l0rljRFd10WgCWnWNqnZpW6meQ6OaceAPGopw1gYUBUd4EBIBwElepqO7C2fQCi5BjCZruNILF3+6TTOS3A28vVC4CkKxd7JS65j1h6q2RKdguI677mgsJSH79KfCi0tBOljNunWwEgAa00ASw5xdJeFaBtP92d5UsCEADCXngJQOTBFLFIA3NNhv7mMdZF2m2JKZa2A5N9cwfnzHyq9wgyoY5oHqRzSx8jn2gBOH2OCvWBDfn0GqoOXGIqKnJHzTACQMJTrJDziiRNFYogSJbKgMNVASD5gLDn7gUjCAAZIyAWXl9ajyDcXJNMvxar1nUE0V7ioP1w20IE4TpwqQ+qYh4/0BAACQgWA1AiaUo7gmg7sLb9gf4sXhyAMACRSJoCIOI+LWqwd0D2yElPfYpwHTgWQbj2S0yxtO/wMfvUR9bBPKLenmGsa0Big0Pza1Yi0EgAaV6jDL8Wq2IdENY5IbGsRYm7o/YUC8lSPFYASEC/hAjFArDEFEs7Cmrb57k3v3bXgNDd9zlJ4JZRLP31sBlBgQhSNZuQBqbLg3NmDtU1INM7cOgr8SdKmtrJvY8ggsSVI8Ddxhi/+Epyd42Pt0C3hHVAWIv9YklTNDSsrMVCU6wLetv2SsuBS3xM1UUgbB2ARNTXXqmqPcXSdmBt+zXhcNcGIACE5QMhQHo+OMfSM8iEOtPtQToGIojJg3NGAYjrJPchkV5jqiZNFQAEyVKMeRorvDKuK1ZVew5c2T7rJUPCW77m7Ys5SqYhABJ/BvFO4SQiVIEIgmSpTDisPKSfUUde+zTgLklHBPF7V+w1OPdDLcOvxap2H0G0lzpofwirGUGQLBXnCIBENIoBSNVZSyk0AdFeCaBtP+6++iUACBMQbk4IANF3cs4VLADS9UE6PQNCbd8l5/vD54BSZ6hwHJxbt3tAtMN8bIo15giirQ3XuSXqA5CIijEAqTorpVQzgiBZio8IAGECwn2VqQxI1VwQbnTluzffQveAaL+Lj0WQMQNCcAe/QfV8cM4Mre4BcR3RXJIOQPx3Ye2PqPz7P98CAIloqH3Um/IUK5gsxb3DAxA+gEUsaEYQ7QilCYi2A2vbL+I8kYtYiSDX1E+1g3RCS947fga5oVSATY4TEiDepfRkl22f0zapulYAmZAgmgfpeKcq3Dc1oVex3I3vQs9P3HVY2pFVysG5dgBIgoLT55CrxSgl4WTu8gTJFYH2bL4pZPvz4eGh29aI9fMcEXFDzx/P9/f3bznGtae2nLZJ1QUgiUpOITmm4s5pnWNd0hTlIrF6tNg0kvzYoojguCQ43CtUkd90SYiz/ZRsTzY2Ns64cCCCiAxNGSPaS9LL9KK/q4QiiFR0ra2KiQgSWxNEIrOWpNcepBavr/19qJU+jwIQ7oN0K4PVUjsASEujEWlLLIIAEPnBBCDymqpZ1F61qtbwjg0nAMI6d6QVaUxMscYyWK04jWvHWKL2WABhn+PRknO20BYA0sIoJLYhIYIAkEQtU4sBkFSlGiiXsOKWdU5IA11srglj+fZkYoo1nRP/33KNmVfRR6tr+jK91ZyXddwgiiBf6O3g5rIuSC2TaUEeS4AEcx/wqlfO3WJTWroS+2AhudbyLJkBJLYFDck0obVTL3lyobZTgLT+i/6z7VPD0s3IDCDTaVboqAK3CPBXmmq5M/Xwy1Qg4WhsE3kgM3msARKcZlGn3SrclxRJ3NJ1/AYqQJHDrWR20eNpoKqZ6ZXroylApgPoPRZ6Oqi3FEn2KJJ8HOgfoy5OkeMVTZ3cEnwvHO7INVpKvymxlL4VsU0BMp1mxaLITHsXRS7oD6JJ2Btd1NilP9HkLW76cStQzLfDHCBun6y1tTX3yvdJi4JbbZPF6GFuijVzvoQ3Wlb9tFq/LL25Mh1BZp3z5GJXcyDLF7Y4tZqNl7kp1qxjbvnJ3d3dGd3ZXll2ztp9s5Ja69PRLCCIJEXQMfVKd5li5gFxnXbPJHSnc9EED+4y3NyQlrsHBwcTGXPtWhkFIE7+6ZRrzw0s/a9vF8Z2R6qNlt3QjeZCatugNroUbsVoAJmXwX1QpIF2R7e5j17R9/s9DKRWG90+Ws42aeX2ARvdN6NRAqLlTLBrTwEAYm9M0SNBBQCIoJgwZU8BAGJvTNEjQQUAiKCYMGVPAQBib0zRI0EFAIigmDBlTwEAYm9M0SNBBQCIoJgwZU8BAGJvTNEjQQUAiKCYMGVPAQBib0zRI0EF/g2lEJCqAN0dggAAAABJRU5ErkJggg==";

var __$_require_assets_imgs_logcat_close_circle_png__ = "data:image/png;base64,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";

var __$_require_assets_imgs_logcat_right_png__ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAM20lEQVR4Xu2dS2xdxRnHk/gpS/YKedNVK1VV6wULvDB+5eFalryN5F2Ut7wgTUp4pEFJGpoURFIFEYqCIBXQEhYElVUQCqp9rbAgUiNBi9pIPCoi0lAnPIuxcfzof6qLlDaxc+6cOefMmflZuhIKZ7755vfNT3PPuXPvrFzBHwQgsCSBlbCBAASWJoAgzA4ILEMAQZgeEEAQ5gAE7Aiwgthxo1UkBBAkkkIzTDsCCGLHjVaREECQSArNMO0IIIgdN1pFQgBBIik0w7QjgCB23GgVCQEEiaTQDNOOAILYcaNVJAQQJJJCM0w7Aghix41WkRBAkEgKzTDtCCCIHTdaRUIAQSIpNMO0I4AgdtxoFQkBBImk0AzTjgCC2HGjVSQEECSSQjNMOwIIYseNVpEQQJBICs0w7QggiB03WkVCAEEiKTTDtCOAIHbcaBUJAQSJpNAM044Agthxo1UkBIIVZGxs7E7V8C697tDrYktLS6Wrq+urSOrKMB0RCE6QSqVy9+Li4u/E58c3MtK/Ta1cufLJ2dnZw0NDQ1OO+BEmcAJBCaJVY70keGW5mkmUS7pmdO3ata8HXluG54BAMIJMTEz8cGFh4S9i0pyQy6nGxsbdPT09kwmv57IICQQjyPj4+NOq32iNNfxc1z+o1eRkje24PBICwQiit1cf6K3TDyzrdk7ttkiU9y3b0yxQAsEIohVkMW2NdH/yy3Xr1v0qbRzah0MAQW6u5XsSZYNEOR9OmRmJLQEEuTU5sxo9Mzc3t2dwcPBLW7i0Kz8BBFm+hlf0v3fq3mTZR8flnwaMYCkCCJJsbpzRI+TRgYGBy8ku56pQCCBI8kp+rUv3rVmz5rielqV+IJC8W64skgCC1E7/z2qyWW+73q29KS3KRgBB7Co2pyddx5qbmw92d3dP24WgVRkIIEiKKkmSj/R2a5NWk0qKMDT1mACCuCnOiwpzr0S55iYcUXwhgCCOKqHV5FOtJvdJkhcchSSMBwQQxH0RxletWrV19erV/3Afmoh5E0CQbIjPaEU51NbWdrSzs/N6Nl0QNQ8CCJIt5b9X93VdyLYbomdFAEGyIluNK0EWdG9yoqGhYW9vb++/M+6O8I4JIIhjoMuEuyJZtmmX8Gv5dUlPaQkgSFqCtbd/ta6u7p7+/n6zEZI/zwkgSAEF0kpifn5orx4Jn2BfVwEFqKFLBKkBVgaXmn1dGyTKxQxiE9IBAQRxADFlCPMY+Mj09PSh4eHhb1PGorljAgjiGKhtOL3t+lBvtzZqNXnTNgbt3BNAEPdM00Z8vr6+fndfX5/5SSL+CiaAIAUXYInur+rfzebHU36mF09WCOJ3rcf1AeMmfcB4ye80w80OQTyvre5NvtHmx4OTk5PHRkZG5j1PN7j0EKQ8Jf1rdV/XO+VJufyZIkiJaihB5qtHOOzjCId8Cocg+XB23cvHkmWUfV2usd4cD0GyZ5xlD6d1hMMOjnDIDjGCZMc2r8hfaDXZo0fCz7Kvyz1yBHHPtKiIb6ljs6+LIxwcVgBBHMIsOpRWklmtIo+2t7c/0tHRMVt0PiH0jyAhVPHmMXCEg6O6IogjkB6G0YKyeHJ+fv4BjnCwrw6C2LMrS8tPJMouPRJ+uSwJ+5QngvhUjQxzkSRn9drCEQ61QUaQ2niV+moJMqV9Xfv1o3ZP6GZ+odSDySl5BMkJtGfdvF19JMwRDrcpDIJ4NnPzSqe6r+vxpqamAxzhsDR1BMlrRnrajznCQW+7tuvkrDc8TbHQtBCkUPz+dC5RXtJ9yS6OcPjfmiCIP3O08EwkyWdaTe7XavJc4cl4kgCCeFIIz9I4J1E2coTDihUI4tnM9CidGeVyuLW19UjMRzggiEcz0tNUzBEOm/VJ/HlP88s0LQTJFG8wwc2+rqf15aw9sR3hgCDBzOHsByJJ/qlefqbV5I/Z9+ZHDwjiRx3KlsUZJbxNj4Q/KVviteaLILUS4/rvCJjTsh7SI+GnQv6qL4Iw4dMSMEc4bNZqEuS+LgRJOz1obwjM6f7k6MzMzMOhHeGAIExwZwSqRzhs1WpScRa04EAIUnABQuxeovxeP7r98xCOcECQEGeoH2O6ppv33bqJ/4Mf6dhlgSB23GiVnMC49nVtLeu+LgRJXmiutCcwraYPX7169TdlO8IBQeyLTsvaCZgjHMy+rgu1Ny2mBYIUwz3aXiWI+bGI316/fv2hMhzhgCDRTtViBy5RLusm3mxXeb3YTJbvHUF8rk4cue2XJId9HSqC+FqZiPLSarLe1x3CCBLRRPR1qGYbvQT5no/5IYiPVYkwJ92P9OtDxXO+DR1BfKtIvPns0L3IU74NH0F8q0ik+VR/gf64b8NHEN8qEmk+EuSnug/5k2/DRxDfKhJnPtd0/9Hu4zcTESTOCenVqCXGiAQ57VVS1WQQxMeqxJXTL3Rz/pivQ0YQXysTeF5sNcm5wOPj44s5d0l3FgTYrGgBzUUTBHFBMfMYbHfPHPESHSBIUeQT9csXphJhyvAiBMkQbrrQfOU2HT83rRHEDUeHUfjRBocwU4dCkNQInQXgZ3+coXQXCEHcsbSNxA/H2ZLLoR2C5AB56S746dFC8SfoHEESQMrmEn68OhuubqMiiFueCaJx/EECSN5cgiC5loIDdHLF7aAzBHEA8TYhOIIte8aZ9YAgmaE1gTnEM1O8OQRHkMwgcwx0ZmhzDIwgzmHPKOKvW1tbH+vs7LzuPHpJAvJ9kJIUKuc0z+nIgo1lPbLAJSsEcUmz5LF0o/GZxLhfX399ruRDcZY+gjhDWe5AkuMlfTd8l77+eq3cI3GbPYK45Vm6aBLjI60a27VqvFG65HNIGEFygOxjFxJjXivG401NTQe6u7vNF5r4uwUBBIlzWrytYW/Q26l34xx+8lEjSHJWpb9Sq8aU3k7t19OpJ7R6mJOe+LsNAQSJZIpIjrN6bRkYGLgcyZCdDBNBnGD0N4ik+Jey26nfvX3Z3yz9zQxB/K1N2szM/qmT8/PzDwwODn6ZNlis7REkzMq/Jzk2aNU4H+bw8hsVguTHOvOeJMWsbr4fbW9vf6Sjo2M28w4j6ABBwinyW9VHt++HM6TiR4IgxdcgbQZfaOXYo880nvXxfI20gyu6PYIUXYF0/Z9ubGzc0dPTM5kuDK2XIoAg5ZwbH2vVGNVN+GvlTL88WSNIeWplvvdq9k89OTs7u29oaGiqRKmXNlUEKU/pzNEB5tHtO+VJufyZIojnNZQU32j/1MHJycljIyMj856nG1x6COJ3SccbGho29fb2XvI7zXCzQxA/a3tVad2rR7en/EwvnqwQxL9aP19fX7+7r6/vc/9Siy8jBPGk5tWjAzZq1XjTk5RIQwQQpPhpYH5z6sj09PSh4eHhb4tPhwxuJIAgxc4Hc3SA+errxWLToPelCCBIAXNDb6e+Urd7JcYJ9k8VUIAaukSQGmA5uvTVurq6e/r7+684ikeYDAkgSIZw/y/0Fa0c29g/lR9wFz0hiAuKy8SQFAt6G3VCH/jt1Qd+5lQm/kpEAEGyLZY5OsDsn7qQbTdEz4oAgmRDdkZiHGprazsa89EB2aDNNyqCuOc9rs2FWzk6wD3YIiIiiCPqWjE+1b3GfXp0+4KjkITxgACCuCnCiwpjNhdydIAbnt5EQZAUpTBHB2jV2CQxKinC0NRjAghiV5w5yXGsubn5IEcH2AEsSysEqb1SZv/UZo4OqB1cGVsgSPKqfa1L9+kkpuPsn0oOrexXIkiyCp5ZWFgY5eiAZLBCugpBlq+m2VC4U2+nXgmp6IwlOQEEuTWrRf3zM3Nzc3s4OiD5ZArxSgS5uaocHRDiTLccU0iCmJNamy05/LeZbr4P6Cb8UJoYtA2LQDCCjI2NXdQE/5Flec6p3Rbda3B0gCXAUJuFJIg5uXVnjYUyP63zoMQ4WWM7Lo+EQDCCTExMfF+PYv9Ww9usUzo6YDdHB0Qy0y2HGYwgZvx6m7Veq8iyj2S1ReSSXtv1mcZZS2Y0i4hAUIKYulUqlbu1kpyUKD+5sY6SYqp6dMBhjg6IaIanHGpwgnzHQ6vJnfrvu/S6Q6+LLS0tla6uLvNzO/xBIDGBYAVJTIALIbAMAQRhekAAQZgDELAjwApix41WkRBAkEgKzTDtCCCIHTdaRUIAQSIpNMO0I4AgdtxoFQkBBImk0AzTjgCC2HGjVSQEECSSQjNMOwIIYseNVpEQQJBICs0w7QggiB03WkVCAEEiKTTDtCOAIHbcaBUJAQSJpNAM044Agthxo1UkBBAkkkIzTDsCCGLHjVaREECQSArNMO0IIIgdN1pFQgBBIik0w7QjgCB23GgVCQEEiaTQDNOOAILYcaNVJAQQJJJCM0w7Aghix41WkRBAkEgKzTDtCCCIHTdaRULgPxJWoAXyxvcXAAAAAElFTkSuQmCC";

var __$_require_assets_imgs_logcat_down_png__ = "data:image/png;base64,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";

/* script */
var __vue_script__$3 = script$3;
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.show ? _c("div", { staticClass: "bem-logcat bem--fullscreen" }, [_c("div", { staticClass: "bem-logcat__header" }, [_c("img", {
    staticClass: "icon",
    attrs: { src: __$_require_assets_imgs_logcat_refresh_png__ },
    on: { click: _vm.refresh }
  }), _vm._v(" "), _c("img", {
    staticClass: "icon",
    attrs: { src: __$_require_assets_imgs_logcat_upload_png__ },
    on: { click: _vm.handleUploadClick }
  }), _vm._v(" "), _c("img", {
    staticClass: "icon",
    attrs: { src: __$_require_assets_imgs_logcat_clear_png__ },
    on: { click: _vm.clearLog }
  }), _vm._v(" "), _c("img", {
    staticClass: "close",
    attrs: {
      src: __$_require_assets_imgs_logcat_close_circle_png__
    },
    on: { click: _vm.close }
  }), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectedTime,
      expression: "selectedTime"
    }],
    staticClass: "bem-logcat__select",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selectedTime = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, _vm._l(_vm.timeOptions, function (item) {
    return _c("option", { domProps: { value: item.value } }, [_vm._v(_vm._s(item.label))]);
  }), 0), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectedLevel,
      expression: "selectedLevel"
    }],
    staticClass: "bem-logcat__select",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selectedLevel = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, _vm._l(_vm.levelOptions, function (level) {
    return _c("option", { domProps: { value: level.value } }, [_vm._v(_vm._s(level.label))]);
  }), 0)]), _vm._v(" "), _vm.logs ? _c("table", {
    staticClass: "bem-logcat__main",
    attrs: { cellpadding: "0", cellspacing: "0" }
  }, [_vm._m(0), _vm._v(" "), _c("tbody", [!_vm.logs || _vm.logs.length == 0 ? [_c("p", { staticClass: "empty" }, [_vm._v("暂无日志")])] : _vm._e(), _vm._v(" "), _vm._l(_vm.logs, function (log) {
    return [_c("tr", {
      style: _vm.levelStyle(log.level),
      on: {
        click: function click($event) {
          return _vm.showContent(log);
        }
      }
    }, [_c("td", { staticClass: "create-time" }, [_vm._v(_vm._s(log.create_time))]), _vm._v(" "), _c("td", { staticClass: "oper-id" }, [_vm._v(_vm._s(log.oper_id || "---"))]), _vm._v(" "), _c("td", { staticClass: "oper-name" }, [_vm._v(_vm._s(log.oper_name || "---"))]), _vm._v(" "), _c("td", { staticClass: "desc" }, [_vm._v(_vm._s(log.desc))]), _vm._v(" "), _c("td", { staticClass: "unfold" }, [!log.showContent ? _c("img", {
      attrs: {
        src: __$_require_assets_imgs_logcat_right_png__
      }
    }) : _c("img", {
      attrs: {
        src: __$_require_assets_imgs_logcat_down_png__
      }
    })])]), _vm._v(" "), log.showContent ? _c("ul", {
      staticClass: "desc-content",
      on: {
        click: function click($event) {
          return _vm.showContent(log);
        }
      }
    }, [_c("li", [_c("span", { staticClass: "label" }, [_vm._v("时间")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(log.create_time))])]), _vm._v(" "), _c("li", [_c("span", { staticClass: "label" }, [_vm._v("类型")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(log.type))])]), _vm._v(" "), _c("li", [_c("span", { staticClass: "label" }, [_vm._v("等级")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(log.level))])]), _vm._v(" "), _c("li", [_c("span", { staticClass: "label" }, [_vm._v("描述")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(log.desc))])]), _vm._v(" "), log.api_time ? _c("li", [_c("span", { staticClass: "label" }, [_vm._v("接口时间")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(log.api_time))])]) : _vm._e(), _vm._v(" "), log.url ? _c("li", [_c("span", { staticClass: "label" }, [_vm._v("接口地址")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(log.url))])]) : _vm._e(), _vm._v(" "), log.in_param ? _c("li", [_c("span", { staticClass: "label" }, [_vm._v("接口入参")]), _vm._v(" "), _c("pre", { staticClass: "text" }, [_vm._v(_vm._s(log.in_param))])]) : _vm._e(), _vm._v(" "), log.out_param ? _c("li", [_c("span", { staticClass: "label" }, [_vm._v("接口出参")]), _vm._v(" "), _c("pre", { staticClass: "text" }, [_vm._v(_vm._s(log.out_param))])]) : _vm._e(), _vm._v(" "), log.data ? _c("li", [_c("span", { staticClass: "label" }, [_vm._v("额外数据")]), _vm._v(" "), _c("pre", {
      staticClass: "text",
      domProps: {
        innerHTML: _vm._s(log.data)
      }
    })]) : _vm._e()]) : _vm._e()];
  })], 2)]) : _vm._e()]) : _vm._e();
};
var __vue_staticRenderFns__$3 = [function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("thead", [_c("tr", [_c("th", { staticClass: "create-time" }, [_vm._v("时间")]), _vm._v(" "), _c("th", { staticClass: "oper-id" }, [_vm._v("操作人ID")]), _vm._v(" "), _c("th", { staticClass: "oper-name" }, [_vm._v("操作人姓名")]), _vm._v(" "), _c("th", { staticClass: "desc" }, [_vm._v("描述")]), _vm._v(" "), _c("th", { staticClass: "unfold" })])]);
}];
__vue_render__$3._withStripped = true;

/* style */
var __vue_inject_styles__$3 = undefined;
/* scoped */
var __vue_scope_id__$3 = undefined;
/* module identifier */
var __vue_module_identifier__$3 = undefined;
/* functional template */
var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = normalizeComponent_1({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//

var script$4 = {
  data: function data() {
    return {
      visible: false,
      gateway: null,
      username: "",
      password: ""
    };
  },

  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    show: function show() {
      if (this.show) {
        this.init();
      }
      this.visible = this.show;
    }
  },
  methods: {
    init: function init() {
      this.gateway = store.gateway;
      this.username = store.username;
    },
    save: function save() {
      // if (this.gateway.endsWith("/")) {
      //   this.gateway = this.gateway.slice(0, -1);
      // }
      store.gateway = this.gateway;
      store.username = this.username;
      store.password = this.password;
      store.authorization = null;
      refresh();
    },
    reset: function reset() {
      this.gateway = "https://zzjapi.linkingcloud.cn";
      var username = void 0,
          password = void 0;
      var hostname = window.location.hostname;

      if (/(\d{1,3}\.){3}\d{1,3}/.test(hostname)) {
        username = hostname;
        password = "80138013";
      } else {
        password = username = "";
      }
      this.username = username;
      this.password = password;
    },
    close: function close() {
      this.$emit("update:show", false);
    }
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "bem__api-url" }, [_c("bem-popup", {
    attrs: { show: _vm.visible, title: "设置", width: "85%" },
    on: {
      "update:show": function updateShow($event) {
        _vm.visible = $event;
      },
      close: _vm.close
    }
  }, [_c("ul", [_c("li", [_c("p", { staticClass: "label" }, [_vm._v("网关地址")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.gateway,
      expression: "gateway"
    }],
    attrs: { type: "search" },
    domProps: { value: _vm.gateway },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }
        return _vm.save($event);
      },
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.gateway = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("li", [_c("p", { staticClass: "label" }, [_vm._v("账号")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.username,
      expression: "username"
    }],
    attrs: { type: "search" },
    domProps: { value: _vm.username },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }
        return _vm.save($event);
      },
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.username = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("li", [_c("p", { staticClass: "label" }, [_vm._v("密码")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.password,
      expression: "password"
    }],
    attrs: { type: "password" },
    domProps: { value: _vm.password },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }
        return _vm.save($event);
      },
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.password = $event.target.value;
      }
    }
  })])]), _vm._v(" "), _c("div", { attrs: { slot: "footer" }, slot: "footer" }, [_c("bem-button", { on: { click: _vm.save } }, [_vm._v("登录")]), _vm._v(" "), _c("bem-button", { attrs: { type: "info" }, on: { click: _vm.reset } }, [_vm._v("重置")])], 1)])], 1);
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

/* style */
var __vue_inject_styles__$4 = undefined;
/* scoped */
var __vue_scope_id__$4 = undefined;
/* module identifier */
var __vue_module_identifier__$4 = undefined;
/* functional template */
var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = normalizeComponent_1({ render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

var script$5 = {
  name: "BemSetup",
  mounted: function mounted() {
    if (!this.storeHospital || !store.authorization) {
      this.visible = true;
    }
  },

  components: {
    logcat: __vue_component__$3,
    ApiUrl: __vue_component__$4
  },
  data: function data() {
    return _defineProperty({
      // 机构ID
      orgId: null,
      // 显示扩展信息详情
      isShowExtDetail: false,
      // 显示扩展信息详情
      isShowWinExtDetail: false,
      // 显示网关地址弹窗
      isShowApiUrl: false,
      // 显示键盘
      isShowInput: false,
      // 输入的密码
      inputVal: "",
      // 显示日志
      isShowlog: false,
      // 医院信息
      hospInfo: null,
      /* 医院信息需要展示的字段 */
      hospitalKeys: ["hosp_name", "app_id", "hosp_code", "org_code", "serv_url", "gate_way"],
      winConfigKeys: ["win_url", "win_code"],
      /* 自助机列表 */
      winCodeList: null,
      /* 自助机ID */
      winConfigId: 0,
      visible: false,
      count: 0,
      lastTime: null
    }, "isShowlog", false);
  },

  watch: {
    isShowInput: function isShowInput(val) {
      val && (this.inputVal = "");
    },
    visible: function visible() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.visible) {
                  _this.$store.commit("isFullscreen", true);
                  _this.$isAutoLeave(false);
                  if (store.authorization && store.orgId) {
                    _this.orgId = store.orgId;
                  } else {
                    _this.login();
                  }
                } else {
                  _this.$isAutoLeave(true);
                  _this.$store.commit("isFullscreen", false);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    orgId: function orgId(_orgId) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_orgId) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.next = 4;
                return OrgConfigApi.getWinCodeList({ orgId: _orgId });

              case 4:
                _this2.winCodeList = _context2.sent;

                if (_this2.storeWinConfigId && !_this2.hospInfo) {
                  _this2.winConfigId = _this2.storeWinConfigId;
                } else if (Array.isArray(_this2.winCodeList) && _this2.winCodeList.length > 0) {
                  _this2.winConfigId = _this2.winCodeList[0].id;
                } else {
                  _this2.winConfigId = 0;
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    winConfigId: function winConfigId(id) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (id) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                _context3.next = 4;
                return OrgConfigApi.getOrgWinconfigDetail({
                  orgId: _this3.orgId,
                  winConfigId: _this3.winConfigId
                });

              case 4:
                _this3.hospInfo = _context3.sent;

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    }
  },
  computed: {
    // 安卓原生方法
    nativeMethod: function nativeMethod() {
      return window.nativeMethod;
    },
    storeHospital: function storeHospital() {
      return this.$store.state.common.hospital;
    },
    storeWinConfigId: function storeWinConfigId() {
      return this.$store.getters.getWinConfigId;
    },

    screenWidth: function screenWidth() {
      return window.screen.width;
    },
    screenHeight: function screenHeight() {
      return window.screen.height;
    }
  },
  methods: {
    /* 登录 */
    login: function login() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
        var username, password, hostname, resp;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                username = void 0, password = void 0;

                if (!store.username) {
                  _context4.next = 6;
                  break;
                }

                username = store.username;
                password = store.password;
                _context4.next = 15;
                break;

              case 6:
                hostname = window.location.hostname;

                if (!/(\d{1,3}\.){3}\d{1,3}/.test(hostname)) {
                  _context4.next = 11;
                  break;
                }

                username = hostname;
                _context4.next = 13;
                break;

              case 11:
                _this4.isShowApiUrl = true;
                return _context4.abrupt("return");

              case 13:
                password = "80138013";
                store.username = username;

              case 15:
                _context4.prev = 15;
                _context4.next = 18;
                return _this4.$bem.api.OauthApi.login({ username: username, password: password });

              case 18:
                resp = _context4.sent;

                store.authorization = resp.accessToken;
                _this4.orgId = store.orgId = resp.orgId;
                _context4.next = 26;
                break;

              case 23:
                _context4.prev = 23;
                _context4.t0 = _context4["catch"](15);

                _this4.isShowApiUrl = true;

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this4, [[15, 23]]);
      }))();
    },

    /* 展开扩展信息 */
    showExtDetail: function showExtDetail() {
      this.isShowExtDetail = !this.isShowExtDetail;
    },

    /* 展开扩展信息 */
    showWinExtDetail: function showWinExtDetail() {
      this.isShowWinExtDetail = !this.isShowWinExtDetail;
    },

    /* 显示维护界面 */
    showSetup: function showSetup(e) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                !_this5.lastTime && (_this5.lastTime = e.timeStamp);
                if (e.timeStamp - _this5.lastTime < 1000) {
                  _this5.count++;
                  if (_this5.count >= 5) {
                    _this5.count = 0;
                    if (process.env.NODE_ENV !== "development") {
                      _this5.isShowInput = true;
                    } else {
                      _this5.visible = true;
                    }
                  }
                } else {
                  _this5.count = 1;
                }
                _this5.lastTime = e.timeStamp;

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },

    /* 初始化机器 */
    init: function init() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
        var hardwareInfo;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (_this6.initVerify()) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                _this6.hospInfo && _this6.$store.commit("setHospital", _this6.hospInfo);
                _context6.next = 5;
                return _this6.$store.dispatch("fetchFwcHospConfig");

              case 5:
                _context6.next = 7;
                return _this6.$store.dispatch("fetchTipDicts");

              case 7:
                hardwareInfo = _this6.hospInfo.winHardwareType;

                hardwareInfo && _this6.$store.commit("setHardWare", hardwareInfo);
                _this6.refresh();
                // this.$emit("initSuccess", this.hospInfo);
                // this.close();

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this6);
      }))();
    },

    /* 关闭 */
    close: function close() {
      this.hospInfo = null;
      this.winConfigId = null;
      this.orgId = null;
      this.visible = false;
    },

    /* 初始化校验 */
    initVerify: function initVerify() {
      // 需要校验哪个字段往这个对象里加。
      var items = {
        win_code: this.hospInfo.winConfig.win_code,
        hosp_code: this.hospInfo.hosp_code
      };
      var fn = function fn(key) {
        if (items[key] === null) {
          Alert("\u521D\u59CB\u5316\u5931\u8D25<br>" + key + "\u4E3A\u7A7A");
          return true;
        }
      };
      var keys = _Object$keys(items);
      if (keys.some(fn)) return false;
      if (this.winConfigId === 0) {
        Alert("请选择机器");
        return false;
      }
      return true;
    },
    refresh: function refresh$1() {
      refresh();
    },

    //清除缓存
    clearCache: function clearCache() {
      localStorage.clear();
      window.location.reload(true);
    },
    goTestPage: function goTestPage() {
      location.href = "/test/index.html";
    },

    //下载文件
    downloadFile: function downloadFile(filename) {
      var fileUri = "/files/" + filename;
      window.open(fileUri);
    },

    //获取键盘输入内容
    changePwd: function changePwd(content, num) {
      if (content == "close") {
        if (this.inputVal == this.$hospital.oper_pwd) {
          this.visible = true;
          this.isShowInput = false;
        } else {
          this.$bem.showalert("密码错误");
        }
      } else {
        this.inputVal = content;
        this.$refs.theInput.focus();
      }
    }
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_c("div", {
    staticClass: "bem-setup__trigger-btn",
    on: { click: _vm.showSetup }
  }), _vm._v(" "), _vm.visible ? _c("div", { staticClass: "bem-setup bem--fullscreen" }, [_c("div", { staticClass: "bem-setup__fun-wrap" }, [_c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: { click: _vm.refresh }
  }, [_vm._v("刷新")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: {
      click: function click($event) {
        _vm.isShowApiUrl = true;
      }
    }
  }, [_vm._v("账号配置")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: {
      click: function click($event) {
        _vm.isShowlog = !_vm.isShowlog;
      }
    }
  }, [_vm._v("显示日志")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: { click: _vm.clearCache }
  }, [_vm._v("重置机器")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: {
      click: function click($event) {
        return _vm.downloadFile("zzjdev.jar");
      }
    }
  }, [_vm._v("下载驱动")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: {
      click: function click($event) {
        return _vm.downloadFile("file.zip");
      }
    }
  }, [_vm._v("下载文件")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: { click: _vm.goTestPage }
  }, [_vm._v("硬件测试")]), _vm._v(" "), _vm.nativeMethod ? _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: {
      click: function click($event) {
        return _vm.nativeMethod.gotoAndroidSetting();
      }
    }
  }, [_vm._v("回到安卓")]) : _vm._e()]), _vm._v(" "), _c("div", { staticClass: "bem-setup__select-wrap" }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.winConfigId,
      expression: "winConfigId"
    }],
    staticClass: "bem-setup__select bem-setup--shadow",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.winConfigId = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c("option", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.winConfigId === 0,
      expression: "winConfigId === 0"
    }],
    domProps: { value: 0 }
  }, [_vm._v(_vm._s(Array.isArray(_vm.winCodeList) ? "数据为空" : "请选择机器编号"))]), _vm._v(" "), _vm._l(_vm.winCodeList, function (item) {
    return _c("option", { key: item.id, domProps: { value: item.id } }, [_vm._v(_vm._s(item.win_code))]);
  })], 2), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__init-btn bem-setup__btn bem-setup--shadow",
    on: { click: _vm.init }
  }, [_vm._v("初始化机器")])]), _vm._v(" "), _c("div", { staticClass: "bem-setup__hr" }, [_vm._v("分辨率" + _vm._s(_vm.screenWidth) + "x" + _vm._s(_vm.screenHeight))]), _vm._v(" "), !_vm.hospInfo ? _c("h6", { staticClass: "bem-setup__text--not-init" }, [_vm._v("暂无信息，请先初始化机器")]) : _c("ul", { staticClass: "bem-setup__info-wrap" }, [_vm._l(_vm.hospitalKeys, function (key) {
    return _c("li", [_c("span", { staticClass: "label" }, [_vm._v(_vm._s(key) + ":")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(_vm.hospInfo[key]))])]);
  }), _vm._v(" "), _vm._l(_vm.winConfigKeys, function (key) {
    return _c("li", [_c("span", { staticClass: "label" }, [_vm._v(_vm._s(key) + ":")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(_vm.hospInfo.winConfig[key]))])]);
  }), _vm._v(" "), _c("li", { on: { click: _vm.showExtDetail } }, [_c("span", { staticClass: "label" }, [_vm._v("ext_info:")]), _vm._v(" "), _c("span", { staticClass: "text ext-info" }, [_vm._v(_vm._s(_vm.hospInfo.ext_info))])]), _vm._v(" "), _c("pre", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShowExtDetail,
      expression: "isShowExtDetail"
    }],
    on: { click: _vm.showExtDetail }
  }, [_vm._v(_vm._s(_vm.hospInfo.ext_info && JSON.parse(_vm.hospInfo.ext_info)))]), _vm._v(" "), _c("li", { on: { click: _vm.showWinExtDetail } }, [_c("span", { staticClass: "label" }, [_vm._v("win_ext_info:")]), _vm._v(" "), _c("span", { staticClass: "text ext-info" }, [_vm._v(_vm._s(_vm.hospInfo.winConfig.win_ext_info))])]), _vm._v(" "), _c("pre", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isShowWinExtDetail,
      expression: "isShowWinExtDetail"
    }],
    on: { click: _vm.showWinExtDetail }
  }, [_vm._v(_vm._s(_vm.hospInfo.winConfig.win_ext_info && JSON.parse(_vm.hospInfo.winConfig.win_ext_info)))])], 2)]) : _vm._e(), _vm._v(" "), _c("bem-logcat", {
    attrs: { show: _vm.isShowlog },
    on: {
      "update:show": function updateShow($event) {
        _vm.isShowlog = $event;
      }
    }
  }), _vm._v(" "), _c("api-url", {
    attrs: { show: _vm.isShowApiUrl },
    on: {
      "update:show": function updateShow($event) {
        _vm.isShowApiUrl = $event;
      }
    }
  }), _vm._v(" "), _c("bem-popup", {
    attrs: { show: _vm.isShowInput, closeOnClickMask: "", width: "auto" },
    on: {
      "update:show": function updateShow($event) {
        _vm.isShowInput = $event;
      }
    }
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.inputVal,
      expression: "inputVal"
    }],
    ref: "theInput",
    staticClass: "bem-setup__pwd-input",
    attrs: {
      slot: "title",
      placeholder: "请输入维护密码",
      readonly: "",
      type: "password"
    },
    domProps: { value: _vm.inputVal },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.inputVal = $event.target.value;
      }
    },
    slot: "title"
  }), _vm._v(" "), _c("div", { staticClass: "bem-setup__pwd" }, [_c("bem-keypad-2", {
    attrs: {
      setContent: _vm.inputVal,
      showKeyPad: _vm.isShowInput
    },
    on: { changeNum: _vm.changePwd }
  })], 1)])], 1);
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

/* style */
var __vue_inject_styles__$5 = undefined;
/* scoped */
var __vue_scope_id__$5 = undefined;
/* module identifier */
var __vue_module_identifier__$5 = undefined;
/* functional template */
var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = normalizeComponent_1({ render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

var timerMap = {};

var CountDown = {
	//倒计时
	//params: {
	//	el: 原生dom元素，显示倒计时的
	//	time: 倒计时的数字，不能小于0，默认60
	//	callback: 倒计时结束后的回调
	//	step: 间隔，单位：毫秒 ，默认为1000,
	//	text: 数字后面显示的文本内容
	//}
	go: function go(params) {
		if (typeof params.time != 'number' || params.time <= 0) {
			params.time = 60;
		}
		params.time = params.time || 60;
		typeof params.beforeStart == 'function' && params.beforeStart();
		var tickerKey = params.el.getAttribute('ticker') || params.el.getAttribute('accesskey');
		this.stop(tickerKey);
		timerMap[tickerKey] = setInterval(function () {
			if (params.time > 0) {
				params.time--;
				params.el.innerText = params.time + (params.text || '');
				typeof params.getNowTime == 'function' && params.getNowTime(params.time);
			} else {
				clearInterval(timerMap[tickerKey]);
				try {
					typeof params.callback == 'function' && params.callback();
				} catch (e) {}
			}
		}, params.step || 1000);
	},

	//停止某个计时器
	//key: 元素的ticker属性值或accessKey值（或者HTML元素对象）
	stop: function stop(key) {
		if (typeof key !== 'string') {
			key = key.getAttribute('ticker') || key.getAttribute('accesskey');
		}
		clearInterval(timerMap[key]);
	},

	//停止所有的计时器
	clear: function clear() {
		$$whzxLog.info('停止所有的定时器');
		for (var k in timerMap) {
			clearInterval(timerMap[k]);
		}
	},

	// 显示时间
	// el: 原生dom元素，显示时间的，要有一个ticker属性
	// time: 指定开始的时间，时间戳或Date对象
	// format: 要展示的日期格式，例如：yyyy-MM-dd hh:mm等等
	showTime: function showTime(config) {
		if (typeof config.time === 'number') {
			config.time = new Date(config.time);
		} else if (Object.prototype.toString.call(config.time) !== '[object Date]') {
			config.time = new Date();
		}
		!config.format && (config.format = 'yyyy-MM-dd hh:mm:ss');
		var tickerKey = config.el.getAttribute('ticker');
		this.stop(tickerKey);
		config.el.innerText = config.time.Format(config.format);
		timerMap[tickerKey] = setInterval(function () {
			config.time.setSeconds(config.time.getSeconds() + 1);
			config.el.innerText = config.time.Format(config.format);
		}, 1000);
	},

	// callback: 每次的回调，参数：{count, ticker, config}
	// ticker: 名称
	// step: 多久执行一次，单位：毫秒，默认1000
	// stopCount: 多少次后停止，默认不会停止
	// endCallback: 结束时的回调
	ticker: function ticker(config) {
		var _this = this;

		this.stop(config.ticker);
		config.count = config.count || 1;
		config.stopCount = config.stopCount || -1;
		timerMap[config.ticker] = setInterval(function () {
			if (config.stopCount != -1 && config.count >= config.stopCount) {
				_this.stop(config.ticker);
				typeof config.endCallback === 'function' && config.endCallback();
			} else {
				typeof config.callback === 'function' && config.callback(config.count, config.ticker, config);
			}
			config.count++;
		}, config.step || 1000);
	}
};

var script$6 = {
  name: "BemCheckVersion",
  data: function data() {
    return {
      isShowTip: false,
      tip: "暂停使用"
    };
  },
  mounted: function mounted() {
    this.checkVersion();
  },
  beforeDestroy: function beforeDestroy() {
    this.cancelCheckVersion();
  },

  props: {
    // 检测更新间隔，默认60秒
    interval: {
      type: Number,
      default: 60
    }
  },
  methods: {
    /** 获取版本更新 */
    getVersion: function getVersion() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var resp, version, hospInfo;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return OrgConfigApi.getHeartbeatPacket({
                  orgId: _this.$orgId,
                  winConfigId: _this.$winConfigId
                });

              case 2:
                resp = _context.sent;

                _this.$store.commit("setHeartbeatPacket", resp);
                version = resp.version;

                if (!version.startsWith("uploadLogs")) {
                  _context.next = 9;
                  break;
                }

                /* uploadLogs|face_zzj|48|h 单独上传face_zzj48小时内日志*/
                if (version.includes(_this.$winCode)) {
                  _this.uploadLogsByWinCode(version);
                }
                _context.next = 29;
                break;

              case 9:
                if (!(isString(version) && version.startsWith("stop"))) {
                  _context.next = 14;
                  break;
                }

                /* stop|15分钟 系统维护中 请等待15分钟 */
                version.includes("|") && (_this.tip = "请等待" + version.split("|")[1]);
                _this.isShowTip = true;
                _context.next = 29;
                break;

              case 14:
                if (!(version === "clear")) {
                  _context.next = 18;
                  break;
                }

                /* clera 清除所有日志 */
                clear$1();
                _context.next = 29;
                break;

              case 18:
                if (!isEmpty$1(store.version)) {
                  _context.next = 22;
                  break;
                }

                /* 保存版本号 */
                store.version = version;
                _context.next = 29;
                break;

              case 22:
                if (!(store.version != version)) {
                  _context.next = 29;
                  break;
                }

                /* 刷新自助机 */
                store.version = version;
                _context.next = 26;
                return OrgConfigApi.getOrgWinconfigDetail({
                  orgId: _this.$orgId,
                  winConfigId: _this.$winConfigId
                });

              case 26:
                hospInfo = _context.sent;

                _this.$store.commit("setHospital", hospInfo);
                refresh();

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /** 开始查询版本 */
    checkVersion: function checkVersion() {
      var _this2 = this;

      if (!this.$hospital) {
        throw new Error("该机器未初始化");
      }
      CountDown.ticker({
        ticker: "CheckVersionTicker",
        step: this.interval * 1000,
        callback: function callback() {
          _this2.getVersion();
        }
      });
    },

    /** 取消查询版本 */
    cancelCheckVersion: function cancelCheckVersion() {
      CountDown.stop("CheckVersionTicker");
    },

    /* 上传并删除单独自助机48小时内日志 */
    uploadLogsByWinCode: function uploadLogsByWinCode(version) {
      var uploadLogs = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(logs) {
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(logs.length == 0)) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return");

                case 2:
                  logs.forEach(function (log) {
                    log.in_param = log.in_param ? _JSON$stringify(log.in_param) : "";
                    log.out_param = log.out_param ? _JSON$stringify(log.out_param) : "";
                  });
                  _context2.next = 5;
                  return ZWLApi.receiveLogs({ zzjWebLogsList: logs }, { alert: false });

                case 5:
                  remove$1(logs);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function uploadLogs(_x) {
          return _ref.apply(this, arguments);
        };
      }();

      // uploadLogs|face_zzj|48|h => ["uploadLogs", "face_zzj", "48", "h"]
      var splitRes = version.split("|");
      var timeValue = splitRes[2] || "48";
      var timeUnit = splitRes[3] || "h";
      getAllByTime(uploadLogs, timeValue, timeUnit);
    }
  }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("bem-popup", {
    attrs: { show: _vm.isShowTip, showClose: false, fullscreen: "" },
    on: {
      "update:show": function updateShow($event) {
        _vm.isShowTip = $event;
      }
    }
  }, [_c("div", { staticClass: "bem-check-version" }, [_c("p", { staticClass: "tip-text" }, [_vm._v("系统维护中，" + _vm._s(_vm.tip))])])]);
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

/* style */
var __vue_inject_styles__$6 = undefined;
/* scoped */
var __vue_scope_id__$6 = undefined;
/* module identifier */
var __vue_module_identifier__$6 = undefined;
/* functional template */
var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = normalizeComponent_1({ render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

var script$7 = {
  name: "BemUploadLogs",
  mounted: function mounted() {
    this.startLoop();
  },
  beforeDestroy: function beforeDestroy() {
    this.stopLoop();
  },
  data: function data() {
    return {
      lock: true
    };
  },

  props: {
    // 上传日志间隔
    interval: {
      type: Number,
      default: 10
    },
    // 日志一次上传条数
    count: {
      type: Number,
      default: 5
    },
    // 上传多少小时内的日志, 默认48小时内
    time: {
      type: String,
      default: "48"
    }
  },
  methods: {
    /** 轮询每次执行 */
    uploadLogs: function uploadLogs(logs) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.lock = false;
                _context.prev = 1;

                if (_this.$hospital.log_level) {
                  logs = logs.filter(function (log) {
                    return log.level === _this.$hospital.log_level;
                  });
                }

                if (!(logs.length > 0)) {
                  _context.next = 9;
                  break;
                }

                logs = logs.slice(0, _this.count);
                logs.forEach(function (log) {
                  log.in_param = log.in_param ? _JSON$stringify(log.in_param) : "";
                  log.out_param = log.out_param ? _JSON$stringify(log.out_param) : "";
                });
                _context.next = 8;
                return ZWLApi.receiveLogs({ zzjWebLogsList: logs }, { alert: false });

              case 8:
                remove$1(logs);

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);

                console.error(_context.t0);

              case 14:
                _context.prev = 14;

                _this.lock = true;
                return _context.finish(14);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this, [[1, 11, 14, 17]]);
      }))();
    },

    /** 开始轮询 */
    startLoop: function startLoop() {
      var _this2 = this;

      CountDown.ticker({
        ticker: "UploadLogsTicker",
        step: this.interval * 1000,
        callback: function callback() {
          // 后台日志等级不为none&&当前没有日志在上传&&日志不为空 则上传日志
          if (!_this2.$hospital || !_this2.$hospital.log_level) return;
          if (_this2.$hospital.log_level == "none" || !_this2.lock) return;
          getAllByTime(function (res) {
            Array.isArray(res) && res.length > 0 && _this2.uploadLogs(res);
          }, _this2.time, "h");
        }
      });
    },

    /** 停止轮询 */
    stopLoop: function stopLoop() {
      CountDown.stop("UploadLogsTicker");
    }
  }
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div");
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

/* style */
var __vue_inject_styles__$7 = undefined;
/* scoped */
var __vue_scope_id__$7 = undefined;
/* module identifier */
var __vue_module_identifier__$7 = undefined;
/* functional template */
var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = normalizeComponent_1({ render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

var mixin = {
  activated: function activated() {
    if (this.value !== null) {
      this.content = this.value;
    }
  },
  data: function data() {
    return {
      content: ""
    };
  },

  watch: {
    content: function content() {
      this.$emit("input", this.content);
    }
  },
  props: {
    value: String
  },
  methods: {
    /* 退出 */
    exit: function exit() {
      this.$emit("exit");
    },

    /* 确定 */
    confirm: function confirm() {
      this.$emit("confirm");
    },

    /* 清空 */
    clear: function clear() {
      this.content = "";
    },

    /* 删除 */
    del: function del() {
      if (!this.content) return;
      this.content = this.content.substring(0, this.content.length - 1);
    },

    /* 输入 */
    handleKeyClick: function handleKeyClick(value) {
      this.content += value;
    },

    /* 切换类型 */
    switchType: function switchType(type) {
      this.$emit("switchType", type);
    }
  }
};

//

var script$8 = {
  name: "KeypadNumber",
  mixins: [mixin],
  data: function data() {
    return {
      col1: ["1", "4", "7"],
      col2: ["2", "5", "8", "0"],
      col3: ["3", "6", "9"]
    };
  }
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "keypad--number" }, [_c("div", { staticClass: "keypad--number__col-1" }, [_vm._l(_vm.col1, function (value) {
    return _c("span", {
      staticClass: "keypad__key-btn",
      on: {
        click: function click($event) {
          return _vm.handleKeyClick(value);
        }
      }
    }, [_vm._v(_vm._s(value))]);
  }), _vm._v(" "), _c("span", {
    staticClass: "keypad__key-btn",
    on: {
      click: function click($event) {
        return _vm.switchType("letter");
      }
    }
  }, [_vm._v("字母")])], 2), _vm._v(" "), _c("div", { staticClass: "keypad--number__col-2" }, _vm._l(_vm.col2, function (value) {
    return _c("span", {
      staticClass: "keypad__key-btn",
      on: {
        click: function click($event) {
          return _vm.handleKeyClick(value);
        }
      }
    }, [_vm._v(_vm._s(value))]);
  }), 0), _vm._v(" "), _c("div", { staticClass: "keypad--number__col-3" }, [_vm._l(_vm.col3, function (value) {
    return _c("span", {
      staticClass: "keypad__key-btn",
      on: {
        click: function click($event) {
          return _vm.handleKeyClick(value);
        }
      }
    }, [_vm._v(_vm._s(value))]);
  }), _vm._v(" "), _c("span", { staticClass: "keypad__key-btn", on: { click: _vm.exit } }, [_vm._v("退出")])], 2), _vm._v(" "), _c("div", { staticClass: "keypad--number__col-4" }, [_c("span", { staticClass: "keypad__key-btn", on: { click: _vm.del } }, [_vm._v("删除")]), _vm._v(" "), _c("span", { staticClass: "keypad__key-btn", on: { click: _vm.clear } }, [_vm._v("清空")]), _vm._v(" "), _c("span", {
    staticClass: "keypad__key-btn",
    staticStyle: { flex: "2" },
    on: { click: _vm.confirm }
  }, [_vm._v("确定")])])]);
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

/* style */
var __vue_inject_styles__$8 = undefined;
/* scoped */
var __vue_scope_id__$8 = undefined;
/* module identifier */
var __vue_module_identifier__$8 = undefined;
/* functional template */
var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = normalizeComponent_1({ render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

//

var script$9 = {
  name: "KeypadLetter",
  mixins: [mixin],
  data: function data() {
    return {
      capsLock: true
    };
  },

  computed: {
    row1: function row1() {
      var lowerCase = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
      var upperCase = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
      return this.capsLock ? upperCase : lowerCase;
    },
    row2: function row2() {
      var lowerCase = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
      var upperCase = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
      return this.capsLock ? upperCase : lowerCase;
    },
    row3: function row3() {
      var lowerCase = ["z", "x", "c", "v", "b", "n", "m"];
      var upperCase = ["Z", "X", "C", "V", "B", "N", "M"];
      return this.capsLock ? upperCase : lowerCase;
    }
  },
  methods: {
    /** 切换大写 */
    switchCapsLock: function switchCapsLock() {
      this.capsLock = !this.capsLock;
    }
  }
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "keypad--letter" }, [_c("div", { staticClass: "keypad--letter__row-1" }, _vm._l(_vm.row1, function (value) {
    return _c("span", {
      staticClass: "keypad__key-btn",
      on: {
        click: function click($event) {
          return _vm.handleKeyClick(value);
        }
      }
    }, [_vm._v(_vm._s(value))]);
  }), 0), _vm._v(" "), _c("div", { staticClass: "keypad--letter__row-2" }, _vm._l(_vm.row2, function (value) {
    return _c("span", {
      staticClass: "keypad__key-btn",
      on: {
        click: function click($event) {
          return _vm.handleKeyClick(value);
        }
      }
    }, [_vm._v(_vm._s(value))]);
  }), 0), _vm._v(" "), _c("div", { staticClass: "keypad--letter__row-3" }, [_c("span", {
    class: [{ "keypad__key-btn--longpress": _vm.capsLock }, "keypad__key-btn"],
    staticStyle: { flex: "1.54" },
    on: { click: _vm.switchCapsLock }
  }, [_vm._v("大写")]), _vm._v(" "), _vm._l(_vm.row3, function (value) {
    return _c("span", {
      staticClass: "keypad__key-btn",
      on: {
        click: function click($event) {
          return _vm.handleKeyClick(value);
        }
      }
    }, [_vm._v(_vm._s(value))]);
  }), _vm._v(" "), _c("span", {
    staticClass: "keypad__key-btn",
    staticStyle: { flex: "1.54" },
    on: { click: _vm.del }
  }, [_vm._v("删除")])], 2), _vm._v(" "), _c("div", { staticClass: "keypad--letter__row-4" }, [_c("span", {
    staticClass: "keypad__key-btn",
    on: {
      click: function click($event) {
        return _vm.switchType("number");
      }
    }
  }, [_vm._v("数字")]), _vm._v(" "), _c("span", { staticClass: "keypad__key-btn", on: { click: _vm.exit } }, [_vm._v("退出")]), _vm._v(" "), _c("span", { staticClass: "keypad__key-btn", on: { click: _vm.clear } }, [_vm._v("清空")]), _vm._v(" "), _c("span", { staticClass: "keypad__key-btn", on: { click: _vm.confirm } }, [_vm._v("确定")])])]);
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

/* style */
var __vue_inject_styles__$9 = undefined;
/* scoped */
var __vue_scope_id__$9 = undefined;
/* module identifier */
var __vue_module_identifier__$9 = undefined;
/* functional template */
var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = normalizeComponent_1({ render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

//

var script$a = {
  name: "BemKeypad",
  components: {
    number: __vue_component__$8,
    letter: __vue_component__$9
  },
  data: function data() {
    return {
      visible: this.show,
      // 当前输入面板类型
      inputType: this.type,
      // 输入的内容
      content: null
    };
  },

  watch: {
    type: function type() {
      this.inputType = this.type;
    },
    show: function show() {
      this.content = this.value;
      this.visible = this.show;
    },
    content: function content() {
      this.$emit("input", this.content);
    }
  },
  props: {
    value: String,
    top: {
      type: String,
      default: "0"
    },
    left: {
      type: String,
      default: "-0.05rem"
    },
    type: {
      type: String,
      default: "number"
    },
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "4rem"
    }
  },
  computed: {
    keypadStyle: function keypadStyle() {
      return {
        width: this.width,
        top: this.top,
        left: this.left
      };
    },
    mainStyle: function mainStyle() {
      return {
        height: this.height
      };
    }
  },
  methods: {
    /** 关闭键盘 */
    close: function close() {
      var _this = this;

      setTimeout(function () {
        _this.$emit("update:show", false);
      }, 60);
    },

    /* 确定 */
    confirm: function confirm() {
      if ("confirm" in this.$listeners) {
        this.$emit("confirm");
      } else {
        this.close();
      }
    },

    /* 退出 */
    exit: function exit() {
      this.close();
      this.$emit("exit");
    },

    /* 切换输入 */
    switchType: function switchType(type) {
      var _this2 = this;

      setTimeout(function () {
        _this2.inputType = type;
      }, 60);
    }
  }
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.visible ? _c("div", { staticClass: "bem-keypad", style: _vm.keypadStyle }, [_vm.$slots.header ? _c("div", { staticClass: "keypad__header" }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _c("div", { staticClass: "keypad__main", style: _vm.mainStyle }, [_c("keep-alive", [_c(_vm.inputType, {
    tag: "component",
    on: {
      confirm: _vm.confirm,
      exit: _vm.exit,
      switchType: _vm.switchType
    },
    model: {
      value: _vm.content,
      callback: function callback($$v) {
        _vm.content = $$v;
      },
      expression: "content"
    }
  })], 1)], 1)]) : _vm._e();
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

/* style */
var __vue_inject_styles__$a = undefined;
/* scoped */
var __vue_scope_id__$a = undefined;
/* module identifier */
var __vue_module_identifier__$a = undefined;
/* functional template */
var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = normalizeComponent_1({ render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$b = {
  name: 'BemKeypad2',
  props: {
    isClear: {
      type: Boolean,
      default: false
    },

    showKeyPad: {
      type: Boolean,
      default: false
    },
    setContent: {
      type: String,
      default: ""
    },
    isWinCode: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      content: "",
      act_num: null, //焦点按钮
      haveUp: null, //键盘在上方时
      theMarginTop: null //按键行的marginTop，让按键的高度自适应
    };
  },

  computed: {},
  watch: {
    showKeyPad: {
      immediate: true,
      handler: function handler(n) {
        var _this = this;

        if (!n) {
          this.act_num = null;
        } else {
          this.$nextTick(function () {
            _this.theMarginTop = document.querySelector("#theBox").offsetHeight * 0.05 + "px";
          });
        }
      }
    },
    setContent: function setContent(n) {
      this.content = this.setContent;
    }
  },
  methods: {
    _handleKeyPress: function _handleKeyPress(e) {
      var num = e.target.dataset.num;
      switch (String(num)) {
        //删除键
        case "D":
          this._handleDeleteKey(num);
          break;
        //清空键
        case "C":
          this._handleClearKey();
          break;
        case "Y":
          this._handleConfirmKey();
          break;
        default:
          this._handleNumberKey(num);
          break;
      }
    },

    //处理删除键
    _handleDeleteKey: function _handleDeleteKey(num) {
      this.act_num = null;
      var S = this.content;
      //否则删除最后一个
      this.content = S.substring(0, S.length - 1);
      this.$emit("changeNum", this.content, num);
    },

    //处理清空键
    _handleClearKey: function _handleClearKey(num) {
      this.act_num = null;
      this.content = "";
      this.$emit("changeNum", this.content, num);
    },

    //处理确定键
    _handleConfirmKey: function _handleConfirmKey() {
      this.$emit("changeNum", "close");
    },

    //处理数字
    _handleNumberKey: function _handleNumberKey(num) {
      this.act_num = num;
      var S = this.content;
      if (typeof num != "undefined") {
        this.content = S + num;
      }
      this.$emit("changeNum", this.content, num);
    }
  }
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.showKeyPad ? _c("div", {
    ref: "main",
    staticClass: "bem-keypad2",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm._handleKeyPress($event);
      }
    }
  }, [_c("div", { staticClass: "key-box", attrs: { id: "theBox" } }, [_vm.isWinCode ? _c("div", { staticClass: "key-row" }, [_c("div", {
    staticClass: "key-cell long-row",
    class: { "key-active": _vm.act_num == "W" },
    attrs: { "data-num": "W" }
  }, [_c("span", [_vm._v("W")])]), _vm._v(" "), _c("div", {
    staticClass: "key-cell long-row",
    class: { "key-active": _vm.act_num == "A" },
    attrs: { "data-num": "A" }
  }, [_c("span", [_vm._v("A")])])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "key-row top-row",
    style: { "margin-top": _vm.theMarginTop }
  }, [_c("div", {
    staticClass: "key-cell top-cell",
    class: { "key-active": _vm.act_num == "1" },
    attrs: { "data-num": "1" }
  }, [_c("span", { attrs: { "data-num": "1" } }, [_vm._v("1")])]), _vm._v(" "), _c("div", {
    staticClass: "key-cell",
    class: { "key-active": _vm.act_num == "2" },
    attrs: { "data-num": "2" }
  }, [_c("span", { attrs: { "data-num": "2" } }, [_vm._v("2")])]), _vm._v(" "), _c("div", {
    staticClass: "key-cell",
    class: { "key-active": _vm.act_num == "3" },
    attrs: { "data-num": "3" }
  }, [_c("span", { attrs: { "data-num": "3" } }, [_vm._v("3")])])]), _vm._v(" "), _c("div", {
    staticClass: "key-row",
    style: { "margin-top": _vm.theMarginTop }
  }, [_c("div", {
    staticClass: "key-cell top-cell",
    class: { "key-active": _vm.act_num == "4" },
    attrs: { "data-num": "4" }
  }, [_c("span", { attrs: { "data-num": "4" } }, [_vm._v("4")])]), _vm._v(" "), _c("div", {
    staticClass: "key-cell",
    class: { "key-active": _vm.act_num == "5" },
    attrs: { "data-num": "5" }
  }, [_c("span", { attrs: { "data-num": "5" } }, [_vm._v("5")])]), _vm._v(" "), _c("div", {
    staticClass: "key-cell",
    class: { "key-active": _vm.act_num == "6" },
    attrs: { "data-num": "6" }
  }, [_c("span", { attrs: { "data-num": "6" } }, [_vm._v("6")])])]), _vm._v(" "), _c("div", {
    staticClass: "key-row",
    style: { "margin-top": _vm.theMarginTop }
  }, [_c("div", {
    staticClass: "key-cell top-cell",
    class: { "key-active": _vm.act_num == "7" },
    attrs: { "data-num": "7" }
  }, [_c("span", { attrs: { "data-num": "7" } }, [_vm._v("7")])]), _vm._v(" "), _c("div", {
    staticClass: "key-cell",
    class: { "key-active": _vm.act_num == "8" },
    attrs: { "data-num": "8" }
  }, [_c("span", { attrs: { "data-num": "8" } }, [_vm._v("8")])]), _vm._v(" "), _c("div", {
    staticClass: "key-cell",
    class: { "key-active": _vm.act_num == "9" },
    attrs: { "data-num": "9" }
  }, [_c("span", { attrs: { "data-num": "9" } }, [_vm._v("9")])])]), _vm._v(" "), _c("div", {
    staticClass: "key-row",
    style: { "margin-top": _vm.theMarginTop }
  }, [_c("div", {
    staticClass: "key-cell top-cell",
    class: { "key-active": _vm.act_num == "0" },
    attrs: { "data-num": "0" }
  }, [_c("span", { attrs: { "data-num": "0" } }, [_vm._v("0")])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isClear,
      expression: "isClear"
    }],
    staticClass: "key-cell",
    attrs: { "data-num": "C" }
  }, [_c("span", { attrs: { "data-num": "C" } }, [_vm._v("清空")])]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: !_vm.isClear,
      expression: "!isClear"
    }],
    staticClass: "key-cell",
    attrs: { "data-num": "Y" }
  }, [_c("span", { attrs: { "data-num": "Y" } }, [_vm._v("确定")])])])])]) : _vm._e();
};
var __vue_staticRenderFns__$b = [function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "key-cell", attrs: { "data-num": "D" } }, [_c("span", { attrs: { "data-num": "D" } }, [_vm._v("退格")])]);
}];
__vue_render__$b._withStripped = true;

/* style */
var __vue_inject_styles__$b = undefined;
/* scoped */
var __vue_scope_id__$b = undefined;
/* module identifier */
var __vue_module_identifier__$b = undefined;
/* functional template */
var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = normalizeComponent_1({ render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b }, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

//

var script$c = {
  name: "BemPopup",
  data: function data() {
    return {};
  },

  computed: {
    closeStyle: function closeStyle() {
      var style = {};
      if (this.fullscreen) {
        style.top = "0.1rem";
        style.right = "0.1rem";
      }
      return style;
    },
    headerStyle: function headerStyle() {
      var style = {};
      if (this.$slots.title || this.title) {
        style.padding = "0.3rem 0.3rem 0.2rem";
      }
      this.center && (style.textAlign = "center");
      return style;
    },
    maskStyle: function maskStyle() {
      var style = {};
      if (document.querySelector(globalConfig.el)) {
        style.position = "absolute";
      }
      return style;
    },
    mainStyle: function mainStyle() {
      var style = {};
      this.minWidth && (style.minWidth = this.minWidth);
      if (document.querySelector(globalConfig.el)) {
        style.position = "absolute";
      }
      style.marginTop = this.top;
      style.width = this.width;
      if (this.fullscreen) {
        style.height = "100%";
        style.width = "100%";
        style.borderRadius = "0";
      }
      return style;
    }
  },
  methods: {
    handleClickMask: function handleClickMask() {
      if (!this.closeOnClickMask) this.close();
    },
    close: function close() {
      this.$emit("update:show", false);
      this.$emit("close");
    }
  },
  props: {
    // 弹窗宽度
    width: {
      type: String,
      default: "50%"
    },
    // 弹窗宽度
    minWidth: {
      type: String,
      default: ""
    },
    // 弹窗距离顶部距离
    top: {
      type: String,
      default: ""
    },
    // 是否全屏显示
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    //标题是否居中
    center: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      required: true
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 是否可以通过点击 mask 关闭
    closeOnClickMask: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    }
  }
};

var __$_require_assets_imgs_close_icon_png__ = "data:image/png;base64,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";

/* script */
var __vue_script__$c = script$c;
var __vue_render__$c = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.show ? _c("div", { staticClass: "bem-popup" }, [_vm.mask ? _c("div", {
    staticClass: "bem-popup__mask",
    style: _vm.maskStyle,
    on: { click: _vm.handleClickMask }
  }) : _vm._e(), _vm._v(" "), _c("div", { staticClass: "bem-popup__main", style: _vm.mainStyle }, [_c("div", { staticClass: "bem-popup__header", style: _vm.headerStyle }, [_vm._t("title", [_c("span", { staticClass: "bem-popup__title" }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _vm.showClose ? _c("img", {
    staticClass: "bem-popup__close",
    style: _vm.closeStyle,
    attrs: {
      src: __$_require_assets_imgs_close_icon_png__
    },
    on: { click: _vm.close }
  }) : _vm._e()], 2), _vm._v(" "), _c("div", { staticClass: "bem-popup__body" }, [_vm._t("default")], 2), _vm._v(" "), _vm.$slots.footer ? _c("div", { staticClass: "bem-popup__footer" }, [_vm._t("footer")], 2) : _vm._e()])]) : _vm._e();
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

/* style */
var __vue_inject_styles__$c = undefined;
/* scoped */
var __vue_scope_id__$c = undefined;
/* module identifier */
var __vue_module_identifier__$c = undefined;
/* functional template */
var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = normalizeComponent_1({ render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c }, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$d = {
  name: "BemProgress",
  props: {
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: function validator(val) {
        return val >= 0 && val <= 100;
      }
    },
    width: {
      type: String,
      default: "2rem"
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    strokeLinecap: {
      type: String,
      default: "round"
    }
  },
  computed: {
    perimeter: function perimeter() {
      return 2 * Math.PI * this.radius;
    },
    radius: function radius() {
      return 50 - this.strokeWidth / 2;
    },
    circleStyle: function circleStyle() {
      return {
        height: this.width,
        width: this.width
      };
    },
    circlePathStyle: function circlePathStyle() {
      return {
        strokeDasharray: this.perimeter * (this.percentage / 100) + " " + (this.perimeter + 1),
        transformOrigin: "center",
        strokeDashoffset: 1,
        transform: "rotate(-90deg)",
        transition: "stroke-dasharray 0.6s ease 0s"
      };
    }
  }
};

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "bem-progress" }, [_c("div", { staticClass: "bem-progress-circle", style: _vm.circleStyle }, [_c("svg", {
    attrs: { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/200/svg" }
  }, [_c("circle", {
    staticClass: "el-progress-circle__track",
    attrs: {
      r: _vm.radius,
      "stroke-width": _vm.strokeWidth,
      cx: "50",
      cy: "50",
      fill: "none",
      stroke: "#e5e9f2"
    }
  }), _vm._v(" "), _c("circle", {
    staticClass: "el-progress-circle__path",
    style: _vm.circlePathStyle,
    attrs: {
      r: _vm.radius,
      "stroke-linecap": _vm.strokeLinecap,
      "stroke-width": _vm.strokeWidth,
      cx: "50",
      cy: "50",
      fill: "none",
      stroke: "#2C8DF0"
    }
  })]), _vm._v(" "), _vm.$slots.default ? _c("div", { staticClass: "el-progress__text" }, [_vm._t("default")], 2) : _vm._e()])]);
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

/* style */
var __vue_inject_styles__$d = undefined;
/* scoped */
var __vue_scope_id__$d = undefined;
/* module identifier */
var __vue_module_identifier__$d = undefined;
/* functional template */
var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = normalizeComponent_1({ render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d }, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);

var components = [__vue_component__$5, __vue_component__$3, __vue_component__$6, __vue_component__$7, __vue_component__$1, __vue_component__$a, __vue_component__$b, __vue_component__$c, __vue_component__$d];

var store$1, timeoutId;
var _endCallback, beforeCountDown;
var setNowTimeout = null;

function autoleave() {
  // 是否为局部的倒计时
  var exit_timeout = store$1.state.common.localExitTime || store.hospital.exit_timeout || 180;
  setNowTimeout(exit_timeout);
  CountDown.ticker({
    ticker: "AutoLeaveTimer",
    step: 1000,
    stopCount: exit_timeout,
    callback: function callback() {
      setNowTimeout(store$1.state.common.nowTimeout - 1);
    },
    endCallback: function endCallback() {
      _.isFunction(_endCallback) && _endCallback();
    }
  });
}

function handleClick() {
  setNowTimeout(null);
  timeoutId && clearTimeout(timeoutId);
  CountDown.stop("AutoLeaveTimer");
  // 三种状态不会自动退出
  // 自动退出状态为false
  // 没有传beforeCountDown并且当前页面是首页
  // 传了beforeCountDown且返回false
  var m = [function () {
    return !store$1.state.common.isAutoLeave;
  }, function () {
    return !_.isFunction(beforeCountDown) && location.hash === '#/';
  }, function () {
    return _.isFunction(beforeCountDown) && beforeCountDown() === false;
  }];
  if (m.some(function (item) {
    return item();
  })) {
    return;
  }
  timeoutId = setTimeout(autoleave, 5000);
}

var AutoLeave = {
  name: 'auto-leave',
  value: {
    inserted: function inserted(el, binding) {
      globalConfig.autoLeavelEl = el;
      if (_.isPlainObject(binding.value)) {
        var _binding$value = binding.value;
        _endCallback = _binding$value.endCallback;
        beforeCountDown = _binding$value.beforeCountDown;
      } else if (_.isFunction(binding.value)) {
        _endCallback = binding.value;
      }
      store$1 = globalConfig.store;
      setNowTimeout = function setNowTimeout(p) {
        return store$1.commit('setNowTimeout', p);
      };
      if ('ontouchstart' in window.document.body) {
        el.addEventListener('touchstart', handleClick);
      } else {
        el.addEventListener('click', handleClick);
      }
    }
  }
};

var directives = [AutoLeave];

var mixins = {
  computed: {
    $nowTimeout: function $nowTimeout() {
      return this.$store.state.common.nowTimeout;
    },
    $hospital: function $hospital() {
      return this.$store.state.common.hospital;
    },
    $tipDicts: function $tipDicts() {
      return this.$store.state.common.tipDicts;
    },
    $fwcHospConfig: function $fwcHospConfig() {
      return this.$store.state.common.fwcHospConfig;
    },
    $hardware: function $hardware() {
      return this.$store.state.common.hardware;
    },
    $orgId: function $orgId() {
      return this.$store.getters.getOrgId;
    },
    $winConfigId: function $winConfigId() {
      return this.$store.getters.getWinConfigId;
    },
    $deptId: function $deptId() {
      return this.$store.getters.getDeptId;
    },
    $winCode: function $winCode() {
      return this.$store.getters.getWinCode;
    },
    $extInfo: function $extInfo() {
      return this.$store.getters.getExtInfo;
    },
    $winExtInfo: function $winExtInfo() {
      return this.$store.getters.getWinExtInfo;
    },
    $openUserID: function $openUserID() {
      return buildOpenUserID();
    },
    $heartbeatPacket: function $heartbeatPacket() {
      return this.$store.getters.getHeartbeatPacket;
    }
  },
  methods: {
    $isEmpty: function $isEmpty(value) {
      return isEmpty(value);
    },
    $toArray: function $toArray(list) {
      return toArray(list);
    },
    $isAutoLeave: function $isAutoLeave(status) {
      this.$store.dispatch('isAutoLeave', status);
    },
    $info: function $info(data) {
      if (this.$options.name) {
        data = '[' + this.$options.name + ']' + data;
      }
      info(data);
    },
    $warn: function $warn(data) {
      if (this.$options.name) {
        data = '[' + this.$options.name + ']' + data;
      }
      warn(data);
    },
    $error: function $error(data) {
      if (this.$options.name) {
        data = '[' + this.$options.name + ']' + data;
      }
      error$1(data);
    }
  }
};

var filters = [masking];

var install = function install(Vue) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalConfig;

  config = _.defaultsDeep(config, globalConfig);
  var _config = config,
      store = _config.store;

  _Object$keys(globalConfig).forEach(function (key) {
    globalConfig[key] = config[key];
  });
  // vuex注册通用模块
  if (store && typeof store.registerModule === 'function') {
    store.registerModule('common', storeCommon);
  } else {
    throw new Error('请传入Vuex实例对象');
  }
  init$1(config);
  // VUE全局捕获异常
  Vue.config.errorHandler = function (err, vm, info) {
    var arr = [info, vm.$options.name, err.message, err.stack];
    console.error(err);
    error$1({ desc: err.message, data: arr.join('<br>') });
  };
  // 注册全局组件
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
  // 全局过滤器
  filters.forEach(function (filter) {
    Vue.filter(filter.name, filter);
  });
  // 全局指令
  directives.forEach(function (directive) {
    Vue.directive(directive.name, directive.value);
  });
  // 全局混入
  Vue.mixin(mixins);

  Vue.prototype.$bem = {
    showalert: Alert,
    loading: service,
    api: api,
    audio: audio$1,
    utils: utils,
    axios: instance
  };
};

export { api, audio$1 as audio, instance as axios, install, service as loading, store as localStore, logs as logger, Alert as showalert, utils };
