import { Component } from "react";
import { Wrapper } from "./App.styled";
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from "nanoid";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import phoneNumbers from "../data/phoneNumbers.json";
import { DellAlert } from "./DellAlert/DellAlert";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
    deleted: false,
    delName: "",
  };

  componentDidMount() {
    if (localStorage.getItem("contacts")) {
      this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
    } else {
      this.setState({ contacts: [...phoneNumbers] });
      localStorage.setItem("contacts", JSON.stringify(phoneNumbers));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    if (prevState.contacts.length > this.state.contacts.length) {
      setTimeout(() => this.setState({ deleted: false, delName: "" }), 2000);
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (name, number) => {
    if (
      this.state.contacts.find(
        (contact) =>
          contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  handleDeleteContact = (id) => {
    const { contacts } = this.state;
    console.log("id", id);
    console.log(contacts);
    console.log(
      "",
      contacts.find((contact) => contact.id !== id)
    );

    this.setState({
      contacts: contacts.filter((contact) => contact.id !== id),
      deleted: true,
      delName: contacts.find((contact) => contact.id === id).name,
    });
  };

  render() {
    return (
      <Wrapper>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.handleChange} />
        {this.state.deleted && <DellAlert>{this.state.delName}</DellAlert>}
        <ContactList
          contacts={this.getFilteredContacts()}
          handleDeleteContact={this.handleDeleteContact}
        />
      </Wrapper>
    );
  }
}
