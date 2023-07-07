import React from "react";
import Greetings from "./Greetings";
import FirstNameField from "./FirstNameField";
import LastNameField from "./LastNameField";
import style from "./style";

export default class SimpleForm extends React.Component{
    // Состояние приложения
   state = {
    firstName: "", 
    firstNameError: "",

    lastName: "",
    lastNameError: "",
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

   onLastNameBlur = () => {
    const { lastName } = this.state;
    const lastNameError = this.validateName(lastName);
    return this.setState({lastNameError})
   }

   onFirstNaneChange = event => 
    this.setState({
        firstName: event.target.value
    });

    onLastNameChange = event =>
    this.setState({
      lastName: event.target.value
    });

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
}

