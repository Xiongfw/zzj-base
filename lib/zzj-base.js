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
var core = module.exports = { version: '2.6.10' };
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

var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify$1 = createCommonjsModule(function (module) {
module.exports = { "default": stringify, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify$1);

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
      visible: false
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

var __$_require_assets_imgs_loading_gif__ = "data:image/gif;base64,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lje/4Nx3j5/Pz1NAOf7+ySs34MxANgXDBOOnUB/DhloeqltDsaJFg/9xMmax4o2gxym14okcuaQkx4kolcxxiKdlSpUk7ckUAlLjoJtUANaUxXPLt5+Jggpd91GV0RtIiUpaynSHgIRgOEEVo2NqGkxX2RXaaqorQhkhn4pdCEOa0rNqvl4EyrbeDJxU0aKLK3cuVm4S4eJ1l7VvXbv9/goLjAyaYJuGOfBoS2xxzMZ8Hh924PUuZVs9OFMay3jzncyhKU8mfHLz1NGgT6suDFnza9iXZYumXdmV6nO4V5vdjS7Ubt7bvAz3XbzL8eRjljNXPvw5dODSad6uvtE09uyNt3M37B2K8/BDr5NvOvs8evPqO0dv/+c9fPfU51uubx9x+vxu2fP/jzHef2TJJyCABBaIYIIKLshggw4+CGGEEk7Y3IF8BWggflEch1yG+22IYVoWDqahiCWS+KGJKaLonyIjctihii3CqN+MHNaonUAjuhAiizkOeCKN/f0I4o4m9CikXkHeOGR3ivXI44tMKrlikkBWOeWVNkJ5pJRcIuGlkWAu+eUjYZ4YJZlimqkmml22uWKaWJb5xZlxvjnnmnXC2aKcW+pJg5194vmnm2PmaSibiN55aKGMKurooI0SeSGgISCZpYeRUuoin5z6yamVmoaaqYyk0hmop05SuemqWp5qKQiYxiqroK6+emulj0IK6657LvopqLn6+Nd9wIInla3F/yarKl7GthoXfcc6+2yvw446bKLCIqvjtdhya42knU57VnzNimUuuV2tZ2206UJ7FTnnQiWvukuV1y669cJr1EH2BuUvvzz5JLBM4ikL8MHzGqzwvyjltPBI1uV700sRUzSdww0Zh7BHFV58DxmzVixyxwVhZHLIKIMcTWoFX8May7n0di3GpdXsT1FowvPboDBbJeksFA5NdNFGH4100kovzXTTTj8NddRST0111VZfjXXWWm/Ndddefw122GKPTXbZZp+Ndtpqr812226/DXfccs9Nd91234133npDaEfPnkWW28eOOdI34YBhdnhdEA+uW+J+/a0M44HjG6NtkP9bXvmTjhVO+VqTP04c4Jtzzm7mNwPgck0RFcl46Z63XnJVLIb7ubSX71Rb7BqtTjvs1ZpOM+odwVRbXraHDjryPri0vOykRwQ8rq/fjnhP9BCfO+nM+o67483T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FpMGbDkRqVM4Ml02nZpwJMOIWNWg/Ninqzqo6MKKpeqxopyzaCniOBqHrVe37ITekdsi41gDCNvGxXvsnlJPg9cCFkY3K8C9fw9zSDw3k9/GjgVB5iZvMpvKjy8z6xD5LmfLnjuDDmx2tFbMlEyn5kz2cy/CsL+imC25Nu42o5/t5q36N5nevoV7IW58DPLkXZYzv+L8+dLg0qfrrl71OvbYlbdDie49rfbwpeWS5+74/Orx6nWAb+++N/zybOcL7m5/x/v8MPbz/3fh339IyCegDAEWiGCCCi7IYIMOPghhhBJOGB91i1kYw37EkWYggbRh2J+HF7IHoIhRbFghexsW1yGIDx34iIl8oViIiyumiN+HJJqgIY0z9AjjFzK+OGSJNvrYoopIZjjkjTUqGWQzR0YZApBF8tjkkiFOeeWAXLpoJJRdxvjljl6KCSaWZeaYJJsnUgmClWme6eaMcFaT5Z2trZnek3USOSeZaJop6J9O/pjnmELyeRiOfer4Z5iGaqlIooEuOmikamb6aJudvqmolJw26uendoZapaWEYjqpnqcxCpijpEJqaqWwmidrrApQauuoeOmnaq29tnopq7W6uqev9f8Be+tZDSnrLLPQdnXfscUWau2qdGYrLJPNYkVftLQu+yyxulY764i4onuuuuKy++uu3XqaLqjrhivWAvPS26697+JLrbzximduvujVe+q/AIMrsMILT6UvuQf3mzDE3wWblHUFZ6wxt05Bh3FNc4S8UnMkh3TcyRcpp/JCw7XMD3DT1rOGnCjXDHM2hn2r884zE/NapBJxJexAIBV9zkuaRiOKpoB+QmHUUk9NddVWX4111lpvzXXXXn8Ndthij0122WafjXbaaq/Ndttuvw133HLPTXfddt+Nd9567813337/DXjggg9OeOGGH444HqzRwwQ5rpks29GN04TYOpX/22nU44xPLhWLmckW+XqcS84h6a8+tvhlQ4W+uee5NZ7XwatrnnI/CPlbul65tw6Azy7djrvr6M4++su2X/707tIWz7vvUaGWvPKlCk+09J/D9frz0PcluvWKQ3+6XQ4QxFrqiLJefe+pxmT58chXHP4sHXsfMfubMt+w5mcke0u5VlVcFEnRD4CZiBPQlve/6D0FW9TL3wDj9wr/RSV4CzRWAyHlrV1I8CTquh7+FNg/D8oPgRMkYPYa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SMaTKHF6QUKTZ0+fFB+9FErUCpSjPJMSkcL0ptOiUJV2nNpwac6EWLMa3SqsK0etH8OKlfd1p66zaIGaXMvWotu3teLKrclyl91tOovF2ssXJsCfsAC76NtWSF3D8ATfq3h3GON054YeXtD21+RjK70efFx4c7jOD/9R/ivaieNq8RovTt1stWsIp1+nxhtYXMvNc2cLpQ07NmLOvz0EF94befHWsKEuF3H8ObXg0rU1r24nOvY62re/6e4dDfjwhKiTF2/+fPnr6sOMb5/lPfwr8udHqW8/rej8WvDz/x++33/0pScgWbcVeB+BCCbH24L6Neggg5NFqISCFF6IYYYabshhhx5+CGKIIo7CHmQBuiHfcYd8Z6FlEKJX4hYq+tGiisqtd+BnLYKR4owsxniLjyjWKCSMOZr44hk9+hcfkUwq4uSOXywpZX9RAunelUcqqeWJRnop45MDYmkjjWQWyeWZYlalZpVNtoklj10miSOYQa6ZIJxb1kmnixP+uKefjJkZaJmA2imoYYQiauiQeiIq56N9Rloomnz+qWOcU86J6Zd9Nuppp2G6CaWkol46qAKgplkpngYyammWpqbqaKukjmmrplbOquihn8ZKKayuPnhqontxx2mvvv8WC2ywv96Kq7C67prrpLJWWyyqyiK5ba3SQnrtt9lqCxhm027Ka1x3UDkuuceqGmiotHJrl3XYvrtusmxNl25Xxugr1r/9TjUIu/jaK666BQNM8MIDE5WIwfsiInHAETPskyMVN9zIxk5J4jHEIGOc0iUhz4TJySWnTHJEnaiMUSgwKyTKzPuYYnM7kj2s8873uqwZz9KgJjQwttTnEUQ7Am1WvDdLBa43y8V7pysjXo111lpvzXXXXn8Ndthij0122WafjXbaaq/Ndttuvw133HLPTXfddt+Nd9567813337/DXjggg9OeOGGH4544oovznjjjjvOmsOjtVLbm5P/c0WcwJdHU5tqr64I9eYIg045cZkDSDrmoud7urnHRI76jU23zvrqma54WexN+YbuTmqADvtqu1fee1m/Ixf8OcQrvbzlxnfO+0S0w9V8qb5DHz0N2R+9PedWlX499tMDUb1ttpumGHBjVL158tqXT/T43j+lfvitw2+sJiPjfztVJnTPPs9VxDhDQ5ZNAug/Ep3PRJwDATayI5FREeZ//AMgAZUBwQPmLzcksKBlYvBAA66PgfMTYP8wiD5cZHCEEkwdCV1XDvAZTYRqQWAKU4jCEvJihTX8oA5lh8AcwtCE9SMiPvjnLSLOJntMpIcMXXhE+cFLiotSoviMaMMf/wpxigvkIhZvqDHfLLF5HjTXCcoYxS72TxxIlJcXU9dEKv4QOm18IhDBqA41LutGY5weGtfIxtNBMY1fnKMD63ipIcKRjIgMIh0FWcg33tGQeYwkDaHYR9t1rx6ZtKQPKzlIPF7sflcM5Sb58cksEjKUlLygHpMou06asnycPM3xAMCcV6rSlZ5cliKVE8cF1tJ0FazjH/+YSEkC8perVItrPHhMYzbSWbEsJS5b+cuyfNJ9yjykHFs4yUti0pqizGZQtglNaX5zl5ITnSyvyUxv6lKH4ARlOLtpzzAS753lbOY9i3iIW9pzFvpcHT+x2cwXJpSbkiRox5Z30Hjmcv9y6SyNP632UNpFFJ/+XOZF2xhCikVvox7FITCRaNGPkiKjGiUnQs35vSCuc4OQYOkXSapQk8Y0f4Ekhk1nmblgejKC4JxpKifKSolqTpMuVaodo1LUXuYUoP+cau2YGlRGylGDMq1qSanaU6mGi5U4rSdSwRJVr5LPqCYTqgndqtaEDhSYElLdTcvKTgqu85bwvBNuxNpBPaphonZ86lfN6om9inGeYU3qCwB4ypZWD3ZwlUERgpcbZPLSsXqdLDdzV9TCHjavI+AraEEzFOWxdbOSTR5qGXrU2CJWiyRJ6yIZm8+StJZ3r41s+6AKU6skZrVnVa37UNtV5MF2sTutbWhOOKJZ1hp3pBxMVFQ7ekLPOPclRZmmdHVr0OqaFp6wddF2U5rd9HXVvN4t7nTPB1puXdevaT1vZOwrXr5k5n3EPWs4Gcqa3CWQpuWlLiRPe1/LtpeXDC6ifG1LyuYGNqvxTbCC+3vV36a0siCsXHyTK7z4GXG/pC1xaT28Pb7+lbNtdaeFOZxYF3cxuo2Na0Fpm1QYPxaiLK5aXeEi4kH2OFpDNpnbaMyHAgAAIfkEBRgAAwAsegAtAPsAKAEAAv+cj6nL7Y+AmLTai7OusPsPhuJIlmYjberKaucLx/JMo+2Nt/XO9/6cygmHmJ/xiEwSl0xK8gmNlprUpfSKzR6q3KH2CzZ2x7iw+QwLktcbtPv9YctV8Lo9Mc9n7ny4/m/RJ2gGWDgxiIhluJjY+LTI6Cj5A2k4eblTaYnJmaZZ2Bk69QkqahpHWnq66pCqygob4QoYW2sw+2q7ikury8rb63sK/Cc8TKxnbIqcfBQ46qS8xZznXBSyJz1AXU3pgpptzN3ds+JhLj4u56Pz0K6rPsf+vnAjHL9ebl+/D4+/Nq/fNIG1/gHUV2YgQVgGDyLcJ+RewzHeivmaSLGiPIn/GKtYy8exYxMkIC+K9EiSjLSTKFNy0caSCpSXMGMyiSJT2zabVnD21Mnz50wvOm8FJeozYtGdR3NIuVm0qdJHI4FKTaikpbKrWD9qDcmVjssuK8OyGJsRrNlwAdmkW9tGY8mCcOM+JEe3LttMTpku/KV3L42pfukxDHyNR19Zf48hfqa4cdfDjznctcvvrK3KkPmia6U5L2cBchO7E7t59KHSls9986faa2twnVPHlm2itu3RSxOpXt1b0G/SwYX/Lm78NvI7w5fzae7cDvTofo5Tr678Oprp2s9w7x7mO/gv4sdnKW/+Cvr0SXmzJ2/9/fn48tXTr9+eM35F9/dn/83u33/uBUgVgASK0d+BbemnYIMOPghhhBJOSGGFFl6IIVqVZZYgGOUNB9x2CYJInBsfgojdgIx1CJ+Bhano3YgovnHielrUyOKNMto4n4skpsggHjOauGOOPcJoFI/8+TikiEwqad+TRi6J5ItBOlnljzQW6aKHXFbppZRdtphlkzGKCSaZVyo0po5orknIl3CGJ+eGW75pJ5F4PgZkniu2eeScWupZJpRP1cnnnYVOGeWigFIpqJlx7olYn4kKaWh+frKZppuOdhropkkyeiilgVlaqQKDYhlppkOZqheqp6oqKZ2w1iVrrLSSWuqnok7q66WEtvoopL/Wamuws//miuuuoHpK7JzARvvrtMcWG6qwnKZaB47VWqvtqOEOe620ZyoL13OIrtWHt8tKt25YyaErb7vxXjWIu+nOSy27+d7bFCL61vvvrUH5BjBPjQwslSMMHyXJwwc7nPBJk0gc0yUYW6xxxRNxsjFGnYTcUCgk/yPKyfEs47E6jtFr0C4tM0MZzC7X3C/KokkrMmxglvwWzyvXlCY3xXXKS4ZKL810004/DXXUUk9NddVWX4111lpvzXXXXn8Ndthij0122WafjXbaaq/Ndttuvw133HLPTXfddt+Nd9567813337/DXjggnerhgQLX9BBAIgnGw3Ruqn7uLONJ9nr5Fv/mcZviDZ0FvmCmgc9W+YlgvaMYKxFhbm9nf+52muyfa4W7NCiVHiJpl82+uWLn0tT7azL7lnooFseJllWYro6ELuXtTzjtDfvOu6oN584VKdltFftuUeWfCy3k05E9din/r0MqccOgAhVXW+86dRzCEzE57OPVG7vS058Ya4hA69Kv09Ggvnhb3tGAQE1+pcWcREGGsJjgACxQTPC+W9bABzBA38XgwNKMIHHc+D9rMS/zREDgcbblgjzp8AIejCEzAofBlfYwBSyEH5J22AJU3hC4OEDfCjMIQF5CDzmkA96HxTgDn0Iwe4hr4dCpB7mjFjEocGQiTT8IRIp5kQi/3bugqA5ARf3F8Mr0oaKNiTeE6OoxCkGUY1WTGIY2ehGMqJqgEvU4Qch8MU6bm+NVYwjH/Uov8edcYt3BOIfAYk8AxaSjopMI7kIOMgwXnAjHTQhHheJyDEe8pF9fGEnfUiTSuLwko4cpSbbSELYRbKHkwSJabQnvjd+EoxyVFT+VmnH5FHylZgUZSxracnDCVKLkizkLpeXxzwGk5abZJUqiclKY7pyd+XzJDNRyUiEvQ+X6YOjIUOZmGou85fN9KXouplJU2bzmi+gZi/NSb9yKpN3t4RmLmWpR2ySkgOwvOYssBhDboqRnKNLJuLESUFXABSFAvUmQQvay8aw8f+fwgyoPdG5zm+m85vz1KDA5tfQWYIyd8oMjT8Vqs3IhTSjE7VeQvGZT5R+lJC1gaISHfJSYMpQpgUrZk3RCFOc7lSn6iSoH/VJz3tazqYwBaFQcqq+dxZ1n0RVUzR/StOmTvB/5ZxqPJE6Tsi9caUbHakLYwpW5ZUSZEwNXVu7OlCqulVDaWUrUN16V7g69KEYZQqC1mpBrQZ1rHfMXl7rashG6gawiq3qUeWKSpA+0LBZdSwcBYMZeHqCsacMYvS4WsW+lvWtiA1tZlGjQOlx73aoher/vsrSsKLVpZ9J7Woty1fZtXaoJG3lYl3aUuvRQ6qPve39duvUEH12tMCxNS1UEjLP4gZPsstFzXJfO9vaBtcKfSGudGugPYZmlrcUhOwemzvAsyYXhC/yXGk728brOjWhA+HqeZ/qXO2Sl7e4NSruIjvZcLJlMTnVb2zN2VqTgte7Ua2lGn4J2gI3cH3tvKjwDKzWpi70wobxqocD+1vqItR+nBVdfsVbWb2KlL0j/auGA1lP5H44uonFH2Rf996Z/lDGsv1wgy2a1iDQ1STeO26Oh3wRsdF4EAUAADs=";

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
  }, [_c("img", { attrs: { src: __$_require_assets_imgs_loading_gif__ } })]);
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

var loadingVue = normalizeComponent_1({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var LoadingConstructor = Vue.extend(loadingVue);
var vm = null;

LoadingConstructor.prototype.close = function () {
  this.visible = false;
};

LoadingConstructor.prototype.show = function () {
  vm.$emit("mount");
  if (globalConfig.store.state.common.isFullscreen) {
    vm.$el.style.position = "fixed";
  } else {
    vm.$el.style.position = "absolute";
  }
  this.visible = true;
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

var button = normalizeComponent_1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

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
    BemButton: button
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

var alertVue = normalizeComponent_1({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

Vue.use(Vuex);
var AlertConstructor = Vue.extend(alertVue);

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
  authorization: null
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
  timeout: 1000 * 20
});

var getApiName = function getApiName(url) {
  return url.substring(url.lastIndexOf('/') + 1);
};

/** 是否显示加载动画 */
function isLoading(status) {
  if (status) {
    service.show();
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
  var options = config.options;

  options.loading !== false && isLoading(true);
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
  var options = res.config.options;

  options.loading !== false && isLoading(false);
  if (res.data.code === 0) {
    record('info', res);
    return _Promise.resolve(res.data.data);
  } else {
    options.alert !== false && Alert(res.data.msg);
    record('warn', res);
    var error = new Error(res.data.msg || '接口异常->' + _JSON$stringify(res.data));
    error.failure = true;
    return _Promise.reject(error);
  }
}, function (error) {
  // error里面有request属性就是网络错误
  if (error.request) {
    var options = error.config.options;

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
  extInfo.devUrl && (ext_device_url = "http://" + extInfo.devUrl + "/api/");
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

var baseUrl$7 = Constants.service_window_url;

var BillServiceApi = {
  /**
   * 4.2 更新订单状态（院方） IF_Update_Trade_Status
   * 接口说明：
   * 先调服务窗4.2更新订单状态（院方） IF_Update_Trade_Status 再调贝尔曼统一支付平台更新订单状态（我方） PAY_Update_Trade_Status更新我方订单状态接口
   */
  IF_Update_Trade_Status: function IF_Update_Trade_Status(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$7 + 'IF_Update_Trade_Status', params, { options: options });
  }
};

var baseUrl$8 = Constants.service_window_url;

var BookingServiceApi = {
  /**
   * 22.1、获取预约资源
   */
  IF_Get_Booking_Resource: function IF_Get_Booking_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_Get_Booking_Resource', { params: params, options: _extends$1({ log: false }, options) });
  },

  /**
   * 22.2、获取科室预约号源
   */
  IF_Get_Booking_Dept_NoSource: function IF_Get_Booking_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_Get_Booking_Dept_NoSource', { params: params, options: _extends$1({ log: false }, options) });
  },

  /**
   * 22.3、获取医生预约号源 
   */
  IF_Get_Booking_Doc_Resource: function IF_Get_Booking_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_Get_Booking_Doc_Resource', { params: params, options: _extends$1({ log: false }, options) });
  },

  /**
   * 22.6、确认预约
   */
  IF_Confirm_Booking: function IF_Confirm_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_Confirm_Booking', params, { options: options });
  },

  /**
   * 22.7、取消预约
   */
  IF_Cancel_Booking: function IF_Cancel_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_Cancel_Booking', { params: params, options: options });
  },

  /**
   * 22.8、预约转挂号
   */
  IF_Booking_To_Regist: function IF_Booking_To_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_Booking_To_Regist', params, { options: options });
  },

  /**
   * 22.9、获取患者预约列表
   */
  IF_Get_Patient_Booking_List: function IF_Get_Patient_Booking_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_Get_Patient_Booking_List', { params: params, options: options });
  },

  /**
   * 22.10、获取患者预约详细
   */
  IF_Get_Patient_Booking_Detail: function IF_Get_Patient_Booking_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_Get_Patient_Booking_Detail', { params: params, options: options });
  },

  /**
   * 22.12、确认签到
   */
  IF_Confirm_Check: function IF_Confirm_Check(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_Confirm_Check', params, { options: options });
  }
};

var baseUrl$9 = Constants.service_window_url;

var ClinicChargeServiceApi = {
  /**
   * 5.1、获取诊间未缴费账单列表
   */
  IF_Get_OutPatient_Uncharge_Trade_List: function IF_Get_OutPatient_Uncharge_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$9 + 'IF_Get_OutPatient_Uncharge_Trade_List', { params: params, options: options });
  },

  /**
   * 5.2、获取未付诊间缴费明细
   */
  IF_Get_OutPatient_UnCharge_Trade_Detail: function IF_Get_OutPatient_UnCharge_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$9 + 'IF_Get_OutPatient_UnCharge_Trade_Detail', { params: params, options: options });
  },

  /**
   * 5.4、获取诊间费用详细
   */
  IF_Get_OutPatient_Charged_Trade_Detail: function IF_Get_OutPatient_Charged_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$9 + 'IF_Get_OutPatient_Charged_Trade_Detail', params, { options: options });
  },

  /**
   * 5.5、诊间未缴费订单验证接口（院方）--
   * 接口说明：
   * 先调服务窗 5.5、诊间未缴费订单验证接口（院方） IF_Check_Hospital_Trade
   * 根据 CheckUnchargedTrade 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   */
  IF_Check_Hospital_Trade: function IF_Check_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$9 + 'IF_Check_Hospital_Trade', params, { options: options });
  }
};

var baseUrl$a = Constants.service_window_url;

var EvaluateServiceApi = {
  /**
   * 26.5、获取评价选项
   */
  IF_Get_EvaluateOption_Info: function IF_Get_EvaluateOption_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$a + 'IF_Get_EvaluateOption_Info', params, { options: options });
  },

  /**
   * 26.6、保存评价
   */
  IF_Evaluate_Save: function IF_Evaluate_Save(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$a + 'IF_Evaluate_Save', params, { options: options });
  }
};

var baseUrl$b = Constants.service_window_url;

var FwcServiceApi = {
  /**
   * 99.20、代扣协议查询
   */
  FWC_IF_Withholding_Query: function FWC_IF_Withholding_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$b + 'FWC_IF_Withholding_Query', params, { options: options });
  },

  /**
   * 99.21、扫码绑定卡号
   */
  IF_FWC_BindCardNoByQrCode: function IF_FWC_BindCardNoByQrCode(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$b + 'IF_FWC_BindCardNoByQrCode', params, { options: options });
  },

  /**
   * 99.27、自助绑卡
   */
  FWC_IF_BindCard: function FWC_IF_BindCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$b + 'FWC_IF_BindCard', params, { options: options });
  },

  /**
   * 99.33、刷脸支付芝麻授权初始化
   */
  IF_FacePay_ZhiMaInit: function IF_FacePay_ZhiMaInit(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_FacePay_ZhiMaInit', { params: params, options: options });
  },

  /**
   * 99.34、刷脸支付
   */
  FWC_IF_Face_Pay: function FWC_IF_Face_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$b + 'FWC_IF_Face_Pay', params, { options: options });
  },

  /**
   * 99.35、刷脸生活芝麻授权初始化
   */
  IF_FaceLive_ZhiMaInit: function IF_FaceLive_ZhiMaInit(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_FaceLive_ZhiMaInit', { params: params, options: options });
  }
};

var baseUrl$c = Constants.service_window_url;

var HospitalizationAppointment = {
  /**
   * 14.1、获取住院列表
   */
  IF_Hospitalization_Get_List: function IF_Hospitalization_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$c + 'IF_Hospitalization_Get_List', { params: params, options: options });
  },

  /**
   * 14.2、获取已登记住院信息
   */
  IF_Hospitalization_Get_Registration_Info: function IF_Hospitalization_Get_Registration_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Hospitalization_Get_Registration_Info', params, { options: options });
  },

  /**
   * 14.3、住院信息登记
   */
  IF_Hospitalization_Registration_Info: function IF_Hospitalization_Registration_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Hospitalization_Registration_Info', params, { options: options });
  },

  /**
   * 14.4、获取住院详情
   */
  IF_Hospitalization_Detail: function IF_Hospitalization_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Hospitalization_Detail', params, { options: options });
  },

  /**
   * 14.5、确认预约
   */
  IF_Hospitalization_Confirm_Booking: function IF_Hospitalization_Confirm_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Hospitalization_Confirm_Booking', params, { options: options });
  },

  /**
   * 14.6、取消住院
   */
  IF_Hospitalization_Cancel_Booking: function IF_Hospitalization_Cancel_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Hospitalization_Cancel_Booking', params, { options: options });
  }
};

var baseUrl$d = Constants.service_window_url;

var HospitalLeaveServiceApi = {
  /**
   * 16.1、获取出院列表
   */
  IF_LeaveHospital_Get_List: function IF_LeaveHospital_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_LeaveHospital_Get_List', { params: params, options: options });
  },

  /**
   * 16.2、获取待办理出院详情
   */
  IF_LeaveHospital_Detail: function IF_LeaveHospital_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_LeaveHospital_Detail', params, { options: options });
  },

  /**
   * 16.3、确认出院办理
   */
  IF_LeaveHospital_Confirm: function IF_LeaveHospital_Confirm(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_LeaveHospital_Confirm', params, { options: options });
  },

  /**
   * 16.4、出院小结列表
   */
  IF_LeaveHospitalSummary_Get_List: function IF_LeaveHospitalSummary_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_LeaveHospitalSummary_Get_List', { params: params, options: options });
  },

  /**
   * 16.5、出院小结详情
   */
  IF_LeaveHospitalSummary_Detail: function IF_LeaveHospitalSummary_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_LeaveHospitalSummary_Detail', params, { options: options });
  },

  /**
   * 16.6、取消出院办理
   */
  IF_LeaveHospital_Cancel: function IF_LeaveHospital_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_LeaveHospital_Cancel', params, { options: options });
  },

  /**
   * 16.7、确认出院-医保结算预约
   */
  IF_LeaveHospital_ByInsurance_Confirm: function IF_LeaveHospital_ByInsurance_Confirm(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_LeaveHospital_ByInsurance_Confirm', params, { options: options });
  },

  /**
   * 16.8、获取已办理出院详情
   */
  IF_LeaveHospital_Result: function IF_LeaveHospital_Result(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_LeaveHospital_Result', params, { options: options });
  }
};

var baseUrl$e = Constants.service_window_url;

var HospitalPrepaymentServiceApi = {
  /**
   * 6.1、确认住院号（含规则）
   */
  IF_Confirm_AdmissionNumber: function IF_Confirm_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$e + 'IF_Confirm_AdmissionNumber', params, { options: options });
  },

  /**
   * 6.2、缴纳住院预缴金
   */
  IF_Charge_Foregift: function IF_Charge_Foregift(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$e + 'IF_Charge_Foregift', params, { options: options });
  },

  /**
   * 6.3、获取住院预缴列表
   */
  IF_Get_Inhospital_Foregift_List: function IF_Get_Inhospital_Foregift_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Get_Inhospital_Foregift_List', { params: params, options: options });
  },

  /**
   * 6.4、住院预交金详细接口
   */
  IF_Get_Inhospital_Foregift_Detail: function IF_Get_Inhospital_Foregift_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Get_Inhospital_Foregift_Detail', { params: params, options: options });
  },

  /**
   * 6.5、 获取住院患者列表
   */
  IF_Get_Inhospital_Patient_List: function IF_Get_Inhospital_Patient_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Get_Inhospital_Patient_List', { params: params, options: options });
  }
};

var baseUrl$f = Constants.service_window_url;

var HospitalServiceApi = {
  /**
   * 10.2、获取医院候诊查询列表（个人）
   */
  IF_Get_Hospital_Waiting_List: function IF_Get_Hospital_Waiting_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$f + 'IF_Get_Hospital_Waiting_List', { params: params, options: options });
  },

  /**
   * 10.11、获取提醒字典
   */
  IF_FWC_Tip_Dictionary: function IF_FWC_Tip_Dictionary(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$f + 'IF_FWC_Tip_Dictionary', { params: params, options: options });
  }
};

var baseUrl$g = Constants.service_window_url;

var InhospitalServiceApi = {
  /**
   * 9.1、获取住院总费用列表
   */
  IF_Get_Inhospital_Total_Cost_List: function IF_Get_Inhospital_Total_Cost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$g + 'IF_Get_Inhospital_Total_Cost_List', { params: params, options: options });
  },

  /**
   * 9.2、获取住院总费用详细
   */
  IF_Get_Inhospital_Total_Cost_Detail: function IF_Get_Inhospital_Total_Cost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$g + 'IF_Get_Inhospital_Total_Cost_Detail', { params: params, options: _extends$1({ log: false }, options) });
  },

  /**
   * 9.5、获取住院患者列表
   */
  IF_Get_InhospitalCost_Patient_List: function IF_Get_InhospitalCost_Patient_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$g + 'IF_Get_InhospitalCost_Patient_List', { params: params, options: options });
  },

  /**
   * 9.6、获取住院详情
   * 腕带和就诊卡登录都是调用此接口：腕带登录PatientNumber字段传住院号；就诊卡登录PatientNumber字段传卡号；另外再加biz_type过去非必填字段，主要用于区分是就诊卡还是腕带
   */
  IF_Get_InhospitalCost_Patient_Detail: function IF_Get_InhospitalCost_Patient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$g + 'IF_Get_InhospitalCost_Patient_Detail', { params: params, options: options });
  },

  /**
   * 9.7、获取住院记录
   */
  IF_Get_Inhospital_info_List: function IF_Get_Inhospital_info_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$g + 'IF_Get_Inhospital_info_List', { params: params, options: options });
  }
};

var baseUrl$h = Constants.service_window_url;

var PatientCardService = {
  /**
   * 1.1、创建就诊卡
   */
  IF_Create_MedicalCard: function IF_Create_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$h + 'IF_Create_MedicalCard', params, { options: options });
  },

  /**
   * 1.2、登记就诊卡
   */
  IF_Regist_MedicalCard: function IF_Regist_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$h + 'IF_Regist_MedicalCard', params, { options: options });
  },

  /**
   * 1.3、注销就诊卡
   */
  IF_Cancel_MedicalCard: function IF_Cancel_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$h + 'IF_Cancel_MedicalCard', params, { options: options });
  },

  /**
   * 1.4、清除就诊卡
   */
  IF_Clear_MedicalCard: function IF_Clear_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$h + 'IF_Clear_MedicalCard', { params: params, options: options });
  },

  /**
   * 1.5、获取医院已有卡列表
   */
  IF_Get_Hospital_MedicalCard_List: function IF_Get_Hospital_MedicalCard_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$h + 'IF_Get_Hospital_MedicalCard_List', { params: params, options: options });
  },

  /**
   * 1.8、刷新就诊卡
   */
  IF_Refresh_MedicalCard: function IF_Refresh_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$h + 'IF_Refresh_MedicalCard', { params: params, options: options });
  },

  /**
   * 1.9、获取绑卡人信息
   */
  IF_Get_BindCardPerson_Info: function IF_Get_BindCardPerson_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$h + 'IF_Get_BindCardPerson_Info', { params: params, options: options });
  }
};

var baseUrl$i = Constants.service_window_url;

var RegistServiceApi = {
  /**
   * 23.1、获取挂号资源
   */
  IF_Get_Regist_Resource: function IF_Get_Regist_Resource(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$i + 'IF_Get_Regist_Resource', data: data, options: _extends$1({ log: false }, options) });
  },

  /**
   * 23.1、获取挂号资源
   */
  IF_Get_Regist_Resource_DataSource: function IF_Get_Regist_Resource_DataSource(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$i + 'IF_Get_Regist_Resource_DataSource', data: data, options: _extends$1({ log: false }, options) });
  },

  /**
   * 23.3、获取医生挂号号源
   */
  IF_Get_Regist_Doc_Resource: function IF_Get_Regist_Doc_Resource(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: baseUrl$i + 'IF_Get_Regist_Doc_Resource', data: data, options: _extends$1({ log: false }, options) });
  },

  /**
   * 23.6、确认挂号
   * 先调服务窗 23.6、确认挂号 IF_Confirm_Regist
   * 根据 HospitalTradeApplyInfo 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   */
  IF_Confirm_Regist: function IF_Confirm_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$i + 'IF_Confirm_Regist', params, { options: options });
  },

  /**
   * 23.7、取消挂号
   */
  IF_Cancel_Regist: function IF_Cancel_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$i + 'IF_Cancel_Regist', params, { options: options });
  },

  /**
   * 23.8、获取患者挂号列表
   */
  IF_Get_Patient_Regist_List: function IF_Get_Patient_Regist_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Patient_Regist_List', { params: params, options: options });
  },

  /**
   * 23.9、获取患者挂号详细
   */
  IF_Get_Patient_Regist_Detail: function IF_Get_Patient_Regist_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Patient_Regist_Detail', { params: params, options: options });
  }
};

var baseUrl$j = Constants.service_window_url;

var ReportServiceApi = {
  /**
   * 8.1、获取检验报告列表
   */
  IF_Get_Jianyan_Report_List: function IF_Get_Jianyan_Report_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$j + 'IF_Get_Jianyan_Report_List', { params: params, options: options });
  },

  /**
   * 8.2、获取检验报告详细
   */
  IF_Get_Jianyan_Report_Detail: function IF_Get_Jianyan_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$j + 'IF_Get_Jianyan_Report_Detail', { params: params, options: options });
  },

  /**
   * 8.3、获取放射报告列表
   */
  IF_Get_Fangshe_Report_List: function IF_Get_Fangshe_Report_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$j + 'IF_Get_Fangshe_Report_List', { params: params, options: options });
  },

  /**
   * 8.4、获取放射报告详细
   */
  IF_Get_Fangshe_Report_Detail: function IF_Get_Fangshe_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$j + 'IF_Get_Fangshe_Report_Detail', { params: params, options: options });
  }
};

var baseUrl$k = Constants.service_window_url;

var SchedulingServiceApi = {
  /**
   * 25.1、门诊排班科室列表
   */
  IF_Get_Scheduling_Outpatient: function IF_Get_Scheduling_Outpatient(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'IF_Get_Scheduling_Outpatient', params, { options: options });
  },

  /**
   * 25.2、门诊排班详情
   */
  IF_Get_Scheduling_Outpatient_Detail: function IF_Get_Scheduling_Outpatient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'IF_Get_Scheduling_Outpatient_Detail', params, { options: options });
  },

  /**
   * 25.3、获取医生排班 
   */
  IF_Get_Doc_Scheduling_Outpatient_Detail: function IF_Get_Doc_Scheduling_Outpatient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'IF_Get_Doc_Scheduling_Outpatient_Detail', params, { options: options });
  },

  /**
   * 25.4、停诊排班
   */
  IF_Get_Scheduling_Close: function IF_Get_Scheduling_Close(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'IF_Get_Scheduling_Close', params, { options: options });
  }
};

var baseUrl$l = Constants.service_window_url;

var SeflQrCodeServiceApi = {
  /**
   * 12.6、自助机登录二维码获取
   */
  IF_Get_ZiZhuJi_LoginUrl: function IF_Get_ZiZhuJi_LoginUrl(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$l + 'IF_Get_ZiZhuJi_LoginUrl', { params: params, options: options });
  },

  /**
   * 12.9、获取已绑卡列表
   */
  IF_Get_BindCard_List: function IF_Get_BindCard_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$l + 'IF_Get_BindCard_List', { params: params, options: options });
  },

  /**
   * 12.8、获取已绑卡列表
   */
  IF_Get_ZiZhuJi_LoginQuery: function IF_Get_ZiZhuJi_LoginQuery(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$l + 'IF_Get_ZiZhuJi_LoginQuery', { params: params, options: options });
  }
};

var baseUrl$m = Constants.service_window_url;

var SurgeryServiceApi = {
  /**
   * 41.1、获取手术相关信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Surgery_Detail: function IF_Surgery_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$m + 'IF_Surgery_Detail', params, { options: options });
  }
};

var baseUrl$n = Constants.service_window_url + '/cust/';

var ZzjCustomServiceApi = {
  /**
   * 自助机登录二维码获取ZZJ_GetLoginUrl
   */
  ZZJ_GetLoginUrl: function ZZJ_GetLoginUrl(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_GetLoginUrl', { params: params, options: options });
  },

  /**
   * 自助机登录查询ZZJ_LoginQuery
   */
  ZZJ_LoginQuery: function ZZJ_LoginQuery(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_LoginQuery', { params: params, options: options });
  },

  /**
   * 获取住院证数据IF_Guidance_Info
   */
  IF_Guidance_Info: function IF_Guidance_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Guidance_Info', { params: params, options: options });
  },

  /**
   * 60.5 ZZJ_Get_ZhuYuan_List 通过就诊卡号获取住院信息
   */
  ZZJ_Get_ZhuYuan_List: function ZZJ_Get_ZhuYuan_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_ZhuYuan_List', { params: params, options: options });
  },

  /**
   * 53.1 确认住院号ZZJ_Confirm_AdmissionNumber 通过腕带（住院号）获取住院信息
   */
  ZZJ_Confirm_AdmissionNumber: function ZZJ_Confirm_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Confirm_AdmissionNumber', { params: params, options: options });
  },

  /**
   * 五官科扫码验证登录
   */
  IF_Get_BindCardPatInfo: function IF_Get_BindCardPatInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_BindCardPatInfo', { params: params, options: options });
  },

  /**
   * 50.1、获取挂号号源
   */
  IF_Get_Regist_Resource: function IF_Get_Regist_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_Regist_Resource', { params: params, options: options });
  },

  /**
   * 50.1、获取预约号源
   */
  IF_Get_Booking_Resource: function IF_Get_Booking_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_Booking_Resource', { params: params, options: options });
  },

  /**
   * 50.3、获取医生挂号号源
   */
  IF_Get_Regist_Doc_Resource: function IF_Get_Regist_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_Regist_Doc_Resource', { params: params, options: options });
  },

  /**
   * 50.3、获取医生预约号源
   */
  IF_Get_Booking_Doc_Resource: function IF_Get_Booking_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_Booking_Doc_Resource', { params: params, options: options });
  },

  /**
   * 50.2、获取科室挂号号源
   */
  IF_Get_Regist_Dept_NoSource: function IF_Get_Regist_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_Regist_Dept_NoSource', { params: params, options: options });
  },

  /**
   * 50.2、获取科室预约号源
   */
  IF_Get_Booking_Dept_NoSource: function IF_Get_Booking_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_Get_Booking_Dept_NoSource', { params: params, options: options });
  },

  /**
   * 51.1 查询未交费记录
   */
  ZZJ_Get_Uncharge_Trade_List: function ZZJ_Get_Uncharge_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_Uncharge_Trade_List', { params: params, options: options });
  },

  /**
   * 51.2 确认订单
   */
  ZZJ_Check_Hospital_Trade: function ZZJ_Check_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Check_Hospital_Trade', { params: params, options: options });
  },

  /**
   * 51.3交易查询
   */
  ZZJ_Barcode_Pay_State: function ZZJ_Barcode_Pay_State(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Barcode_Pay_State', { params: params, options: options });
  },

  /**
   * 51.4交易撤销
   */
  ZZJ_Barcode_Pay_Cancel: function ZZJ_Barcode_Pay_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Barcode_Pay_Cancel', { params: params, options: options });
  },

  /**
   * 51.5交易查询
   */
  ZZJ_Barcode_Pay_Query: function ZZJ_Barcode_Pay_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Barcode_Pay_Query', { params: params, options: options });
  },

  /**
   * 52.1确认就诊卡
   */
  ZZJ_Confirm_MedicalCard: function ZZJ_Confirm_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Confirm_MedicalCard', { params: params, options: options });
  },

  /**
   * 52.2 确认充值
   */
  ZZJ_Charge_MedicalCard: function ZZJ_Charge_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Charge_MedicalCard', { params: params, options: options });
  },

  /**
   * 53.2 确认充值(住院)
   */
  ZZJ_Charge_AdmissionNumber: function ZZJ_Charge_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Charge_AdmissionNumber', { params: params, options: options });
  },

  /**
   * 55.1 获取账单列表
   */
  ZZJ_Get_Bill: function ZZJ_Get_Bill(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_Bill', { params: params, options: options });
  },

  /**
   * 56.1 签到
   */
  ZZJ_SignIn: function ZZJ_SignIn(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_SignIn', { params: params, options: options });
  },

  /**
   * 50.6 获取患者挂号列表
   */
  ZZJ_Get_Patient_Regist_List: function ZZJ_Get_Patient_Regist_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_Patient_Regist_List', { params: params, options: options });
  },

  /**
   * 50.4确认挂号
   */
  ZZJ_Confirm_Regist: function ZZJ_Confirm_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Confirm_Regist', { params: params, options: options });
  },

  /**
   * 50.5取消挂号
   */
  ZZJ_Cancel_Regist: function ZZJ_Cancel_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Cancel_Regist', { params: params, options: options });
  },

  /**
   * 56.2 获取签到列表
   */
  ZZJ_Get_SignIn_List: function ZZJ_Get_SignIn_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_SignIn_List', { params: params, options: options });
  },

  /**
   * 57.1校验是否建档
   */
  ZZJ_Check_IDCard: function ZZJ_Check_IDCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Check_IDCard', { params: params, options: options });
  },

  /**
   * 57.2建档办卡
   */
  ZZJ_CreateMedicalCard: function ZZJ_CreateMedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_CreateMedicalCard', { params: params, options: options });
  },

  /**
   * 57.3获取病人类型
   */
  ZZJ_Get_BRLXDM: function ZZJ_Get_BRLXDM(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_BRLXDM', { params: params, options: options });
  },

  /**
   * 非硬件模式住院充值登录
   */
  ZZJ_GetYhYzLogin: function ZZJ_GetYhYzLogin(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_GetYhYzLogin', { params: params, options: options });
  },

  /**
   * 58.1扫码绑定卡号
   */
  IF_FWC_BindCardNoByQrCode: function IF_FWC_BindCardNoByQrCode(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'IF_FWC_BindCardNoByQrCode', { params: params, options: options });
  },

  /**
   * 获取住院日清单列表
   */
  ZZJ_Get_ZhuYuan_DailyCost_List: function ZZJ_Get_ZhuYuan_DailyCost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_ZhuYuan_DailyCost_List', { params: params, options: options });
  },

  /**
   * 获取住院日清单详情
   */
  ZZJ_Get_ZhuYuan_DailyCost_Detail: function ZZJ_Get_ZhuYuan_DailyCost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_ZhuYuan_DailyCost_Detail', { params: params, options: options });
  },

  /**
   * 获取住院总费用列表
   */
  ZZJ_Get_ZhuYuan_ToTalCost_List: function ZZJ_Get_ZhuYuan_ToTalCost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_ZhuYuan_ToTalCost_List', { params: params, options: options });
  },

  /**
   * 获取住院总费用详情
   */
  ZZJ_Get_ZhuYuan_ToTalCost_Detail: function ZZJ_Get_ZhuYuan_ToTalCost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_ZhuYuan_ToTalCost_Detail', { params: params, options: options });
  },

  /**
   * 获取门诊清单列表
   */
  ZZJ_Get_OutPatient_Charged_Trade_List: function ZZJ_Get_OutPatient_Charged_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_OutPatient_Charged_Trade_List', { params: params, options: options });
  },

  /**
   * 获取门诊清单详情
   */
  ZZJ_Get_OutPatient_Charged_Trade_Detail: function ZZJ_Get_OutPatient_Charged_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_OutPatient_Charged_Trade_Detail', { params: params, options: options });
  },

  /**
   * 获取患者挂号费
   */
  ZZJ_Get_Patient_RegistFee: function ZZJ_Get_Patient_RegistFee(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$n + 'ZZJ_Get_Patient_RegistFee', { params: params, options: options });
  }
};

var baseUrl$o = Constants.unified_payment_url;

var AuthorizeInfoServiceApi = {
  /**
   * 根据open_user_id查询授权表的用户信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo: function PAY_AuthorizeInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$o + 'PAY_AuthorizeInfo', params, { options: options });
  },

  /**
   * 登录授权回调
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_System_Oauth_Userinfo: function LC_System_Oauth_Userinfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$o + 'lc.system.oauth.userinfo', { params: params, options: options });
  },

  /**
   * 根据ftoken获取联空返回的openUserID
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Alipay_Customer_Ftoken_Query: function LC_Alipay_Customer_Ftoken_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$o + 'lc.alipay.customer.ftoken.query', { params: params, options: options });
  },

  /**
   * 统计授权数据
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo_Statistic: function PAY_AuthorizeInfo_Statistic(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$o + 'PAY_AuthorizeInfo_Statistic', { params: params, options: options });
  }
};

var baseUrl$p = Constants.unified_payment_url;

var PayTradeServiceApi = {
  /**
   * 更新订单状态（我方） PAY_Update_Trade_Status
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Update_His_Fail: function PAY_Update_His_Fail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'PAY_Update_His_Fail', params, { options: options });
  },
  PAY_Update_His_Success: function PAY_Update_His_Success(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'PAY_Update_His_Success', params, { options: options });
  },
  PAY_Update_His_Call: function PAY_Update_His_Call(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'PAY_Update_His_Call', params, { options: options });
  },

  /**
   * 创建支付订单
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Create_Trade: function PAY_Create_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'PAY_Create_Trade', params, { options: options });
  },

  /**
   * 订单列表查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_QueryList: function PAY_Trade_QueryList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'PAY_Trade_QueryList', { params: params, options: options });
  },

  /**
   * 订单查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Query: function PAY_Trade_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'PAY_Trade_Query', { params: params, options: options });
  },

  /**
   * 处理HIS支付相关订单 PAY_Hospital_Trade
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Hospital_Trade: function PAY_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'PAY_Hospital_Trade', params, { options: options });
  },

  /**
   * 支付宝刷脸支付 lc.trade.simle.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Simle_Pay: function LC_Trade_Simle_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'lc.trade.simle.pay', params, { options: options });
  },

  /**
   * 条码支付 lc.trade.barcode.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Barcode_Pay: function LC_Trade_Barcode_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'lc.trade.barcode.pay', params, { options: options });
  },

  /**
   * 交易查询 lc.trade.query
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Query: function LC_Trade_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'lc.trade.query', { params: params, options: options });
  },

  /**
   * 交易撤销 lc.trade.cancel
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Cancel: function LC_Trade_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'lc.trade.cancel', params, { options: options });
  },

  /**
   * 聚合扫码支付 lc.trade.polymerization.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Polymerization_Pay: function LC_Trade_Polymerization_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$p + 'lc.trade.polymerization.pay', params, { options: options });
  },

  /**
   * 订单数据统计
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Statistic: function PAY_Trade_Statistic(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$p + 'PAY_Trade_Statistic', { params: params, options: options });
  }
};

var defaultOptions = { log: false, loading: false, alert: false, hardware: true };

var DevBaseApi = {
  /* 打开打印设备串口 */
  OpenDevice: function OpenDevice(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'OpenDevice', data: data, options: _extends$1({}, defaultOptions, options) });
  },

  /* 关闭打印设备串口 */
  CloseDevice: function CloseDevice(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CloseDevice', params: params, options: _extends$1({}, defaultOptions, options) });
  },

  /* 初始化打印机 */
  Init: function Init(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'Init', data: data, options: _extends$1({}, defaultOptions, options) });
  }
};

var defaultOptions$1 = { log: false, loading: false, alert: false, hardware: true };

var DevPrintApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'print/',
  /* 打印字符串 */
  PrintString: function PrintString(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PrintString', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 切纸 */
  CutPaper: function CutPaper(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CutPaper', params: params, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 设置行间距 */
  SetLineSpace: function SetLineSpace(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetLineSpace', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 获取设备状态 */
  GetDeviceStatus: function GetDeviceStatus(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'GetDeviceStatus', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 设置左边距 */
  SetLeftSpace: function SetLeftSpace(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetLeftSpace', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 设置对齐方式 */
  SetAlign: function SetAlign(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetAlign', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 设置英文字体 */
  SetPrintFontE: function SetPrintFontE(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetPrintFontE', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 设置中文字体 */
  SetPrintFontC: function SetPrintFontC(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetPrintFontC', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 微距进纸 */
  Feed: function Feed(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'Feed', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 进纸iLines行 */
  FeedLines: function FeedLines(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'FeedLines', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 打印指定内容条码 */
  PrintBarCode: function PrintBarCode(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PrintBarCode', data: data, options: _extends$1({}, defaultOptions$1, options) });
  },

  /* 打印指定内容二维码 */
  PrintQRCode: function PrintQRCode(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PrintQRCode', data: data, options: _extends$1({}, defaultOptions$1, options) });
  }
});

var defaultOptions$2 = { log: false, loading: false, alert: false, hardware: true };

var DevReadCardApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'readcard/',
  /* 设置设备类型 */
  SetDeviceType: function SetDeviceType(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDeviceType', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 设置设备参数 */
  SetDeviceParam: function SetDeviceParam(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDeviceParam', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 获取磁卡机卡状态 */
  GetStatus: function GetStatus(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetStatus', params: params, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 允许插卡 */
  EnableInsert: function EnableInsert(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'EnableInsert', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 禁止插卡 */
  DisableInsert: function DisableInsert(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'DisableInsert', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 退卡 */
  EjectCard: function EjectCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'EjectCard', params: params, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 吞卡 */
  RetainCard: function RetainCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'RetainCard', params: params, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 读磁卡信息，就诊卡、社保卡 */
  ReadCardInfo: function ReadCardInfo(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'ReadCardInfo', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 社保卡和PSAM卡上电 */
  PowerOn: function PowerOn(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PowerOn', data: data, options: _extends$1({}, defaultOptions$2, options) });
  },

  /* 社保卡和PSAM卡下电 */
  PowerOff: function PowerOff(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'PowerOff', data: data, options: _extends$1({}, defaultOptions$2, options) });
  }
});

var defaultOptions$3 = { log: false, loading: false, alert: false, hardware: true };

var DevIssueCardApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'issuecard/',
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

  /* 获取卡箱状态 */
  GetCardBoxStatus: function GetCardBoxStatus(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetCardBoxStatus', params: params, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 回收卡 */
  CollectCard: function CollectCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CollectCard', params: params, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 发卡到指定读卡位置 */
  DispenseCard: function DispenseCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'DispenseCard', params: params, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 读磁卡信息，就诊卡、社保卡 */
  ReadCardInfo: function ReadCardInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadCardInfo', params: params, options: _extends$1({}, defaultOptions$3, options) });
  },

  /* 发卡到门口 */
  IssueCard: function IssueCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'IssueCard', params: params, options: _extends$1({}, defaultOptions$3, options) });
  }
});

var defaultOptions$4 = { log: false, loading: false, alert: false, hardware: true };

var DevIDCardApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'idcard/',
  /* 读取身份证信息 */
  ReadIdCardInfo: function ReadIdCardInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadIdCardInfo', params: params, options: _extends$1({}, defaultOptions$4, options) });
  }
});

var defaultOptions$5 = { log: false, loading: false, alert: false, hardware: true };

var DevYibaoApi = {
  baseUrl: Constants.yibao_url + 'yibao/',
  /* 保障卡基本信息读取 */
  ReadBaseInfo: function ReadBaseInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadBaseInfo', params: params, options: _extends$1({}, defaultOptions$5, options) });
  },

  /* 保障卡卡号读取 */
  ReadCardNo: function ReadCardNo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadCardNo', params: params, options: _extends$1({}, defaultOptions$5, options) });
  }
};

var defaultOptions$6 = { log: false, loading: false, alert: false, hardware: true };

var DevUMSApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'ums/',
  /* 设置入参 */
  SetReq: function SetReq(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetReq', data: data, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 进卡 */
  EnterCard: function EnterCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'EnterCard', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 检测卡 */
  CheckCard: function CheckCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CheckCard', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 读卡 */
  ReadCard: function ReadCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'ReadCard', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 弹卡 */
  EjectCard: function EjectCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'EjectCard', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 关闭读卡器 */
  CardClose: function CardClose(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CardClose', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 吞卡 */
  CardSwallow: function CardSwallow(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'CardSwallow', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 开启密码键盘 */
  StartPin: function StartPin(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'StartPin', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 获得键值 */
  GetOnePass: function GetOnePass(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetOnePass', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 获取Pin密文 */
  GetPin: function GetPin(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetPin', params: params, options: _extends$1({}, defaultOptions$6, options) });
  },

  /* 自助终端交易 */
  TransCard: function TransCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'TransCard', params: params, options: _extends$1({}, defaultOptions$6, options) });
  }
});

var defaultOptions$7 = { log: false, loading: false, alert: false, hardware: true };

var DevCashApi = _Object$assign({}, DevBaseApi, {
  baseUrl: Constants.ext_device_url + 'cash/',
  /* 获取现金设备状态 */
  GetStatus: function GetStatus(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetStatus', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 设置可以接受纸币面值 */
  SetDenomination: function SetDenomination(data) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'post', url: this.baseUrl + 'SetDenomination', data: data, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 取识币金额 */
  GetMoney: function GetMoney(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'GetMoney', params: params, options: _extends$1({}, defaultOptions$7, options) });
  },

  /* 读币口停止接收纸币 */
  StopIdentify: function StopIdentify(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance({ method: 'get', url: this.baseUrl + 'StopIdentify', params: params, options: _extends$1({}, defaultOptions$7, options) });
  }
});



var api = /*#__PURE__*/Object.freeze({
	__proto__: null,
	OrgConfigApi: OrgConfigApi,
	ZWLApi: ZWLApi,
	WHTApi: WHTApi,
	AccountApi: AccountApi,
	UserApi: UserApi,
	OauthApi: OauthApi,
	PrintHistoryApi: PrintHistoryApi,
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
	AuthorizeInfoServiceApi: AuthorizeInfoServiceApi,
	PayTradeServiceApi: PayTradeServiceApi,
	DevPrintApi: DevPrintApi,
	DevReadCardApi: DevReadCardApi,
	DevIssueCardApi: DevIssueCardApi,
	DevIDCardApi: DevIDCardApi,
	DevYibaoApi: DevYibaoApi,
	DevUMSApi: DevUMSApi,
	DevCashApi: DevCashApi
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

var autoLeaveQueue = [];

var storeCommon = {
  state: {
    // 硬件信息
    hardware: store.hardware || null,
    // 是否自动退出
    isAutoLeave: true,
    // 是否全屏
    isFullscreen: false,
    // 当前倒计时时间
    nowTimeout: 0,
    // 当前医院
    hospital: store.hospital || null,
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
    }
  },
  getters: {
    getHeartbeatPacket: function getHeartbeatPacket(state) {
      return state.heartbeatPacket;
    },
    getOrgId: function getOrgId(state) {
      if (state.hospital) {
        return state.hospital.id;
      }
    },
    getWinConfigId: function getWinConfigId(state) {
      if (state.hospital) {
        return state.hospital.winConfig.winConfigInfo.win_config_id;
      }
    },
    getWinCode: function getWinCode(state) {
      if (state.hospital) {
        return state.hospital.winConfig.win_code;
      }
    },
    getDeptId: function getDeptId(state) {
      if (state.hospital) {
        return state.hospital.winConfig.dept_id;
      }
    },
    getExtInfo: function getExtInfo(state) {
      if (state.hospital && state.hospital.ext_info) {
        return JSON.parse(state.hospital.ext_info);
      } else {
        return {};
      }
    },
    getWinExtInfo: function getWinExtInfo(state) {
      if (state.hospital && state.hospital.winConfig.win_ext_info) {
        return JSON.parse(state.hospital.winConfig.win_ext_info);
      } else {
        return {};
      }
    }
  }
};

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

var defineProperty$2 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol =  {} );
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
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
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && _Object$keys(value).length == 0) return true;
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

var defineProperty$3 = createCommonjsModule(function (module, exports) {

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

var _defineProperty = unwrapExports(defineProperty$3);

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
            getAll$1(function (res) {
              if (res.length > 0) {
                _this2.uploadLogs(res);
              } else {
                _this2.$bem.showalert("日志为空");
              }
            });
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

var __$_require_assets_imgs_logcat_clear_png__ = "data:image/png;base64,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";

var __$_require_assets_imgs_logcat_close_circle_png__ = "data:image/png;base64,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";

var __$_require_assets_imgs_logcat_right_png__ = "data:image/png;base64,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";

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

var Logcat = normalizeComponent_1({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

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
      if (this.gateway.endsWith("/")) {
        this.gateway = this.gateway.slice(0, -1);
      }
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

var ApiUrl = normalizeComponent_1({ render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

var script$5 = {
  name: "BemSetup",
  mounted: function mounted() {
    if (!this.storeHospital || !store.authorization) {
      this.visible = true;
    }
  },

  components: {
    logcat: Logcat,
    ApiUrl: ApiUrl
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
                hardwareInfo = _this6.hospInfo.winHardwareType;

                hardwareInfo && _this6.$store.commit("setHardWare", hardwareInfo);
                _this6.refresh();
                // this.$emit("initSuccess", this.hospInfo);
                // this.close();

              case 6:
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

var Setup = normalizeComponent_1({ render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

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

var CheckVersion = normalizeComponent_1({ render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

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

var UploadLogs = normalizeComponent_1({ render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

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

var KeypadNumber = normalizeComponent_1({ render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

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

var KeypadLetter = normalizeComponent_1({ render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

//

var script$a = {
  name: "BemKeypad",
  components: {
    number: KeypadNumber,
    letter: KeypadLetter
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

var Keypad = normalizeComponent_1({ render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

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

var Keypad$1 = normalizeComponent_1({ render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b }, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);

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

var Popup = normalizeComponent_1({ render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c }, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);

var components = [Setup, Logcat, CheckVersion, UploadLogs, button, Keypad, Keypad$1, Popup];

var store$1, timeoutId;
var _endCallback, beforeCountDown;
var setNowTimeout = null;

function autoleave() {
  var exit_timeout = store.hospital.exit_timeout || 180;
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
      el.addEventListener('touchstart', handleClick);
      el.addEventListener('click', handleClick);
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
    utils: utils
  };
};

export { api, audio$1 as audio, instance as axios, install, service as loading, store as localStore, logs as logger, Alert as showalert, utils };
