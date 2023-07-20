# React
## create-react-app
Пакет `create-react-app` (Facebook) - пакет для настройки рабочего окружения. 

1) Для того чтобы глобально установить create-react-app: `npm i -g create-react-app`
2) Для создания шаблона приложения, выполнить команду: `create-react-app react-intro`
3) Для создания запуска приложения:
* `сd react-intro` 
* `npm start`

## Настройка проекта из оффициального мануала react
1) npx create-react-app app-name
2) cd name-app
3) npm start
4) Удаление файлов в `src`:
  * del * (for Windows)
  * rm -f * (for Mac or Linux) 
1) Создание новых файлов взамен удалённых: 
  * new-item index.css
  * new-item index.js
1) Создание папок:
  * new-item 'dirName' -itemType Directory

## настройка под typescript
### Client
* npx create-react-app client-name --template typescript

## React Application Structure
### index.html
path - `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

`<div id="root">` в этом компоненте будет находиться React-приложение. Весь этот элемент будет заменён на код приложения, а всё остальное останется неизменным.

### index.js 
path - `src/index.js`

```javaScript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

Данный файл выполняет развёртывание React-приложения.

 Cтрока ответственная за ввывод React-приложения. Сообщает React о том, что нужно взять Компонент `App` и поместить его в div-элемент `root`, который находится в файле `index.html`.
```javaScript
ReactDOM.render(<App />, document.getElementById('root'));
``` 


#### Конструкция \<App /> 
Образец JSX-кода, представляет особый синтаксис JS-кода, используемый React.
Должен начинаться с заглавной буквы - `<App />`, `не <app />`.

#### Подключение модуля React к .js файлу
```javaScript
import React from 'react';
```
### App.js
path - `src/App.js`

```javaScript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extents Component{
    render(){
        return(
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code> src/App.js</code> snd save reload.
                </p>
            </div>
        );
    }
}

export default App;
```

Чтобы создать компонент React, необходимо сначала создать класс, являющийся наследником React.Component. Все компоненты React должны содержать реализацию метода `render`, в котором выполняется рендеринг компонента, формирование описания его визуального представления. Этот метод должен вернуть HTML-разметку для вывода её на страницу.

`className` — это эквивалент атрибута class в HTML. Он используется для назначения элементам CSS-классов в целях их стилизации.

#### App.js вместо класса функция
Если в компоненте, созданном с использованием класса, нет ничего кроме метода render, то он является отличным претендентом на переработку его в функциональный компонент.

```javaScript
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

C cсинтаксисом стрелочных функций ES6, наш код будет выглядеть ещё лучше:
```javaScript
const App = () => (
  <div className="App">
    ...

  </div>
);

export default App;
```

## Свойства (Props)
`Свойства (props)` — это одна из центральных концепций React. Что такое «свойства»? Для того чтобы это понять, вспомните о параметрах, которые передают функциям. В сущности, свойства — это и есть параметры, которые передаются компонентам. Рассмотрим следующий код:
```javaScript
const Greetings = (props) => <div>Hey you! {props.firstName} {props.lastName}!</div>;

const App = () => (
  <div>
    <Greetings firstName="John" lastName="Smith" />
  </div>
);
```

Тут мы создали компонент `Greetings` и воспользовались им для того, чтобы поприветствовать человека, которого зовут `John Smith`, из компонента `App`. Весь этот код приведёт к формированию следующей HTML-разметки:

```HTML
<div>
   <div>Hey you! John Smith!</div>
</div>
```

Фигурные скобки в выражениях вроде `{props.name}` используются для выделения `JavaScript-кода`. Компоненту `Greetings` передаются, в виде параметров, свойства `firstName и lastName`. Мы работаем с ними, обращаясь к `свойствам объекта props`.

Обратите внимание на то, что компоненту `передаётся единственный объект props`, а не два значения, представляющие свойства firstName и lastName.

Код можно упростить, воспользовавшись возможностями ES6 по деструктурированию объектов:
```javaScript
const Greetings = ({ firstName, lastName }) => <div>Hey you! {firstName} {lastName}!</div>;
```

Как видите, тут конструкция `(props)` была заменена на `({ firstName, lastName })`. Этой заменой мы сообщаем системе о том, что нас интересуют лишь два свойства объекта props. И это, в свою очередь, позволяет нам напрямую обращаться к значениям firstName и lastName, не указывая в явном виде свойства объекта наподобие props.firstName.


 Если для решения такой же задачи мы, вместо функциональных компонентов, использовали бы компоненты, `основанные на классах`? В таком случае код компонента Greetings выглядел бы так:
 ```javaScript
 class Greetings extends React.Component {
  render() {
    return (
      <div>Hey you! {this.props.firstName} {this.props.lastName}!</div>
    );
  }
}
```
## Принцип единой ответственности
 
`Принцип единственной ответственности (Single Responsibility Principle, SRP)` — это один из важнейших принципов программирования. Он говорит нам о том, что модуль должен решать только одну задачу и должен делать это качественно. Если разрабатывать проект, не следуя только одному этому принципу, код такого проекта может превратиться в кошмарную конструкцию, которую невозможно поддерживать.


Компоненты Greetings и App находится в одном файле. На практике так поступать не следует, так как это нарушает SRP.

Даже очень маленькие компоненты (вроде нашего компонента Greetings) нужно размещать в отдельных файлах.

Поместим код компонента Greetings в отдельный файл:
```javaScript
import React from "react";

const Greetings = ({ firstName, lastName }) => (
    <div>
        Hey you! {firstName} {lastName}!
    </div>
);

export default Greetings;
```

Затем воспользуемся этим компонентом в компоненте App:
```javaScript
import Greetings from "./Greetings";
const App = () => (
  ...

);
```

Обратите внимание на то, что имя файла должно совпадать с именем компонента. То есть, код компонента `App` должен размещаться в файле `App.js`, код компонента `Greetings` — в файле `Greetings.js`, и так далее.

## Состояние приложения

Состояние (state) — это ещё одна из центральных концепций React. Именно здесь хранятся данные приложения — то есть то, что может меняться.

Рассмотрим состояния на примере формы ввода данных - `input`.

файл App.js:
```javaScript
import './App.css';
import SimpleForm from './SimpleForm';


const App = () => (
  <div>
      <SimpleForm/>
  </div>
);

export default App;
```

файл Greetings.js:
```javaScript
import React from "react";

const Greetings = ({ firstName, lastName }) => (
    <div>
        Hey you! {firstName} {lastName}!
    </div>
);

export default Greetings;
```

файл SimpleForm.js:
```javaScript
import React from "react";
import Greetings from "./Greetings";

export default class SimpleForm extends React.Component{
   state = {
    firstName: ""
   };

   onFirstNaneChange = event => 
    this.setState({
        firstName: event.target.value
    });

    render() {
        return(
            <div>
                <input type="text" name="firstName" onChange={this.onFirstNaneChange}/>
                <Greetings firstName={this.state.firstName}/>
            </div>
        )
    }
}
```
Состояние можно представить себе как простой JavaScript-объект, который, в виде свойства, хранится в классе компонента SimpleForm. В этот объект мы добавляем свойство firstName.

Тут мы оснастили поле firstName обработчиком события. Он запускается каждый раз когда пользователь вводит хотя бы один символ в поле. В классе за обработку события onChange отвечает свойство onFirstNameChange, в представляющей которое функции выполняется команда следующего вида:
```javaScript
this.setState(...)
```

Именно здесь выполняется обновление состояния компонента. Состояние компонентов не обновляют напрямую. Это делается только с использованием метода setState. Для того чтобы записать новое значение в свойство firstName, мы просто передаём этому методу объект, содержащий то, что нужно записать в состояние:

```javaScript
{ firstName: event.target.value }
```

В данном случае `event.target.value` — это то, что пользователь ввёл в поле формы, а именно — его имя.

Обратите внимание на то, что мы не объявили `onFirstNameChange` в виде метода. Очень важно, чтобы подобные вещи объявлялись бы в виде свойств класса, содержащих стрелочные функции, а не в виде методов. Если объявить подобную функцию в виде метода, тогда this будет привязано к элементу формы, который вызывает этот метод, а не к классу, как мы могли бы ожидать.

### Проверка данных, введённых в форму 
```JavaScript
import React from "react";
import Greetings from "./Greetings";

export default class SimpleForm extends React.Component{
    // Состояние приложения
   state = {
    firstName: "", 
    firstNameError: "",
   };

    // Проверка данных выполняется в стрелочной функции validateName. 
    // Она проверяет введённое имя с помощью регулярного выражения:
   validateName = name => {
    const regex = /[A-Za-z]{3,}/;

    return !regex.test(name)
    ? "The name must contain at least three letters. Numbers and special characters are not allowed."
    : "";
   }

   // обработчик события onBlur, который вызывается когда пользователь покидает поле ввода
   onFirstNaneBlur = () => {
    
    const { firstName } = this.state; // Эквивалентна этой строке const firstName = this.state.firstName;

    const firstNameError = this.validateName( firstName );

    return this.setState({ firstNameError });
   };

   onFirstNaneChange = event => 
    this.setState({
        firstName: event.target.value
    });

    render() {

        const {firstNameError, firstName} = this.state;

        return(
            <div>
                <div>
                    <label>
                        First name:
                        <input
                            type="text"
                            name="firstName"
                            onChange={this.onFirstNaneChange}
                            onBlur={this.onFirstNaneBlur}
                        />
                    </label>
                    {firstNameError && <div>{firstNameError}</div>}
                </div>

                <Greetings firstName={firstName}/>
                
            </div>

        );
    }
}
```
Элемент div, содержащий сообщение об ошибке, будет выведен лишь в том случае, если значение firstNameError может быть приведено к true.


## Стили 
### Стили внутри файла разметки

```JavaScript
render() {

        const {firstNameError, firstName} = this.state;

        return(
            <div
                style={{
                    margin: 50, 
                    padding: 10, 
                    width: 300, 
                    border: "1px solid black", 
                    backgroundColor: "black", 
                    color: "white"
                }}
            >
                <div style={{marginBottom: 10}}>
                    <label>
                        First name:
                        <input
                            style={{backgroundColor: '#EFEFFF', marginLeft: 10}}
                            type="text"
                            name="firstName"
                            onChange={this.onFirstNaneChange}
                            onBlur={this.onFirstNaneBlur}
                        />
                    </label>
                    {firstNameError && <div style={{ color: 'red', margin: 5 }}>{firstNameError}</div>}
                </div>

                <Greetings firstName={firstName}/>
                
            </div>

        );
    }
```

### Стили в отдельном файле
файл `style.js`:
```javaScript
const style = {
    form: {
        margin: 50,
        padding: 10,
        width: 300,
        border: "1px solid black",
        backgroundColor: "black",
        color: "white"
    },
    inputGroup: {
        marginBottom: 10
    },
    input: {
        backgroundColor: "#EFEFFF",
        marginLeft: 10
    },
    error: {
        color: "red",
        margin: 5
    }
};

export default style;
```

файл `simpleForm.js`:
```javaScript
import React from "react";
import Greetings from "./Greetings";
import style from "./style";

export default class SimpleForm extends React.Component{
    // Состояние приложения
   state = {
    firstName: "", 
    firstNameError: "",
   };

    // Проверка данных выполняется в стрелочной функции validateName. 
    // Она проверяет введённое имя с помощью регулярного выражения:
   validateName = name => {
    const regex = /[A-Za-z]{3,}/;

    return !regex.test(name)
    ? "The name must contain at least three letters. Numbers and special characters are not allowed."
    : "";
   }

   // обработчик события onBlur, который вызывается когда пользователь покидает поле ввода
   onFirstNaneBlur = () => {

    const { firstName } = this.state; // Эквивалентна этой строке const firstName = this.state.firstName;

    const firstNameError = this.validateName( firstName );

    return this.setState({ firstNameError });
   };

   onFirstNaneChange = event => 
    this.setState({
        firstName: event.target.value
    });

    render() {

        const {firstNameError, firstName} = this.state;

        return(
            <div style={style.form}>
                <div style={style.inputGroup}>
                    <label>
                        First name:
                        <input
                            style={style.input}
                            type="text"
                            name="firstName"
                            onChange={this.onFirstNaneChange}
                            onBlur={this.onFirstNaneBlur}
                        />
                    </label>
                    {firstNameError && <div style={style.error}>{firstNameError}</div>}
                </div>

                <Greetings firstName={firstName}/>
                
            </div>

        );
    }
}
```

## Разделение кода на фрагменты
### Поле ввода (TextField)

Файл `TextField.js`: 
```javaScript
import React from "react";
import style from "./style";

const TextField = ({name, onChange, onBlur, error, label}) => (
    <div style={style.inputGroup}>
     <label>
      {label}
      <input
        style={style.input}
        type="text"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div style={style.error}>{error}</div>}
    </label>
   </div>
)

export default TextField;
```

Файл `SimpleForm.js`:
```javaScript
... 
 render() {

        const {firstNameError, firstName, lastName, lastNameError } = this.state;

        return(
            <div style={style.form}>
                
                <TextField name="firstName"
                    label="First name:"
                    onChange={this.onFirstNameChange}
                    onBlur={this.onFirstNameBlur}
                    error={firstNameError} />

                <TextField name="lastName"
                   label="Last name:"
                   onChange={this.onLastNameChange}
                   onBlur={this.onLastNameBlur}
                   error={lastNameError} />

                <Greetings firstName={firstName} lastName={lastName}/>   
            </div>
        );
    }
...
```

### Описание одинаковых компонентов в отдельных файлах
файл `FirstNameField.js`: 
```javaScript
import React from "react";
import TextField from "./TextField";

const FirstNameField = ({...rest}) => (
    <TextField name = "firstName"
               label="First Name:"
               {...rest} />
);

export default FirstNameField
```
файл `LastNameField.js`: 
```javaScript
import React from "react";
import TextField from "./TextField";

const LastNameField = ({...rest}) => (
    <TextField name = "lastName"
               label="Last Name:"
               {...rest} />
);

export default LastNameField
```

Тут мы просто возвращаем компонент, заранее подготовленный для вывода имени пользователя. В конструкции `({...rest})` используется синтаксис оставшихся параметров (оператор `rest`, выглядящий как три точки). Благодаря использованию этого оператора оказывается, что всё, что будет передано компоненту в виде свойств, попадёт в объект rest. Затем, для того, чтобы передать свойства компоненту TextField, используется так называемый «оператор расширения», или оператор `spread` (он, в конструкции `{...rest}`, тоже выглядит как три точки). Тут берётся объект `rest`, из него выделяются его свойства, которые передаются компоненту TextField.

Другими словами, все эти конструкции позволяют выразить следующую идею: мы хотим взять всё, что пришло в компонент FirstNameField и передать это в неизменном виде компоненту TextField.

файл "SimpleForm.js": 
```JavaScript
 ...
 render() {

        const {firstNameError, firstName, lastName, lastNameError } = this.state;

        return(
            <div style={style.form}>
                
                <FirstNameField onChange={this.onFirstNameChange}
                        onBlur={this.onFirstNameBlur}
                        error={firstNameError} />

                <LastNameField onChange={this.onLastNameChange}
                        onBlur={this.onLastNameBlur}
                        error={lastNameError} />

                <Greetings firstName={firstName} lastName={lastName}/>   
            </div>
        );
    }
...
```

# Настройка серверного приложения NodeJS + Express + mongoDB

## Server lib
* cd server
* npm init -y
* npm i express cors cookie-parser 
* npm i nodemon --save-dev
* npm run dev
* npm i dotenv
* npm i mongodb
* npm i mongoose

## Установка mongoDB
* Руководство:  https://metanit.com/nosql/mongodb/1.2.php
* MongoDB: https://www.mongodb.com/try/download/community-kubernetes-operator
* Mogosh: https://www.mongodb.com/try/download/shell
* Драйвера: https://www.mongodb.com/docs/drivers/

` db.users.insertOne( { name: "Tom" } )
db.users.find()`  

## Подключение прокси сервера
* npm config set https-proxy http://192.168.137.254:3128
* npm config set proxy http://192.168.137.254:3128
