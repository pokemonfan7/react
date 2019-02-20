const es6Note = {
	github: 'https://github.com/pokemonfan7/pokemonIndex/blob/develop/notes/ES6.md',
	class: '## Class\n' +
		'### 基本语法\n' +
		'ES6 的类，完全可以看作构造函数的另一种写法。\n' +
		'```javascript\n' +
		'class Point {\n' +
		'  // ...\n' +
		'}\n' +
		'\n' +
		'typeof Point // "function"\n' +
		'Point === Point.prototype.constructor // true\n' +
		'```\n' +
		'上面代码表明，类的数据类型就是函数，类本身就指向构造函数。  \n' +
		'使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。\n' +
		'\n' +
		'构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。  \n' +
		'在类的实例上面调用方法，其实就是调用原型上的方法。\n' +
		'\n' +
		'**类的内部所有定义的方法，都是不可枚举的（non-enumerable）,这一点与 ES5 的行为不一致。**\n' +
		'\n' +
		'### constructor方法\n' +
		'constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。  \n' +
		'constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象，此时实例对象将不再是原来类的实例  \n' +
		'类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。\n' +
		'\n' +
		'### 类的实例\n' +
		'与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。  \n' +
		'与 ES5 一样，类的所有实例共享一个原型对象。这也意味着，可以通过实例的`__proto__`属性为“类”添加方法。但不推荐使用，推荐使用`Object.getPrototypeOf` 方法来获取实例对象的原型，然后再来为原型添加方法/属性。\n' +
		'\n' +
		'### setter&getter\n' +
		'与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。\n' +
		'```javascript\n' +
		'class MyClass {\n' +
		'  constructor() {\n' +
		'    // ...\n' +
		'  }\n' +
		'  get prop() {\n' +
		'    return \'getter\';\n' +
		'  }\n' +
		'  set prop(value) {\n' +
		'    console.log(\'setter: \'+value);\n' +
		'  }\n' +
		'}\n' +
		'\n' +
		'let inst = new MyClass();\n' +
		'\n' +
		'inst.prop = 123;\n' +
		'// setter: 123\n' +
		'\n' +
		'inst.prop\n' +
		'// \'getter\'\n' +
		'```\n' +
		'上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。\n' +
		'\n' +
		'### Class表达式\n' +
		'与函数一样，类也可以使用表达式的形式定义。\n' +
		'```javascript\n' +
		'const MyClass = class Me {\n' +
		'  getClassName() {\n' +
		'    return Me.name;\n' +
		'  }\n' +
		'};\n' +
		'```\n' +
		'上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。  \n' +
		'如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。  \n' +
		'`const MyClass = class { /* ... */ };`\n' +
		'采用 Class 表达式，可以写出立即执行的 Class。\n' +
		'```javascript\n' +
		'let person = new class {\n' +
		'  constructor(name) {\n' +
		'    this.name = name;\n' +
		'  }\n' +
		'\n' +
		'  sayName() {\n' +
		'    console.log(this.name);\n' +
		'  }\n' +
		'}(\'张三\');\n' +
		'\n' +
		'person.sayName(); // "张三"\n' +
		'```\n' +
		'\n' +
		'### 静态方法\n' +
		'类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。  \n' +
		'**注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。**\n' +
		'```javascript\n' +
		'class Foo {\n' +
		'  static bar() {\n' +
		'    this.baz();\n' +
		'  }\n' +
		'  static baz() {\n' +
		'    console.log(\'hello\');\n' +
		'  }\n' +
		'  baz() {\n' +
		'    console.log(\'world\');\n' +
		'  }\n' +
		'}\n' +
		'\n' +
		'Foo.bar() // hello\n' +
		'```\n' +
		'上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。  \n' +
		'父类的静态方法，可以被子类继承。静态方法也是可以从super对象上调用的。\n' +
		'\n' +
		'## Class继承\n' +
		'### 简介\n' +
		'**子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。**  \n' +
		'ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。  \n' +
		'\n' +
		'### Object.getPrototypeOf()\n' +
		'Object.getPrototypeOf方法可以用来从子类上获取父类。\n' +
		'`Object.getPrototypeOf(ColorPoint) === Point // true`\n' +
		'因此，可以使用这个方法判断，一个类是否继承了另一个类。\n' +
		'\n' +
		'### super关键字\n' +
		'super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。\n' +
		'\n' +
		'第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。  \n' +
		'**注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B**  \n' +
		'作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。\n' +
		'\n' +
		'第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。  \n' +
		'ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。  \n' +
		'由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。  \n' +
		'如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。  \n' +
		'另外，在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。\n' +
		'\n' +
		'### 类的prototype属性和__proto__属性\n' +
		'1. 子类的__proto__属性，表示构造函数的继承，总是指向父类。\n' +
		'2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。\n' +
		'\n' +
		'这样的结果是因为，类的继承是按照下面的模式实现的。\n' +
		'```javascript\n' +
		'class A {\n' +
		'}\n' +
		'\n' +
		'class B {\n' +
		'}\n' +
		'\n' +
		'// B 的实例继承 A 的实例\n' +
		'Object.setPrototypeOf(B.prototype, A.prototype);\n' +
		'\n' +
		'// B 继承 A 的静态属性\n' +
		'Object.setPrototypeOf(B, A);\n' +
		'\n' +
		'const b = new B();\n' +
		'```\n' +
		'Object.setPrototypeOf方法的实现\n' +
		'```javascript\n' +
		'Object.setPrototypeOf = function (obj, proto) {\n' +
		'  obj.__proto__ = proto;\n' +
		'  return obj;\n' +
		'}\n' +
		'```\n' +
		'因此，就得到了上面的结果。\n' +
		'```javascript\n' +
		'Object.setPrototypeOf(B.prototype, A.prototype);\n' +
		'// 等同于\n' +
		'B.prototype.__proto__ = A.prototype;\n' +
		'\n' +
		'Object.setPrototypeOf(B, A);\n' +
		'// 等同于\n' +
		'B.__proto__ = A;\n' +
		'```\n' +
		'\n' +
		'下面，讨论两种情况。第一种，子类继承Object类。\n' +
		'```jvascript\n' +
		'class A extends Object {\n' +
		'}\n' +
		'\n' +
		'A.__proto__ === Object // true\n' +
		'A.prototype.__proto__ === Object.prototype // true\n' +
		'```\n' +
		'这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。\n' +
		'\n' +
		'第二种情况，不存在任何继承。\n' +
		'```javascript\n' +
		'class A {\n' +
		'}\n' +
		'\n' +
		'A.__proto__ === Function.prototype // true\n' +
		'A.prototype.__proto__ === Object.prototype // true\n' +
		'```\n' +
		'这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承`Function.prototype`。但是，A调用后返回一个空对象（即Object实例），所以`A.prototype.__proto__`指向构造函数（Object）的prototype属性。\n' +
		'\n' +
		'### 实例的`__proto__`属性\n' +
		'子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。\n' +
		'\n' +
		'### 原生构造函数的继承\n' +
		'原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。\n' +
		'```javascript\n' +
		'Boolean()\n' +
		'Number()\n' +
		'String()\n' +
		'Array()\n' +
		'Date()\n' +
		'Function()\n' +
		'RegExp()\n' +
		'Error()\n' +
		'Object()\n' +
		'```\n' +
		'以前，这些原生构造函数是无法继承的\n' +
		'\n' +
		'ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子。\n' +
		'```javascript\n' +
		'class MyArray extends Array {\n' +
		'  constructor(...args) {\n' +
		'    super(...args);\n' +
		'  }\n' +
		'}\n' +
		'\n' +
		'var arr = new MyArray();\n' +
		'arr[0] = 12;\n' +
		'arr.length // 1\n' +
		'\n' +
		'arr.length = 0;\n' +
		'arr[0] // undefined\n' +
		'```\n' +
		'\n' +
		'**注意，继承Object的子类，有一个行为差异。**\n' +
		'```javascript\n' +
		'class NewObj extends Object{\n' +
		'  constructor(){\n' +
		'    super(...arguments);\n' +
		'  }\n' +
		'}\n' +
		'var o = new NewObj({attr: true});\n' +
		'o.attr === true  // false\n' +
		'```\n' +
		'上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。',
	promise: '## promise\n' +
		'### Promise捕获错误与 try catch 等同\n' +
		'```javascript\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    throw Error(\'sync error\')\n' +
		'})\n' +
		'    .then(res => {\n' +
		'        console.log(res)\n' +
		'    })\n' +
		'    .catch(err => {\n' +
		'        console.log(err)\n' +
		'    })\n' +
		'//\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    setTimeout(() => {\n' +
		'        throw Error(\'async error\')   \n' +
		'    })\n' +
		'})\n' +
		'    .then(res => {\n' +
		'        console.log(res)\n' +
		'    })\n' +
		'    .catch(err => {\n' +
		'        console.log(err)\n' +
		'    })\n' +
		'//\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    resolve()\n' +
		'})\n' +
		'    .then(res => {\n' +
		'        throw Error(\'sync error\') \n' +
		'    })\n' +
		'```\n' +
		'\n' +
		'正确答案是：\n' +
		'1. Error被catch到，最后console.log输出\n' +
		'2. 错误无法被catch，控制台报错\n' +
		'3. promise没有catch，错误被捕获后又被抛出，控制台报错\n' +
		'\n' +
		'这里考查的主要是Promise的错误捕获，其实仔细想想js中能用的错误捕获也只能是try catch了，而try catch只能捕获同步错误，并且在没有传入错误监听的时候会将捕获到的错误抛出。\n' +
		'\n' +
		'### Promise 拥有状态变化\n' +
		'```javascript\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    resolve(1)\n' +
		'    throw Error(\'sync error\')\n' +
		'})\n' +
		'    .then(res => {\n' +
		'        console.log(res)\n' +
		'    })\n' +
		'    .catch(err => {\n' +
		'        console.log(err)\n' +
		'    })\n' +
		'//\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    reject(2)\n' +
		'    resolve(1)\n' +
		'})\n' +
		'    .then(res => {\n' +
		'        console.log(res)\n' +
		'    })\n' +
		'    .catch(err => {\n' +
		'        console.log(err)\n' +
		'    })\n' +
		'//\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    resolve(1)\n' +
		'})\n' +
		'    .then(res => {\n' +
		'        throw Error(\'sync error\')\n' +
		'        console.log(res)\n' +
		'    })\n' +
		'    .catch(err => {\n' +
		'        console.log(err)\n' +
		'    })\n' +
		'```\n' +
		'\n' +
		'正确答案是：\n' +
		'1. 输出 1\n' +
		'2. 输出 2\n' +
		'3. console.log输出错误\n' +
		'\n' +
		'Promise是一个有状态的容器，当状态被凝固了，后面的resolve或reject就不会被触发。简单的说就是同一个Promise只能触发一个状态监听（onFulfilled或onRejected）。\n' +
		'\n' +
		'### Promise 方法中的回调是异步的\n' +
		'```javascript\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    resolve()\n' +
		'    setTimeout(() => {\n' +
		'        console.log(1)\n' +
		'    })\n' +
		'    console.log(2)\n' +
		'})\n' +
		'    .then(res => {\n' +
		'        console.log(3)\n' +
		'    })\n' +
		'console.log(4)\n' +
		'```\n' +
		'\n' +
		'正确答案是：\n' +
		'web依次输出：2 4 3 1\n' +
		'\n' +
		'### Promise 会存储返回值\n' +
		'```javascript\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    reject(1)\n' +
		'})\n' +
		'    .catch(err => {\n' +
		'        console.log(err)\n' +
		'        return 2\n' +
		'    })\n' +
		'\n' +
		'setTimeout(() => {\n' +
		'    p1\n' +
		'        .then(res => console.log(res))\n' +
		'}, 1000)\n' +
		'```\n' +
		'\n' +
		'正确答案是：\n' +
		'先输出 1\n' +
		'1秒后输出 2\n' +
		'\n' +
		'Promise会将最后的值存储起来，如果在下次使用promise方法的时候回直接返回该值的promise。\n' +
		'\n' +
		'### Promise 方法每次都返回一个新的Promise\n' +
		'```javascript\n' +
		'var p1 = new Promise(function(resolve, reject) {\n' +
		'    reject(1)\n' +
		'})\n' +
		'    .then(\n' +
		'        res => {\n' +
		'            console.log(res)\n' +
		'            return 2\n' +
		'        },\n' +
		'        err => {\n' +
		'            console.log(err)\n' +
		'            return 3\n' +
		'        }\n' +
		'    )\n' +
		'    .catch(err => {\n' +
		'        console.log(err)\n' +
		'        return 4\n' +
		'    })\n' +
		'    .finally(res => {\n' +
		'        console.log(res)\n' +
		'        return 5\n' +
		'    })\n' +
		'    .then(\n' +
		'        res => console.log(res),\n' +
		'        err => console.log(err)\n' +
		'    )\n' +
		'```\n' +
		'\n' +
		'正确答案是：\n' +
		'依次输出：1 undefined 3\n' +
		'\n' +
		'Promise能够链式调用的原因是它的每一个方法都返回新的promise，哪怕是finally方法，特殊的是fanilly会返回上一个promise的值包装成的新promise，并且finally也不接收参数，因为无论Promise是reject还是fulfill它都会被调用。\n' +
		'***\n' +
		'### 基本用法\n' +
		'ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。  \n' +
		'下面代码创造了一个Promise实例。\n' +
		'```javascript\n' +
		'const promise = new Promise(function(resolve, reject) {\n' +
		'  // ... some code\n' +
		'\n' +
		'  if (/* 异步操作成功 */){\n' +
		'    resolve(value);\n' +
		'  } else {\n' +
		'    reject(error);\n' +
		'  }\n' +
		'});\n' +
		'```\n' +
		'\n' +
		'Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。\n' +
		'```javascript\n' +
		'promise.then(function(value) {\n' +
		'  // success\n' +
		'}, function(error) {\n' +
		'  // failure\n' +
		'});\n' +
		'```\n' +
		'\n' +
		'Promise 新建后就会立即执行。\n' +
		'\n' +
		'下面是一个用Promise对象实现的 Ajax 操作的例子。\n' +
		'```javascript\n' +
		'const getJSON = function(url) {\n' +
		'  const promise = new Promise(function(resolve, reject){\n' +
		'    const handler = function() {\n' +
		'      if (this.readyState !== 4) {\n' +
		'        return;\n' +
		'      }\n' +
		'      if (this.status === 200) {\n' +
		'        resolve(this.response);\n' +
		'      } else {\n' +
		'        reject(new Error(this.statusText));\n' +
		'      }\n' +
		'    };\n' +
		'    const client = new XMLHttpRequest();\n' +
		'    client.open("GET", url);\n' +
		'    client.onreadystatechange = handler;\n' +
		'    client.responseType = "json";\n' +
		'    client.setRequestHeader("Accept", "application/json");\n' +
		'    client.send();\n' +
		'\n' +
		'  });\n' +
		'\n' +
		'  return promise;\n' +
		'};\n' +
		'\n' +
		'getJSON("/posts.json").then(function(json) {\n' +
		'  console.log(\'Contents: \' + json);\n' +
		'}, function(error) {\n' +
		'  console.error(\'出错了\', error);\n' +
		'});\n' +
		'```\n' +
		'上面代码中，getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。\n' +
		'\n' +
		'resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例\n' +
		'```javascript\n' +
		'const p1 = new Promise(function (resolve, reject) {\n' +
		'  setTimeout(() => reject(new Error(\'fail\')), 3000)\n' +
		'})\n' +
		'\n' +
		'const p2 = new Promise(function (resolve, reject) {\n' +
		'  setTimeout(() => resolve(p1), 1000)\n' +
		'})\n' +
		'\n' +
		'p2\n' +
		'  .then(result => console.log(result))\n' +
		'  .catch(error => console.log(error))\n' +
		'// Error: fail\n' +
		'```\n' +
		'上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。\n' +
		'\n' +
		'调用resolve或reject并不会终结 Promise 的参数函数的执行。\n' +
		'```javascript\n' +
		'new Promise((resolve, reject) => {\n' +
		'  resolve(1);\n' +
		'  console.log(2);\n' +
		'}).then(r => {\n' +
		'  console.log(r);\n' +
		'});\n' +
		'// 2\n' +
		'// 1\n' +
		'```\n' +
		'\n' +
		'### Promise.prototype.then\n' +
		'then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。\n' +
		'```javascript\n' +
		'getJSON("/posts.json").then(function(json) {\n' +
		'  return json.post;\n' +
		'}).then(function(post) {\n' +
		'  // ...\n' +
		'});\n' +
		'```\n' +
		'上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。\n' +
		'\n' +
		'采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。\n' +
		'\n' +
		'### Promise.prototype.catch\n' +
		'Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。\n' +
		'```javascript\n' +
		'getJSON(\'/posts.json\').then(function(posts) {\n' +
		'  // ...\n' +
		'}).catch(function(error) {\n' +
		'  // 处理 getJSON 和 前一个回调函数运行时发生的错误\n' +
		'  console.log(\'发生错误！\', error);\n' +
		'});\n' +
		'```\n' +
		'上面代码中，getJSON方法返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。**另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。**\n' +
		'\n' +
		'如果 Promise 状态已经变成resolved，再抛出错误是无效的。\n' +
		'\n' +
		'Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。\n' +
		'```javascript\n' +
		'getJSON(\'/post/1.json\').then(function(post) {\n' +
		'  return getJSON(post.commentURL);\n' +
		'}).then(function(comments) {\n' +
		'  // some code\n' +
		'}).catch(function(error) {\n' +
		'  // 处理前面三个Promise产生的错误\n' +
		'});\n' +
		'```\n' +
		'上面代码中，一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。\n' +
		'\n' +
		'跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。\n' +
		'```javascript\n' +
		'const someAsyncThing = function() {\n' +
		'  return new Promise(function(resolve, reject) {\n' +
		'    // 下面一行会报错，因为x没有声明\n' +
		'    resolve(x + 2);\n' +
		'  });\n' +
		'};\n' +
		'\n' +
		'someAsyncThing().then(function() {\n' +
		'  console.log(\'everything is great\');\n' +
		'});\n' +
		'\n' +
		'setTimeout(() => { console.log(123) }, 2000);\n' +
		'// Uncaught (in promise) ReferenceError: x is not defined\n' +
		'// 123\n' +
		'```\n' +
		'上面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。\n' +
		'\n' +
		'catch方法之中，还能再抛出错误。\n' +
		'\n' +
		'### Promise.prototype.finally\n' +
		'finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。\n' +
		'\n' +
		'### Promise.all\n' +
		'Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。\n' +
		'\n' +
		'`const p = Promise.all([p1, p2, p3]);`\n' +
		'\n' +
		'上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）\n' +
		'\n' +
		'p的状态由p1、p2、p3决定，分成两种情况:\n' +
		'- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。\n' +
		'- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。\n' +
		'\n' +
		'**注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。**\n' +
		'\n' +
		'### Promise.race\n' +
		'Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。\n' +
		'\n' +
		'`const p = Promise.race([p1, p2, p3]);`\n' +
		'\n' +
		'上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。\n' +
		'\n' +
		'### Promise.resolve\n' +
		'Promise.resolve等价于下面的写法。\n' +
		'```javascript\n' +
		'Promise.resolve(\'foo\')\n' +
		'// 等价于\n' +
		'new Promise(resolve => resolve(\'foo\'))\n' +
		'```\n' +
		'1. 参数是一个 Promise 实例\n' +
		'如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。\n' +
		'\n' +
		'2. 参数是一个thenable对象\n' +
		'thenable对象指的是具有then方法的对象，比如下面这个对象。\n' +
		'```javascript\n' +
		'let thenable = {\n' +
		'  then: function(resolve, reject) {\n' +
		'    resolve(42);\n' +
		'  }\n' +
		'};\n' +
		'```\n' +
		'Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。\n' +
		'\n' +
		'3. 参数不是具有then方法的对象，或根本就不是对象\n' +
		'如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。  \n' +
		'返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。\n' +
		'\n' +
		'4. 不带有任何参数\n' +
		'Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。  \n' +
		'所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法。\n' +
		'```javascript\n' +
		'const p = Promise.resolve();\n' +
		'\n' +
		'p.then(function () {\n' +
		'  // ...\n' +
		'});\n' +
		'```\n' +
		'上面代码的变量p就是一个 Promise 对象。p.then执行时间和普通 Promise 对象一样\n' +
		'\n' +
		'### Promise.reject\n' +
		'```javascript\n' +
		'const p = Promise.reject(\'出错了\');\n' +
		'// 等同于\n' +
		'const p = new Promise((resolve, reject) => reject(\'出错了\'))\n' +
		'\n' +
		'p.then(null, function (s) {\n' +
		'  console.log(s)\n' +
		'});\n' +
		'// 出错了\n' +
		'```\n' +
		'上面代码生成一个 Promise 对象的实例p，状态为rejected，回调函数会立即执行。\n' +
		'\n' +
		'**注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。**\n' +
		'\n' +
		'### Promise.try\n' +
		'实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。\n' +
		'```javascript\n' +
		'Promise.try(() => database.users.get({id: userId}))\n' +
		'  .then(...)\n' +
		'  .catch(...)\n' +
		'```\n' +
		'事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。',
	others: '\n' +
		'## 声明变量\n' +
		'- ES5:`var` `function`\n' +
		'- ES6:`let` `const` `import` `class`\n' +
		'\n' +
		'## String(字符串)\n' +
		'- includes(): 返回布尔值，表示是否找到了参数字符串。支持第二个参数，表示开始搜索的位置。针对从第n个位置直到字符串结束。\n' +
		'- startsWith(): 返回布尔值，表示参数字符串是否在原字符串的头部。支持第二个参数，表示开始搜索的位置。针对从第n个位置直到字符串结束。\n' +
		'- endsWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部。支持第二个参数，表示开始搜索的位置。针对前n个字符。\n' +
		'- repeat():\n' +
		'   - \'na\'.repeat(2.4) //\'nana\'\n' +
		'   1. 参数先进行向下取整运算Math.floor()\n' +
		'   2. 参数是负数或者Infinity，会报错。\n' +
		'   3. 参数是NaN相当于0\n' +
		'- padStart():\n' +
		'   - `\'x\'.padStart(5, \'ab\') // \'ababx\'`\n' +
		'   - `\'x\'.padStart(4, \'ab\') // \'abax\'`\n' +
		'      1. `padStart()`的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。\n' +
		'         - `\'1\'.padStart(10, \'0\') // "0000000001"`\n' +
		'         - `\'12\'.padStart(10, \'0\') // "0000000012"`\n' +
		'         - `\'123456\'.padStart(10, \'0\') // "0000123456"`\n' +
		'      2. 另一个用途是提示字符串格式。\n' +
		'         - `\'12\'.padStart(10, \'YYYY-MM-DD\') // "YYYY-MM-12"`\n' +
		'         - `\'09-12\'.padStart(10, \'YYYY-MM-DD\') // "YYYY-09-12"`\n' +
		'- padEnd():\n' +
		'   - `\'x\'.padEnd(5, \'ab\') // \'xabab\'`\n' +
		'   - `\'x\'.padEnd(4, \'ab\') // \'xaba\'`\n' +
		'\n' +
		'## number(数字)\n' +
		'- Number.isFinite(): 用来检查一个数值是否为有限的（finite），即不是Infinity。如果参数类型不是数值，一律返回false。\n' +
		'- Number.isNaN(): 用来检查一个值是否为NaN。如果参数类型不是NaN，Number.isNaN一律返回false。\n' +
		'\n' +
		'### 指数运算符(**)\n' +
		'- 2 ** 2 // 4\n' +
		'- 2 ** 3 // 8\n' +
		'\n' +
		'### Math对象拓展\n' +
		'- Math.trunc(): 用于去除一个数的小数部分，返回整数部分。\n' +
		'- Math.cbrt(): 用于计算一个数的立方根。\n' +
		'- Math.hypot(): 返回所有参数的平方和的平方根。\n' +
		'   - Math.hypot(3, 4)  // 5\n' +
		'\n' +
		'## function(函数)\n' +
		'### 函数参数的默认值\n' +
		'一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。\n' +
		'等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。\n' +
		'```javascript\n' +
		'let x = 1;\n' +
		'\n' +
		'function f(y = x) {\n' +
		'  let x = 2;\n' +
		'  console.log(y);\n' +
		'}\n' +
		'\n' +
		'f() // 1\n' +
		'```\n' +
		'上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。\n' +
		'函数调用时，函数体内部的局部变量x影响不到默认值变量x。\n' +
		'\n' +
		'利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。\n' +
		'```javascript\n' +
		'function throwIfMissing() {\n' +
		'  throw new Error(\'Missing parameter\');\n' +
		'}\n' +
		'\n' +
		'function foo(mustBeProvided = throwIfMissing()) {\n' +
		'  return mustBeProvided;\n' +
		'}\n' +
		'\n' +
		'foo()\n' +
		'// Error: Missing parameter\n' +
		'```\n' +
		'\n' +
		'### rest参数\n' +
		'ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。\n' +
		'rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。\n' +
		'```javascript\n' +
		'function push(array, ...items) {\n' +
		'  items.forEach(function(item) {\n' +
		'    array.push(item);\n' +
		'    console.log(item);\n' +
		'  });\n' +
		'}\n' +
		'\n' +
		'var a = [];\n' +
		'push(a, 1, 2, 3)\n' +
		'```\n' +
		'注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。\n' +
		'\n' +
		'### 函数name属性\n' +
		'函数的name属性，返回该函数的函数名。\n' +
		'```javascript\n' +
		'var f = function () {};\n' +
		'\n' +
		'// ES5\n' +
		'f.name // ""\n' +
		'\n' +
		'// ES6\n' +
		'f.name // "f"\n' +
		'```\n',
	array: '## Array(数组)\n' +
		'### 扩展运算符(...)\n' +
		'- 扩展运算符的应用\n' +
		'   1. 复制数组\n' +
		'   2. 合并数组(不过，...和concat都是浅拷贝，使用的时候需要注意。数组中有对象时，是对象的引用)\n' +
		'   3. 与解构赋值结合（如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。）\n' +
		'   4. 字符串\n' +
		'      扩展运算符还可以将字符串转为真正的数组。\n' +
		'      [...\'hello\']   // [ "h", "e", "l", "l", "o" ]\n' +
		'      上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。\n' +
		'   5. 实现了 Iterator 接口的对象\n' +
		'      任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。\n' +
		'   6. Map 和 Set 结构，Generator 函数\n' +
		'      扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。\n' +
		'      ```javascript\n' +
		'      let map = new Map([\n' +
		'        [1, \'one\'],\n' +
		'        [2, \'two\'],\n' +
		'        [3, \'three\'],\n' +
		'      ]);\n' +
		'\n' +
		'      let arr = [...map.keys()]; // [1, 2, 3]\n' +
		'      ```\n' +
		'      Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。\n' +
		'      ```javascript\n' +
		'      const go = function*(){\n' +
		'        yield 1;\n' +
		'        yield 2;\n' +
		'        yield 3;\n' +
		'      };\n' +
		'\n' +
		'      [...go()] // [1, 2, 3]\n' +
		'      ```\n' +
		'\n' +
		'### Array.from\n' +
		'Array.from方法用于将两类对象转为真正的数组：\n' +
		'类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。\n' +
		'\n' +
		'Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，\n' +
		'都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。\n' +
		'```javascript\n' +
		'Array.from({ length: 3 });\n' +
		'// [ undefined, undefined, undefined ]\n' +
		'```\n' +
		'\n' +
		'Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。\n' +
		'```javascript\n' +
		'Array.from(arrayLike, x => x * x);\n' +
		'// 等同于\n' +
		'Array.from(arrayLike).map(x => x * x);\n' +
		'Array.from([1, 2, 3], (x) => x * x)\n' +
		'// [1, 4, 9]\n' +
		'```\n' +
		'\n' +
		'### Array.of\n' +
		'Array.of方法用于将一组值，转换为数组。\n' +
		'```javascript\n' +
		'Array.of(3, 11, 8) // [3,11,8]\n' +
		'Array.of(3) // [3]\n' +
		'Array.of(3).length // 1\n' +
		'这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。\n' +
		'Array() // []\n' +
		'Array(3) // [, , ,]\n' +
		'Array(3, 11, 8) // [3, 11, 8]\n' +
		'```\n' +
		'\n' +
		'### find()、findIndex()\n' +
		'这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。\n' +
		'```javascript\n' +
		'function f(v){\n' +
		'  return v > this.age;\n' +
		'}\n' +
		'let person = {name: \'John\', age: 20};\n' +
		'[10, 12, 26, 15].find(f, person);\n' +
		'```\n' +
		'另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。\n' +
		'\n' +
		'### fill()\n' +
		'fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。\n' +
		'```javascript\n' +
		'[\'a\', \'b\', \'c\'].fill(7, 1, 2)\n' +
		'// [\'a\', 7, \'c\']\n' +
		'```\n' +
		'注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。\n' +
		'\n' +
		'### keys()、values()、entries()\n' +
		'keys()是对键名的遍历\n' +
		'values()是对键值的遍历\n' +
		'entries()是对键值对的遍历\n' +
		'```javascript\n' +
		'for (let index of [\'a\', \'b\'].keys()) {\n' +
		'  console.log(index);\n' +
		'}\n' +
		'// 0\n' +
		'// 1\n' +
		'\n' +
		'for (let elem of [\'a\', \'b\'].values()) {\n' +
		'  console.log(elem);\n' +
		'}\n' +
		'// \'a\'\n' +
		'// \'b\'\n' +
		'\n' +
		'for (let [index, elem] of [\'a\', \'b\'].entries()) {\n' +
		'  console.log(index, elem);\n' +
		'}\n' +
		'// 0 "a"\n' +
		'// 1 "b"\n' +
		'```\n' +
		'\n' +
		'### includes()\n' +
		'Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。\n' +
		'indexOf方法有两个缺点:\n' +
		'1. 不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。\n' +
		'2. 内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。\n' +
		'\n' +
		'另外，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。\n' +
		'\n' +
		'Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。\n' +
		'Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。\n' +
		'\n' +
		'### flat()、flatMap()\n' +
		'数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。\n' +
		'该方法返回一个新数组，对原数据没有影响。\n' +
		'```javascript\n' +
		'[1, 2, [3, 4]].flat()\n' +
		'// [1, 2, 3, 4]\n' +
		'\n' +
		'[1, 2, [3, [4, 5]]].flat(2)\n' +
		'// [1, 2, 3, 4, 5]\n' +
		'```\n' +
		'上面代码中，flat()的参数为2，表示要“拉平”两层的嵌套数组。  \n' +
		'如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。\n' +
		'```javascript\n' +
		'[1, [2, [3]]].flat(Infinity)\n' +
		'// [1, 2, 3]\n' +
		'```\n' +
		'flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），\n' +
		'然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。\n' +
		'```javascript\n' +
		'// 相当于 [[2, 4], [3, 6], [4, 8]].flat()\n' +
		'[2, 3, 4].flatMap((x) => [x, x * 2])\n' +
		'// [2, 4, 3, 6, 4, 8]\n' +
		'```\n' +
		'flatMap()只能展开一层数组。\n' +
		'\n' +
		'### 数组空位\n' +
		'由于空位的处理规则非常不统一，所以建议避免出现空位。\n' +
		'\n' +
		'### reduce替代filter+map\n' +
		'```javascript\n' +
		'const characters = [\n' +
		'  { name: \'ironman\', env: \'marvel\' },\n' +
		'  { name: \'black_widow\', env: \'marvel\' },\n' +
		'  { name: \'wonder_woman\', env: \'dc_comics\' },\n' +
		'];\n' +
		'\n' +
		'console.log(\n' +
		'characters.reduce((acc, character) => {\n' +
		'return character.env === \'marvel\'?\n' +
		'acc.concat(Object.assign({}, character, { alsoSeenIn: [\'Avengers\'] })):\n' +
		'acc;\n' +
		'}, [])\n' +
		')\n' +
		'```',
	object: '## Object(对象)\n' +
		'### 可枚举性\n' +
		'对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。\n' +
		'Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。\n' +
		'```javascript\n' +
		'let obj = { foo: 123 };\n' +
		'Object.getOwnPropertyDescriptor(obj, \'foo\')\n' +
		'//  {\n' +
		'//    value: 123,\n' +
		'//    writable: true,\n' +
		'//    enumerable: true,\n' +
		'//    configurable: true\n' +
		'//  }\n' +
		'```\n' +
		'\n' +
		'for...in会返回继承的属性\n' +
		'总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。\n' +
		'所以，尽量不要用for...in循环，而用Object.keys()代替。\n' +
		'\n' +
		'### Object.is()\n' +
		'Object.is用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。\n' +
		'不同之处只有两个：一是+0不等于-0，二是NaN等于自身。\n' +
		'```javascript\n' +
		'+0 === -0 //true\n' +
		'NaN === NaN // false\n' +
		'\n' +
		'Object.is(+0, -0) // false\n' +
		'Object.is(NaN, NaN) // true\n' +
		'```\n' +
		'\n' +
		'### Object.assign()\n' +
		'Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。\n' +
		'\n' +
		'其他类型的值（数值、字符串、布尔值、null、undefined）不在首参数，不会报错。\n' +
		'但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。这是因为只有字符串的包装对象，会产生可枚举属性。\n' +
		'```javascript\n' +
		'const v1 = \'abc\';\n' +
		'const v2 = true;\n' +
		'const v3 = 10;\n' +
		'\n' +
		'const obj = Object.assign({}, v1, v2, v3);\n' +
		'console.log(obj); // { "0": "a", "1": "b", "2": "c" }\n' +
		'```\n' +
		'Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。\n' +
		'\n' +
		'### Object.setPrototypeOf()、Object.getPrototypeOf()\n' +
		'Object.setPrototypeOf()方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。\n' +
		'\n' +
		'Object.getPrototypeOf()方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。\n' +
		'\n' +
		'### Object.fromEntries() !目前仅火狐支持\n' +
		'Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。\n' +
		'```javascript\n' +
		'Object.fromEntries([\n' +
		'  [\'foo\', \'bar\'],\n' +
		'  [\'baz\', 42]\n' +
		'])\n' +
		'// { foo: "bar", baz: 42 }\n' +
		'```\n' +
		'该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。\n' +
		'\n' +
		'该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。\n' +
		'```javascript\n' +
		'Object.fromEntries(new URLSearchParams(\'foo=bar&baz=qux\'))\n' +
		'// { foo: "bar", baz: "qux" }\n' +
		'```\n' +
		'\n' +
		'### super\n' +
		'我们知道，this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。\n' +
		'注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。\n' +
		'\n' +
		'### 遍历对象\n' +
		'1. for...in  循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。\n' +
		'2. Object.keys(obj)  返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。\n' +
		'3. Object.getOwnPropertyNames(obj)  返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。\n' +
		'4. Object.getOwnPropertySymbols(obj)  返回一个数组，包含对象自身的所有 Symbol 属性的键名。\n' +
		'5. Reflect.ownKeys(obj)  返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。\n' +
		'\n' +
		'以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。\n' +
		'\n' +
		'首先遍历所有数值键，按照数值升序排列。\n' +
		'其次遍历所有字符串键，按照加入时间升序排列。\n' +
		'最后遍历所有 Symbol 键，按照加入时间升序排列。',
	setAndMap: '## Set\n' +
		'ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。\n' +
		'\n' +
		'Set 本身是一个构造函数，用来生成 Set 数据结构。\n' +
		'\n' +
		'const s = new Set();\n' +
		'\n' +
		'Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），\n' +
		'主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。\n' +
		'在Set中，两个对象总是不相等的。\n' +
		'\n' +
		'Array.from方法可以将 Set 结构转为数组。\n' +
		'```javascript\n' +
		'const items = new Set([1, 2, 3, 4, 5]);\n' +
		'const array = Array.from(items);\n' +
		'```\n' +
		'\n' +
		'### Set的实例属性和方法\n' +
		'Set 结构的实例有以下属性:\n' +
		'1. Set.prototype.constructor：构造函数，默认就是Set函数。\n' +
		'2. Set.prototype.size：返回Set实例的成员总数。\n' +
		'\n' +
		'Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。\n' +
		'四个操作方法:\n' +
		'1. add(value)：添加某个值，返回 Set 结构本身。\n' +
		'2. delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。\n' +
		'3. has(value)：返回一个布尔值，表示该值是否为Set的成员。\n' +
		'4. clear()：清除所有成员，没有返回值。\n' +
		'```javascript\n' +
		's.add(1).add(2).add(2);\n' +
		'// 注意2被加入了两次\n' +
		's.size // 2\n' +
		's.has(1) // true\n' +
		's.has(2) // true\n' +
		's.has(3) // false\n' +
		's.delete(2);\n' +
		's.has(2) // false\n' +
		'```\n' +
		'四个遍历方法:\n' +
		'1. keys()：返回键名的遍历器\n' +
		'2. values()：返回键值的遍历器\n' +
		'3. entries()：返回键值对的遍历器\n' +
		'4. forEach()：使用回调函数遍历每个成员\n' +
		'\n' +
		'需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。\n' +
		'由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。\n' +
		'\n' +
		'数组的map和filter方法也可以间接用于 Set 了。\n' +
		'```javascript\n' +
		'let set = new Set([1, 2, 3]);\n' +
		'set = new Set([...set].map(x => x * 2));\n' +
		'// 返回Set结构：{2, 4, 6}\n' +
		'\n' +
		'let set = new Set([1, 2, 3, 4, 5]);\n' +
		'set = new Set([...set].filter(x => (x % 2) == 0));\n' +
		'// 返回Set结构：{2, 4}\n' +
		'```\n' +
		'\n' +
		'因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。\n' +
		'```javascript\n' +
		'let a = new Set([1, 2, 3]);\n' +
		'let b = new Set([4, 3, 2]);\n' +
		'\n' +
		'// 并集\n' +
		'let union = new Set([...a, ...b]);\n' +
		'// Set {1, 2, 3, 4}\n' +
		'\n' +
		'// 交集\n' +
		'let intersect = new Set([...a].filter(x => b.has(x)));\n' +
		'// set {2, 3}\n' +
		'\n' +
		'// 差集\n' +
		'let difference = new Set([...a].filter(x => !b.has(x)));\n' +
		'// Set {1}\n' +
		'```\n' +
		'\n' +
		'## Map\n' +
		'### Map的实例属性和方法\n' +
		'Map 结构的实例有以下属性:\n' +
		'1. size 属性：size属性返回 Map 结构的成员总数。\n' +
		'\n' +
		'五个操作方法:\n' +
		'1. set(key, value)\n' +
		'set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。\n' +
		'```javascript\n' +
		'const m = new Map();\n' +
		'\n' +
		'm.set(\'edition\', 6)        // 键是字符串\n' +
		'm.set(262, \'standard\')     // 键是数值\n' +
		'm.set(undefined, \'nah\')    // 键是 undefined\n' +
		'```\n' +
		'set方法返回的是当前的Map对象，因此可以采用链式写法。\n' +
		'```javascript\n' +
		'let map = new Map()\n' +
		'  .set(1, \'a\')\n' +
		'  .set(2, \'b\')\n' +
		'  .set(3, \'c\');\n' +
		'```\n' +
		'2. get(key)\n' +
		'get方法读取key对应的键值，如果找不到key，返回undefined。\n' +
		'3. has(key)\n' +
		'has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。\n' +
		'4. delete(key)\n' +
		'delete方法删除某个键，返回true。如果删除失败，返回false。\n' +
		'5. clear()\n' +
		'clear方法清除所有成员，没有返回值。\n' +
		'\n' +
		'遍历方法:\n' +
		'Map 结构原生提供三个遍历器生成函数和一个遍历方法:\n' +
		'1. keys()：返回键名的遍历器。\n' +
		'2. values()：返回键值的遍历器。\n' +
		'3. entries()：返回所有成员的遍历器。\n' +
		'4. forEach()：遍历 Map 的所有成员。\n' +
		'\n' +
		'需要特别注意的是，Map 的遍历顺序就是插入顺序。\n' +
		'```javascript\n' +
		'const map = new Map([\n' +
		'  [\'F\', \'no\'],\n' +
		'  [\'T\',  \'yes\'],\n' +
		']);\n' +
		'\n' +
		'for (let key of map.keys()) {\n' +
		'  console.log(key);\n' +
		'}\n' +
		'// "F"\n' +
		'// "T"\n' +
		'\n' +
		'for (let value of map.values()) {\n' +
		'  console.log(value);\n' +
		'}\n' +
		'// "no"\n' +
		'// "yes"\n' +
		'\n' +
		'for (let item of map.entries()) {\n' +
		'  console.log(item[0], item[1]);\n' +
		'}\n' +
		'// "F" "no"\n' +
		'// "T" "yes"\n' +
		'\n' +
		'// 或者\n' +
		'for (let [key, value] of map.entries()) {\n' +
		'  console.log(key, value);\n' +
		'}\n' +
		'// "F" "no"\n' +
		'// "T" "yes"\n' +
		'\n' +
		'// 等同于使用map.entries()\n' +
		'for (let [key, value] of map) {\n' +
		'  console.log(key, value);\n' +
		'}\n' +
		'// "F" "no"\n' +
		'// "T" "yes"\n' +
		'```\n' +
		'\n' +
		'Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。\n' +
		'```javascript\n' +
		'const map = new Map([\n' +
		'  [1, \'one\'],\n' +
		'  [2, \'two\'],\n' +
		'  [3, \'three\'],\n' +
		']);\n' +
		'\n' +
		'[...map.keys()]\n' +
		'// [1, 2, 3]\n' +
		'\n' +
		'[...map.values()]\n' +
		'// [\'one\', \'two\', \'three\']\n' +
		'\n' +
		'[...map.entries()]\n' +
		'// [[1,\'one\'], [2, \'two\'], [3, \'three\']]\n' +
		'\n' +
		'[...map]\n' +
		'// [[1,\'one\'], [2, \'two\'], [3, \'three\']]\n' +
		'```\n' +
		'\n' +
		'结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。\n' +
		'```javascript\n' +
		'const map0 = new Map()\n' +
		'  .set(1, \'a\')\n' +
		'  .set(2, \'b\')\n' +
		'  .set(3, \'c\');\n' +
		'\n' +
		'const map1 = new Map(\n' +
		'  [...map0].filter(([k, v]) => k < 3)\n' +
		');\n' +
		'// 产生 Map 结构 {1 => \'a\', 2 => \'b\'}\n' +
		'\n' +
		'const map2 = new Map(\n' +
		'  [...map0].map(([k, v]) => [k * 2, \'_\' + v])\n' +
		'    );\n' +
		'// 产生 Map 结构 {2 => \'_a\', 4 => \'_b\', 6 => \'_c\'}\n' +
		'```\n' +
		'\n' +
		'## 与其他数据结构的互相转换\n' +
		'1. Map转为数组\n' +
		'Map 转为数组最方便的方法，就是使用扩展运算符（...）。\n' +
		'```javascript\n' +
		'const myMap = new Map()\n' +
		'  .set(true, 7)\n' +
		'  .set({foo: 3}, [\'abc\']);\n' +
		'[...myMap]\n' +
		'// [ [ true, 7 ], [ { foo: 3 }, [ \'abc\' ] ] ]\n' +
		'```\n' +
		'2. 数组转为Map\n' +
		'将数组传入 Map 构造函数，就可以转为 Map。\n' +
		'```javascript\n' +
		'new Map([\n' +
		'  [true, 7],\n' +
		'  [{foo: 3}, [\'abc\']]\n' +
		'])\n' +
		'// Map {\n' +
		'//   true => 7,\n' +
		'//   Object {foo: 3} => [\'abc\']\n' +
		'// }\n' +
		'```\n' +
		'3. Map 转为对象\n' +
		'如果所有 Map 的键都是字符串，它可以无损地转为对象。\n' +
		'```javascript\n' +
		'function strMapToObj(strMap) {\n' +
		'  let obj = Object.create(null);\n' +
		'  for (let [k,v] of strMap) {\n' +
		'    obj[k] = v;\n' +
		'  }\n' +
		'  return obj;\n' +
		'}\n' +
		'\n' +
		'const myMap = new Map()\n' +
		'  .set(\'yes\', true)\n' +
		'  .set(\'no\', false);\n' +
		'strMapToObj(myMap)\n' +
		'// { yes: true, no: false }\n' +
		'```\n' +
		'如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。\n' +
		'4. 对象转为 Map\n' +
		'```javascript\n' +
		'function objToStrMap(obj) {\n' +
		'  let strMap = new Map();\n' +
		'  for (let k of Object.keys(obj)) {\n' +
		'    strMap.set(k, obj[k]);\n' +
		'  }\n' +
		'  return strMap;\n' +
		'}\n' +
		'\n' +
		'objToStrMap({yes: true, no: false})\n' +
		'// Map {"yes" => true, "no" => false}\n' +
		'```\n' +
		'5. Map 转为 JSON\n' +
		'Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。\n' +
		'```javascript\n' +
		'function strMapToJson(strMap) {\n' +
		'  return JSON.stringify(strMapToObj(strMap));\n' +
		'}\n' +
		'\n' +
		'let myMap = new Map().set(\'yes\', true).set(\'no\', false);\n' +
		'strMapToJson(myMap)\n' +
		'// \'{"yes":true,"no":false}\'\n' +
		'```\n' +
		'另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。\n' +
		'```javascript\n' +
		'function mapToArrayJson(map) {\n' +
		'  return JSON.stringify([...map]);\n' +
		'}\n' +
		'\n' +
		'let myMap = new Map().set(true, 7).set({foo: 3}, [\'abc\']);\n' +
		'mapToArrayJson(myMap)\n' +
		'// \'[[true,7],[{"foo":3},["abc"]]]\'\n' +
		'```\n' +
		'6. JSON 转为 Map\n' +
		'JSON 转为 Map，正常情况下，所有键名都是字符串。\n' +
		'```javascript\n' +
		'function jsonToStrMap(jsonStr) {\n' +
		'  return objToStrMap(JSON.parse(jsonStr));\n' +
		'}\n' +
		'\n' +
		'jsonToStrMap(\'{"yes": true, "no": false}\')\n' +
		'// Map {\'yes\' => true, \'no\' => false}\n' +
		'```\n' +
		'但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。\n' +
		'这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。\n' +
		'```javascript\n' +
		'function jsonToMap(jsonStr) {\n' +
		'  return new Map(JSON.parse(jsonStr));\n' +
		'}\n' +
		'\n' +
		'jsonToMap(\'[[true,7],[{"foo":3},["abc"]]]\')\n' +
		'// Map {true => 7, Object {foo: 3} => [\'abc\']}',
	iterator: '## Iterator\n' +
		'Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。当使用for...of循环遍历某种数据结构时，\n' +
		'该循环会自动去寻找 Iterator 接口。\n' +
		'\n' +
		'一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。\n' +
		'\n' +
		'ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，\n' +
		'\n' +
		'\n' +
		'原生具备 Iterator 接口的数据结构如下。\n' +
		'\n' +
		'Array\n' +
		'Map\n' +
		'Set\n' +
		'String\n' +
		'TypedArray\n' +
		'函数的 arguments 对象\n' +
		'NodeList 对象\n' +
		'\n' +
		'一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。\n' +
		'也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。\n' +
		'\n' +
		'for...of循环相比上面几种做法，有一些显著的优点。\n' +
		'```javascript\n' +
		'for (let value of myArray) {\n' +
		'  console.log(value);\n' +
		'}\n' +
		'```\n' +
		'有着同for...in一样的简洁语法，但是没有for...in那些缺点。\n' +
		'不同于forEach方法，它可以与break、continue和return配合使用。\n' +
		'提供了遍历所有数据结构的统一操作接口。\n',
}
export default es6Note