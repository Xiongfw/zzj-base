import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import crypto from 'crypto';
import dayjs from 'dayjs';

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
var core = module.exports = { version: '2.6.9' };
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
  // el元素
  el: null,
  // 必传，vuex实例
  store: null,
  // 非必填，默认自适应
  fontSize: null,
  // 日志选项，操作人ID和姓名
  logger: {
    oper_id: null,
    oper_name: null
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
      this.visible ? globalConfig.store.dispatch("isAutoLeave", false) : globalConfig.store.dispatch("isAutoLeave", true);
    }
  }
};

var __$_require_assets_imgs_loading_gif__ = "data:image/gif;base64,R0lGODlhgACAAKIAAP///93d3bu7u5mZmQAA/wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAEACwCAAIAfAB8AAAD/0i63P4wygYqmDjrzbtflvWNZGliYXiubKuloivPLlzReD7al+7/Eh5wSFQIi8hHYBkwHUmD6CD5YTJLz49USuVYraRsZ7vtar7XnQ1Kjpoz6LRHvGlz35O4nEPP2O94EnpNc2sef1OBGIOFMId/inB6jSmPdpGScR19EoiYmZobnBCIiZ95k6KGGp6ni4wvqxilrqBfqo6skLW2YBmjDa28r6Eosp27w8Rov8ekycqoqUHODrTRvXsQwArC2NLF29UM19/LtxO5yJd4Au4CK7DUNxPebG4e7+8n8iv2WmQ66BtoYpo/dvfacBjIkITBE9DGlMvAsOIIZjIUAixliv9ixYZVtLUos5GjwI8gzc3iCGghypQqrbFsme8lwZgLZtIcYfNmTJ34WPTUZw5oRxdD9w0z6iOpO15MgTh1BTTJUKos39jE+o/KS64IFVmsFfYT0aU7capdy7at27dw48qdS7eu3bt480I02vUbX2F/JxYNDImw4GiGE/P9qbhxVpWOI/eFKtlNZbWXuzlmG1mv58+gQ4seTbq06dOoU6vGQZJy0FNlMcV+czhQ7SQmYd8eMhPs5BxVdfcGEtV3buDBXQ+fURxx8oM6MT9P+Fh6dOrH2zavc13u9JXVJb520Vp8dvC76wXMuN5Sepm/1WtkEZHDefnzR9Qvsd9+/wi8+en3X0ntYVcSdAE+UN4zs7ln24CaLagghIxBaGF8kFGoIYV+Ybghh841GIyI5ICIFoklJsigihmimJOLEbLYIYwxSgigiZ+8l2KB+Ml4oo/w8dijjcrouCORKwIpnJIjMnkkksalNeR4fuBIm5UEYImhIlsGCeWNNJphpJdSTlkml1jWeOY6TnaRpppUctcmFW9mGSaZceYopH9zkjnjUe59iR5pdapWaGqHopboaYua1qije67GJ6CuJAAAIfkEBQUABAAsCgACAFcAMAAAA/9Iutz+ML5Ag7w46z0r5WAoSp43nihXVmnrdusrv+s332dt4Tyo9yOBUJD6oQBIQGs4RBlHySSKyczVTtHoidocPUNZaZAr9F5FYbGI3PWdQWn1mi36buLKFJvojsHjLnshdhl4L4IqbxqGh4gahBJ4eY1kiX6LgDN7fBmQEJI4jhieD4yhdJ2KkZk8oiSqEaatqBekDLKztBG2CqBACq4wJRi4PZu1sA2+v8C6EJexrBAD1AOBzsLE0g/V1UvYR9sN3eR6lTLi4+TlY1wz6Qzr8u1t6FkY8vNzZTxaGfn6mAkEGFDgL4LrDDJDyE4hEIbdHB6ESE1iD4oVLfLAqPETIsOODwmCDJlv5MSGJklaS6khAQAh+QQFBQAEACwfAAIAVwAwAAAD/0i63P5LSAGrvTjrNuf+YKh1nWieIumhbFupkivPBEzR+GnnfLj3ooFwwPqdAshAazhEGUXJJIrJ1MGOUamJ2jQ9QVltkCv0XqFh5IncBX01afGYnDqD40u2z76JK/N0bnxweC5sRB9vF34zh4gjg4uMjXobihWTlJUZlw9+fzSHlpGYhTminKSepqebF50NmTyor6qxrLO0L7YLn0ALuhCwCrJAjrUqkrjGrsIkGMW/BMEPJcphLgDaABjUKNEh29vdgTLLIOLpF80s5xrp8ORVONgi8PcZ8zlRJvf40tL8/QPYQ+BAgjgMxkPIQ6E6hgkdjoNIQ+JEijMsasNY0RQix4gKP+YIKXKkwJIFF6JMudFEAgAh+QQFBQAEACw8AAIAQgBCAAAD/kg0PPowykmrna3dzXvNmSeOFqiRaGoyaTuujitv8Gx/661HtSv8gt2jlwIChYtc0XjcEUnMpu4pikpv1I71astytkGh9wJGJk3QrXlcKa+VWjeSPZHP4Rtw+I2OW81DeBZ2fCB+UYCBfWRqiQp0CnqOj4J1jZOQkpOUIYx/m4oxg5cuAaYBO4Qop6c6pKusrDevIrG2rkwptrupXB67vKAbwMHCFcTFxhLIt8oUzLHOE9Cy0hHUrdbX2KjaENzey9Dh08jkz8Tnx83q66bt8PHy8/T19vf4+fr6AP3+/wADAjQmsKDBf6AOKjS4aaHDgZMeSgTQcKLDhBYPEswoA1BBAgAh+QQFBQAEACxOAAoAMABXAAAD7Ei6vPOjyUkrhdDqfXHm4OZ9YSmNpKmiqVqykbuysgvX5o2HcLxzup8oKLQQix0UcqhcVo5ORi+aHFEn02sDeuWqBGCBkbYLh5/NmnldxajX7LbPBK+PH7K6narfO/t+SIBwfINmUYaHf4lghYyOhlqJWgqDlAuAlwyBmpVnnaChoqOkpaanqKmqKgGtrq+wsbA1srW2ry63urasu764Jr/CAb3Du7nGt7TJsqvOz9DR0tPU1TIA2ACl2dyi3N/aneDf4uPklObj6OngWuzt7u/d8fLY9PXr9eFX+vv8+PnYlUsXiqC3c6PmUUgAACH5BAUFAAQALE4AHwAwAFcAAAPpSLrc/m7IAau9bU7MO9GgJ0ZgOI5leoqpumKt+1axPJO1dtO5vuM9yi8TlAyBvSMxqES2mo8cFFKb8kzWqzDL7Xq/4LB4TC6bz1yBes1uu9uzt3zOXtHv8xN+Dx/x/wJ6gHt2g3Rxhm9oi4yNjo+QkZKTCgGWAWaXmmOanZhgnp2goaJdpKGmp55cqqusrZuvsJays6mzn1m4uRAAvgAvuBW/v8GwvcTFxqfIycA3zA/OytCl0tPPO7HD2GLYvt7dYd/ZX99j5+Pi6tPh6+bvXuTuzujxXens9fr7YPn+7egRI9PPHrgpCQAAIfkEBQUABAAsPAA8AEIAQgAAA/lIutz+UI1Jq7026h2x/xUncmD5jehjrlnqSmz8vrE8u7V5z/m5/8CgcEgsGo/IpHLJbDqf0Kh0ShBYBdTXdZsdbb/Yrgb8FUfIYLMDTVYz2G13FV6Wz+lX+x0fdvPzdn9WeoJGAYcBN39EiIiKeEONjTt0kZKHQGyWl4mZdREAoQAcnJhBXBqioqSlT6qqG6WmTK+rsa1NtaGsuEu6o7yXubojsrTEIsa+yMm9SL8osp3PzM2cStDRykfZ2tfUtS/bRd3ewtzV5pLo4eLjQuUp70Hx8t9E9eqO5Oku5/ztdkxi90qPg3x2EMpR6IahGocPCxp8AGtigwQAIfkEBQUABAAsHwBOAFcAMAAAA/9Iutz+MMo36pg4682J/V0ojs1nXmSqSqe5vrDXunEdzq2ta3i+/5DeCUh0CGnF5BGULC4tTeUTFQVONYAs4CfoCkZPjFar83rBx8l4XDObSUL1Ott2d1U4yZwcs5/xSBB7dBMBhgEYfncrTBGDW4WHhomKUY+QEZKSE4qLRY8YmoeUfkmXoaKInJ2fgxmpqqulQKCvqRqsP7WooriVO7u8mhu5NacasMTFMMHCm8qzzM2RvdDRK9PUwxzLKdnaz9y/Kt8SyR3dIuXmtyHpHMcd5+jvWK4i8/TXHff47SLjQvQLkU+fG29rUhQ06IkEG4X/Rryp4mwUxSgLL/7IqFETB8eONT6ChCFy5ItqJomES6kgAQAh+QQFBQAEACwKAE4AVwAwAAAD/0i63A4QuEmrvTi3yLX/4MeNUmieITmibEuppCu3sDrfYG3jPKbHveDktxIaF8TOcZmMLI9NyBPanFKJp4A2IBx4B5lkdqvtfb8+HYpMxp3Pl1qLvXW/vWkli16/3dFxTi58ZRcChwIYf3hWBIRchoiHiotWj5AVkpIXi4xLjxiaiJR/T5ehoomcnZ+EGamqq6VGoK+pGqxCtaiiuJVBu7yaHrk4pxqwxMUzwcKbyrPMzZG90NGDrh/JH8t72dq3IN1jfCHb3L/e5ebh4ukmxyDn6O8g08jt7tf26ybz+m/W9GNXzUQ9fm1Q/APoSWAhhfkMAmpEbRhFKwsvCsmosRIHx444PoKcIXKkjIImjTzjkQAAIfkEBQUABAAsAgA8AEIAQgAAA/VIBNz+8KlJq72Yxs1d/uDVjVxogmQqnaylvkArT7A63/V47/m2/8CgcEgsGo/IpHLJbDqf0Kh0Sj0FroGqDMvVmrjgrDcTBo8v5fCZki6vCW33Oq4+0832O/at3+f7fICBdzsChgJGeoWHhkV0P4yMRG1BkYeOeECWl5hXQ5uNIAOjA1KgiKKko1CnqBmqqk+nIbCkTq20taVNs7m1vKAnurtLvb6wTMbHsUq4wrrFwSzDzcrLtknW16tI2tvERt6pv0fi48jh5h/U6Zs77EXSN/BE8jP09ZFA+PmhP/xvJgAMSGBgQINvEK5ReIZhQ3QEMTBLAAAh+QQFBQAEACwCAB8AMABXAAAD50i6DA4syklre87qTbHn4OaNYSmNqKmiqVqyrcvBsazRpH3jmC7yD98OCBF2iEXjBKmsAJsWHDQKmw571l8my+16v+CweEwum8+hgHrNbrvbtrd8znbR73MVfg838f8BeoB7doN0cYZvaIuMjY6PkJGSk2gClgJml5pjmp2YYJ6dX6GeXaShWaeoVqqlU62ir7CXqbOWrLafsrNctjIDwAMWvC7BwRWtNsbGFKc+y8fNsTrQ0dK3QtXAYtrCYd3eYN3c49/a5NVj5eLn5u3s6e7x8NDo9fbL+Mzy9/T5+tvUzdN3Zp+GBAAh+QQJBQAEACwCAAIAfAB8AAAD/0i63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdArcQK2TOL7/nl4PSMwIfcUk5YhUOh3M5nNKiOaoWCuWqt1Ou16l9RpOgsvEMdocXbOZ7nQ7DjzTaeq7zq6P5fszfIASAYUBIYKDDoaGIImKC4ySH3OQEJKYHZWWi5iZG0ecEZ6eHEOio6SfqCaqpaytrpOwJLKztCO2jLi1uoW8Ir6/wCHCxMG2x7muysukzb230M6H09bX2Nna29zd3t/g4cAC5OXm5+jn3Ons7eba7vHt2fL16tj2+QL0+vXw/e7WAUwnrqDBgwgTKlzIsKHDh2gGSBwAccHEixAvaqTYcFCjRoYeNyoM6REhyZIHT4o0qPIjy5YTTcKUmHImx5cwE85cmJPnSYckK66sSAAj0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gwxZJAAA7";

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
  return _vm.visible ? _c("div", { staticClass: "bem--fullscreen bem-loading-mask" }, [_c("img", {
    attrs: { src: __$_require_assets_imgs_loading_gif__ }
  })]) : _vm._e();
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

var loadingVue = normalizeComponent_1({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

var LoadingConstructor = Vue.extend(loadingVue);

LoadingConstructor.prototype.close = function () {
  this.visible = false;
};

LoadingConstructor.prototype.show = function () {
  this.visible = true;
};

var Loading = function Loading() {

  var vm = new LoadingConstructor({
    el: document.createElement('div')
  });
  document.body.appendChild(vm.$el);
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

var script$1 = {
  name: "BemButton",
  props: {
    // 按钮大小 large / small
    size: String,
    // 按钮类型  success / warning / danger / info / transparent
    type: String,
    nativeType: {
      type: String,
      default: "button"
    },
    plain: Boolean,
    // 圆角按钮
    round: Boolean,
    // 背景透明
    transparent: Boolean
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
      "is-round": _vm.round,
      "is-plain": _vm.plain,
      "is-transparent": _vm.plain && !_vm.transparent
    }],
    attrs: { type: _vm.nativeType },
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

var button = normalizeComponent_1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

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
      time: 10,
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

var alertVue = normalizeComponent_1({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

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
  document.body.appendChild(vm.$el);
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
  // 医院信息
  hospital: null,
  // 版本
  version: null,
  // 机构ID
  orgId: null,
  // 机器ID
  winConfigId: null,
  winCode: null,
  // 统一支付平台地址
  payUrl: null,
  // 服务窗地址
  fwcUrl: null,
  // 管理后台地址
  adminUrl: null
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
      if (_.isObject(value)) {
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
var database_version = 1;
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
      var objectStore = db.createObjectStore(object_store_name, { autoIncrement: true });
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
      _.isFunction(callback) && callback(event.target.result, null);
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('delete failed');
    };
  });
}

/** 改 */
function update(data, callback) {
  getObjectStore(function (store) {
    var request = store.put(data);
    request.onsuccess = function (event) {
      _.isFunction(callback) && callback(event.target.result, null);
    };
    request.onerror = function (event) {
      _.isFunction(callback) && callback(null, event);
      error('update failed');
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

var db$1 = /*#__PURE__*/Object.freeze({
	add: add,
	remove: remove,
	update: update,
	clear: clear,
	getAll: getAll,
	getAllByIndex: getAllByIndex,
	deleteAllByIndex: deleteAllByIndex
});

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
  getAll.apply(db$1, arguments);
}

/**
 * 根据索引查询
 * @param {function} callback 回调函数
 * @param {string} indexName 索引名
 * @param {IDBKeyRange|string|number} query 查询条件
 * @param {number} count 查询条数
 */
function getAllByIndex$1(callback, indexName, query, count) {
  getAllByIndex.apply(db$1, arguments);
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
  deleteAllByIndex.apply(db$1, arguments);
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
	info: info,
	warn: warn,
	error: error$1,
	clear: clear$1,
	pop: pop,
	getAll: getAll$1,
	getAllByIndex: getAllByIndex$1,
	getAllByTime: getAllByTime,
	deleteAllByIndex: deleteAllByIndex$1,
	deleteAllByTime: deleteAllByTime
});

var instance = axios.create({
  // 请求超时时间（60s）
  timeout: 1000 * 60
});

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
    desc: isError() ? res.message : url.substring(url.lastIndexOf('/') + 1),
    url: url,
    in_param: _Object$assign({}, config.params, JSON.parse(config.data || '{}')),
    out_param: res.data
  });
}

/* 请求拦截 */
instance.interceptors.request.use(function (config) {
  var options = config.options;

  options.loading !== false && isLoading(true);
  if (store.hospital) {
    var theData = store.orgId + store.hospital.hosp_code + store.hospital.oper_pwd;
    if (theData) {
      var md5 = crypto.createHash("md5");
      md5.update(theData);
      var BermToken = md5.digest("hex");
      config.headers['BermToken'] = BermToken;
    }
    config.headers['orgId'] = store.orgId;
    config.headers['winConfigId'] = store.winConfigId;
  }
  return config;
}, function (error) {
  return _Promise.reject(error);
});

/* 响应拦截 */
instance.interceptors.response.use(function (res) {
  isLoading(false);
  var options = res.config.options;

  if (res.data.code === 0) {
    record('info', res);
    return _Promise.resolve(res.data.data);
  } else {
    options.alert !== false && Alert(res.data.msg);
    record('warn', res);
    return _Promise.reject(new Error(res.data.msg));
  }
}, function (error) {
  isLoading(false);
  Alert(error.config ? '网络异常，请稍后再试' : error.message);
  error.config && record('error', error);
  return _Promise.reject(error);
});

//统一支付接口地址
var Unified_Payment_URL = store.payUrl || "https://zzjpayapi.linkingcloud.cn/api/";
//服务窗接口地址
var Service_Window_URL = store.fwcUrl || "https://zzjfwcapi.linkingcloud.cn/api/";
//后台管理地址
var ORG_CONFIG_URL = store.adminUrl || "https://zzjadminapi.linkingcloud.cn/api/";

var isExistApiUrl = function isExistApiUrl() {
  return store.payUrl && store.fwcUrl && store.adminUrl;
};

// 当接口地址本地没有
if (!isExistApiUrl()) {
  var _location = location,
      hostname = _location.hostname;
  //如果地址为内网地址

  if (/(\d{1,3}\.){3}\d{1,3}/.test(location.hostname)) {
    Unified_Payment_URL = "http://" + hostname + ":8012/api/";
    Service_Window_URL = "http://" + hostname + ":8013/api/";
    ORG_CONFIG_URL = "http://" + hostname + ":8014/api/";
  }
  store.payUrl = Unified_Payment_URL;
  store.fwcUrl = Service_Window_URL;
  store.adminUrl = ORG_CONFIG_URL;
}

/* 开发环境的常量地址 */
if (process.env.NODE_ENV == "development") ;

var Constants = {
  Unified_Payment_URL: Unified_Payment_URL,
  Service_Window_URL: Service_Window_URL,
  ORG_CONFIG_URL: ORG_CONFIG_URL
};

var baseUrl = Constants.ORG_CONFIG_URL + 'org/';

var OrgConfigApi = {
  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getVersionById: function getVersionById(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl + 'getVersionById', { params: params, options: _extends$1({}, options, { loading: false, log: false }) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getVersion: function getVersion(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl + 'getVersion', { params: params, options: _extends$1({}, options, { loading: false, log: false }) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgList: function getOrgList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl + 'getOrgList', { params: params, options: _extends$1({}, options, { log: false }) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getWinCodeList: function getWinCodeList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl + 'getWinCodeList', { params: params, options: _extends$1({}, options, { log: false }) });
  },

  /**
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  getOrgWinconfigDetail: function getOrgWinconfigDetail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl + 'getOrgWinconfigDetail', { params: params, options: _extends$1({}, options, { log: false }) });
  }
};

var baseUrl$1 = Constants.ORG_CONFIG_URL + 'zwl/';

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

var baseUrl$2 = Constants.Service_Window_URL;

var BillServiceApi = {
  /**
   * 4.2 更新订单状态（院方） IF_Update_Trade_Status
   * 接口说明：
   * 先调服务窗4.2更新订单状态（院方） IF_Update_Trade_Status 再调贝尔曼统一支付平台更新订单状态（我方） PAY_Update_Trade_Status更新我方订单状态接口
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Update_Trade_Status: function IF_Update_Trade_Status(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$2 + 'IF_Update_Trade_Status', params, { options: options });
  }
};

var baseUrl$3 = Constants.Service_Window_URL;

var BookingServiceApi = {
  /**
   * 22.1、获取预约资源 IF_Get_Booking_Resource
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Resource: function IF_Get_Booking_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$3 + 'IF_Get_Booking_Resource', { params: params, options: options });
  },

  /**
   * 22.2、获取科室预约号源 IF_Get_Booking_Dept_NoSource
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Dept_NoSource: function IF_Get_Booking_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$3 + 'IF_Get_Booking_Dept_NoSource', { params: params, options: options });
  },

  /**
   * 22.3、获取医生预约号源 IF_Get_Booking_Doc_Resource
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Doc_Resource: function IF_Get_Booking_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$3 + 'IF_Get_Booking_Doc_Resource', { params: params, options: options });
  },

  /**
   * 22.6、确认预约 IF_Confirm_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Confirm_Booking: function IF_Confirm_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$3 + 'IF_Confirm_Booking', params, { options: options });
  },

  /**
   * 22.7、取消预约 IF_Cancel_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Cancel_Booking: function IF_Cancel_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$3 + 'IF_Cancel_Booking', { params: params, options: options });
  },

  /**
   * 22.8、预约转挂号 IF_Booking_To_Regist
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Booking_To_Regist: function IF_Booking_To_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$3 + 'IF_Booking_To_Regist', params, { options: options });
  },

  /**
   * 22.9、获取患者预约列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Patient_Booking_List: function IF_Get_Patient_Booking_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$3 + 'IF_Get_Patient_Booking_List', { params: params, options: options });
  },

  /**
   * 22.10、获取患者预约详细
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Patient_Booking_Detail: function IF_Get_Patient_Booking_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$3 + 'IF_Get_Patient_Booking_Detail', { params: params, options: options });
  },

  /**
   * 22.12、确认签到 IF_Confirm_Check
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Confirm_Check: function IF_Confirm_Check(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$3 + 'IF_Confirm_Check', params, { options: options });
  }
};

var baseUrl$4 = Constants.Service_Window_URL;

var ClinicChargeServiceApi = {
  /**
   * 5.1、获取诊间未缴费账单列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_OutPatient_Uncharge_Trade_List: function IF_Get_OutPatient_Uncharge_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$4 + 'IF_Get_OutPatient_Uncharge_Trade_List', { params: params, options: options });
  },

  /**
   * 5.2、获取未付诊间缴费明细
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_OutPatient_UnCharge_Trade_Detail: function IF_Get_OutPatient_UnCharge_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$4 + 'IF_Get_OutPatient_UnCharge_Trade_Detail', { params: params, options: options });
  },

  /**
   * 5.4、获取诊间费用详细
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_OutPatient_Charged_Trade_Detail: function IF_Get_OutPatient_Charged_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$4 + 'IF_Get_OutPatient_Charged_Trade_Detail', params, { options: options });
  },

  /**
   * 5.5、诊间未缴费订单验证接口（院方）--
   * 接口说明：
   * 先调服务窗 5.5、诊间未缴费订单验证接口（院方） IF_Check_Hospital_Trade
   * 根据 CheckUnchargedTrade 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Check_Hospital_Trade: function IF_Check_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$4 + 'IF_Check_Hospital_Trade', params, { options: options });
  }
};

var baseUrl$5 = Constants.Service_Window_URL;

var EvaluateServiceApi = {
  /**
   * 26.5、获取评价选项 IF_Get_EvaluateOption_Info
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_EvaluateOption_Info: function IF_Get_EvaluateOption_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$5 + 'IF_Get_EvaluateOption_Info', params, { options: options });
  },

  /**
   * 26.6、保存评价 IF_Evaluate_Save
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Evaluate_Save: function IF_Evaluate_Save(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$5 + 'IF_Evaluate_Save', params, { options: options });
  }
};

var baseUrl$6 = Constants.Service_Window_URL;

var FwcServiceApi = {
  /**
   * 99.20、代扣协议查询 FWC_IF_Withholding_Query
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  FWC_IF_Withholding_Query: function FWC_IF_Withholding_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$6 + 'FWC_IF_Withholding_Query', params, { options: options });
  },

  /**
   * 99.27、自助绑卡 FWC_IF_BindCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  FWC_IF_BindCard: function FWC_IF_BindCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$6 + 'FWC_IF_BindCard', params, { options: options });
  },

  /**
   * 99.33、刷脸支付芝麻授权初始化 IF_FacePay_ZhiMaInit
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_FacePay_ZhiMaInit: function IF_FacePay_ZhiMaInit(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$6 + 'IF_FacePay_ZhiMaInit', { params: params, options: options });
  },

  /**
   * 99.34、刷脸支付 FWC_IF_Face_Pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  FWC_IF_Face_Pay: function FWC_IF_Face_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$6 + 'FWC_IF_Face_Pay', params, { options: options });
  },

  /**
   * 99.35、刷脸生活芝麻授权初始化 IF_FaceLive_ZhiMaInit
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_FaceLive_ZhiMaInit: function IF_FaceLive_ZhiMaInit(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$6 + 'IF_FaceLive_ZhiMaInit', { params: params, options: options });
  }
};

var baseUrl$7 = Constants.Service_Window_URL;

var HospitalizationAppointment = {
  /**
   * 14.1、获取住院列表 IF_Hospitalization_Get_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Get_List: function IF_Hospitalization_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$7 + 'IF_Hospitalization_Get_List', { params: params, options: options });
  },

  /**
   * 14.2、获取已登记住院信息 IF_Hospitalization_Get_Registration_Info
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Get_Registration_Info: function IF_Hospitalization_Get_Registration_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$7 + 'IF_Hospitalization_Get_Registration_Info', params, { options: options });
  },

  /**
   * 14.3、住院信息登记 IF_Hospitalization_Registration_Info
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Registration_Info: function IF_Hospitalization_Registration_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$7 + 'IF_Hospitalization_Registration_Info', params, { options: options });
  },

  /**
   * 14.4、获取住院详情 IF_Hospitalization_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Detail: function IF_Hospitalization_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$7 + 'IF_Hospitalization_Detail', params, { options: options });
  },

  /**
   * 14.5、确认预约 IF_Hospitalization_Confirm_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Confirm_Booking: function IF_Hospitalization_Confirm_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$7 + 'IF_Hospitalization_Confirm_Booking', params, { options: options });
  },

  /**
   * 14.6、取消住院 IF_Hospitalization_Cancel_Booking
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Hospitalization_Cancel_Booking: function IF_Hospitalization_Cancel_Booking(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$7 + 'IF_Hospitalization_Cancel_Booking', params, { options: options });
  }
};

var baseUrl$8 = Constants.Service_Window_URL;

var HospitalLeaveServiceApi = {
  /**
   * 16.1、获取出院列表 IF_LeaveHospital_Get_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Get_List: function IF_LeaveHospital_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_LeaveHospital_Get_List', { params: params, options: options });
  },

  /**
   * 16.2、获取待办理出院详情 IF_LeaveHospital_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Detail: function IF_LeaveHospital_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_LeaveHospital_Detail', params, { options: options });
  },

  /**
   * 16.3、确认出院办理 IF_LeaveHospital_Confirm
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Confirm: function IF_LeaveHospital_Confirm(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_LeaveHospital_Confirm', params, { options: options });
  },

  /**
   * 16.4、出院小结列表 IF_LeaveHospitalSummary_Get_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospitalSummary_Get_List: function IF_LeaveHospitalSummary_Get_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$8 + 'IF_LeaveHospitalSummary_Get_List', { params: params, options: options });
  },

  /**
   * 16.5、出院小结详情 IF_LeaveHospitalSummary_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospitalSummary_Detail: function IF_LeaveHospitalSummary_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_LeaveHospitalSummary_Detail', params, { options: options });
  },

  /**
   * 16.6、取消出院办理 IF_LeaveHospital_Cancel
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Cancel: function IF_LeaveHospital_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_LeaveHospital_Cancel', params, { options: options });
  },

  /**
   * 16.7、确认出院-医保结算预约 IF_LeaveHospital_ByInsurance_Confirm
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_ByInsurance_Confirm: function IF_LeaveHospital_ByInsurance_Confirm(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_LeaveHospital_ByInsurance_Confirm', params, { options: options });
  },

  /**
   * 16.8、获取已办理出院详情 IF_LeaveHospital_Result
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_LeaveHospital_Result: function IF_LeaveHospital_Result(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$8 + 'IF_LeaveHospital_Result', params, { options: options });
  }
};

var baseUrl$9 = Constants.Service_Window_URL;

var HospitalPrepaymentServiceApi = {
  /**
   * 6.1、确认住院号（含规则） IF_Confirm_AdmissionNumber
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Confirm_AdmissionNumber: function IF_Confirm_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$9 + 'IF_Confirm_AdmissionNumber', params, { options: options });
  },

  /**
   * 6.2、缴纳住院预缴金 IF_Charge_Foregift
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Charge_Foregift: function IF_Charge_Foregift(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$9 + 'IF_Charge_Foregift', params, { options: options });
  },

  /**
   * 6.3、获取住院预缴列表 IF_Get_Inhospital_Foregift_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Inhospital_Foregift_List: function IF_Get_Inhospital_Foregift_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$9 + 'IF_Get_Inhospital_Foregift_List', { params: params, options: options });
  },

  /**
   * 6.4、住院预交金详细接口 IF_Get_Inhospital_Foregift_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Inhospital_Foregift_Detail: function IF_Get_Inhospital_Foregift_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$9 + 'IF_Get_Inhospital_Foregift_Detail', { params: params, options: options });
  },

  /**
   * 6.5、 获取住院患者列表 IF_Get_Inhospital_Patient_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Inhospital_Patient_List: function IF_Get_Inhospital_Patient_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$9 + 'IF_Get_Inhospital_Patient_List', { params: params, options: options });
  }
};

var baseUrl$a = Constants.Service_Window_URL;

var HospitalServiceApi = {
  /**
   * 10.2、获取医院候诊查询列表（个人）
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Hospital_Waiting_List: function IF_Get_Hospital_Waiting_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$a + 'IF_Get_Hospital_Waiting_List', { params: params, options: options });
  }
};

var baseUrl$b = Constants.Service_Window_URL;

var InhospitalServiceApi = {
  /**
   * 9.1、获取住院总费用列表 IF_Get_Inhospital_Total_Cost_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Inhospital_Total_Cost_List: function IF_Get_Inhospital_Total_Cost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_Get_Inhospital_Total_Cost_List', { params: params, options: options });
  },

  /**
   * 9.2、获取住院总费用详细 IF_Get_Inhospital_Total_Cost_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Inhospital_Total_Cost_Detail: function IF_Get_Inhospital_Total_Cost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_Get_Inhospital_Total_Cost_Detail', { params: params, options: options });
  },

  /**
   * 9.5、获取住院患者列表 IF_Get_InhospitalCost_Patient_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_InhospitalCost_Patient_List: function IF_Get_InhospitalCost_Patient_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_Get_InhospitalCost_Patient_List', { params: params, options: options });
  },

  /**
   * 9.6、获取住院详情 IF_Get_InhospitalCost_Patient_Detail
   * 腕带和就诊卡登录都是调用此接口：腕带登录PatientNumber字段传住院号；就诊卡登录PatientNumber字段传卡号；另外再加biz_type过去非必填字段，主要用于区分是就诊卡还是腕带
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_InhospitalCost_Patient_Detail: function IF_Get_InhospitalCost_Patient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_Get_InhospitalCost_Patient_Detail', { params: params, options: options });
  },

  /**
   * 9.7、获取住院记录 IF_Get_Inhospital_info_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Inhospital_info_List: function IF_Get_Inhospital_info_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$b + 'IF_Get_Inhospital_info_List', { params: params, options: options });
  }
};

var baseUrl$c = Constants.Service_Window_URL;

var PatientCardService = {
  /**
   * 1.1、创建就诊卡  IF_Create_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Create_MedicalCard: function IF_Create_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Create_MedicalCard', params, { options: options });
  },

  /**
   * 1.2、登记就诊卡  IF_Regist_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Regist_MedicalCard: function IF_Regist_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Regist_MedicalCard', params, { options: options });
  },

  /**
   * 1.3、注销就诊卡 IF_Cancel_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Cancel_MedicalCard: function IF_Cancel_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$c + 'IF_Cancel_MedicalCard', params, { options: options });
  },

  /**
   * 1.4、清除就诊卡 IF_Clear_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Clear_MedicalCard: function IF_Clear_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$c + 'IF_Clear_MedicalCard', { params: params, options: options });
  },

  /**
   * 1.5、获取医院已有卡列表 IF_Get_Hospital_MedicalCard_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Hospital_MedicalCard_List: function IF_Get_Hospital_MedicalCard_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$c + 'IF_Get_Hospital_MedicalCard_List', { params: params, options: options });
  },

  /**
   * 1.8、刷新就诊卡 IF_Refresh_MedicalCard
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Refresh_MedicalCard: function IF_Refresh_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$c + 'IF_Refresh_MedicalCard', { params: params, options: options });
  }
};

var baseUrl$d = Constants.Service_Window_URL;

var RegistServiceApi = {
  /**
   * 23.1、获取挂号资源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Regist_Resource: function IF_Get_Regist_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_Get_Regist_Resource', { params: params, options: options });
  },

  /**
   * 23.3、获取医生挂号号源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Regist_Doc_Resource: function IF_Get_Regist_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_Get_Regist_Doc_Resource', { params: params, options: options });
  },

  /**
   * 23.6、确认挂号
   * 先调服务窗 23.6、确认挂号 IF_Confirm_Regist
   * 根据 HospitalTradeApplyInfo 键取OutTradeNo、TotalAmount值传入贝尔曼统一支付平台处理HIS支付相关订单 PAY_Hospital_Trade接口
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Confirm_Regist: function IF_Confirm_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_Confirm_Regist', params, { options: options });
  },

  /**
   * 23.7、取消挂号
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Cancel_Regist: function IF_Cancel_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$d + 'IF_Cancel_Regist', params, { options: options });
  },

  /**
   * 23.8、获取患者挂号列表 IF_Get_Patient_Regist_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Patient_Regist_List: function IF_Get_Patient_Regist_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_Get_Patient_Regist_List', { params: params, options: options });
  },

  /**
   * 23.9、获取患者挂号详细 IF_Get_Patient_Regist_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Patient_Regist_Detail: function IF_Get_Patient_Regist_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$d + 'IF_Get_Patient_Regist_Detail', { params: params, options: options });
  }
};

var baseUrl$e = Constants.Service_Window_URL;

var ReportServiceApi = {
  /**
   * 8.1、获取检验报告列表 IF_Get_Jianyan_Report_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Jianyan_Report_List: function IF_Get_Jianyan_Report_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Get_Jianyan_Report_List', { params: params, options: options });
  },

  /**
   * 8.2、获取检验报告详细 IF_Get_Jianyan_Report_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Jianyan_Report_Detail: function IF_Get_Jianyan_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Get_Jianyan_Report_Detail', { params: params, options: options });
  },

  /**
   * 8.3、获取放射报告列表 IF_Get_Fangshe_Report_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Fangshe_Report_List: function IF_Get_Fangshe_Report_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Get_Fangshe_Report_List', { params: params, options: options });
  },

  /**
   * 8.4、获取放射报告详细 IF_Get_Fangshe_Report_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Fangshe_Report_Detail: function IF_Get_Fangshe_Report_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$e + 'IF_Get_Fangshe_Report_Detail', { params: params, options: options });
  }
};

var baseUrl$f = Constants.Service_Window_URL;

var SchedulingServiceApi = {
  /**
   * 25.1、门诊排班科室列表 IF_Get_Scheduling_Outpatient
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Scheduling_Outpatient: function IF_Get_Scheduling_Outpatient(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_Get_Scheduling_Outpatient', params, { options: options });
  },

  /**
   * 25.2、门诊排班详情 IF_Get_Scheduling_Outpatient_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Scheduling_Outpatient_Detail: function IF_Get_Scheduling_Outpatient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_Get_Scheduling_Outpatient_Detail', params, { options: options });
  },

  /**
   * 25.3、获取医生排班  IF_Get_Doc_Scheduling_Outpatient_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Doc_Scheduling_Outpatient_Detail: function IF_Get_Doc_Scheduling_Outpatient_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_Get_Doc_Scheduling_Outpatient_Detail', params, { options: options });
  },

  /**
   * 25.4、停诊排班 IF_Get_Scheduling_Close
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Scheduling_Close: function IF_Get_Scheduling_Close(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$f + 'IF_Get_Scheduling_Close', params, { options: options });
  }
};

var baseUrl$g = Constants.Service_Window_URL;

var SeflQrCodeServiceApi = {
  /**
   * 12.6、自助机登录二维码获取 IF_Get_ZiZhuJi_LoginUrl
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_ZiZhuJi_LoginUrl: function IF_Get_ZiZhuJi_LoginUrl(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$g + 'IF_Get_ZiZhuJi_LoginUrl', { params: params, options: options });
  },

  /**
   * 12.8、获取已绑卡列表 IF_Get_BindCard_List
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_BindCard_List: function IF_Get_BindCard_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$g + 'IF_Get_BindCard_List', { params: params, options: options });
  }
};

var baseUrl$h = Constants.Service_Window_URL;

var SurgeryServiceApi = {
  /**
   * 41.1、获取手术相关信息 IF_Surgery_Detail
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Surgery_Detail: function IF_Surgery_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$h + 'IF_Surgery_Detail', params, { options: options });
  }
};

var baseUrl$i = Constants.Service_Window_URL + '/cust/';

var ZzjCustomServiceApi = {
  /**
   * 自助机登录二维码获取ZZJ_GetLoginUrl
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_GetLoginUrl: function ZZJ_GetLoginUrl(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_GetLoginUrl', { params: params, options: options });
  },

  /**
   * 自助机登录查询ZZJ_LoginQuery
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_LoginQuery: function ZZJ_LoginQuery(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_LoginQuery', { params: params, options: options });
  },

  /**
   * 获取住院证数据IF_Guidance_Info
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Guidance_Info: function IF_Guidance_Info(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Guidance_Info', { params: params, options: options });
  },

  /**
   * 60.5 ZZJ_Get_ZhuYuan_List 通过就诊卡号获取住院信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_ZhuYuan_List: function ZZJ_Get_ZhuYuan_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_ZhuYuan_List', { params: params, options: options });
  },

  /**
   * 53.1 确认住院号ZZJ_Confirm_AdmissionNumber 通过腕带（住院号）获取住院信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Confirm_AdmissionNumber: function ZZJ_Confirm_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Confirm_AdmissionNumber', { params: params, options: options });
  },

  /**
   * 五官科扫码验证登录
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_BindCardPatInfo: function IF_Get_BindCardPatInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_BindCardPatInfo', { params: params, options: options });
  },

  /**
   * 50.1、获取挂号号源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Regist_Resource: function IF_Get_Regist_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Regist_Resource', { params: params, options: options });
  },

  /**
   * 50.1、获取预约号源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Resource: function IF_Get_Booking_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Booking_Resource', { params: params, options: options });
  },

  /**
   * 50.3、获取医生挂号号源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Regist_Doc_Resource: function IF_Get_Regist_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Regist_Doc_Resource', { params: params, options: options });
  },

  /**
   * 50.3、获取医生预约号源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Doc_Resource: function IF_Get_Booking_Doc_Resource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Booking_Doc_Resource', { params: params, options: options });
  },

  /**
   * 50.2、获取科室挂号号源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Regist_Dept_NoSource: function IF_Get_Regist_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Regist_Dept_NoSource', { params: params, options: options });
  },

  /**
   * 50.2、获取科室预约号源
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_Get_Booking_Dept_NoSource: function IF_Get_Booking_Dept_NoSource(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_Get_Booking_Dept_NoSource', { params: params, options: options });
  },

  /**
   * 51.1 查询未交费记录
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_Uncharge_Trade_List: function ZZJ_Get_Uncharge_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_Uncharge_Trade_List', { params: params, options: options });
  },

  /**
   * 51.2 确认订单
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Check_Hospital_Trade: function ZZJ_Check_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Check_Hospital_Trade', { params: params, options: options });
  },

  /**
   * 51.3交易查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Barcode_Pay_State: function ZZJ_Barcode_Pay_State(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Barcode_Pay_State', { params: params, options: options });
  },

  /**
   * 51.4交易撤销
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Barcode_Pay_Cancel: function ZZJ_Barcode_Pay_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Barcode_Pay_Cancel', { params: params, options: options });
  },

  /**
   * 51.5交易查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Barcode_Pay_Query: function ZZJ_Barcode_Pay_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Barcode_Pay_Query', { params: params, options: options });
  },

  /**
   * 52.1确认就诊卡
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Confirm_MedicalCard: function ZZJ_Confirm_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Confirm_MedicalCard', { params: params, options: options });
  },

  /**
   * 52.2 确认充值
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Charge_MedicalCard: function ZZJ_Charge_MedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Charge_MedicalCard', { params: params, options: options });
  },

  /**
   * 53.2 确认充值(住院)
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Charge_AdmissionNumber: function ZZJ_Charge_AdmissionNumber(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Charge_AdmissionNumber', { params: params, options: options });
  },

  /**
   * 55.1 获取账单列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_Bill: function ZZJ_Get_Bill(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_Bill', { params: params, options: options });
  },

  /**
   * 56.1 签到
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_SignIn: function ZZJ_SignIn(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_SignIn', { params: params, options: options });
  },

  /**
   * 50.6 获取患者挂号列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_Patient_Regist_List: function ZZJ_Get_Patient_Regist_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_Patient_Regist_List', { params: params, options: options });
  },

  /**
   * 50.4确认挂号
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Confirm_Regist: function ZZJ_Confirm_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Confirm_Regist', { params: params, options: options });
  },

  /**
   * 50.5取消挂号
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Cancel_Regist: function ZZJ_Cancel_Regist(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Cancel_Regist', { params: params, options: options });
  },

  /**
   * 56.2 获取签到列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_SignIn_List: function ZZJ_Get_SignIn_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_SignIn_List', { params: params, options: options });
  },

  /**
   * 57.1校验是否建档
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Check_IDCard: function ZZJ_Check_IDCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Check_IDCard', { params: params, options: options });
  },

  /**
   * 57.2建档办卡
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_CreateMedicalCard: function ZZJ_CreateMedicalCard(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_CreateMedicalCard', { params: params, options: options });
  },

  /**
   * 57.3获取病人类型
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_BRLXDM: function ZZJ_Get_BRLXDM(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_BRLXDM', { params: params, options: options });
  },

  /**
   * 非硬件模式住院充值登录
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_GetYhYzLogin: function ZZJ_GetYhYzLogin(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_GetYhYzLogin', { params: params, options: options });
  },

  /**
   * 58.1扫码绑定卡号
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  IF_FWC_BindCardNoByQrCode: function IF_FWC_BindCardNoByQrCode(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'IF_FWC_BindCardNoByQrCode', { params: params, options: options });
  },

  /**
   * 获取住院日清单列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_ZhuYuan_DailyCost_List: function ZZJ_Get_ZhuYuan_DailyCost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_ZhuYuan_DailyCost_List', { params: params, options: options });
  },

  /**
   * 获取住院日清单详情
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_ZhuYuan_DailyCost_Detail: function ZZJ_Get_ZhuYuan_DailyCost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_ZhuYuan_DailyCost_Detail', { params: params, options: options });
  },

  /**
   * 获取住院总费用列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_ZhuYuan_ToTalCost_List: function ZZJ_Get_ZhuYuan_ToTalCost_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_ZhuYuan_ToTalCost_List', { params: params, options: options });
  },

  /**
   * 获取住院总费用详情
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_ZhuYuan_ToTalCost_Detail: function ZZJ_Get_ZhuYuan_ToTalCost_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_ZhuYuan_ToTalCost_Detail', { params: params, options: options });
  },

  /**
   * 获取门诊清单列表
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_OutPatient_Charged_Trade_List: function ZZJ_Get_OutPatient_Charged_Trade_List(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_OutPatient_Charged_Trade_List', { params: params, options: options });
  },

  /**
   * 获取门诊清单详情
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_OutPatient_Charged_Trade_Detail: function ZZJ_Get_OutPatient_Charged_Trade_Detail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_OutPatient_Charged_Trade_Detail', { params: params, options: options });
  },

  /**
   * 获取患者挂号费
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  ZZJ_Get_Patient_RegistFee: function ZZJ_Get_Patient_RegistFee(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$i + 'ZZJ_Get_Patient_RegistFee', { params: params, options: options });
  }
};

var baseUrl$j = Constants.Unified_Payment_URL;

var AuthorizeInfoServiceApi = {
  /**
   * 根据open_user_id查询授权表的用户信息
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo: function PAY_AuthorizeInfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$j + 'PAY_AuthorizeInfo', params, { options: options });
  },

  /**
   * 登录授权回调
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_System_Oauth_Userinfo: function LC_System_Oauth_Userinfo(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$j + 'lc.system.oauth.userinfo', { params: params, options: options });
  },

  /**
   * 根据ftoken获取联空返回的openUserID
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Alipay_Customer_Ftoken_Query: function LC_Alipay_Customer_Ftoken_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$j + 'lc.alipay.customer.ftoken.query', { params: params, options: options });
  },

  /**
   * 统计授权数据
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_AuthorizeInfo_Statistic: function PAY_AuthorizeInfo_Statistic(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$j + 'PAY_AuthorizeInfo_Statistic', { params: params, options: options });
  }
};

var baseUrl$k = Constants.Unified_Payment_URL;

var PayTradeServiceApi = {
  /**
   * 更新订单状态（我方） PAY_Update_Trade_Status
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Update_His_Fail: function PAY_Update_His_Fail(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'PAY_Update_His_Fail', params, { options: options });
  },
  PAY_Update_His_Success: function PAY_Update_His_Success(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'PAY_Update_His_Success', params, { options: options });
  },
  PAY_Update_His_Call: function PAY_Update_His_Call(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'PAY_Update_His_Call', params, { options: options });
  },

  /**
   * 创建支付订单
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Create_Trade: function PAY_Create_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'PAY_Create_Trade', params, { options: options });
  },

  /**
   * 订单列表查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_QueryList: function PAY_Trade_QueryList(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$k + 'PAY_Trade_QueryList', { params: params, options: options });
  },

  /**
   * 订单查询
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Query: function PAY_Trade_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$k + 'PAY_Trade_Query', { params: params, options: options });
  },

  /**
   * 处理HIS支付相关订单 PAY_Hospital_Trade
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Hospital_Trade: function PAY_Hospital_Trade(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'PAY_Hospital_Trade', params, { options: options });
  },

  /**
   * 支付宝刷脸支付 lc.trade.simle.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Simle_Pay: function LC_Trade_Simle_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'lc.trade.simle.pay', params, { options: options });
  },

  /**
   * 条码支付 lc.trade.barcode.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Barcode_Pay: function LC_Trade_Barcode_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'lc.trade.barcode.pay', params, { options: options });
  },

  /**
   * 交易查询 lc.trade.query
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Query: function LC_Trade_Query(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$k + 'lc.trade.query', { params: params, options: options });
  },

  /**
   * 交易撤销 lc.trade.cancel
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Cancel: function LC_Trade_Cancel(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'lc.trade.cancel', params, { options: options });
  },

  /**
   * 聚合扫码支付 lc.trade.polymerization.pay
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  LC_Trade_Polymerization_Pay: function LC_Trade_Polymerization_Pay(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.post(baseUrl$k + 'lc.trade.polymerization.pay', params, { options: options });
  },

  /**
   * 订单数据统计
   * @param {Object} params 接口入参
   * @param {Object} options 选项
   */
  PAY_Trade_Statistic: function PAY_Trade_Statistic(params) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return instance.get(baseUrl$k + 'PAY_Trade_Statistic', { params: params, options: options });
  }
};



var api = /*#__PURE__*/Object.freeze({
	OrgConfigApi: OrgConfigApi,
	ZWLApi: ZWLApi,
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
	PayTradeServiceApi: PayTradeServiceApi
});

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

function init$1(config) {
  setHtmlFontSize(config);
  /* 屏蔽右键菜单 */
  document.oncontextmenu = function () {
    return false;
  };
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
    // 是否自动退出
    isAutoLeave: true,
    // 当前倒计时时间
    nowTimeout: 0,
    // 当前医院
    hospital: store.hospital || null
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
    },
    setNowTimeout: function setNowTimeout(state, v) {
      _.isUndefined(v) ? state.nowTimeout-- : state.nowTimeout = v;
    },
    _isAutoLeave: function _isAutoLeave(state, v) {
      if (state.hospital && v) {
        state.nowTimeout = state.hospital.exit_timeout;
      }
      state.isAutoLeave = v;
      globalConfig.el.click();
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
    }
  }
};

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

//
var script$3 = {
  name: "BemLogcat",
  data: function data() {
    return {
      logs: null,
      selectedLevel: 0,
      levelOptions: [{ label: "全部", value: 0 }, { label: "info", value: "info" }, { label: "warn", value: "warn" }, { label: "error", value: "error" }],
      selectedTime: "h",
      timeOptions: [{ label: "一小时内", value: "h" }, { label: "一天以内", value: "d" }, { label: "全部", value: 0 }]
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
    /** 清空日志 */
    clearLog: function clearLog() {
      var _this = this;

      this.$bem.showalert({
        content: "确定要清空所有日志吗？",
        showCancel: true,
        isAutoExit: false,
        onClose: function onClose(confirm) {
          if (confirm) {
            clear$1();
            _this.getAllByTimeAndLevel();
          }
        }
      });
    },

    /** 根据时间和日志等级获取日志 */
    getAllByTimeAndLevel: function getAllByTimeAndLevel(level, timeUnit) {
      var _this2 = this;

      level = level || this.selectedLevel;
      timeUnit = timeUnit || this.selectedTime;
      this.$bem.loading.show();
      if (!timeUnit) {
        getAll$1(function (res) {
          _this2.logs = level ? res.filter(function (item) {
            return item.level === level;
          }) : res;
          _this2.$bem.loading.close();
        });
      } else {
        getAllByTime(function (res) {
          _this2.logs = level ? res.filter(function (item) {
            return item.level === level;
          }) : res;
          _this2.$bem.loading.close();
        }, 1, timeUnit);
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
    on: {
      click: function click($event) {
        return _vm.getAllByTimeAndLevel();
      }
    }
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

var Logcat = normalizeComponent_1({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

function refresh() {
  if (window.nativeMethod) {
    window.nativeMethod.refresh();
  } else {
    window.location.reload(true);
  }
}

//

var script$4 = {
  data: function data() {
    return {
      visible: false,
      fwcUrl: null,
      payUrl: null,
      adminUrl: null
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
        this.fwcUrl = store.fwcUrl;
        this.payUrl = store.payUrl;
        this.adminUrl = store.adminUrl;
      }
      this.visible = this.show;
    }
  },
  methods: {
    save: function save() {
      store.fwcUrl = this.fwcUrl;
      store.payUrl = this.payUrl;
      store.adminUrl = this.adminUrl;
      refresh();
    },
    reset: function reset() {
      this.fwcUrl = "https://zzjfwcapi.linkingcloud.cn/api/";
      this.payUrl = "https://zzjpayapi.linkingcloud.cn/api/";
      this.adminUrl = "https://zzjadminapi.linkingcloud.cn/api/";
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
    attrs: { show: _vm.visible },
    on: {
      "update:show": function updateShow($event) {
        _vm.visible = $event;
      },
      close: _vm.close
    }
  }, [_c("ul", [_c("li", [_c("p", { staticClass: "label" }, [_vm._v("服务窗地址")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.fwcUrl,
      expression: "fwcUrl"
    }],
    attrs: { type: "search" },
    domProps: { value: _vm.fwcUrl },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.fwcUrl = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("li", [_c("p", { staticClass: "label" }, [_vm._v("统一支付平台地址")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.payUrl,
      expression: "payUrl"
    }],
    attrs: { type: "search" },
    domProps: { value: _vm.payUrl },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.payUrl = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("li", [_c("p", { staticClass: "label" }, [_vm._v("管理后台地址")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.adminUrl,
      expression: "adminUrl"
    }],
    attrs: { type: "search" },
    domProps: { value: _vm.adminUrl },
    on: {
      input: function input($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.adminUrl = $event.target.value;
      }
    }
  })])]), _vm._v(" "), _c("div", { attrs: { slot: "footer" }, slot: "footer" }, [_c("bem-button", { on: { click: _vm.save } }, [_vm._v("保存")]), _vm._v(" "), _c("bem-button", { attrs: { type: "info" }, on: { click: _vm.reset } }, [_vm._v("重置")])], 1)])], 1);
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

var ApiUrl = normalizeComponent_1({ render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);

var script$5 = {
  name: "BemSetup",
  mounted: function mounted() {
    if (!this.storeHospital) {
      this.visible = true;
    }
  },

  components: {
    logcat: Logcat,
    ApiUrl: ApiUrl
  },
  data: function data() {
    return _defineProperty({
      showApiUrl: false,
      // 显示键盘
      showInput: false,
      // 输入的密码
      inputVal: "",
      // 显示日志
      showlog: false,
      // 医院信息
      hospInfo: null,
      /* 医院信息需要展示的字段 */
      hospitalKeys: ["hosp_name", "app_id", "hosp_code", "org_code", "authorize_redirect_uri", "authorize_url", "serv_url", "gate_way"],
      winConfigKeys: ["win_name", "win_url", "win_code"],
      /* 医院列表 */
      hospList: null,
      /* 自助机列表 */
      winCodeList: null,
      /* 机构ID */
      orgId: 0,
      /* 自助机ID */
      winConfigId: 0,
      /* 下载文件url */
      fileUri: "files/ROOT.zip",
      visible: false,
      count: 0,
      lastTime: null
    }, "showlog", false);
  },

  watch: {
    showInput: function showInput(val) {
      val && (this.inputVal = "");
    },
    visible: function visible() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.visible) {
                  _context.next = 8;
                  break;
                }

                _this.$isAutoLeave(false);
                _context.next = 4;
                return OrgConfigApi.getOrgList();

              case 4:
                _this.hospList = _context.sent;

                _this.storeOrgId && (_this.orgId = _this.storeOrgId);
                _context.next = 9;
                break;

              case 8:
                _this.$isAutoLeave(true);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    orgId: function orgId(id) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return OrgConfigApi.getWinCodeList({ orgId: id }, { loading: false });

              case 2:
                _this2.winCodeList = _context2.sent;

                if (_this2.storeWinConfigId && !_this2.hospInfo) {
                  _this2.winConfigId = _this2.storeWinConfigId;
                } else if (id != 0) {
                  if (Array.isArray(_this2.winCodeList) && _this2.winCodeList.length > 0) {
                    _this2.winConfigId = _this2.winCodeList[0].id;
                  } else {
                    _this2.winConfigId = 0;
                  }
                }

              case 4:
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
    storeHospital: function storeHospital() {
      return this.$store.state.common.hospital;
    },
    storeOrgId: function storeOrgId() {
      return this.$store.getters.getOrgId;
    },
    storeWinConfigId: function storeWinConfigId() {
      return this.$store.getters.getWinConfigId;
    }
  },
  methods: {
    /* 显示维护界面 */
    showSetup: function showSetup(e) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                !_this4.lastTime && (_this4.lastTime = e.timeStamp);
                if (e.timeStamp - _this4.lastTime < 1000) {
                  _this4.count++;
                  if (_this4.count >= 5) {
                    _this4.count = 0;
                    _this4.showInput = true;
                  }
                } else {
                  _this4.count = 1;
                }
                _this4.lastTime = e.timeStamp;

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    },

    /* 初始化机器 */
    init: function init() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this5.winConfigId == 0 || _this5.orgId == 0)) {
                  _context5.next = 3;
                  break;
                }

                Alert("请选择医院");
                return _context5.abrupt("return");

              case 3:
                _this5.$store.commit("setHospital", _this5.hospInfo);
                _this5.$emit("initSuccess", _this5.hospInfo);
                _this5.visible = false;

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },

    //清除缓存
    clearCache: function clearCache() {
      localStorage.clear();
      window.location.reload(true);
    },

    //下载文件
    openFile: function openFile() {
      window.open(this.fileUri);
    },

    //获取键盘输入内容
    changePwd: function changePwd(content, num) {
      if (content == "close") {
        if (this.inputVal == this.$hospital.oper_pwd) {
          this.visible = true;
          this.showInput = false;
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
    on: {
      click: function click($event) {
        _vm.showlog = !_vm.showlog;
      }
    }
  }, [_vm._v("显示日志")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: { click: _vm.clearCache }
  }, [_vm._v("重置机器")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: {
      click: function click($event) {
        return _vm.openFile();
      }
    }
  }, [_vm._v("下载文件")]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__btn bem-setup--shadow",
    on: {
      click: function click($event) {
        _vm.showApiUrl = true;
      }
    }
  }, [_vm._v("API地址")])]), _vm._v(" "), _c("div", { staticClass: "bem-setup__select-wrap" }, [_c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.orgId,
      expression: "orgId"
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
        _vm.orgId = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c("option", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.orgId === 0,
      expression: "orgId === 0"
    }],
    domProps: { value: 0 }
  }, [_vm._v("请选择医院")]), _vm._v(" "), _vm._l(_vm.hospList, function (item) {
    return _c("option", { key: item.id, domProps: { value: item.id } }, [_vm._v(_vm._s(item.hosp_name))]);
  })], 2), _vm._v(" "), _c("select", {
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
  })], 2)]), _vm._v(" "), _c("button", {
    staticClass: "bem-setup__init-btn bem-setup__btn bem-setup--shadow",
    on: { click: _vm.init }
  }, [_vm._v("初始化机器")]), _vm._v(" "), _c("div", { staticClass: "bem-setup__hr" }, [_vm._v("当前医院配置信息")]), _vm._v(" "), !_vm.hospInfo ? _c("h6", { staticClass: "bem-setup__text--not-init" }, [_vm._v("暂无信息，请先初始化机器")]) : _c("ul", { staticClass: "bem-setup__info-wrap" }, [_vm._l(_vm.hospitalKeys, function (key) {
    return _c("li", [_c("span", { staticClass: "label" }, [_vm._v(_vm._s(key) + ":")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(_vm.hospInfo[key]))])]);
  }), _vm._v(" "), _vm._l(_vm.winConfigKeys, function (key) {
    return _c("li", [_c("span", { staticClass: "label" }, [_vm._v(_vm._s(key) + ":")]), _vm._v(" "), _c("span", { staticClass: "text" }, [_vm._v(_vm._s(_vm.hospInfo.winConfig[key]))])]);
  })], 2)]) : _vm._e(), _vm._v(" "), _c("bem-logcat", {
    attrs: { show: _vm.showlog },
    on: {
      "update:show": function updateShow($event) {
        _vm.showlog = $event;
      }
    }
  }), _vm._v(" "), _c("api-url", {
    attrs: { show: _vm.showApiUrl },
    on: {
      "update:show": function updateShow($event) {
        _vm.showApiUrl = $event;
      }
    }
  }), _vm._v(" "), _c("bem-popup", {
    attrs: { show: _vm.showInput, width: "auto", closeOnClickMask: "" },
    on: {
      "update:show": function updateShow($event) {
        _vm.showInput = $event;
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
      type: "search",
      readonly: "",
      placeholder: "请输入维护密码"
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
  }), _vm._v(" "), _c("div", { staticClass: "bem-setup__pwd" }, [_c("bem-keypad", {
    attrs: { showKeyPad: _vm.showInput, setContent: _vm.inputVal },
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

var Setup = normalizeComponent_1({ render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

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
        var version;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return OrgConfigApi.getVersionById({
                  orgId: _this.$orgId,
                  winConfigId: _this.$winConfigId
                });

              case 2:
                version = _context.sent;

                if (_.isEmpty(store.version)) {
                  store.version = version;
                } else if (store.version != version) {
                  store.version = version;
                  refresh();
                }

              case 4:
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
  return _c("div");
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

var CheckVersion = normalizeComponent_1({ render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined);

var script$7 = {
  name: "BemUploadLogs",
  mounted: function mounted() {
    this.startLoop();
  },
  beforeDestroy: function beforeDestroy() {
    this.stopLoop();
  },

  props: {
    // 检测更新间隔
    interval: {
      type: Number,
      default: 10
    },
    // 日志一次上传条数
    count: {
      type: Number,
      default: 5
    }
  },
  methods: {
    /** 轮询每次执行 */
    uploadLogs: function uploadLogs(res) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(Array.isArray(res) && res.length > 0)) {
                  _context.next = 11;
                  break;
                }

                res.forEach(function (log) {
                  log.in_param = log.in_param ? _JSON$stringify(log.in_param) : "";
                  log.out_param = log.out_param ? _JSON$stringify(log.out_param) : "";
                });
                _context.prev = 2;
                _context.next = 5;
                return ZWLApi.receiveLogs({ zzjWebLogsList: res }, { alert: false });

              case 5:
                pop(null, _this.count);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);

                console.error(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this, [[2, 8]]);
      }))();
    },

    /** 开始轮询 */
    startLoop: function startLoop() {
      var _this2 = this;

      CountDown.ticker({
        ticker: "UploadLogsTicker",
        step: this.interval * 1000,
        callback: function callback() {
          getAll$1(function (res) {
            return _this2.uploadLogs(res);
          }, null, _this2.count);
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

var UploadLogs = normalizeComponent_1({ render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

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

var script$8 = {
  name: 'BemKeypad',
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
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.showKeyPad ? _c("div", {
    ref: "main",
    staticClass: "bem-keypad",
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
var __vue_staticRenderFns__$8 = [function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "key-cell", attrs: { "data-num": "D" } }, [_c("span", { attrs: { "data-num": "D" } }, [_vm._v("退格")])]);
}];
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

var Keypad = normalizeComponent_1({ render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

var _props;

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

var script$9 = {
  name: "BemPopup",
  data: function data() {
    return {};
  },

  computed: {
    style: function style() {
      var style = {};
      style.marginTop = this.top;
      style.width = this.width;
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
  props: (_props = {
    // 弹窗宽度
    width: {
      type: String,
      default: "50%"
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
    }
  }, _defineProperty(_props, "mask", {
    type: Boolean,
    default: true
  }), _defineProperty(_props, "showClose", {
    type: Boolean,
    default: true
  }), _props)
};

var __$_require_assets_imgs_close_icon_png__ = "data:image/png;base64,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";

/* script */
var __vue_script__$9 = script$9;
var __vue_render__$9 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.show ? _c("div", { staticClass: "bem-popup" }, [_vm.mask ? _c("div", {
    staticClass: "bem-popup__mask",
    on: { click: _vm.handleClickMask }
  }) : _vm._e(), _vm._v(" "), _c("div", { staticClass: "bem-popup__main", style: _vm.style }, [_c("div", {
    staticClass: "bem-popup__header",
    style: _vm.center ? { "text-align": "center" } : ""
  }, [_vm._t("title", [_c("span", { staticClass: "bem-popup__title" }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _vm.showClose ? _c("img", {
    staticClass: "bem-popup__close",
    attrs: {
      src: __$_require_assets_imgs_close_icon_png__
    },
    on: { click: _vm.close }
  }) : _vm._e()], 2), _vm._v(" "), _c("div", { staticClass: "bem-popup__body" }, [_vm._t("default")], 2), _vm._v(" "), _vm.$slots.footer ? _c("div", { staticClass: "bem-popup__footer" }, [_vm._t("footer")], 2) : _vm._e()])]) : _vm._e();
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

var Popup = normalizeComponent_1({ render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

var components = [Setup, Logcat, CheckVersion, UploadLogs, button, Keypad, Popup];

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
      globalConfig.el = el;
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
    $orgId: function $orgId() {
      return this.$store.getters.getOrgId;
    },
    $winConfigId: function $winConfigId() {
      return this.$store.getters.getWinConfigId;
    },
    $winCode: function $winCode() {
      return this.$store.getters.getWinCode;
    }
  },
  methods: {
    $isAutoLeave: function $isAutoLeave(status) {
      this.$store.dispatch('isAutoLeave', status);
    },

    $info: function $info(data) {
      return info(data);
    },
    $warn: function $warn(data) {
      return warn(data);
    },
    $error: function $error(data) {
      return error$1(data);
    }
  }
};

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
  // 全局捕获异常
  Vue.config.errorHandler = function (err, vm, info) {
    var arr = [info, vm.$options.name, err.message, err.stack];
    console.error(err);
    error$1({ desc: err.message, data: arr.join('<br>') });
  };
  // 注册全局组件
  components.forEach(function (component) {
    Vue.component(component.name, component);
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
    api: api
  };
};

export { api, instance as axios, install, service as loading, store as localStore, logs as logger, Alert as showalert };
